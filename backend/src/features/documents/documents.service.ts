import { pool } from "../../database";
import { withDeadlockRetry } from "../../utils/pgRetry";

/** Strict whitelist of applications columns that document replacement may write. */
const APPLICATION_DOC_COLUMNS = {
  "Letter of Intent": "letter_of_intent",
  "Sworn Declaration": "sworn_document",
} as const;

class DocumentsServiceClass {
  async replaceApplicantDocument(
    applicantId: number,
    docType: 'Letter of Intent' | 'Sworn Declaration',
    newBlobUrl: string,
    targetApplicationIds?: string[],
  ) {
    // The whole transaction is retried on deadlock (40P01) / serialization (40001).
    return withDeadlockRetry(() =>
      this.replaceApplicantDocumentOnce(
        applicantId,
        docType,
        newBlobUrl,
        targetApplicationIds,
      ),
    );
  }

  private async replaceApplicantDocumentOnce(
    applicantId: number,
    docType: 'Letter of Intent' | 'Sworn Declaration',
    newBlobUrl: string,
    targetApplicationIds?: string[],
  ) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Fetch and lock applicant profile
      const appRes = await client.query(
        'SELECT * FROM applicants WHERE id = $1 FOR UPDATE',
        [applicantId],
      );
      if (appRes.rows.length === 0) {
        throw new Error('Applicant profile not found');
      }
      const applicant = appRes.rows[0];

      let otherInfo = applicant.other_information || {};
      if (typeof otherInfo === 'string') {
        try {
          otherInfo = JSON.parse(otherInfo);
        } catch { }
      }
      if (!otherInfo.documents) otherInfo.documents = {};

      const oldBlobUrl = otherInfo.documents[docType] || null;

      // 2. Always update applicant master profile other_information.documents with newest blob URL for future applications
      otherInfo.documents[docType] = newBlobUrl;
      await client.query(
        'UPDATE applicants SET other_information = $1, updated_at = NOW() WHERE id = $2',
        [JSON.stringify(otherInfo), applicantId],
      );

      // 3. Conditionally update applications: ONLY update if the job cluster is OPEN in the vacancies table
      // If the vacancy/cluster is closed/expired, retain the original blob ID
      const columnToUpdate = APPLICATION_DOC_COLUMNS[docType];
      if (!columnToUpdate) {
        throw new Error(`Unsupported document type: ${String(docType)}`);
      }

      let updateRes;
      if (
        targetApplicationIds &&
        Array.isArray(targetApplicationIds) &&
        targetApplicationIds.length > 0
      ) {
        updateRes = await client.query(
          `UPDATE applications a
           SET ${columnToUpdate} = $1, updated_at = NOW() 
           WHERE a.id = ANY($2::text[]) 
             AND (a.applicant_id = $3 OR a.applicant_id = $4) 
             AND (a.status IS NULL OR a.status NOT IN ('Hired', 'Archived', 'Cancelled', 'Rejected'))
             AND EXISTS (
               SELECT 1 FROM vacancies v 
               WHERE v.job_cluster_id::text = a.job_cluster_id::text 
                 AND LOWER(v.status) = 'open'
                 AND (v.posting_end IS NULL OR v.posting_end::date >= CURRENT_DATE)
                 AND (v.posting_start IS NULL OR v.posting_start::date <= CURRENT_DATE)
                 AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
             )
           RETURNING a.id`,
          [
            newBlobUrl,
            targetApplicationIds,
            applicantId,
            applicantId.toString(),
          ],
        );
      } else {
        updateRes = await client.query(
          `UPDATE applications a
           SET ${columnToUpdate} = $1, updated_at = NOW() 
           WHERE (a.applicant_id = $2 OR a.applicant_id = $3) 
             AND (a.status IS NULL OR a.status NOT IN ('Hired', 'Archived', 'Cancelled', 'Rejected'))
             AND EXISTS (
               SELECT 1 FROM vacancies v 
               WHERE v.job_cluster_id::text = a.job_cluster_id::text 
                 AND LOWER(v.status) = 'open'
                 AND (v.posting_end IS NULL OR v.posting_end::date >= CURRENT_DATE)
                 AND (v.posting_start IS NULL OR v.posting_start::date <= CURRENT_DATE)
                 AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
             )
           RETURNING a.id`,
          [newBlobUrl, applicantId, applicantId.toString()],
        );
      }

