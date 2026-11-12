-- =====================================================================
-- Index cleanup: drop duplicate indexes, add indexes for unindexed FKs.
-- Idempotent and table-aware: every step checks that the objects exist,
-- and a duplicate is only dropped when its surviving twin exists.
-- Applied automatically by `npm run migrate:schema`; safe to re-run with `psql -f`.
-- =====================================================================

-- 1. Duplicate indexes: drop the plain/duplicate index, keep the surviving twin.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
      ('idx_reclass_docs_plantilla',        'idx_reclass_documents_item_no'),
      ('idx_reclass_gc_item_no',            'uq_reclass_gc_item_no'),
      ('idx_reclass_item_no_new_item',      'reclass_item_no_new_item_no_key'),
      ('idx_reclass_item_no_new_status',    'idx_reclass_item_no_status'),
      ('idx_teacher_appointments_item_id',  'teacher_appointments_item_id_key'),
      -- redundant: a prefix of a wider index that survives
      ('idx_agap_invited_email',            'idx_agap_invited_email_vacancy'),
      ('idx_applications_applicant_id',     'applications_applicant_id_job_cluster_id_key'),
      ('idx_conversations_status',          'idx_conversations_admin_sort')
    ) AS t(dup_index, keep_index)
  LOOP
    IF to_regclass('public.' || r.keep_index) IS NOT NULL
       AND to_regclass('public.' || r.dup_index) IS NOT NULL THEN
      EXECUTE format('DROP INDEX IF EXISTS public.%I', r.dup_index);
    END IF;
  END LOOP;
END $$;

-- 2. saved_clusters: two identical UNIQUE constraints on (applicant_id, job_cluster_id).
DO $$
BEGIN
  IF to_regclass('public.saved_clusters') IS NOT NULL
     AND EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conrelid = 'public.saved_clusters'::regclass
                   AND conname = 'saved_jobs_applicant_id_position_id_key')
     AND EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conrelid = 'public.saved_clusters'::regclass
                   AND conname = 'unique_saved_cluster') THEN
    ALTER TABLE public.saved_clusters DROP CONSTRAINT unique_saved_cluster;
  END IF;
END $$;

-- 3. Foreign keys without a supporting index.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
      ('applications',        'job_cluster_id'),
      ('car_upload_batches',  'uploader_id'),
      ('job_clusters',        'position_id'),
      ('messages',            'author_admin_id'),
      ('reclass_gc',          'gmis_id'),
      ('teacher_appointments','appointed_by'),
      ('teacher_appointments','batch_id'),
      ('teacher_appointments','car_result_id'),
      ('vacancies',           'position_id')
    ) AS t(tbl, col)
  LOOP
    IF to_regclass('public.' || r.tbl) IS NOT NULL
       AND EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_schema = 'public' AND table_name = r.tbl AND column_name = r.col)
       AND NOT EXISTS (
         SELECT 1
         FROM pg_index i
         JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = i.indkey[0]
         WHERE i.indrelid = to_regclass('public.' || r.tbl)
           AND a.attname = r.col
           AND i.indisvalid
       ) THEN
      EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON public.%I (%I)',
                     'idx_' || r.tbl || '_' || r.col, r.tbl, r.col);
    END IF;
  END LOOP;
END $$;

-- 4. Expression indexes matching the applicant login lookup exactly
--    (LOWER/UPPER(TRIM(COALESCE(col, ''))) = ...). The planner only uses an expression
--    index when the query expression is identical, so the existing
--    idx_applicants_email_lower (no COALESCE) cannot serve it.
--    Plain CREATE INDEX briefly blocks writes to applicants; it is small and runs at deploy.
DO $$
BEGIN
  IF to_regclass('public.applicants') IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'applicants' AND column_name = 'email_address') THEN
      CREATE INDEX IF NOT EXISTS idx_applicants_login_email_address
        ON public.applicants (LOWER(TRIM(COALESCE(email_address, ''))));
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'applicants' AND column_name = 'email') THEN
      CREATE INDEX IF NOT EXISTS idx_applicants_login_email
        ON public.applicants (LOWER(TRIM(COALESCE(email, ''))));
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'applicants' AND column_name = 'plantilla_item_number') THEN
      CREATE INDEX IF NOT EXISTS idx_applicants_login_plantilla
        ON public.applicants (UPPER(TRIM(COALESCE(plantilla_item_number, ''))));
    END IF;
  END IF;
END $$;
