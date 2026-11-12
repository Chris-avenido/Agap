-- params: ["512"]
-- database: AGAP_local
SELECT * FROM document_audit_logs WHERE applicant_id = $1 ORDER BY created_at DESC, id DESC;
