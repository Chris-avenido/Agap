import { NextFunction, Request, Response } from 'express';
import { ApplicantsService } from '../../applicants/applicants.service';
import { uploadToAzure } from '../../utils/azureStorage';
import { compressPdf } from '../../utils/pdfCompressor';

// POST /:id/documents
// POST /:id/replace-document
// POST /:id/photo
// GET  /:id/document-audit-logs
export async function uploadDocuments(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applicantId = id;
    const files = (req as any).files;
    const rawDocNames = req.body.documentNames ?? req.body['documentNames[]'];
    let documentNames: string[] = [];

    if (Array.isArray(rawDocNames)) {
      documentNames = rawDocNames;
    } else if (typeof rawDocNames === 'string') {
      try {
        const parsed = JSON.parse(rawDocNames);
        if (Array.isArray(parsed)) {
          documentNames = parsed;
        } else {
          documentNames = [rawDocNames];
        }
      } catch {
        documentNames = [rawDocNames];
      }
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant)
      return res.status(404).json({ message: 'Applicant not found' });

    const applicantNumber = applicant.applicant_number || `ID-${applicantId}`;

    const uploadPromises = files.map(async (file: any, index: number) => {
      const docName = documentNames[index] || file.originalname;

      // Sanitize file name
      const ext = file.originalname.split('.').pop() || 'pdf';
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
      return { docName, url };
    });

    const uploadedDocs = await Promise.all(uploadPromises);

    // Save documents and log audit records per application in a single concurrency-safe batch transaction
    const result = await ApplicantsService.saveApplicantDocuments(
      applicantId,
      uploadedDocs,
    );

    res.json({
      success: true,
      message: 'Documents uploaded successfully',
      batchNumber: result.batchNumber,
      affectedApplications: result.affectedApplications,
      documents: result.documents,
    });
  } catch (error: any) {
    console.error('Error uploading documents:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error uploading documents' });
  }
}

export async function replaceDocument(req: any, res: any) {
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
}

export async function uploadPhoto(req: Request, res: Response, next: NextFunction) {
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

    const oldPhotoUrl =
      otherInfo.photoUrl || otherInfo.documents?.profile_photo || null;

    const ext = file.originalname.split('.').pop();
    const applicantNumber = applicant.applicant_number || `ID-${applicantId}`;
    const safeName = `${applicantNumber}_ProfilePhoto_${Date.now()}.${ext}`;

    // Store profile photo per applicant
    const folderPath = `applicant-${applicantId}/profile-photo`;
    const fullBlobPath = `${folderPath}/${safeName}`;

    const url = await uploadToAzure(file.buffer, fullBlobPath, file.mimetype);
    otherInfo.photoUrl = url;

    // Insert audit log for photo upload
    await ApplicantsService.logDocumentAudit(
      applicantId,
      'Profile Photo',
      url,
      0,
      null,
    );

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
}

export async function getDocumentAuditLogs(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const latestOnly = req.query.latest === 'true';
    const logs = await ApplicantsService.getDocumentAuditLogs(id, latestOnly);
    res.json({ success: true, data: logs });
  } catch (error: any) {
    console.error('Error fetching document audit logs:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching document audit logs' });
  }
}
