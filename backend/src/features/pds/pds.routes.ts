import { Router } from 'express';
import multer from 'multer';
import * as controller from './pds.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/convert-pds-to-pdf', upload.single('file'), controller.convertPdsToPdf);
router.post('/convert-pds-v2', controller.convertPdsV2);
router.post('/convert-experience', controller.convertExperience);
router.get('/:id/print-pds', controller.printPds);

export default router;
