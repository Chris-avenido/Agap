---
name: pgbouncer-redis-plan
description: "Scan the repo first to learn its purpose, objective, traffic shape and data criticality, then produce a read-only, tailored PgBouncer + Redis plan that keeps PostgreSQL from crashing: transaction-mode pool sizing computed from the database hardware, prepared-statement and session-state compatibility with the repo's Drizzle/driver code, Redis read caching with stampede protection, a durable Redis write buffer for burst writes, eviction and persistence settings, and Postgres max_connections/work_mem alignment. Use when the user says 'pgbouncer redis plan', 'plan PgBouncer and Redis for this repo', 'protect Postgres from crashing', 'how should I set up pgbouncer and redis here', or 'tune pool size and cache for this app'. Do NOT use to diagnose a live or production PgBouncer (pgbouncer-pool-diagnose-fix), to stress test staging (pgbouncer-stress-optimize), or to tune individual ORM queries (orm-optimizer)."
---

# PgBouncer + Redis plan (v2)

Repo-side, read-only planning skill. It first learns what the repo is for (purpose, objective, traffic shape, how costly a lost or delayed write is), then writes one report, `docs/pgbouncer-redis-plan.md`, in which every recommendation is tailored to and justified by that profile. It never connects to a live or production server. Live PgBouncer problems belong to `pgbouncer-pool-diagnose-fix`, staging stress tests to `pgbouncer-stress-optimize`, single-query tuning to `orm-optimizer`. Read-only until the user approves Phase 5.

Read `rules.md` first. Run the two scripts; never write new scanning or math code.

## Phase 0 - Scan the repo for purpose and objective (mandatory, always first)

No recommendation may be made before this phase is done.

1. Run `node .claude/skills/pgbouncer-redis-plan/scripts/repo-scan.mjs --root .` once (path relative to the repo root; adjust if the skill lives in `.agents/skills/`).
2. In one parallel batch read: first ~120 lines of the README, `AGENTS.md` / `CLAUDE.md` (and backend rule files they point to: they may forbid Redis or a buffer), root and workspace `package.json`, the Drizzle schema (grep first, then 150-250 line windows), the DB client/pool file, PM2 ecosystem file, config env schema, and sibling reports named by `siblingReports` (submission-dataflow-readiness, orm-optimizer, pg-health-assessment, load-capacity-test, eSF7 scaling plan). Reuse their numbers and maps; do not redo that work. Treat an existing `docs/pgbouncer-redis-plan.md` as stale output, not evidence.
3. Build the Repo Profile with exactly these fields, each followed by an evidence tag `path:line`, `ASSUMED(reason)` or `UNKNOWN`:
   Purpose; Objective; Data criticality (delay/retry/loss/duplicate tolerance, PII?); Traffic shape (burst-write, steady-write, read-heavy dashboards, mixed; peak numbers); Tenancy (tenant column, dominant tenant?); Stack (framework, ORM, driver, Redis client, queue lib, process manager, proxy); Topology (where app, Postgres, PgBouncer, Redis run); Current state (PgBouncer/Redis absent, configured, or only referenced; config files); Hardware budget (cores/RAM of the Postgres host and of the PgBouncer/Redis host); Session-state hazards (advisory locks, LISTEN/NOTIFY, plain SET, temp tables, WITH HOLD cursors, named prepared statements); Hot paths (top write and top read endpoints with expensive aggregates).
4. Show the profile in chat (30 lines max). Ask in one message at most three questions, only about UNKNOWN fields that would change a recommendation (peak numbers, hardware, topology). If unanswered, continue with clearly labeled ASSUMED values and give ranges.

## Phase 1 - Select levers

For each lever in `reference/fit-matrix.md` decide APPLY, DEFER or SKIP from the profile, with a one-line reason and evidence. Recommending nothing for a lever the repo does not need is a correct result. Do not over-engineer (no Redis cache for a read-light app). If a repo rule forbids Redis or a buffer, a buffer is DEFER at most, needing the owner's explicit decision to change that rule.

## Phase 2 - Compute the numbers

Run `node .claude/skills/pgbouncer-redis-plan/scripts/size-pool.mjs` with the profile's numbers. Never compute pool size, `max_connections`, `work_mem` or file-descriptor need by hand. Exit code 2 lists missing inputs: ask the user or label the run ASSUMED. Use `reference/pgbouncer-and-postgres.md` and `reference/redis.md`.

## Phase 3 - Code compatibility audit (read-only)

Using scan output, then targeted slices, check: transaction-mode safety of every session-state hazard; prepared-statement handling against the PgBouncer version; driver pool `max` per process and total client connections (all pools a process opens); migrations and drizzle-kit using a direct or session-mode connection; timeouts that line up (app query timeout vs `query_wait_timeout` vs Postgres `statement_timeout`); for Redis, tenant-scoped keys without PII, invalidation on write, idempotency and durability of buffered writes, and whether cache and queue data share one Redis. Scanner hits are candidates: open each file and drop false positives with a reason.

## Phase 4 - Write the report

Write `docs/pgbouncer-redis-plan.md` using `reference/report-template.md` (overwrite, dated at top). Every action carries priority (P0 prevents a crash or data loss, P1 headroom, P2 optional), an `Evidence:` line, the exact proposed config or code change, the risk, and how to verify. Every numeric config value comes from `size-pool.mjs`, with the inputs shown beside it. A "Not applicable here" section lists every skipped or deferred lever with a reason.

## Phase 5 - Ask before applying

End with a chat question: apply the P0 items to the repo? Only after a yes change repo-side files (config templates, driver settings, cache helper, queue wiring). Never SSH to or change a live VM or production database; hand that to `pgbouncer-pool-diagnose-fix`, and load validation to `pgbouncer-stress-optimize` or `load-capacity-test`. After any code change follow the repo's verification protocol (for example Two-Tier in AGENTS.md and the `ci-gate` skill); do not re-run it if nothing changed since the last green run.

## References

- `reference/fit-matrix.md` (Phase 1), `reference/pgbouncer-and-postgres.md` and `reference/redis.md` (Phases 2-4), `reference/report-template.md` (Phase 4).
- `rules.md`: hard constraints and failure modes.
- `scripts/repo-scan.mjs` (also `--check-report <file>`), `scripts/size-pool.mjs`.

## Acceptance criteria

- The report starts with a Repo Profile where every field has an evidence tag, ASSUMED(...) or UNKNOWN.
- Every action has an `Evidence:` line and `node scripts/repo-scan.mjs --check-report docs/pgbouncer-redis-plan.md` exits 0 (cited files and lines exist, no secrets, required headings present).
- Every numeric config value comes from `size-pool.mjs` output with inputs shown.
- "Not applicable here" lists every skipped or deferred lever with a reason.
- Two repos with different profiles produce visibly different recommendations.
- `git status` shows no modified files before Phase 5 approval (the report file excepted).

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using node scripts/repo-scan.mjs --check-report docs/pgbouncer-redis-plan.md and a git status check, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.

## Efficiency

Follow the repo's own rules: grep first, then 150-250 line windows; batch independent reads in parallel; never re-read an unmodified file already in context; at most 6 command runs per task; stop after 3 failed repair attempts and report the error; no polling.
