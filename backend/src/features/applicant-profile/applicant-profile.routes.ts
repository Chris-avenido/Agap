import { Router } from 'express';
import multer from 'multer';
import * as controller from './applicant-profile.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/parse-resume', upload.single('resume'), controller.parseResume);
router.get('/:id', controller.getApplicant);
router.post('/', controller.createApplicant);
router.post('/:id/passcode', controller.setPasscode);
router.post('/:id/change-password', controller.changePassword);
router.put('/:id', controller.updateApplicant);

export default router;
