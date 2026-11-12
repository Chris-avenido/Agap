import * as bcrypt from 'bcryptjs';
import { pool } from '../database';
const pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';
import * as jwt from 'jsonwebtoken';
import { uploadToReclassAzure } from '../utils/azureStorage';
import { compressPdf } from '../utils/pdfCompressor';
import { DocumentsService } from '../features/documents/documents.service';
import { ApplicationsService } from '../features/applications/applications.service';
import { ApplicantProfileService } from '../features/applicant-profile/applicant-profile.service';

/**
 * reclass_gc no longer stores first_name, last_name, region, division or
 * reclass_position. Names come from gmis_gc_items (via gmis_id); region,
 * division and reclass_position come from ref.initial_reclass (via item_no).
 * Use this derived table wherever the old columns were read, aliased as the
 * table name (or `r`) so existing unqualified references keep working.
 */
const RECLASS_GC_FULL = `(
  SELECT rg.*,
         gi.first_name AS first_name,
         gi.last_name AS last_name,
         ir.region AS region,
         ir.division AS division,
         ir.reclass_position AS reclass_position
  FROM reclass_gc rg
  LEFT JOIN gmis_gc_items gi ON gi.id = rg.gmis_id
  LEFT JOIN ref.initial_reclass ir ON ir.psi_cd = rg.item_no
)`;

export interface ReclassRegisterDto {
  item_number?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  passcode: string;
  new_application?: boolean;
  region?: string;
  division?: string;
  school_id?: string;
  school_name?: string;
  current_position?: string;
  desired_position?: string;
  reclass_position?: string;
  education?: string;
  years_experience?: number | string;
  hours_of_training?: number | string;
  eligibility?: string;
}

class ApplicantsServiceClass {
  async parseResume(file: any) {
    try {
      let rawText = '';
      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.buffer);
        rawText = data.text;
      } else if (
        file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        rawText = result.value;
      } else {
        throw new Error();
      }

      if (!rawText || rawText.trim().length === 0) {
        throw new Error();
      }

      const parsedData = {
        surname: '',
        first_name: '',
        middle_name: '',
        email_address: '',
        mobile_no: '',
        residential_address: '',
        sex: '',
        work_experience: [] as any[],
      };

