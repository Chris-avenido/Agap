-- =====================================================================
-- RECLASSIFICATION APPLICATION PREFERENCE & REGISTRATION STATUS MIGRATION
-- =====================================================================
-- Stores:
-- 1. "Would you like to update your application" -> update_application BOOLEAN DEFAULT FALSE
-- 2. "Register or Not" -> is_registered BOOLEAN DEFAULT FALSE (true = Registered RA 1080, false = Not Registered)
-- =====================================================================

-- 1. reclass_gc table
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS update_application BOOLEAN DEFAULT FALSE;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reclass_gc' AND column_name = 'update_application' AND data_type != 'boolean'
  ) THEN
    ALTER TABLE reclass_gc 
      ALTER COLUMN update_application TYPE BOOLEAN 
      USING (
        CASE 
          WHEN LOWER(TRIM(update_application::text)) IN ('yes', 'true', '1') THEN TRUE 
          WHEN LOWER(TRIM(update_application::text)) IN ('no', 'false', '0') THEN FALSE 
          ELSE NULL 
        END
      );
  END IF;
END $$;

ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT FALSE;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reclass_gc' AND column_name = 'is_registered' AND data_type != 'boolean'
  ) THEN
    ALTER TABLE reclass_gc 
      ALTER COLUMN is_registered TYPE BOOLEAN 
      USING (
        CASE 
          WHEN LOWER(TRIM(is_registered::text)) IN ('registered', 'yes', 'true', '1') THEN TRUE 
          WHEN LOWER(TRIM(is_registered::text)) IN ('not_registered', 'no', 'false', '0') THEN FALSE 
          ELSE NULL 
        END
      );
  END IF;
END $$;

-- Drop obsolete column if exists
DROP INDEX IF EXISTS idx_reclass_gc_registered_or_not;
ALTER TABLE reclass_gc DROP COLUMN IF EXISTS registered_or_not;

-- 2. reclass_applications table
ALTER TABLE reclass_applications ADD COLUMN IF NOT EXISTS update_application BOOLEAN DEFAULT FALSE;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reclass_applications' AND column_name = 'update_application' AND data_type != 'boolean'
  ) THEN
    ALTER TABLE reclass_applications 
      ALTER COLUMN update_application TYPE BOOLEAN 
      USING (
        CASE 
          WHEN LOWER(TRIM(update_application::text)) IN ('yes', 'true', '1') THEN TRUE 
          WHEN LOWER(TRIM(update_application::text)) IN ('no', 'false', '0') THEN FALSE 
          ELSE NULL 
        END
      );
  END IF;
END $$;

ALTER TABLE reclass_applications ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT FALSE;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reclass_applications' AND column_name = 'is_registered' AND data_type != 'boolean'
  ) THEN
    ALTER TABLE reclass_applications 
      ALTER COLUMN is_registered TYPE BOOLEAN 
      USING (
        CASE 
          WHEN LOWER(TRIM(is_registered::text)) IN ('registered', 'yes', 'true', '1') THEN TRUE 
          WHEN LOWER(TRIM(is_registered::text)) IN ('not_registered', 'no', 'false', '0') THEN FALSE 
          ELSE NULL 
        END
      );
  END IF;
END $$;

-- Drop obsolete column if exists
DROP INDEX IF EXISTS idx_reclass_app_registered_or_not;
ALTER TABLE reclass_applications DROP COLUMN IF EXISTS registered_or_not;

-- 3. Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_reclass_gc_update_app ON reclass_gc (update_application);
CREATE INDEX IF NOT EXISTS idx_reclass_gc_is_registered ON reclass_gc (is_registered);
CREATE INDEX IF NOT EXISTS idx_reclass_app_update_app ON reclass_applications (update_application);
CREATE INDEX IF NOT EXISTS idx_reclass_app_is_registered ON reclass_applications (is_registered);
