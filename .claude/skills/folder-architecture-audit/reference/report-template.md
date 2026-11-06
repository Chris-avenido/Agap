# Report template

Keep the whole report under about 250 lines, no filler. Cite files as `` `path/to/file.ts:LINE` `` in backticks so `check-report-paths.mjs` can verify them. Never cite paths that do not exist yet outside a fenced proposed target tree (open that fence with ```` ```text target-tree ````). Do not claim certainty about agent accuracy or regressions.

Use exactly these sections, in this order.

## 1. Header
Repo name, date, audited commit (`git rev-parse --short HEAD`), overall score `NN/100`, grade, one-sentence verdict.

## 2. Purpose and objectives
5 to 8 lines. Mark inferred statements with "(inferred)".

## 3. Architecture at a glance
Workspaces (name, role), top-level modules, endpoint count, `resolveRate`, technical vs feature folder share, source file count, size buckets.

## 4. Scorecard
| Category | Score | Max | Confidence | Evidence |
|---|---|---|---|---|
One row per category A to H, one-line evidence with `path:line` or the JSON field and value. Final row: total, which must equal the sum and match a grade band.

## 5. Agent debuggability readout
| Endpoint | `file:line` | Files to load | Directories touched | Est. tokens | Hops to data layer | Verdict |
|---|---|---|---|---|---|---|
The 4 to 6 sampled endpoints (use `fullPath` and method). Note the median across all endpoints below the table.

## 6. Findings
Top issues, each with evidence (number or `path:line`).

## 7. Recommendations
Ranked by (score gain divided by effort), grouped as **Quick wins** (no file moves), **Structural moves**, **Enforcement**. Each item:
- Title
- Finding and evidence
- Why it hurts agents (tokens, distractors, regression risk, debugging steps)
- Proposed change
- Effort: S (under a day), M (a few days), L (a week or more)
- Risk and rollback (normally `git revert` of one move commit)
- Expected score gain (categories and points)
- Executor hint (for example hand to `modularize-large-files`, `ci-gate`, or a manual decision)

Structural moves also include a **proposed target tree** in a fenced `target-tree` block and a migration order that moves one feature at a time, running `ci-gate` after each move.

Enforcement items are described in words and short config sketches only, never applied.

## 8. What I could not verify, and assumptions
Bullets. Include inventory limits (static resolution, unresolved mounts) and any judgment scored on a sample.

## 9. Next step offer
Offer to save the report to `docs/architecture-audit/<YYYY-MM-DD>.md`, or to hand a recommendation to another skill. Save nothing without a yes.
