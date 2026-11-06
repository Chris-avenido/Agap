-- activity_logs.log_id: INTEGER -> BIGINT (prevents 32-bit exhaustion).
-- Rewrites the table under ACCESS EXCLUSIVE lock: run in a maintenance window.
ALTER TABLE activity_logs ALTER COLUMN log_id TYPE BIGINT;
ALTER SEQUENCE IF EXISTS activity_logs_log_id_seq AS BIGINT;
