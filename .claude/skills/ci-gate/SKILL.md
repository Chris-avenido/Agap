---
name: ci-gate
description: Runs the two-tier verification protocol (Tier 1 scoped checks during iteration, Tier 2 consolidated final CI gate). Enforces a 3-strike circuit breaker and prohibits autonomous polling loops. Use whenever verifying changes, running CI checks, or completing work.
---

# ci-gate: Two-Tier Verification Protocol

Refactored to eliminate exponential context window accumulation, avoid multi-turn polling loops, and enforce a 3-strike circuit breaker while preserving 100% of existing lint, typecheck, unit test, and build quality gates.

## Host Environment & Command Rules
- **Host Stack:** Windows PowerShell, Node.js v24.11.1.
- **Binary Invocation:** Always invoke `npm.cmd` and `npx.cmd` directly from workspace root.
- **Prohibited Discovery Commands:** Strictly ban exploratory discovery commands (`where vitest`, `dir /s /b node_modules\vitest.mjs`, `dir /b node_modules\.bin`, or unprompted `npm.cmd ci` / `npm.cmd install`).
- **Synchronous Execution Only:** Strictly ban background task polling (`manage_task status` or `schedule` loops). All commands must run synchronously in the foreground (`WaitMsBeforeAsync: 10000`).

---

## The Two-Tier Verification Protocol

### Tier 1 — Iterative Scoped Checks (Inner Loop)
Used *while developing, refactoring, and fixing code*:
1. **Batch Edits:** Batch all related file modifications across components, services, and tests before executing any CLI check. Do not run checks after each tiny edit.
2. **Prohibit Full-Repo Commands:** During iteration, never run `npm.cmd run lint`, `npm.cmd run typecheck`, full-suite `npm.cmd run test:unit`, or `npm.cmd run build`.
3. **Run Targeted Single-File Checks Only:**
   - Single-file Lint: `npx.cmd eslint <modified-file>`
   - Single-file Test: `npx.cmd vitest run <modified-spec-file> --reporter=dot`
   - Use concise output flags (`--reporter=dot`, `--silent`) so only failure traces enter the context buffer.

### Tier 2 — Consolidated Final CI Gate (Outer Loop)
Executed **exactly once** only after all planned edits and Tier 1 scoped checks pass:
1. **Single Chained Foreground Execution:**
   Execute the full verification pipeline in one chained foreground call:
   ```powershell
   npm.cmd run lint:fast && npm.cmd run lint && npm.cmd run typecheck && npm.cmd run test:unit && npm.cmd run build
   ```
   Or execute `node .claude/skills/ci-gate/scripts/run-gate.mjs --skip-install`.
2. **Acceptance Criteria:**
   - All five checks (`lint:fast`, `lint`, `typecheck`, `test:unit`, `build`) exit with code 0.
   - `node .claude/skills/ci-gate/scripts/guard-diff.mjs` exits with code 0 on the final diff.
   - Zero checks were skipped or suppressed.

---

## 3-Strike Circuit Breaker
If any Tier 1 or Tier 2 verification command fails:
1. Inspect the exact failure trace and apply the targeted fix.
2. If the same failure signature or command fails **3 consecutive repair attempts**, the agent must **immediately halt autonomous retries**.
3. Report the exact error trace, root cause analysis, and attempted remedies directly to the user for human guidance. Do not continue looping.

---

## Post-Compaction Amnesia Prevention
- When Tier 2 Final CI Gate passes, record the passing status and git diff state before concluding.
- If a context compaction (`CHECKPOINT`) occurs right after a green Tier 2 run and zero files have been modified since, conclude the response immediately; do not re-run the verification suite from scratch.
