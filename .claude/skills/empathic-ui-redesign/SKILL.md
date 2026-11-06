---
name: empathic-ui-redesign
description: Applies a consistent, human, non-generic, well-crafted design language and design system whenever someone asks to redesign, restyle, refresh, polish or change the UI of any web or app project, including when a screen feels generic, plain or barebones. Uses design thinking and empathy for the real users of the product, discovers the project's brand, stack and domain, avoids the generic AI-generated look, and enforces a minimum level of craft. Use for requests like 'redesign this page', 'update the UI', 'make this look less generic', 'this feels too plain', 'make it feel more human', 'fix the typography', 'apply our design system'. Do not use for backend, API, database, or other non-visual work.
---

# Empathic UI redesign

## Purpose

Design through empathy first, taste second. The goal is an interface that feels like it was made by someone who understands the people using it and the job they are trying to finish. The skill is stack-agnostic and project-agnostic: it discovers each project's brand, framework, users and domain instead of assuming them, and it removes the generic "AI-generated" look (identical rounded cards, gradient washes, all-caps eyebrow labels, decorative motion, placeholder copy). The interface should also feel finished, not sparse.

Paths below are relative to this skill's folder (`<skill-dir>`). Project paths are relative to the project's repo root.

## Workflow

1. **Set scope.** Decide the scope tier from the user's words. If unclear, ask one question and recommend `refresh-plus`. Read `rules.md` now.
   - `refresh`: visual only. Colors, type, spacing, component styling. Layout structure, navigation, form fields and data logic stay unchanged.
   - `refresh-plus`: everything in `refresh`, plus presentational structure additions that do not change behavior: section panels and headers, icon chips, summary or status strips, sticky status or save panels, labels and tooltips for icon-only navigation, helper text, tooltips for abbreviations, and designed empty, disabled and loading states. Routes, navigation destinations, form field names and types, validation rules and data logic stay unchanged.
   - `redesign`: structure may change.

2. **Discover the project.** Detect the framework and component library from `package.json` and the source tree. Find the existing theme or CSS variable files, any logo or brand assets, any existing design tokens, and the product's domain (page titles, nav labels, data model names, existing copy). Look for a project-level `design-tokens.json` in the repo root or a `design-brief.md`; these override this skill's defaults. If no brand colors or font are discoverable, use `assets/tokens.default.json` and tell the user these are defaults.

3. **Empathize.** Read `reference/empathy-and-copy.md`. Write a three-line user brief before touching code:
   - Who uses this screen.
   - On what device and in what setting.
   - What job they are trying to finish, and how they feel doing it (rushed, anxious about a mistake, unfamiliar with the tool).

   Use facts from the project or the user. If the brief cannot be written from known facts, ask at most three questions.

4. **Define.** State the screen's single primary job in one sentence. Choose the one memorable element, drawn from the product's own domain (see `reference/design-language.md`).

5. **Inspect the current state.** Read the relevant components. If Playwright is installed, screenshot the current screen in light and dark at 1440px and 390px widths. If not, say screenshots could not be taken. Score the current screen against `reference/craft-floor.md` and list which items it fails.

6. **Ideate: design plan.** Read `reference/design-language.md` and `reference/craft-floor.md` first. Produce a compact plan:
   - Color: named hex values from the tokens.
   - Type scale.
   - Layout concept with an ASCII wireframe.
   - Alignment.
   - What makes this screen distinct.
   - How each craft-floor item will be met (or why it does not apply in this scope tier).

   Then run a **double review**. First against the generic-AI tells in `rules.md`: is anything a default you would produce for any similar screen? Then against the craft floor and the bareness tells in `reference/craft-floor.md`: is anything bare? Revise the plan and state what changed and why. For large changes (a new layout or a full screen), show the plan to the user and wait for a go-ahead before building.

7. **Tokens.** Run `node <skill-dir>/scripts/build-theme.mjs --src <project-src-dir>` directly (see "Use the scripts" below). Do not hand-write the theme. If the user supplies brand values, edit only the project's `design-tokens.json`, then rerun the script.

8. **Prototype: build.** Read `reference/ux-principles.md` first. Implement screen by screen using the project's existing component library, themed from the tokens. Follow `reference/design-language.md` and `reference/craft-floor.md`. Use platform human-interface guidelines (Apple Human Interface Guidelines as the primary reference: clarity, deference to content, depth used sparingly) as the guiding standard.

