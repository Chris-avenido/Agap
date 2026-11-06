# Repo Scorecard: agap_applicant (2026-11-06)

## Repo Profile

- **Purpose:** Applicant and reclassification portal for DepEd teacher hiring, document ingestion, and qualification review
- **Objectives:** Reliable concurrent applicant document uploads and application tracking across schools and divisions; Consistent qualification status evaluation and document verification audits; Data durability and low-latency vacancy matching without connection exhaustion
- **Workload:** mixed
- **Tenancy:** shared-schema
- **Scale target:** 100k+ applicants, 50k+ vacancies, 500+ concurrent applicant submissions
- **PostgreSQL version:** unknown
- **Pooler:** none
- **Profile confidence:** low
- **Assumptions:**
  - Repository uses raw SQL via pg (node-postgres) and Prisma, not Drizzle ORM
  - Tenancy is organized by region, division, and school_id within a shared PostgreSQL schema without database-level RLS
  - PostgreSQL version and server-level pooler configuration are managed in Azure and not version-controlled in the repository

## Overall score

**82.0 / 100, grade B**

Solid functional data access layer with advisory locking and streaming backups, but constrained by non-concurrent migrations, lack of pool timeout guards, and absence of database-level tenant isolation.

## Criteria

| ID | Criterion | Weight | Score | Confidence | Findings |
| --- | --- | ---: | ---: | --- | ---: |
| C1 | Primary keys and ID strategy | 9.0 | 8.5 | low | 2 |
| C2 | Indexing | 13.0 | 8.5 | low | 2 |
| C3 | Constraints and data integrity | 10.0 | 8.5 | low | 2 |
| C4 | Concurrency and locking | 10.0 | 9.0 | low | 1 |
| C5 | Multi-tenancy and isolation | 8.0 | 7.5 | low | 1 |
| C6 | Data modeling and growth | 10.0 | 8.5 | low | 2 |
| C7 | ORM query patterns | 12.0 | 8.5 | low | 2 |
| C8 | Pooling and runtime config | 10.0 | 7.0 | low | 2 |
| C9 | Migration safety | 8.0 | 7.0 | low | 3 |
| C10 | Operations and purpose fit | 10.0 | 8.5 | low | 1 |

## Top 10 recommendations

| # | Severity | Criterion | Location | Problem | Why it matters here | Fix | Effort |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | high | C8 | backend/src/database.ts:380 | pg.Pool configuration omits statement_timeout and idle_in_transaction_session_timeout. | A stalled transaction, unreleased lock, or network glitch holds client connections indefinitely, exhausting the 20-connection pool and taking down the API. | Configure statement_timeout (e.g. 15000ms) and idle_in_transaction_session_timeout (e.g. 30000ms) in pool connection options. | S |
| 2 | medium | C2 | backend/src/database.ts:314 | reclass_documents.plantilla_item_number lacks an explicit foreign-key index. | Document lookups matching reclassification documents against applicant plantilla items perform sequential scans when joined without an index. | Create index idx_reclass_docs_plantilla on reclass_documents(plantilla_item_number). | S |
| 3 | medium | C7 | backend/src/applicants/applicants.service.ts:1233 | Dynamic SQL string interpolation (SET  = ) in application update queries. | String interpolation in SQL statements bypasses query plan caching and introduces maintenance hazards if extended unsafely. | Use static conditional query branches or validated whitelist dictionaries for dynamic column assignments. | S |
| 4 | medium | C9 | backend/database/migrations/add_current_stage_migration.sql:33 | Indexes created using standard CREATE INDEX instead of CREATE INDEX CONCURRENTLY on populated tables. | Standard CREATE INDEX acquires a SHARE lock on the table, blocking all concurrent applicant writes during execution. | Execute index creations with CREATE INDEX CONCURRENTLY outside transactional migration blocks. | S |
| 5 | medium | C3 | backend/src/database.ts:60 | reclass_gc and reclass_documents lack formal FOREIGN KEY constraints referencing applicants or vacancies. | Without relational foreign keys, applicant deletions or ID reassignments create orphaned document and reclassification rows. | Add explicit foreign key constraints with ON DELETE RESTRICT or ON DELETE CASCADE. | M |
| 6 | medium | C10 | backend/src/database.ts:6 | Schema migrations (runSchemaMigrations) execute synchronously during application boot inside database.ts. | In auto-scaled cloud deployments (Azure App Service multiple instances), multiple server processes boot concurrently and execute overlapping DDL, causing lock contention and startup failures. | Decouple schema migrations from web server startup into a pre-deployment migration step or container entrypoint script. | M |
| 7 | medium | C4 | backend/src/applicants/applicants.service.ts:1196 | Row locking via SELECT ... FOR UPDATE in document uploads lacks retry handling for deadlocks (40P01) or serialization errors (40001). | Under high concurrent submission bursts near job posting deadlines, lock contention can fail user requests immediately without an automatic retry. | Implement a bounded retry wrapper with exponential backoff and jitter for critical transactional write operations. | M |
| 8 | medium | C1 | backend/database/schema.prisma:14 | activity_logs.log_id uses 32-bit autoincrementing integer (Int) on an append-only audit table. | Append-only audit logging under automated system tracking will exhaust 32-bit integer capacity (~2.14B rows) over time, risking table lockups. | Migrate high-growth audit tables to bigint generated always as identity or bigserial. | M |
| 9 | low | C2 | backend/database/migrations/update_application_columns_migration.sql:96 | Full B-tree indexes created on boolean/low-cardinality status columns (update_application, is_registered). | Full indexes on binary boolean columns have very low selectivity, causing index maintenance overhead on every row update without being utilized by the query planner. | Replace full boolean indexes with partial indexes (e.g. CREATE INDEX ... WHERE update_application = TRUE) matching actual application queries. | S |
| 10 | medium | C9 | backend/database/migrations/add_desire_position_migration.sql:11 | Immediate DROP COLUMN IF EXISTS target_position without an expand/contract deprecation period. | Dropping columns immediately breaks running application instances during rolling or blue-green deployments. | Follow the expand/contract pattern: stop reading/writing the column in code first, and drop it in a subsequent release. | M |

