---
name: insighted-ui-rules
description: Applies and enforces the InsightED official UI design language in any web repo or code snippet: palette, Plus Jakarta Sans typography, 4-6px corners with soft shadows, top bar plus sidebar shell, comfortable tables with pill status badges, floating-label forms with inline and banner errors, duotone icons, subtle motion, dark mode, and one-library-per-concern. Retrofits existing UI, scans for off-palette colors and banned libraries, and wires the rules into AGENTS.md, CLAUDE.md, .agents/rules, the theme, Storybook and ESLint. Use when the user says "enforce the InsightED UI rules", "apply the InsightED official palette", "retrofit the UI to the InsightED design language", "make this page follow our design language", or "check my UI against the InsightED rules". Not for designing a new visual direction, bug crawling, or backend work.
---

# InsightED UI rules

Enforces one fixed visual language, the InsightED official palette and its design rules, on whatever repo it runs in. It detects the stack, scans for violations with deterministic scripts, retrofits the existing UI one rule category at a time, and wires the rules into the repo's agent-instruction files so later sessions follow them. It does not invent a new look. If another design skill disagrees with this palette, this skill wins. Do not modify the other design skills.

## Workflow

1. **Read the rules.** Read `rules.md` first, then `reference/design-rules.md`, `reference/palette.md` and `reference/libraries.md`. Read `reference/repo-wiring.md` before touching any agent-instruction file.
2. **Detect the stack.** Run `node <skill-dir>/scripts/detect-stack.mjs --root <repo>` directly. It reports framework, UI library, icon and chart libraries, CSS approach, UI source folders, theme file candidates, Storybook, ESLint config, package manager, OS, git state, existing agent-instruction files, and a `profile`. Pick the matching profile in `reference/libraries.md`. Do not write new detection code.
3. **Branch.** If `git.available` and `git.insideRepo`: create `ui/insighted-rules-retrofit`. If `git.dirty` is true, ask the user first and do not stash or discard anything. If git is not available, work on copies and say so in the report.
4. **Baseline.** Run `node <skill-dir>/scripts/scan-ui-violations.mjs --root <repo>` directly and keep the per-rule counts as the baseline report.
5. **Contrast.** Run `node <skill-dir>/scripts/check-contrast.mjs` directly. It reads `assets/insighted-tokens.json`. A failing pair must be fixed in the token file before it is used. Pairs marked `decorative` have no minimum; obey their notes (legend or value label next to them).
6. **Retrofit, one commit per category**, in this order, scanning only the affected files each time with `--category <name> --files <list>`:
   1. tokens and theme (`tokens`): generate the theme from `assets/insighted-tokens.json`; replace raw colors, radii and shadows
   2. typography (`typography`)
   3. app shell: top bar plus sidebar, responsive (`shell`)
   4. tables (`tables`)
   5. forms and validation (`forms`)
   6. feedback: loaders, status pills, confirmation dialogs (`feedback`)
   7. icons (`icons`)
   8. charts (`charts`)
   9. motion (`motion`)
   10. dark mode (`dark`)
7. **Wire the repo** per `reference/repo-wiring.md`, as its own commit.
8. **Verify and report** (see the verification step below).

## Where things live

| File | Read it when |
|---|---|
| `rules.md` | Always, first. Hard constraints and known failure modes. |
| `reference/design-rules.md` | Before any retrofit. Testable rules per category with edge-case defaults. |
| `reference/palette.md` | When choosing or checking any color. |
| `reference/libraries.md` | After detection, to pick the profile. Its JSON block is the banned-library list the scanner reads. |
| `reference/repo-wiring.md` | Before the wiring commit. |
| `assets/insighted-tokens.json` | Source of every color, radius, shadow, type size and contrast pair. Generate theme files from it, never retype values. |
| `assets/ui-rules.md` | Copied to `.agents/rules/ui.md` in the target repo. |

## Hard constraints

See `rules.md`. In short: no business-logic, props, data-binding, auth, lock or middleware changes; no generated, vendored or build files; no new libraries; no invented colors; one commit per category.

## Scanner rules

`color-raw`, `lib-banned`, `icon-weight`, `radius`, `font`, `shadow`, `motion`, `loader`, `label`, `form-errors`, `destructive` are the core rules. The scanner also reports `theme-missing`, `dark-missing`, `dark-forced`, `shell-missing`, `shell-breakpoint`, `table-density`, `table-mobile`. The last five are heuristics: confirm each by reading the file before changing code. Rule ids map to categories as follows: tokens (`color-raw`, `radius`, `shadow`, `theme-missing`, `lib-banned` for components and CSS), typography (`font`), shell, tables, forms (`label`, `form-errors`), feedback (`loader`, `destructive`), icons (`icon-weight`, `lib-banned` for icon sets), charts (`lib-banned` for chart libraries), motion (`motion`, including animation libraries), dark.

Known limits: the label rule recognises raw HTML inputs and Mantine inputs; inputs from other UI libraries are not detected, so review them by hand. The scanner skips test files, config files, generated files and migrations. Backend `.ts` files are only scanned when they sit inside a detected UI source folder; check `uiSourceFolders` in the detect output and narrow with `--files` if a backend folder was picked up.

## Acceptance criteria

- `scan-ui-violations.mjs` reports zero violations across the whole UI source.
- `check-contrast.mjs` passes for every token pair.
- The repo's linter passes, including the new off-palette and banned-library rules where an ESLint config exists.
- Where Storybook exists, it builds and the retrofitted components render with the InsightED tokens in light and dark mode.
- `git diff` shows no changes to business logic, props, data bindings, auth/lock/middleware code, or generated/vendored/build files.
- `.agents/rules/ui.md` exists and holds the rules; `AGENTS.md` and each `CLAUDE.md` only point to it, with no duplicated rule text.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the scan script, the contrast script, the repo's linter, the Storybook build (if present) and git diff, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.

## Final report

List: detected stack and profile; baseline versus final violation counts per rule; the commit per category; cases the rules do not cover that you did not improvise on; contrast results including decorative pairs; anything you could not verify (for example a Storybook build that needs network access).

## Environments without a shell (browser app, uploaded files)

If no code-execution tool with Node is available, apply the same workflow by reading `reference/` and the uploaded code, return the patched files plus `.agents/rules/ui.md` and the pointer lines instead of commits, and state clearly that the scripts could not be run so the scan and contrast results are unverified. If Node is available on the uploaded files, run the scripts as usual and return the changed files.

## Token-efficiency rules

- Grep first, then read 120-150 line slices. Never re-read a file you have not modified.
- While iterating, run scoped checks (`--files`, a scoped lint). Run the full scan, lint and build once at the end.
- Run commands in the foreground with concise output. No polling loops, no background watchers.
- Stop after 3 failed attempts on the same problem and report the exact error.
- Use the detected package manager from `packageManager.runCommand` and `execCommand` (`npm.cmd` and `npx.cmd` on Windows).
- Do not run an install command unless the user asked. Never add a dependency.
