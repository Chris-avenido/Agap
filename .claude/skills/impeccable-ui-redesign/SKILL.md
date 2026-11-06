---
name: impeccable-ui-redesign
description: "Investigate the codebase to determine the app's context, derive the most appropriate UI style (color scheme, type scale, spacing, animations and transitions) while keeping the Plus Jakarta Sans font, propose it for approval, then apply it using the Impeccable design skill package to remove AI-slop and template-looking design. Installs Impeccable if missing. Use when the user says 'improve my UI', 'remove the AI slop', 'make my interface stop looking AI generated', 'figure out the right design style for my app', 'polish the UI with impeccable', or 'redesign the look and feel but keep Plus Jakarta Sans'. Not for enforcing a supplied design spec (use apply-hq-design-system), audit-only checklists (use ui-visual-audit), or functional bug hunting (use playwright-bug-crawl)."
---

# Impeccable UI redesign

Derive a context-appropriate UI style from the code, get the user's approval, apply it through the Impeccable design skill, then verify with screenshots and audits. Decisions come from evidence in the repo (`ui-context.json`, theme files, copy, screenshots), never from a house style. Outputs go to `reports/ui-redesign/<YYYY-MM-DD-HHmm>/` (call it `<run>`): `ui-context.json`, `design-direction.md`, `before/`, `after/`, `verification.md`.

Scripts live in `.claude/skills/impeccable-ui-redesign/scripts/` (call it `<skill>/scripts`). Credentials come only from the environment variables `CRAWL_BASE_URL`, `CRAWL_USER`, `CRAWL_PASSWORD`.

## Workflow

1. **Pre-checks.** Run `git status`. If the working tree has uncommitted changes, tell the user and ask whether to continue. If `UI_DESIGN_SYSTEM_SPEC.md` or `design-tokens.json` exists, or the user asks to enforce the HQ design language, stop and recommend `apply-hq-design-system`.
2. **Ensure Impeccable is installed.** **Run `node <skill>/scripts/ensure-impeccable.mjs` directly** (`--check-only` to just report). It looks for an existing install in `.claude/` and `~/.claude/` and otherwise installs at project scope. Report the source and version to the user. Then read the installed Impeccable `SKILL.md` and its command table to learn the real command names and how its modes work (brand = Persuade, product = Operate/Read). Do not assume command names from memory.
3. **Investigate the codebase.** **Run `node <skill>/scripts/scan-ui-context.mjs --out reports/ui-redesign/<run>` directly** to produce `ui-context.json`. Then read the key files it points to (theme file, global CSS, layout and navigation components, a few representative pages, README, package.json, route names, UI copy).
4. **Determine context.** In one short paragraph state the product domain, primary users, tone, usage pattern (daily tool or occasional) and the Impeccable mode, citing the files behind each statement.
5. **Capture "before" screenshots.** **Run `node <skill>/scripts/capture-screens.mjs --phase before --out reports/ui-redesign/<run>` directly.** If the app is not running or there is no test account, ask the user and stop. Do not start production processes.
6. **Run Impeccable's setup and audit.** Run its context-capture command (read its name from the installed SKILL.md; currently `init`, alias `teach`) using the step 4 context as the answers, labeling inferred facts and having the user confirm them. Then run its evaluate commands (`critique`, `audit`) and its detector (`.claude/skills/impeccable/scripts/impeccable detect --json <frontend src>`; use `.cmd` on Windows) and record the anti-patterns found. Also check the UI against [reference/slop-patterns.md](reference/slop-patterns.md). Save the detector output in `<run>`.
7. **Write the proposal** to `<run>/design-direction.md` using [reference/design-direction-template.md](reference/design-direction-template.md): context, slop findings with paths, color scheme with contrast ratios, Plus Jakarta Sans type scale, spacing and layout rhythm, component treatment, motion (durations, easing, reduced motion), and the ordered change list with files.
8. **STOP and wait for explicit approval.** Show a short summary and the path to the full file. Do not edit application code before the user approves. Confirm with `git status` that no application file changed. If the user asks for changes, revise and ask again.
9. **Apply the approved direction.** Read [rules.md](rules.md) first. Order: theme and design tokens (Mantine theme, CSS variables), shared components, page layouts, then motion. Use Impeccable's commands for each area (typography, color, layout, motion, polish) where they fit, in small logical steps so the diff is reviewable.
10. **Verify.** Run all three:
    - **`node <skill>/scripts/capture-screens.mjs --phase after --out reports/ui-redesign/<run>`**, then compare before and after by opening pairs with the image viewer.
    - **`node <skill>/scripts/check-font-and-contrast.mjs --out reports/ui-redesign/<run>`**: Plus Jakarta Sans is the only rendered family and is loaded, text meets WCAG AA, focus is visible.
    - Re-run Impeccable's detector and audit commands and confirm the step 6 findings are resolved or explicitly justified.
11. **Finish.** If a `ci-gate` skill exists, run it and fix failures. Write `<run>/verification.md` and summarize: what changed, what was verified, what could not be verified.

Use [reference/design-direction-template.md](reference/design-direction-template.md) at step 7, [reference/slop-patterns.md](reference/slop-patterns.md) at steps 6 and 10, and [rules.md](rules.md) for hard constraints (read before step 9).

## Acceptance criteria

- Impeccable is installed and its real command names were read from the installed files.
- `ui-context.json` exists and the proposal cites specific files as evidence for the context.
- No application code was changed before the user approved the proposal.
- The only font family in use is Plus Jakarta Sans (plus an existing monospace for code blocks only). Sizes, weights and line heights follow the approved type scale.
- All text meets WCAG AA contrast, focus indicators remain visible, and animations respect `prefers-reduced-motion`.
- Before and after screenshots exist for every crawled route at desktop and mobile widths.
- No behavior, routes, copy, API calls or test ids changed.
- Every slop pattern found in step 6 is resolved or listed as intentionally kept with a reason.
- Lint, build and tests still pass (via `ci-gate` if present).

## Verification

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using before and after Playwright screenshots, the font and contrast check script, and Impeccable's own audit and detect commands, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
