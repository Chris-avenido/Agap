# Report template for `docs/pgbouncer-redis-plan.md`

Use exactly this layout in every run so structure stays identical across repos. Keep every heading even when the section is "none". Cite code as `path:line` in backticks (the checker validates them). Never include secrets or connection strings (env var names only).

````
# PgBouncer + Redis plan - <repo name>
Run date: <YYYY-MM-DD>. Read-only analysis; nothing was changed or applied.
Sources: repo-scan.mjs, size-pool.mjs[, sibling reports <paths>]

## Repo Profile
- Purpose: ... <evidence | ASSUMED(reason) | UNKNOWN>
- Objective:
- Data criticality:
- Traffic shape:
- Tenancy:
- Stack:
- Topology:
- Current state:
- Hardware budget:
- Session-state hazards:
- Hot paths:

## Verdict
(five lines at most: what to apply now, what to defer, the biggest risk)

## Actions
### P0 - <title>
- Priority: P0
- Evidence: `path:line`
- Why:
- Change: (exact config or code diff)
- Risk:
- Verify:

### P1 - <title>
...
### P2 - <title>
...

## Config bundle
(pgbouncer.ini, redis.conf excerpt per instance, postgresql.conf values. Show the size-pool.mjs command and inputs next to each number; mark ASSUMED inputs.)

## Not applicable here
(every skipped or deferred lever with its reason)

## Monitoring checklist
(PgBouncer and Redis metrics from the references, each with the alert threshold)

## Open questions

## Handoff
(pgbouncer-stress-optimize on staging; load-capacity-test; pgbouncer-pool-diagnose-fix for the live VM)
````

Action headings must start with `### P0`, `### P1` or `### P2`, and each block needs an `Evidence:` line (checked by `repo-scan.mjs --check-report`). If a priority has no actions, omit its heading and say so in the Verdict.
