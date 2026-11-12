-- params: [512,"512"]
-- database: AGAP_local
SELECT * FROM applications WHERE applicant_id = $1 OR applicant_id::text = $2;
