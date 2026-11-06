---
name: drizzle-repo-scorecard
description: Read-only evaluation of a repo's Drizzle schema, migrations and database-touching code against enterprise PostgreSQL best practices. Scores the repo across 10 weighted criteria (primary keys, indexing, integrity, concurrency and locking, multi-tenancy, data modeling and growth, ORM query patterns, pooling and runtime config, migration safety, operations and purpose fit), weighted by the repo's own purpose and scale target, then returns a ranked improvement plan with file:line evidence. Use when the user says 'score this repo', 'repo scorecard', 'evaluate the drizzle schema and codebase', 'rate my database design', 'grade the data layer', 'how ready is this repo for heavy concurrent writes', or 'what should I improve in this repo's database code'. Never edits code or touches a database. Not for EXPLAIN ANALYZE or slow-query tuning (use orm-optimizer), live server/config checks or JSON bloat on a running database (use pg-health-assessment), or PgBouncer/Redis implementation (use pgbouncer-redis-plan).
---

# drizzle-repo-scorecard

A static, read-only, purpose-weighted scorecard of a repo's data layer. A scanner extracts facts and rule hits with `file:line`; you verify them, judge what a script cannot see, and a scorer turns your judgments into one fixed-format report. The same repo can score differently under different purposes ("10k concurrent submissions" vs "internal admin tool") because the weights and the severity of each finding depend on the Repo Profile. This skill complements, and does not replace, the live or database-backed skills.

All paths below are relative to this skill folder. `REPO_PATH` is the repo being evaluated (default: current directory). `OUTPUT_DIR` is the OS temp directory.

## Workflow

1. **Build the Repo Profile.** In ONE parallel batch read: README, CLAUDE.md / AGENTS.md, root and workspace `package.json`, `drizzle.config.*`, `.env.example` (never `.env`), `docker-compose*`, and any `docs/` file whose name suggests architecture, scale, requirements or roadmap. Derive: purpose, objectives, workload type (`write-heavy-ingestion`, `multi-tenant-saas`, `read-heavy-reporting`, `append-only-events`, `internal-low-scale`, `mixed`), tenancy model, scale target (users, concurrent writes, rows), PostgreSQL version if stated (else `unknown`), pooler (`pgbouncer` / `none` / `unknown`). If the user gave a one-line purpose, use it. If the purpose is unclear, make explicit labelled assumptions with a confidence level; ask the user at most ONE question, and only if the workload type cannot be inferred at all.
2. **Run the scanner directly:** `node scripts/scan-repo.mjs REPO_PATH --out OUTPUT_DIR/facts.json` (add `--tenant-column NAME` if the profile names a tenant column outside the defaults). Do not write new scanning code.
3. **Verify and contextualize findings.** Using `facts.json`, read only targeted slices (token rules in `rules.md`) to confirm every critical/high finding and a sample (max 3 per rule) of medium/low ones. Discard false positives. Re-grade severity by table role and expected volume using `reference/rubric.md` (a UUIDv4 key on a 200-row lookup table is `info`; on the main submission table it is `high`). Group many hits of one rule into one finding listing several evidence entries.
4. **Judge what scripts cannot see** using `reference/rubric.md`: lock strength and ordering in transactions, N+1 and unbounded reads, transaction scope around external calls, tenant isolation with pooling, and whether the schema and write path support the stated objectives (criterion C10).
5. **Write `scorecard.json`** (in `OUTPUT_DIR`) following `reference/scorecard-schema.md`, with weights chosen via the profile's `workload` (see `reference/weighting-profiles.md`). Mark criteria that do not apply as `applicable: false` with the reason in `summary` (for example multi-tenancy in a single-tenant app). Put anything that needs a live database or server in `unverifiable` with the skill that can check it (`orm-optimizer`, `pg-health-assessment`, `pgbouncer-redis-plan`, `security-testing`). Start each criterion score from the suggested value: `10 - penalties` (critical 4, high 2.5, medium 1, low 0.3); adjust by at most 1.5 and explain in `adjustmentReason`.
6. **Run the scorer directly:** `node scripts/compute-score.mjs OUTPUT_DIR/scorecard.json --out .claude/reports/repo-scorecard-YYYY-MM-DD.md` (paths relative to the evaluated repo root; create nothing else). Do not hand-compute scores or hand-format the report.
7. **Return the report** in chat: overall score and grade, a one-line verdict tied to the repo's objectives, the per-criterion table, the top 10 ranked recommendations, strengths, and the unverifiable list. Offer to hand specific findings to the follow-up skills; do NOT fix anything.

## Reference files

- `reference/postgres-best-practices.md`: read when judging criteria C1-C9, and when writing a recommendation so it cites the right best practice.
- `reference/rubric.md`, `reference/weighting-profiles.md`, `reference/scorecard-schema.md`: read at steps 3-5.
- `scripts/selftest.mjs`: `node scripts/selftest.mjs` checks scanner and scorer against the bundled fixtures. Run it only if a script seems wrong.

## Hard constraints

See `rules.md` (read-only, no secrets, no database or network, evidence required, token rules, known failure modes). Read it before step 1.

## Acceptance criteria

- `git status --porcelain` shows no changes except (optionally) the report file under `.claude/reports/`.
- Every finding has at least one `file` + `line` that exists, and every critical/high finding was confirmed by reading that slice.
- All 10 criteria are present; each is scored or marked not applicable with a reason; applicable weights sum to 100 after normalization (checked by `compute-score.mjs --check`).
- Each criterion score is within 1.5 of the script-suggested score, with `adjustmentReason` when it differs.
- The report states the Repo Profile with assumptions and confidence, so the reader can see what the grading was based on.
- Every recommendation names the problem, why it matters for THIS repo's objectives, the concrete fix, and effort (S/M/L). No generic advice.
- Anything not verifiable from the repo is listed, not silently scored.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using re-reading the cited file slices for every critical and high finding, running `node scripts/compute-score.mjs scorecard.json --check`, and `git status --porcelain`, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
