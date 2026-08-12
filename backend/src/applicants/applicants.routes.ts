import { Router } from 'express';
import multer from 'multer';
import { ApplicantsService } from './applicants.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const APPLICANT_SESSION_TTL_MS = 3 * 60 * 60 * 1000;
import {
  uploadToAzure,
  downloadFromAzure,
  deleteFromAzure,
} from '../utils/azureStorage';
import { compressPdf } from '../utils/pdfCompressor';
import {
  SsoAuthenticationError,
  SsoConfigurationError,
  verifyApplicantSsoToken,
} from './applicants-sso.service';

router.post('/parse-resume', upload.single('resume'), async (req, res) => {
  const file = (req as any).file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const data = await ApplicantsService.parseResume(file);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Parse endpoint error:', error);
    res.status(500).json({ message: error.message || 'Error parsing resume' });
  }
});

router.post('/login', async (req, res) => {
  const { email_address, password, loginMethod } = req.body;
  try {
    const applicant = await ApplicantsService.login(
      email_address,
      password,
      loginMethod,
    );
    if (!applicant) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      success: true,
      data: {
        id: applicant.id,
        applicant_number: applicant.applicant_number,
        email: applicant.email_address,
      },
    });
  } catch (error: any) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    // Always return success even if email is not found to prevent enumeration
    await ApplicantsService.forgotPassword(email);
    res.json({
      success: true,
      message:
        'If that email is registered, a password reset link has been sent.',
    });
  } catch (error: any) {
    console.error('Error in forgot-password:', error);
    res
      .status(500)
      .json({ message: 'Error processing password reset request' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, new_password } = req.body;
  if (!token || !new_password) {
    return res
      .status(400)
      .json({ message: 'Token and new password are required' });
  }
  try {
    await ApplicantsService.resetPassword(token, new_password);
    res.json({
      success: true,
      message: 'Password has been successfully reset',
    });
  } catch (error: any) {
    console.error('Error in reset-password:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error resetting password' });
  }
});

router.post('/sso-login', async (req, res) => {
  const ssoToken =
    typeof req.body?.sso_token === 'string' ? req.body.sso_token.trim() : '';
  if (!ssoToken) {
    return res.status(400).json({ message: 'SSO token is missing' });
  }

  try {
    const claims = verifyApplicantSsoToken(ssoToken);

    let applicant = await ApplicantsService.findByEmail(claims.email);
    if (!applicant) {
      // Wilfredo is an HQ administrative identity and does not have a legacy
      // applicant row. Provision a dedicated passwordless applicant profile on
      // the first verified HQ handoff so the dashboard never exposes another
      // applicant's records.
      try {
        applicant = await ApplicantsService.create({
          email_address: claims.email,
          first_name: 'Wilfredo',
          surname: 'Cabral',
        });
      } catch (error) {
        // A simultaneous first sign-in may win the unique-email insert. Read
        // the row again before treating the provisioning attempt as failed.
        applicant = await ApplicantsService.findByEmail(claims.email);
        if (!applicant) throw error;
      }
    }

    res.json({
      success: true,
      data: {
        id: applicant.id,
        applicant_number: applicant.applicant_number,
        email: applicant.email_address,
        expiry: Date.now() + APPLICANT_SESSION_TTL_MS,
      },
    });
  } catch (error: any) {
    if (error instanceof SsoConfigurationError) {
      console.error('AGAP SSO configuration error:', error.message);
      return res.status(500).json({ message: 'AGAP SSO is not configured' });
    }
    if (error instanceof SsoAuthenticationError) {
      return res.status(401).json({ message: error.message });
    }
    console.error('AGAP SSO exchange error:', error);
    return res.status(500).json({ message: 'Unable to complete HQ sign-in' });
  }
});

router.post('/apply-job', async (req, res) => {
  try {
    const { applicantId, jobTitle, positionId } = req.body;
    if (!applicantId) {
      return res.status(400).json({ message: 'Applicant ID is required' });
    }

    const applicant = await ApplicantsService.findOne(Number(applicantId));
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

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
      return res.status(400).json({
        message:
          'Position requires both Secondary and College educational background entries.',
      });
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
        (String(ans).toUpperCase() !== 'YES' &&
          String(ans).toUpperCase() !== 'NO')
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
      return res.status(400).json({
        message:
          'Legal Questionnaire, character references (min. 3), and Government ID details must be fully completed.',
      });
    }

    const result = await ApplicantsService.applyJob(
      req.body.applicantId,
      req.body.jobTitle,
      req.body.positionId,
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error applying to job:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error saving job application' });
  }
});

