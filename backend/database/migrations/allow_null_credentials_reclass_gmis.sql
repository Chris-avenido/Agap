-- Migration: Ensure email, password, and passcode safely allow NULL in reclass_gc and gmis_gc_items
-- Idempotent script for Reclassification account claiming and registration

-- 1. Ensure credential columns exist and allow NULL in reclass_gc
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS password VARCHAR(255);
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS passcode VARCHAR(255);

ALTER TABLE reclass_gc ALTER COLUMN email DROP NOT NULL;
ALTER TABLE reclass_gc ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE reclass_gc ALTER COLUMN passcode DROP NOT NULL;

-- 2. Ensure credential columns exist and allow NULL in gmis_gc_items
ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS password VARCHAR(255);
ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE gmis_gc_items ADD COLUMN IF NOT EXISTS passcode VARCHAR(255);

ALTER TABLE gmis_gc_items ALTER COLUMN email DROP NOT NULL;

