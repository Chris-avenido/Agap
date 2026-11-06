# Hard rules for bootstrap-ts-monorepo

1. Never overwrite an existing file; merge and report conflicts.
2. Never print, copy or commit values from `.env` files.
3. Never modify application source, database schemas or existing `package.json` scripts beyond adding the five required scripts (`lint:fast`, `lint`, `typecheck`, `test:unit`, `build`) and the listed dependencies, and say so when it happens.
4. Run the Tier 2 chain exactly once at the end; no polling of any command.
5. Do not weaken any lint, typecheck or test requirement.

## Known failure modes to prevent

- One tool call per turn when calls are independent.
- Fragmented 45-line reads of one file.
- Several sequential edits to the same file.
- Implementing before reading the module's tests and Zod schemas.
- More than 6 `run_command` calls per task.
- Commands over 10 seconds that fall into background tasks.
- Whole-file reads of large files.
- Re-running the full suite after every edit.
- Exploratory environment discovery commands.
- Running `npm.cmd ci` without being asked.
- Duplicating AGENTS.md content into CLAUDE.md instead of importing it.

## Scope

Keep the skill narrow: no deploys, migrations or load tests. Do not put task-specific instructions into any CLAUDE.md.
