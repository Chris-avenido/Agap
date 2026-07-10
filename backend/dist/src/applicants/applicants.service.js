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
const prisma_1 = require("../prisma");
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
    async findAll() {
        return prisma_1.prisma.applicants.findMany({
            where: {
                job_applications: {
                    some: {}
                }
            },
            include: {
                job_applications: true
            },
            orderBy: {
                id: 'desc'
            }
        });
    }
    async login(email_address, password_raw) {
        const applicant = await prisma_1.prisma.applicants.findUnique({
            where: { email_address }
        });
        if (!applicant || !applicant.password_hash)
            return null;
        const isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
        if (!isMatch)
            return null;
        return applicant;
    }
    async applyJob(applicantId, jobTitle, positionId) {
        return prisma_1.prisma.job_applications.create({
            data: {
                applicant_id: applicantId,
                position_id: positionId,
                job_title: jobTitle,
                status: 'Pending'
            }
        });
    }
    async findApplications(applicantId) {
        return prisma_1.prisma.job_applications.findMany({
            where: { applicant_id: applicantId }
        });
    }
    async toggleSavedJob(applicantId, positionId) {
        const existing = await prisma_1.prisma.saved_jobs.findFirst({
            where: { applicant_id: applicantId, position_id: positionId }
        });
        if (existing) {
            const newStatus = !existing.is_saved;
            await prisma_1.prisma.saved_jobs.update({
                where: { id: existing.id },
                data: { is_saved: newStatus }
            });
            return { status: newStatus ? 'added' : 'removed' };
        }
        else {
            await prisma_1.prisma.saved_jobs.create({
                data: { applicant_id: applicantId, position_id: positionId, is_saved: true }
            });
            return { status: 'added' };
        }
    }
    async findSavedJobs(applicantId) {
        return prisma_1.prisma.saved_jobs.findMany({
            where: { applicant_id: applicantId, is_saved: true }
        });
    }
    async create(data) {
        const email = data.email_address || `no-email-${Date.now()}@test.com`;
        if (data.email_address) {
            const existing = await prisma_1.prisma.applicants.findUnique({
                where: { email_address: data.email_address }
            });
            if (existing) {
                throw new Error();
            }
        }
        let passwordHash = null;
        if (data.password) {
            passwordHash = await bcrypt.hash(data.password, 10);
        }
        const applicant = await prisma_1.prisma.applicants.create({
            data: {
                password_hash: passwordHash,
                surname: data.surname || 'UNKNOWN',
                first_name: data.first_name || 'UNKNOWN',
                middle_name: data.middle_name,
                date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : null,
                place_of_birth: data.place_of_birth,
                sex: data.sex,
                civil_status: data.civil_status,
                citizenship: data.citizenship,
                blood_type: data.blood_type,
                gsis_id_no: data.gsis_id_no,
                pag_ibig_id_no: data.pag_ibig_id_no,
                philhealth_no: data.philhealth_no,
                sss_no: data.sss_no,
                residential_address: data.residential_address,
                permanent_address: data.permanent_address,
                telephone_no: data.telephone_no,
                mobile_no: data.mobile_no,
                email_address: email,
                educational_background: data.educational_background || [],
                civil_service_eligibility: data.civil_service_eligibility || [],
                work_experience: data.work_experience || [],
                voluntary_work: data.voluntary_work || [],
                learning_and_development: data.learning_and_development || [],
                other_information: data.other_information || {},
                questionnaire_responses: {
                    q34a: data.q34a,
                    q34b: data.q34b,
                    q35a: data.q35a,
                    q35b: data.q35b,
                    q36: data.q36,
                    q37: data.q37,
                    q38a: data.q38a,
                    q38b: data.q38b,
                    q39: data.q39,
                    q40a: data.q40a,
                    q40b: data.q40b,
                    q40c: data.q40c,
                },
            },
        });
        if (data.jobTitle) {
            await prisma_1.prisma.job_applications.create({
                data: {
                    applicant_id: applicant.id,
                    position_id: data.positionId ? parseInt(data.positionId, 10) : null,
                    job_title: data.jobTitle,
                    status: 'Pending'
                }
            });
        }
        return applicant;
    }
}
exports.ApplicantsService = new ApplicantsServiceClass();
//# sourceMappingURL=applicants.service.js.map