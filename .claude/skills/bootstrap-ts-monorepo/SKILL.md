---
name: bootstrap-ts-monorepo
description: Set up a new TypeScript/Node.js/Postgres monorepo the way esf7-revamp is set up: apps/backend, apps/frontend, packages/shared, AGENTS.md as the single source with CLAUDE.md files importing it, .agents/rules, .claude/settings.json, foundation dependencies, lint/CI tooling and token-efficiency rules. Use when the user says "bootstrap a new repo", "set up the CLAUDE.md set for this project", "create my standard monorepo starter kit" or "repeat my repo setup". Do not use for editing an existing repo's single rule or for deploy/DB work.
---

# bootstrap-ts-monorepo

Repeats the user's standard repo setup in a new TypeScript/Node.js/Postgres repo: folder scaffold, `AGENTS.md` as the single source of agent rules, thin `CLAUDE.md` files that import it, `.agents/rules`, `.claude/settings.json`, foundation dependencies, lint/CI tooling and the token-efficiency execution rules. Stack: Express backend, React + Mantine frontend, shared package, PostgreSQL with Drizzle (`schema.ts` is the source of truth, drizzle-kit migrations), nginx, PM2, PgBouncer, Redis as write buffer. Host is Windows/PowerShell, Node.js v24.11.1, so commands use `npm.cmd` and `npx.cmd`. Hard constraints are in `rules.md`; read it first.

Paths below are relative to this skill folder unless they start with `<repo>`.

## Workflow

1. **Inputs and inspection.** Ask for the target repo path and package scope (for example `esf7-revamp` with `@esf7/*`) if not given. Inspect the repo using the Search-First, Targeted-Slice rules: list the directory, grep for line numbers, read cohesive 150-250 line windows for files over 250 lines, and request all needed ranges as parallel calls in one turn. Never overwrite existing files; merge instead. Batch the initial inspection of `AGENTS.md`, `.agents/rules/antigravity-permissions.md` and `.agents/skills/ci-gate/SKILL.md` into a single parallel read turn (missing files simply report as absent), and apply all edits to those three files in a single batched edit turn.
2. **Scaffold.** Run `node scripts/scaffold.mjs <repo-path> <scope>`. It creates the folder tree, `docs/db-changes.md`, the three short `CLAUDE.md` files (root, backend, frontend) and the `ci-gate` skill, and prints each path as created or skipped (exists). Skipped files that differ from the template must be merged by hand and reported.
3. **AGENTS.md and CLAUDE.md.** Write `AGENTS.md` from `reference/agents-md-rules.md` (copy its rule text verbatim, adding repo-specific facts such as the scope name above it). The root, backend and frontend `CLAUDE.md` files only import `AGENTS.md` (`@AGENTS.md`, `@../../AGENTS.md`) and route to docs. Never duplicate AGENTS.md content into them. Skills run on demand, so only list them as pointers.
4. **Permissions.** Write `.agents/rules/antigravity-permissions.md` (it must include the polling ban and the Parallel Tool Batching Mandate) and `.claude/settings.json`; use `reference/claude-settings.md` for the exact permissions shape. Merge into an existing settings file; never replace it.
5. **Foundation dependencies and tooling.** Add: zod (in `packages/shared`), Vitest, Playwright, pino with request IDs, Helmet, express-rate-limit, TanStack Query (frontend), BullMQ on Redis (plumbing only, not wired to any endpoint), eslint, oxlint. Wire the npm scripts `lint:fast` (oxlint), `lint` (oxlint plus eslint, so it covers `lint:fast`), `typecheck`, `test:unit`, `build`. Use the Impeccable skill for UI design tasks, or an equivalent where the agent IDE cannot run it. Edit `package.json` files only by adding the five scripts and the listed dependencies; say so in the report. Do not run `npm.cmd ci` or `npm.cmd install` unless the user asked.
6. **ci-gate skill.** `.agents/skills/ci-gate/SKILL.md` (written by the scaffold) implements the streamlined Tier 2 exactly: one consolidated foreground command run once at the very end, no duplicate lint pass when `lint` covers `lint:fast`, passing-test output suppressed with `--reporter=dot`, plus the 3-strike breaker. Confirm it is present and unmodified in meaning.
7. **Structural check.** Run `node scripts/verify-bootstrap.mjs <repo-path>` directly for the final structural check. Do not write new checking code.
8. **References.** Use `reference/agents-md-rules.md` when writing AGENTS.md and `reference/claude-settings.md` when writing the permissions file.
9. **Constraints.** `rules.md` holds the hard constraints and the failure modes to prevent.

## Acceptance criteria

- `verify-bootstrap.mjs` exits 0.
- `AGENTS.md` exists and every `CLAUDE.md` imports it.
- The four hard rules are present.
- Present in AGENTS.md: Parallel Tool Batching Mandate, Search-First protocol (150-250 line windows), Pre-Edit Test & Schema Contract Rule, Two-Tier Verification with the chained sub-10s Tier 1 command and the 6-call run_command cap, 3-Strike Circuit Breaker, polling ban, silent-reporter rule, Environment Execution Profile, post-compaction rule.
- The polling ban and batching mandate also appear in `antigravity-permissions.md`.
- The Tier 2 chain ran exactly once, as one consolidated command, and passed.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the verify script and one run of the Tier 2 chain, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.

## Report

End with a short report: what was created, what was merged, what needs a decision, and anything not verified.
