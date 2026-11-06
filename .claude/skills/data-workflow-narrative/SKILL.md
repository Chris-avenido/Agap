---
name: data-workflow-narrative
description: "Reads the Drizzle ORM schema and the backend code, then writes a plain-English narrative of the whole data workflow (what comes in, what is validated, what is saved to which tables, what is read back, what runs in the background) and produces a ranked findings list of endpoints that are problematic or do not save to the database properly, so they can be fixed from that list. Use when the user asks to explain the data flow in plain English, summarize how the app saves data, find endpoints that are not saving or persisting correctly, or audit the API-to-database path. Static read-only analysis; not for load planning, query tuning, security scans or running tests."
---

# Data workflow narrative

Static, read-only analysis of how data moves through an app: the Drizzle schema, the Express routes, the services and repositories behind them, the Redis/queue background work and (if present) the frontend calls. It produces three files in `docs/data-workflow/`: a plain-English narrative for humans (`DATA-WORKFLOW.md`), a ranked list of persistence problems precise enough for a later session to fix each one (`FINDINGS.md`), and a machine-readable `endpoint-inventory.json`. It never changes application code and never touches a database.

Read `rules.md` first. All paths below are relative to this skill folder (`.claude/skills/data-workflow-narrative/`, written `$S`); commands run from the workspace root.

## Workflow

1. **Pre-flight.** Detect the backend (`apps/backend` or `src`), frontend (`apps/frontend`), schema files (those calling `pgTable(` or `<pgSchema>.table(`) and shared package (`packages/shared`). List `docs/data-workflow/` if it exists: a previous run means update in place (keep finding IDs, see `rules.md`), not duplicate.
2. **Run `node .claude/skills/data-workflow-narrative/scripts/inventory.mjs`** (foreground, one command; add `--backend`, `--frontend`, `--schema`, `--root`, `--out` only if auto-detection is wrong). Do not write new scanning code. It writes `endpoint-inventory.json` and `candidate-findings.json` and prints a counts-only summary.
3. **Read `reference/narrative-style.md`** before writing any prose.
4. **Understand the data model.** From the inventory's table list, read the Drizzle schema in targeted slices only. Group tables into business concepts (for example "schools", "personnel records", "submissions").
5. **Group endpoints into business workflows** (for example "A school submits its personnel data"), not by file or HTTP verb. For each workflow read the handler, service and repository slices the inventory points to (`file:line`). Batch 3 to 6 independent reads in parallel, 150-250 line windows, never re-read unchanged files.
6. **Write `DATA-WORKFLOW.md`** from `assets/DATA-WORKFLOW.template.md`.
7. **Read `reference/finding-rules.md`.** Validate every entry in `candidate-findings.json` by reading the cited code slice: confirm it as a finding, downgrade it, or discard it as a false positive (record discarded ones in "Checked and fine" with the reason). Then add problems found by judgment while reading; the rules are a minimum, not a limit. Do this before you trust the narrative: if a finding changes what the narrative claims ("the system saves X"), fix the narrative.
8. **Write `FINDINGS.md`** from `assets/FINDINGS.template.md`. Every finding has a stable ID (`DW-001`...), severity (Critical / High / Medium / Low), status (Confirmed / Suspected), plain-English description, exact `file:line`, evidence (the 3-8 relevant lines, quoted verbatim), the user-visible consequence, a fix brief (required behavior, files to touch, how to confirm) and its workflow. Cite the candidate key (`R01@path:line`) a finding or a "Checked and fine" entry came from.
9. **Cross-link.** Each narrative workflow ends with a "Known problems" line listing finding IDs; each finding names its workflow.
10. **Run `node .claude/skills/data-workflow-narrative/scripts/check-output.mjs`** and fix everything it reports. Re-run once after fixing; stop after 3 failed rounds (see execution rules).
11. **Final summary to the user:** counts by severity, top 3 problems in plain English, output paths, and what could not be verified statically. Suggest `backend-integration-tests` to confirm Critical/High findings at runtime. Do not run it unless asked.

## Use the saved scripts

Run `scripts/inventory.mjs` and `scripts/check-output.mjs` directly. Do not generate replacement scanners, parsers or one-off checkers; if a script is wrong or missing a pattern, tell the user and fix the script (that is a change to this skill, not to the app). `scripts/fixtures/buggy-api/` is a tiny sample used only to self-test the inventory: `node .claude/skills/data-workflow-narrative/scripts/inventory.mjs --root .claude/skills/data-workflow-narrative/scripts/fixtures/buggy-api --backend src --out <scratch folder> --check-expected .claude/skills/data-workflow-narrative/scripts/fixtures/buggy-api/expected.json`.

## Pointers

- `rules.md`: hard constraints. Read first.
- `reference/narrative-style.md`: audience, structure and a good/bad example. Read before writing prose.
- `reference/finding-rules.md`: rules R01 to R14, how to confirm, false-positive examples. Read before validating candidates.
- `assets/*.template.md`: skeletons for the two written files.

## Execution rules

- Grep or the inventory first, then read targeted 150-250 line slices (explicit start line and limit). Files over 250 lines are never read whole.
- Batch 3 to 6 independent reads or greps in one parallel turn. Edits to different files go in one turn; one consolidated edit per file.
- Never re-read an unmodified file already in context.
- At most one chained foreground run per script per round. No polling, no background-task status checks, no scheduled wake-ups, no sleep loops.
- On Windows run `node` from the workspace root (forward slashes are fine); use `npm.cmd` / `npx.cmd` only if npm is ever needed (it should not be).
- 3-strike circuit breaker: after 3 failed attempts on the same command, stop and report the exact error.
- No model-specific assumptions: the instructions work in any agent harness that can read files, run `node` and write files.

## Acceptance criteria

All must hold before returning:

- `endpoint-inventory.json` route count equals an independent count from grepping route registrations (`.get(`, `.post(`, `.put(`, `.patch(`, `.delete(` on app/router objects); any difference is explained in the summary.
- Every endpoint that performs at least one database write appears in `DATA-WORKFLOW.md` (by path) under some workflow.
- Every table written by any endpoint is described in the narrative's "Where the data lives" section.
- Every finding has ID, severity, `file:line` that exists, evidence lines that appear verbatim at that location, consequence and fix brief.
- Every candidate in `candidate-findings.json` is either a finding or in "Checked and fine" with a reason.
- The narrative contains no code blocks and no unexplained identifiers (an identifier may appear only in parentheses after a plain-English name).
- `check-output.mjs` exits 0.
- No file outside the output folder was created or changed (`git status` shows only `docs/data-workflow/` changes).

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using `scripts/check-output.mjs`, a grep cross-check of route counts, and spot-reading the cited code lines, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
