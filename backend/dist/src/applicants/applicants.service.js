"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantsService = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const database_1 = require("../database");
const pdfParse = require('pdf-parse');
const mammoth = __importStar(require("mammoth"));
class ApplicantsServiceClass {
    async parseResume(file) {
        try {
            let rawText = '';
            if (file.mimetype === 'application/pdf') {
                const data = await pdfParse(file.buffer);
                rawText = data.text;
            }
            else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/msword') {
                const result = await mammoth.extractRawText({ buffer: file.buffer });
                rawText = result.value;
            }
            else {
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
                work_experience: []
            };
            const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
            if (emailMatch)
                parsedData.email_address = emailMatch[1];
            const phoneMatch = rawText.match(/(?:\+63|0)\d{2}[-\s]?\d{3}[-\s]?\d{4}/);
            if (phoneMatch)
                parsedData.mobile_no = phoneMatch[0];
            if (/\b(male)\b/i.test(rawText))
                parsedData.sex = 'Male';
            else if (/\b(female)\b/i.test(rawText))
                parsedData.sex = 'Female';
            const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            if (lines.length > 0) {
                let topNameLine = lines[0];
                if (/resume|curriculum vitae|cv/i.test(topNameLine) && lines.length > 1) {
                    topNameLine = lines[1];
                }
                const nameParts = topNameLine.split(' ').filter(n => n.length > 0);
                if (nameParts.length >= 3) {
                    parsedData.first_name = nameParts[0];
                    parsedData.middle_name = nameParts[1];
                    parsedData.surname = nameParts.slice(2).join(' ');
                }
                else if (nameParts.length === 2) {
                    parsedData.first_name = nameParts[0];
                    parsedData.surname = nameParts[1];
                }
                else if (nameParts.length === 1) {
                    parsedData.first_name = nameParts[0];
                }
            }
            const addressMatch = rawText.match(/(?:address|location|residence)[\s:]*([A-Za-z0-9\s,.-]+(?:City|Province|St|Street|Ave|Subdivision|Village))/i);
            if (addressMatch) {
                parsedData.residential_address = addressMatch[1].trim();
            }
            const workExpRegex = /(?:experience|employment|work history|professional experience)[\s\S]*?(?:education|skills|references|projects|certifications|$)/i;
            const workExpMatch = rawText.match(workExpRegex);
            if (workExpMatch) {
                const workText = workExpMatch[0];
                const workLines = workText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                let currentWork = { company: '', position: '' };
                let jobCount = 0;
                for (let i = 1; i < workLines.length; i++) {
                    const line = workLines[i];
                    if (/(?:19|20)\d{2}.*(?:19|20)\d{2}|present|now|current/i.test(line)) {
                        if (currentWork.company || currentWork.position) {
                            parsedData.work_experience.push({ ...currentWork });
                            jobCount++;
                            if (jobCount >= 4)
                                break;
                            currentWork = { company: '', position: '' };
                        }
                        if (i > 0)
                            currentWork.position = workLines[i - 1];
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
        }
        catch (error) {
            console.error("Resume Parsing Error:", error);
            throw new Error();
        }
    }
    async findOne(id) {
        const result = await database_1.pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
        return result.rows[0];
    }
    async findByEmail(email_address) {
        const result = await database_1.pool.query('SELECT * FROM applicants WHERE email_address = $1', [email_address]);
        return result.rows[0];
    }
    async findAll() {
        const result = await database_1.pool.query(`
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
    async login(email_address, password_raw) {
        const result = await database_1.pool.query('SELECT * FROM applicants WHERE email_address = $1', [email_address]);
        const applicant = result.rows[0];
        if (!applicant || !applicant.password_hash)
            return null;
        const isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
        if (!isMatch)
            return null;
        return applicant;
    }
    async applyJob(applicantId, jobTitle, positionId) {
        if (!positionId || positionId === 'null' || positionId === 'undefined' || String(positionId).trim() === '') {
            throw new Error("Invalid position ID provided.");
        }
        const applicantRes = await database_1.pool.query('SELECT applicant_number FROM applicants WHERE id = $1', [applicantId]);
        const applicantNumber = applicantRes.rows[0]?.applicant_number || null;
        const checkResult = await database_1.pool.query('SELECT * FROM applications WHERE applicant_id = $1 AND vacancy_id = $2', [applicantId.toString(), positionId || null]);
        if (checkResult.rows.length > 0)
            return checkResult.rows[0];
        const appId = require('crypto').randomUUID();
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;
        const lastApp = await database_1.pool.query(`
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
        const result = await database_1.pool.query(`
      INSERT INTO applications (id, application_number, applicant_id, vacancy_id, status, date_applied, created_at)
      VALUES ($1, $2, $3, $4, 'Pending', NOW(), NOW())
      RETURNING *
    `, [appId, uniqueApplicationNumber, applicantId.toString(), positionId || null]);
        return result.rows[0];
    }
    async findApplications(applicantId) {
        const result = await database_1.pool.query(`
      SELECT a.*, v.title as job_title, v.school as office, qe.overall_fit, v.status as vacancy_status
      FROM applications a
      LEFT JOIN vacancies v ON a.vacancy_id::text = v.id::text
      LEFT JOIN qual_evals qe ON a.id = qe.application_id
      WHERE a.applicant_id = $1
    `, [applicantId.toString()]);
        return result.rows.map(r => ({ ...r, position_id: r.vacancy_id }));
    }
    async toggleSavedJob(applicantId, positionId) {
        const checkResult = await database_1.pool.query('SELECT * FROM saved_jobs WHERE applicant_id = $1 AND position_id = $2', [applicantId, positionId]);
        const existing = checkResult.rows[0];
        if (existing) {
            const newStatus = !existing.is_saved;
            await database_1.pool.query('UPDATE saved_jobs SET is_saved = $1 WHERE id = $2', [newStatus, existing.id]);
            return { status: newStatus ? 'added' : 'removed' };
        }
        else {
            await database_1.pool.query(`
        INSERT INTO saved_jobs (applicant_id, position_id, is_saved)
        VALUES ($1, $2, true)
      `, [applicantId, positionId]);
            return { status: 'added' };
        }
    }
    async findSavedJobs(applicantId) {
        const result = await database_1.pool.query(`
      SELECT s.*, v.title as position_title, v.school as office
      FROM saved_jobs s
      LEFT JOIN vacancies v ON s.position_id::text = v.id::text
      WHERE s.applicant_id = $1 AND s.is_saved = true
    `, [applicantId]);
        return result.rows;
    }
    async create(data) {
        const email = data.email_address || `no-email-${Date.now()}@test.com`;
        if (data.email_address) {
            const existing = await database_1.pool.query('SELECT id FROM applicants WHERE email_address = $1', [data.email_address]);
            if (existing.rows.length > 0) {
                throw new Error('Email address already exists');
            }
        }
        let passwordHash = null;
        if (data.password) {
            passwordHash = await bcrypt.hash(data.password, 10);
        }
        const questionnaire_responses = JSON.stringify(data.questionnaire_responses || {});
        const lastApplicant = await database_1.pool.query(`SELECT applicant_number FROM applicants WHERE applicant_number LIKE 'AGAP-%' ORDER BY applicant_number DESC LIMIT 1`);
        let nextApplicantNum = 1;
        if (lastApplicant.rows.length > 0 && lastApplicant.rows[0].applicant_number) {
            const match = lastApplicant.rows[0].applicant_number.match(/AGAP-(\d+)/);
            if (match) {
                nextApplicantNum = parseInt(match[1], 10) + 1;
            }
        }
        const newApplicantNumber = `AGAP-${String(nextApplicantNum).padStart(4, '0')}`;
        const result = await database_1.pool.query(`
      INSERT INTO applicants (
        applicant_number, password_hash, surname, first_name, middle_name, date_of_birth, place_of_birth,
        sex, civil_status, citizenship, blood_type, gsis_id_no, pag_ibig_id_no, philhealth_no,
        sss_no, residential_address, permanent_address, telephone_no, mobile_no, email_address,
        educational_background, civil_service_eligibility, work_experience, voluntary_work,
        learning_and_development, other_information, questionnaire_responses, family_background
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        , $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28
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
            data.family_background ? JSON.stringify(data.family_background) : null
        ]);
        const applicant = result.rows[0];
        return applicant;
    }
    async changePassword(applicantId, currentPasswordRaw, newPasswordRaw) {
        const result = await database_1.pool.query('SELECT password_hash FROM applicants WHERE id = $1', [applicantId]);
        const applicant = result.rows[0];
        if (!applicant || !applicant.password_hash) {
            throw new Error('User not found or no password set');
        }
        const isMatch = await bcrypt.compare(currentPasswordRaw, applicant.password_hash);
        if (!isMatch) {
            throw new Error('Incorrect current password');
        }
        const newPasswordHash = await bcrypt.hash(newPasswordRaw, 10);
        await database_1.pool.query('UPDATE applicants SET password_hash = $1 WHERE id = $2', [newPasswordHash, applicantId]);
        return true;
    }
    async update(id, data) {
        const fields = [];
        const values = [];
        let idx = 1;
        const addField = (colName, val, isJson = false) => {
            if (val !== undefined) {
                fields.push(`${colName} = $${idx}`);
                values.push(isJson ? JSON.stringify(val) : val);
                idx++;
            }
        };
        addField('surname', data.surname);
        addField('first_name', data.first_name);
        addField('middle_name', data.middle_name);
        addField('date_of_birth', data.date_of_birth ? new Date(data.date_of_birth) : null);
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
        addField('educational_background', data.educational_background, true);
        addField('family_background', data.family_background, true);
        addField('civil_service_eligibility', data.civil_service_eligibility, true);
        addField('work_experience', data.work_experience, true);
        addField('voluntary_work', data.voluntary_work, true);
        addField('learning_and_development', data.learning_and_development, true);
        addField('other_information', data.other_information, true);
        addField('questionnaire_responses', data.questionnaire_responses, true);
        if (fields.length === 0)
            return null;
        values.push(id);
        const query = `UPDATE applicants SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
        const result = await database_1.pool.query(query, values);
        return result.rows[0];
    }
}
exports.ApplicantsService = new ApplicantsServiceClass();
//# sourceMappingURL=applicants.service.js.map