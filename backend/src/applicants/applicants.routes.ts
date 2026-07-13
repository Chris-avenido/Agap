import { Router } from 'express';
import multer from 'multer';
import { ApplicantsService } from './applicants.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

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

router.get('/:id', async (req, res) => {
  if (req.params.id === 'parse-resume' || req.params.id === 'login' || req.params.id === 'apply-job') {
    return; // Let other routes handle it if it conflicts, though express router order should handle it. Wait, the order of routes matters.
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

export default router;
