import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: connectionString?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

// Connect eagerly and log (similar to onModuleInit)
prisma.$connect()
  .then(() => console.log('✅ Successfully connected to Azure PostgreSQL Database!'))
  .catch((error) => console.error('❌ Failed to connect to the database:', error));