router.get('/', async (req, res) => {
  try {
    const applicants = await ApplicantsService.findAll();
    res.json({ success: true, data: applicants });
  } catch (error: any) {
    console.error('Error fetching applicants:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching applicants' });
  }
});

router.get('/:id', async (req, res, next) => {
  if (
    [
      'parse-resume',
      'login',
      'apply-job',
      'proxy-blob',
      'get-sas-url',
    ].includes(req.params.id)
  ) {
    return next(); // Let other routes handle it
  }
  const id = Number(req.params.id);
  if (isNaN(id)) return next();

  try {
    const applicant = await ApplicantsService.findOne(id);
    if (!applicant)
      return res.status(404).json({ message: 'Applicant not found' });
    res.json({ success: true, data: applicant });
  } catch (error: any) {
    console.error('Error fetching applicant:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching applicant profile' });
  }
});

router.get('/:id/applications', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applications = await ApplicantsService.findApplications(id);
    res.json({ success: true, data: applications });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching applications' });
  }
});

router.post('/:id/save-job', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const result = await ApplicantsService.toggleSavedJob(
      id,
      req.body.positionId,
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error toggling saved job:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error toggling saved job' });
  }
});

router.get('/:id/saved-jobs', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const savedJobs = await ApplicantsService.findSavedJobs(id);
    res.json({ success: true, data: savedJobs });
  } catch (error: any) {
    console.error('Error fetching saved jobs:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching saved jobs' });
  }
});

router.post('/', async (req, res) => {
  try {
    const applicant = await ApplicantsService.create(req.body);
    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: applicant,
    });
  } catch (error: any) {
    console.error('Error saving applicant:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error submitting application' });
  }
});

router.post('/:id/passcode', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const { passcode } = req.body;
    await ApplicantsService.setPasscode(id, passcode);
    res.json({ success: true, message: 'Passcode updated successfully' });
  } catch (error: any) {
    console.error('Error setting passcode:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error setting passcode' });
  }
});

router.post('/:id/change-password', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const { currentPassword, newPassword } = req.body;
    await ApplicantsService.changePassword(id, currentPassword, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error changing password:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error changing password' });
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applicant = await ApplicantsService.update(id, req.body);
    res.json({
      success: true,
      message: 'Applicant profile updated successfully',
      data: applicant,
    });
  } catch (error: any) {
    console.error('Error updating applicant:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error updating profile' });
  }
});

router.post('/:id/documents', upload.array('files'), async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applicantId = id;
    const files = (req as any).files;
    let documentNames = req.body.documentNames; // Array of doc names matching files array order

    // If only one file is uploaded, documentNames will be a string instead of an array
    if (!Array.isArray(documentNames)) {
      documentNames = [documentNames];
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant)
      return res.status(404).json({ message: 'Applicant not found' });

    const applicantNumber = applicant.applicant_number || `ID-${applicantId}`;

    let otherInfo = applicant.other_information || {};
    if (typeof otherInfo === 'string') {
      otherInfo = JSON.parse(otherInfo);
    }

    if (!otherInfo.documents) {
      otherInfo.documents = {};
    }

    const uploadPromises = files.map(async (file, index) => {
      const docName = documentNames[index];

      // Delete existing blob if replacing (except for per-application documents like Letter of Intent or Sworn Declaration)
      if (
        otherInfo.documents[docName] &&
        docName !== 'Letter of Intent' &&
        docName !== 'Sworn Declaration'
      ) {
        await deleteFromAzure(otherInfo.documents[docName]);
      }

      // Sanitize file name
      const ext = file.originalname.split('.').pop();
      const surname = (applicant.surname || 'Applicant')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
      const docTypeSlug = docName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const appNumber = applicantNumber.replace(/[^a-zA-Z0-9-]/g, '_');

      let safeName = `${surname}_${docTypeSlug}_${Date.now()}_${appNumber}`;
      if (
        (docName === 'Letter of Intent' || docName === 'Sworn Declaration') &&
        req.body.jobClusterId
      ) {
        const jId = String(req.body.jobClusterId).replace(
          /[^a-zA-Z0-9-]/g,
          '_',
        );
        safeName += `_${jId}`;
      }
      safeName += `.${ext}`;

      // Store documents per applicant and per document type
      const folderPath = `applicant-${applicantId}/${docTypeSlug}`;
      const fullBlobPath = `${folderPath}/${safeName}`;

      let finalBuffer = file.buffer;
      if (file.mimetype === 'application/pdf') {
        finalBuffer = await compressPdf(file.buffer, 150);
      }

      const url = await uploadToAzure(finalBuffer, fullBlobPath, file.mimetype);
      otherInfo.documents[docName] = url;
    });

    await Promise.all(uploadPromises);

    // Sync profile_photo to photoUrl if present
    if (otherInfo.documents.profile_photo) {
      otherInfo.photoUrl = otherInfo.documents.profile_photo;
    }

    // Update applicant with new other_information
    await ApplicantsService.update(applicantId, {
      other_information: otherInfo,
    });

    res.json({
      success: true,
      message: 'Documents uploaded successfully',
      documents: otherInfo.documents,
    });
  } catch (error: any) {
    console.error('Error uploading documents:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error uploading documents' });
  }
});

