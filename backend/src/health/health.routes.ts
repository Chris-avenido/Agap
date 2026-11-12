import { Router } from 'express';

const router = Router();

// Health Check Probe Endpoint for Azure App Service
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/', (_req, res) => {
  res.send('Hello World!');
});

export default router;
