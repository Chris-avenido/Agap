import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { pool } from '../../database';
import { sendPasswordResetEmail } from '../../utils/mailer';
import { DocumentsService } from '../documents/documents.service';

export function parseAndSanitizeDate(dateInput: any): Date | null {
  if (!dateInput) return null;
  if (dateInput instanceof Date && !isNaN(dateInput.getTime()))
    return dateInput;
  if (typeof dateInput !== 'string') return null;

  let str = dateInput.trim();
  if (!str || str.toLowerCase() === 'n/a') return null;

  // Auto-correct 3-digit years like "198-11-20" -> "1998-11-20"
  if (/^\d{3}-\d{2}-\d{2}/.test(str)) {
    str = '19' + str;
  }
  // Auto-correct leading-zero year typos like "0217-07-03" -> "2017-07-03"
  if (/^021(\d-\d{2}-\d{2})/.test(str)) {
    str = str.replace(/^021/, '201');
  } else if (/^019(\d-\d{2}-\d{2})/.test(str)) {
    str = str.replace(/^019/, '199');
  } else if (/^020(\d-\d{2}-\d{2})/.test(str)) {
    str = str.replace(/^020/, '200');
  }

  const d = new Date(str);
  if (isNaN(d.getTime())) return null;
  if (d.getFullYear() < 1900 || d.getFullYear() > new Date().getFullYear() + 1)
    return null;
  return d;
}

