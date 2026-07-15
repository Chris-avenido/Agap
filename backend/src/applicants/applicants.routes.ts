import { Router } from 'express';
import multer from 'multer';
import { ApplicantsService } from './applicants.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
import { uploadToAzure, downloadFromAzure, deleteFromAzure } from '../utils/azureStorage';

router.post('/parse-resume', upload.single('resume'), async (req, res) => {
  const file = (req as any).file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const data = await ApplicantsService.parseResume(file);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Parse endpoint error:", error);
    res.status(500).json({ message: error.message || 'Error parsing resume' });
  }
});

router.post('/login', async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const applicant = await ApplicantsService.login(email_address, password);
    if (!applicant) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ success: true, data: { id: applicant.id, applicant_number: applicant.applicant_number, email: applicant.email_address } });
  } catch (error: any) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
});

router.post('/apply-job', async (req, res) => {
  try {
    const result = await ApplicantsService.applyJob(req.body.applicantId, req.body.jobTitle, req.body.positionId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: error.message || 'Error saving job application' });
  }
});

router.get('/', async (req, res) => {
  try {

    const applicants = await ApplicantsService.findAll();
    res.json({ success: true, data: applicants });
  } catch (error: any) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: error.message || 'Error fetching applicants' });
  }
});

router.get('/:id', async (req, res, next) => {
  if (['parse-resume', 'login', 'apply-job', 'proxy-blob', 'get-sas-url'].includes(req.params.id)) {
    return next(); // Let other routes handle it
  }
  try {
    const applicant = await ApplicantsService.findOne(Number(req.params.id));
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
    res.json({ success: true, data: applicant });
  } catch (error: any) {
    console.error("Error fetching applicant:", error);
    res.status(500).json({ message: error.message || 'Error fetching applicant profile' });
  }
});


router.get('/:id/applications', async (req, res) => {
  try {
    const applications = await ApplicantsService.findApplications(Number(req.params.id));
    res.json({ success: true, data: applications });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: error.message || 'Error fetching applications' });
  }
});

router.post('/:id/save-job', async (req, res) => {
  try {
    const result = await ApplicantsService.toggleSavedJob(Number(req.params.id), req.body.positionId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error toggling saved job:", error);
    res.status(500).json({ message: error.message || 'Error toggling saved job' });
  }
});

router.get('/:id/saved-jobs', async (req, res) => {
  try {
    const savedJobs = await ApplicantsService.findSavedJobs(Number(req.params.id));
    res.json({ success: true, data: savedJobs });
  } catch (error: any) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ message: error.message || 'Error fetching saved jobs' });
  }
});

router.post('/', async (req, res) => {
  try {
    const applicant = await ApplicantsService.create(req.body);
    res.json({ success: true, message: 'Application submitted successfully', data: applicant });
  } catch (error: any) {
    console.error("Error saving applicant:", error);
    res.status(500).json({ message: error.message || 'Error submitting application' });
  }
});


router.post('/:id/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await ApplicantsService.changePassword(Number(req.params.id), currentPassword, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error("Error changing password:", error);
    res.status(400).json({ message: error.message || 'Error changing password' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const applicant = await ApplicantsService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Applicant profile updated successfully', data: applicant });
  } catch (error: any) {
    console.error("Error updating applicant:", error);
    res.status(500).json({ message: error.message || 'Error updating profile' });
  }
});

router.post('/:id/documents', upload.array('files'), async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
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
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

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
      
      // Delete existing blob if replacing
      if (otherInfo.documents[docName]) {
        await deleteFromAzure(otherInfo.documents[docName]);
      }

      // Sanitize file name
      const ext = file.originalname.split('.').pop();
      const safeName = `${applicantNumber}_${docName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${ext}`;
      
      const url = await uploadToAzure(file.buffer, safeName, file.mimetype);
      otherInfo.documents[docName] = url;
    });

    await Promise.all(uploadPromises);

    // Sync profile_photo to photoUrl if present
    if (otherInfo.documents.profile_photo) {
      otherInfo.photoUrl = otherInfo.documents.profile_photo;
    }

    // Update applicant with new other_information
    await ApplicantsService.update(applicantId, { other_information: otherInfo });

    res.json({ success: true, message: 'Documents uploaded successfully', documents: otherInfo.documents });
  } catch (error: any) {
    console.error("Error uploading documents:", error);
    res.status(500).json({ message: error.message || 'Error uploading documents' });
  }
});

router.post('/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

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

    const url = await uploadToAzure(file.buffer, safeName, file.mimetype);
    otherInfo.photoUrl = url;

    await ApplicantsService.update(applicantId, { other_information: otherInfo });

    res.json({ success: true, message: 'Photo uploaded successfully', photoUrl: url });
  } catch (error: any) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: error.message || 'Error uploading photo' });
  }
});

router.get('/proxy-blob', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).send('URL is required');
    }

    const blobName = decodeURIComponent(url.split('/').pop() || '');
    if (!blobName) {
      return res.status(400).send('Invalid blob URL');
    }

    const { stream, contentType } = await downloadFromAzure(blobName);
    
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    if (stream) {
      stream.pipe(res);
    } else {
      res.status(404).send('Stream not found');
    }
  } catch (error: any) {
    console.error("Error proxying blob:", error);
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
    console.error("Error generating SAS URL:", error);
    res.status(500).send('Error generating secure download link');
  }
});

router.get('/:id/print-pds', async (req, res) => {
  try {
    const applicantId = parseInt(req.params.id, 10);
    const applicant = await ApplicantsService.findOne(applicantId);
    if (!applicant) {
      return res.status(404).send('Applicant not found');
    }
    
    const path = require('path');
    const fs = require('fs');
    // Go up from dist/applicants/applicants.routes.js to frontend/src/assets
    const templatePath = path.join(__dirname, '../../../frontend/src/assets/ANNEX H-1 - CS Form No. 212 Revised 2025 - Personal Data Sheet (2).xlsx');
    
    if (!fs.existsSync(templatePath)) {
       return res.status(500).send("Excel template not found at: " + templatePath);
    }
    
    const cleanFirstName = (applicant.first_name || 'Applicant').replace(/[^a-zA-Z0-9]/g, '');
    const cleanLastName = (applicant.last_name || 'Name').replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `PDS_${cleanFirstName}_${cleanLastName}.xlsx`;
    
    res.download(templatePath, fileName);
  } catch (error: any) {
    console.error("Error generating PDS:", error);
    res.status(500).send(`Error generating Personal Data Sheet: ${error.message} - ${error.stack}`);
  }
});

export default router;