## Roadmap

_Now = critical/high with S or M effort. Next = remaining critical/high plus medium with S or M effort. Later = low severity and medium with L effort._

### Now

- [high] C8-1 (C8, S) pg.Pool configuration omits statement_timeout and idle_in_transaction_session_timeout. (backend/src/database.ts:380)

### Next

- [medium] C2-2 (C2, S) reclass_documents.plantilla_item_number lacks an explicit foreign-key index. (backend/src/database.ts:314)
- [medium] C7-1 (C7, S) Dynamic SQL string interpolation (SET  = ) in application update queries. (backend/src/applicants/applicants.service.ts:1233)
- [medium] C9-1 (C9, S) Indexes created using standard CREATE INDEX instead of CREATE INDEX CONCURRENTLY on populated tables. (backend/database/migrations/add_current_stage_migration.sql:33)
- [medium] C3-1 (C3, M) reclass_gc and reclass_documents lack formal FOREIGN KEY constraints referencing applicants or vacancies. (backend/src/database.ts:60)
- [medium] C10-1 (C10, M) Schema migrations (runSchemaMigrations) execute synchronously during application boot inside database.ts. (backend/src/database.ts:6)
- [medium] C4-1 (C4, M) Row locking via SELECT ... FOR UPDATE in document uploads lacks retry handling for deadlocks (40P01) or serialization errors (40001). (backend/src/applicants/applicants.service.ts:1196)
- [medium] C1-1 (C1, M) activity_logs.log_id uses 32-bit autoincrementing integer (Int) on an append-only audit table. (backend/database/schema.prisma:14)
- [medium] C9-3 (C9, M) Immediate DROP COLUMN IF EXISTS target_position without an expand/contract deprecation period. (backend/database/migrations/add_desire_position_migration.sql:11)
- [medium] C9-2 (C9, M) Single unbatched UPDATE statement across reclass_gc to backfill current_stage. (backend/database/migrations/add_current_stage_migration.sql:18)
- [high] C5-1 (C5, L) Shared-schema multi-tenancy lacks PostgreSQL Row-Level Security (RLS) policies; tenant filtering relies purely on application WHERE clauses. (backend/src/database.ts:378)

### Later

- [low] C2-1 (C2, S) Full B-tree indexes created on boolean/low-cardinality status columns (update_application, is_registered). (backend/database/migrations/update_application_columns_migration.sql:96)
- [low] C7-2 (C7, S) Unbounded SELECT queries on vacancy and applicant listings without pagination constraints. (backend/src/vacancies/vacancies.service.ts:118)
- [low] C3-2 (C3, S) Permissive nullable columns on identifying applicant fields (email, first_name, last_name, item_no) in reclass_gc. (backend/src/database.ts:61)
- [low] C8-2 (C8, S) Independent pg.Pool instances instantiated in utility scripts without coordinated connection budgeting. (database/export-backup.js:52)
- [low] C1-2 (C1, S) agap_invited primary key uses random UUIDv4 (gen_random_uuid()). (backend/src/database.ts:288)
- [medium] C6-1 (C6, L) Unstructured JSONB blobs (other_information.documents and reclass_gc.document_checklist) store relational attachment URLs and verification states. (backend/src/applicants/applicants.service.ts:1204)
- [low] C6-2 (C6, M) Activity and audit logs lack a table partitioning or automated archiving policy. (backend/database/schema.prisma:13)

