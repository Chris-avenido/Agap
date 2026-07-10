import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({ 
  connectionString,
  ssl: connectionString?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
});

pool.connect()
  .then((client) => {
    console.log('✅ Successfully connected to Azure PostgreSQL Database natively!');
    client.release();
  })
  .catch((error) => console.error('❌ Failed to connect to the database:', error));
