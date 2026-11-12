import { pool } from '../../database';
import { DocumentsService } from '../documents/documents.service';

/**
 * Application-readiness validation for POST /api/applicants/apply-job.
 * Returns the 400 message when the applicant profile is incomplete, or null when valid.
 */
export function validateApplicationReadiness(applicant: any): string | null {
  // 1. Validate Educational Background (Secondary and College required)
  const ed =
    typeof applicant.educational_background === 'string'
      ? JSON.parse(applicant.educational_background || '[]')
      : applicant.educational_background || [];

  let hasSecondary = false;
  let hasCollege = false;

  if (Array.isArray(ed)) {
    hasSecondary = ed.some(
      (item: any) =>
        (item?.level?.toUpperCase() === 'SECONDARY' ||
          item?.level === 'secondary') &&
        item?.school?.trim(),
    );
    hasCollege = ed.some(
      (item: any) =>
        (item?.level?.toUpperCase() === 'COLLEGE' ||
          item?.level === 'college') &&
        item?.school?.trim(),
    );
  } else if (typeof ed === 'object' && ed !== null) {
    hasSecondary = Boolean(ed.secondary?.school?.trim());
    hasCollege = Boolean(ed.college?.school?.trim());
  }

  if (!hasSecondary || !hasCollege) {
    return 'Position requires both Secondary and College educational background entries.';
  }

  // 2. Validate Legal Questionnaire, References, Government ID
  const qRes =
    typeof applicant.questionnaire_responses === 'string'
      ? JSON.parse(applicant.questionnaire_responses || '{}')
      : applicant.questionnaire_responses || {};

  const qIds = [
    '34a',
    '34b',
    '35a',
    '35b',
    '36',
    '37',
    '38a',
    '38b',
    '39',
    '40a',
    '40b',
    '40b_ethnic',
    '40c',
  ];
  const allQAnswered = qIds.every((id) => {
    const val = qRes[id] || qRes[`q${id}`];
    if (!val) return false;
    const ans = typeof val === 'string' ? val : val.answer;
    if (
      !ans ||
      (String(ans).toUpperCase() !== 'YES' && String(ans).toUpperCase() !== 'NO')
    )
      return false;
    if (String(ans).toUpperCase() === 'YES' && id !== '34a' && id !== '34b') {
      const details =
        typeof val === 'object'
          ? val.details
          : qRes[`q${id}_details`] || qRes[`${id}_details`];
      if (!details || String(details).trim() === '') return false;
    }
    return true;
  });

  const otherInfo =
    typeof applicant.other_information === 'string'
      ? JSON.parse(applicant.other_information || '{}')
      : applicant.other_information || {};

  // Parse references from otherInfo or qRes
  let refs = otherInfo.references;
  if (!Array.isArray(refs) || refs.length < 3) {
    const qRefs: any[] = [];
    for (const k in qRes) {
      const match = k.match(/ref(\d+)_(name|address|tel)/);
      if (match) {
        const idx = parseInt(match[1]) - 1;
        const field = match[2] === 'tel' ? 'telephone' : match[2];
        while (qRefs.length <= idx)
          qRefs.push({ name: '', address: '', telephone: '' });
        qRefs[idx][field] = qRes[k] || '';
      }
    }
    refs = qRefs;
  }

  const validRefs =
    Array.isArray(refs) &&
    refs.length >= 3 &&
    refs
      .slice(0, 3)
      .every(
        (r) =>
          r?.name?.trim() &&
          r?.address?.trim() &&
          (r?.telephone?.trim() || r?.contact?.trim() || r?.phone?.trim()),
      );

  let govId = otherInfo.governmentId;
  if (!govId || !govId.type) {
    govId = {
      type: qRes.gov_id_type || '',
      idNo: qRes.gov_id_no || '',
      datePlace: qRes.gov_id_issuance || '',
    };
  }
  const validGovId = Boolean(
    (govId.type || govId.idType)?.trim() &&
    (govId.idNo || govId.number)?.trim() &&
    (govId.datePlace || govId.datePlaceOfIssuance)?.trim(),
  );

  if (!allQAnswered || !validRefs || !validGovId) {
    return 'Legal Questionnaire, character references (min. 3), and Government ID details must be fully completed.';
  }

  return null;
}