router.post(
  '/:id/replace-document',
  upload.single('file'),
  async (req: any, res: any) => {
    try {
      const applicantId = parseInt(req.params.id);
      if (isNaN(applicantId)) {
        return res.status(400).json({ message: 'Invalid applicant ID' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const { docType, applicationId, applicationIds } = req.body;
      if (docType !== 'Letter of Intent' && docType !== 'Sworn Declaration') {
        return res.status(400).json({
          message:
            'Invalid document type. Must be Letter of Intent or Sworn Declaration.',
        });
      }

      let parsedAppIds: string[] | undefined = undefined;
      if (applicationIds) {
        if (Array.isArray(applicationIds)) {
          parsedAppIds = applicationIds;
        } else if (typeof applicationIds === 'string') {
          try {
            const jsonParsed = JSON.parse(applicationIds);
            if (Array.isArray(jsonParsed)) parsedAppIds = jsonParsed;
            else
              parsedAppIds = applicationIds
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
          } catch {
            parsedAppIds = applicationIds
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
          }
        }
      } else if (applicationId) {
        parsedAppIds = [applicationId];
      }

      const applicant = await ApplicantsService.findOne(applicantId);
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }

      const applicantNumber =
        applicant.applicant_number ||
        `AGAP-${String(applicantId).padStart(4, '0')}`;
      const ext = req.file.originalname.split('.').pop() || 'pdf';
      const surname = (applicant.surname || 'Applicant')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
      const docTypeSlug = docType.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const appNumber = applicantNumber.replace(/[^a-zA-Z0-9-]/g, '_');

      let safeName = `${surname}_${docTypeSlug}_${Date.now()}_${appNumber}`;
      if (parsedAppIds && parsedAppIds.length === 1) {
        const cleanAppId = String(parsedAppIds[0]).replace(
          /[^a-zA-Z0-9-]/g,
          '_',
        );
        safeName += `_${cleanAppId}`;
      }
      safeName += `.${ext}`;

      const folderPath = `applicant-${applicantId}/${docTypeSlug}`;
      const fullBlobPath = `${folderPath}/${safeName}`;

      let finalBuffer = req.file.buffer;
      if (req.file.mimetype === 'application/pdf') {
        finalBuffer = await compressPdf(req.file.buffer, 150);
      }

      // Upload new Blob to Azure Storage (WITHOUT deleting the previous Blob)
      const newBlobUrl = await uploadToAzure(
        finalBuffer,
        fullBlobPath,
        req.file.mimetype,
      );

      // Update applicant profile & targeted applications in DB transaction with audit logging
      const result = await ApplicantsService.replaceApplicantDocument(
        applicantId,
        docType as 'Letter of Intent' | 'Sworn Declaration',
        newBlobUrl,
        parsedAppIds,
      );

      res.json({
        success: true,
        message: `Successfully updated ${docType} across ${result.affectedApplications} selected application(s).`,
        newUrl: result.newUrl,
        affectedApplications: result.affectedApplications,
        targetApplicationIds: result.targetApplicationIds,
        documents: result.documents,
      });
    } catch (error: any) {
      console.error('Error replacing document:', error);
      res
        .status(500)
        .json({ message: error.message || 'Error replacing document' });
    }
  },
);

router.post('/:id/photo', upload.single('photo'), async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applicantId = id;
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant)
      return res.status(404).json({ message: 'Applicant not found' });

    let otherInfo = applicant.other_information || {};
    if (typeof otherInfo === 'string') {
      otherInfo = JSON.parse(otherInfo);
    }

    // Delete existing photo if replacing
    if (otherInfo.photoUrl) {
      await deleteFromAzure(otherInfo.photoUrl);
    }

    const ext = file.originalname.split('.').pop();
    const applicantNumber = applicant.applicant_number || `ID-${applicantId}`;
    const safeName = `${applicantNumber}_ProfilePhoto_${Date.now()}.${ext}`;

    // Store profile photo per applicant
    const folderPath = `applicant-${applicantId}/profile-photo`;
    const fullBlobPath = `${folderPath}/${safeName}`;

    const url = await uploadToAzure(file.buffer, fullBlobPath, file.mimetype);
    otherInfo.photoUrl = url;

    await ApplicantsService.update(applicantId, {
      other_information: otherInfo,
    });

    res.json({
      success: true,
      message: 'Photo uploaded successfully',
      photoUrl: url,
    });
  } catch (error: any) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: error.message || 'Error uploading photo' });
  }
});

