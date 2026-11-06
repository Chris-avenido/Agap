# AGENTS.md rule text (copy verbatim into the target repo's AGENTS.md)

Everything below the line is the text to copy.

---

## Hard rules

1. Never print or commit secrets from `.env` files.
2. Every schema change is generated with drizzle-kit, rehearsed on a local or scratch database with realistic data and shown with a rollback plan before it goes to any shared database (detail in `docs/db-changes.md`).
3. Done means green: the Tier 2 gate has passed.
4. Never touch the production DB or VM without asking.

## Parallel Tool Batching Mandate

Goal: raise multi-tool batching from 0% to over 60% of turns and cut planner turns about 3x.

1. Discovery batching: when searching or inspecting multiple files, emit 3 to 6 parallel `grep_search` and/or `view_file` calls in a single turn whenever the calls do not depend on each other's output.
2. Cross-layer edit batching: once discovery is done, emit `multi_replace_file_content` or `replace_file_content` calls across backend, shared and frontend files in parallel in the same turn, not one file per turn.
3. Single-file edit consolidation: never make several sequential `replace_file_content` turns on the same file; use one `multi_replace_file_content` with all ReplacementChunks for that file.

## Search-First, Targeted-Slice Protocol (cohesive windows)

Before reading any file over 250 lines, use `grep_search` to find line numbers, then `view_file` with explicit StartLine/EndLine using a cohesive 150-250 line window so a whole component, function or service method is captured in one read (not 45-line micro-slices, and not the 800-line default). If several non-contiguous sections of a large file are needed after a grep, request all ranges as parallel `view_file` calls in one turn. Never re-read a file in the same session if it is already in context and unmodified.

## Pre-Edit Test & Schema Contract Rule

In the discovery turn, before writing any implementation code, batch-read the target module's existing unit test specs and Zod schemas together with the source files, so data transformations (for example schema uppercase transforms) and test assertions are satisfied on the first edit pass.

## Two-Tier Verification

**Tier 1 inner loop.** Batch all related edits first, then verify with one chained foreground command scoped to modified files so it finishes in under 5 seconds and never transitions to a background task (commands over 10,000 ms do):

`npx.cmd eslint <modified-file-1> <modified-file-2> && npm.cmd run test:unit -w apps/frontend -- <modified-spec-file> --reporter=dot`

Use `-w apps/backend` for backend specs. No full-repo builds or suites in the inner loop.

**Tier 2 outer loop (the ci-gate skill).**

`npm.cmd run lint:fast && npm.cmd run lint && npm.cmd run typecheck && npm.cmd run test:unit -- --reporter=dot && npm.cmd run build`

Run exactly once, as one consolidated foreground command, at the very end of the task and only after all changes and Tier 1 checks pass. If `lint` already covers `lint:fast`, drop the redundant `lint:fast` pass; never drop a gate that is not covered.

**Run-command cap.** Target at most 6 `run_command` calls per task; never run an individual CLI command after every single file edit.

## Context payload hygiene (silent-reporter rule)

Append `--silent` or `--reporter=dot` to every `npm.cmd` and vitest call so passing test lines (700 or more) do not inflate the context.

## 3-Strike Circuit Breaker

After 3 consecutive failed repair attempts on any Tier 1 or Tier 2 command, stop autonomous retries and report the exact error trace.

## Execution and polling prohibition

No `manage_task {"Action":"status"}` and no schedule polling for test, lint, typecheck or build. Run all verification synchronously in the foreground with concise flags (`--silent`, `--reporter=dot`).

## Environment Execution Profile

Windows, PowerShell, Node.js v24.11.1. Always `npm.cmd` and `npx.cmd` from the workspace root. Do not run `where vitest`, `dir /s /b node_modules\vitest.mjs` or `dir /b node_modules\.bin`, and no unprompted `npm.cmd ci` or `npm.cmd install`.

## Post-compaction rule

When Tier 2 passes, record the passing status and git diff state. If a CHECKPOINT compaction follows a green Tier 2 with zero files modified since, conclude instead of re-running verification.

## No weakening

No ESLint rule, TypeScript strictness setting or unit test requirement may be weakened.
