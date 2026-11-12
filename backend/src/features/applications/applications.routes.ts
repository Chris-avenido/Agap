import { Router } from 'express';
import * as controller from './applications.controller';

const router = Router();

router.post('/apply-job', controller.applyJob);
router.get('/:id/applications', controller.getApplications);
router.post('/:id/save-job', controller.toggleSavedJob);
router.get('/:id/saved-jobs', controller.getSavedJobs);

export default router;
