# Scoring rubric

## Contents

- [Severity guide](#severity-guide)
- [Table roles](#table-roles)
- [Positive signals](#positive-signals)
- [C1](#c1-primary-keys-and-id-strategy) [C2](#c2-indexing) [C3](#c3-constraints-and-data-integrity) [C4](#c4-concurrency-and-locking) [C5](#c5-multi-tenancy-and-isolation)
- [C6](#c6-data-modeling-and-growth) [C7](#c7-orm-query-patterns) [C8](#c8-pooling-and-runtime-config) [C9](#c9-migration-safety) [C10](#c10-operations-and-purpose-fit)

## Severity guide

- `critical`: can cause outages, data leakage or data loss at the repo's stated scale. Examples: tenant data reachable without isolation in a multi-tenant app; no retry or ordering on deadlock-prone locking at high concurrency.
- `high`: will degrade at stated scale. Examples: random UUID PK on the main write table; unindexed FK on a hot join.
- `medium`: real but bounded cost.
- `low`: hygiene.
- `info`: observation or positive signal (no penalty).

Script-suggested criterion score = 10 minus penalties (critical 4, high 2.5, medium 1, low 0.3, info 0), floored at 0. Your score must be within 1.5 of it, with `adjustmentReason` when it differs. Use adjustment for strengths the penalties cannot express, or when many findings are one root cause.

## Table roles

- `high-volume`: expected to exceed about 1 million rows, or sits on the main write path.
- `reference`: small lookup tables.
- `transactional`: everything else.

A volume-only issue (random UUID, int4 key, BRIN candidate, partitioning, offset pagination) is `info` on `reference`, at most `low`/`medium` on `transactional`, and `high` only on `high-volume`. Set `tableRole` on the finding.

## Positive signals

`LCK002`, `LCK006`, uuidv7 keys, tenant-leading indexes, partial/BRIN indexes where appropriate, safe migration patterns (concurrent indexes, batched backfills), pool and timeout settings: list them under `strengths` with evidence. Do not rely on the mere absence of findings.

## C1 Primary keys and ID strategy

- Measures: key type vs table role and volume. Scanner: PK001-PK005.
- 10: every high-volume table uses uuidv7/bigint identity (or app-generated time-ordered ids by design); tokens use random UUIDs. 7: main tables fine, one medium issue elsewhere. 4: random UUID or int4 keys on a main write table. 1: no PKs, or int4/text keys on the main table at scale.
- Judge: which tables are actually high-volume (read routes, docs, seeds); whether ids are client-supplied for idempotency (random ids from clients are a trade-off, not a defect).

## C2 Indexing

- Measures: FK, tenant, query-path indexes; redundancy. Scanner: IDX001-IDX006.
- 10: every FK and hot filter has a matching index, tenant leads, no redundancy. 7: a few unindexed low-traffic FKs. 4: hot FKs or tenant paths unindexed. 1: little beyond PKs.
- Judge: map main read paths (WHERE/ORDER BY in services) to indexes; an FK on a table never joined or deleted from is `low`.

## C3 Constraints and data integrity

- Measures: unique/check/FK/not-null/timestamptz discipline. Scanner: CON001-CON006.
- 10: tenant-scoped uniques, explicit onDelete, timestamptz, strong CHECKs, lookups instead of volatile enums. 7: minor gaps. 4: missing uniques for business keys or FKs absent. 1: no integrity enforced in DB.
- Judge: business invariants enforced only in app code; CON006 hits on columns that are legitimately optional are false positives.

## C4 Concurrency and locking

- Measures: lock strength, order, transaction scope, retry. Scanner: LCK001-LCK006.
- 10: `FOR NO KEY UPDATE` or advisory locks, ordered, short transactions, bounded retry on 40P01/40001. 7: sound locking, no retry. 4: `FOR UPDATE` on FK parents hit by concurrent children, or unordered multi-row locks. 1: external I/O inside transactions on hot paths plus deadlock-prone ordering.
- Judge: read the transaction bodies; LCK001 is a defect only if the locked table has FK children written concurrently. Not applicable only if the repo performs no concurrent writes.

## C5 Multi-tenancy and isolation

- Measures: isolation model correctness. Scanner: TEN001-TEN003, PK005, IDX002, CON001.
- 10: RLS (forced where needed) or equivalent enforced filtering, tenant-leading indexes, `SET LOCAL` with pooling. 4: filtering only by convention in app code on a shared-schema multi-tenant app. 1: cross-tenant reads possible.
- Judge: how tenant context is derived and enforced per request; whether the scanner's tenant column is truly a tenant (e.g. `school_id` in an app where schools are the tenants). Mark `applicable: false` for single-tenant apps; authorization on a single-tenant app belongs to `security-testing`.

## C6 Data modeling and growth

- Measures: jsonb use, duplicate storage, width, retention. Scanner: MOD001-MOD004.
- 10: typed columns for queried data, retention/partition story for growth tables. 7: some jsonb with reasons. 4: raw payload duplicated beside typed columns on a high-volume table; unbounded growth. 1: jsonb as the primary model.
- Judge: whether jsonb columns are read in queries or written once; whether archival exists outside the repo (then `unverifiable`).

## C7 ORM query patterns

- Measures: N+1, unbounded reads, pagination, raw SQL. Scanner: ORM001-ORM006.
- 10: batched, bounded, keyset-paginated, parameterized. 7: occasional unbounded reads on small tables. 4: N+1 or per-row inserts on request paths. 1: pervasive loops and unbounded reads on large tables.
- Judge: every ORM001/ORM002 hit must be read; loops over 5 known items are `low`. ORM002 on a reference table is `info`.

## C8 Pooling and runtime config

- Measures: pool sizing, pooler compatibility, timeouts, client lifecycle. Scanner: POOL001-POOL005.
- 10: explicit max/timeouts sized to infra, `statement_timeout` and idle-in-transaction timeouts, one pool per process, prepared-statement setting matches the pooler. 4: pooler present but incompatible settings, or no timeouts. 1: client per request.
- Judge: the pooler/PG version (unknown goes to `unverifiable`); dev-only config files do not count.

## C9 Migration safety

- Measures: online-safety and consistency of migrations. Scanner: MIG001-MIG007.
- 10: concurrent indexes, expand/contract, batched backfills, journal consistent. 7: early-life migrations on empty tables only (MIG001 on tables created in the same file is not an issue). 4: blocking DDL on populated high-volume tables. 1: drift or no migrations.
- Judge: whether the target tables were already populated at the time; the repo's stage (pre-launch repos tolerate more).

## C10 Operations and purpose fit

- Measures: static operational evidence AND whether the design serves the stated objectives. Scanner: OPS001-OPS004 (info only).
- Purpose fit: judge whether the schema, write path and operational setup support the repo's objectives. Example: a 10k concurrent submission target needs a buffered or pooled write path, idempotency, bounded transactions and an index plan for the main read paths.
- 10 only when the evidence in the repo demonstrates the objective is designed for, not merely not contradicted. 7: designed for most objectives, gaps named. 4: objectives stated but write path unaddressed. 1: design contradicts objectives.
- Absence of infra files is never a defect: list autovacuum, replication slots, `postgresql.conf` and backups under `unverifiable` (`pg-health-assessment`), and keep confidence `low` or `medium`.
