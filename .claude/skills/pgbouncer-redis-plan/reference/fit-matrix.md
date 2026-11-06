# Fit matrix: decide APPLY / DEFER / SKIP per lever

Decide each row from the Repo Profile. Skipping is a valid result. Cite evidence either way.

| Lever | Apply when (repo signals) | Defer or skip when | Evidence to cite |
|---|---|---|---|
| PgBouncer in transaction mode | Many client connections (app processes x driver pool max), Postgres on a separate server, pool-timeout errors, or burst traffic | One small process with a handful of connections and no growth target | Driver pool `max`, PM2 instances, topology, error logs |
| Pool sizing math (`size-pool.mjs`) | Whenever PgBouncer applies | PgBouncer skipped | Script inputs and output |
| Prepared-statement handling | Driver or ORM uses named or cached prepared statements (Drizzle `.prepare()`, postgres.js default `prepare: true`, node-postgres queries with `name`). Rule: PgBouncer 1.21+ with `max_prepared_statements`, otherwise disable at the driver | No named/prepared statements found (state that) | Scan `driverWiring`, driver file |
| Separate session-mode path | Session advisory locks, LISTEN/NOTIFY, temp tables or migrations found; route through a direct or session-mode port | None of those found and migrations already use a direct URL | Scan `sessionStateHazards`, drizzle config |
| Multiple PgBouncer processes (`so_reuseport`) | A PgBouncer process measured near one saturated core, or about 2,000-5,000+ active clients, or zero-downtime restarts required | Otherwise skip | Measured CPU or client counts |
| Redis read cache | Repeated expensive reads (aggregations, dashboards, shared lookup data) | Write-dominated paths, reads unique per user, read-light app | Hot read endpoints, query cost |
| Stampede protection (XFetch + single-flight lock) | Hot keys with expensive recompute and high concurrency | TTL with jitter is enough when recompute is cheap | Hot key, recompute cost |
| Redis write buffer / queue | Burst writes and the user accepts a "please wait" or asynchronous acknowledgement. For burst submissions of personal data: durable queue + idempotency + status endpoint | Writes must be confirmed synchronously (skip, or require explicit user approval); a repo rule forbids it (defer) | Traffic shape, data criticality, repo rules |
| Redis eviction, persistence, instance split | Whenever Redis holds both cache and queue data, or any queue data at all | No Redis in use | Redis config, clients |
| In-process LRU tier | Tiny hot reference data only | Otherwise skip | Reference table size |
| Postgres alignment (`max_connections`, `work_mem`, timeouts) | Whenever PgBouncer applies | PgBouncer skipped | `size-pool.mjs` output, config |
| Whale-tenant routing, partitioning, CQRS read/write split | Flag only; apply or defer when one tenant dominates or tables reach tens of millions of rows. Never implement inside this skill | Even tenants, small tables | Tenant column counts, row counts |