## Findings by criterion

### C1 Primary keys and ID strategy

Score 8.5 (script-suggested 8.7), confidence low. Adjustment: Rounded to nearest half-point reflecting that main transactional tables use standard serial keys while audit logs use int4.

Serial int4 used across tables; activity_logs risks 32-bit integer overflow under long-term audit growth; invited users use random UUIDs.

#### C1-1 [medium] PK002 (high-volume)

- **Evidence:** backend/database/schema.prisma:14
- **Problem:** activity_logs.log_id uses 32-bit autoincrementing integer (Int) on an append-only audit table.
- **Why it matters here:** Append-only audit logging under automated system tracking will exhaust 32-bit integer capacity (~2.14B rows) over time, risking table lockups.
- **Fix:** Migrate high-growth audit tables to bigint generated always as identity or bigserial.
- **Effort:** M

#### C1-2 [low] PK001 (transactional)

- **Evidence:** backend/src/database.ts:288
- **Problem:** agap_invited primary key uses random UUIDv4 (gen_random_uuid()).
- **Why it matters here:** Random UUIDv4 primary keys scatter B-tree index insertions, causing page splits and increased WAL volume as the table grows.
- **Fix:** Use time-ordered sequential identifiers (UUIDv7 or identity bigint) for internal entities; retain random UUIDs only for secret invitation tokens.
- **Effort:** S

### C2 Indexing

Score 8.5 (script-suggested 8.7), confidence low. Adjustment: Adjusted slightly down due to presence of unindexed foreign keys in dynamic tables offset by good partial indexes on email.

Essential email and plantilla indexes exist, but low-selectivity boolean indexes cost write overhead without query performance benefit.

#### C2-1 [low] IDX006 (transactional)

- **Evidence:** backend/database/migrations/update_application_columns_migration.sql:96
- **Problem:** Full B-tree indexes created on boolean/low-cardinality status columns (update_application, is_registered).
- **Why it matters here:** Full indexes on binary boolean columns have very low selectivity, causing index maintenance overhead on every row update without being utilized by the query planner.
- **Fix:** Replace full boolean indexes with partial indexes (e.g. CREATE INDEX ... WHERE update_application = TRUE) matching actual application queries.
- **Effort:** S

#### C2-2 [medium] IDX001 (transactional)

- **Evidence:** backend/src/database.ts:314
- **Problem:** reclass_documents.plantilla_item_number lacks an explicit foreign-key index.
- **Why it matters here:** Document lookups matching reclassification documents against applicant plantilla items perform sequential scans when joined without an index.
- **Fix:** Create index idx_reclass_docs_plantilla on reclass_documents(plantilla_item_number).
- **Effort:** S

### C3 Constraints and data integrity

Score 8.5 (script-suggested 8.7), confidence low. Adjustment: Adjusted to reflect that database triggers compensate for some constraints, though formal foreign keys are missing.

Database relies on uppercase trigger logic and application-level checks; formal foreign key constraints between documents and applicants are absent.

#### C3-1 [medium] CON004 (transactional)

- **Evidence:** backend/src/database.ts:60
- **Problem:** reclass_gc and reclass_documents lack formal FOREIGN KEY constraints referencing applicants or vacancies.
- **Why it matters here:** Without relational foreign keys, applicant deletions or ID reassignments create orphaned document and reclassification rows.
- **Fix:** Add explicit foreign key constraints with ON DELETE RESTRICT or ON DELETE CASCADE.
- **Effort:** M

#### C3-2 [low] CON006 (transactional)

- **Evidence:** backend/src/database.ts:61
- **Problem:** Permissive nullable columns on identifying applicant fields (email, first_name, last_name, item_no) in reclass_gc.
- **Why it matters here:** Allows partial records with null identifiers to be persisted, forcing downstream services to implement defensive null checks.
- **Fix:** Enforce NOT NULL constraints on mandatory demographic and plantilla identity fields.
- **Effort:** S

### C4 Concurrency and locking

Score 9.0 (script-suggested 9.0), confidence low.

Advisory locks provide clean batch numbering serialization, but row-level locks lack deadlock and serialization retry wrappers.

#### C4-1 [medium] LCK005 (transactional)