      const updatedAppIds = (updateRes.rows || []).map((r: any) => r.id);
      const affectedCount = updatedAppIds.length;

      // 4. Generate concurrency-safe batch number and insert per-application audit records
      const batchNumber = await this.getNextBatchNumber(applicantId, client);
      await this.logDocumentAuditPerApplication(
        applicantId,
        docType,
        newBlobUrl,
        batchNumber,
        client,
      );

      await client.query('COMMIT');

      return {
        success: true,
        batchNumber,
        newUrl: newBlobUrl,
        oldUrl: oldBlobUrl,
        affectedApplications: affectedCount,
        updatedApplicationIds: updatedAppIds,
        targetApplicationIds: targetApplicationIds || [],
        documents: otherInfo.documents,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getNextBatchNumber(
    applicantId: string | number,
    client?: any,
  ): Promise<number> {
    const db = client || pool;
    if (client) {
      // Transaction-level advisory lock on applicant ID
      await client.query('SELECT pg_advisory_xact_lock($1)', [
        Number(applicantId),
      ]);
    }

    const res = await db.query(
      `SELECT (COALESCE(
         (SELECT CASE WHEN batch_number ~ '^[0-9]+$' THEN batch_number::int ELSE 0 END
          FROM document_audit_logs
          WHERE applicant_id = $1
          ORDER BY CASE WHEN batch_number ~ '^[0-9]+$' THEN batch_number::int ELSE 0 END DESC
          LIMIT 1), 0) + 1) AS next_batch`,
      [applicantId.toString()],
    );
    return parseInt(res.rows[0].next_batch, 10);
  }

  async batchLogDocumentAuditRecords(
    records: Array<{
      applicantId: string | number;
      docType: string;
      newBlobUrl: string;
      affectedCount: number;
      applicationId: string | null;
      isOpen: boolean;
      batchNumber: string | number;
    }>,
    client?: any,
  ) {
    if (records.length === 0) return [];
    const db = client || pool;

    const values: any[] = [];
    const valuePlaceholders: string[] = [];

    records.forEach((rec, idx) => {
      const baseIdx = idx * 7;
      valuePlaceholders.push(
        `($${baseIdx + 1}, $${baseIdx + 2}, $${baseIdx + 3}, $${baseIdx + 4}, $${baseIdx + 5}, $${baseIdx + 6}, $${baseIdx + 7}, NOW())`,
      );
      values.push(
        rec.applicantId.toString(),
        rec.docType,
        rec.newBlobUrl,
        rec.affectedCount,
        rec.applicationId,
        rec.isOpen,
        rec.batchNumber.toString(),
      );
    });

    const queryText = `
      INSERT INTO document_audit_logs (
        applicant_id,
        document_type,
        new_blob_url,
        affected_applications_count,
        application_id,
        is_open,
        batch_number,
        created_at
      ) VALUES ${valuePlaceholders.join(',\n')}
      RETURNING *
    `;

    const result = await db.query(queryText, values);
    return result.rows;
  }

  async logDocumentAuditPerApplication(
    applicantId: string | number,
    docType: string,
    newBlobUrl: string,
    batchNumber: number,
    client?: any,
  ): Promise<number> {
    const db = client || pool;

    // 1. Determine all applications for the applicant and their vacancy status
    const appsRes = await db.query(
      `SELECT a.id,
              EXISTS (
                SELECT 1 FROM vacancies v 
                WHERE v.job_cluster_id::text = a.job_cluster_id::text 
                  AND LOWER(v.status) = 'open'
              ) AS is_open
       FROM applications a
       WHERE a.applicant_id = $1`,
      [applicantId.toString()],
    );

    const applications = appsRes.rows;
    const applicationCount = applications.length;

    if (applicationCount === 0) {
      await this.batchLogDocumentAuditRecords(
        [
          {
            applicantId,
            docType,
            newBlobUrl,
            affectedCount: 0,
            applicationId: null,
            isOpen: true,
            batchNumber,
          },
        ],
        db,
      );
    } else {
      const records = applications.map((app: any) => ({
        applicantId,
        docType,
        newBlobUrl,
        affectedCount: applicationCount,
        applicationId: app.id,
        isOpen: app.is_open,
        batchNumber,
      }));
      await this.batchLogDocumentAuditRecords(records, db);
    }

    return applicationCount;
  }

  async saveApplicantDocuments(
    applicantId: number,
    uploadedDocs: Array<{ docName: string; url: string }>,
  ) {
    // Retried on deadlock (40P01) / serialization (40001) failures.
    return withDeadlockRetry(() =>
      this.saveApplicantDocumentsOnce(applicantId, uploadedDocs),
    );
  }

  private async saveApplicantDocumentsOnce(
    applicantId: number,
    uploadedDocs: Array<{ docName: string; url: string }>,
  ) {
    if (uploadedDocs.length === 0) {
      return {
        success: true,
        affectedApplications: 0,
        batchNumber: 0,
        documents: {},
      };
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Concurrency-safe batch number generation with transaction lock
      const batchNumber = await this.getNextBatchNumber(applicantId, client);

      // 2. Fetch and lock applicant
      const appRes = await client.query(
        'SELECT * FROM applicants WHERE id = $1 FOR UPDATE',
        [applicantId],
      );
      if (appRes.rows.length === 0) {
        throw new Error('Applicant not found');
      }

      let otherInfo = appRes.rows[0].other_information || {};
      if (typeof otherInfo === 'string') {
        try {
          otherInfo = JSON.parse(otherInfo);
        } catch {
          otherInfo = {};
        }
      }
      if (!otherInfo.documents) otherInfo.documents = {};

      // 3. Query all applications for the applicant once
      const appsRes = await client.query(
        `SELECT a.id,
                EXISTS (
                  SELECT 1 FROM vacancies v 
                  WHERE v.job_cluster_id::text = a.job_cluster_id::text 
                    AND LOWER(v.status) = 'open'
                ) AS is_open
         FROM applications a
         WHERE a.applicant_id = $1`,
        [applicantId.toString()],
      );

      const applications = appsRes.rows;
      const applicationCount = applications.length;

      // 4. Build all audit records for simultaneous single-query batch insertion
      const auditRecords: Array<{
        applicantId: string | number;
        docType: string;
        newBlobUrl: string;
        affectedCount: number;
        applicationId: string | null;
        isOpen: boolean;
        batchNumber: string | number;
      }> = [];

      let hasLoi = false;
      let loiUrl = '';
      let hasSworn = false;
      let swornUrl = '';

      for (const { docName, url } of uploadedDocs) {
        otherInfo.documents[docName] = url;
        if (docName === 'profile_photo' || docName === 'Profile Photo') {
          otherInfo.photoUrl = url;
        }

        if (docName === 'Letter of Intent') {
          hasLoi = true;
          loiUrl = url;
        }
        if (docName === 'Sworn Declaration') {
          hasSworn = true;
          swornUrl = url;
        }

        if (applicationCount === 0) {
          auditRecords.push({
            applicantId,
            docType: docName,
            newBlobUrl: url,
            affectedCount: 0,
            applicationId: null,
            isOpen: true,
            batchNumber,
          });
        } else {
          for (const app of applications) {
            auditRecords.push({
              applicantId,
              docType: docName,
              newBlobUrl: url,
              affectedCount: applicationCount,
              applicationId: app.id,
              isOpen: app.is_open,
              batchNumber,
            });
          }
        }
      }

      // Execute simultaneous multi-row batch insert in 1 SQL query
      if (auditRecords.length > 0) {
        await this.batchLogDocumentAuditRecords(auditRecords, client);
      }

      // 5. Update open applications if Letter of Intent or Sworn Declaration were uploaded
      if (hasLoi) {
        await client.query(
          `UPDATE applications a
           SET letter_of_intent = $1, updated_at = NOW()
           WHERE a.applicant_id = $2
             AND (a.status IS NULL OR a.status NOT IN ('Hired', 'Archived', 'Cancelled', 'Rejected'))
             AND EXISTS (
               SELECT 1 FROM vacancies v
               WHERE v.job_cluster_id::text = a.job_cluster_id::text
                 AND LOWER(v.status) = 'open'
             )`,
          [loiUrl, applicantId.toString()],
        );
      }
      if (hasSworn) {
        await client.query(
          `UPDATE applications a
           SET sworn_document = $1, updated_at = NOW()
           WHERE a.applicant_id = $2
             AND (a.status IS NULL OR a.status NOT IN ('Hired', 'Archived', 'Cancelled', 'Rejected'))
             AND EXISTS (
               SELECT 1 FROM vacancies v
               WHERE v.job_cluster_id::text = a.job_cluster_id::text
                 AND LOWER(v.status) = 'open'
             )`,
          [swornUrl, applicantId.toString()],
        );
      }

      // 6. Update applicant master profile
      await client.query(
        'UPDATE applicants SET other_information = $1, updated_at = NOW() WHERE id = $2',
        [JSON.stringify(otherInfo), applicantId],
      );

      await client.query('COMMIT');

      return {
        success: true,
        batchNumber,
        affectedApplications: applicationCount,
        documents: otherInfo.documents,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async logDocumentAudit(
    applicantId: string | number,
    docType: string,
    newBlobUrl: string,
    affectedCount: number = 0,
    applicationId: string | null = null,
    isOpen: boolean = true,
    batchNumber?: string | number,
  ) {
    try {
      let resolvedBatchNumber = batchNumber;
      if (resolvedBatchNumber === undefined || resolvedBatchNumber === null) {
        resolvedBatchNumber = await this.getNextBatchNumber(applicantId);
      }

      const result = await pool.query(
        `INSERT INTO document_audit_logs (applicant_id, document_type, new_blob_url, affected_applications_count, application_id, is_open, batch_number, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING *`,
        [
          applicantId.toString(),
          docType,
          newBlobUrl,
          affectedCount,
          applicationId,
          isOpen,
          resolvedBatchNumber.toString(),
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error logging document audit:', error);
      return null;
    }
  }

  async getLatestDocumentAudit(
    applicantId: string | number,
    documentType: string,
    client?: any,
  ) {
    const db = client || pool;
    const result = await db.query(
      `SELECT *
       FROM public.document_audit_logs
       WHERE applicant_id = $1
         AND document_type = $2
       ORDER BY id DESC
       LIMIT 1`,
      [applicantId.toString(), documentType],
    );
    return result.rows[0] || null;
  }

  async getLatestDocumentAudits(applicantId: string | number, client?: any) {
    const db = client || pool;
    const result = await db.query(
      `SELECT DISTINCT ON (document_type)
         *
       FROM public.document_audit_logs
       WHERE applicant_id = $1
       ORDER BY document_type, id DESC`,
      [applicantId.toString()],
    );
    return result.rows;
  }

  async getDocumentAuditLogs(
    applicantId: string | number,
    latestOnly: boolean = false,
  ) {
    if (latestOnly) {
      return this.getLatestDocumentAudits(applicantId);
    }
    const result = await pool.query(
      `SELECT * FROM document_audit_logs 
       WHERE applicant_id = $1 
       ORDER BY created_at DESC, id DESC`,
      [applicantId.toString()],
    );
    return result.rows;
  }
}

export const DocumentsService = new DocumentsServiceClass();