9. **Words.** Copy pass using `reference/empathy-and-copy.md`: real domain labels, active verbs, humane errors, useful empty states, tooltips or subtitles for abbreviations and jargon, no placeholder text. Keep the app's existing language unless asked to change it.

10. **States.** Make sure every screen has hover, focus-visible, selected, disabled (with the reason shown), loading, empty, error, success, saved and unsaved states, plus dark mode if the project supports themes. If the project has no themes and the scope is `redesign`, add dark mode.

11. **Test: verify.** Run `node <skill-dir>/scripts/audit-ui.mjs --src <project-src-dir>` directly. Take after-screenshots (light and dark, 1440px and 390px), **view them**, and complete the craft-floor checklist with one line of evidence per item. Fix every failed item and re-screenshot. Check `git diff` against the scope tier.

12. **Report.** Return the summary described under Acceptance criteria: user brief, design plan (with the double review and any revisions), tokens used and whether they were defaults, audit result including the Craft section, the craft-floor checklist with evidence, screenshots taken or not, anything unverified. State that default token values are provisional.

## Use the scripts, do not rewrite them

Run `scripts/build-theme.mjs` and `scripts/audit-ui.mjs` directly. Do not write new code for theme generation or auditing. If a script fails or gives a wrong result, find the root cause and fix the script itself (or the tokens file), then rerun.

```
node <skill-dir>/scripts/build-theme.mjs --src <dir> [--tokens <path>] [--target css|mantine|tailwind|mui] [--out <dir>]
node <skill-dir>/scripts/audit-ui.mjs   --src <dir> [--tokens <path>] [--changed]
```

- Run both from the project's repo root so `design-tokens.json` resolves there.
- `build-theme` creates `design-tokens.json` from defaults if missing, writes `generatedScales` into it, and writes `tokens.css` plus one adapter into `<src>/theme`. It prints font install instructions but never installs anything.
- `audit-ui` writes `audit-report.json` in the current directory (do not commit it) and exits 1 on any error. Errors: off-token colors, off-token fonts, failing token contrast pairs. Warnings: generic tells, plus a separate Craft section of heuristics (type range, interaction states, surface layering, brand in layout files, table styling, unlabeled icon buttons, unexplained abbreviations). Warnings never change the exit code. Fix errors; fix or justify every warning in the report.
- Generated theme files carry a header marker and are skipped by the audit. Never hand-edit them.
- Token notes: derive `brand`, `semantic.critical` and `semantic.attention` from the project's logo or brand colors when they exist. The primary color carries most of the interface and must visibly carry the navigation, header and primary actions so the brand is present in the chrome; accents stay small with one job each. Surfaces are page, panel, raised and selected (`card` is accepted as an alias for `panel`). Yellow-like colors are fills, indicators or chart colors with dark text on top, never text on white. A project may rename or add brand keys; the scripts read whatever keys exist in the same structure.

## Which reference, when

| When | Read |
| --- | --- |
| Start (step 1) | `rules.md` |
| Verify (step 11) | `reference/craft-floor.md` (checklist) |
| Empathize and Words (steps 3, 9) | `reference/empathy-and-copy.md` |
| Before planning (step 6) | `reference/design-language.md` and `reference/craft-floor.md` |
| Before building (step 8) | `reference/ux-principles.md` and `reference/craft-floor.md` |

## Acceptance criteria

- `node scripts/audit-ui.mjs` exits with code 0 (no off-token color values, no font outside the token font stack, no contrast failures in token pairs), and every craft heuristic warning is either fixed or justified in the report.
- The craft-floor checklist is complete with evidence from screenshots; every item passes or has a stated reason it does not apply.
- Body text contrast at least 4.5:1, and large text and UI component contrast at least 3:1, in light and dark themes where both exist.
- Click and tap targets are at least 44px on touch layouts.
- Screenshots exist for light and dark at 1440px and 390px, and the screen is usable at both widths with no horizontal page scroll (or the report states they could not be taken).
- One memorable element is identifiable per screen and the rest is visually quiet.
- None of the generic tells or bareness tells in `rules.md` appear.
- Status is never conveyed by color alone.
- The scope tier's limits are respected, shown by the diff: `refresh` and `refresh-plus` change no routes, navigation destinations, form field names or types, validation or data logic; `refresh` also adds no structure.
- All visible copy is real and specific to the product, with no placeholder names or lorem ipsum.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the audit script and light/dark screenshots at desktop and mobile widths, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
