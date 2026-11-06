---
name: ui-visual-audit
description: "Audits a web app's visual design (typography, color contrast, spacing scale, radius and shadow tokens, component states, motion, dark mode, touch targets) by statically scanning the source code and measuring the rendered pages with headless Playwright at mobile, tablet and desktop widths in light and dark mode, then returns a prioritized pass/fail checklist of recommendations with evidence and screenshots. Use when the user says things like 'audit my UI design', 'check my design against our visual standards', 'review the colors, fonts and spacing', 'run a design audit with Playwright', or 'is my UI consistent and accessible'. Not for functional or end-to-end tests, security scans, performance load tests, or production-readiness scoring."
---

# UI visual audit

Measure first, judge second. The saved scripts scan the source and measure the rendered pages; every number in the report comes from them. The model adds only labeled judgment findings from the screenshots. Every finding needs evidence (a selector or `file:line` plus a measured value), the expected threshold and a concrete fix.

Hard constraints are in [rules.md](rules.md). Read it before starting. All paths below are relative to this skill folder; run the scripts from the repo root with absolute or relative paths to them (shown as `<skill>`).

## Workflow

1. **Confirm scope in one message:** the base URL (or permission to start the dev server; if no URL is given, detect the dev command from `package.json` and ask before starting it), the routes to audit (default `/` plus up to 5 routes discovered from the router or sitemap), and whether authenticated pages need a storage-state file the user provides.
2. **Run `bash <skill>/scripts/setup.sh` once.** It installs Playwright, Chromium and axe-core into the skill folder's own `node_modules`, not into the project's dependencies.
3. **Run `node <skill>/scripts/scan_code.mjs <repo-root> --out ui-audit/code-scan.json`.** Execute the saved script; do not write new scanning code.
4. **Run `node <skill>/scripts/audit_page.mjs --url <base-url> --routes <comma-list> --out ui-audit`.** Execute the saved script; do not write new browser code. It covers 3 viewports (375, 768, 1280 px wide) x 2 schemes (light, dark) x reduced-motion on/off for each route, saves screenshots, and writes `ui-audit/page-scan.json`. Add `--storage-state <file>` for authenticated routes. On Windows Git Bash, prefix with `MSYS_NO_PATHCONV=1` so a bare `/` route is not rewritten.
5. **Read [reference/visual-standards.md](reference/visual-standards.md)** (not earlier) and view the screenshots with the image viewer. Add judgment findings (visual hierarchy, single focal point per screen, whitespace and grouping, consistency of patterns, icon style consistency). Label them judgment and confidence: medium, and write them into `ui-audit/judgment.json` using the schema in that file.
6. **Run `node <skill>/scripts/build_report.mjs --in ui-audit --out ui-audit/report.md`.** It merges code-scan, page-scan and judgment findings into the final checklist and `findings.json`.
7. **Present `ui-audit/report.md`:** show the score table and the top 10 items inline, link the full file, and offer to fix items on request. Do not edit the app's source code during the audit. Stop the dev server if the skill started it.

Standards are in [reference/visual-standards.md](reference/visual-standards.md); the exact numeric limits the scripts use are in [reference/thresholds.json](reference/thresholds.json).

## Acceptance criteria

- `report.md`, `findings.json` and at least one screenshot per route x viewport x scheme exist.
- Every finding has: id, category, severity (fail, warn, pass), a measured value or code location (`file:line` or CSS selector), the expected threshold, a concrete recommended fix, and a link to a screenshot when the issue is visible.
- All numeric findings come from the scripts. None are estimated by the model.
- The report contains every category: Typography, Color and contrast, Spacing and layout, Shape and elevation, Components and states, Motion, Dark mode, Tokens and consistency, Accessibility (axe), Judgment.
- The checklist item count in `report.md` equals the number of non-pass findings in `findings.json`.
- Three randomly chosen contrast failures are re-verified by importing `scripts/lib/color.mjs` and recomputing `contrastRatio` on the reported colors (`fg`, `bg` in `findings.json` occurrences); the ratio matches within 0.05.

## Verification

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the saved scripts' JSON output, the rendered screenshots and an independent recomputation of three contrast ratios, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
