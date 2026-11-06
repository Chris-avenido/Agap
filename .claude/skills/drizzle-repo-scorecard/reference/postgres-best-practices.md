# PostgreSQL best practices checklist (C1-C10)

Distilled from "Enterprise PostgreSQL Optimization: Architecting for High-Volume, Sustainable Workloads", with corrections (see the last section). Each item: practice, why, how it shows up in Drizzle code, what to recommend. Benchmark numbers in the source are directional only.

## Contents

- [C1 Primary keys and ID strategy](#c1-primary-keys-and-id-strategy)
- [C2 Indexing](#c2-indexing)
- [C3 Constraints and data integrity](#c3-constraints-and-data-integrity)
- [C4 Concurrency and locking](#c4-concurrency-and-locking)
- [C5 Multi-tenancy and isolation](#c5-multi-tenancy-and-isolation)
- [C6 Data modeling and growth](#c6-data-modeling-and-growth)
- [C7 ORM query patterns](#c7-orm-query-patterns)
- [C8 Pooling and runtime config](#c8-pooling-and-runtime-config)
- [C9 Migration safety](#c9-migration-safety)
- [C10 Operations and purpose fit](#c10-operations-and-purpose-fit)
- [Caveats about the source document](#caveats-about-the-source-document)

## C1 Primary keys and ID strategy

- **Prefer time-ordered keys on high-volume tables.**
  - Why: B-tree inserts of sequential keys hit the rightmost leaf page (good locality). Random UUIDv4 keys land on arbitrary pages, causing page splits, cache misses and extra WAL (full-page images) once the index outgrows memory.
  - Drizzle: `uuid().primaryKey().defaultRandom()` or `gen_random_uuid()` (PK001) on a main write table.
  - Recommend: UUIDv7 (RFC 9562) or `bigint` identity. Native `uuidv7()` exists only in PostgreSQL 18+: `uuid().primaryKey().default(sql\`uuidv7()\`)`. Earlier versions: an extension, an SQL function, or app-side generation via `$defaultFn`. UUIDv7 exposes creation time; `bigint generated always as identity` is a smaller sequential alternative the source does not weigh.
- **Keep random UUIDv4 for security tokens** (session, invite, reset tokens), where unguessability matters more than locality.
- **Avoid `int4` serial keys on tables that can pass about 2 billion rows** (PK002: logs, events, audit, history, transitions, submissions). Use `bigint` identity.
- **Avoid text/varchar primary keys** unless the value is a stable natural key (PK003); wide keys inflate every FK and index.
- **Every table has a primary key** (PK004). Tenant tables with composite keys should lead with or include the tenant column (PK005).

## C2 Indexing

- **Index every foreign key column** (IDX001). Why: the referenced-side delete/update scans the child table; joins and cascades need it. In Drizzle, FKs do not create indexes. A composite index or unique constraint whose leading column is the FK column counts.
- **Tenant column leads composite indexes on shared-schema tenant tables** (IDX002). Why: every query filters by tenant first.
- **No redundant indexes** (IDX003): an index that is a strict prefix of another costs write amplification and storage for no read benefit (unique indexes are exempt; they enforce a constraint).
- **BRIN for huge, append-only, physically ordered columns** (IDX004), e.g. `created_at` on an event table. Useless on random or frequently updated columns. `index().using('brin', t.createdAt)`.
- **Covering indexes (`INCLUDE`) only for hot queries**, never with large text/jsonb (IDX005). Index-only scans also need a healthy visibility map, i.e. working autovacuum.
- **Partial indexes for skewed boolean/status columns** (IDX006): `.where(sql\`status = 'pending'\`)`.

## C3 Constraints and data integrity

- **Composite unique constraints include the tenant column** on tenant tables (CON001), unless global uniqueness is intended (tokens, hashes).
- **`timestamptz` over `timestamp`** (CON002): `timestamp('x', { withTimezone: true })`.
- **Native enums only for truly stable sets** (CON003): values can be added but not removed without recreating the type. Use lookup tables or CHECK constraints for volatile domains.
- **Explicit `onDelete`** on every FK (CON004), chosen deliberately (`restrict` for lookups, `cascade` for owned children).
- **Money as `numeric`, not `real`/`double precision`** (CON005).
- **`notNull` on identifiers, status and timestamps** (CON006) unless NULL has meaning.

## C4 Concurrency and locking

- **FK child inserts take `FOR KEY SHARE` on the parent row.** A parent `FOR UPDATE` conflicts with that; `FOR NO KEY UPDATE` does not. Use `.for('no key update')` (LCK002) when the key columns are not changing. `FOR UPDATE` (LCK001) is only a defect when child tables write concurrently against the locked parent.
- **Canonical lock ordering** (LCK003): lock rows `ORDER BY id` so concurrent transactions cannot deadlock by acquiring in different orders.
- **Advisory locks** (`pg_advisory_xact_lock`, LCK006) for application-level serialization (per-tenant jobs, idempotent processors).
- **Short transactions, no external I/O inside** (LCK004): HTTP calls, email, queues while holding locks pin connections and lock rows.
- **Bounded retries on `40P01` (deadlock) and `40001` (serialization failure)** (LCK005), with jitter.

## C5 Multi-tenancy and isolation

- **Choose the model deliberately.** Database-per-tenant: strongest isolation, highest ops cost. Schema-per-tenant (TEN003): catalog bloat and slow migrations beyond a few thousand tenants. Shared schema with a tenant column and RLS: scales best, isolation relies on correct policies.
- **RLS traps.** Missing tenant-leading indexes; unique constraints that bypass RLS visibility; table owners and `BYPASSRLS` roles skip RLS unless `FORCE ROW LEVEL SECURITY` (not in the source); leaky functions.
- **With transaction-mode pooling, set the tenant per transaction**: `SET LOCAL app.tenant_id = ...` or `select set_config('app.tenant_id', $1, true)` inside the transaction (TEN002). Session-level `SET` leaks to the next client on the pooled connection.
- Drizzle: `pgTable(...).enableRLS()` and `pgPolicy(...)` (TEN001 checks presence). RLS is not "mathematically" leak-proof.

## C6 Data modeling and growth

- **Avoid wide jsonb blobs and duplicated raw payloads** (MOD001, MOD002): they inflate rows and TOAST and force whole-value rewrites. Promote queried fields to typed columns or child tables; drop or archive the duplicate raw copy.
- **Keep tables narrow** (MOD003, over 40 columns): split rarely-used column groups.
- **Partitioning and retention for high-growth tables** (MOD004): drop a partition instead of mass `DELETE`. Cap partition counts (monthly rather than daily for multi-year data) because planning cost grows with partition count. Keep partition-key predicates in queries so pruning works.

## C7 ORM query patterns

- **No N+1** (ORM001): batch with `inArray` or joins; no `await` of a query inside loops or `.map`.
- **Batch inserts** (ORM004): `db.insert(t).values([...])`.
- **Keyset pagination over `offset`** on large tables (ORM003).
- **Always bound reads** (ORM002) and select only needed columns.
- **Parameterize** (ORM005): avoid `sql.raw` and string-built SQL.
- **Avoid unbounded `count(*)`** on large tables in request paths (ORM006); use estimates, cached counters or bounded counts.

## C8 Pooling and runtime config

- **Size the pool against `max_connections`** and the number of app processes (POOL001, POOL005). One pool per process (POOL004: never construct clients per request).
- **PgBouncer transaction pooling.** PgBouncer 1.21+ supports protocol-level prepared statements via `max_prepared_statements`. With older versions set postgres-js `prepare: false` (POOL002). node-postgres named queries have the same constraint.
- **Set `statement_timeout` and `idle_in_transaction_session_timeout`** (POOL003) in the connection options, role or database settings.
- **`work_mem` is per operation, not per connection**: `work_mem` x concurrent sort/hash operations x connections can exhaust memory.

## C9 Migration safety

- **`CREATE INDEX CONCURRENTLY`** on existing tables (MIG001). It cannot run inside a transaction block; Drizzle migrations need a custom, non-transactional step.
- **Add nullable column, backfill in batches, then add the constraint** (MIG003, MIG005): `ADD CONSTRAINT ... NOT VALID` then `VALIDATE CONSTRAINT`; `SET NOT NULL` after a validated CHECK avoids a long scan on newer versions.
- **Avoid long `ACCESS EXCLUSIVE` locks**: set `lock_timeout`, keep DDL short.
- **Destructive changes** (MIG004): drop columns only after code stops using them (expand/contract).
- **Enum changes** (MIG002): `ADD VALUE` is fine; removal or rename needs type recreation.
- **Bloat:** `REINDEX CONCURRENTLY` for indexes, `pg_repack` for table rewrites.
- **Drizzle journal and SQL files must agree** (MIG006) and a migration folder must exist (MIG007).

## C10 Operations and purpose fit

Mostly NOT verifiable from application repos. Record as `unverifiable`, never as failure.

- **Per-table autovacuum tuning** on high-churn or large tables (OPS001): defaults trigger at 20% changed rows, far too late for 100M-row tables.
- **`max_slot_wal_keep_size`** caps WAL retained by stalled replication slots (OPS003).
- **SSD/NVMe planner settings** as starting points to validate on real hardware: `random_page_cost` about 1.1, higher `effective_io_concurrency`, `shared_buffers` 25-40% of RAM, `effective_cache_size` 50-75% of RAM.
- **`pg_stat_statements`** for observability (OPS002); backups and restore drills (OPS004).
- **Purpose fit:** does the schema, write path and operational setup actually support the stated objectives (see `rubric.md`)?

## Caveats about the source document

- It is a synthesized research report citing blogs and forum benchmarks. Treat its numbers as directional, not as thresholds.
- The claim that partition planning overhead grows "exponentially" is overstated. Treat it as growing with partition count and keep counts modest.
- `hash_mem_multiplier` defaults to 2.0 on PostgreSQL 15+; the source's table is inconsistent.
- `REPACK CONCURRENTLY` is a PostgreSQL 19 feature. For earlier versions use `pg_repack` or `REINDEX CONCURRENTLY`.
- RLS is not "mathematically" leak-proof: owners and `BYPASSRLS` roles, leaky functions and pooling misuse all break isolation.
- Recommended memory and IO values are starting points to validate, not targets.
