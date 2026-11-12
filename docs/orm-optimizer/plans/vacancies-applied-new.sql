-- params: [512]
-- database: AGAP_local
SELECT job_cluster_id, status, application_status FROM applications WHERE applicant_id = $1;