function calculateExperience(workExpList: any[]): number {
  if (!Array.isArray(workExpList)) return 0;
  let totalDays = 0;
  for (const exp of workExpList) {
    const fromRaw = exp.from || exp.fromDate || exp.date_from;
    const toRaw = exp.to || exp.toDate || exp.date_to;
    if (fromRaw && toRaw) {
      let from = parseAndSanitizeDate(fromRaw);
      let to: Date | null = null;
      if (
        typeof toRaw === 'string' &&
        toRaw.trim().toLowerCase() === 'present'
      ) {
        to = new Date();
      } else {
        to = parseAndSanitizeDate(toRaw);
      }
      if (from && to) {
        // Handle reversed start/end dates gracefully
        if (from > to) {
          const temp = from;
          from = to;
          to = temp;
        }
        const now = new Date();
        const effectiveTo = to > now ? now : to;
        const diffTime = Math.abs(effectiveTo.getTime() - from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        totalDays += diffDays;
      }
    }
  }
  return Number((totalDays / 365).toFixed(2));
}

function calculateTraining(learningList: any[]): number {
  if (!Array.isArray(learningList)) return 0;
  let totalHours = 0;
  for (const ld of learningList) {
    const fromRaw = ld.from || ld.fromDate || ld.date_from;
    const toRaw = ld.to || ld.toDate || ld.date_to;

    let maxHoursForEntry: number | null = null;

    if (fromRaw && toRaw) {
      let from = parseAndSanitizeDate(fromRaw);
      let to = parseAndSanitizeDate(toRaw);
      if (from && to) {
        if (from > to) {
          const temp = from;
          from = to;
          to = temp;
        }
        const diffTime = Math.abs(to.getTime() - from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        maxHoursForEntry = diffDays * 8;
      }
    }

    let hrs = 0;
    if (ld.hours && ld.hours !== 'N/A') {
      const parsed = Number(ld.hours);
      if (!isNaN(parsed) && parsed > 0 && parsed < 100000) {
        hrs = parsed;
      }
    }

    if (hrs === 0 && maxHoursForEntry !== null) {
      hrs = maxHoursForEntry;
    }

    if (maxHoursForEntry !== null) {
      hrs = Math.min(hrs, maxHoursForEntry);
    }

    totalHours += hrs;
  }
  return totalHours;
}

function extractBachelorsDegree(educationalList: any[]): string | null {
  if (!Array.isArray(educationalList)) return null;
  for (const ed of educationalList) {
    if (
      ed.level &&
      (ed.level.toLowerCase() === 'college' ||
        ed.level.toLowerCase() === 'bachelor')
    ) {
      return ed.degree || ed.course || ed.basic_education_degree || null;
    }
  }
  return null;
}

function extractEligibility(eligibilityList: any[]): string | null {
  if (!Array.isArray(eligibilityList)) return null;
  const eligibilities = eligibilityList
    .map((e) => e.eligibility || e.career_service || e.title)
    .filter(Boolean);
  return eligibilities.length > 0 ? eligibilities.join(', ') : null;
}

function calculateAge(dob: string | Date | null): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

class ApplicantProfileServiceClass {
  async create(data: any) {
    console.log(
      '==== CREATE PAYLOAD ====\n',
      JSON.stringify(data, null, 2),
      '\n========================',
    );
    const rawEmail = (data.email_address || data.email || '').trim();
    const email = rawEmail ? rawEmail.toLowerCase() : `no-email-${Date.now()}@test.com`;

    if (rawEmail && !rawEmail.startsWith('no-email-')) {
      const existing = await pool.query(
        `SELECT id FROM applicants 
         WHERE (LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) 
            OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1))
            OR LOWER(TRIM(COALESCE(alternate_email, ''))) = LOWER(TRIM($1)))
         LIMIT 1`,
        [rawEmail],
      );
      if (existing.rows.length > 0) {
        const err: any = new Error(
          'Email address is already registered. Please sign in instead.',
        );
        err.statusCode = 409;
        throw err;
      }
    }

    let passwordHash: string | null = null;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }

    const questionnaire_responses = JSON.stringify(
      data.questionnaire_responses || {},
    );

    // Generate AGAP-0001 format for applicant_number using transaction and latest ID
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('LOCK TABLE applicants IN EXCLUSIVE MODE');

      if (rawEmail && !rawEmail.startsWith('no-email-')) {
        const existingInTx = await client.query(
          `SELECT id FROM applicants 
           WHERE (LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) 
              OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1))
              OR LOWER(TRIM(COALESCE(alternate_email, ''))) = LOWER(TRIM($1)))
           LIMIT 1`,
          [rawEmail],
        );
        if (existingInTx.rows.length > 0) {
          const err: any = new Error(
            'Email address is already registered. Please sign in instead.',
          );
          err.statusCode = 409;
          throw err;
        }
      }

      const lastApplicant = await client.query(
        `SELECT applicant_number FROM public.applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY id DESC LIMIT 1`,
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

      const result = await client.query(
        `
        INSERT INTO applicants (
          applicant_number, password_hash, surname, first_name, middle_name, date_of_birth, place_of_birth,
          sex, civil_status, citizenship, blood_type, gsis_id_no, pag_ibig_id_no, philhealth_no,
          sss_no, residential_address, permanent_address, telephone_no, mobile_no, email_address,
          educational_background, civil_service_eligibility, work_experience, voluntary_work,
          learning_and_development, other_information, questionnaire_responses, family_background,
          spouse_surname, spouse_first_name, spouse_middle_name, spouse_name_extension, spouse_occupation,
          spouse_employer_business, spouse_business_address, spouse_telephone,
          father_surname, father_first_name, father_middle_name, father_name_extension,
          mother_maiden_surname, mother_first_name, mother_middle_name, children_details, alternate_email,
          years_experience, training_hours, bachelors_degree, eligibility, age, religion, disability, ethnic_group, is_test
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
          , $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, $28,
          $29, $30, $31, $32, $33, $34, $35, $36,
          $37, $38, $39, $40, $41, $42, $43, $44, $45,
          $46, $47, $48, $49, $50, $51, $52, $53, $54
        ) RETURNING *
      `,
        [
          newApplicantNumber,
          passwordHash,
          data.surname || 'UNKNOWN',
          data.first_name || 'UNKNOWN',
          data.middle_name || null,
          data.date_of_birth ? new Date(data.date_of_birth) : null,
          data.place_of_birth || null,
          data.sex || null,
          data.civil_status || null,
          data.citizenship || null,
          data.blood_type || null,
          data.gsis_id_no || null,
          data.pag_ibig_id_no || null,
          data.philhealth_no || null,
          data.sss_no || null,
          data.residential_address
            ? JSON.stringify(data.residential_address)
            : null,
          data.permanent_address
            ? JSON.stringify(data.permanent_address)
            : null,
          data.telephone_no || null,
          data.mobile_no || null,
          email,
          JSON.stringify(data.educational_background || []),
          JSON.stringify(data.civil_service_eligibility || []),
          JSON.stringify(data.work_experience || []),
          JSON.stringify(data.voluntary_work || []),
          JSON.stringify(data.learning_and_development || []),
          JSON.stringify(data.other_information || {}),
          questionnaire_responses,
          data.family_background
            ? JSON.stringify(data.family_background)
            : null,
          data.family_background?.spouse?.surname || null,
          data.family_background?.spouse?.first_name || null,
          data.family_background?.spouse?.middle_name || null,
          data.family_background?.spouse?.name_extension || null,
          data.family_background?.spouse?.occupation || null,
          data.family_background?.spouse?.employer_business_name || null,
          data.family_background?.spouse?.business_address || null,
          data.family_background?.spouse?.telephone_no || null,
          data.family_background?.father?.surname || null,
          data.family_background?.father?.first_name || null,
          data.family_background?.father?.middle_name || null,
          data.family_background?.father?.name_extension || null,
          data.family_background?.mother?.maiden_surname || null,
          data.family_background?.mother?.first_name || null,
          data.family_background?.mother?.middle_name || null,
          data.family_background?.children
            ? JSON.stringify(data.family_background.children)
            : null,
          data.alternate_email || null,
          calculateExperience(data.work_experience || []),
          calculateTraining(data.learning_and_development || []),
          extractBachelorsDegree(data.educational_background || []),
          extractEligibility(data.civil_service_eligibility || []),
          calculateAge(data.date_of_birth),
          data.religion || null,
          data.disability || null,
          data.ethnic_group || null,
          data.is_test === true || data.is_test === 'true' || false,
        ],
      );

      await client.query('COMMIT');
      const applicant = result.rows[0];
      return applicant;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async changePassword(
    applicantId: number,
    currentPasswordRaw: string,
    newPasswordRaw: string,
  ) {
    const result = await pool.query(
      'SELECT password_hash FROM applicants WHERE id = $1',
      [applicantId],
    );
    const applicant = result.rows[0];
    if (!applicant || !applicant.password_hash) {
      throw new Error('User not found or no password set');
    }
    const isMatch = await bcrypt.compare(
      currentPasswordRaw,
      applicant.password_hash,
    );
    if (!isMatch) {
      throw new Error('Incorrect current password');
    }
    const newPasswordHash = await bcrypt.hash(newPasswordRaw, 10);
    await pool.query('UPDATE applicants SET password_hash = $1 WHERE id = $2', [
      newPasswordHash,
      applicantId,
    ]);
    return true;
  }

  async update(id: number, data: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    const addField = (colName: string, val: any, isJson = false) => {
      if (val !== undefined) {
        fields.push(`${colName} = $${idx}`);
        values.push(isJson ? JSON.stringify(val) : val);
        idx++;
      }
    };

    addField('surname', data.surname);
    addField('first_name', data.first_name);
    addField('middle_name', data.middle_name);
    if (data.date_of_birth !== undefined) {
      addField(
        'date_of_birth',
        data.date_of_birth ? new Date(data.date_of_birth) : null,
      );
      addField('age', calculateAge(data.date_of_birth));
    }
    addField('place_of_birth', data.place_of_birth);
    addField('sex', data.sex);
    addField('civil_status', data.civil_status);
    addField('citizenship', data.citizenship);
    addField('blood_type', data.blood_type);
    addField('religion', data.religion);
    addField('disability', data.disability);
    addField('ethnic_group', data.ethnic_group);
    addField('gsis_id_no', data.gsis_id_no);
    addField('pag_ibig_id_no', data.pag_ibig_id_no);
    addField('philhealth_no', data.philhealth_no);
    addField('sss_no', data.sss_no);
    addField('residential_address', data.residential_address, true);
    addField('permanent_address', data.permanent_address, true);
    addField('telephone_no', data.telephone_no);
    addField('mobile_no', data.mobile_no);
    addField('alternate_email', data.alternate_email);

    addField('educational_background', data.educational_background, true);
    if (data.educational_background !== undefined) {
      addField(
        'bachelors_degree',
        extractBachelorsDegree(data.educational_background),
      );
    }
    addField('family_background', data.family_background, true);
    if (data.family_background) {
      addField('spouse_surname', data.family_background.spouse?.surname);
      addField('spouse_first_name', data.family_background.spouse?.first_name);
      addField(
        'spouse_middle_name',
        data.family_background.spouse?.middle_name,
      );
      addField(
        'spouse_name_extension',
        data.family_background.spouse?.name_extension,
      );
      addField('spouse_occupation', data.family_background.spouse?.occupation);
      addField(
        'spouse_employer_business',
        data.family_background.spouse?.employer_business_name,
      );
      addField(
        'spouse_business_address',
        data.family_background.spouse?.business_address,
      );
      addField('spouse_telephone', data.family_background.spouse?.telephone_no);
      addField('father_surname', data.family_background.father?.surname);
      addField('father_first_name', data.family_background.father?.first_name);
      addField(
        'father_middle_name',
        data.family_background.father?.middle_name,
      );
      addField(
        'father_name_extension',
        data.family_background.father?.name_extension,
      );
      addField(
        'mother_maiden_surname',
        data.family_background.mother?.maiden_surname,
      );
      addField('mother_first_name', data.family_background.mother?.first_name);
      addField(
        'mother_middle_name',
        data.family_background.mother?.middle_name,
      );
      addField('children_details', data.family_background.children, true);
    }

    addField('civil_service_eligibility', data.civil_service_eligibility, true);
    if (data.civil_service_eligibility !== undefined) {
      addField(
        'eligibility',
        extractEligibility(data.civil_service_eligibility),
      );
    }
    addField('work_experience', data.work_experience, true);
    if (data.work_experience !== undefined) {
      addField('years_experience', calculateExperience(data.work_experience));
    }
    addField('voluntary_work', data.voluntary_work, true);
    addField('learning_and_development', data.learning_and_development, true);
    if (data.learning_and_development !== undefined) {
      addField(
        'training_hours',
        calculateTraining(data.learning_and_development),
      );
    }

    if (data.other_information !== undefined) {
      // 1. Fetch current other_information from DB
      const currentRes = await pool.query(
        'SELECT other_information FROM applicants WHERE id = $1',
        [id],
      );
      let currentOtherInfo = currentRes.rows[0]?.other_information || {};
      if (typeof currentOtherInfo === 'string') {
        try {
          currentOtherInfo = JSON.parse(currentOtherInfo);
        } catch {
          currentOtherInfo = {};
        }
      }

      // 2. Parse incoming other_information
      let incomingOtherInfo = data.other_information || {};
      if (typeof incomingOtherInfo === 'string') {
        try {
          incomingOtherInfo = JSON.parse(incomingOtherInfo);
        } catch {
          incomingOtherInfo = {};
        }
      }

      // 3. Fetch latest audit records for all document types of this applicant
      const latestAudits = await DocumentsService.getLatestDocumentAudits(id);
      const auditMap: Record<string, string> = {};
      for (const audit of latestAudits) {
        if (audit.document_type && audit.new_blob_url) {
          auditMap[audit.document_type] = audit.new_blob_url;
        }
      }

      // 4. Merge documents: protect only document URLs, keep metadata editable
      const existingDocs =
        (currentOtherInfo &&
          typeof currentOtherInfo === 'object' &&
          currentOtherInfo.documents) ||
        {};
      const incomingDocs =
        (incomingOtherInfo &&
          typeof incomingOtherInfo === 'object' &&
          incomingOtherInfo.documents) ||
        {};

      const mergedDocs: Record<string, any> = {};
      const allDocKeys = new Set([
        ...Object.keys(existingDocs),
        ...Object.keys(incomingDocs),
      ]);

      for (const docKey of allDocKeys) {
        const existingDoc = existingDocs[docKey];
        const incomingDoc = incomingDocs[docKey];

        // 4a. Authoritative URL resolution:
        // Priority: latest new_blob_url in document_audit_logs -> existing stored URL in DB
        // Never use incoming URL. Never overwrite existing valid URL with null.
        let authoritativeUrl: string | null = null;
        if (auditMap[docKey]) {
          authoritativeUrl = auditMap[docKey];
        } else if (typeof existingDoc === 'string' && existingDoc.trim()) {
          authoritativeUrl = existingDoc.trim();
        } else if (
          existingDoc &&
          typeof existingDoc === 'object' &&
          typeof existingDoc.url === 'string' &&
          existingDoc.url.trim()
        ) {
          authoritativeUrl = existingDoc.url.trim();
        }

        // 4b. Merge document metadata (fileName, uploadedAt, remarks, etc.)
        if (
          incomingDoc &&
          typeof incomingDoc === 'object' &&
          !Array.isArray(incomingDoc)
        ) {
          const existingObj =
            existingDoc &&
              typeof existingDoc === 'object' &&
              !Array.isArray(existingDoc)
              ? existingDoc
              : {};
          mergedDocs[docKey] = {
            ...existingObj,
            ...incomingDoc,
          };
          if (authoritativeUrl) {
            mergedDocs[docKey].url = authoritativeUrl;
          } else {
            delete mergedDocs[docKey].url;
          }
        } else if (
          existingDoc &&
          typeof existingDoc === 'object' &&
          !Array.isArray(existingDoc)
        ) {
          mergedDocs[docKey] = {
            ...existingDoc,
          };
          if (authoritativeUrl) {
            mergedDocs[docKey].url = authoritativeUrl;
          } else {
            delete mergedDocs[docKey].url;
          }
        } else {
          // String format document URL
          if (authoritativeUrl) {
            mergedDocs[docKey] = authoritativeUrl;
          }
        }
      }

      // 5. Compose final other_information preserving all non-document fields
      data.other_information = {
        ...currentOtherInfo,
        ...incomingOtherInfo,
        documents: mergedDocs,
      };
    }

    addField('other_information', data.other_information, true);
    addField('questionnaire_responses', data.questionnaire_responses, true);

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE applicants SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async forgotPassword(email: string) {
    const result = await pool.query(
      'SELECT id FROM applicants WHERE email_address = $1',
      [email],
    );
    if (result.rows.length === 0) {
      return false;
    }

    const applicantId = result.rows[0].id;
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign({ applicantId }, secret, { expiresIn: '1h' });

    await sendPasswordResetEmail(email, token);
    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    try {
      const decoded: any = jwt.verify(token, secret);
      if (!decoded || !decoded.applicantId) {
        throw new Error('Invalid token structure');
      }

      const applicantId = decoded.applicantId;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      const result = await pool.query(
        'UPDATE applicants SET password_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
        [passwordHash, applicantId],
      );

      if (result.rows.length === 0) {
        throw new Error('Applicant not found');
      }
      return true;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async setPasscode(applicantId: number, passcode: string) {
    if (!/^\d{6}$/.test(passcode)) {
      throw new Error('Passcode must be exactly 6 digits.');
    }
    const result = await pool.query(
      'UPDATE applicants SET passcode = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
      [passcode, applicantId],
    );
    if (result.rows.length === 0) {
      throw new Error('Applicant not found');
    }
    return true;
  }
}

export const ApplicantProfileService = new ApplicantProfileServiceClass();
