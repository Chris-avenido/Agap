# Hard rules

These apply to every run and override convenience.

1. Never change business logic, props or data bindings. A restyle touches class names, style values, theme files, tokens and markup structure only where a rule requires it.
2. Never install any library that is not already named in `reference/libraries.md`. If a need is not covered, stop, report it and wait for the user to add the library to that file.
3. Never touch auth, lock or middleware code.
4. Never edit generated, vendored or build output files (`dist`, `build`, `storybook-static`, `coverage`, `*.generated.*`, `generated/` folders, lockfiles, migrations).
5. Never invent colors. Use only the InsightED official palette and its documented status and dark values from `assets/insighted-tokens.json`. Interpolated Mantine scale steps listed there are the only derived values.
6. Never mix two libraries for the same concern, and never migrate a repo to a different framework or UI library.
7. Keep one commit per rule category. Do not combine categories, and do not mix wiring with retrofit.
8. Rules live only in `.agents/rules/ui.md`. `AGENTS.md` and every `CLAUDE.md` only point to it.
9. Do not improvise. If a case is not covered by `reference/design-rules.md` and has no edge-case default, leave it as it is and list it in the final report.
10. Never edit the user's other design skills (`apply-hq-design-system`, `impeccable-ui-redesign`, `ui-visual-audit`, `ui-static-audit` and similar). On conflict, this skill wins.
11. Never print, log or commit values from `.env` files. Never touch a production database or server.

## Known failure modes to prevent

- Per-page hardcoded hex values instead of theme tokens.
- Mixing icon sets after a partial migration (some pages Phosphor, some Lucide).
- Adding utility-CSS frameworks (Tailwind) beside the repo's UI library.
- Skipping the dark-mode category because light mode already looks right.
- Rewriting component props while restyling.
- Copying the rules into several files so they drift apart.
- Assuming a stack instead of running `scripts/detect-stack.mjs`.
- Writing new detection or scan code instead of running the saved scripts.
- Fixing a failing contrast pair by editing the checker instead of the token.
- Declaring done without a final full scan, linter run and `git diff` review.