      // 1. Extract Email Address
      const emailMatch = rawText.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
      );
      if (emailMatch) parsedData.email_address = emailMatch[1];

      // 2. Extract Mobile Number (Philippine formats like 0917-123-4567, +63917...)
      const phoneMatch = rawText.match(/(?:\+63|0)\d{2}[-\s]?\d{3}[-\s]?\d{4}/);
      if (phoneMatch) parsedData.mobile_no = phoneMatch[0];

      // 3. Extract Sex/Gender
      if (/\b(male)\b/i.test(rawText)) parsedData.sex = 'Male';
      else if (/\b(female)\b/i.test(rawText)) parsedData.sex = 'Female';

      // 4. Basic Name Heuristics
      // We assume the very first non-empty line of the resume contains the name
      const lines = rawText
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      if (lines.length > 0) {
        // Strip out common title prefixes like "Resume" or "CV"
        let topNameLine = lines[0];
        if (
          /resume|curriculum vitae|cv/i.test(topNameLine) &&
          lines.length > 1
        ) {
          topNameLine = lines[1];
        }

        const nameParts = topNameLine.split(' ').filter((n) => n.length > 0);
        if (nameParts.length >= 3) {
          parsedData.first_name = nameParts[0];
          parsedData.middle_name = nameParts[1];
          parsedData.surname = nameParts.slice(2).join(' ');
        } else if (nameParts.length === 2) {
          parsedData.first_name = nameParts[0];
          parsedData.surname = nameParts[1];
        } else if (nameParts.length === 1) {
          parsedData.first_name = nameParts[0];
        }
      }

      // 5. Basic Address Heuristics
      const addressMatch = rawText.match(
        /(?:address|location|residence)[\s:]*([A-Za-z0-9\s,.-]+(?:City|Province|St|Street|Ave|Subdivision|Village))/i,
      );
      if (addressMatch) {
        parsedData.residential_address = addressMatch[1].trim();
      }

      // 6. Work Experience Heuristics
      // Try to find a section titled "Experience", "Employment", or "Work History"
      const workExpRegex =
        /(?:experience|employment|work history|professional experience)[\s\S]*?(?:education|skills|references|projects|certifications|$)/i;
      const workExpMatch = rawText.match(workExpRegex);
      if (workExpMatch) {
        const workText = workExpMatch[0];
        const workLines = workText
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

        let currentWork = { company: '', position: '' };
        let jobCount = 0;

        for (let i = 1; i < workLines.length; i++) {
          const line = workLines[i];
          // Look for lines containing years/dates indicating a job duration (e.g. 2018 - 2020)
          if (
            /(?:19|20)\d{2}.*(?:19|20)\d{2}|present|now|current/i.test(line)
          ) {
            if (currentWork.company || currentWork.position) {
              parsedData.work_experience.push({ ...currentWork });
              jobCount++;
              if (jobCount >= 4) break;
              currentWork = { company: '', position: '' };
            }

            // Heuristic: The two lines above the date are usually the Position Title and Company Name
            if (i > 0) currentWork.position = workLines[i - 1];
            if (i > 1 && !/(?:19|20)\d{2}/.test(workLines[i - 2])) {
              currentWork.company = workLines[i - 2];
            }
          }
        }

        if ((currentWork.company || currentWork.position) && jobCount < 4) {
          parsedData.work_experience.push(currentWork);
        }
      }

      return parsedData;
    } catch (error: any) {
      console.error('Resume Parsing Error:', error);
      throw new Error();
    }
  }

  async findOne(id: number) {
    const result = await pool.query('SELECT * FROM applicants WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  }

  async findByEmail(email_address: string) {
    const result = await pool.query(
      `SELECT id, applicant_number, email_address, first_name, middle_name, surname,
              registrant_type, plantilla_item_number
       FROM applicants WHERE LOWER(TRIM(email_address)) = LOWER(TRIM($1)) LIMIT 1`,
      [email_address],
    );
    return result.rows[0];
  }

  async login(
    email_address: string,
    password_raw: string,
    loginMethod?: string,
  ) {
    const result = await pool.query(
      `SELECT * FROM applicants 
       WHERE LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) 
          OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1))
          OR UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1))
       ORDER BY updated_at DESC NULLS LAST, id DESC`,
      [email_address],
    );
    if (!result.rows || result.rows.length === 0) return null;

    let matchedApplicant: any = null;

    for (const app of result.rows) {
      let isMatch = false;
      if (loginMethod === 'passcode') {
        if (app.passcode && app.passcode === password_raw) {
          isMatch = true;
        } else if (app.passcode_hash) {
          isMatch = await bcrypt.compare(password_raw, app.passcode_hash);
        }
      } else if (loginMethod === 'password') {
        if (app.password_hash) {
          isMatch = await bcrypt.compare(password_raw, app.password_hash);
        } else if (app.password) {
          isMatch = app.password === password_raw;
        }
      } else {
        if (app.passcode && app.passcode === password_raw) {
          isMatch = true;
        } else if (app.passcode_hash) {
          isMatch = await bcrypt.compare(password_raw, app.passcode_hash);
        } else if (app.password_hash) {
          isMatch = await bcrypt.compare(password_raw, app.password_hash);
        } else if (app.password) {
          isMatch = app.password === password_raw;
        }
      }

      if (isMatch) {
        matchedApplicant = app;
        break;
      }
    }

    if (!matchedApplicant) return null;
    const applicant = matchedApplicant;

    let plantillaToEnsure = applicant.plantilla_item_number;
    if (!plantillaToEnsure && applicant.surname && applicant.first_name) {
      const incRes = await pool.query(
        `SELECT item_no FROM ${RECLASS_GC_FULL} reclass_gc WHERE UPPER(TRIM(last_name)) = UPPER(TRIM($1)) AND UPPER(TRIM(first_name)) = UPPER(TRIM($2)) LIMIT 1`,
        [applicant.surname, applicant.first_name],
      );
      if (incRes.rows.length > 0 && incRes.rows[0].item_no) {
        plantillaToEnsure = incRes.rows[0].item_no;
        await pool.query(
          `UPDATE applicants SET plantilla_item_number = $1 WHERE id = $2`,
          [plantillaToEnsure, applicant.id],
        );
        applicant.plantilla_item_number = plantillaToEnsure;
      }
    }
    return applicant;
  }

  // Application methods live in features/applications/applications.service.ts; delegates keep callers unchanged.
  applyJob(...args: Parameters<typeof ApplicationsService.applyJob>) {
    return ApplicationsService.applyJob(...args);
  }

  findApplications(...args: Parameters<typeof ApplicationsService.findApplications>) {
    return ApplicationsService.findApplications(...args);
  }

  toggleSavedJob(...args: Parameters<typeof ApplicationsService.toggleSavedJob>) {
    return ApplicationsService.toggleSavedJob(...args);
  }

  findSavedJobs(...args: Parameters<typeof ApplicationsService.findSavedJobs>) {
    return ApplicationsService.findSavedJobs(...args);
  }


  // Profile methods live in features/applicant-profile/applicant-profile.service.ts; delegates keep callers unchanged.
  create(...args: Parameters<typeof ApplicantProfileService.create>) {
    return ApplicantProfileService.create(...args);
  }

  changePassword(...args: Parameters<typeof ApplicantProfileService.changePassword>) {
    return ApplicantProfileService.changePassword(...args);
  }

  update(...args: Parameters<typeof ApplicantProfileService.update>) {
    return ApplicantProfileService.update(...args);
  }

  forgotPassword(...args: Parameters<typeof ApplicantProfileService.forgotPassword>) {
    return ApplicantProfileService.forgotPassword(...args);
  }

  resetPassword(...args: Parameters<typeof ApplicantProfileService.resetPassword>) {
    return ApplicantProfileService.resetPassword(...args);
  }

  setPasscode(...args: Parameters<typeof ApplicantProfileService.setPasscode>) {
    return ApplicantProfileService.setPasscode(...args);
  }


  // Document methods live in features/documents/documents.service.ts; delegates keep callers unchanged.
  replaceApplicantDocument(...args: Parameters<typeof DocumentsService.replaceApplicantDocument>) {
    return DocumentsService.replaceApplicantDocument(...args);
  }

  getNextBatchNumber(...args: Parameters<typeof DocumentsService.getNextBatchNumber>) {
    return DocumentsService.getNextBatchNumber(...args);
  }

  batchLogDocumentAuditRecords(...args: Parameters<typeof DocumentsService.batchLogDocumentAuditRecords>) {
    return DocumentsService.batchLogDocumentAuditRecords(...args);
  }

  logDocumentAuditPerApplication(...args: Parameters<typeof DocumentsService.logDocumentAuditPerApplication>) {
    return DocumentsService.logDocumentAuditPerApplication(...args);
  }

  saveApplicantDocuments(...args: Parameters<typeof DocumentsService.saveApplicantDocuments>) {
    return DocumentsService.saveApplicantDocuments(...args);
  }

  logDocumentAudit(...args: Parameters<typeof DocumentsService.logDocumentAudit>) {
    return DocumentsService.logDocumentAudit(...args);
  }

  getLatestDocumentAudit(...args: Parameters<typeof DocumentsService.getLatestDocumentAudit>) {
    return DocumentsService.getLatestDocumentAudit(...args);
  }

  getLatestDocumentAudits(...args: Parameters<typeof DocumentsService.getLatestDocumentAudits>) {
    return DocumentsService.getLatestDocumentAudits(...args);
  }

  getDocumentAuditLogs(...args: Parameters<typeof DocumentsService.getDocumentAuditLogs>) {
    return DocumentsService.getDocumentAuditLogs(...args);
  }


  async ensureReclassificationApplication(
    applicantId: number | null,
    plantillaItemNumber?: string | null,
    clientOrPool?: any,
    targetPosition?: string,
    division?: string,
  ) {
    const db = clientOrPool || pool;
    let normalizedPlantilla = (plantillaItemNumber || '').trim().toUpperCase();

    // 1. Fetch incumbent details from reclass_gc by item_no or applicantId
    let incumbent: any = null;
    if (normalizedPlantilla) {
      const incRes = await db.query(
        `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
         LIMIT 1`,
        [normalizedPlantilla],
      );
      incumbent = incRes.rows[0] || null;
    }

    if (!incumbent && applicantId) {
      const applicantRes = await db.query(
        `SELECT plantilla_item_number, surname, first_name FROM applicants WHERE id = $1`,
        [applicantId],
      );
      const appRow = applicantRes.rows[0];
      const applicantPlantilla = appRow?.plantilla_item_number;
      if (applicantPlantilla) {
        normalizedPlantilla = applicantPlantilla.trim().toUpperCase();
        const incByAppPlantilla = await db.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );
        incumbent = incByAppPlantilla.rows[0] || null;
      } else if (appRow?.surname && appRow?.first_name) {
        const incByName = await db.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
           WHERE UPPER(TRIM(last_name)) = UPPER(TRIM($1)) AND UPPER(TRIM(first_name)) = UPPER(TRIM($2))
           LIMIT 1`,
          [appRow.surname, appRow.first_name],
        );
        incumbent = incByName.rows[0] || null;
        if (incumbent?.item_no) {
          normalizedPlantilla = incumbent.item_no.trim().toUpperCase();
        }
      }
    }

    const gcId = incumbent?.id || null;
    const itemNo =
      normalizedPlantilla ||
      incumbent?.item_no ||
      (applicantId ? `APP-${applicantId}` : '');

    // 2. If incumbent exists, update targetPosition or division if provided
    if (incumbent) {
      const updates: string[] = [];
      const params: any[] = [];
      let paramIdx = 1;

      if (targetPosition && (incumbent.desired_position !== targetPosition || incumbent.desire_position !== targetPosition)) {
        updates.push(`desired_position = $${paramIdx++}`);
        params.push(targetPosition);
        incumbent.desired_position = targetPosition;
        incumbent.reclass_position = targetPosition;
      }
      // division now lives in ref.initial_reclass; not stored on reclass_gc

      if (updates.length > 0) {
        params.push(incumbent.id);
        await db.query(
          `UPDATE reclass_gc SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIdx}`,
          params,
        );
      }
      return incumbent;
    }

    return incumbent;
  }

  async verifyPlantillaItem(applicantId: number, plantillaItemNumber: string) {
    const normalized = String(plantillaItemNumber || '')
      .trim()
      .toUpperCase();
    if (!normalized) {
      throw new Error('Plantilla item number is required.');
    }

    // 1. Look up in gmis_gc_items first
    const gmisRes = await pool.query(
      `SELECT * FROM gmis_gc_items
       WHERE UPPER(TRIM(COALESCE(psi_cd, ''))) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalized],
    );

    const gmisItem = gmisRes.rows[0] || null;

    // 2. Check reclass_gc
    const gcRes = await pool.query(
      `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
       WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1))
          OR UPPER(TRIM(COALESCE(new_item_no, ''))) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalized],
    );

    let incumbent = gcRes.rows[0] || null;

    if (!gmisItem && !incumbent) {
      throw new Error('No records found.');
    }

    if (gmisItem) {
      const fPos = String(gmisItem.f_pos || '').trim().toUpperCase();
      const initialAssessment = gmisItem.initial_assessment ? String(gmisItem.initial_assessment).trim() : '';
      const hasInitialAssessment = Boolean(
        initialAssessment &&
        initialAssessment.toUpperCase() !== 'NULL' &&
        initialAssessment.toUpperCase() !== 'N/A'
      );

      if (fPos !== 'FILLED') {
        throw new Error('This Plantilla Item Number is currently unfilled. Only filled positions can be registered for Incumbent Plantilla Registration.');
      }
      if (!hasInitialAssessment) {
        throw new Error('This Plantilla Item Number has no initial assessment. Only filled positions with an initial assessment can be registered for Incumbent Plantilla Registration.');
      }
    }

    if (!incumbent && gmisItem) {
      // Register existing Plantilla Item Number in reclass_gc
      const insertGc = await pool.query(
        `INSERT INTO reclass_gc (
          item_no,
          current_position,
          school_id,
          school_name,
          stage_of_reclassification,
          desired_position,
          gmis_id,
          is_test,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, 'UPDATING OF DOCUMENTS', $5, $6, false, NOW(), NOW())
        RETURNING *`,
        [
          normalized,
          gmisItem.pos_dsc || gmisItem.current_position || 'Guidance Counselor',
          gmisItem.school_id || null,
          gmisItem.school_name || null,
          gmisItem.initial_assessment || null,
          gmisItem.id || null,
        ],
      );
      incumbent = insertGc.rows[0];
    }

    // Link the applicant's record to the verified plantilla item number
    await pool.query(
      `UPDATE applicants SET plantilla_item_number = $1, updated_at = NOW() WHERE id = $2`,
      [normalized, applicantId],
    );

    return incumbent;
  }

  async getReclassDetails(applicantId: number) {
    let incumbent: any = null;
    const applicantRes = await pool.query(
      `SELECT plantilla_item_number, surname, first_name, email, email_address FROM applicants WHERE id = $1`,
      [applicantId],
    );
    const appRow = applicantRes.rows[0];
    const plantillaItemNumber = appRow?.plantilla_item_number;

    if (plantillaItemNumber) {
      const incRes = await pool.query(
        `SELECT r.*, g.initial_assessment, g.psi_cd as gmis_psi_cd
         FROM ${RECLASS_GC_FULL} r
         LEFT JOIN gmis_gc_items g ON (
           (r.item_no IS NOT NULL AND TRIM(r.item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.item_no)))
           OR (r.new_item_no IS NOT NULL AND TRIM(r.new_item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.new_item_no)))
           OR g.reclass_gc_id = r.id
         )
         WHERE UPPER(TRIM(r.item_no)) = UPPER(TRIM($1))
            OR UPPER(TRIM(r.new_item_no)) = UPPER(TRIM($1))
         LIMIT 1`,
        [plantillaItemNumber],
      );
      incumbent = incRes.rows[0] || null;
    } else if (appRow?.surname && appRow?.first_name) {
      const incByName = await pool.query(
        `SELECT r.*, g.initial_assessment, g.psi_cd as gmis_psi_cd
         FROM ${RECLASS_GC_FULL} r
         LEFT JOIN gmis_gc_items g ON (
           (r.item_no IS NOT NULL AND TRIM(r.item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.item_no)))
           OR (r.new_item_no IS NOT NULL AND TRIM(r.new_item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.new_item_no)))
           OR g.reclass_gc_id = r.id
         )
         WHERE UPPER(TRIM(r.last_name)) = UPPER(TRIM($1)) AND UPPER(TRIM(r.first_name)) = UPPER(TRIM($2))
         LIMIT 1`,
        [appRow.surname, appRow.first_name],
      );
      incumbent = incByName.rows[0] || null;
    }

    if (!incumbent && (appRow?.email || appRow?.email_address)) {
      const email = appRow.email || appRow.email_address;
      const incByEmail = await pool.query(
        `SELECT r.*, g.initial_assessment, g.psi_cd as gmis_psi_cd
         FROM ${RECLASS_GC_FULL} r
         LEFT JOIN gmis_gc_items g ON (
           (r.item_no IS NOT NULL AND TRIM(r.item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.item_no)))
           OR (r.new_item_no IS NOT NULL AND TRIM(r.new_item_no) <> '' AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.new_item_no)))
           OR g.reclass_gc_id = r.id
         )
         WHERE LOWER(TRIM(r.email)) = LOWER(TRIM($1))
         LIMIT 1`,
        [email],
      );
      incumbent = incByEmail.rows[0] || null;
    }

    if (!incumbent && plantillaItemNumber) {
      const gmisOnly = await pool.query(
        `SELECT *, initial_assessment FROM gmis_gc_items WHERE UPPER(TRIM(psi_cd)) = UPPER(TRIM($1)) LIMIT 1`,
        [plantillaItemNumber],
      );
      if (gmisOnly.rows[0]) {
        incumbent = {
          item_no: gmisOnly.rows[0].psi_cd,
          current_position: gmisOnly.rows[0].pos_dsc,
          first_name: gmisOnly.rows[0].first_name,
          last_name: gmisOnly.rows[0].last_name,
          region: gmisOnly.rows[0].region,
          division: gmisOnly.rows[0].division,
          initial_assessment: gmisOnly.rows[0].initial_assessment,
        };
      }
    }

    const reclassApp = incumbent || null;

    if (!incumbent) return null;

    const fullName = (incumbent?.first_name || incumbent?.last_name)
      ? `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim()
      : (appRow?.first_name || appRow?.surname)
        ? `${appRow.first_name || ''} ${appRow.surname || ''}`.trim()
        : null;

    const currentPosition =
      reclassApp?.current_position ||
      incumbent?.current_position ||
      'Guidance Counselor';
    const desiredPosition =
      incumbent?.desired_position ||
      incumbent?.desire_position ||
      reclassApp?.reclass_position ||
      incumbent?.reclass_position ||
      null;
    const targetPosition = desiredPosition;
    const newPosition =
      incumbent?.new_position ||
      reclassApp?.new_position ||
      null;
    const reclassPosition =
      newPosition ||
      incumbent?.reclass_position ||
      reclassApp?.reclass_position ||
      null;
    const indicativePosition =
      newPosition ||
      incumbent?.indicative_position ||
      reclassApp?.indicative_position ||
      targetPosition ||
      'School Counselor II';

    const getSalaryGradeForPosition = (posName?: string | null): string | null => {
      if (!posName) return null;
      const upper = posName.toUpperCase().trim();

      // Schools Division Counselor track
      if (
        upper.includes('SCHOOLS DIVISION COUNSELOR') ||
        upper.includes('SCHOOL DIVISION COUNSELOR') ||
        upper.includes('DIVISION COUNSELOR')
      )
        return '24';

      // School Counselor Associate track
      if (upper.includes('SCHOOL COUNSELOR ASSOCIATE V')) return '15';
      if (upper.includes('SCHOOL COUNSELOR ASSOCIATE IV')) return '14';
      if (upper.includes('SCHOOL COUNSELOR ASSOCIATE III')) return '13';
      if (upper.includes('SCHOOL COUNSELOR ASSOCIATE II')) return '12';
      if (
        upper.includes('SCHOOL COUNSELOR ASSOCIATE I') ||
        upper === 'SCHOOL COUNSELOR ASSOCIATE'
      )
        return '11';

      // School Counselor track
      if (upper.includes('SCHOOL COUNSELOR IV')) return '22';
      if (upper.includes('SCHOOL COUNSELOR III')) return '20';
      if (upper.includes('SCHOOL COUNSELOR II')) return '18';
      if (upper.includes('SCHOOL COUNSELOR I') || upper === 'SCHOOL COUNSELOR')
        return '16';

      // Incumbent Guidance track
      if (upper.includes('GUIDANCE SERVICES SPECIALIST II')) return '18';
      if (
        upper.includes('GUIDANCE SERVICES SPECIALIST I') ||
        upper.includes('GUIDANCE SERVICES SPECIALIST')
      )
        return '16';
      if (upper.includes('GUIDANCE COORDINATOR III')) return '16';
      if (upper.includes('GUIDANCE COORDINATOR II')) return '15';
      if (
        upper.includes('GUIDANCE COORDINATOR I') ||
        upper.includes('GUIDANCE COORDINATOR')
      )
        return '14';
      if (upper.includes('GUIDANCE COUNSELOR III')) return '13';
      if (upper.includes('GUIDANCE COUNSELOR II')) return '12';
      if (
        upper.includes('GUIDANCE COUNSELOR I') ||
        upper === 'GUIDANCE COUNSELOR' ||
        upper.includes('GUIDANCE COUNSELOR')
      )
        return '11';
      return null;
    };

    const isValidPositionValue = (val: unknown): val is string => {
      if (!val) return false;
      const normalized = String(val).trim().toUpperCase();
      return (
        normalized !== '' &&
        !['UNASSIGNED', '#N/A', 'N/A', 'NULL', '—'].includes(normalized)
      );
    };

    const rawGmisInitialPosition =
      incumbent?.initial_assessment ||
      incumbent?.initial_assessment_position ||
      null;
    const rawReclassPosition =
      incumbent?.reclass_position ||
      reclassApp?.reclass_position ||
      null;
    const initialPosition = isValidPositionValue(rawGmisInitialPosition)
      ? String(rawGmisInitialPosition).trim()
      : isValidPositionValue(rawReclassPosition)
        ? String(rawReclassPosition).trim()
        : null;

    const initialSalaryGrade =
      initialPosition
        ? (getSalaryGradeForPosition(initialPosition) || '')
        : '';

    // Count uploaded reclass documents
    const plantilla = incumbent?.item_no || plantillaItemNumber;
    let docCount = 0;
    if (plantilla) {
      const cRes = await pool.query(
        `SELECT COUNT(DISTINCT document_title) as cnt FROM reclass_documents 
         WHERE UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($1))
           AND file_url IS NOT NULL AND TRIM(file_url) != ''`,
        [plantilla],
      );
      docCount = parseInt(cRes.rows[0]?.cnt || '0', 10);
    }

    const stageOfReclass = (incumbent?.stage_of_reclassification && String(incumbent.stage_of_reclassification).trim())
      ? String(incumbent.stage_of_reclassification).trim().toUpperCase()
      : (docCount >= 8 ? 'FOR REVIEW' : (!initialPosition && incumbent?.new_application !== true ? 'PENDING APPLICATION' : 'UPDATING OF DOCUMENTS'));

    // Determine categorical current_stage (4-step workflow: SDO_EVALUATION -> RO_ENDORSEMENT -> DBM_NOSCA -> COMPLETED)
    let derivedCurrentStage = 'SDO_EVALUATION';
    if (
      incumbent?.nosca_serial_no ||
      (incumbent?.new_item_no && String(incumbent.new_item_no).trim() !== '' && String(incumbent.new_item_no).trim().toUpperCase() !== 'NULL') ||
      (stageOfReclass && ['APPOINTMENT', 'RECLASS PROPER', 'APPROVED', 'COMPLETED'].includes(stageOfReclass))
    ) {
      derivedCurrentStage = 'COMPLETED';
    } else if (stageOfReclass && stageOfReclass.includes('DBM')) {
      derivedCurrentStage = 'DBM_NOSCA';
    } else if (stageOfReclass && (stageOfReclass.includes('RO') || stageOfReclass.includes('REGIONAL'))) {
      derivedCurrentStage = 'RO_ENDORSEMENT';
    } else {
      derivedCurrentStage = 'SDO_EVALUATION';
    }

    const currentStage = (incumbent?.current_stage && String(incumbent.current_stage).trim() && String(incumbent.current_stage).trim().toUpperCase() !== 'UPDATING_DOCUMENTS')
      ? String(incumbent.current_stage).trim().toUpperCase()
      : derivedCurrentStage;

    const documentStatus = (incumbent?.document_status && String(incumbent.document_status).trim())
      ? String(incumbent.document_status).trim().toUpperCase()
      : (docCount >= 8 ? 'DOCUMENTS SUBMITTED' : (docCount > 0 ? 'PARTIAL SUBMISSION' : (incumbent?.new_application ? 'DOCUMENTS SUBMITTED' : 'PENDING APPLICATION')));

    const targetSalaryGrade = getSalaryGradeForPosition(targetPosition);
    const indicativeSalaryGrade = getSalaryGradeForPosition(indicativePosition);
    const currentSalaryGrade = getSalaryGradeForPosition(currentPosition);

    const posTitle = incumbent?.position_title || currentPosition;
    let positionSalaryGrade: string | null = null;
    if (posTitle) {
      try {
        const sgRes = await pool.query(
          `SELECT salary_grade FROM reclass_sg WHERE UPPER(TRIM(position_title)) = UPPER(TRIM($1)) LIMIT 1`,
          [posTitle],
        );
        if (sgRes.rows.length > 0 && sgRes.rows[0].salary_grade) {
          positionSalaryGrade = `SG-${sgRes.rows[0].salary_grade}`;
        }
      } catch (sgErr) { }
      if (!positionSalaryGrade) {
        positionSalaryGrade = getSalaryGradeForPosition(posTitle);
      }
    }

    return {
      ...(incumbent || {}),
      new_position: newPosition,
      full_name: fullName,
      plantilla_item_number: incumbent?.item_no || plantillaItemNumber || null,
      position_title: posTitle,
      position_salary_grade: positionSalaryGrade,
      target_position: targetPosition,
      desired_position: desiredPosition,
      desire_position: desiredPosition,
      reclass_position: reclassPosition,
      current_position: currentPosition,
      new_application: incumbent?.new_application === true,
      is_new_application: incumbent?.new_application === true,
      salary_grade:
        targetSalaryGrade ||
        indicativeSalaryGrade ||
        incumbent?.salary_grade ||
        reclassApp?.salary_grade ||
        currentSalaryGrade ||
        null,
      application_number:
        reclassApp?.school_name || incumbent?.school_name || null,
      school_name: reclassApp?.school_name || incumbent?.school_name || null,
      document_status: documentStatus,
      documents_status: documentStatus,
      document_checklist: incumbent?.document_checklist || null,
      documents_checklist: incumbent?.document_checklist || null,
      qs_status: incumbent?.qs_status || 'PENDING QS EVALUATION',
      new_item_no: incumbent?.new_item_no || null,
      evaluation_status:
        incumbent?.qs_status ||
        stageOfReclass,
      stage_of_reclassification: stageOfReclass,
      staging_of_reclassification: stageOfReclass,
      current_stage: currentStage,
      initial_assessment: initialPosition,
      initial_assessment_position: initialPosition,
      initial_assessment_salary_grade: initialSalaryGrade,
      is_initial_assessment_null: !initialPosition && incumbent?.new_application !== true,
      education: incumbent?.education || null,
      years_experience: incumbent?.years_experience !== null && incumbent?.years_experience !== undefined ? Number(incumbent.years_experience) : null,
      hours_of_training: incumbent?.hours_of_training !== null && incumbent?.hours_of_training !== undefined ? Number(incumbent.hours_of_training) : null,
      eligibility: incumbent?.eligibility || null,
      documents_count: docCount,
      required_documents_count: 8,
      submission_deadline: 'October 31, 2026',
      indicative_position: indicativePosition,
      indicative_salary_grade:
        indicativeSalaryGrade ||
        targetSalaryGrade ||
        incumbent?.indicative_salary_grade ||
        reclassApp?.indicative_salary_grade ||
        null,
      indicative_reclassification: initialPosition || indicativePosition || null,
      hrmo_assessment_result: incumbent?.qs_eval_result || incumbent?.qs_status || 'PENDING QS EVALUATION',
      stage_updated_at: incumbent?.stage_updated_at || incumbent?.updated_at || null,
      hrmo_updated_at: incumbent?.stage_updated_at || incumbent?.updated_at || null,
      updated_at: incumbent?.updated_at || null,
      last_modified: incumbent?.updated_at || null,
      ro_endorsement_status: (stageOfReclass || '').toUpperCase().includes('DBM')
        ? 'Endorsed to DBM RO'
        : ((stageOfReclass || '').toUpperCase().includes('RO') || (stageOfReclass || '').toUpperCase().includes('REGIONAL'))
          ? 'Endorsed to Regional Office'
          : 'Pending Regional Office Endorsement',
      is_endorsed_to_ro: Boolean(
        stageOfReclass &&
        (stageOfReclass.includes('RO') || stageOfReclass.includes('REGIONAL') || stageOfReclass.includes('DBM') || stageOfReclass === 'APPOINTMENT' || stageOfReclass === 'RECLASS PROPER' || stageOfReclass === 'APPROVED')
      ),
      is_endorsed_to_dbm: Boolean(
        stageOfReclass &&
        (stageOfReclass.includes('DBM') || stageOfReclass === 'APPOINTMENT' || stageOfReclass === 'RECLASS PROPER' || stageOfReclass === 'APPROVED')
      ),
      nosca_serial_no: incumbent?.nosca_serial_no || null,
      is_reclass_successful: Boolean(
        incumbent?.nosca_serial_no ||
        (incumbent?.new_item_no && String(incumbent.new_item_no).trim() !== '') ||
        (stageOfReclass && (stageOfReclass === 'APPOINTMENT' || stageOfReclass === 'RECLASS PROPER' || stageOfReclass === 'APPROVED'))
      ),
      update_application:
        (() => {
          const raw = incumbent?.update_application !== undefined ? incumbent?.update_application : reclassApp?.update_application;
          if (raw === true || (typeof raw === 'string' && raw.trim().toLowerCase() === 'yes')) return 'Yes';
          if (raw === false || (typeof raw === 'string' && raw.trim().toLowerCase() === 'no')) return 'No';
          return raw !== null && raw !== undefined && String(raw).trim() !== '' ? String(raw) : null;
        })(),
      is_registered:
        typeof incumbent?.is_registered === 'boolean'
          ? incumbent.is_registered
          : (typeof reclassApp?.is_registered === 'boolean' ? reclassApp.is_registered : null),
      reclass_application: reclassApp || null,
    };
  }

  isAssessedSCIV(pos?: string | null): boolean {
    if (!pos) return false;
    const clean = pos.toUpperCase().trim();
    if (clean.includes('ASSOCIATE')) return false;
    return (
      clean.includes('SCHOOL COUNSELOR IV') ||
      clean.includes('SC IV') ||
      clean === 'SC 4' ||
      clean.includes('COUNSELOR IV')
    );
  }

  async updateTargetPosition(
    applicantId: number,
    targetPosition: string,
    options?: {
      update_application?: boolean | string;
      is_registered?: boolean | string;
    },
  ) {
    const cleanPosition = (targetPosition || '').trim();
    if (!cleanPosition) {
      throw new Error('Target reclassification position is required.');
    }

    const appRes = await pool.query(
      `SELECT plantilla_item_number FROM applicants WHERE id = $1`,
      [applicantId],
    );
    const plantilla = appRes.rows[0]?.plantilla_item_number;

    if (plantilla) {
      const incRes = await pool.query(
        `SELECT g.initial_assessment, r.desired_position 
         FROM ${RECLASS_GC_FULL} r
         LEFT JOIN gmis_gc_items g ON (
           (r.item_no IS NOT NULL AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.item_no)))
           OR (r.new_item_no IS NOT NULL AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.new_item_no)))
           OR g.reclass_gc_id = r.id
         )
         WHERE UPPER(TRIM(r.item_no)) = UPPER(TRIM($1)) OR UPPER(TRIM(r.new_item_no)) = UPPER(TRIM($1))
         LIMIT 1`,
        [plantilla],
      );
      const inc = incRes.rows[0];
      const initialPos = inc?.initial_assessment || inc?.desired_position;

    }

    const parseBool = (val: any): boolean | null => {
      if (val === true || val === false) return val;
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        if (s === 'true' || s === 'yes' || s === '1' || s === 'registered') return true;
        if (s === 'false' || s === 'no' || s === '0' || s === 'not_registered') return false;
      }
      return null;
    };

    const parseYesNo = (val: any): string | null => {
      if (val === true) return 'Yes';
      if (val === false) return 'No';
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        if (s === 'yes' || s === 'true' || s === '1') return 'Yes';
        if (s === 'no' || s === 'false' || s === '0') return 'No';
        if (s !== '') return val.trim();
      }
      return null;
    };

    if (plantilla) {
      const updatesGc: string[] = [
        'desired_position = $1',
        'updated_at = NOW()',
      ];
      const paramsGc: any[] = [cleanPosition, plantilla];
      let pIdx = 3;

      const strUpdate = options?.update_application !== undefined ? parseYesNo(options.update_application) : null;
      const boolReg = options?.is_registered !== undefined ? parseBool(options.is_registered) : null;

      if (strUpdate !== null) {
        updatesGc.push(`update_application = $${pIdx++}`);
        paramsGc.push(strUpdate);
      }
      if (boolReg !== null) {
        updatesGc.push(`is_registered = $${pIdx++}`);
        paramsGc.push(boolReg);
      }

      await pool.query(
        `UPDATE reclass_gc SET ${updatesGc.join(', ')} WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($2))`,
        paramsGc,
      );
    }

    return this.getReclassDetails(applicantId);
  }

  async updateReclassApplicationPreference(
    applicantId: number,
    data: {
      update_application: boolean | string;
      is_registered?: boolean | string;
      target_position?: string;
      desire_position?: string;
      desired_position?: string;
      education?: string | null;
      years_experience?: number | string | null;
      year_of_experience?: number | string | null;
      hours_of_training?: number | string | null;
      eligibility?: string | null;
    },
  ) {
    const {
      update_application,
      is_registered,
      target_position,
      desire_position,
      desired_position,
      education,
      years_experience,
      year_of_experience,
      hours_of_training,
      eligibility,
    } = data;

    const parseBool = (val: any): boolean | null => {
      if (val === true || val === false) return val;
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        if (s === 'true' || s === 'yes' || s === '1' || s === 'registered') return true;
        if (s === 'false' || s === 'no' || s === '0' || s === 'not_registered') return false;
      }
      return null;
    };

    const parseYesNo = (val: any): string | null => {
      if (val === true) return 'Yes';
      if (val === false) return 'No';
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        if (s === 'yes' || s === 'true' || s === '1') return 'Yes';
        if (s === 'no' || s === 'false' || s === '0') return 'No';
        if (s !== '') return val.trim();
      }
      return null;
    };

    const strUpdate = update_application !== undefined ? parseYesNo(update_application) : null;
    const boolReg = is_registered !== undefined ? parseBool(is_registered) : null;
    const cleanPos = desired_position
      ? (desired_position || '').trim()
      : (target_position
        ? (target_position || '').trim()
        : (desire_position ? (desire_position || '').trim() : null));

    const reclassDetails = await this.getReclassDetails(applicantId);
    const initialPos = reclassDetails?.initial_assessment || reclassDetails?.desired_position;


    const gcId = reclassDetails?.id;
    const plantilla = reclassDetails?.plantilla_item_number || reclassDetails?.item_no;

    if (gcId || plantilla) {
      const updatesGc: string[] = ['updated_at = NOW()'];
      const paramsGc: any[] = [];
      let pIdx = 1;

      if (strUpdate !== null) {
        updatesGc.push(`update_application = $${pIdx++}`);
        paramsGc.push(strUpdate);
      }
      if (boolReg !== null) {
        updatesGc.push(`is_registered = $${pIdx++}`);
        paramsGc.push(boolReg);
      }
      if (cleanPos) {
        updatesGc.push(`desired_position = $${pIdx++}`);
        paramsGc.push(cleanPos);
      }
      if (education !== undefined) {
        const cleanEdu = education ? String(education).trim().toUpperCase() : null;
        updatesGc.push(`education = $${pIdx++}`);
        paramsGc.push(cleanEdu);
      }
      const expVal = years_experience !== undefined ? years_experience : year_of_experience;
      if (expVal !== undefined) {
        const numExp = expVal !== null && String(expVal).trim() !== '' ? Number(expVal) : null;
        updatesGc.push(`years_experience = $${pIdx++}`);
        paramsGc.push(numExp);
      }
      if (hours_of_training !== undefined) {
        const numTraining = hours_of_training !== null && String(hours_of_training).trim() !== '' ? Number(hours_of_training) : null;
        updatesGc.push(`hours_of_training = $${pIdx++}`);
        paramsGc.push(numTraining);
      }
      if (eligibility !== undefined) {
        const cleanElig = eligibility ? String(eligibility).trim().toUpperCase() : null;
        updatesGc.push(`eligibility = $${pIdx++}`);
        paramsGc.push(cleanElig);
      }

      if (gcId) {
        paramsGc.push(gcId);
        await pool.query(
          `UPDATE reclass_gc SET ${updatesGc.join(', ')} WHERE id = $${pIdx}`,
          paramsGc,
        );
      } else if (plantilla) {
        paramsGc.push(plantilla);
        await pool.query(
          `UPDATE reclass_gc SET ${updatesGc.join(', ')} WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($${pIdx})) OR UPPER(TRIM(new_item_no)) = UPPER(TRIM($${pIdx}))`,
          paramsGc,
        );
      }
    }

    // Sync with applicants table
    const updatesApp: string[] = ['updated_at = NOW()'];
    const paramsApp: any[] = [applicantId];
    let aIdx = 2;
    if (education !== undefined) {
      const cleanEdu = education ? String(education).trim().toUpperCase() : null;
      updatesApp.push(`bachelor_degree = $${aIdx++}`, `bachelors_degree = $${aIdx++}`);
      paramsApp.push(cleanEdu, cleanEdu);
    }
    const expVal = years_experience !== undefined ? years_experience : year_of_experience;
    if (expVal !== undefined) {
      const numExp = expVal !== null && String(expVal).trim() !== '' ? Number(expVal) : null;
      updatesApp.push(`years_experience = $${aIdx++}`);
      paramsApp.push(numExp);
    }
    if (hours_of_training !== undefined) {
      const numTraining = hours_of_training !== null && String(hours_of_training).trim() !== '' ? Number(hours_of_training) : null;
      updatesApp.push(`training_hours = $${aIdx++}`);
      paramsApp.push(numTraining);
    }
    if (eligibility !== undefined) {
      const cleanElig = eligibility ? String(eligibility).trim().toUpperCase() : null;
      updatesApp.push(`eligibility = $${aIdx++}`);
      paramsApp.push(cleanElig);
    }
    if (updatesApp.length > 1) {
      await pool.query(
        `UPDATE applicants SET ${updatesApp.join(', ')} WHERE id = $1`,
        paramsApp,
      );
    }

    return this.getReclassDetails(applicantId);
  }

  async applyForReclassification(
    applicantId: number,
    data: {
      education?: string | null;
      years_experience?: number | string | null;
      year_of_experience?: number | string | null;
      hours_of_training?: number | string | null;
      eligibility?: string | null;
      update_application?: boolean | string;
    },
  ) {
    return this.updateReclassApplicationPreference(applicantId, {
      update_application: 'Yes',
      education: data.education,
      years_experience: data.years_experience !== undefined ? data.years_experience : data.year_of_experience,
      hours_of_training: data.hours_of_training,
      eligibility: data.eligibility,
    });
  }

  async setReclassNewApplication(
    applicantId: number,
    isNewApp = true,
    data?: {
      education?: string | null;
      years_experience?: number | string | null;
      year_of_experience?: number | string | null;
      hours_of_training?: number | string | null;
      eligibility?: string | null;
    },
  ) {
    const reclassDetails = await this.getReclassDetails(applicantId);
    const plantilla =
      reclassDetails?.plantilla_item_number ||
      reclassDetails?.item_no ||
      null;
    const gcId = reclassDetails?.id;

    const updates: string[] = ['new_application = $1', 'updated_at = NOW()'];
    const params: any[] = [isNewApp];
    let pIdx = 2;

    if (data?.education !== undefined) {
      const cleanEdu = data.education ? String(data.education).trim().toUpperCase() : null;
      updates.push(`education = $${pIdx++}`);
      params.push(cleanEdu);
    }
    const expVal = data?.years_experience !== undefined ? data?.years_experience : data?.year_of_experience;
    if (expVal !== undefined) {
      const numExp = expVal !== null && String(expVal).trim() !== '' ? Number(expVal) : null;
      updates.push(`years_experience = $${pIdx++}`);
      params.push(numExp);
    }
    if (data?.hours_of_training !== undefined) {
      const numTraining = data.hours_of_training !== null && String(data.hours_of_training).trim() !== '' ? Number(data.hours_of_training) : null;
      updates.push(`hours_of_training = $${pIdx++}`);
      params.push(numTraining);
    }
    if (data?.eligibility !== undefined) {
      const cleanElig = data.eligibility ? String(data.eligibility).trim().toUpperCase() : null;
      updates.push(`eligibility = $${pIdx++}`);
      params.push(cleanElig);
    }

    if (plantilla) {
      await pool.query(
        `UPDATE reclass_gc
         SET ${updates.join(', ')}
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($${pIdx})) OR UPPER(TRIM(new_item_no)) = UPPER(TRIM($${pIdx}))`,
        [...params, plantilla],
      );
    }
    if (gcId) {
      await pool.query(
        `UPDATE reclass_gc
         SET ${updates.join(', ')}
         WHERE id = $${pIdx}`,
        [...params, gcId],
      );
    }

    // Sync to applicants table if qualification fields provided
    if (data && (data.education !== undefined || expVal !== undefined || data.hours_of_training !== undefined || data.eligibility !== undefined)) {
      const updatesApp: string[] = ['updated_at = NOW()'];
      const paramsApp: any[] = [applicantId];
      let aIdx = 2;
      if (data.education !== undefined) {
        const cleanEdu = data.education ? String(data.education).trim().toUpperCase() : null;
        updatesApp.push(`bachelor_degree = $${aIdx++}`, `bachelors_degree = $${aIdx++}`);
        paramsApp.push(cleanEdu, cleanEdu);
      }
      if (expVal !== undefined) {
        const numExp = expVal !== null && String(expVal).trim() !== '' ? Number(expVal) : null;
        updatesApp.push(`years_experience = $${aIdx++}`);
        paramsApp.push(numExp);
      }
      if (data.hours_of_training !== undefined) {
        const numTraining = data.hours_of_training !== null && String(data.hours_of_training).trim() !== '' ? Number(data.hours_of_training) : null;
        updatesApp.push(`training_hours = $${aIdx++}`);
        paramsApp.push(numTraining);
      }
      if (data.eligibility !== undefined) {
        const cleanElig = data.eligibility ? String(data.eligibility).trim().toUpperCase() : null;
        updatesApp.push(`eligibility = $${aIdx++}`);
        paramsApp.push(cleanElig);
      }
      if (updatesApp.length > 1) {
        await pool.query(
          `UPDATE applicants SET ${updatesApp.join(', ')} WHERE id = $1`,
          paramsApp,
        );
      }
    }

    return this.getReclassDetails(applicantId);
  }

  async getReclassPositionsQS() {
    const result = await pool.query(
      `SELECT id, position_title, salary_grade, monthly_salary, education, experience, training, eligibility, 
              COALESCE(years_experience, 0) as years_experience, 
              COALESCE(hours_of_training, 0) as hours_of_training
       FROM reclass_sg
       WHERE education IS NOT NULL
       ORDER BY salary_grade ASC, id ASC`
    );
    return result.rows.map((row: any) => ({
      ...row,
      salary_grade: Number(row.salary_grade),
      monthly_salary: Number(row.monthly_salary),
      years_experience: Number(row.years_experience),
      hours_of_training: Number(row.hours_of_training),
    }));
  }

  async checkCredentialsStatus(itemNumber: string) {
    const normalized = (itemNumber || '').trim().toUpperCase();
    if (!normalized) return null;

    const gcRes = await pool.query(
      `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
       WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1))
          OR UPPER(TRIM(COALESCE(new_item_no, ''))) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalized],
    );

    const gmisRes = await pool.query(
      `SELECT * FROM gmis_gc_items
       WHERE UPPER(TRIM(COALESCE(psi_cd, ''))) = UPPER(TRIM($1))
       ORDER BY id ASC
       LIMIT 1`,
      [normalized],
    );

    const inc = gcRes.rows[0] || null;
    const gmis = gmisRes.rows[0] || null;

    if (!inc && !gmis) return null;

    const isBlank = (val: any) =>
      val === null ||
      val === undefined ||
      String(val).trim() === '' ||
      String(val).trim().toUpperCase() === 'NULL';

    const incEmailNull = isBlank(inc?.email);
    const incPassNull = isBlank(inc?.password_hash) && isBlank(inc?.password);
    const incPasscodeNull = isBlank(inc?.passcode);

    const gmisEmailNull = isBlank(gmis?.email);
    const gmisPassNull = isBlank(gmis?.password) && isBlank(gmis?.password_hash);
    const gmisPasscodeNull = isBlank(gmis?.passcode);

    // Permit registration/claim if existing record's email, password, and passcode are all NULL
    const canClaim =
      incEmailNull &&
      incPassNull &&
      incPasscodeNull &&
      gmisEmailNull &&
      gmisPassNull &&
      gmisPasscodeNull;

    const item = inc || gmis;
    return {
      canClaim,
      data: item
        ? {
            item_number: (item.item_no || item.psi_cd || normalized).toUpperCase(),
            current_position: (item.current_position || item.pos_dsc || 'GUIDANCE COUNSELOR').toUpperCase(),
            region: (item.region || '').toUpperCase(),
            division: (item.division || '').toUpperCase(),
            school_name: (item.school_name || '').toUpperCase(),
            school_id: item.school_id || '',
            first_name: (item.first_name || '').trim().toUpperCase(),
            last_name: (item.last_name || '').trim().toUpperCase(),
            email: '',
            mobile_number: item.mobile_number || '',
            initial_assessment: gmis?.initial_assessment || item.initial_assessment || '',
            indicative_reclassification: gmis?.initial_assessment || item.initial_assessment || '',
            education: (item.education || '').toUpperCase(),
            years_experience:
              item.years_experience !== undefined && item.years_experience !== null
                ? String(item.years_experience)
                : '',
            hours_of_training:
              item.hours_of_training !== undefined && item.hours_of_training !== null
                ? String(item.hours_of_training)
                : '',
            eligibility: (item.eligibility || '').toUpperCase(),
          }
        : null,
    };
  }

  async verifyReclassItemNumber(
    itemNumber: string,
    category: 'existing' | 'new' = 'existing',
  ) {
    const normalized = (itemNumber || '').trim().toUpperCase();
    if (!normalized) {
      return {
        status: 'not_found',
        message: 'Plantilla Item Number is required.',
      };
    }

    // 1. Verify existence in gmis_gc_items
    const gmisRes = await pool.query(
      `SELECT * FROM gmis_gc_items 
       WHERE UPPER(TRIM(COALESCE(psi_cd, ''))) = UPPER(TRIM($1))
       ORDER BY id ASC
       LIMIT 1`,
      [normalized],
    );

    if (gmisRes.rows.length === 0) {
      return {
        status: 'not_found',
        message: 'No records found for this Plantilla Item Number in GMIS.',
      };
    }

    const gmisItem = gmisRes.rows[0];

    // Strict Validation: Only filled guidance counselor items with an existing indicative reclassification are allowed to register
    const fPos = String(gmisItem.f_pos || '').trim().toUpperCase();
    if (fPos !== 'FILLED') {
      return {
        status: 'invalid',
        message: 'Registration is restricted to filled guidance counselor positions only. This plantilla item is currently unfilled/vacant.',
      };
    }

    const posTitle = String(gmisItem.pos_dsc || gmisItem.current_position || '').trim().toUpperCase();
    if (!posTitle.includes('GUIDANCE')) {
      return {
        status: 'invalid',
        message: 'Registration is restricted to Guidance Counselor plantilla positions only.',
      };
    }

    const rawInitialAssessment = gmisItem.initial_assessment ? String(gmisItem.initial_assessment).trim() : '';
    const hasInitialAssessment = Boolean(
      rawInitialAssessment &&
      rawInitialAssessment.toUpperCase() !== 'NULL' &&
      rawInitialAssessment.toUpperCase() !== 'N/A' &&
      rawInitialAssessment.toUpperCase() !== '#N/A' &&
      rawInitialAssessment.toUpperCase() !== 'UNASSIGNED' &&
      rawInitialAssessment.toUpperCase() !== '—'
    );

    if (!hasInitialAssessment) {
      return {
        status: 'invalid',
        message: 'Registration is restricted to guidance counselor items with an existing indicative reclassification. This plantilla item has no indicative reclassification on record.',
      };
    }

    // Check existing registration status in reclass_gc
    const gcRes = await pool.query(
      `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
       WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1))
          OR UPPER(TRIM(COALESCE(new_item_no, ''))) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalized],
    );

    let inc = gcRes.rows[0] || null;

    const isBlank = (val: any) =>
      val === null ||
      val === undefined ||
      String(val).trim() === '' ||
      String(val).trim().toUpperCase() === 'NULL';

    const incHasEmail = inc && !isBlank(inc.email);
    const incHasPassword =
      inc && (!isBlank(inc.password_hash) || !isBlank(inc.password));
    const incHasPasscode = inc && !isBlank(inc.passcode);

    const gmisHasEmail = !isBlank(gmisItem.email);
    const gmisHasPassword =
      !isBlank(gmisItem.password) ||
      !isBlank(gmisItem.password_hash);
    const gmisHasPasscode = !isBlank(gmisItem.passcode);

    // If existing record's email, password, and passcode are all NULL,
    // bypass the HTTP 409 conflict error and permit registration/claiming
    const credentialsAreNull =
      !incHasEmail &&
      !incHasPassword &&
      !incHasPasscode &&
      !gmisHasEmail &&
      !gmisHasPassword &&
      !gmisHasPasscode;

    if (!credentialsAreNull) {
      // Check if already registered in applicants table
      const appRes = await pool.query(
        `SELECT id, password_hash, passcode_hash, email_address, email, registrant_type FROM applicants 
         WHERE UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1)) 
         LIMIT 1`,
        [normalized],
      );

      if (appRes.rows.length > 0) {
        const appRow = appRes.rows[0];
        const hasRealEmail =
          (appRow.email && appRow.email.trim() && !appRow.email.toLowerCase().startsWith('no-email-')) ||
          (appRow.email_address && appRow.email_address.trim() && !appRow.email_address.toLowerCase().startsWith('no-email-'));
        const hasPassword = !isBlank(appRow.password_hash) || !isBlank(appRow.passcode_hash);

        if (hasRealEmail && hasPassword && appRow.registrant_type === 'reclass') {
          return {
            status: 'already_registered',
            message: 'This Plantilla Item Number is already registered. Please sign in.',
          };
        }
      }

      // Check if already registered in reclass_gc with active credentials
      if (inc && incHasEmail && (incHasPassword || incHasPasscode)) {
        return {
          status: 'already_registered',
          message: 'This Plantilla Item Number is already registered. Please sign in.',
        };
      }
    }

    if (!inc) {
      const insertGcRes = await pool.query(
        `INSERT INTO reclass_gc (
          item_no,
          current_position,
          school_id,
          school_name,
          stage_of_reclassification,
          desired_position,
          gmis_id,
          is_test,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, 'UPDATING OF DOCUMENTS', $5, $6, false, NOW(), NOW())
        RETURNING *`,
        [
          normalized,
          gmisItem.pos_dsc || gmisItem.current_position || 'Guidance Counselor',
          gmisItem.school_id || null,
          gmisItem.school_name || null,
          gmisItem.initial_assessment || null,
          gmisItem.id || null,
        ],
      );
      inc = insertGcRes.rows[0];
    }

    return {
      status: 'valid',
      data: {
        item_number: (inc.item_no || normalized).toUpperCase(),
        current_position: (inc.current_position || gmisItem.pos_dsc || 'GUIDANCE COUNSELOR').toUpperCase(),
        region: (inc.region || gmisItem.region || '').toUpperCase(),
        division: (inc.division || gmisItem.division || '').toUpperCase(),
        school_name: (inc.school_name || gmisItem.school_name || '').toUpperCase(),
        school_id: inc.school_id || gmisItem.school_id || '',
        first_name: (inc.first_name || gmisItem.first_name || '').trim().toUpperCase(),
        last_name: (inc.last_name || gmisItem.last_name || '').trim().toUpperCase(),
        email: (inc.email || gmisItem.email || '').trim().toLowerCase(),
        mobile_number: inc.mobile_number || '',
        initial_assessment: rawInitialAssessment,
        indicative_reclassification: rawInitialAssessment,
        education: (inc.education || '').toUpperCase(),
        years_experience: inc.years_experience !== undefined && inc.years_experience !== null ? String(inc.years_experience) : '',
        hours_of_training: inc.hours_of_training !== undefined && inc.hours_of_training !== null ? String(inc.hours_of_training) : '',
        eligibility: (inc.eligibility || '').toUpperCase(),
      },
    };
  }

  async registerReclassAccount(data: ReclassRegisterDto) {
    const isNewApp = Boolean(data.new_application);
    const normalizedItemNo = (data.item_number || '').trim().toUpperCase();
    if (!normalizedItemNo) {
      throw new Error('Plantilla Item Number is required.');
    }
    const cleanFirstName = isNewApp
      ? (data.first_name || '').trim().toUpperCase()
      : (data.first_name || '').trim();
    const cleanMiddleName = data.middle_name && data.middle_name.trim()
      ? (isNewApp ? data.middle_name.trim().toUpperCase() : data.middle_name.trim())
      : null;
    const cleanLastName = isNewApp
      ? (data.last_name || '').trim().toUpperCase()
      : (data.last_name || '').trim();
    const cleanMobile = (data.mobile_number || '').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const password = data.password;
    const passcode = (data.passcode || '').trim();

    if (!cleanFirstName || !cleanLastName) {
      throw new Error('First Name and Last Name are required.');
    }
    if (!cleanMobile || !/^09\d{9}$/.test(cleanMobile)) {
      throw new Error(
        'Mobile number must be an 11-digit Philippine mobile number (09XXXXXXXXX).',
      );
    }
    const checkEmail = cleanEmail.toLowerCase();
    if (!checkEmail || !checkEmail.endsWith('@deped.gov.ph') || !/^[a-zA-Z0-9._%+-]+@deped\.gov\.ph$/.test(checkEmail)) {
      throw new Error('Only official @deped.gov.ph email addresses are allowed for Reclassification.');
    }
    if (!password || !String(password).trim()) {
      throw new Error('Password is required.');
    }
    if (!passcode || !/^\d{6}$/.test(passcode)) {
      throw new Error('Passcode must be exactly 6 numeric digits.');
    }

    // 1. Verify against GMIS records in gmis_gc_items
    let inc: any = null;

    // Strict validation: Only filled guidance counselor items with an existing indicative reclassification are allowed to register
    const gmisRes = await pool.query(
      `SELECT * FROM gmis_gc_items
       WHERE UPPER(TRIM(COALESCE(psi_cd, ''))) = UPPER(TRIM($1))
       ORDER BY id ASC
       LIMIT 1`,
      [normalizedItemNo],
    );

    if (gmisRes.rows.length === 0) {
      const err: any = new Error('No records found for this Plantilla Item Number in GMIS.');
      err.statusCode = 404;
      throw err;
    }

    const gmisItem = gmisRes.rows[0];

    const fPos = String(gmisItem.f_pos || '').trim().toUpperCase();
    if (fPos !== 'FILLED') {
      const err: any = new Error(
        'Registration is restricted to filled guidance counselor positions only. This plantilla item is currently unfilled/vacant.',
      );
      err.statusCode = 400;
      throw err;
    }

    const posTitle = String(gmisItem.pos_dsc || gmisItem.current_position || '').trim().toUpperCase();
    if (!posTitle.includes('GUIDANCE')) {
      const err: any = new Error(
        'Registration is restricted to Guidance Counselor plantilla positions only.',
      );
      err.statusCode = 400;
      throw err;
    }

    const rawInitialAssessment = gmisItem.initial_assessment ? String(gmisItem.initial_assessment).trim() : '';
    const hasInitialAssessment = Boolean(
      rawInitialAssessment &&
      rawInitialAssessment.toUpperCase() !== 'NULL' &&
      rawInitialAssessment.toUpperCase() !== 'N/A' &&
      rawInitialAssessment.toUpperCase() !== '#N/A' &&
      rawInitialAssessment.toUpperCase() !== 'UNASSIGNED' &&
      rawInitialAssessment.toUpperCase() !== '—'
    );

    if (!hasInitialAssessment) {
      const err: any = new Error(
        'Registration is restricted to guidance counselor items with an existing indicative reclassification. This plantilla item has no indicative reclassification on record.',
      );
      err.statusCode = 400;
      throw err;
    }

    // 2. Check if already in reclass_gc
    const gcRes = await pool.query(
      `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
       WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1))
          OR UPPER(TRIM(COALESCE(new_item_no, ''))) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalizedItemNo],
    );

    inc = gcRes.rows[0] || null;

    if (!inc) {
      // Register in the table of reclass_gc
      const insertGcRes = await pool.query(
        `INSERT INTO reclass_gc (
          item_no,
          current_position,
          school_id,
          school_name,
          stage_of_reclassification,
          desired_position,
          gmis_id,
          is_test,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, 'UPDATING OF DOCUMENTS', $5, $6, false, NOW(), NOW())
        RETURNING *`,
        [
          normalizedItemNo,
          gmisItem.pos_dsc || gmisItem.current_position || 'Guidance Counselor',
          gmisItem.school_id || null,
          gmisItem.school_name || null,
          gmisItem.initial_assessment || null,
          gmisItem.id || null,
        ],
      );
      inc = insertGcRes.rows[0];
    }

    const isBlank = (val: any) =>
      val === null ||
      val === undefined ||
      String(val).trim() === '' ||
      String(val).trim().toUpperCase() === 'NULL';

    const incEmailNull = isBlank(inc?.email);
    const incPassNull = isBlank(inc?.password_hash) && isBlank(inc?.password);
    const incPasscodeNull = isBlank(inc?.passcode);

    const gmisEmailNull = isBlank(gmisItem?.email);
    const gmisPassNull = isBlank(gmisItem?.password) && isBlank(gmisItem?.password_hash);
    const gmisPasscodeNull = isBlank(gmisItem?.passcode);

    // If existing record's email, password, and passcode are all NULL in reclass_gc and gmis_gc_items,
    // this plantilla item is unclaimed and available to be claimed by registration.
    const isUnclaimedItem =
      incEmailNull &&
      incPassNull &&
      incPasscodeNull &&
      gmisEmailNull &&
      gmisPassNull &&
      gmisPasscodeNull;

    const finalFirstName = isNewApp
      ? (cleanFirstName || (inc.first_name ? inc.first_name.trim().toUpperCase() : 'APPLICANT'))
      : (cleanFirstName || inc.first_name || 'Applicant');
    const finalLastName = isNewApp
      ? (cleanLastName || (inc.last_name ? inc.last_name.trim().toUpperCase() : 'RECLASS'))
      : (cleanLastName || inc.last_name || 'Reclass');

    // 2. Check existing applicant for this plantilla item number
    const existingItem = await pool.query(
      `SELECT id, password_hash, passcode_hash, email_address, email, registrant_type FROM applicants 
       WHERE UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1)) 
       LIMIT 1`,
      [normalizedItemNo],
    );

    let existingApplicantId: number | null = null;
    if (existingItem.rows.length > 0) {
      const appRow = existingItem.rows[0];
      const hasRealEmail =
        (appRow.email && appRow.email.trim() && !appRow.email.toLowerCase().startsWith('no-email-')) ||
        (appRow.email_address && appRow.email_address.trim() && !appRow.email_address.toLowerCase().startsWith('no-email-'));
      const hasPassword =
        !isBlank(appRow.password_hash) ||
        !isBlank(appRow.passcode_hash) ||
        (inc && (!isBlank(inc.password_hash) || !isBlank(inc.passcode)));

      const hasReclassEmail = Boolean(inc && !isBlank(inc.email));
      if (!isUnclaimedItem && hasReclassEmail && hasRealEmail && hasPassword && appRow.registrant_type === 'reclass') {
        const err: any = new Error(
          'This Plantilla Item Number is already registered. Please sign in.',
        );
        err.statusCode = 409;
        throw err;
      }
      existingApplicantId = appRow.id;
    }

    // Check uniqueness of email in reclass_gc for any other plantilla item number
    const existingReclassEmail = await pool.query(
      `SELECT item_no, email, password_hash, password, passcode FROM reclass_gc 
       WHERE LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1))
         AND UPPER(TRIM(COALESCE(item_no, ''))) <> UPPER(TRIM($2))
       LIMIT 1`,
      [cleanEmail, normalizedItemNo],
    );
    if (existingReclassEmail.rows.length > 0) {
      const otherRow = existingReclassEmail.rows[0];
      const otherHasCreds =
        (!isBlank(otherRow.password_hash) || !isBlank(otherRow.password)) &&
        !isBlank(otherRow.passcode);
      if (otherHasCreds) {
        const err: any = new Error(
          'This DepEd email is already registered in GMIS reclassification records.',
        );
        err.statusCode = 409;
        throw err;
      }
    }

    // Check uniqueness of email across other applicants
    const existingEmail = await pool.query(
      `SELECT id, plantilla_item_number, registrant_type, password_hash, passcode_hash FROM applicants 
       WHERE (LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) 
          OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1)))
         AND ($2::int IS NULL OR id <> $2)
       LIMIT 1`,
      [cleanEmail, existingApplicantId],
    );
    if (existingEmail.rows.length > 0) {
      const emailAppRow = existingEmail.rows[0];
      if (isUnclaimedItem) {
        // If email, password, and passcode are NULL in reclass_gc and gmis_gc_items,
        // bypass the 409 conflict error and allow registration to proceed as an UPDATE operation to claim the account.
        if (!existingApplicantId) {
          existingApplicantId = emailAppRow.id;
        }
      } else {
        const err: any = new Error(
          'This DepEd email address is already registered to another account.',
        );
        err.statusCode = 409;
        throw err;
      }
    }

    // 3. Hash password and passcode via bcryptjs
    const password_hash = await bcrypt.hash(password, 10);
    const passcode_hash = await bcrypt.hash(passcode, 10);

    // 4. Save into database inside transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('LOCK TABLE applicants IN EXCLUSIVE MODE');

      const designation = isNewApp
        ? (data.current_position || inc.current_position || 'GUIDANCE COUNSELOR').trim().toUpperCase()
        : (inc.current_position || data.current_position || 'Guidance Counselor');
      const region = isNewApp
        ? (data.region || inc.region ? String(data.region || inc.region).trim().toUpperCase() : null)
        : (inc.region || data.region || null);
      const division = isNewApp
        ? (data.division || inc.division ? String(data.division || inc.division).trim().toUpperCase() : null)
        : (inc.division || data.division || null);
      const schoolName = isNewApp
        ? (data.school_name || inc.school_name ? String(data.school_name || inc.school_name).trim().toUpperCase() : null)
        : (data.school_name || null);
      const education = isNewApp
        ? (data.education ? String(data.education).trim().toUpperCase() : (inc.education ? String(inc.education).trim().toUpperCase() : null))
        : (data.education || null);
      const eligibility = isNewApp
        ? (data.eligibility ? String(data.eligibility).trim().toUpperCase() : (inc.eligibility ? String(inc.eligibility).trim().toUpperCase() : null))
        : (data.eligibility || null);

      let applicant: any;

      if (existingApplicantId) {
        // Clear plantilla_item_number on any other applicant to prevent conflicts
        await client.query(
          `UPDATE applicants SET plantilla_item_number = NULL 
           WHERE UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1)) 
             AND id <> $2`,
          [normalizedItemNo, existingApplicantId],
        );

        const updateRes = await client.query(
          `UPDATE applicants SET
            surname = $1,
            first_name = $2,
            middle_name = COALESCE($3, middle_name),
            email_address = $4,
            email = $4,
            password_hash = $5,
            passcode_hash = $6,
            passcode = $7,
            mobile_no = $8,
            mobile_number = $8,
            registrant_type = 'reclass',
            plantilla_item_number = $9,
            current_designation = COALESCE(current_designation, $10),
            region = COALESCE(region, $11),
            division = COALESCE(division, $12),
            bachelor_degree = COALESCE($13::varchar, bachelor_degree),
            bachelors_degree = COALESCE($13::text, bachelors_degree),
            eligibility = COALESCE($14, eligibility),
            years_experience = COALESCE($15, years_experience),
            training_hours = COALESCE($16, training_hours),
            updated_at = NOW()
          WHERE id = $17
          RETURNING *`,
          [
            finalLastName,
            finalFirstName,
            cleanMiddleName,
            cleanEmail,
            password_hash,
            passcode_hash,
            passcode,
            cleanMobile,
            normalizedItemNo,
            designation,
            region,
            division,
            education,
            eligibility,
            data.years_experience !== undefined && data.years_experience !== null && String(data.years_experience).trim() !== '' ? Number(data.years_experience) : null,
            data.hours_of_training !== undefined && data.hours_of_training !== null && String(data.hours_of_training).trim() !== '' ? Number(data.hours_of_training) : null,
            existingApplicantId,
          ],
        );
        applicant = updateRes.rows[0];
      } else {
        const lastApplicant = await client.query(
          `SELECT applicant_number FROM applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY id DESC LIMIT 1`,
        );
        let nextApplicantNum = 1;
        if (
          lastApplicant.rows.length > 0 &&
          lastApplicant.rows[0].applicant_number
        ) {
          const match =
            lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
          if (match) {
            nextApplicantNum = parseInt(match[1], 10) + 1;
          }
        }
        const newApplicantNumber = `AGAP-${String(nextApplicantNum).padStart(4, '0')}`;

        const insertRes = await client.query(
          `INSERT INTO applicants (
            applicant_number, surname, first_name, middle_name,
            email_address, email, password_hash, passcode_hash, passcode,
            mobile_no, mobile_number, registrant_type, plantilla_item_number,
            current_designation, region, division,
            bachelor_degree, bachelors_degree, eligibility, years_experience, training_hours,
            is_test, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4,
            $5, $5, $6, $7, $8,
            $9, $9, 'reclass', $10,
            $11, $12, $13,
            $14::varchar, $14::text, $15, $16, $17,
            false, NOW(), NOW()
          ) RETURNING *`,
          [
            newApplicantNumber,
            finalLastName,
            finalFirstName,
            cleanMiddleName,
            cleanEmail,
            password_hash,
            passcode_hash,
            passcode,
            cleanMobile,
            normalizedItemNo,
            designation,
            region,
            division,
            education,
            eligibility,
            data.years_experience !== undefined && data.years_experience !== null && String(data.years_experience).trim() !== '' ? Number(data.years_experience) : null,
            data.hours_of_training !== undefined && data.hours_of_training !== null && String(data.hours_of_training).trim() !== '' ? Number(data.hours_of_training) : null,
          ],
        );
        applicant = insertRes.rows[0];
      }

      // Update or insert credentials and contact info in reclass_gc via plantilla item number
      await client.query(
        `UPDATE reclass_gc SET 
          email = $1, 
          password_hash = $2, 
          passcode = $3, 
          mobile_number = $4, 
          new_application = CASE WHEN $5 = TRUE THEN TRUE ELSE new_application END,
          education = COALESCE($6, education),
          years_experience = COALESCE($7, years_experience),
          hours_of_training = COALESCE($8, hours_of_training),
          eligibility = COALESCE($9, eligibility),
          school_name = COALESCE($10, school_name),
          current_position = COALESCE($11, current_position),
          stage_of_reclassification = COALESCE(stage_of_reclassification, 'UPDATING OF DOCUMENTS'),
          updated_at = NOW() 
        WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($12)) 
           OR UPPER(TRIM(COALESCE(new_item_no, ''))) = UPPER(TRIM($12))
           OR id = $13`,
        [
          cleanEmail,
          password_hash,
          passcode,
          cleanMobile,
          isNewApp,
          education,
          data.years_experience !== undefined && data.years_experience !== null && String(data.years_experience).trim() !== '' ? Number(data.years_experience) : null,
          data.hours_of_training !== undefined && data.hours_of_training !== null && String(data.hours_of_training).trim() !== '' ? Number(data.hours_of_training) : null,
          eligibility,
          schoolName,
          designation,
          normalizedItemNo,
          inc.id,
        ],
      );

      // Update email in gmis_gc_items if column exists
      try {
        await client.query(
          `UPDATE gmis_gc_items SET email = $1 
           WHERE UPPER(TRIM(COALESCE(psi_cd, ''))) = UPPER(TRIM($2))`,
          [cleanEmail, normalizedItemNo],
        );
      } catch (gmisErr) {
        console.warn('Note: Could not update email in gmis_gc_items:', gmisErr);
      }

      await client.query('COMMIT');

      const secret = process.env.JWT_SECRET || 'fallback_secret';
      const token = jwt.sign(
        {
          id: applicant.id,
          uid: applicant.id,
          applicant_number: applicant.applicant_number,
          email: applicant.email_address,
          role: 'reclass',
          registrant_type: 'reclass',
        },
        secret,
        { expiresIn: '8h' },
      );

      const resolvedFullName = [
        applicant.first_name,
        applicant.middle_name,
        applicant.surname,
      ]
        .filter(Boolean)
        .join(' ');

      return {
        token,
        user: {
          id: applicant.id,
          applicant_number: applicant.applicant_number,
          first_name: applicant.first_name,
          middle_name: applicant.middle_name,
          surname: applicant.surname,
          full_name: resolvedFullName,
          email: applicant.email_address,
          registrant_type: 'reclass',
          plantilla_item_number: applicant.plantilla_item_number,
          current_position: designation,
          region,
          division,
        },
      };
    } catch (err: any) {
      await client.query('ROLLBACK');
      if (err.code === '23505') {
        const dupErr: any = new Error(
          'Plantilla Item Number or Email is already registered.',
        );
        dupErr.statusCode = 409;
        throw dupErr;
      }
      throw err;
    } finally {
      client.release();
    }
  }

  async authenticateReclassAccount(
    emailOrItemNumber: string,
    credential: string,
    method: 'password' | 'passcode',
  ) {
    const cleanIdentifier = (emailOrItemNumber || '').trim();
    if (!cleanIdentifier || !credential) {
      return null;
    }

    let appRes = await pool.query(
      `SELECT * FROM applicants 
       WHERE LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) 
          OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1))
          OR UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1))
       ORDER BY updated_at DESC NULLS LAST, id DESC`,
      [cleanIdentifier],
    );

    let applicant: any = null;

    if (appRes.rows && appRes.rows.length > 0) {
      for (const app of appRes.rows) {
        let isMatch = false;
        if (method === 'passcode') {
          if (app.passcode_hash) {
            isMatch = await bcrypt.compare(credential, app.passcode_hash);
          } else if (app.passcode) {
            if (app.passcode.startsWith('$2')) {
              isMatch = await bcrypt.compare(credential, app.passcode);
            } else {
              isMatch = app.passcode === credential;
            }
          }
        } else {
          if (app.password_hash) {
            isMatch = await bcrypt.compare(credential, app.password_hash);
          } else if (app.password) {
            isMatch = app.password === credential;
          }
        }

        if (isMatch) {
          applicant = app;
          break;
        }
      }
    }

    if (!applicant) {
      // Fallback: check if record exists in reclass_gc directly
      const gcRes = await pool.query(
        `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc 
         WHERE LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1)) 
            OR UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1))
         LIMIT 1`,
        [cleanIdentifier],
      );
      if (gcRes.rows.length > 0) {
        const gc = gcRes.rows[0];
        let isGcMatch = false;
        if (method === 'passcode') {
          if (gc.passcode) {
            if (gc.passcode.startsWith('$2')) {
              isGcMatch = await bcrypt.compare(credential, gc.passcode);
            } else {
              isGcMatch = gc.passcode === credential;
            }
          }
        } else {
          if (gc.password_hash) {
            isGcMatch = await bcrypt.compare(credential, gc.password_hash);
          }
        }

        if (isGcMatch) {
          // Link / create applicant for this session
          const client = await pool.connect();
          try {
            await client.query('BEGIN');
            const newApplicantNumber = `AGAP-${Date.now().toString().slice(-4)}`;
            const insertApp = await client.query(
              `INSERT INTO applicants (
                applicant_number, surname, first_name, email_address, email,
                password_hash, passcode_hash, passcode, mobile_number,
                registrant_type, plantilla_item_number, current_designation,
                region, division, is_test, created_at, updated_at
              ) VALUES (
                $1, $2, $3, $4, $4,
                $5, $6, $7, $8,
                'reclass', $9, $10,
                $11, $12, false, NOW(), NOW()
              ) RETURNING *`,
              [
                newApplicantNumber,
                gc.last_name || '',
                gc.first_name || '',
                gc.email || `${cleanIdentifier.toLowerCase()}@deped.gov.ph`,
                gc.password_hash,
                gc.passcode
                  ? (gc.passcode.startsWith('$2')
                    ? gc.passcode
                    : await bcrypt.hash(gc.passcode, 10))
                  : null,
                gc.passcode,
                gc.mobile_number,
                gc.item_no,
                gc.current_position || 'Guidance Counselor',
                gc.region,
                gc.division,
              ],
            );
            applicant = insertApp.rows[0];
            await client.query('COMMIT');
          } catch {
            await client.query('ROLLBACK');
          } finally {
            client.release();
          }
        }
      }
    }

    if (!applicant) {
      return null;
    }

    // Query incumbent and reclass details
    let incumbent: any = null;
    if (applicant.plantilla_item_number) {
      const incRes = await pool.query(
        `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc 
         WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1)) 
         LIMIT 1`,
        [applicant.plantilla_item_number],
      );
      if (incRes.rows.length > 0) {
        incumbent = incRes.rows[0];
      }
    }

    const reclassApp = incumbent || null;

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      {
        id: applicant.id,
        uid: applicant.id,
        applicant_number: applicant.applicant_number,
        email: applicant.email_address,
        role: 'reclass',
        registrant_type: 'reclass',
      },
      secret,
      { expiresIn: '8h' },
    );

    const resolvedFullName =
      [applicant.first_name, applicant.middle_name, applicant.surname]
        .filter(Boolean)
        .join(' ') ||
      (incumbent?.first_name
        ? `${incumbent.first_name} ${incumbent.last_name || ''}`.trim()
        : 'Applicant');

    const user = {
      id: applicant.id,
      applicant_number: applicant.applicant_number,
      first_name: applicant.first_name,
      middle_name: applicant.middle_name,
      surname: applicant.surname,
      full_name: resolvedFullName,
      email: applicant.email_address,
      registrant_type: 'reclass',
      plantilla_item_number: applicant.plantilla_item_number,
      current_position:
        incumbent?.current_position ||
        applicant.current_designation ||
        'Guidance Counselor',
      target_position:
        incumbent?.target_position ||
        reclassApp?.reclass_position ||
        incumbent?.reclass_position ||
        null,
      reclass_position:
        incumbent?.reclass_position ||
        reclassApp?.reclass_position ||
        null,
      region: incumbent?.region || applicant.region || null,
      division: incumbent?.division || applicant.division || null,
      school_name: incumbent?.school_name || null,
      application_number:
        incumbent?.school_name || incumbent?.application_number || null,
      incumbent,
      reclass_application: reclassApp,
    };

    return {
      token,
      applicant,
      user,
    };
  }

  async reclassLogin(
    plantillaItemNumber?: string,
    inputFullName?: string,
    targetPosition?: string,
    region?: string,
    division?: string,
    currentPosition?: string,
    isExisting: boolean = true,
  ) {
    const normalizedPlantilla = (plantillaItemNumber || '')
      .trim()
      .toUpperCase();
    const cleanInputName = (inputFullName || '').trim();

    if (isExisting && !normalizedPlantilla) {
      throw new Error('Plantilla Item Number is required.');
    }
    if (!isExisting && !cleanInputName) {
      throw new Error(
        'Full Name is required for Non-Plantilla Reclassification.',
      );
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      let incumbent: any = null;
      let applicant: any = null;

      if (isExisting && normalizedPlantilla) {
        // 1. Verify incumbent strictly by item_no
        const incRes = await client.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );

        if (incRes.rows.length === 0) {
          throw new Error(
            'Plantilla Item Number not found in DepEd incumbent records. Please verify your number.',
          );
        }

        incumbent = incRes.rows[0];
        const incumbentFullName =
          `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim();

        if (
          (!incumbent.last_name && !incumbent.first_name) ||
          incumbent.last_name === '#N/A' ||
          incumbentFullName === ''
        ) {
          throw new Error(
            'This Plantilla Item is currently unassigned or vacant in DepEd records.',
          );
        }

        // 2. If Full Name is provided, verify matching against incumbent record
        if (
          cleanInputName &&
          !isIncumbentNameMatching(
            cleanInputName,
            incumbentFullName,
            incumbent.first_name,
            incumbent.last_name,
          )
        ) {
          throw new Error(
            'The Full Name provided does not match our incumbent records for this Plantilla Item Number.',
          );
        }

        // 3. Find or create applicant strictly by plantilla_item_number
        const appRes = await client.query(
          `SELECT * FROM applicants 
           WHERE UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );

        if (appRes.rows.length > 0) {
          applicant = appRes.rows[0];
        } else {
          await client.query('LOCK TABLE applicants IN EXCLUSIVE MODE');
          const lastApplicant = await client.query(
            `SELECT applicant_number FROM applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY id DESC LIMIT 1`,
          );
          let nextApplicantNum = 1;
          if (
            lastApplicant.rows.length > 0 &&
            lastApplicant.rows[0].applicant_number
          ) {
            const match =
              lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
            if (match) {
              nextApplicantNum = parseInt(match[1], 10) + 1;
            }
          }
          const newApplicantNumber = `AGAP-${String(nextApplicantNum).padStart(4, '0')}`;
          const placeholderEmail = `no-email-${Date.now()}@test.com`;
          const surname = incumbent.last_name || '';
          const firstName = incumbent.first_name || '';

          const insertAppRes = await client.query(
            `INSERT INTO applicants (
              applicant_number, surname, first_name,
              email_address, registrant_type, plantilla_item_number, is_test
            ) VALUES ($1, $2, $3, $4, 'reclass', $5, false)
            RETURNING *`,
            [
              newApplicantNumber,
              surname,
              firstName,
              placeholderEmail,
              normalizedPlantilla,
            ],
          );
          applicant = insertAppRes.rows[0];
        }

        // 4. Update region, division, reclass_position if provided
        const incUpdates: string[] = [];
        const incParams: any[] = [];
        let pIdx = 1;

        if (targetPosition && targetPosition.trim()) {
          incUpdates.push(`desired_position = $${pIdx++}`);
          incParams.push(targetPosition.trim());
          incumbent.desired_position = targetPosition.trim();
          incumbent.reclass_position = targetPosition.trim();
        }
        // region/division now live in ref.initial_reclass; not stored on reclass_gc

        if (incUpdates.length > 0) {
          incUpdates.push('updated_at = NOW()');
          incParams.push(incumbent.id);
          await client.query(
            `UPDATE reclass_gc
             SET ${incUpdates.join(', ')}
             WHERE id = $${pIdx}`,
            incParams,
          );
        }
      } else {
        // Non-plantilla / Designate path
        if (!normalizedPlantilla) {
          throw new Error(
            'Plantilla Item Number is required for Non-Plantilla / Designate Reclassification.',
          );
        }

        // 1. Check if plantilla number exists in gmis_gc_items.psi_cd
        const gmisRes = await client.query(
          `SELECT * FROM gmis_gc_items 
           WHERE UPPER(TRIM(psi_cd)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );
        const gmisExists = gmisRes.rows.length > 0;
        const gmisItem = gmisExists ? gmisRes.rows[0] : null;

        // 2. Check if already existing in reclass_gc by item_no
        const existingGcRes = await client.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );
        const gcExists = existingGcRes.rows.length > 0;

        // Case A: If already existing in reclass_gc -> Prompt user to log in via Plantilla Incumbent
        if (gcExists) {
          throw new Error(
            'This Plantilla Item Number is already registered in incumbent records. Please log in using the "Plantilla Incumbent" option.',
          );
        }

        // Case B: If not existing in both gmis_gc_items and reclass_gc -> No records found
        if (!gmisExists && !gcExists) {
          throw new Error(
            'No records found for this Plantilla Item Number in DepEd GMIS records. Please verify your Plantilla Item Number.',
          );
        }

        // Case C: If existing in gmis_gc_items and NOT in reclass_gc -> Insert new data in reclass_gc
        const { surname, firstName, middleName } =
          parseIncumbentName(cleanInputName);

        const gcSchoolId = gmisItem?.school_id || null;
        const gcSchoolName = gmisItem?.school_name || null;
        const gcCurrentPos =
          currentPosition ||
          gmisItem?.pos_dsc ||
          gmisItem?.current_position ||
          'Guidance Counselor (Designate)';
        const gcTargetPos = targetPosition || 'School Counselor Associate I';

        const insertGcRes = await client.query(
          `INSERT INTO reclass_gc (
            item_no, school_id, school_name, current_position,
            desired_position, gmis_id,
            stage_of_reclassification, is_test, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, 'For Review', false, NOW(), NOW())
          RETURNING *`,
          [
            normalizedPlantilla,
            gcSchoolId,
            gcSchoolName,
            gcCurrentPos,
            gcTargetPos,
            gmisItem?.id || null,
          ],
        );
        incumbent = insertGcRes.rows[0];

        // Find or create applicant
        const appRes = await client.query(
          `SELECT * FROM applicants 
           WHERE (
             (UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1)))
             OR (UPPER(TRIM(COALESCE(surname, ''))) = UPPER(TRIM($2)) AND UPPER(TRIM(COALESCE(first_name, ''))) = UPPER(TRIM($3)))
           )
           AND registrant_type = 'reclass'
           LIMIT 1`,
          [normalizedPlantilla, surname, firstName],
        );

        if (appRes.rows.length > 0) {
          applicant = appRes.rows[0];
          if (!applicant.plantilla_item_number && normalizedPlantilla) {
            await client.query(
              `UPDATE applicants SET plantilla_item_number = $1, updated_at = NOW() WHERE id = $2`,
              [normalizedPlantilla, applicant.id],
            );
            applicant.plantilla_item_number = normalizedPlantilla;
          }
        } else {
          await client.query('LOCK TABLE applicants IN EXCLUSIVE MODE');
          const lastApplicant = await client.query(
            `SELECT applicant_number FROM applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY id DESC LIMIT 1`,
          );
          let nextApplicantNum = 1;
          if (
            lastApplicant.rows.length > 0 &&
            lastApplicant.rows[0].applicant_number
          ) {
            const match =
              lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
            if (match) {
              nextApplicantNum = parseInt(match[1], 10) + 1;
            }
          }
          const newApplicantNumber = `AGAP-${String(nextApplicantNum).padStart(4, '0')}`;
          const placeholderEmail = `no-email-${Date.now()}@test.com`;

          const insertAppRes = await client.query(
            `INSERT INTO applicants (
              applicant_number, surname, first_name, middle_name,
              email_address, registrant_type, plantilla_item_number, is_test
            ) VALUES ($1, $2, $3, $4, $5, 'reclass', $6, false)
            RETURNING *`,
            [
              newApplicantNumber,
              surname,
              firstName,
              middleName,
              placeholderEmail,
              normalizedPlantilla,
            ],
          );
          applicant = insertAppRes.rows[0];
        }

        if (!incumbent) {
          incumbent = {
            id: null,
            first_name: firstName,
            last_name: surname,
            current_position:
              currentPosition || 'Guidance Counselor (Designate)',
            reclass_position: targetPosition || 'School Counselor Associate I',
            region: region ? region.trim().toUpperCase() : null,
            division: division ? division.trim().toUpperCase() : null,
            item_no: normalizedPlantilla,
            is_existing: false,
          };
        }
      }

      const reclassApp = incumbent || null;

      await client.query('COMMIT');

      const incumbentFullName =
        `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim() ||
        cleanInputName;

      return {
        session: {
          id: applicant.id,
          applicant_number: applicant.applicant_number,
          surname: applicant.surname,
          first_name: applicant.first_name,
          middle_name: applicant.middle_name,
          email_address: applicant.email_address,
          registrant_type: 'reclass',
          plantilla_item_number: normalizedPlantilla || null,
        },
        reclass: {
          ...(incumbent || {}),
          full_name: incumbentFullName,
          plantilla_item_number:
            normalizedPlantilla || incumbent?.item_no || null,
          target_position:
            incumbent?.target_position ||
            reclassApp?.reclass_position ||
            incumbent?.reclass_position ||
            targetPosition ||
            null,
          reclass_position:
            incumbent?.reclass_position ||
            reclassApp?.reclass_position ||
            null,
          current_position:
            reclassApp?.current_position ||
            incumbent?.current_position ||
            currentPosition ||
            'Guidance Counselor',
          application_number:
            reclassApp?.school_name || incumbent?.school_name || null,
          school_name:
            reclassApp?.school_name || incumbent?.school_name || null,
          evaluation_status:
            incumbent?.qs_status ||
            incumbent?.stage_of_reclassification ||
            'For Review',
          reclass_application: reclassApp || null,
        },
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getIncumbentLocations() {
    const result = await pool.query(`
      SELECT DISTINCT region, province AS division 
      FROM all_address 
      WHERE region IS NOT NULL AND province IS NOT NULL 
      ORDER BY region, division
    `);
    const regions: string[] = [];
    const divisionsByRegion: Record<string, string[]> = {};
    for (const row of result.rows) {
      const reg = String(row.region || '')
        .trim()
        .toUpperCase();
      const div = String(row.division || '')
        .trim()
        .toUpperCase();
      if (!divisionsByRegion[reg]) {
        divisionsByRegion[reg] = [];
        regions.push(reg);
      }
      if (div && !divisionsByRegion[reg].includes(div)) {
        divisionsByRegion[reg].push(div);
      }
    }
    return { regions, divisionsByRegion };
  }

  async getIncumbentInfoByPlantilla(plantilla: string) {
    const normalized = String(plantilla || '')
      .trim()
      .toUpperCase();
    if (!normalized) return null;
    const res = await pool.query(
      `SELECT r.region, r.division, COALESCE(r.desired_position, g.initial_assessment) as target_position, r.desired_position, r.current_position, r.first_name, r.last_name, r.school_name, g.initial_assessment
       FROM ${RECLASS_GC_FULL} r
       LEFT JOIN gmis_gc_items g ON (
         (r.item_no IS NOT NULL AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.item_no)))
         OR (r.new_item_no IS NOT NULL AND UPPER(TRIM(g.psi_cd)) = UPPER(TRIM(r.new_item_no)))
         OR g.reclass_gc_id = r.id
       )
       WHERE UPPER(TRIM(r.item_no)) = UPPER(TRIM($1)) OR UPPER(TRIM(r.new_item_no)) = UPPER(TRIM($1))
       LIMIT 1`,
      [normalized],
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      ...row,
      full_name: `${row.first_name || ''} ${row.last_name || ''}`.trim(),
    };
  }

  async getReclassDocuments(applicantId: number) {
    // 1. Resolve applicant details and plantilla / incumbent information
    const reclassDetails = await this.getReclassDetails(applicantId);
    let reclassAppId = reclassDetails?.reclass_application?.id || null;
    let plantillaItemNumber =
      reclassDetails?.plantilla_item_number || reclassDetails?.item_no || null;

    // Direct lookup on applicants & reclass_gc to ensure reliable linkage
    let reclassGcRow: any = null;
    try {
      const appRowRes = await pool.query(
        `SELECT plantilla_item_number, first_name, surname FROM applicants WHERE id = $1`,
        [applicantId],
      );
      const appRow = appRowRes.rows[0];
      const appPlantilla = appRow?.plantilla_item_number;
      if (!plantillaItemNumber && appPlantilla) {
        plantillaItemNumber = appPlantilla;
      }

      // Check reclass_gc by item_no or name
      if (plantillaItemNumber) {
        const gcCheck = await pool.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc WHERE UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($1)) LIMIT 1`,
          [plantillaItemNumber],
        );
        if (gcCheck.rows.length > 0) {
          reclassGcRow = gcCheck.rows[0];
        }
      }
      if (!reclassGcRow && appRow?.first_name && appRow?.surname) {
        const gcCheckByName = await pool.query(
          `SELECT * FROM ${RECLASS_GC_FULL} reclass_gc 
           WHERE UPPER(TRIM(COALESCE(first_name, ''))) = UPPER(TRIM($1)) 
             AND UPPER(TRIM(COALESCE(last_name, ''))) = UPPER(TRIM($2)) 
           LIMIT 1`,
          [appRow.first_name, appRow.surname],
        );
        if (gcCheckByName.rows.length > 0) {
          reclassGcRow = gcCheckByName.rows[0];
          if (!plantillaItemNumber && reclassGcRow.item_no) {
            plantillaItemNumber = reclassGcRow.item_no;
          }
        }
      }

    } catch (lookupErr) {
      console.warn('Error resolving reclass applicant linkage:', lookupErr);
    }

    const keyByTitle: Record<string, string> = {
      'letter of updating records': 'letter_of_updating_records',
      'letter of updating record': 'letter_of_updating_records',
      'letter of update records': 'letter_of_updating_records',
      'letter of intent': 'letter_of_updating_records',
      'personal data sheet (pds)': 'pds',
      'personal data sheet': 'pds',
      'proof of eligibility': 'proof_of_eligibility',
      'scholastic / academic record': 'academic_record',
      'scholastic/academic record': 'academic_record',
      'academic credentials': 'academic_record',
      'updated service record': 'service_record',
      'service record': 'service_record',
      'service records & appointment': 'service_record',
      'certificate/s of relevant training': 'training_certs',
      'training certificates': 'training_certs',
      'checklist of requirements & omnibus sworn statement': 'omnibus_sworn_statement',
      'checklist of requirements and omnibus sworn statement': 'omnibus_sworn_statement',
      'administrative supporting documents': 'omnibus_sworn_statement',
      'performance rating': 'performance_rating',
      'performance ratings': 'performance_rating',
      'reclassification form / rftp': 'letter_of_updating_records',
      letter_of_intent: 'letter_of_updating_records',
      letter_of_updating_records: 'letter_of_updating_records',
      pds: 'pds',
      proof_of_eligibility: 'proof_of_eligibility',
      academic_record: 'academic_record',
      service_record: 'service_record',
      training_certs: 'training_certs',
      omnibus_sworn_statement: 'omnibus_sworn_statement',
      performance_rating: 'performance_rating',
    };

    const resolveCategoryKey = (titleOrKey?: string): string => {
      if (!titleOrKey) return 'document';
      const clean = String(titleOrKey).trim().toLowerCase().replace(/\s+/g, ' ');
      if (keyByTitle[clean]) return keyByTitle[clean];

      // Robust keyword matching against database variations
      if (clean.includes('pds') || clean.includes('personal data')) return 'pds';
      if (clean.includes('updating') || clean.includes('intent') || clean.includes('rftp')) return 'letter_of_updating_records';
      if (clean.includes('eligibility') || clean.includes('prc') || clean.includes('license')) return 'proof_of_eligibility';
      if (clean.includes('academic') || clean.includes('scholastic') || clean.includes('tor') || clean.includes('transcript') || clean.includes('diploma')) return 'academic_record';
      if (clean.includes('service record') || clean.includes('service records') || clean.includes('appointment')) return 'service_record';
      if (clean.includes('training') || clean.includes('certificate/s')) return 'training_certs';
      if (clean.includes('omnibus') || clean.includes('sworn statement') || clean.includes('cav')) return 'omnibus_sworn_statement';
      if (clean.includes('performance') || clean.includes('rating') || clean.includes('ipcrf')) return 'performance_rating';

      return clean.replace(/[^a-z0-9_-]/g, '_');
    };

    const combinedDocsMap = new Map<string, any>();

    // 2. Fetch from reclass_documents table (ordered by uploaded_at DESC, id DESC so latest upload takes precedence)
    let docsRes: any = { rows: [] };
    if (plantillaItemNumber) {
      docsRes = await pool.query(
        `SELECT * FROM reclass_documents 
         WHERE UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($1)) 
           AND file_url IS NOT NULL AND TRIM(file_url) != '' 
         ORDER BY uploaded_at DESC, id DESC`,
        [plantillaItemNumber],
      );
    }

    for (const row of docsRes.rows) {
      const categoryKey = resolveCategoryKey(row.document_title);
      // Prefer rows that have a valid file_url
      if (!combinedDocsMap.has(categoryKey) || (!combinedDocsMap.get(categoryKey)?.file_url && row.file_url)) {
        const displayDocTitle =
          row.document_title === 'Letter of Intent' || categoryKey === 'letter_of_updating_records'
            ? 'Letter of Updating Records'
            : row.document_title || 'Document';
        combinedDocsMap.set(categoryKey, {
          id: String(row.id),
          category_key: categoryKey,
          category_title: displayDocTitle,
          file_name: row.file_name,
          file_url: row.file_url,
          uploaded_at: row.uploaded_at
            ? new Date(row.uploaded_at).toISOString()
            : new Date().toISOString(),
          updated_at: row.updated_at
            ? new Date(row.updated_at).toISOString()
            : (row.uploaded_at ? new Date(row.uploaded_at).toISOString() : new Date().toISOString()),
          source: 'reclass_documents',
        });
      }
    }

    // 3. Fetch & merge from reclass_gc table (document_checklist JSONB)
    const rawChecklist =
      reclassGcRow?.document_checklist ||
      reclassDetails?.document_checklist ||
      reclassDetails?.documents_checklist;
    let checklist: any = null;
    if (typeof rawChecklist === 'string') {
      try {
        checklist = JSON.parse(rawChecklist);
      } catch {
        checklist = null;
      }
    } else if (rawChecklist && typeof rawChecklist === 'object') {
      checklist = rawChecklist;
    }

    if (checklist) {
      const checklistItems: any[] = Array.isArray(checklist)
        ? checklist
        : Object.entries(checklist).map(([k, v]: any) =>
          typeof v === 'object' && v !== null ? { key: k, ...v } : { key: k, status: v },
        );

      for (const item of checklistItems) {
        if (!item || typeof item !== 'object') continue;
        const itemTitle =
          item.title || item.label || item.shortTitle || item.name || item.key || '';
        const itemKey = item.key || item.id || '';
        const candidateKey = resolveCategoryKey(itemKey);
        const categoryKey = candidateKey !== 'document' ? candidateKey : resolveCategoryKey(itemTitle);
        const itemFileUrl = item.file_url || item.url || item.fileUrl;
        const itemFileName = item.file_name || item.fileName;
        const displayItemTitle =
          itemTitle === 'Letter of Intent' || categoryKey === 'letter_of_updating_records'
            ? 'Letter of Updating Records'
            : itemTitle || 'Document';

        if (itemFileUrl) {
          const existing = combinedDocsMap.get(categoryKey);
          if (!existing) {
            combinedDocsMap.set(categoryKey, {
              id: String(item.id || item.key || `gc-${categoryKey}`),
              category_key: categoryKey,
              category_title: displayItemTitle,
              file_name: itemFileName || 'document.pdf',
              file_url: itemFileUrl,
              uploaded_at: item.resubmitted_at || item.updated_at || new Date().toISOString(),
              updated_at: item.updated_at || item.resubmitted_at || new Date().toISOString(),
              status: item.status || 'resubmit',
              source: 'reclass_gc',
            });
          } else if (!existing.file_url && itemFileUrl) {
            existing.file_url = itemFileUrl;
            existing.file_name = itemFileName || existing.file_name;
            if (item.status) existing.status = item.status;
          }
        }
      }
    }

    return Array.from(combinedDocsMap.values());
  }

  async uploadReclassDocument(
    applicantId: number,
    categoryKey: string,
    categoryTitle: string,
    file: {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
      size: number;
    },
    description?: string,
    qualificationData?: {
      education?: string | null;
      years_experience?: number | string | null;
      year_of_experience?: number | string | null;
      hours_of_training?: number | string | null;
      eligibility?: string | null;
    },
  ) {
    const reclassDetails = await this.getReclassDetails(applicantId);
    if (!reclassDetails) {
      throw new Error('Applicant reclassification profile not found.');
    }

    // Resolve reclass_gc.id for folder naming (reclass-reclass_gc.id)
    let reclassGcId = reclassDetails.id;
    if (!reclassGcId && reclassDetails.reclass_application?.reclass_gc_id) {
      reclassGcId = reclassDetails.reclass_application.reclass_gc_id;
    }
    if (!reclassGcId) {
      const pItem =
        reclassDetails.plantilla_item_number || reclassDetails.item_no;
      if (pItem) {
        const gcCheck = await pool.query(
          `SELECT id FROM reclass_gc WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) LIMIT 1`,
          [pItem],
        );
        if (gcCheck.rows.length > 0) {
          reclassGcId = gcCheck.rows[0].id;
        }
      }
    }
    const folderGcId = reclassGcId || applicantId;
    const rootFolder = `reclass-${folderGcId}`;
    const docFolder = (categoryKey || 'document')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_');
    const folderPath = `${rootFolder}/${docFolder}`;
    const cleanOriginalName = file.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      '_',
    );
    const fullBlobPath = `${folderPath}/${cleanOriginalName}`;

    let finalBuffer = file.buffer;
    if (file.mimetype === 'application/pdf') {
      try {
        finalBuffer = await compressPdf(file.buffer, 150);
      } catch (err) {
        console.warn('PDF compression skipped:', err);
      }
    }

    // Upload to Azure blob in the AZURE_FOLDER_RECLASS container (agap-reclass)
    const fileUrl = await uploadToReclassAzure(
      finalBuffer,
      fullBlobPath,
      file.mimetype,
    );

    let reclassApp = reclassDetails.reclass_application;
    const plantillaItemNumber =
      reclassDetails.plantilla_item_number ||
      reclassDetails.item_no ||
      reclassApp?.item_no ||
      null;

    // 1. Ensure reclassification record is present upon document upload if it doesn't already exist
    if (!reclassApp) {
      reclassApp = await this.ensureReclassificationApplication(
        applicantId,
        plantillaItemNumber,
        pool,
        reclassDetails.target_position || reclassDetails.reclass_position,
        reclassDetails.division,
      );
    }

    // 2. Save or update record in reclass_documents table (without dropped columns)
    const isUpdatingRecords =
      categoryKey === 'letter_of_updating_records' ||
      categoryKey === 'letter_of_intent' ||
      categoryTitle === 'Letter of Updating Records' ||
      categoryTitle === 'Letter of Intent';

    const existingDoc = await pool.query(
      `SELECT id FROM reclass_documents 
       WHERE (
         (reclass_application_id IS NOT NULL AND reclass_application_id = $1)
         OR (plantilla_item_number IS NOT NULL AND UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($2)))
       ) AND (
         UPPER(TRIM(document_title)) = UPPER(TRIM($3))
         OR ($4::boolean AND UPPER(TRIM(document_title)) IN ('LETTER OF INTENT', 'LETTER OF UPDATING RECORDS'))
       )
       LIMIT 1`,
      [reclassApp?.id || null, plantillaItemNumber || '', categoryTitle, isUpdatingRecords],
    );

    let savedDocRow: any;
    if (existingDoc.rows.length > 0) {
      const updateDocRes = await pool.query(
        `UPDATE reclass_documents
         SET reclass_application_id = $1,
             plantilla_item_number = $2,
             document_title = $3,
             file_name = $4,
             file_url = $5,
             updated_at = NOW()
         WHERE id = $6
         RETURNING *`,
        [
          reclassApp?.id || null,
          plantillaItemNumber,
          categoryTitle,
          file.originalname,
          fileUrl,
          existingDoc.rows[0].id,
        ],
      );
      savedDocRow = updateDocRes.rows[0];
    } else {
      const insertDocRes = await pool.query(
        `INSERT INTO reclass_documents (
           reclass_application_id, plantilla_item_number,
           document_title, file_name, file_url,
           uploaded_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING *`,
        [
          reclassApp?.id || null,
          plantillaItemNumber,
          categoryTitle,
          file.originalname,
          fileUrl,
        ],
      );
      savedDocRow = insertDocRes.rows[0];
    }

    // 3. Update reclass_gc updated_at timestamp & new_application = true (including qualification details if provided)
    if (qualificationData && (qualificationData.education !== undefined || qualificationData.years_experience !== undefined || qualificationData.year_of_experience !== undefined || qualificationData.hours_of_training !== undefined || qualificationData.eligibility !== undefined)) {
      await this.setReclassNewApplication(applicantId, true, qualificationData);
    } else {
      if (plantillaItemNumber) {
        await pool.query(
          `UPDATE reclass_gc
           SET new_application = true,
               updated_at = NOW()
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) OR UPPER(TRIM(new_item_no)) = UPPER(TRIM($1))`,
          [plantillaItemNumber],
        );
      }
      if (reclassGcId) {
        await pool.query(
          `UPDATE reclass_gc
           SET new_application = true,
               updated_at = NOW()
           WHERE id = $1`,
          [reclassGcId],
        );
      }
    }

    // 4. Update reclass_gc.reupload = true, new_application = true and update document_checklist:
    // If a document has status 'for_revision', upon re-upload / re-submission, its status changes to 'submitted'
    try {
      const gcRows = await pool.query(
        `SELECT id, document_checklist, item_no FROM reclass_gc 
         WHERE (id = $1 OR ($2::text IS NOT NULL AND UPPER(TRIM(COALESCE(item_no, ''))) = UPPER(TRIM($2))))`,
        [folderGcId || -1, plantillaItemNumber || null],
      );

      // Collected per row, then written with two bulk UPDATEs after the loop.
      const checklistUpdates: Array<{ id: number; checklist: string }> = [];
      const plainUpdateIds: number[] = [];

      for (const gcRow of gcRows.rows) {
        let checklist = gcRow.document_checklist;
        let isUpdated = false;

        if (typeof checklist === 'string') {
          try {
            checklist = JSON.parse(checklist);
          } catch {
            checklist = null;
          }
        }

        if (Array.isArray(checklist)) {
          const map = new Map<string, any>();
          for (const item of checklist) {
            if (!item || typeof item !== 'object') continue;
            const matches = matchesReclassDocChecklist(categoryKey, categoryTitle, item);
            const updated = matches
              ? {
                ...item,
                status: 'resubmit',
                rawStatus: 'resubmit',
                submitted: true,
                file_name: file.originalname,
                file_url: fileUrl,
                resubmitted_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }
              : item;

            if (matches) isUpdated = true;

            const k = normalizeReclassChecklistKey(updated);
            if (!map.has(k)) {
              map.set(k, updated);
            } else {
              const existing = map.get(k);
              if (updated.status === 'for_revision' && existing.status !== 'for_revision') {
                map.set(k, { ...existing, ...updated });
              } else if (updated.file_url && !existing.file_url) {
                map.set(k, { ...existing, ...updated });
              } else if (matches) {
                map.set(k, { ...existing, ...updated });
              }
            }
          }
          checklist = Array.from(map.values());
        } else if (checklist && typeof checklist === 'object') {
          for (const [k, v] of Object.entries(checklist)) {
            const item: any = v;
            if (item && typeof item === 'object') {
              const matches = matchesReclassDocChecklist(categoryKey, categoryTitle, { key: k, ...item });
              if (matches) {
                isUpdated = true;
                item.status = 'resubmit';
                item.rawStatus = 'resubmit';
                item.submitted = true;
                item.file_name = file.originalname;
                item.file_url = fileUrl;
                item.resubmitted_at = new Date().toISOString();
                item.updated_at = new Date().toISOString();
              }
            }
          }
        }

        if (isUpdated) {
          checklistUpdates.push({
            id: gcRow.id,
            checklist: JSON.stringify(checklist),
          });
        } else {
          plainUpdateIds.push(gcRow.id);
        }
      }

      if (checklistUpdates.length > 0) {
        await pool.query(
          `UPDATE reclass_gc g
           SET document_checklist = v.checklist::jsonb,
               reupload = true,
               new_application = true,
               updated_at = NOW()
           FROM unnest($1::int[], $2::text[]) AS v(id, checklist)
           WHERE g.id = v.id`,
          [
            checklistUpdates.map((u) => u.id),
            checklistUpdates.map((u) => u.checklist),
          ],
        );
      }
      if (plainUpdateIds.length > 0) {
        await pool.query(
          `UPDATE reclass_gc
           SET reupload = true,
               new_application = true,
               updated_at = NOW()
           WHERE id = ANY($1::int[])`,
          [plainUpdateIds],
        );
      }
    } catch (checkErr) {
      console.error('Error updating document_checklist on re-upload:', checkErr);
      if (reclassGcId) {
        await pool.query(
          `UPDATE reclass_gc SET reupload = true, new_application = true, updated_at = NOW() WHERE id = $1`,
          [reclassGcId],
        );
      } else if (folderGcId) {
        await pool.query(
          `UPDATE reclass_gc SET reupload = true, new_application = true, updated_at = NOW() WHERE id = $1`,
          [folderGcId],
        );
      }
    }

    // 5. Log audit entry
    await this.logDocumentAudit(
      applicantId,
      `Reclassification: ${categoryTitle}`,
      fileUrl,
      file.size,
      null,
    );

    const updatedDocs = await this.getReclassDocuments(applicantId);

    // If all 8 required documents are submitted, advance stage from UPDATING OF DOCUMENTS to FOR REVIEW (SDO_EVALUATION)
    if (updatedDocs.length >= 8) {
      if (folderGcId) {
        await pool.query(
          `UPDATE reclass_gc
           SET stage_of_reclassification = 'FOR REVIEW',
               current_stage = 'SDO_EVALUATION',
               updated_at = NOW()
           WHERE id = $1 AND (stage_of_reclassification IS NULL OR stage_of_reclassification = 'UPDATING OF DOCUMENTS' OR current_stage IS NULL OR current_stage = 'UPDATING_DOCUMENTS')`,
          [folderGcId],
        );
      }
      if (plantillaItemNumber) {
        await pool.query(
          `UPDATE reclass_gc
           SET stage_of_reclassification = 'FOR REVIEW',
               current_stage = 'SDO_EVALUATION',
               updated_at = NOW()
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) AND (stage_of_reclassification IS NULL OR stage_of_reclassification = 'UPDATING OF DOCUMENTS' OR current_stage IS NULL OR current_stage = 'UPDATING_DOCUMENTS')`,
          [plantillaItemNumber],
        );
      }
    }

    return {
      success: true,
      document: {
        id: String(savedDocRow.id),
        category_key: categoryKey,
        category_title: savedDocRow.document_title,
        file_name: savedDocRow.file_name,
        file_url: savedDocRow.file_url,
        uploaded_at: savedDocRow.uploaded_at,
      },
      documents: updatedDocs,
    };
  }
}

