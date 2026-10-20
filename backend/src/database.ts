import './config/env';
import { Pool } from 'pg';

let activePool: Pool;

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

    // Ensure indices for account credentials
    try {
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_applicants_email_lower 
        ON applicants (LOWER(TRIM(email_address))) 
        WHERE email_address IS NOT NULL AND TRIM(email_address) <> '';

        CREATE INDEX IF NOT EXISTS idx_applicants_plantilla 
        ON applicants (UPPER(TRIM(plantilla_item_number))) 
        WHERE plantilla_item_number IS NOT NULL AND TRIM(plantilla_item_number) <> '';
      `);
    } catch (idxErr: any) {
      console.warn('Index creation notice:', idxErr.message || idxErr);
    }
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
        password VARCHAR(255),
        password_hash VARCHAR(255),
        passcode VARCHAR(255),
        passcode_hash VARCHAR(255),
        mobile_number VARCHAR(50),
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
        new_application BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS email VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS password VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS passcode VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS passcode_hash VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(50);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS nosca_serial_no VARCHAR(150);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS new_application BOOLEAN DEFAULT FALSE;
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS education VARCHAR(255);
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS years_experience NUMERIC;
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS hours_of_training NUMERIC;
      ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS eligibility VARCHAR(255);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_item_no ON reclass_gc(item_no);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_email ON reclass_gc(email);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_region ON reclass_gc(region);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_division ON reclass_gc(division);
      CREATE INDEX IF NOT EXISTS idx_reclass_gc_school_id ON reclass_gc(school_id);

      CREATE OR REPLACE FUNCTION public.trg_uppercase_reclass_gc()
      RETURNS trigger
      LANGUAGE plpgsql
      AS $function$
      DECLARE
        has_approved BOOLEAN := FALSE;
        elem JSONB;
      BEGIN
        IF NEW.item_no IS NOT NULL THEN 
          NEW.item_no := NULLIF(UPPER(TRIM(NEW.item_no)), ''); 
        END IF;
        IF NEW.current_position IS NOT NULL THEN NEW.current_position := UPPER(TRIM(NEW.current_position)); END IF;
        IF NEW.first_name IS NOT NULL THEN NEW.first_name := UPPER(TRIM(NEW.first_name)); END IF;
        IF NEW.last_name IS NOT NULL THEN NEW.last_name := UPPER(TRIM(NEW.last_name)); END IF;
        IF NEW.email IS NOT NULL THEN NEW.email := LOWER(TRIM(NEW.email)); END IF;
        IF NEW.region IS NOT NULL THEN NEW.region := UPPER(TRIM(NEW.region)); END IF;
        IF NEW.division IS NOT NULL THEN NEW.division := UPPER(TRIM(NEW.division)); END IF;
        IF NEW.school_id IS NOT NULL THEN NEW.school_id := UPPER(TRIM(NEW.school_id)); END IF;
        IF NEW.school_name IS NOT NULL THEN NEW.school_name := UPPER(TRIM(NEW.school_name)); END IF;
        IF NEW.education IS NOT NULL THEN NEW.education := UPPER(TRIM(NEW.education)); END IF;
        IF NEW.eligibility IS NOT NULL THEN NEW.eligibility := UPPER(TRIM(NEW.eligibility)); END IF;
        IF NEW.qs_status IS NULL OR TRIM(NEW.qs_status) = '' THEN 
          NEW.qs_status := 'PENDING QS EVALUATION';
        ELSE
          NEW.qs_status := UPPER(TRIM(NEW.qs_status)); 
          IF NEW.qs_status IN ('NOT QUALIFIED', 'QS NOT QUALIFIED', 'DISQUALIFIED') THEN
            NEW.qs_status := 'EXCLUDED';
          ELSIF NEW.qs_status IN ('PENDING', 'PENDING QS', 'PENDING EVALUATION') THEN
            NEW.qs_status := 'PENDING QS EVALUATION';
          END IF;
        END IF;

        IF NEW.qs_eval_result IS NULL OR TRIM(NEW.qs_eval_result) = '' THEN
          NEW.qs_eval_result := 'PENDING QS EVALUATION';
        ELSE
          NEW.qs_eval_result := UPPER(TRIM(NEW.qs_eval_result));
          IF NEW.qs_eval_result IN ('NOT QUALIFIED', 'QS NOT QUALIFIED', 'DISQUALIFIED') THEN
            NEW.qs_eval_result := 'EXCLUDED';
          ELSIF NEW.qs_eval_result IN ('PENDING', 'PENDING QS', 'PENDING EVALUATION') THEN
            NEW.qs_eval_result := 'PENDING QS EVALUATION';
          END IF;
        END IF;
        IF NEW.stage_of_reclassification IS NOT NULL THEN 
          NEW.stage_of_reclassification := UPPER(TRIM(NEW.stage_of_reclassification)); 
          IF NEW.stage_of_reclassification = 'UPDATING OF DOCUMENTS' THEN
            NEW.stage_of_reclassification := 'FOR REVIEW';
          END IF;
        END IF;
        IF NEW.reclass_position IS NOT NULL THEN NEW.reclass_position := UPPER(TRIM(NEW.reclass_position)); END IF;
        IF NEW.new_item_no IS NOT NULL THEN NEW.new_item_no := UPPER(TRIM(NEW.new_item_no)); END IF;

        -- Automatically calculate document_status in ALL CAPS based on document_checklist
        IF NEW.document_checklist IS NOT NULL AND jsonb_typeof(NEW.document_checklist) = 'array' THEN
          DECLARE
            has_loi BOOLEAN := FALSE;
            has_pds BOOLEAN := FALSE;
            has_elig BOOLEAN := FALSE;
            has_tor BOOLEAN := FALSE;
            has_cav BOOLEAN := FALSE;
            req_count INT := 0;
            req_approved_count INT := 0;
            e_id TEXT;
            e_key TEXT;
            e_status TEXT;
            e_req BOOLEAN;
            is_item_approved BOOLEAN;
          BEGIN
            FOR elem IN SELECT jsonb_array_elements(NEW.document_checklist)
            LOOP
              e_id := LOWER(TRIM(COALESCE(elem->>'id', '')));
              e_key := LOWER(TRIM(COALESCE(elem->>'key', '')));
              e_status := LOWER(TRIM(COALESCE(elem->>'status', '')));
              e_req := COALESCE((elem->>'required')::boolean, FALSE);
              is_item_approved := (e_status = 'approved' OR (COALESCE((elem->>'verified')::boolean, FALSE) AND COALESCE((elem->>'submitted')::boolean, FALSE) AND e_status <> 'for_revision'));

              IF e_req THEN
                req_count := req_count + 1;
                IF is_item_approved THEN
                  req_approved_count := req_approved_count + 1;
                END IF;
              END IF;

              IF is_item_approved THEN
                has_approved := TRUE;
                IF e_id = 'loi' OR e_key = 'letter_of_intent' THEN has_loi := TRUE; END IF;
                IF e_id = 'pds' OR e_key = 'pds' THEN has_pds := TRUE; END IF;
                IF e_id = 'eligibility' OR e_key = 'eligibility' THEN has_elig := TRUE; END IF;
                IF e_id = 'tor' OR e_key = 'tor' THEN has_tor := TRUE; END IF;
                IF e_id = 'cav' OR e_key = 'sworn_declaration' THEN has_cav := TRUE; END IF;
              END IF;
            END LOOP;

            IF (req_count > 0 AND req_approved_count = req_count) OR (has_loi AND has_pds AND has_elig AND has_tor AND has_cav) THEN
              NEW.document_status := 'ALL DOCUMENT REVIEWED';
            ELSIF has_approved THEN
              NEW.document_status := 'PENDING DOCUMENT REVIEW';
            ELSE
              NEW.document_status := 'DOCUMENTS SUBMITTED';
            END IF;
          END;
        ELSE
          NEW.document_status := 'DOCUMENTS SUBMITTED';
        END IF;

        RETURN NEW;
      END;
      $function$;
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
      ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;
      ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS email VARCHAR(255);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_psi_cd ON gmis_gc_items(psi_cd);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_region ON gmis_gc_items(region);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_division ON gmis_gc_items(division);
      CREATE INDEX IF NOT EXISTS idx_gmis_gc_items_is_test ON gmis_gc_items(is_test);
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
      '⚠️ PostgreSQL connection probe warning (pool will retry queries on demand):',
      error.message || error,
    );
  });

export const pool = pgPool;
