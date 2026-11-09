-- =====================================================================
-- MIGRATION: Synchronize Initial Reclassification and GMIS Assessment Disparities
-- Objective: Resolve disparities between ref.initial_reclass.reclass_position
--            and public.gmis_gc_items.initial_assessment using psi_cd.
-- =====================================================================

BEGIN;

-- 1. Update ref.initial_reclass:
-- Overwrite reclass_position values that are exactly '#N/A', NULL, or empty string
-- with valid, populated initial_assessment values from public.gmis_gc_items where psi_cd matches.
UPDATE ref.initial_reclass r
SET reclass_position = TRIM(g.initial_assessment)
FROM public.gmis_gc_items g
WHERE r.psi_cd = g.psi_cd
  AND (r.reclass_position IS NULL OR TRIM(r.reclass_position) IN ('', '#N/A'))
  AND g.initial_assessment IS NOT NULL
  AND TRIM(g.initial_assessment) NOT IN ('', '#N/A');

-- 2. Reciprocal update targeting public.gmis_gc_items:
-- Overwrite initial_assessment values that are exactly '#N/A', NULL, or empty string
-- with valid, populated reclass_position values from ref.initial_reclass where psi_cd matches.
UPDATE public.gmis_gc_items g
SET initial_assessment = TRIM(r.reclass_position)
FROM ref.initial_reclass r
WHERE g.psi_cd = r.psi_cd
  AND (g.initial_assessment IS NULL OR TRIM(g.initial_assessment) IN ('', '#N/A'))
  AND r.reclass_position IS NOT NULL
  AND TRIM(r.reclass_position) NOT IN ('', '#N/A');

-- 3. Validation Step:
-- Confirm that the target disparity categories have been reduced to 0.
SELECT 
  COUNT(*) FILTER (
    WHERE (r.reclass_position IS NULL OR TRIM(r.reclass_position) IN ('', '#N/A'))
      AND (g.initial_assessment IS NOT NULL AND TRIM(g.initial_assessment) NOT IN ('', '#N/A'))
  ) AS ref_has_na_gmis_populated,
  COUNT(*) FILTER (
    WHERE (g.initial_assessment IS NULL OR TRIM(g.initial_assessment) IN ('', '#N/A'))
      AND (r.reclass_position IS NOT NULL AND TRIM(r.reclass_position) NOT IN ('', '#N/A'))
  ) AS gmis_has_na_ref_populated
FROM ref.initial_reclass r
JOIN public.gmis_gc_items g ON r.psi_cd = g.psi_cd;

COMMIT;