class ApplicationsServiceClass {
  async applyJob(applicantId: number, jobTitle: string, jobClusterId?: string) {
    if (
      !jobClusterId ||
      jobClusterId === 'null' ||
      jobClusterId === 'undefined' ||
      String(jobClusterId).trim() === ''
    ) {
      throw new Error('Invalid job cluster ID provided.');
    }

    const applicantRes = await pool.query(
      'SELECT applicant_number, other_information FROM applicants WHERE id = $1',
      [applicantId],
    );
    const applicantRow = applicantRes.rows[0];
    const applicantNumber = applicantRow?.applicant_number || null;

    let otherInfo = applicantRow?.other_information || {};
    if (typeof otherInfo === 'string') {
      try {
        otherInfo = JSON.parse(otherInfo);
      } catch (e) { }
    }
    const letterOfIntent = otherInfo?.documents?.['Letter of Intent'] || null;
    const swornDocument = otherInfo?.documents?.['Sworn Declaration'] || null;

    console.log(
      `[DEBUG] applyJob started for applicantId=${applicantId}, jobClusterId=${jobClusterId}`,
    );

    const checkResult = await pool.query(
      'SELECT id, status, application_status FROM applications WHERE applicant_id = $1 AND job_cluster_id = $2',
      [applicantId.toString(), jobClusterId],
    );
    const hasActiveApp = checkResult.rows.some((row: any) => {
      const appStatus = String(row.application_status || '').trim().toUpperCase();
      const status = String(row.status || '').trim().toUpperCase();
      const isExcludedOrDisqualified =
        appStatus === 'EXCLUDED' ||
        appStatus === 'DISQUALIFIED' ||
        status === 'EXCLUDED' ||
        status === 'DISQUALIFIED';
      return !isExcludedOrDisqualified;
    });
    if (hasActiveApp) {
      throw new Error('You have already applied for this job cluster.');
    }

    const appId = require('crypto').randomUUID();
    console.log(`[DEBUG] applyJob generated appId=${appId}`);

    // Generate application_number in format YYYYMMDD-00001
    const today = new Date();
    // Use local timezone format if possible, but safely using UTC or basic padStart
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;

    const lastApp = await pool.query(
      `
      SELECT application_number FROM applications 
      WHERE application_number LIKE $1 
      ORDER BY application_number DESC LIMIT 1
    `,
      [`${dateStr}-%`],
    );

    let nextAppNum = 1;
    if (lastApp.rows.length > 0 && lastApp.rows[0].application_number) {
      const match = lastApp.rows[0].application_number.split('-');
      if (match.length > 1) {
        nextAppNum = parseInt(match[1], 10) + 1;
      }
    }
    const uniqueApplicationNumber = `${dateStr}-${String(nextAppNum).padStart(5, '0')}`;

    console.log(`[DEBUG] applyJob executing INSERT with args:`, [
      appId,
      uniqueApplicationNumber,
      applicantId.toString(),
      jobClusterId || null,
      letterOfIntent,
      swornDocument,
    ]);

    try {
      const result = await pool.query(
        `
        INSERT INTO applications (id, application_number, applicant_id, job_cluster_id, status, date_applied, created_at, letter_of_intent, sworn_document)
        VALUES ($1, $2, $3, $4, 'Pending', NOW(), NOW(), $5, $6)
        RETURNING *
      `,
        [
          appId,
          uniqueApplicationNumber,
          applicantId.toString(),
          jobClusterId || null,
          letterOfIntent,
          swornDocument,
        ],
      );

      // Log ALL uploaded documents into document_audit_logs simultaneously in a single batch insert
      const allDocs: Record<string, string> = {};
      if (otherInfo.documents && typeof otherInfo.documents === 'object') {
        for (const [key, val] of Object.entries(otherInfo.documents)) {
          const normKey =
            key === 'Personal Data Sheet'
              ? 'Notarized Personal Data Sheet'
              : key;
          allDocs[normKey] = val as string;
        }
      }
      if (letterOfIntent) {
        allDocs['Letter of Intent'] = letterOfIntent;
      }
      if (swornDocument) {
        allDocs['Sworn Declaration'] = swornDocument;
      }
      if (
        otherInfo.photoUrl &&
        !allDocs['Profile Photo'] &&
        !allDocs['profile_photo']
      ) {
        allDocs['Profile Photo'] = otherInfo.photoUrl;
      }

      const batchNumber = await DocumentsService.getNextBatchNumber(applicantId);
      const applyAuditRecords = Object.entries(allDocs)
        .filter(
          ([_, docUrl]) =>
            typeof docUrl === 'string' && docUrl.trim().length > 0,
        )
        .map(([docName, docUrl]) => ({
          applicantId,
          docType: docName,
          newBlobUrl: docUrl,
          affectedCount: 1,
          applicationId: appId,
          isOpen: true,
          batchNumber,
        }));

      if (applyAuditRecords.length > 0) {
        await DocumentsService.batchLogDocumentAuditRecords(applyAuditRecords);
      }

      // If applicant was invited for this job cluster, mark is_submitted = true in agap_invited
      try {
        const appRes = await pool.query(
          'SELECT email_address, alternate_email FROM applicants WHERE id = $1',
          [applicantId],
        );
        if (appRes.rows.length > 0 && jobClusterId) {
          const emails = [
            appRes.rows[0].email_address,
            appRes.rows[0].alternate_email,
          ]
            .filter(Boolean)
            .map((e: string) => e.trim().toLowerCase());
          if (emails.length > 0) {
            await pool.query(
              `UPDATE agap_invited 
               SET is_submitted = true, updated_at = NOW() 
               WHERE (job_cluster_id = $1 OR job_cluster_id::text = $1::text) 
                 AND LOWER(TRIM(email)) = ANY($2::text[])`,
              [jobClusterId, emails],
            );
          }
        }
      } catch (invErr) {
        console.warn(
          'Could not update agap_invited is_submitted status:',
          invErr,
        );
      }

      console.log(
        `[DEBUG] applyJob INSERT successful. Returning row:`,
        result.rows[0],
      );
      return result.rows[0];
    } catch (dbError) {
      console.error(`[DEBUG] applyJob INSERT failed:`, dbError);
      throw dbError;
    }
  }

