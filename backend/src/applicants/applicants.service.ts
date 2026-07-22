import * as bcrypt from 'bcryptjs';
import { pool } from '../database';
const pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';

function calculateExperience(workExpList: any[]): number {
  if (!Array.isArray(workExpList)) return 0;
  let totalDays = 0;
  for (const exp of workExpList) {
    const fromStr = exp.from || exp.fromDate || exp.date_from;
    const toStr = exp.to || exp.toDate || exp.date_to;
    if (fromStr && toStr) {
      const from = new Date(fromStr);
      let to = new Date();
      if (toStr.toLowerCase() !== 'present') {
        to = new Date(toStr);
      }
      if (!isNaN(from.getTime()) && !isNaN(to.getTime()) && to >= from) {
        const diffTime = Math.abs(to.getTime() - from.getTime());
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
    const fromStr = ld.from || ld.fromDate || ld.date_from;
    const toStr = ld.to || ld.toDate || ld.date_to;
    
    let added = false;
    if (fromStr && toStr && fromStr !== 'N/A' && toStr !== 'N/A') {
      const from = new Date(fromStr);
      const to = new Date(toStr);
      if (!isNaN(from.getTime()) && !isNaN(to.getTime()) && to >= from) {
        const diffTime = Math.abs(to.getTime() - from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        totalHours += (diffDays * 8);
        added = true;
      }
    }

    if (!added && ld.hours && ld.hours !== 'N/A') {
      const hrs = Number(ld.hours);
      if (!isNaN(hrs)) totalHours += hrs;
    }
  }
  return totalHours;
}

function extractBachelorsDegree(educationalList: any[]): string | null {
  if (!Array.isArray(educationalList)) return null;
  for (const ed of educationalList) {
    if (ed.level && (ed.level.toLowerCase() === 'college' || ed.level.toLowerCase() === 'bachelor')) {
      return ed.degree || ed.course || ed.basic_education_degree || null;
    }
  }
  return null;
}

function extractEligibility(eligibilityList: any[]): string | null {
  if (!Array.isArray(eligibilityList)) return null;
  const eligibilities = eligibilityList
    .map(e => e.eligibility || e.career_service || e.title)
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
      } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/msword') {
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
        work_experience: [] as any[]
      };

      // 1. Extract Email Address
      const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) parsedData.email_address = emailMatch[1];

      // 2. Extract Mobile Number (Philippine formats like 0917-123-4567, +63917...)
      const phoneMatch = rawText.match(/(?:\+63|0)\d{2}[-\s]?\d{3}[-\s]?\d{4}/);
      if (phoneMatch) parsedData.mobile_no = phoneMatch[0];

      // 3. Extract Sex/Gender
      if (/\b(male)\b/i.test(rawText)) parsedData.sex = 'Male';
      else if (/\b(female)\b/i.test(rawText)) parsedData.sex = 'Female';

      // 4. Basic Name Heuristics
      // We assume the very first non-empty line of the resume contains the name
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0) {
        // Strip out common title prefixes like "Resume" or "CV"
        let topNameLine = lines[0];
        if (/resume|curriculum vitae|cv/i.test(topNameLine) && lines.length > 1) {
          topNameLine = lines[1];
        }

        const nameParts = topNameLine.split(' ').filter(n => n.length > 0);
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
      const addressMatch = rawText.match(/(?:address|location|residence)[\s:]*([A-Za-z0-9\s,.-]+(?:City|Province|St|Street|Ave|Subdivision|Village))/i);
      if (addressMatch) {
        parsedData.residential_address = addressMatch[1].trim();
      }

      // 6. Work Experience Heuristics
      // Try to find a section titled "Experience", "Employment", or "Work History"
      const workExpRegex = /(?:experience|employment|work history|professional experience)[\s\S]*?(?:education|skills|references|projects|certifications|$)/i;
      const workExpMatch = rawText.match(workExpRegex);
      if (workExpMatch) {
        const workText = workExpMatch[0];
        const workLines = workText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        let currentWork = { company: '', position: '' };
        let jobCount = 0;

        for (let i = 1; i < workLines.length; i++) {
          const line = workLines[i];
          // Look for lines containing years/dates indicating a job duration (e.g. 2018 - 2020)
          if (/(?:19|20)\d{2}.*(?:19|20)\d{2}|present|now|current/i.test(line)) {
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
      console.error("Resume Parsing Error:", error);
      throw new Error();
    }
  }

  async findOne(id: number) {
    const result = await pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
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

  async login(email_address: string, password_raw: string) {
    const result = await pool.query('SELECT * FROM applicants WHERE email_address = $1', [email_address]);
    const applicant = result.rows[0];
    if (!applicant || !applicant.password_hash) return null;
    const isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
    if (!isMatch) return null;
    return applicant;
  }

  async applyJob(applicantId: number, jobTitle: string, jobClusterId?: string) {
    if (!jobClusterId || jobClusterId === 'null' || jobClusterId === 'undefined' || String(jobClusterId).trim() === '') {
      throw new Error("Invalid job cluster ID provided.");
    }
    
    const applicantRes = await pool.query('SELECT applicant_number FROM applicants WHERE id = $1', [applicantId]);
    const applicantNumber = applicantRes.rows[0]?.applicant_number || null;

    console.log(`[DEBUG] applyJob started for applicantId=${applicantId}, jobClusterId=${jobClusterId}`);
    
    const checkResult = await pool.query(
      'SELECT * FROM applications WHERE applicant_id = $1 AND job_cluster_id = $2',
      [applicantId.toString(), jobClusterId]
    );
    if (checkResult.rows.length > 0) {
      throw new Error("You have already applied for this job cluster.");
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

    const lastApp = await pool.query(`
      SELECT application_number FROM applications 
      WHERE application_number LIKE $1 
      ORDER BY application_number DESC LIMIT 1
    `, [`${dateStr}-%`]);

    let nextAppNum = 1;
    if (lastApp.rows.length > 0 && lastApp.rows[0].application_number) {
      const match = lastApp.rows[0].application_number.split('-');
      if (match.length > 1) {
        nextAppNum = parseInt(match[1], 10) + 1;
      }
    }
    const uniqueApplicationNumber = `${dateStr}-${String(nextAppNum).padStart(5, '0')}`;

    console.log(`[DEBUG] applyJob executing INSERT with args:`, [appId, uniqueApplicationNumber, applicantId.toString(), jobClusterId || null]);
    
    try {
      const result = await pool.query(`
        INSERT INTO applications (id, application_number, applicant_id, job_cluster_id, status, date_applied, created_at)
        VALUES ($1, $2, $3, $4, 'Pending', NOW(), NOW())
        RETURNING *
      `, [appId, uniqueApplicationNumber, applicantId.toString(), jobClusterId || null]);

      console.log(`[DEBUG] applyJob INSERT successful. Returning row:`, result.rows[0]);
      return result.rows[0];
    } catch (dbError) {
      console.error(`[DEBUG] applyJob INSERT failed:`, dbError);
      throw dbError;
    }
  }

  async findApplications(applicantId: number) {
    const result = await pool.query(`
      SELECT a.*, p.title as job_title, c.region as region, c.division as division, qe.overall_fit,
             (SELECT v.status FROM vacancies v WHERE v.job_cluster_id = c.id LIMIT 1) as vacancy_status,
             (SELECT MIN(v.posting_start) FROM vacancies v WHERE v.job_cluster_id = c.id) as posting_start,
             (SELECT MAX(v.posting_end) FROM vacancies v WHERE v.job_cluster_id = c.id) as posting_end,
             (SELECT v.item_no FROM vacancies v WHERE v.job_cluster_id = c.id LIMIT 1) as item_no,
             (SELECT v.salary_grade FROM vacancies v WHERE v.job_cluster_id = c.id LIMIT 1) as salary_grade
      FROM applications a
      LEFT JOIN job_clusters c ON a.job_cluster_id::text = c.id::text
      LEFT JOIN positions p ON c.position_id = p.id
      LEFT JOIN (
        SELECT application_id, MAX(overall_fit) as overall_fit
        FROM qual_evals
        GROUP BY application_id
      ) qe ON a.id = qe.application_id
      WHERE a.applicant_id = $1
    `, [applicantId.toString()]);
    return result.rows.map(r => ({ ...r, position_id: r.job_cluster_id }));
  }

  async toggleSavedJob(applicantId: number, jobClusterId: string) {
    const checkResult = await pool.query('SELECT * FROM saved_clusters WHERE applicant_id = $1 AND job_cluster_id = $2', [applicantId, jobClusterId]);
    const existing = checkResult.rows[0];

    if (existing) {
      const newStatus = !existing.is_saved;
      await pool.query('UPDATE saved_clusters SET is_saved = $1 WHERE id = $2', [newStatus, existing.id]);
      return { status: newStatus ? 'added' : 'removed' };
    } else {
      await pool.query(`
        INSERT INTO saved_clusters (applicant_id, job_cluster_id, is_saved)
        VALUES ($1, $2, true)
      `, [applicantId, jobClusterId]);
      return { status: 'added' };
    }
  }

  async findSavedJobs(applicantId: number) {
    const result = await pool.query(`
      SELECT job_cluster_id as position_id
      FROM saved_clusters 
      WHERE applicant_id = $1 AND is_saved = true
    `, [applicantId]);
    return result.rows;
  }

  async create(data: any) {
    console.log("==== CREATE PAYLOAD ====\n", JSON.stringify(data, null, 2), "\n========================");
    const email = data.email_address || `no-email-${Date.now()}@test.com`;

    if (data.email_address) {
      const existing = await pool.query('SELECT id FROM applicants WHERE email_address = $1', [data.email_address]);
      if (existing.rows.length > 0) {
        throw new Error('Email address already exists');
      }
    }

    let passwordHash: string | null = null;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }

    const questionnaire_responses = JSON.stringify(data.questionnaire_responses || {});

    // Generate AGAP-0001 format for applicant_number
    const lastApplicant = await pool.query(`SELECT applicant_number FROM applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY applicant_number DESC LIMIT 1`);
    let nextApplicantNum = 1;
    if (lastApplicant.rows.length > 0 && lastApplicant.rows[0].applicant_number) {
      const match = lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
      if (match) {
        nextApplicantNum = parseInt(match[1], 10) + 1;
      }
    }
    const newApplicantNumber = `AGAP-${String(nextApplicantNum).padStart(4, '0')}`;

    const result = await pool.query(`
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
        years_experience, training_hours, bachelors_degree, eligibility, age
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        , $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28,
        $29, $30, $31, $32, $33, $34, $35, $36,
        $37, $38, $39, $40, $41, $42, $43, $44, $45,
        $46, $47, $48, $49, $50
      ) RETURNING *
    `, [
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
      data.residential_address ? JSON.stringify(data.residential_address) : null,
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
      data.family_background?.children ? JSON.stringify(data.family_background.children) : null,
      data.alternate_email || null,
      calculateExperience(data.work_experience || []),
      calculateTraining(data.learning_and_development || []),
      extractBachelorsDegree(data.educational_background || []),
      extractEligibility(data.civil_service_eligibility || []),
      calculateAge(data.date_of_birth)
    ]);

    const applicant = result.rows[0];



    return applicant;
  }


  async changePassword(applicantId: number, currentPasswordRaw: string, newPasswordRaw: string) {
    const result = await pool.query('SELECT password_hash FROM applicants WHERE id = $1', [applicantId]);
    const applicant = result.rows[0];
    if (!applicant || !applicant.password_hash) {
      throw new Error('User not found or no password set');
    }
    const isMatch = await bcrypt.compare(currentPasswordRaw, applicant.password_hash);
    if (!isMatch) {
      throw new Error('Incorrect current password');
    }
    const newPasswordHash = await bcrypt.hash(newPasswordRaw, 10);
    await pool.query('UPDATE applicants SET password_hash = $1 WHERE id = $2', [newPasswordHash, applicantId]);
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
      addField('date_of_birth', data.date_of_birth ? new Date(data.date_of_birth) : null);
      addField('age', calculateAge(data.date_of_birth));
    }
    addField('place_of_birth', data.place_of_birth);
    addField('sex', data.sex);
    addField('civil_status', data.civil_status);
    addField('citizenship', data.citizenship);
    addField('blood_type', data.blood_type);
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
      addField('bachelors_degree', extractBachelorsDegree(data.educational_background));
    }
    addField('family_background', data.family_background, true);
    if (data.family_background) {
      addField('spouse_surname', data.family_background.spouse?.surname);
      addField('spouse_first_name', data.family_background.spouse?.first_name);
      addField('spouse_middle_name', data.family_background.spouse?.middle_name);
      addField('spouse_name_extension', data.family_background.spouse?.name_extension);
      addField('spouse_occupation', data.family_background.spouse?.occupation);
      addField('spouse_employer_business', data.family_background.spouse?.employer_business_name);
      addField('spouse_business_address', data.family_background.spouse?.business_address);
      addField('spouse_telephone', data.family_background.spouse?.telephone_no);
      addField('father_surname', data.family_background.father?.surname);
      addField('father_first_name', data.family_background.father?.first_name);
      addField('father_middle_name', data.family_background.father?.middle_name);
      addField('father_name_extension', data.family_background.father?.name_extension);
      addField('mother_maiden_surname', data.family_background.mother?.maiden_surname);
      addField('mother_first_name', data.family_background.mother?.first_name);
      addField('mother_middle_name', data.family_background.mother?.middle_name);
      addField('children_details', data.family_background.children, true);
    }

    addField('civil_service_eligibility', data.civil_service_eligibility, true);
    if (data.civil_service_eligibility !== undefined) {
      addField('eligibility', extractEligibility(data.civil_service_eligibility));
    }
    addField('work_experience', data.work_experience, true);
    if (data.work_experience !== undefined) {
      addField('years_experience', calculateExperience(data.work_experience));
    }
    addField('voluntary_work', data.voluntary_work, true);
    addField('learning_and_development', data.learning_and_development, true);
    if (data.learning_and_development !== undefined) {
      addField('training_hours', calculateTraining(data.learning_and_development));
    }
    addField('other_information', data.other_information, true);
    addField('questionnaire_responses', data.questionnaire_responses, true);

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE applicants SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export const ApplicantsService = new ApplicantsServiceClass();
