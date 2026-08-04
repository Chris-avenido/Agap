import './config/env';
import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { pool } from './database';
import applicantsRouter from './applicants/applicants.routes';
import vacanciesRouter from './vacancies/vacancies.routes';
import addressRouter from './address/address.routes';
import { setupVacanciesCron } from './vacancies/vacancies.cron';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main App Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/register-hr', async (req, res) => {
  const data = req.body;
  try {
    const existingUserResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [data.email],
    );
    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userUid = randomUUID();
    await pool.query(
      `
      INSERT INTO users (uid, email, password_hash, first_name, last_name, passcode, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        userUid,
        data.email,
        hashedPassword,
        data.first_name,
        data.last_name,
        data.passcode,
        'Human Resources',
      ],
    );

    res.json({ success: true, data: { uid: userUid, email: data.email } });
  } catch (error: any) {
    console.error('Error registering HR admin:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

// Vacancies Module Routes
app.use('/api/vacancies', vacanciesRouter);

// Applicants Module Routes
app.use('/api/applicants', applicantsRouter);

// Address Module Routes
app.use('/api/address', addressRouter);

// Initialize Cron Jobs
setupVacanciesCron();

app.listen(port, () => {
  console.log(`🚀 Express server running on http://localhost:${port}`);
});
