/**
 * Standalone schema bootstrap. Run once per deploy (pre-deploy step / release
 * command), before starting any app instance:
 *
 *   npm run migrate:schema
 *
 * A session-level advisory lock serializes concurrent runs so auto-scaled
 * deploys cannot contend on DDL locks.
 */
import '../src/config/env';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';
import { runSchemaMigrations } from '../src/database-migrations';

const MIGRATION_LOCK_KEY = 727_001;

async function main() {
  const connectionString =
    process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;
  const pool = new Pool({
    connectionString,
    ssl: connectionString?.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : undefined,
    max: 1,
    connectionTimeoutMillis: 25000,
  });
  const client = await pool.connect();
  try {
    await client.query('SELECT pg_advisory_lock($1)', [MIGRATION_LOCK_KEY]);
    // DDL may legitimately exceed the app's statement timeout.
    await client.query('SET statement_timeout = 0');
    await runSchemaMigrations(client);
    // Idempotent SQL migrations that are safe in a single implicit transaction.
    for (const file of ['index_cleanup_migration.sql']) {
      await client.query(
        readFileSync(join(__dirname, '..', 'database', 'migrations', file), 'utf8'),
      );
    }
    console.log('✅ Schema migrations complete.');
  } finally {
    await client
      .query('SELECT pg_advisory_unlock($1)', [MIGRATION_LOCK_KEY])
      .catch(() => undefined);
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('❌ Schema migration failed:', err);
  process.exit(1);
});