- **Evidence:** backend/src/applicants/applicants.service.ts:1196
- **Problem:** Row locking via SELECT ... FOR UPDATE in document uploads lacks retry handling for deadlocks (40P01) or serialization errors (40001).
- **Why it matters here:** Under high concurrent submission bursts near job posting deadlines, lock contention can fail user requests immediately without an automatic retry.
- **Fix:** Implement a bounded retry wrapper with exponential backoff and jitter for critical transactional write operations.
- **Effort:** M

### C5 Multi-tenancy and isolation

Score 7.5 (script-suggested 7.5), confidence low.

Multi-tenancy across schools, divisions, and regions is filtered in application SQL clauses without database-enforced Row Level Security.

#### C5-1 [high] TEN001 (transactional)

- **Evidence:** backend/src/database.ts:378
- **Problem:** Shared-schema multi-tenancy lacks PostgreSQL Row-Level Security (RLS) policies; tenant filtering relies purely on application WHERE clauses.
- **Why it matters here:** A missed WHERE school_id =  or WHERE division =  in any query directly leaks cross-school applicant records and evaluations.
- **Fix:** Enable PostgreSQL Row-Level Security on tenant-sensitive tables and set tenant session variables (SET LOCAL app.current_school_id) in transaction middleware.
- **Effort:** L

### C6 Data modeling and growth

Score 8.5 (script-suggested 8.7), confidence low. Adjustment: Reflects JSONB mutation overhead on the main application path partially mitigated by separate document tables for reclassification.

Extensive JSONB columns (other_information, document_checklist) parsed in triggers and controllers; audit tables lack partitioning.

#### C6-1 [medium] MOD001 (high-volume)

- **Evidence:** backend/src/applicants/applicants.service.ts:1204
- **Problem:** Unstructured JSONB blobs (other_information.documents and reclass_gc.document_checklist) store relational attachment URLs and verification states.
- **Why it matters here:** Updating a single document URL rewrites the entire JSONB object, causing row bloat and TOAST fragmentation on high-traffic applicant records.
- **Fix:** Extract document attachments and checklist verifications into normalized child tables.
- **Effort:** L

#### C6-2 [low] MOD004 (high-volume)

- **Evidence:** backend/database/schema.prisma:13
- **Problem:** Activity and audit logs lack a table partitioning or automated archiving policy.
- **Why it matters here:** Monolithic audit tables degrade query and backup performance as system events accumulate.
- **Fix:** Implement monthly time-range partitioning on audit log tables.
- **Effort:** M

### C7 ORM query patterns

Score 8.5 (script-suggested 8.7), confidence low. Adjustment: Adjusted for raw query model with good parameterization on values, but some dynamic identifier interpolation.

Queries are generally parameterized, but dynamic SQL column interpolation exists in update paths and backup routines.

#### C7-1 [medium] ORM005 (transactional)

- **Evidence:** backend/src/applicants/applicants.service.ts:1233
- **Problem:** Dynamic SQL string interpolation (SET  = ) in application update queries.
- **Why it matters here:** String interpolation in SQL statements bypasses query plan caching and introduces maintenance hazards if extended unsafely.
- **Fix:** Use static conditional query branches or validated whitelist dictionaries for dynamic column assignments.
- **Effort:** S

#### C7-2 [low] ORM002 (transactional)

- **Evidence:** backend/src/vacancies/vacancies.service.ts:118
- **Problem:** Unbounded SELECT queries on vacancy and applicant listings without pagination constraints.
- **Why it matters here:** Unbounded queries can return thousands of rows, exhausting Node.js heap and blocking event loop serialization.
- **Fix:** Enforce keyset or limit/offset pagination with default maximum page sizes across all listing endpoints.
- **Effort:** S

### C8 Pooling and runtime config

Score 7.0 (script-suggested 7.2), confidence low. Adjustment: Adjusted down slightly because pool timeout omission directly threatens service availability during transaction stalls.

Pool is sized at 20 connections without statement or idle-in-transaction timeouts, exposing the server to connection pool starvation.

#### C8-1 [high] POOL003 (transactional)

- **Evidence:** backend/src/database.ts:380
- **Problem:** pg.Pool configuration omits statement_timeout and idle_in_transaction_session_timeout.
- **Why it matters here:** A stalled transaction, unreleased lock, or network glitch holds client connections indefinitely, exhausting the 20-connection pool and taking down the API.
- **Fix:** Configure statement_timeout (e.g. 15000ms) and idle_in_transaction_session_timeout (e.g. 30000ms) in pool connection options.
- **Effort:** S

#### C8-2 [low] POOL001 (reference)

