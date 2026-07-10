import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { prisma } from './database';
import applicantsRouter from './applicants/applicants.routes';

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
    const existingUser = await prisma.users.findFirst({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.create({
      data: {
        uid: randomUUID(),
        email: data.email,
        password_hash: hashedPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        passcode: data.passcode,
        role: 'Human Resources'
      }
    });
    res.json({ success: true, data: { uid: user.uid, email: user.email } });
  } catch (error: any) {
    console.error('Error registering HR admin:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

// Applicants Module Routes
app.use('/api/applicants', applicantsRouter);

app.listen(port, () => {
  console.log(`🚀 Express server running on http://localhost:${port}`);
});
