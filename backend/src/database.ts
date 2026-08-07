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
  .then((client) => {
    console.log(
      '✅ Successfully connected to Azure PostgreSQL Database natively!',
    );
    client.release();
  })
  .catch((error) =>
    console.error('❌ Failed to connect to the database:', error),
  );

