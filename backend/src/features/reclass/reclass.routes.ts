import { Router } from 'express';
import multer from 'multer';
import * as controller from './reclass.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/incumbent-locations', controller.incumbentLocations);
router.get('/incumbent-info', controller.incumbentInfo);
router.post('/reclass-verify-item', controller.verifyItem);
router.get('/reclass-positions-qs', controller.positionsQs);
router.post('/:id/verify-plantilla', controller.verifyPlantilla);
router.get('/:id/reclass-details', controller.details);
router.put('/:id/reclass-target-position', controller.targetPosition);
router.put('/:id/reclass-update-preference', controller.updatePreference);
router.put('/:id/reclass-apply', controller.apply);
router.put('/:id/reclass-set-new-application', controller.setNewApplication);
router.get('/:id/reclass-documents', controller.getDocuments);
router.post('/:id/reclass-documents', upload.single('file'), controller.uploadDocument);

export default router;
