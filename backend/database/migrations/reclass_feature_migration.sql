-- =====================================================================
-- RECLASSIFICATION FEATURE: AZURE POSTGRESQL PRODUCTION MIGRATION SCRIPT
-- =====================================================================
-- Description: Idempotent DDL statements to ensure all columns, tables,
-- and indexes required for the Reclassification Module exist in production.
-- This script is safe to execute on Azure PostgreSQL multiple times.
-- =====================================================================

-- 1. Applicants Table Extensions
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE;
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS passcode_hash VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS passcode VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(50);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS current_designation VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS region VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS division VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS plantilla_item_number VARCHAR(150);
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS registrant_type VARCHAR(50) DEFAULT 'jobseeker';

-- Unique partial indexes for account credentials
CREATE UNIQUE INDEX IF NOT EXISTS idx_applicants_email_lower 
ON applicants (LOWER(TRIM(email_address))) 
WHERE email_address IS NOT NULL AND TRIM(email_address) <> '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_applicants_plantilla_unique 
ON applicants (UPPER(TRIM(plantilla_item_number))) 
WHERE plantilla_item_number IS NOT NULL AND TRIM(plantilla_item_number) <> '';

-- 2. Document Audit Logs Extensions
ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS is_open BOOLEAN DEFAULT TRUE;
ALTER TABLE document_audit_logs ADD COLUMN IF NOT EXISTS batch_number VARCHAR(100) DEFAULT '1';

-- 3. Reclassification Master Table (reclass_gc)
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
  stage_of_reclassification VARCHAR(100) DEFAULT 'UPDATING OF DOCUMENTS',
  reclass_position VARCHAR(255),
  new_item_no VARCHAR(150),
  nosca_serial_no VARCHAR(150),
  is_test BOOLEAN DEFAULT FALSE,
  reupload BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS nosca_serial_no VARCHAR(150);
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS stage_of_reclassification VARCHAR(100) DEFAULT 'UPDATING OF DOCUMENTS';

CREATE INDEX IF NOT EXISTS idx_reclass_gc_item_no ON reclass_gc(item_no);
CREATE INDEX IF NOT EXISTS idx_reclass_gc_region ON reclass_gc(region);
CREATE INDEX IF NOT EXISTS idx_reclass_gc_division ON reclass_gc(division);
CREATE INDEX IF NOT EXISTS idx_reclass_gc_school_id ON reclass_gc(school_id);

-- 4. Reclassification Application Submissions (reclass_applications)
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

-- 5. Reclassification Attached Documents (reclass_documents)
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

CREATE INDEX IF NOT EXISTS idx_reclass_docs_app_id ON reclass_documents(reclass_application_id);
CREATE INDEX IF NOT EXISTS idx_reclass_docs_plantilla ON reclass_documents(plantilla_item_number);
CREATE INDEX IF NOT EXISTS idx_reclass_docs_title ON reclass_documents(document_title);