- **Evidence:** database/export-backup.js:52
- **Problem:** Independent pg.Pool instances instantiated in utility scripts without coordinated connection budgeting.
- **Why it matters here:** Auxiliary backup or migration tasks running concurrently with web servers can exceed total database max_connections.
- **Fix:** Restrict standalone scripts to dedicated single-client connections (max: 2) with explicit disconnect guarantees.
- **Effort:** S

### C9 Migration safety

Score 7.0 (script-suggested 7.0), confidence low.

Migrations use non-concurrent index creation, unbatched full-table updates, and immediate column drops without expand/contract.

#### C9-1 [medium] MIG001 (transactional)

- **Evidence:** backend/database/migrations/add_current_stage_migration.sql:33
- **Problem:** Indexes created using standard CREATE INDEX instead of CREATE INDEX CONCURRENTLY on populated tables.
- **Why it matters here:** Standard CREATE INDEX acquires a SHARE lock on the table, blocking all concurrent applicant writes during execution.
- **Fix:** Execute index creations with CREATE INDEX CONCURRENTLY outside transactional migration blocks.
- **Effort:** S

#### C9-2 [medium] MIG005 (transactional)

- **Evidence:** backend/database/migrations/add_current_stage_migration.sql:18
- **Problem:** Single unbatched UPDATE statement across reclass_gc to backfill current_stage.
- **Why it matters here:** Full-table update statements take row-exclusive locks on every row, generating massive WAL bursts and table lockups.
- **Fix:** Backfill historical data in iterative batches (e.g. 5,000 rows per transaction) with throttling.
- **Effort:** M

#### C9-3 [medium] MIG004 (transactional)

- **Evidence:** backend/database/migrations/add_desire_position_migration.sql:11
- **Problem:** Immediate DROP COLUMN IF EXISTS target_position without an expand/contract deprecation period.
- **Why it matters here:** Dropping columns immediately breaks running application instances during rolling or blue-green deployments.
- **Fix:** Follow the expand/contract pattern: stop reading/writing the column in code first, and drop it in a subsequent release.
- **Effort:** M

### C10 Operations and purpose fit

Score 8.5 (script-suggested 9.0), confidence low. Adjustment: Reduced by 0.5 because runtime DDL on server boot poses a concurrency risk during auto-scaling.

Operational backup tooling is robust with cursor streaming, but running DDL migrations automatically during application server boot risks race conditions.

#### C10-1 [medium] JDG001 (high-volume)

- **Evidence:** backend/src/database.ts:6
- **Problem:** Schema migrations (runSchemaMigrations) execute synchronously during application boot inside database.ts.
- **Why it matters here:** In auto-scaled cloud deployments (Azure App Service multiple instances), multiple server processes boot concurrently and execute overlapping DDL, causing lock contention and startup failures.
- **Fix:** Decouple schema migrations from web server startup into a pre-deployment migration step or container entrypoint script.
- **Effort:** M

## Strengths

- **C4:** Transaction-level advisory locking (SELECT pg_advisory_xact_lock()) used in batch number generation ensures race-free sequential numbering per applicant. (backend/src/applicants/applicants.service.ts:1313)
- **C10:** Memory-safe cursor streaming export implementation in export-backup.js streams large tables in chunks of 500 rows to prevent heap exhaustion during backups. (database/export-backup.js:401)

## Unverifiable from the repo

| Item | Why | Can be checked by |
| --- | --- | --- |
| Autovacuum and table-level maintenance configuration | PostgreSQL autovacuum scale factors and vacuum cost limits are managed in Azure PostgreSQL server settings and are not defined in the repository. | pg-health-assessment |
| PgBouncer / connection pooler topology | Connection pooling infrastructure, transaction pooling modes, and server max_connections are hosted in cloud infrastructure outside repository files. | pgbouncer-redis-plan |
| Production query performance and sequential scan ratios | Live query execution times, EXPLAIN ANALYZE plans, and index hit rates require access to running database telemetry. | orm-optimizer |
| Database user role permissions and network isolation | PostgreSQL role grants, BYPASSRLS status, and network firewall policies reside in Azure PostgreSQL configuration. | security-testing |

## Method and limitations

- Scanner version: 1.0.0
- Date: 2026-11-06
- Commit: db366eb
- Rules fired: PK001, PK002, IDX001, IDX006, CON004, CON006, LCK005, TEN001, MOD001, MOD004, ORM002, ORM005, POOL001, POOL003, MIG001, MIG004, MIG005, JDG001
- Limitations:
  - Non-Drizzle repository: Drizzle table scanner found 0 Drizzle schema definitions; SQL migrations, pg queries, and Prisma schema were analyzed directly
  - Production Azure PostgreSQL server parameters and PgBouncer configuration are unverifiable from repository files
