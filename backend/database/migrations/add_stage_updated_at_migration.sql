-- Migration: Add stage_updated_at column and automated trigger to reclass_gc
ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS stage_updated_at TIMESTAMP WITH TIME ZONE;

-- Backfill stage_updated_at with updated_at or created_at for existing rows
UPDATE reclass_gc 
SET stage_updated_at = COALESCE(updated_at, created_at, NOW())
WHERE stage_updated_at IS NULL;

-- Trigger function: Update stage_updated_at ONLY when stage_of_reclassification or current_stage changes
CREATE OR REPLACE FUNCTION public.trg_reclass_gc_stage_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    IF (OLD.stage_of_reclassification IS DISTINCT FROM NEW.stage_of_reclassification)
       OR (OLD.current_stage IS DISTINCT FROM NEW.current_stage) THEN
      NEW.stage_updated_at := NOW();
    END IF;
  ELSIF (TG_OP = 'INSERT') THEN
    IF NEW.stage_updated_at IS NULL THEN
      NEW.stage_updated_at := NOW();
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_reclass_gc_stage_timestamp ON public.reclass_gc;
CREATE TRIGGER trg_reclass_gc_stage_timestamp
BEFORE INSERT OR UPDATE ON public.reclass_gc
FOR EACH ROW
EXECUTE FUNCTION public.trg_reclass_gc_stage_updated_at();

