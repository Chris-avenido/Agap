---
name: folder-architecture-audit
description: Read-only audit that learns a repo's purpose, maps its API endpoints and code structure, scores the folder architecture out of 100, and recommends changes so agent IDEs (Claude Code, Antigravity, Cursor) can debug and improve it with less context. Use when the user says things like 'score our folder architecture', 'audit the repo structure for agents', 'is this repo agent-friendly', 'how should we reorganize folders for Claude Code', or 'rate this repo's architecture'. Does not move or edit files, does not score ORM queries, and does not run builds or tests; use drizzle-repo-scorecard, modularize-large-files or ci-gate for those.
---

# folder-architecture-audit

This audit measures how cheaply and safely an AI agent can locate, understand, change and verify a feature. The core idea is the **endpoint context footprint**: how many files, directories and estimated tokens an agent must load to debug one endpoint. Fewer is better. The audit is read-only: it never changes the audited repo.

Not this skill: ORM/query quality (`drizzle-repo-scorecard`), splitting big files (`modularize-large-files`), UI design (`ui-static-audit`, `ui-visual-audit`), build/lint/test (`ci-gate`), data-flow story (`data-workflow-narrative`). Hand off to them in recommendations.

## Files in this skill
- `rules.md`: hard constraints. Read first.
- `reference/principles.md`: heuristics and project-fit calibration. Read before scoring.
- `reference/scoring-rubric.md`: the 100-point rubric. Read before scoring.
- `reference/report-template.md`: exact report layout. Read before drafting.
- `scripts/inventory.mjs` and `scripts/check-report-paths.mjs`: **run these directly; never rewrite or regenerate their logic.** If a script has a bug, report it instead of working around it with new analysis code.

## Workflow

1. **Confirm scope.** Find the repo root (`git rev-parse --show-toplevel`, or the path the user gave). Note whether it is a monorepo. Ask the user nothing unless the root cannot be determined.
2. **Learn purpose and objectives (targeted reads only).** Read at most the first 80 lines of each of: `README.md`, root `package.json`, `AGENTS.md`, root `CLAUDE.md`, and the docs index if one exists. Write a 5 to 8 line "Purpose and objectives" summary: what the product does, who uses it, the critical user flows, and stated non-functional goals (for example concurrency or submission volume). Mark anything inferred rather than stated as "inferred".
3. **Read the reference files** listed above (rules, principles, rubric).
4. **Run `scripts/inventory.mjs` directly:**
   `node .claude/skills/folder-architecture-audit/scripts/inventory.mjs --root <repo-root>`
   It writes JSON to the OS temp directory (default `<tmp>/folder-arch-audit.json`) and prints a short summary with the path. Read the summary, then only the JSON sections you need (for example `endpoints.list`, `crossBoundary`, `cycles`, `boundaryTooling`).
5. **Sample endpoints.** From `endpoints.list` pick 4 to 6: the largest footprint, the one that touches the database most (lowest `hopsToDataLayer` with many files, or highest `estimatedTokens` among data-touching ones), one with `mountResolved: false` (if any), and two ordinary ones. Read only the route file and the handler file for each (line ranges, not whole directories) to judge handler quality, validation placement and data-access placement.
6. **Score** with `reference/scoring-rubric.md`. Metric criteria take numbers from the JSON. Judgment criteria need `path:line` evidence and a confidence level (High, Medium, Low).
7. **Recommend.** Ranked recommendations as described in `reference/report-template.md`, grouped into Quick wins (no file moves), Structural moves (proposed target tree plus migration order), and Enforcement (boundary rules and CI wiring described in words and short config sketches, never applied). Apply the project-fit calibration from `reference/principles.md`.
8. **Draft the report** to `<OS temp dir>/folder-arch-audit-report.md` using `reference/report-template.md`, then run
   `node .claude/skills/folder-architecture-audit/scripts/check-report-paths.mjs --report <that file> --root <repo-root>`
   to prove every cited path and line exists. Fix every reported problem and rerun until it exits 0.
9. **Deliver** the verified report in the chat. Offer to save it to `docs/architecture-audit/<YYYY-MM-DD>.md` and to hand individual recommendations to other skills. Save only if the user says yes.

## Acceptance criteria
- Every score is backed by a number from the inventory JSON or by a cited `path:line`; judgment-based scores carry a confidence level.
- Category scores add up to the stated total, and the total matches a grade band in the rubric.
- The report contains the "Agent debuggability readout" table (endpoint, files to load, directories touched, estimated tokens) for the sampled endpoints.
- Every recommendation has: finding, evidence, why it hurts agents, proposed change, effort (S/M/L), risk, and which skill or person should execute it.
- `check-report-paths.mjs` exits 0.
- No file inside the audited repo was created, modified, moved or deleted (`git status --porcelain` shows nothing new from this run).

## Verification
Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the inventory JSON, `scripts/check-report-paths.mjs` and `git status --porcelain`, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
