import * as bcrypt from 'bcryptjs';
import { prisma } from '../database';
const pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';

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
              parsedData.work_experience.push({...currentWork});
              jobCount++;
              if (jobCount >= 4) break;
              currentWork = { company: '', position: '' };
            }
            
            // Heuristic: The two lines above the date are usually the Position Title and Company Name
            if (i > 0) currentWork.position = workLines[i-1];
            if (i > 1 && !/(?:19|20)\d{2}/.test(workLines[i-2])) {
              currentWork.company = workLines[i-2];
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

  async findAll() {
    return prisma.applicants.findMany({
      where: {
        job_applications: {
          some: {} // Only return applicants who have at least one job application
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

  async login(email_address: string, password_raw: string) {
    const applicant = await prisma.applicants.findUnique({
      where: { email_address }
    });
    if (!applicant || !applicant.password_hash) return null;
    const isMatch = await bcrypt.compare(password_raw, applicant.password_hash);
    if (!isMatch) return null;
    return applicant;
  }

  async applyJob(applicantId: number, jobTitle: string, positionId?: number) {
    return prisma.job_applications.create({
      data: {
        applicant_id: applicantId,
        position_id: positionId,
        job_title: jobTitle,
        status: 'Pending'
      }
    });
  }

  async findApplications(applicantId: number) {
    return prisma.job_applications.findMany({
      where: { applicant_id: applicantId }
    });
  }

  async toggleSavedJob(applicantId: number, positionId: number) {
    const existing = await prisma.saved_jobs.findFirst({
      where: { applicant_id: applicantId, position_id: positionId }
    });

    if (existing) {
      const newStatus = !existing.is_saved;
      await prisma.saved_jobs.update({
        where: { id: existing.id },
        data: { is_saved: newStatus }
      });
      return { status: newStatus ? 'added' : 'removed' };
    } else {
      await prisma.saved_jobs.create({
        data: { applicant_id: applicantId, position_id: positionId, is_saved: true }
      });
      return { status: 'added' };
    }
  }

  async findSavedJobs(applicantId: number) {
    return prisma.saved_jobs.findMany({
      where: { applicant_id: applicantId, is_saved: true }
    });
  }

  async create(data: any) {
    const email = data.email_address || `no-email-${Date.now()}@test.com`;

    if (data.email_address) {
      const existing = await prisma.applicants.findUnique({
        where: { email_address: data.email_address }
      });
      
      if (existing) {
        throw new Error('Email address already exists');
      }
    }
    
    let passwordHash: string | null = null;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }

    const applicant = await prisma.applicants.create({
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
      await prisma.job_applications.create({
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

export const ApplicantsService = new ApplicantsServiceClass();