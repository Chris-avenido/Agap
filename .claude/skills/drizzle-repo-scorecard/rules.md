# Rules for drizzle-repo-scorecard

## Hard rules

- **Read-only.** Never edit, create or delete any repo file except the single report under `.claude/reports/`. Never run migrations, `drizzle-kit push/generate`, `npm install`, or any command that writes to the repo or a database. Never connect to a database. Never stage or commit the report.
- **Secrets.** Never open or print `.env`, `.env.local` or other secret files; use `.env.example` only. Redact anything that looks like a credential if it appears in a finding.
- **No network.**
- **Scripts run once per evaluation.** Do not regenerate scanning or scoring code. If a script is wrong, report it in the final message and propose the fix in the smallest durable place (the script, a reference file or SKILL.md). Do not patch the output by hand.
- **Evidence or no finding.** Do not score from memory: every finding needs `file:line` evidence from this repo.
- **Benchmarks are directional.** Do not treat the source document's numbers (72% throughput drop, 34.8% faster inserts, 22% smaller indexes, 72 KB BRIN) as guarantees or thresholds in a report.
- **Severity follows table role and expected volume.** Never flag a small lookup table as `high` for a high-volume-only issue.
- **Non-Drizzle repos.** If the repo uses another ORM or raw SQL, say so at the top of the report, scan SQL migrations only, set criteria confidence to `low`, and do not invent schema facts.
- **No fixes in the response.** Recommendations are text only, with a short illustrative snippet allowed when it clarifies the fix.

## Token-efficiency rules

- Run scripts first; never read whole large files. Use grep or the scanner's line numbers, then read 150-250 line slices.
- Batch independent reads/greps as parallel tool calls (3-6 per turn). Never re-read a file already in context and unmodified.
- No polling or status loops; run commands in the foreground with concise output. At most 6 shell commands per evaluation (scanner, scorer, check, git status, and a few greps).
- After 3 consecutive failures of the same command, stop and report the exact error.
- Use `node` directly on Windows and Linux; no shell-specific syntax inside scripts.
- Never print `facts.json` whole. Query it (hit counts by rule, specific tables) or read the hits you need.

## Known failure modes to prevent

- Flagging `uuid().defaultRandom()` everywhere without checking table role and volume.
- Reporting `FOR UPDATE` as a defect when the locked table has no foreign-key children. It is only an issue when child tables insert or update rows referencing the locked rows concurrently (they take `FOR KEY SHARE`, which conflicts with `FOR UPDATE`).
- Recommending `CREATE INDEX CONCURRENTLY` inside a Drizzle migration without noting it cannot run inside a transaction block (needs a custom, non-transactional migration step).
- Recommending native `uuidv7()` on PostgreSQL older than 18 (use an extension, an SQL function, or app-side generation).
- Recommending `REPACK CONCURRENTLY` (a PostgreSQL 19 feature) for repos not on 19; use `pg_repack` or `REINDEX CONCURRENTLY`.
- Recommending RLS without telling the repo to set the tenant with `SET LOCAL` / `set_config(..., true)` inside the transaction when a transaction-mode pooler is used, and without noting owners and `BYPASSRLS` roles skip RLS unless `FORCE ROW LEVEL SECURITY`.
- Scoring unverifiable infrastructure (autovacuum, replication slots, `postgresql.conf`) as failures when the repo simply does not contain infra files. List it under `unverifiable`.
- Inflating scores because the schema "looks tidy" without checking indexes, FKs and write paths.
- Treating scanner hits as findings without reading the code (ORM001, ORM002, LCK003 and CON006 have known false positives).
- Missing repo-local helpers: the scanner resolves common wrappers (`pk()`, `timestamps()`, `pkey(t)`, `fk(col, target, action)`) but not all. If `facts.json` shows tables with `primaryKey.kind` of `none` or `other`, read the helper before reporting PK004 or PK findings.
