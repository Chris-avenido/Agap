# Rules for pgbouncer-redis-plan

## Hard rules

1. Phase 0 comes first. No recommendation exists before the Repo Profile exists.
2. Every recommendation cites repo evidence or a labeled assumption; a generic recommendation with no tie to the repo is a defect.
3. Never print secret values. Environment variable names only. Never put a connection string with credentials in the report.
4. Never connect to, SSH into, restart or change a live or production system. Repo-side and read-only until Phase 5 approval.
5. Never calculate sizing by hand; use `scripts/size-pool.mjs`.
6. Never use an `allkeys-*` eviction policy on an instance that holds queue, stream or buffered-write data; use `noeviction`.
7. A buffered write must be idempotent, durable and kept until the database commit succeeds.
8. Do not claim XFetch guarantees a single recompute; pair it with a single-flight lock.
9. Check the installed PgBouncer and Redis versions before relying on version-gated settings (`max_prepared_statements`, `so_reuseport`, `io-threads-do-reads`, `[peers]`).
10. Pool math must multiply across PgBouncer processes and database/user pairs and include the reserve pool.
11. Respect the repo's existing library choices (stay with BullMQ if already there) and the repo's own rules (a rule that forbids Redis or a buffer makes that lever DEFER, pending the owner's decision).
12. Cache keys must include the tenant or school identifier and must not contain personal data.
13. Follow the repo's token-efficiency rules.
14. Keep the skill portable: no model- or harness-specific assumptions.
15. Change nothing in the repo except `docs/pgbouncer-redis-plan.md` before Phase 5 approval. Scripts do not modify the repo.

## Known failure modes to prevent

- A generic report that ignores the repo.
- Recommending Redis for a read-light app.
- An eviction policy that wipes the queue.
- An oversized pool (pool follows database parallelism, not client count).
- Ignoring session-state hazards.
- Forgetting to multiply pools across PgBouncer processes and database/user pairs.
- Treating document numbers as facts instead of rules of thumb.
- Changing code before approval.
- Trusting scanner output without opening the file; trusting a stale earlier report as evidence.
