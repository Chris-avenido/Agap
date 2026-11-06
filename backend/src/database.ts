import './config/env';
import { Pool } from 'pg';
import { instrumentPool } from './devtools/pg-pool-instrument';

let activePool: Pool;


const connectionString = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

console.log('🌐 Connecting to PostgreSQL Database...');
const pgPool = instrumentPool(
  new Pool({
    connectionString,
    ssl: connectionString?.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : undefined,
    max: parseInt(process.env.PG_POOL_MAX || '20', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 25000,
    keepAlive: true,
    // Prevent stalled queries/transactions from exhausting the pool.
    statement_timeout: 15000,
    idle_in_transaction_session_timeout: 30000,
  }),
);

pgPool.on('error', (err: Error) => {
  console.error(
    '⚠️ Idle PostgreSQL pool client error caught safely:',
    err.message || err,
  );
});

activePool = pgPool;
// Schema migrations are NOT run at boot (see database-migrations.ts / `npm run migrate:schema`).
pgPool
  .connect()
  .then((client) => {
    console.log('✅ Successfully connected to Azure PostgreSQL Database natively!');
    client.release();
  })
  .catch((error) => {
    console.error(
      '⚠️ PostgreSQL connection probe warning (pool will retry queries on demand):',
      error.message || error,
    );
  });

export const pool = pgPool;