function matchesReclassDocChecklist(
  reqKey: string,
  categoryTitle: string,
  item: any,
): boolean {
  if (!item) return false;
  const rk = String(reqKey || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const ct = String(categoryTitle || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const ik = String(item.key || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const iid = String(item.id || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const it = String(
    item.title || item.label || item.shortTitle || item.name || '',
  )
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (rk && (rk === ik || rk === iid)) return true;
  if (ct && (ct === it || (it && ct.includes(it)) || (it && it.includes(ct)))) return true;
  if (rk && ik && (rk.includes(ik) || ik.includes(rk))) return true;
  if (rk && iid && (rk.includes(iid) || iid.includes(rk))) return true;

  if (
    (rk === 'letterofupdatingrecords' || rk === 'letterofintent') &&
    (iid === 'loi' ||
      it.includes('intent') ||
      ik.includes('intent') ||
      ct.includes('intent') ||
      it.includes('updating') ||
      ik.includes('updating') ||
      ct.includes('updating') ||
      iid === 'letterofupdatingrecords')
  )
    return true;
  if (
    rk === 'pds' &&
    (iid === 'pds' || it.includes('personaldata') || it.includes('pds') || ik.includes('pds') || ct.includes('pds'))
  )
    return true;
  if (
    rk === 'proofofeligibility' &&
    (iid === 'eligibility' ||
      it.includes('eligibility') ||
      it.includes('prc') ||
      it.includes('license') ||
      ik.includes('eligibility') ||
      ct.includes('eligibility'))
  )
    return true;
  if (
    rk === 'academicrecord' &&
    (iid === 'tor' ||
      it.includes('tor') ||
      it.includes('academic') ||
      it.includes('transcript') ||
      it.includes('diploma') ||
      ik.includes('tor') ||
      ct.includes('academic'))
  )
    return true;
  if (
    rk === 'servicerecord' &&
    (iid === 'employment' ||
      iid === 'appointment' ||
      it.includes('service') ||
      it.includes('employment') ||
      it.includes('appointment') ||
      ik.includes('service') ||
      ct.includes('service'))
  )
    return true;
  if (
    rk === 'trainingcerts' &&
    (iid === 'training' || it.includes('training') || ik.includes('training') || ct.includes('training'))
  )
    return true;
  if (
    rk === 'omnibusswornstatement' &&
    (iid === 'cav' ||
      it.includes('omnibus') ||
      it.includes('sworn') ||
      it.includes('cav') ||
      ik.includes('cav') ||
      ik.includes('sworn') ||
      ct.includes('omnibus'))
  )
    return true;
  if (
    rk === 'performancerating' &&
    (iid === 'performance' ||
      it.includes('performance') ||
      it.includes('ipcrf') ||
      it.includes('rating') ||
      ik.includes('performance') ||
      ct.includes('performance'))
  )
    return true;

  return false;
}

function normalizeReclassChecklistKey(item: any): string {
  const clean = String(item.key || item.id || item.shortTitle || item.title || item.label || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  if (clean === 'pds' || clean.includes('personaldata') || clean.includes('pds')) return 'pds';
  if (
    clean === 'loi' ||
    clean.includes('intent') ||
    clean.includes('rftp') ||
    clean.includes('updatingrecord') ||
    clean.includes('letterofupdating') ||
    clean.includes('updating')
  )
    return 'letter_of_updating_records';
  if (
    clean === 'eligibility' ||
    clean.includes('prc') ||
    clean.includes('license') ||
    clean.includes('eligib')
  ) {
    if (!clean.includes('performance') && !clean.includes('ipcrf')) {
      return 'proof_of_eligibility';
    }
  }
  if (
    clean === 'tor' ||
    clean.includes('academic') ||
    clean.includes('scholastic') ||
    clean.includes('transcript') ||
    clean.includes('diploma')
  )
    return 'academic_record';
  if (
    clean === 'service' ||
    clean.includes('servicerecord') ||
    clean.includes('employment') ||
    clean.includes('appointment')
  )
    return 'service_record';
  if (clean === 'training' || clean.includes('certificate')) return 'training_certs';
  if (clean === 'cav' || clean.includes('omnibus') || clean.includes('sworn')) return 'omnibus_sworn_statement';
  if (clean === 'performance' || clean.includes('rating') || clean.includes('ipcrf')) return 'performance_rating';
  return clean || String(item.id || item.key || '');
}

function cleanNameString(str: string): string {
  return (str || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeName(str: string): string[] {
  const clean = cleanNameString(str);
  if (!clean) return [];
  return clean.split(' ').filter(Boolean);
}

function isIncumbentNameMatching(
  inputName: string,
  dbFullName: string,
  dbFirstName?: string,
  dbLastName?: string,
): boolean {
  if (!inputName) return false;
  const cleanInput = cleanNameString(inputName);
  if (!cleanInput) return false;

  const dbFirst = cleanNameString(dbFirstName || '');
  const dbLast = cleanNameString(dbLastName || '');
  const cleanDb = cleanNameString(dbFullName || `${dbFirst} ${dbLast}`);

  if (!cleanDb && !dbFirst && !dbLast) return false;

  // 1. Direct clean match
  if (cleanInput === cleanDb) return true;

  // 2. Format variations: First Last, Last First
  if (dbFirst && dbLast) {
    const firstLast = cleanNameString(`${dbFirst} ${dbLast}`);
    const lastFirst = cleanNameString(`${dbLast} ${dbFirst}`);
    if (cleanInput === firstLast || cleanInput === lastFirst) return true;
  }

  // 3. If dbFullName has comma
  if (dbFullName && dbFullName.includes(',')) {
    const [dbSurnameRaw, ...dbRestRaw] = dbFullName.split(',');
    const cleanSurname = cleanNameString(dbSurnameRaw);
    const cleanRest = cleanNameString(dbRestRaw.join(' '));

    const firstThenLast = cleanNameString(`${cleanRest} ${cleanSurname}`);
    const lastThenFirst = cleanNameString(`${cleanSurname} ${cleanRest}`);
    if (cleanInput === firstThenLast || cleanInput === lastThenFirst)
      return true;
  }

  // 4. Token-based matching
  const inputTokens = tokenizeName(cleanInput);
  const firstTokens = dbFirst
    ? tokenizeName(dbFirst)
    : dbFullName
      ? tokenizeName(dbFullName).slice(0, -1)
      : [];
  const lastTokens = dbLast
    ? tokenizeName(dbLast)
    : dbFullName
      ? [tokenizeName(dbFullName).pop() || '']
      : [];

  // Check if all last_name tokens are in input
  const allLastTokensInInput =
    lastTokens.length > 0 && lastTokens.every((t) => inputTokens.includes(t));
  // Check if all first_name tokens are in input
  const allFirstTokensInInput =
    firstTokens.length > 0 &&
    firstTokens.every(
      (t) =>
        inputTokens.includes(t) || inputTokens.some((it) => it.startsWith(t)),
    );

  if (allLastTokensInInput && allFirstTokensInInput) return true;

  // Check if at least last_name and primary first name token are in input
  if (allLastTokensInInput && firstTokens.length > 0) {
    const primaryFirst = firstTokens[0];
    if (
      inputTokens.includes(primaryFirst) ||
      inputTokens.some((it) => it.startsWith(primaryFirst))
    ) {
      return true;
    }
  }

  // Check reverse: if all input tokens are part of DB name (ignoring single char middle initial)
  const nonInitialInputTokens = inputTokens.filter((t) => t.length > 1);
  const dbTokens = tokenizeName(cleanDb);
  if (
    nonInitialInputTokens.length >= 2 &&
    nonInitialInputTokens.every((t) => dbTokens.includes(t))
  ) {
    return true;
  }

  return false;
}

function parseIncumbentName(fullName: string): {
  surname: string;
  firstName: string;
  middleName: string | null;
} {
  let surname = 'Incumbent';
  let firstName = 'Counselor';
  let middleName: string | null = null;

  if (fullName && fullName.trim() !== '' && fullName.trim() !== '#N/A') {
    const rawName = fullName.trim();
    if (rawName.includes(',')) {
      const parts = rawName.split(',').map((s: string) => s.trim());
      surname = parts[0] || 'Incumbent';
      const givenParts = (parts[1] || 'Counselor').split(/\s+/).filter(Boolean);
      if (givenParts.length > 1) {
        firstName = givenParts[0];
        middleName = givenParts.slice(1).join(' ');
      } else {
        firstName = parts[1] || 'Counselor';
      }
    } else {
      const parts = rawName.split(/\s+/).filter(Boolean);
      if (parts.length > 1) {
        surname = parts[parts.length - 1];
        firstName = parts[0];
        middleName = parts.slice(1, -1).join(' ') || null;
      } else {
        firstName = parts[0] || 'Counselor';
        surname = 'Incumbent';
      }
    }
  }

  return { surname, firstName, middleName };
}

export const ApplicantsService = new ApplicantsServiceClass();
