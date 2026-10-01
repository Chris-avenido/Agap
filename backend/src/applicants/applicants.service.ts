import * as bcrypt from 'bcryptjs';
import { pool } from '../database';
const pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';
import * as jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../utils/mailer';
import { uploadToAzure, uploadToReclassAzure } from '../utils/azureStorage';
import { compressPdf } from '../utils/pdfCompressor';

function parseAndSanitizeDate(dateInput: any): Date | null {
  if (!dateInput) return null;
  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) return dateInput;
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
  if (d.getFullYear() < 1900 || d.getFullYear() > new Date().getFullYear() + 1) return null;
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
      if (typeof toRaw === 'string' && toRaw.trim().toLowerCase() === 'present') {
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
      'SELECT * FROM applicants WHERE LOWER(TRIM(email_address)) = LOWER(TRIM($1)) LIMIT 1',
      [email_address],
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(`
      SELECT a.*, 
             COALESCE(
               json_agg(j.*) FILTER (WHERE j.id IS NOT NULL), 
               '[]'
             ) as job_applications
      FROM applicants a
      LEFT JOIN applications j ON a.id::text = j.applicant_id
      WHERE EXISTS (SELECT 1 FROM applications WHERE applicant_id = a.id::text)
      GROUP BY a.id
      ORDER BY a.id DESC
    `);
    return result.rows;
  }

  async login(
    email_address: string,
    password_raw: string,
    loginMethod?: string,
  ) {
    const result = await pool.query(
      `SELECT * FROM applicants 
       WHERE LOWER(email_address) = LOWER($1) 
          OR UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1))`,
      [email_address],
    );
    const applicant = result.rows[0];
    if (!applicant) return null;

    let isMatch = false;
    if (loginMethod === 'passcode') {
      isMatch = Boolean(applicant.passcode && applicant.passcode === password_raw);
    } else if (loginMethod === 'password') {
      if (applicant.password_hash) {
        isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
      }
    } else {
      if (applicant.passcode && applicant.passcode === password_raw) {
        isMatch = true;
      } else if (applicant.password_hash) {
        isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
      }
    }

    if (!isMatch) return null;

    let plantillaToEnsure = applicant.plantilla_item_number;
    if (!plantillaToEnsure && applicant.surname && applicant.first_name) {
      const incRes = await pool.query(
        `SELECT item_no FROM reclass_gc WHERE UPPER(TRIM(last_name)) = UPPER(TRIM($1)) AND UPPER(TRIM(first_name)) = UPPER(TRIM($2)) LIMIT 1`,
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
      } catch (e) {}
    }
    const letterOfIntent = otherInfo?.documents?.['Letter of Intent'] || null;
    const swornDocument = otherInfo?.documents?.['Sworn Declaration'] || null;

    console.log(
      `[DEBUG] applyJob started for applicantId=${applicantId}, jobClusterId=${jobClusterId}`,
    );

    const checkResult = await pool.query(
      'SELECT * FROM applications WHERE applicant_id = $1 AND job_cluster_id = $2',
      [applicantId.toString(), jobClusterId],
    );
    if (checkResult.rows.length > 0) {
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
          const normKey = key === 'Personal Data Sheet' ? 'Notarized Personal Data Sheet' : key;
          allDocs[normKey] = val as string;
        }
      }
      if (letterOfIntent) {
        allDocs['Letter of Intent'] = letterOfIntent;
      }
      if (swornDocument) {
        allDocs['Sworn Declaration'] = swornDocument;
      }
      if (otherInfo.photoUrl && !allDocs['Profile Photo'] && !allDocs['profile_photo']) {
        allDocs['Profile Photo'] = otherInfo.photoUrl;
      }

      const batchNumber = await this.getNextBatchNumber(applicantId);
      const applyAuditRecords = Object.entries(allDocs)
        .filter(([_, docUrl]) => typeof docUrl === 'string' && docUrl.trim().length > 0)
        .map(([docName, docUrl]) => ({
          applicantId,
          docType: docName,
          newBlobUrl: docUrl as string,
          affectedCount: 1,
          applicationId: appId,
          isOpen: true,
          batchNumber,
        }));

      if (applyAuditRecords.length > 0) {
        await this.batchLogDocumentAuditRecords(applyAuditRecords);
      }

      // If applicant was invited for this job cluster, mark is_submitted = true in agap_invited
      try {
        const appRes = await pool.query('SELECT email_address, alternate_email FROM applicants WHERE id = $1', [applicantId]);
        if (appRes.rows.length > 0 && jobClusterId) {
          const emails = [appRes.rows[0].email_address, appRes.rows[0].alternate_email]
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
        console.warn('Could not update agap_invited is_submitted status:', invErr);
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
             p.salary_grade as salary_grade
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
    return result.rows.map((r) => ({ ...r, position_id: r.job_cluster_id }));
  }

  async toggleSavedJob(applicantId: number, jobClusterId: string) {
    const checkResult = await pool.query(
      'SELECT * FROM saved_clusters WHERE applicant_id = $1 AND job_cluster_id = $2',
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

  async create(data: any) {
    console.log(
      '==== CREATE PAYLOAD ====\n',
      JSON.stringify(data, null, 2),
      '\n========================',
    );
    const email = data.email_address || `no-email-${Date.now()}@test.com`;

    if (data.email_address) {
      const existing = await pool.query(
        'SELECT id FROM applicants WHERE email_address = $1',
        [data.email_address],
      );
      if (existing.rows.length > 0) {
        throw new Error('Email address already exists');
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

      const lastApplicant = await client.query(
        `SELECT applicant_number FROM public.applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY id DESC LIMIT 1`,
      );
      let nextApplicantNum = 1;
      if (
        lastApplicant.rows.length > 0 &&
        lastApplicant.rows[0].applicant_number
      ) {
        const match = lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
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
          data.permanent_address ? JSON.stringify(data.permanent_address) : null,
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
          data.family_background ? JSON.stringify(data.family_background) : null,
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
      const latestAudits = await this.getLatestDocumentAudits(id);
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

  async replaceApplicantDocument(
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
        } catch {}
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
      const columnToUpdate =
        docType === 'Letter of Intent' ? 'letter_of_intent' : 'sworn_document';

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
      await client.query('SELECT pg_advisory_xact_lock($1)', [Number(applicantId)]);
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
    if (uploadedDocs.length === 0) {
      return { success: true, affectedApplications: 0, batchNumber: 0, documents: {} };
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

  async getLatestDocumentAudits(
    applicantId: string | number,
    client?: any,
  ) {
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
        `SELECT * FROM reclass_gc
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
          `SELECT * FROM reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );
        incumbent = incByAppPlantilla.rows[0] || null;
      } else if (appRow?.surname && appRow?.first_name) {
        const incByName = await db.query(
          `SELECT * FROM reclass_gc
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
    const itemNo = normalizedPlantilla || incumbent?.item_no || (applicantId ? `APP-${applicantId}` : '');

    // 2. Check if reclass_applications record exists by reclass_gc_id or item_no
    let existingAppRes: any = null;
    if (gcId) {
      existingAppRes = await db.query(
        `SELECT * FROM reclass_applications WHERE reclass_gc_id = $1 ORDER BY id DESC LIMIT 1`,
        [gcId],
      );
    }
    if ((!existingAppRes || existingAppRes.rows.length === 0) && itemNo) {
      existingAppRes = await db.query(
        `SELECT * FROM reclass_applications WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) ORDER BY id DESC LIMIT 1`,
        [itemNo],
      );
    }

    if (existingAppRes && existingAppRes.rows.length > 0) {
      const reclassApp = existingAppRes.rows[0];
      const updates: string[] = [];
      const params: any[] = [];
      let paramIdx = 1;

      if (gcId && !reclassApp.reclass_gc_id) {
        updates.push(`reclass_gc_id = $${paramIdx++}`);
        params.push(gcId);
        reclassApp.reclass_gc_id = gcId;
      }
      if (targetPosition && reclassApp.reclass_position !== targetPosition) {
        updates.push(`reclass_position = $${paramIdx++}`);
        params.push(targetPosition);
        reclassApp.reclass_position = targetPosition;
      }
      const upperDivision = division ? division.trim().toUpperCase() : undefined;
      if (upperDivision && reclassApp.division !== upperDivision) {
        updates.push(`division = $${paramIdx++}`);
        params.push(upperDivision);
        reclassApp.division = upperDivision;
      }

      if (updates.length > 0) {
        params.push(reclassApp.id);
        await db.query(
          `UPDATE reclass_applications
           SET ${updates.join(', ')}, updated_at = NOW()
           WHERE id = $${paramIdx}`,
          params,
        );
      }
      return reclassApp;
    }

    // 3. Insert new record matching production columns
    const curPos = incumbent?.current_position || 'Guidance Counselor';
    const reg = (incumbent?.region || '').trim().toUpperCase() || null;
    const div = (division || incumbent?.division || '').trim().toUpperCase() || null;
    const schId = incumbent?.school_id || null;
    const schName = incumbent?.school_name || null;
    const recPos = targetPosition || incumbent?.reclass_position || null;
    const newItem = incumbent?.new_item_no || null;

    const insertRes = await db.query(
      `INSERT INTO reclass_applications (
        reclass_gc_id, item_no, current_position, region,
        division, school_id, school_name, reclass_position,
        new_item_no, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *`,
      [gcId, itemNo, curPos, reg, div, schId, schName, recPos, newItem],
    );

    return insertRes.rows[0];
  }

  async verifyPlantillaItem(applicantId: number, plantillaItemNumber: string) {
    const normalized = String(plantillaItemNumber || '').trim().toUpperCase();
    if (!normalized) {
      throw new Error('Plantilla item number is required.');
    }

    // Look up in reclass_gc (primary source)
    const incumbentRes = await pool.query(
      `SELECT * FROM reclass_gc
       WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))`,
      [normalized],
    );

    if (incumbentRes.rows.length === 0) {
      // Fallback: check reclass_applications
      const reclassRes = await pool.query(
        `SELECT * FROM reclass_applications
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))`,
        [normalized],
      );
      if (reclassRes.rows.length === 0) {
        throw new Error('Plantilla item number not found. Please verify and try again.');
      }
    }

    // Link the applicant's record to the verified plantilla item number
    await pool.query(
      `UPDATE applicants SET plantilla_item_number = $1, updated_at = NOW() WHERE id = $2`,
      [normalized, applicantId],
    );

    return incumbentRes.rows[0] || null;
  }

  async getReclassDetails(applicantId: number) {
    let incumbent: any = null;
    const applicantRes = await pool.query(
      `SELECT plantilla_item_number, surname, first_name FROM applicants WHERE id = $1`,
      [applicantId],
    );
    const appRow = applicantRes.rows[0];
    const plantillaItemNumber = appRow?.plantilla_item_number;

    if (plantillaItemNumber) {
      const incRes = await pool.query(
        `SELECT * FROM reclass_gc
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) LIMIT 1`,
        [plantillaItemNumber],
      );
      incumbent = incRes.rows[0] || null;
    } else if (appRow?.surname && appRow?.first_name) {
      const incByName = await pool.query(
        `SELECT * FROM reclass_gc
         WHERE UPPER(TRIM(last_name)) = UPPER(TRIM($1)) AND UPPER(TRIM(first_name)) = UPPER(TRIM($2)) LIMIT 1`,
        [appRow.surname, appRow.first_name],
      );
      incumbent = incByName.rows[0] || null;
    }

    // Authoritative read-only query for reclass_applications by item_no or reclass_gc_id (DO NOT INSERT)
    const gcId = incumbent?.id;
    const itemNo = incumbent?.item_no || plantillaItemNumber;
    let reclassApp: any = null;

    if (gcId) {
      const appById = await pool.query(
        `SELECT * FROM reclass_applications 
         WHERE reclass_gc_id = $1 
         ORDER BY id DESC LIMIT 1`,
        [gcId],
      );
      if (appById.rows.length > 0) {
        reclassApp = appById.rows[0];
      }
    }

    if (!reclassApp && itemNo) {
      const appByItem = await pool.query(
        `SELECT * FROM reclass_applications 
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) 
         ORDER BY id DESC LIMIT 1`,
        [itemNo],
      );
      if (appByItem.rows.length > 0) {
        reclassApp = appByItem.rows[0];
      }
    }

    if (!incumbent && !reclassApp) return null;

    const fullName = incumbent ? `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim() : null;

    return {
      ...(incumbent || {}),
      full_name: fullName,
      plantilla_item_number: incumbent?.item_no || plantillaItemNumber || null,
      target_position: reclassApp?.reclass_position || incumbent?.reclass_position || null,
      current_position: reclassApp?.current_position || incumbent?.current_position || 'Guidance Counselor',
      application_number: reclassApp?.school_name || incumbent?.school_name || null,
      school_name: reclassApp?.school_name || incumbent?.school_name || null,
      evaluation_status: incumbent?.qs_status || incumbent?.stage_of_reclassification || 'For Review',
      reclass_application: reclassApp || null,
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
    const normalizedPlantilla = (plantillaItemNumber || '').trim().toUpperCase();
    const cleanInputName = (inputFullName || '').trim();

    if (isExisting && !normalizedPlantilla) {
      throw new Error('Plantilla Item Number is required.');
    }
    if (!isExisting && !cleanInputName) {
      throw new Error('Full Name is required for Non-Plantilla Reclassification.');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      let incumbent: any = null;
      let applicant: any = null;

      if (isExisting && normalizedPlantilla) {
        // 1. Verify incumbent strictly by item_no
        const incRes = await client.query(
          `SELECT * FROM reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );

        if (incRes.rows.length === 0) {
          throw new Error('Plantilla Item Number not found in DepEd incumbent guidance counselor records. Please verify your number.');
        }

        incumbent = incRes.rows[0];
        const incumbentFullName = `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim();

        if ((!incumbent.last_name && !incumbent.first_name) || incumbent.last_name === '#N/A' || incumbentFullName === '') {
          throw new Error('This Plantilla Item is currently unassigned or vacant in DepEd records.');
        }

        // 2. If Full Name is provided, verify matching against incumbent record
        if (cleanInputName && !isIncumbentNameMatching(cleanInputName, incumbentFullName, incumbent.first_name, incumbent.last_name)) {
          throw new Error('The Full Name provided does not match our incumbent records for this Plantilla Item Number.');
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
          if (lastApplicant.rows.length > 0 && lastApplicant.rows[0].applicant_number) {
            const match = lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
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
            [newApplicantNumber, surname, firstName, placeholderEmail, normalizedPlantilla],
          );
          applicant = insertAppRes.rows[0];
        }

        // 4. Update region, division, reclass_position if provided
        const incUpdates: string[] = [];
        const incParams: any[] = [];
        let pIdx = 1;

        if (targetPosition && targetPosition.trim()) {
          incUpdates.push(`reclass_position = $${pIdx++}`);
          incParams.push(targetPosition.trim());
          incumbent.reclass_position = targetPosition.trim();
        }
        if (region && region.trim()) {
          const upperRegion = region.trim().toUpperCase();
          incUpdates.push(`region = $${pIdx++}`);
          incParams.push(upperRegion);
          incumbent.region = upperRegion;
        }
        if (division && division.trim()) {
          const upperDivision = division.trim().toUpperCase();
          incUpdates.push(`division = $${pIdx++}`);
          incParams.push(upperDivision);
          incumbent.division = upperDivision;
        }

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
          throw new Error('Plantilla Item Number is required for Non-Plantilla / Designate Reclassification.');
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
          `SELECT * FROM reclass_gc
           WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
           LIMIT 1`,
          [normalizedPlantilla],
        );
        const gcExists = existingGcRes.rows.length > 0;

        // Case A: If already existing in reclass_gc -> Prompt user to log in via Plantilla Incumbent
        if (gcExists) {
          throw new Error('This Plantilla Item Number is already registered in incumbent records. Please log in using the "Plantilla Incumbent" option.');
        }

        // Case B: If not existing in both gmis_gc_items and reclass_gc -> No records found
        if (!gmisExists && !gcExists) {
          throw new Error('No records found for this Plantilla Item Number in DepEd GMIS records. Please verify your Plantilla Item Number.');
        }

        // Case C: If existing in gmis_gc_items and NOT in reclass_gc -> Insert new data in reclass_gc
        const { surname, firstName, middleName } = parseIncumbentName(cleanInputName);

        const gcRegion = (region ? region.trim().toUpperCase() : null) || (gmisItem?.region ? String(gmisItem.region).trim().toUpperCase() : null);
        const gcDivision = (division ? division.trim().toUpperCase() : null) || (gmisItem?.division ? String(gmisItem.division).trim().toUpperCase() : null);
        const gcSchoolId = gmisItem?.school_id || null;
        const gcSchoolName = gmisItem?.school_name || null;
        const gcCurrentPos = currentPosition || gmisItem?.pos_dsc || gmisItem?.current_position || 'Guidance Counselor (Designate)';
        const gcTargetPos = targetPosition || 'School Counselor Associate I';
        const gcFirstName = firstName || gmisItem?.first_name || '';
        const gcLastName = surname || gmisItem?.last_name || '';

        const insertGcRes = await client.query(
          `INSERT INTO reclass_gc (
            item_no, first_name, last_name, region, division,
            school_id, school_name, current_position, reclass_position,
            stage_of_reclassification, is_test, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'For Review', false, NOW(), NOW())
          RETURNING *`,
          [
            normalizedPlantilla,
            gcFirstName,
            gcLastName,
            gcRegion,
            gcDivision,
            gcSchoolId,
            gcSchoolName,
            gcCurrentPos,
            gcTargetPos,
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
          if (lastApplicant.rows.length > 0 && lastApplicant.rows[0].applicant_number) {
            const match = lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
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
            [newApplicantNumber, surname, firstName, middleName, placeholderEmail, normalizedPlantilla],
          );
          applicant = insertAppRes.rows[0];
        }

        if (!incumbent) {
          incumbent = {
            id: null,
            first_name: firstName,
            last_name: surname,
            current_position: currentPosition || 'Guidance Counselor (Designate)',
            reclass_position: targetPosition || 'School Counselor Associate I',
            region: region ? region.trim().toUpperCase() : null,
            division: division ? division.trim().toUpperCase() : null,
            item_no: normalizedPlantilla,
            is_existing: false,
          };
        }
      }

      // 5. Look up existing reclass_applications record if any (DO NOT INSERT ON LOGIN)
      let reclassApp: any = null;
      if (incumbent?.id) {
        const appByGcRes = await client.query(
          `SELECT * FROM reclass_applications WHERE reclass_gc_id = $1 ORDER BY id DESC LIMIT 1`,
          [incumbent.id],
        );
        if (appByGcRes.rows.length > 0) {
          reclassApp = appByGcRes.rows[0];
        }
      }

      if (!reclassApp && normalizedPlantilla) {
        const appByItemRes = await client.query(
          `SELECT * FROM reclass_applications WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) ORDER BY id DESC LIMIT 1`,
          [normalizedPlantilla],
        );
        if (appByItemRes.rows.length > 0) {
          reclassApp = appByItemRes.rows[0];
        }
      }

      await client.query('COMMIT');

      const incumbentFullName = `${incumbent.first_name || ''} ${incumbent.last_name || ''}`.trim() || cleanInputName;

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
          plantilla_item_number: normalizedPlantilla || incumbent?.item_no || null,
          target_position: reclassApp?.reclass_position || incumbent?.reclass_position || targetPosition || null,
          current_position: reclassApp?.current_position || incumbent?.current_position || currentPosition || 'Guidance Counselor',
          application_number: reclassApp?.school_name || incumbent?.school_name || null,
          school_name: reclassApp?.school_name || incumbent?.school_name || null,
          evaluation_status: incumbent?.qs_status || incumbent?.stage_of_reclassification || 'For Review',
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
      const reg = String(row.region || '').trim().toUpperCase();
      const div = String(row.division || '').trim().toUpperCase();
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
    const normalized = String(plantilla || '').trim().toUpperCase();
    if (!normalized) return null;
    const res = await pool.query(
      `SELECT region, division, reclass_position as target_position, current_position, first_name, last_name, school_name
       FROM reclass_gc
       WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))
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
    const reclassDetails = await this.getReclassDetails(applicantId);
    const reclassAppId = reclassDetails?.reclass_application?.id || null;
    const plantillaItemNumber = reclassDetails?.plantilla_item_number || reclassDetails?.item_no || null;

    let docsRes: any = { rows: [] };
    if (reclassAppId && plantillaItemNumber) {
      docsRes = await pool.query(
        `SELECT * FROM reclass_documents 
         WHERE reclass_application_id = $1 OR UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($2)) 
         ORDER BY id ASC`,
        [reclassAppId, plantillaItemNumber],
      );
    } else if (reclassAppId) {
      docsRes = await pool.query(
        `SELECT * FROM reclass_documents WHERE reclass_application_id = $1 ORDER BY id ASC`,
        [reclassAppId],
      );
    } else if (plantillaItemNumber) {
      docsRes = await pool.query(
        `SELECT * FROM reclass_documents WHERE UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($1)) ORDER BY id ASC`,
        [plantillaItemNumber],
      );
    }

    const keyByTitle: Record<string, string> = {
      'reclassification form / rftp': 'reclass_form',
      'personal data sheet': 'pds',
      'service records & appointment': 'service_records',
      'academic credentials': 'academic_credentials',
      'training certificates': 'training_certs',
      'performance ratings': 'performance_ratings',
      'administrative supporting documents': 'admin_support',
      'reclass_form': 'reclass_form',
      'pds': 'pds',
      'service_records': 'service_records',
      'academic_credentials': 'academic_credentials',
      'training_certs': 'training_certs',
      'performance_ratings': 'performance_ratings',
      'admin_support': 'admin_support',
    };

    if (docsRes.rows.length > 0) {
      return docsRes.rows.map((row: any) => {
        const title = row.document_title || '';
        const lowerTitle = title.trim().toLowerCase();
        const categoryKey = keyByTitle[lowerTitle] || lowerTitle.replace(/[^a-z0-9_-]/g, '_');

        return {
          id: String(row.id),
          category_key: categoryKey,
          category_title: row.document_title || 'Document',
          file_name: row.file_name,
          file_url: row.file_url,
          uploaded_at: row.uploaded_at
            ? new Date(row.uploaded_at).toISOString()
            : new Date().toISOString(),
        };
      });
    }

    return [];
  }

  async uploadReclassDocument(
    applicantId: number,
    categoryKey: string,
    categoryTitle: string,
    file: { buffer: Buffer; originalname: string; mimetype: string; size: number },
    description?: string,
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
      const pItem = reclassDetails.plantilla_item_number || reclassDetails.item_no;
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
    const docFolder = (categoryKey || 'document').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const folderPath = `${rootFolder}/${docFolder}`;
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
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
    const fileUrl = await uploadToReclassAzure(finalBuffer, fullBlobPath, file.mimetype);

    let reclassApp = reclassDetails.reclass_application;
    const plantillaItemNumber =
      reclassDetails.plantilla_item_number ||
      reclassDetails.item_no ||
      reclassApp?.item_no ||
      null;

    // 1. Ensure reclass_applications record is created/inserted upon document upload if it doesn't already exist
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
    const existingDoc = await pool.query(
      `SELECT id FROM reclass_documents 
       WHERE (
         (reclass_application_id IS NOT NULL AND reclass_application_id = $1)
         OR (plantilla_item_number IS NOT NULL AND UPPER(TRIM(plantilla_item_number)) = UPPER(TRIM($2)))
       ) AND UPPER(TRIM(document_title)) = UPPER(TRIM($3)) 
       LIMIT 1`,
      [reclassApp?.id || null, plantillaItemNumber || '', categoryTitle],
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

    // 3. Update reclass_applications updated_at timestamp if record exists
    if (reclassApp?.id) {
      await pool.query(
        `UPDATE reclass_applications
         SET updated_at = NOW()
         WHERE id = $1`,
        [reclassApp.id],
      );
    }

    // 4. Update reclass_gc.reupload = true upon document upload
    if (folderGcId) {
      await pool.query(
        `UPDATE reclass_gc
         SET reupload = true,
             updated_at = NOW()
         WHERE id = $1`,
        [folderGcId],
      );
    }
    if (plantillaItemNumber) {
      await pool.query(
        `UPDATE reclass_gc
         SET reupload = true,
             updated_at = NOW()
         WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1))`,
        [plantillaItemNumber],
      );
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
    if (cleanInput === firstThenLast || cleanInput === lastThenFirst) return true;
  }

  // 4. Token-based matching
  const inputTokens = tokenizeName(cleanInput);
  const firstTokens = dbFirst ? tokenizeName(dbFirst) : (dbFullName ? tokenizeName(dbFullName).slice(0, -1) : []);
  const lastTokens = dbLast ? tokenizeName(dbLast) : (dbFullName ? [tokenizeName(dbFullName).pop() || ''] : []);

  // Check if all last_name tokens are in input
  const allLastTokensInInput = lastTokens.length > 0 && lastTokens.every(t => inputTokens.includes(t));
  // Check if all first_name tokens are in input
  const allFirstTokensInInput = firstTokens.length > 0 && firstTokens.every(t => inputTokens.includes(t) || inputTokens.some(it => it.startsWith(t)));

  if (allLastTokensInInput && allFirstTokensInInput) return true;

  // Check if at least last_name and primary first name token are in input
  if (allLastTokensInInput && firstTokens.length > 0) {
    const primaryFirst = firstTokens[0];
    if (inputTokens.includes(primaryFirst) || inputTokens.some(it => it.startsWith(primaryFirst))) {
      return true;
    }
  }

  // Check reverse: if all input tokens are part of DB name (ignoring single char middle initial)
  const nonInitialInputTokens = inputTokens.filter(t => t.length > 1);
  const dbTokens = tokenizeName(cleanDb);
  if (nonInitialInputTokens.length >= 2 && nonInitialInputTokens.every(t => dbTokens.includes(t))) {
    return true;
  }

  return false;
}

function parseIncumbentName(fullName: string): { surname: string; firstName: string; middleName: string | null } {
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

