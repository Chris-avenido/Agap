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
  connectionTimeoutMillis: 30000,
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
      await client.query('ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS is_open BOOLEAN DEFAULT TRUE;');
      await client.query('ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS batch_number VARCHAR(100) DEFAULT \'1\';');

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
          is_test BOOLEAN DEFAULT FALSE,
          reupload BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_reclass_gc_item_no ON reclass_gc(item_no);
        CREATE INDEX IF NOT EXISTS idx_reclass_gc_region ON reclass_gc(region);
        CREATE INDEX IF NOT EXISTS idx_reclass_gc_division ON reclass_gc(division);
        CREATE INDEX IF NOT EXISTS idx_reclass_gc_school_id ON reclass_gc(school_id);
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
    } finally {
      client.release();
    }
  })
  .catch((error) =>
    console.error('❌ Failed to connect to the database:', error),
  );

