-- params: ["512"]
-- database: AGAP_local
SELECT DISTINCT ON (document_type) * FROM public.document_audit_logs WHERE applicant_id = $1 ORDER BY document_type, id DESC;