  async findApplications(applicantId: number) {
    const result = await pool.query(
      `
      SELECT a.*, p.title as job_title, c.region as region, c.division as division, qe.overall_fit,
             (SELECT v.status FROM vacancies v WHERE v.job_cluster_id = c.id LIMIT 1) as vacancy_status,
             (SELECT MIN(v.posting_start) FROM vacancies v WHERE v.job_cluster_id = c.id) as posting_start,
             (SELECT MAX(v.posting_end) FROM vacancies v WHERE v.job_cluster_id = c.id) as posting_end,
             (SELECT v.item_no FROM vacancies v WHERE v.job_cluster_id = c.id LIMIT 1) as item_no,
             p.salary_grade as salary_grade,
             (EXISTS (
               SELECT 1 FROM agap_invited ai 
               JOIN applicants app ON LOWER(TRIM(ai.email)) IN (
                 LOWER(TRIM(COALESCE(app.email_address, ''))), 
                 LOWER(TRIM(COALESCE(app.alternate_email, ''))),
                 LOWER(TRIM(COALESCE(app.email, '')))
               )
               WHERE app.id = $1 AND (ai.job_cluster_id IS NULL OR ai.job_cluster_id::text = c.id::text OR REPLACE(ai.job_cluster_id::text, '-', '') = REPLACE(c.id::text, '-', ''))
                 AND (ai.is_revoked IS NOT TRUE)
             )) as is_invited
      FROM applications a
      LEFT JOIN job_clusters c ON a.job_cluster_id::text = c.id::text
      LEFT JOIN positions p ON c.position_id = p.id
      LEFT JOIN (
        SELECT application_id, MAX(overall_fit) as overall_fit
        FROM qual_evals
        GROUP BY application_id
      ) qe ON a.id = qe.application_id
      WHERE a.applicant_id = $1
    `,
      [applicantId.toString()],
    );
    return result.rows.map((r) => ({
      ...r,
      position_id: r.job_cluster_id,
      application_status: r.application_status || r.status,
      is_invited: Boolean(r.is_invited),
      isInvited: Boolean(r.is_invited),
    }));
  }

  async toggleSavedJob(applicantId: number, jobClusterId: string) {
    const checkResult = await pool.query(
      'SELECT id, is_saved FROM saved_clusters WHERE applicant_id = $1 AND job_cluster_id = $2',
      [applicantId, jobClusterId],
    );
    const existing = checkResult.rows[0];

    if (existing) {
      const newStatus = !existing.is_saved;
      await pool.query(
        'UPDATE saved_clusters SET is_saved = $1 WHERE id = $2',
        [newStatus, existing.id],
      );
      return { status: newStatus ? 'added' : 'removed' };
    } else {
      await pool.query(
        `
        INSERT INTO saved_clusters (applicant_id, job_cluster_id, is_saved)
        VALUES ($1, $2, true)
      `,
        [applicantId, jobClusterId],
      );
      return { status: 'added' };
    }
  }

  async findSavedJobs(applicantId: number) {
    const result = await pool.query(
      `
      SELECT job_cluster_id as position_id
      FROM saved_clusters 
      WHERE applicant_id = $1 AND is_saved = true
    `,
      [applicantId],
    );
    return result.rows;
  }
}

export const ApplicationsService = new ApplicationsServiceClass();
