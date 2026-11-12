-- =====================================================================
-- REVERT SCRIPT: Revert Accidental Registration for Nelia Nieto
-- Target Table: public.reclass_gc
-- Filter: strictly where item_no = 'OSEC-DECSB-GCOOR1-150001-2022'
-- Baseline Unregistered Defaults Identified from Schema & Data:
--   password_hash             -> NULL
--   passcode                  -> NULL
--   mobile_number             -> NULL
--   document_status           -> 'DOCUMENTS SUBMITTED'
--   stage_of_reclassification -> 'FOR REVIEW'
--   document_checklist       -> '[]'::jsonb
--   qs_evaluation             -> '{}'::jsonb
--   qs_status                 -> 'PENDING QS EVALUATION'
--   qs_eval_result            -> 'PENDING QS EVALUATION'
--   is_registered             -> false
--   updated_at                -> NOW()
-- =====================================================================

BEGIN;

UPDATE public.reclass_gc
SET
  password_hash             = NULL,
  passcode                  = NULL,
  mobile_number             = NULL,
  document_status           = 'DOCUMENTS SUBMITTED',
  stage_of_reclassification = 'FOR REVIEW',
  document_checklist       = '[]'::jsonb,
  qs_evaluation             = '{}'::jsonb,
  qs_status                 = 'PENDING QS EVALUATION',
  qs_eval_result            = 'PENDING QS EVALUATION',
  is_registered             = false,
  updated_at                = NOW()
WHERE item_no = 'OSEC-DECSB-GCOOR1-150001-2022';

-- Verification step: inspect the reverted row
SELECT
  id,
  item_no,
  email,
  password_hash,
  passcode,
  mobile_number,
  document_status,
  stage_of_reclassification,
  document_checklist,
  qs_evaluation,
  qs_status,
  qs_eval_result,
  is_registered,
  updated_at
FROM public.reclass_gc
WHERE item_no = 'OSEC-DECSB-GCOOR1-150001-2022';

COMMIT;

