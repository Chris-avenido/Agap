import { Router } from 'express';
import multer from 'multer';
import * as controller from './documents.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/:id/documents', upload.array('files'), controller.uploadDocuments);
router.post('/:id/replace-document', upload.single('file'), controller.replaceDocument);
router.post('/:id/photo', upload.single('photo'), controller.uploadPhoto);
router.get('/:id/document-audit-logs', controller.getDocumentAuditLogs);

export default router;
