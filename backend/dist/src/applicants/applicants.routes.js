"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const applicants_service_1 = require("./applicants.service");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/parse-resume', upload.single('resume'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const data = await applicants_service_1.ApplicantsService.parseResume(file);
        res.json({ success: true, data });
    }
    catch (error) {
        console.error("Parse endpoint error:", error);
        res.status(500).json({ message: error.message || 'Error parsing resume' });
    }
});
router.post('/login', async (req, res) => {
    const { email_address, password } = req.body;
    try {
        const applicant = await applicants_service_1.ApplicantsService.login(email_address, password);
        if (!applicant) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ success: true, data: { id: applicant.id, email: applicant.email_address } });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: error.message || 'Error logging in' });
    }
});
router.post('/apply-job', async (req, res) => {
    try {
        const result = await applicants_service_1.ApplicantsService.applyJob(req.body.applicantId, req.body.jobTitle, req.body.positionId);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error("Error applying to job:", error);
        res.status(500).json({ message: error.message || 'Error saving job application' });
    }
});
router.get('/', async (req, res) => {
    try {
        const applicants = await applicants_service_1.ApplicantsService.findAll();
        res.json({ success: true, data: applicants });
    }
    catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: error.message || 'Error fetching applicants' });
    }
});
router.get('/:id/applications', async (req, res) => {
    try {
        const applications = await applicants_service_1.ApplicantsService.findApplications(Number(req.params.id));
        res.json({ success: true, data: applications });
    }
    catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: error.message || 'Error fetching applications' });
    }
});
router.post('/:id/save-job', async (req, res) => {
    try {
        const result = await applicants_service_1.ApplicantsService.toggleSavedJob(Number(req.params.id), req.body.positionId);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error("Error toggling saved job:", error);
        res.status(500).json({ message: error.message || 'Error toggling saved job' });
    }
});
router.get('/:id/saved-jobs', async (req, res) => {
    try {
        const savedJobs = await applicants_service_1.ApplicantsService.findSavedJobs(Number(req.params.id));
        res.json({ success: true, data: savedJobs });
    }
    catch (error) {
        console.error("Error fetching saved jobs:", error);
        res.status(500).json({ message: error.message || 'Error fetching saved jobs' });
    }
});
router.post('/', async (req, res) => {
    try {
        const applicant = await applicants_service_1.ApplicantsService.create(req.body);
        res.json({ success: true, message: 'Application submitted successfully', data: applicant });
    }
    catch (error) {
        console.error("Error saving applicant:", error);
        res.status(500).json({ message: error.message || 'Error submitting application' });
    }
});
exports.default = router;
//# sourceMappingURL=applicants.routes.js.map