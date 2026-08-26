import './config/env';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({
  connectionString,
  ssl: connectionString?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
  max: parseInt(process.env.PG_POOL_MAX || '20', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  keepAlive: true,
});

// Catch idle client errors on the pool to prevent uncaughtException crashes
pool.on('error', (err: Error) => {
  console.error('⚠️ Idle PostgreSQL pool client error caught safely:', err.message || err);
});

pool
  .connect()
  .then(async (client) => {
    console.log(
      '✅ Successfully connected to Azure PostgreSQL Database natively!',
    );
    try {
      await client.query('ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;');
      await client.query('ALTER TABLE applicants ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;');
      await client.query('ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS item_no VARCHAR(100);');
      console.log('✅ Schema migration: is_test and document_audit_logs item_no columns verified.');
    } catch (migErr) {
      console.error('⚠️ Schema migration warning for columns:', migErr);
    } finally {
      client.release();
    }
  })
  .catch((error) =>
    console.error('❌ Failed to connect to the database:', error),
  );

