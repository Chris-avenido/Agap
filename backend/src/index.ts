import './devtools/dev-bootstrap';
import './config/env';
import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { pool } from './database';
import applicantsRouter from './applicants/applicants.routes';
import { applicantAuthRouter, hrAuthRouter } from './features/auth/auth.routes';
import reclassRouter from './features/reclass/reclass.routes';
import vacanciesRouter from './vacancies/vacancies.routes';
import addressRouter from './address/address.routes';
import { setupVacanciesCron } from './vacancies/vacancies.cron';
import { devRequestMiddleware } from './devtools/dev-diagnostics';
import { devErrorMiddleware, registerDevFaultRoutes } from './devtools/express-dev-error-middleware';

process.on('uncaughtException', (error) => {
  console.error('🔥 Uncaught Exception caught safely:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled Promise Rejection caught safely:', reason);
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(devRequestMiddleware());

// Health Check Probe Endpoint for Azure App Service
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main App Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth Feature Routes (HR registration)
app.use('/api', hrAuthRouter);

// Vacancies Module Routes
app.use('/api/vacancies', vacanciesRouter);

// Applicants Module Routes (auth + reclass routers first: they own specific paths
// that applicants' '/:id' routes would otherwise shadow)
app.use('/api/applicants', applicantAuthRouter);
app.use('/api/applicants', reclassRouter);
app.use('/api/applicants', applicantsRouter);

// Address Module Routes
app.use('/api/address', addressRouter);

// Initialize Cron Jobs
setupVacanciesCron();

// Dev Diagnostics Fault Routes & Error Middleware
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  registerDevFaultRoutes(app, { pool });
}
app.use(devErrorMiddleware);

// Global Express Error Middleware
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('Unhandled Express Error:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  },
);

app.listen(port, () => {
  console.log(`🚀 Express server running on http://localhost:${port}`);
});

