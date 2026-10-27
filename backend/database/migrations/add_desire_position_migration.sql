-- =====================================================================
-- Migration: Add desired_position column to public.reclass_gc
-- Purpose: Store the selected desired position from Reclassification Application modal
-- =====================================================================

-- 1. Add desired_position column to reclass_gc
ALTER TABLE public.reclass_gc ADD COLUMN IF NOT EXISTS desired_position VARCHAR(255);

-- 2. Remove obsolete target_position and desire_position columns if they exist
ALTER TABLE public.reclass_gc DROP COLUMN IF EXISTS target_position;
ALTER TABLE public.reclass_gc DROP COLUMN IF EXISTS desire_position;

-- 3. Populate existing desired_position from existing reclass_position records
UPDATE public.reclass_gc
SET desired_position = reclass_position
WHERE desired_position IS NULL AND reclass_position IS NOT NULL;

-- 4. Index for fast queries by desired_position
CREATE INDEX IF NOT EXISTS idx_reclass_gc_desired_position ON public.reclass_gc(desired_position);
