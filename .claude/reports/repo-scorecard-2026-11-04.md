# Repo Scorecard: agap_portal (2026-11-04)

## Repo Profile

- **Purpose:** AGAP HR portal (applicant tracking, vacancies, appointments, reclassification of personnel) for a regional HRMO; Express API + React web on PostgreSQL via node-postgres.
- **Objectives:** Correct, auditable appointment and reclassification records; Prevent double-allocation of plantilla items and applicants; Stay responsive during application and reclassification deadlines
- **Workload:** internal-low-scale
- **Tenancy:** none
- **Scale target:** Hundreds of staff users and thousands of applicants; deadline-day bursts not quantified in the repo
- **PostgreSQL version:** unknown
- **Pooler:** unknown
- **Profile confidence:** medium
- **Assumptions:**
  - Single organization (the scanner's school_id 'tenant' column is a lookup, not a tenant boundary)
  - Scale target not stated in the repo; inferred from the module set and playbook
  - PostgreSQL version and PgBouncer/Redis presence are not evidenced in the repo

## Overall score

**78.9 / 100, grade C**

Transaction handling for appointments is careful, but missing uniqueness on applicant and reference codes, an unprotected connection pool and a drifting schema/migration story put the no-double-allocation objective at risk.

## Criteria

| ID | Criterion | Weight | Score | Confidence | Findings |
| --- | --- | ---: | ---: | --- | ---: |
| C1 | Primary keys and ID strategy | 6.4 | 9.0 | high | 1 |
| C2 | Indexing | 10.6 | 9.0 | medium | 1 |
| C3 | Constraints and data integrity | 14.9 | 7.5 | high | 3 |
| C4 | Concurrency and locking | 8.5 | 8.5 | medium | 1 |
| C5 | Multi-tenancy and isolation | n/a | n/a | high | 0 |
| C6 | Data modeling and growth | 8.5 | 8.5 | medium | 3 |
| C7 | ORM query patterns | 12.8 | 8.5 | low | 0 |
| C8 | Pooling and runtime config | 8.5 | 6.5 | high | 3 |
| C9 | Migration safety | 14.9 | 7.0 | medium | 3 |
| C10 | Operations and purpose fit | 14.9 | 7.5 | low | 2 |

Not applicable:
- C5 Multi-tenancy and isolation: Single-organization app; school_id is a lookup. Division/region scoping is authorization and belongs to security-testing.

## Top 10 recommendations

| # | Severity | Criterion | Location | Problem | Why it matters here | Fix | Effort |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | medium | C3 | apps/api/src/db/schema.js:389 | teacher_appointments.applicant_code has only a plain index; the already-appointed rule is a SELECT inside a transaction that locks a different row (the item). | Two concurrent appointments of the same applicant to different items both pass the check and both insert, breaking the one-applicant-one-item objective. | Add a UNIQUE constraint on applicant_code (after de-duplicating existing rows) and map the 23505 error to the existing 400 response. | S |
| 2 | medium | C3 | apps/api/src/db/schema.js:487 | appointment_reference_code is plain text with no unique constraint and is generated as APPT-date-plus-4-random-digits. | Only 9,000 values per day: duplicates become likely after a few dozen appointments in one day and nothing rejects them, so one reference code can identify two appointments. | Generate the code from a sequence or the row id, and add a UNIQUE index on the column. | S |
| 3 | medium | C8 | apps/api/src/config/db.js:19 | Pool is created with no max, idleTimeoutMillis, connectionTimeoutMillis, statement_timeout or idle_in_transaction_session_timeout. | On deadline-day bursts a saturated pool queues requests forever, and a stuck transaction holds its row locks indefinitely. | Set max from the database limit, connectionTimeoutMillis, idleTimeoutMillis and statement/idle-in-transaction timeouts. | S |
| 4 | medium | C8 | apps/api/src/config/db.js:30 | The pool only listens for connect; there is no pool error handler. | A dropped idle connection (database restart or network blip) emits an unhandled error event and can crash the API process. | Add a pool error listener that logs, and let PM2 restart only on real fatal errors. | S |
| 5 | medium | C9 | apps/api/src/db/schema.js:178 | schema.js still declares reclass_applications although it was dropped by migration_drop_reclass_applications.js, and a stale, syntactically invalid schema.ts duplicates the schema. | Two sources of truth that disagree with the live database make introspection and review unreliable in a no-double-allocation domain. | Regenerate schema.js from the database with drizzle-kit, delete schema.ts, and compare in CI. | M |
| 6 | medium | C10 | apps/api/src/config/drizzle.js:5 | config/drizzle.js exports a Drizzle client that nothing imports; all queries are raw SQL through pool.query/client.query (about 718 call sites). | schema.js is documentation only, so column or constraint changes are not checked against code, which is how the drift in C9 goes unnoticed. | Either route new queries through Drizzle or add a CI check that schema.js matches the live schema. | M |
| 7 | low | C9 | apps/api/package.json:25 | The API pins drizzle-orm ^0.30 and drizzle-kit ^0.20 while the root pins ^0.45 and ^0.31. | Introspection output and generated SQL differ by version, which feeds the schema drift above. | Align both workspaces to one version before regenerating the schema. | S |
| 8 | medium | C9 | apps/api/package.json:11 | Migrations are hand-written JS/SQL scripts run by name; the drizzle journal has a single entry, so order and applied state are not tracked. | The repo rule requires drizzle-kit-generated, rehearsed migrations with a rollback plan; scripts without a journal can be run twice or skipped. | Adopt drizzle-kit generate/migrate from the current baseline and record rollbacks in docs/db-changes.md. | L |
| 9 | low | C2 | apps/api/src/db/schema.js:27 | FK columns author_admin_id, actor_admin_id, batch_id, car_result_id and appointed_by have no supporting index. | Deleting an admin or batch scans these tables; at the current scale this is slow but not harmful. | Add indexes (created CONCURRENTLY) only if these tables grow or those deletes are used. | S |
| 10 | low | C6 | apps/api/src/db/schema.js:83 | A dated backup table (applicants_backup_20260810) lives in the schema file. | Duplicates personal data and suggests ad-hoc copies instead of a backup process. | Drop it after confirming the backup, and keep backups outside the app schema. | S |

## Roadmap

_Now = critical/high with S or M effort. Next = remaining critical/high plus medium with S or M effort. Later = low severity and medium with L effort._

### Now

- none

### Next

- [medium] C3-1 (C3, S) teacher_appointments.applicant_code has only a plain index; the already-appointed rule is a SELECT inside a transaction that locks a different row (the item). (apps/api/src/db/schema.js:389)
- [medium] C3-2 (C3, S) appointment_reference_code is plain text with no unique constraint and is generated as APPT-date-plus-4-random-digits. (apps/api/src/db/schema.js:487)
- [medium] C8-1 (C8, S) Pool is created with no max, idleTimeoutMillis, connectionTimeoutMillis, statement_timeout or idle_in_transaction_session_timeout. (apps/api/src/config/db.js:19)
- [medium] C8-2 (C8, S) The pool only listens for connect; there is no pool error handler. (apps/api/src/config/db.js:30)
- [medium] C9-1 (C9, M) schema.js still declares reclass_applications although it was dropped by migration_drop_reclass_applications.js, and a stale, syntactically invalid schema.ts duplicates the schema. (apps/api/src/db/schema.js:178)
- [medium] C10-1 (C10, M) config/drizzle.js exports a Drizzle client that nothing imports; all queries are raw SQL through pool.query/client.query (about 718 call sites). (apps/api/src/config/drizzle.js:5)

### Later

- [low] C9-3 (C9, S) The API pins drizzle-orm ^0.30 and drizzle-kit ^0.20 while the root pins ^0.45 and ^0.31. (apps/api/package.json:25)
- [medium] C9-2 (C9, L) Migrations are hand-written JS/SQL scripts run by name; the drizzle journal has a single entry, so order and applied state are not tracked. (apps/api/package.json:11)
- [low] C2-1 (C2, S) FK columns author_admin_id, actor_admin_id, batch_id, car_result_id and appointed_by have no supporting index. (apps/api/src/db/schema.js:27)
- [low] C6-2 (C6, S) A dated backup table (applicants_backup_20260810) lives in the schema file. (apps/api/src/db/schema.js:83)
- [low] C6-3 (C6, S) audit_logs has no created_at index and no retention or partition plan. (apps/api/src/db/schema.js:52)
- [low] C8-3 (C8, S) TLS is used with rejectUnauthorized set to false. (apps/api/src/config/db.js:26)
- [low] C4-1 (C4, S) SELECT FOR UPDATE on parent rows (vacancies, reclass_gc) blocks child inserts; there is no retry on 40P01/40001, and one catch block awaits ROLLBACK without a guard. (apps/api/src/modules/vacancies/vacancies.controller.js:1270)
- [low] C3-3 (C3, M) About 19 of 59 timestamp columns are timestamp without time zone; db.js reinterprets them as +08:00 with a custom type parser. (apps/api/src/db/schema.js:238)
- [low] C10-2 (C10, M) The only data-layer test is a script-style file that Vitest cannot run; appointments and locking have no automated test. (vitest.config.js:7)
- [low] C1-1 (C1, S) documents_audit_logs, applicants_backup_20260810, agap_schools and all_address are declared without a primary key. (apps/api/src/db/schema.js:152)
- [low] C6-1 (C6, M) applicants has 67 columns including several jsonb blobs (family, children and similar). (apps/api/src/db/schema.js:394)

## Findings by criterion

### C1 Primary keys and ID strategy

Score 9.0 (script-suggested 9.7), confidence high. Adjustment: Only low-volume hygiene issues; random UUID and text keys sit on small tables.

Keys are fine for the volume; a few support tables have no primary key.

#### C1-1 [low] PK004 (transactional)

- **Evidence:** apps/api/src/db/schema.js:152, apps/api/src/db/schema.js:83, apps/api/src/db/schema.js:14, apps/api/src/db/schema.js:64
- **Problem:** documents_audit_logs, applicants_backup_20260810, agap_schools and all_address are declared without a primary key.
- **Why it matters here:** Without a key the audit-log rows cannot be referenced, deduplicated or safely updated; the two lookup tables are harmless.
- **Fix:** Add a surrogate key to documents_audit_logs; leave lookups as is or key them on school_id; drop the dated backup table from the schema.
- **Effort:** S

### C2 Indexing

Score 9.0 (script-suggested 9.7), confidence medium. Adjustment: IDX002 hits on school_id are false positives (not a tenant).

Main join paths are indexed; a few audit/appointment FKs are not.

#### C2-1 [low] IDX001 (transactional)

- **Evidence:** apps/api/src/db/schema.js:27, apps/api/src/db/schema.js:56, apps/api/src/db/schema.js:378, apps/api/src/db/schema.js:379, apps/api/src/db/schema.js:383
- **Problem:** FK columns author_admin_id, actor_admin_id, batch_id, car_result_id and appointed_by have no supporting index.
- **Why it matters here:** Deleting an admin or batch scans these tables; at the current scale this is slow but not harmful.
- **Fix:** Add indexes (created CONCURRENTLY) only if these tables grow or those deletes are used.
- **Effort:** S

### C3 Constraints and data integrity

Score 7.5 (script-suggested 7.7), confidence high. Adjustment: Two medium integrity gaps plus timestamp hygiene; one is partly mitigated by the transaction lock on the item.

Core business keys are not enforced by the database.

#### C3-1 [medium] JDG001 (transactional)

- **Evidence:** apps/api/src/db/schema.js:389, apps/api/src/modules/applications/apps.controller.js:2315
- **Problem:** teacher_appointments.applicant_code has only a plain index; the already-appointed rule is a SELECT inside a transaction that locks a different row (the item).
- **Why it matters here:** Two concurrent appointments of the same applicant to different items both pass the check and both insert, breaking the one-applicant-one-item objective.
- **Fix:** Add a UNIQUE constraint on applicant_code (after de-duplicating existing rows) and map the 23505 error to the existing 400 response.
- **Effort:** S

#### C3-2 [medium] JDG002 (transactional)

- **Evidence:** apps/api/src/db/schema.js:487, apps/api/src/modules/vacancies/vacancies.controller.js:1321, apps/api/src/modules/applications/apps.controller.js:329
- **Problem:** appointment_reference_code is plain text with no unique constraint and is generated as APPT-date-plus-4-random-digits.
- **Why it matters here:** Only 9,000 values per day: duplicates become likely after a few dozen appointments in one day and nothing rejects them, so one reference code can identify two appointments.
- **Fix:** Generate the code from a sequence or the row id, and add a UNIQUE index on the column.
- **Effort:** S

#### C3-3 [low] CON002 (transactional)

- **Evidence:** apps/api/src/db/schema.js:238, apps/api/src/db/schema.js:239, apps/api/src/db/schema.js:240, apps/api/src/config/db.js:15
- **Problem:** About 19 of 59 timestamp columns are timestamp without time zone; db.js reinterprets them as +08:00 with a custom type parser.
- **Why it matters here:** Correct as long as every writer and reader runs in Asia/Manila; any export or tool in UTC will shift appointment dates.
- **Fix:** Convert to timestamptz in a planned migration; keep the parser until done.
- **Effort:** M

### C4 Concurrency and locking

Score 8.5 (script-suggested 9.7), confidence medium. Adjustment: Locking is mostly sound; the applicant-level race is scored under C3.

Appointment flows use BEGIN, row locks and release in finally; no deadlock retry.

#### C4-1 [low] LCK001 (transactional)

- **Evidence:** apps/api/src/modules/vacancies/vacancies.controller.js:1270, apps/api/src/modules/reclassification/reclass.controller.js:3545, apps/api/src/modules/reclassification/reclass.controller.js:3578
- **Problem:** SELECT FOR UPDATE on parent rows (vacancies, reclass_gc) blocks child inserts; there is no retry on 40P01/40001, and one catch block awaits ROLLBACK without a guard.
- **Why it matters here:** Brief stalls at most at this volume, but a failed ROLLBACK in acceptApplicant leaves the request unanswered.
- **Fix:** Use FOR NO KEY UPDATE where the key is not changed, wrap ROLLBACK in a catch as appointTeacherItem already does, and add bounded retry for deadlocks.
- **Effort:** S

### C5 Multi-tenancy and isolation

Not applicable: Single-organization app; school_id is a lookup. Division/region scoping is authorization and belongs to security-testing.

### C6 Data modeling and growth

Score 8.5 (script-suggested 9.1), confidence medium. Adjustment: Three low findings; growth is unbounded only for audit/message tables.

Mostly typed columns; a very wide applicants row and no retention story for logs.

#### C6-1 [low] MOD003 (transactional)

- **Evidence:** apps/api/src/db/schema.js:394
- **Problem:** applicants has 67 columns including several jsonb blobs (family, children and similar).
- **Why it matters here:** Every applicant read pulls wide rows; queries on family data cannot use indexes.
- **Fix:** Select explicit columns on list endpoints; split rarely-read jsonb into child tables if queried.
- **Effort:** M

#### C6-2 [low] JDG003 (transactional)

- **Evidence:** apps/api/src/db/schema.js:83
- **Problem:** A dated backup table (applicants_backup_20260810) lives in the schema file.
- **Why it matters here:** Duplicates personal data and suggests ad-hoc copies instead of a backup process.
- **Fix:** Drop it after confirming the backup, and keep backups outside the app schema.
- **Effort:** S

#### C6-3 [low] JDG004 (high-volume)

- **Evidence:** apps/api/src/db/schema.js:52
- **Problem:** audit_logs has no created_at index and no retention or partition plan.
- **Why it matters here:** Audit tables only grow; time-range reviews will slow down over years.
- **Fix:** Add a created_at index (BRIN or btree) and decide a retention/archive rule.
- **Effort:** S

### C7 ORM query patterns

Score 8.5 (script-suggested 10.0), confidence low. Adjustment: No findings, but only scanner-level evidence supports it.

Scanner found no N+1 or unbounded-read hits; about 718 raw query calls were not individually reviewed.

No findings.

### C8 Pooling and runtime config

Score 6.5 (script-suggested 7.7), confidence high. Adjustment: Two medium runtime-safety gaps with one root cause (pool left at defaults).

A single shared pool, but no limits, timeouts or error handler.

#### C8-1 [medium] JDG005 (transactional)

- **Evidence:** apps/api/src/config/db.js:19
- **Problem:** Pool is created with no max, idleTimeoutMillis, connectionTimeoutMillis, statement_timeout or idle_in_transaction_session_timeout.
- **Why it matters here:** On deadline-day bursts a saturated pool queues requests forever, and a stuck transaction holds its row locks indefinitely.
- **Fix:** Set max from the database limit, connectionTimeoutMillis, idleTimeoutMillis and statement/idle-in-transaction timeouts.
- **Effort:** S

#### C8-2 [medium] JDG006 (transactional)

- **Evidence:** apps/api/src/config/db.js:30
- **Problem:** The pool only listens for connect; there is no pool error handler.
- **Why it matters here:** A dropped idle connection (database restart or network blip) emits an unhandled error event and can crash the API process.
- **Fix:** Add a pool error listener that logs, and let PM2 restart only on real fatal errors.
- **Effort:** S

#### C8-3 [low] JDG007 (transactional)

- **Evidence:** apps/api/src/config/db.js:26
- **Problem:** TLS is used with rejectUnauthorized set to false.
- **Why it matters here:** The connection is encrypted but the server certificate is not verified.
- **Fix:** Provide the CA certificate and verify it (hand to security-testing).
- **Effort:** S

### C9 Migration safety

Score 7.0 (script-suggested 7.7), confidence medium. Adjustment: Drift and missing journal share one root cause; the new docs/db-changes.md process is not yet enforced.

No generated-migration pipeline; schema file already drifts from the database.

#### C9-1 [medium] JDG008 (transactional)

- **Evidence:** apps/api/src/db/schema.js:178, apps/api/src/db/schema.ts:80
- **Problem:** schema.js still declares reclass_applications although it was dropped by migration_drop_reclass_applications.js, and a stale, syntactically invalid schema.ts duplicates the schema.
- **Why it matters here:** Two sources of truth that disagree with the live database make introspection and review unreliable in a no-double-allocation domain.
- **Fix:** Regenerate schema.js from the database with drizzle-kit, delete schema.ts, and compare in CI.
- **Effort:** M

#### C9-2 [medium] JDG009 (transactional)

- **Evidence:** apps/api/package.json:11, apps/api/src/db/meta/_journal.json:1
- **Problem:** Migrations are hand-written JS/SQL scripts run by name; the drizzle journal has a single entry, so order and applied state are not tracked.
- **Why it matters here:** The repo rule requires drizzle-kit-generated, rehearsed migrations with a rollback plan; scripts without a journal can be run twice or skipped.
- **Fix:** Adopt drizzle-kit generate/migrate from the current baseline and record rollbacks in docs/db-changes.md.
- **Effort:** L

#### C9-3 [low] JDG010 (transactional)

- **Evidence:** apps/api/package.json:25, apps/api/package.json:39, package.json:26
- **Problem:** The API pins drizzle-orm ^0.30 and drizzle-kit ^0.20 while the root pins ^0.45 and ^0.31.
- **Why it matters here:** Introspection output and generated SQL differ by version, which feeds the schema drift above.
- **Fix:** Align both workspaces to one version before regenerating the schema.
- **Effort:** S

### C10 Operations and purpose fit

Score 7.5 (script-suggested 8.7), confidence low. Adjustment: Objective fit cannot be fully judged without scale targets or infra files.

Core flows are transactional, but Drizzle is declared yet unused at runtime and the data layer has little test coverage.

#### C10-1 [medium] JDG011 (transactional)

- **Evidence:** apps/api/src/config/drizzle.js:5, apps/api/src/config/db.js:19
- **Problem:** config/drizzle.js exports a Drizzle client that nothing imports; all queries are raw SQL through pool.query/client.query (about 718 call sites).
- **Why it matters here:** schema.js is documentation only, so column or constraint changes are not checked against code, which is how the drift in C9 goes unnoticed.
- **Fix:** Either route new queries through Drizzle or add a CI check that schema.js matches the live schema.
- **Effort:** M

#### C10-2 [low] JDG012 (transactional)

- **Evidence:** vitest.config.js:7
- **Problem:** The only data-layer test is a script-style file that Vitest cannot run; appointments and locking have no automated test.
- **Why it matters here:** The double-allocation guarantees are exactly what regressions would break.
- **Fix:** Convert it to a Vitest suite and add a concurrent-appointment integration test.
- **Effort:** M

## Strengths

- **C4:** Appointment flows lock the item row, check, insert, update and COMMIT in one transaction with ROLLBACK and client.release in finally. (apps/api/src/modules/applications/apps.controller.js:2293)
- **C4:** Slow work (bcrypt passcode check) happens before BEGIN, keeping the transaction short. (apps/api/src/modules/vacancies/vacancies.controller.js:1257)
- **C3:** A unique constraint prevents two appointments for the same plantilla item. (apps/api/src/db/schema.js:390)
- **C7:** Spot-checked queries use parameter placeholders, not string concatenation. (apps/api/src/modules/applications/apps.controller.js:2296)
- **C2:** Composite index matches the message-thread read path. (apps/api/src/db/schema.js:33)

## Unverifiable from the repo

| Item | Why | Can be checked by |
| --- | --- | --- |
| PostgreSQL version, autovacuum, WAL and backup settings | Server configuration is not in the repo | pg-health-assessment |
| Whether live indexes and constraints match schema.js (drift) | Needs a database connection | pg-health-assessment |
| Query plans and N+1 behavior across about 718 raw SQL calls | Needs EXPLAIN on a database and a read of the controllers | orm-optimizer |
| PgBouncer/Redis presence and pool sizing for deadline-day bursts | No pooler or Redis config in the repo | pgbouncer-redis-plan |
| Division/region access scoping and TLS certificate verification | Authorization and transport security are not data-layer scoring | security-testing |

## Method and limitations

- Scanner version: 1.0.0
- Date: 2026-11-04
- Commit: 4d0b9f2
- Rules fired: PK001, PK002, PK003, PK004, IDX001, IDX002, CON002, CON003, CON006, MOD001, MOD003, MOD004, LCK001, LCK003, LCK005, POOL001, POOL003, POOL004, MIG001, MIG003, MIG005, ORM005, TEN001, TEN003
- Limitations:
  - Regex scan; hits are doubled by the duplicate schema.ts
  - CON006, IDX002 and TEN001 hits were not individually reviewed (known false positives)
  - Only five lock sites and the pool config were read in full; other controllers were not audited
