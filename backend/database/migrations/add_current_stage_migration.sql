-- =====================================================================
-- RECLASSIFICATION CURRENT_STAGE UNIFIED TRACKING MIGRATION (4-STEP FLOW)
-- =====================================================================
-- Consolidates multi-column stage tracking into a single categorical
-- column named current_stage on reclass_gc.
-- Allowed categorical values:
--   'SDO_EVALUATION' : Step 1 of 4 - Schools Division Office HRMO Review & QS Evaluation
--   'RO_ENDORSEMENT' : Step 2 of 4 - Endorsed to DepEd Regional Office (RO)
--   'DBM_NOSCA'      : Step 3 of 4 - Endorsed to Department of Budget and Management (DBM)
--   'COMPLETED'      : Step 4 of 4 - Reclassified & Officially Appointed / NOSCA Issued
-- =====================================================================

-- 1. Add current_stage column if it doesn't exist
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS current_stage VARCHAR(50) DEFAULT 'SDO_EVALUATION';

-- 2. Safely backfill current_stage based on existing records
UPDATE reclass_gc
SET current_stage = CASE
  WHEN (new_item_no IS NOT NULL AND TRIM(new_item_no) <> '' AND UPPER(TRIM(new_item_no)) <> 'NULL') 
       OR UPPER(TRIM(COALESCE(stage_of_reclassification, ''))) IN ('APPOINTMENT', 'RECLASS PROPER', 'APPROVED', 'COMPLETED')
       OR (nosca_serial_no IS NOT NULL AND TRIM(nosca_serial_no) <> '') THEN 'COMPLETED'
  WHEN UPPER(TRIM(COALESCE(stage_of_reclassification, ''))) LIKE '%DBM%' THEN 'DBM_NOSCA'
  WHEN UPPER(TRIM(COALESCE(stage_of_reclassification, ''))) LIKE '%RO%' 
       OR UPPER(TRIM(COALESCE(stage_of_reclassification, ''))) LIKE '%REGIONAL%' THEN 'RO_ENDORSEMENT'
  ELSE 'SDO_EVALUATION'
END
WHERE current_stage IS NULL OR current_stage = 'UPDATING_DOCUMENTS';

-- 3. Create index for query performance without blocking concurrent writes.
-- CREATE INDEX CONCURRENTLY cannot run inside a transaction block: run this file with
-- `psql -f` (statements autocommit) and do NOT wrap it in BEGIN/COMMIT or send it as a
-- single multi-statement query() call. A failed concurrent build leaves an INVALID index;
-- drop it and re-run.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reclass_gc_current_stage ON reclass_gc(current_stage);

