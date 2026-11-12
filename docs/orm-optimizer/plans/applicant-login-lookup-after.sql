-- params: ["nobody@example.com"]
-- database: AGAP_local
SELECT * FROM applicants WHERE LOWER(TRIM(COALESCE(email_address, ''))) = LOWER(TRIM($1)) OR LOWER(TRIM(COALESCE(email, ''))) = LOWER(TRIM($1)) OR UPPER(TRIM(COALESCE(plantilla_item_number, ''))) = UPPER(TRIM($1)) ORDER BY updated_at DESC NULLS LAST, id DESC;