router.get('/proxy-blob', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).send('URL is required');
    }

    const { stream, contentType } = await downloadFromAzure(url);

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    if (stream) {
      stream.pipe(res);
    } else {
      res.status(404).send('Stream not found');
    }
  } catch (error: any) {
    console.error('Error proxying blob:', error);
    res.status(500).send('Error proxying blob');
  }
});

router.get('/get-sas-url', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).send('URL is required');
    }

    // Import dynamically if needed or it's already exported from azureStorage
    const { getBlobSasUrl } = require('../utils/azureStorage');
    const sasUrl = await getBlobSasUrl(url);

    // Redirect the browser to the secure SAS URL
    res.redirect(sasUrl);
  } catch (error: any) {
    console.error('Error generating SAS URL:', error);
    res.status(500).send('Error generating secure download link');
  }
});

import { execSync } from 'child_process';
import libre from 'libreoffice-convert';
import util from 'util';
const convertToPdf = (fileBuf: any, ext: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    libre.convert(fileBuf, ext, undefined, (err, done) => {
      if (err) reject(err);
      else resolve(done);
    });
  });
};

router.post('/convert-pds-to-pdf', upload.single('file'), async (req, res) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const pdfBuf = await convertToPdf(file.buffer, '.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=PDS.pdf');
    res.send(pdfBuf);
  } catch (error: any) {
    console.error('Error converting PDS to PDF:', error);
    // Fallback: If libreoffice is not installed, return the XLSX file so it doesn't just crash in dev.
    // In production, libreoffice would be installed.
    const file = (req as any).file;
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(file.buffer);
  }
});

router.post('/convert-pds-v2', async (req, res) => {
  try {
    const { generatePDSBackend } = require('../utils/pdsGeneratorBackend');
    const applicantData = req.body;
    if (!applicantData) {
      return res.status(400).json({ message: 'No applicant data provided' });
    }

    // Generate XLSX buffer using xlsx-populate
    const { buffer, logs } = await generatePDSBackend(applicantData);

    // Log validation metrics to console instead of writing to disk (fixes EROFS on Vercel)
    console.log('PDS Validation Report:', JSON.stringify(logs, null, 2));

    // Always return XLSX so user can edit missing data after download
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=PDS.xlsx');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating PDS v2:', error);
    res.status(500).json({ message: error.message || 'Error generating PDS' });
  }
});

router.post('/convert-experience', async (req, res) => {
  try {
    const {
      generateExperienceBackend,
    } = require('../utils/pdsGeneratorBackend');
    const applicantData = req.body;
    if (!applicantData) {
      return res.status(400).json({ message: 'No applicant data provided' });
    }

    const { buffer } = await generateExperienceBackend(applicantData);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=experience.xlsx',
    );
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating Experience Sheet:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error generating Experience Sheet' });
  }
});

router.get('/:id/print-pds', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return next();
  try {
    const applicantId = id;
    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant) {
      return res.status(404).send('Applicant not found');
    }

    const path = require('path');
    const fs = require('fs');
    // Go up from dist/applicants/applicants.routes.js to frontend/src/assets
    const templatePath = path.join(
      __dirname,
      '../../../frontend/src/assets/ANNEX H-1 - CS Form No. 212 Revised 2025 - Personal Data Sheet (2).xlsx',
    );

    if (!fs.existsSync(templatePath)) {
      return res
        .status(500)
        .send('Excel template not found at: ' + templatePath);
    }

    const cleanFirstName = (applicant.first_name || 'Applicant').replace(
      /[^a-zA-Z0-9]/g,
      '',
    );
    const cleanLastName = (
      applicant.surname ||
      applicant.last_name ||
      'Name'
    ).replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `PDS_${cleanFirstName}_${cleanLastName}.xlsx`;

    res.download(templatePath, fileName);
  } catch (error: any) {
    console.error('Error generating PDS:', error);
    res
      .status(500)
      .send(
        `Error generating Personal Data Sheet: ${error.message} - ${error.stack}`,
      );
  }
});

export default router;
