import './config/env';
import { Pool } from 'pg';
import { SqlitePool } from './database.sqlite';

let activePool: any;

async function runSchemaMigrations(client: any) {
  try {
    await client.query(
      'ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS passcode_hash VARCHAR(255);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS passcode VARCHAR(255);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(50);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS current_designation VARCHAR(255);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS region VARCHAR(255);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS division VARCHAR(255);',
    );
    await client.query(
      'ALTER TABLE applicants ADD COLUMN IF NOT EXISTS email VARCHAR(255);',
    );

    // Ensure unique constraints for account credentials
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_applicants_email_lower 
      ON applicants (LOWER(TRIM(email_address))) 
      WHERE email_address IS NOT NULL AND TRIM(email_address) <> '';

      CREATE UNIQUE INDEX IF NOT EXISTS idx_applicants_plantilla_unique 
      ON applicants (UPPER(TRIM(plantilla_item_number))) 
      WHERE plantilla_item_number IS NOT NULL AND TRIM(plantilla_item_number) <> '';
    `);
    await client.query(
      'ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS is_open BOOLEAN DEFAULT TRUE;',
    );
    await client.query(
      "ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS batch_number VARCHAR(100) DEFAULT '1';",
    );

    // Ensure reclass_gc table exists matching production columns
    await client.query(`
      CREATE TABLE IF NOT EXISTS reclass_gc (
        id SERIAL PRIMARY KEY,
        item_no VARCHAR(150),
        current_position VARCHAR(255),
        first_name VARCHAR(150),
        last_name VARCHAR(150),
        email VARCHAR(255),
        region VARCHAR(255),
        division VARCHAR(255),
        school_id VARCHAR(50),
        school_name VARCHAR(255),
        qs_status VARCHAR(100),
        stage_of_reclassification VARCHAR(100) DEFAULT 'For Review',
        reclass_position VARCHAR(255),
        new_item_no VARCHAR(150),
        nosca_serial_no VARCHAR(150),
        is_test BOOLEAN DEFAULT FALSE,
        reupload BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS nosca_serial_no VARCHAR(150);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_item_no ON reclass_gc(item_no);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_region ON reclass_gc(region);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_division ON reclass_gc(division);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_school_id ON reclass_gc(school_id);
    `);

    // Ensure gmis_gc_items table exists matching GMIS production schema
    await client.query(`
      CREATE TABLE IF NOT EXISTS gmis_gc_items (
        id SERIAL PRIMARY KEY,
        uacs_fpap_dsc VARCHAR(255),
        org_cd REAL,
        org_dsc VARCHAR(255),
        uacs_oper_dsc VARCHAR(255),
        division VARCHAR(255),
        region VARCHAR(255),
        step_inc INTEGER,
        pop_dsc VARCHAR(255),
        pos_dsc VARCHAR(255),
        sal_grd INTEGER,
        psi_cd VARCHAR(150),
        last_name VARCHAR(150),
        first_name VARCHAR(150),
        mid_name VARCHAR(150),
        f_pos VARCHAR(150),
        pos_cat VARCHAR(150),
        yr_crtd INTEGER,
        item_no VARCHAR(150),
        current_position VARCHAR(255),
        school_id VARCHAR(50),
        school_name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_psi_cd ON gmis_gc_items(psi_cd);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_region ON gmis_gc_items(region);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_division ON gmis_gc_items(division);
    `);

    // Ensure agap_invited table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS agap_invited (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT,
        job_cluster_id UUID,
        is_submitted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_agap_invited_email ON agap_invited(email);
      CREATE INDEX IF NOT EXISTS idx_agap_invited_job_cluster_id ON agap_invited(job_cluster_id);
    `);

    // Ensure reclass_applications table exists matching production columns
    await client.query(`
      CREATE TABLE IF NOT EXISTS reclass_applications (
        id SERIAL PRIMARY KEY,
        reclass_gc_id INTEGER,
        item_no VARCHAR(255),
        current_position VARCHAR(255),
        region VARCHAR(255),
        division VARCHAR(255),
        school_id VARCHAR(255),
        school_name VARCHAR(255),
        reclass_position VARCHAR(255),
        new_item_no VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_reclass_applications_gc_id ON reclass_applications(reclass_gc_id);
      CREATE INDEX IF NOT EXISTS idx_reclass_applications_item_no ON reclass_applications(item_no);
      CREATE INDEX IF NOT EXISTS idx_reclass_applications_division ON reclass_applications(division);
      CREATE INDEX IF NOT EXISTS idx_reclass_applications_school_id ON reclass_applications(school_id);
    `);

    // Ensure reclass_documents table exists and has clean columns
    await client.query(`
      CREATE TABLE IF NOT EXISTS reclass_documents (
        id SERIAL PRIMARY KEY,
        reclass_application_id INTEGER REFERENCES reclass_applications(id) ON DELETE SET NULL,
        plantilla_item_number VARCHAR(150),
        document_title VARCHAR(255),
        file_name VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        remarks TEXT,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_test BOOLEAN DEFAULT FALSE
      );

      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS reclass_application_id INTEGER REFERENCES reclass_applications(id) ON DELETE SET NULL;
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS plantilla_item_number VARCHAR(150);
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS document_title VARCHAR(255);
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS file_name VARCHAR(255);
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS file_url TEXT;
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS remarks TEXT;
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
      ALTER TABLE reclass_documents ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;

      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS applicant_id;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS file_size;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS status;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS document_type;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS mimetype;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS description;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS pal_record_id;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS reviewed_by;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS reviewed_at;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS doc_type;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS doc_title;
      ALTER TABLE reclass_documents DROP COLUMN IF EXISTS created_at;

      DROP INDEX IF EXISTS idx_reclass_docs_applicant;
      DROP INDEX IF EXISTS idx_reclass_docs_type;

      CREATE INDEX IF NOT EXISTS idx_reclass_docs_app_id ON reclass_documents(reclass_application_id);
      CREATE INDEX IF NOT EXISTS idx_reclass_docs_plantilla ON reclass_documents(plantilla_item_number);
      CREATE INDEX IF NOT EXISTS idx_reclass_docs_title ON reclass_documents(document_title);

      DROP TABLE IF EXISTS reclass_document_history CASCADE;
    `);

    console.log('✅ Schema check: columns and tables verified.');
  } catch (migErr) {
    console.error('⚠️ Schema migration warning for columns:', migErr);
  }
}

const connectionString = process.env.DATABASE_URL;
const useLocalDb =
  process.env.USE_LOCAL_DB === 'true' ||
  !connectionString ||
  connectionString.trim() === '' ||
  connectionString.includes('your_database_url_here');

if (useLocalDb) {
  console.log(
    '📦 USE_LOCAL_DB=true or no DATABASE_URL specified. Initializing Local SQLite Database (agap_production_backup.db)...',
  );
  activePool = new SqlitePool();
  runSchemaMigrations(activePool).catch((err) =>
    console.error('⚠️ SQLite schema migration error:', err),
  );
} else {
  console.log('🌐 Connecting to PostgreSQL Database...');
  const pgPool = new Pool({
    connectionString,
    ssl: connectionString?.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : undefined,
    max: parseInt(process.env.PG_POOL_MAX || '20', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    keepAlive: true,
  });

  pgPool.on('error', (err: Error) => {
    console.error(
      '⚠️ Idle PostgreSQL pool client error caught safely:',
      err.message || err,
    );
  });

  activePool = pgPool;

  pgPool
    .connect()
    .then(async (client) => {
      console.log('✅ Successfully connected to Azure PostgreSQL Database natively!');
      try {
        await runSchemaMigrations(client);
      } finally {
        client.release();
      }
    })
    .catch((error) => {
      console.error(
        '❌ Failed to connect to Azure PostgreSQL database:',
        error.message || error,
      );
      console.log(
        '🔄 Falling back to local SQLite database (agap_production_backup.db)...',
      );
      activePool = new SqlitePool();
      runSchemaMigrations(activePool).catch((migErr) =>
        console.error('⚠️ SQLite schema migration error:', migErr),
      );
    });
}

export const pool = new Proxy({} as any, {
  get(_target, prop: string | symbol) {
    if (activePool && typeof activePool[prop] === 'function') {
      return activePool[prop].bind(activePool);
    }
    return activePool ? activePool[prop] : undefined;
  },
});
