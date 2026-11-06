# PgBouncer and PostgreSQL reference

Contents: [Evidence grade](#evidence-grade) | [Why](#why) | [Pooling modes](#pooling-modes) | [Transaction-mode hazards](#transaction-mode-hazards) | [Prepared statements](#prepared-statements) | [Sizing](#sizing) | [Parameters](#parameters) | [Additions not in the source](#additions-not-in-the-source-document) | [so_reuseport](#so_reuseport) | [Postgres alignment](#postgres-alignment) | [Monitoring](#monitoring)

## Evidence grade

The source is a deep-research document built largely from vendor and blog posts. Treat every number as a rule of thumb and validate with `load-capacity-test` or `pgbouncer-stress-optimize`.

## Why

Postgres forks one process per connection, so hundreds of idle connections waste memory and cause CPU context switching. PgBouncer multiplexes many client connections onto a small server pool, at roughly 2 KB per client.

## Pooling modes

- **session**: server connection released on client disconnect; minimal benefit.
- **transaction**: released at COMMIT/ROLLBACK; required for high-concurrency web apps.
- **statement**: autocommit-only workloads; breaks multi-statement transactions.

## Transaction-mode hazards

Check each against the driver and Drizzle code (scan `sessionStateHazards`):

- Session advisory locks (`pg_advisory_lock`). `pg_advisory_xact_lock` is safe.
- `LISTEN` / `NOTIFY`.
- Plain `SET` (use `SET LOCAL` or `set_config(..., true)` inside a transaction).
- Temp tables.
- `WITH HOLD` cursors.

Move such work to a session-mode port or to external state such as Redis. Migrations and drizzle-kit should connect directly or through the session-mode port.

## Prepared statements

Before PgBouncer 1.21 the only fix was disabling prepared statements at the driver (postgres.js `prepare: false`, asyncpg `statement_cache_size=0`, JDBC `prepareThreshold=0`; node-postgres: avoid `name:` in query config). With 1.21+ and `max_prepared_statements` greater than 0 (document recommends 200), PgBouncer re-prepares statements on whichever backend runs them. The document claims 15-30% faster execution from skipping planning; treat as unverified and measure. Check the installed version first and check the default for that version.

## Sizing

- Hardware ceiling A = pg_cores x 2 + spindles (NVMe counts as 1); cores are the Postgres host's, not the app VM's. Usable ceiling = A rounded up by at most 25%.
- Required concurrency B = ceil(tps x latency_s x safety) (Little's law).
- Examples: 8-core NVMe gives A = 17 (pool 17-20); 2,000 TPS x 8 ms x 1.5 = 24 (this exceeds the ceiling, so the database is the limit; `size-pool.mjs` reports `dbBound`).
- Oversizing the pool only moves the queue from PgBouncer into Postgres and hurts p99 latency.
- Pools are per database/user pair per PgBouncer process: multiply when planning. Always run `scripts/size-pool.mjs`.

## Parameters

Document values; the script fills in computed numbers.

| Directive | Value | Why |
|---|---|---|
| pool_mode | transaction | many app threads share a small pool |
| max_client_conn | 5000-10000 (computed by script) | cheap at ~2 KB per client; needs file-descriptor headroom |
| default_pool_size | computed | long-lived backend connections per pool |
| reserve_pool_size | 25% of default_pool_size | absorbs bursts without a permanently large pool |
| reserve_pool_timeout | 3-5 seconds | wait before dipping into the reserve |
| max_prepared_statements | 200 (1.21+) | protocol-level prepared statement tracking |
| server_reset_query | DISCARD ALL | session mode only; bypassed in transaction mode |
| server_idle_timeout | 600 | close idle backends (also the default; set explicitly) |
| server_lifetime | 3600 | recycle backends hourly (also the default; set explicitly) |

## Additions not in the source document

Label these as such in the report and verify against the official PgBouncer docs for the installed version:

- `query_wait_timeout`: fail fast instead of queuing for the default two minutes; align with the app query timeout.
- `max_db_connections` / `max_user_connections` caps; `server_connect_timeout`.
- `ignore_startup_parameters = extra_float_digits` for drivers that send it.
- `auth_type = scram-sha-256` with `auth_query` or `userlist`.
- Quieter `log_connections` / `log_disconnections` under high churn.
- Postgres side: `statement_timeout`, `lock_timeout`, `idle_in_transaction_session_timeout`, so one stuck transaction cannot pin a pool slot.

## so_reuseport

PgBouncer is single-threaded (`so_reuseport` since 1.12). When one core saturates, run several processes on the same TCP port with `so_reuseport = 1`, using a systemd template `pgbouncer@.service` with `pgbouncer-1.ini`, `pgbouncer-2.ini`, each with its own `unix_socket_dir` and pid file. This avoids an extra HAProxy hop and allows rolling restarts. Query-cancel requests can land on a different process; check `peer_id` / `[peers]` (added in 1.19) in the official docs before relying on cancellation. Each process has its own pool, so the Postgres `max_connections` math must include every process.

## Postgres alignment

- `max_connections` = sum of all pools (including reserve and every PgBouncer process) + `superuser_reserved_connections` + 10-20 for admin and replication (document example: 3 instances x 50 gives about 170). Changing it needs a restart.
- `work_mem` ceiling = RAM x 0.25 / `max_connections`. Each sort or hash node and each parallel worker can use its own `work_mem`, so treat the ceiling as an upper bound and keep a margin for complex queries (addition to the source).
- `shared_buffers` = 25% of RAM. `maintenance_work_mem` about 5% of RAM up to 2 GB. `max_worker_processes` = cores. `max_parallel_workers_per_gather` about half the cores. Use the RAM actually available to Postgres on shared hosts.

## Monitoring

`SHOW POOLS`: `cl_waiting` above zero for long means the pool is undersized or transactions are slow; high `sv_idle` with `cl_waiting` at zero means over-provisioned; also `maxwait`. `SHOW STATS`, `SHOW LISTS`. A `cl_waiting` spike that coincides with a Redis miss surge points to a cache failure, not a pool problem.
