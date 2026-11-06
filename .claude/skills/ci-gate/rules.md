# ci-gate hard rules

Read before making any edit.

## Never

- **Weaken checks.** No editing lint/TS/test/build config (`eslint.config.*`, `.eslintrc*`, `tsconfig*.json`, `jest/vitest/vite/webpack.config.*`, `.npmrc`), no changing the `scripts` section of `package.json`, no suppression comments (`eslint-disable`, `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`, `istanbul ignore`, `c8 ignore`), no skipping, deleting or loosening tests or assertions, no raising `--max-warnings`.
- **Touch production.** Do not read or export production credentials, and do not point `DATABASE_URL` or similar at a production host. If a test needs a database, use only a local test database already configured for tests (`*_test`). If none exists, report the step as unverifiable.
- **Run destructive git commands.** Do not run `git push`, `git commit`, `git reset --hard`, `git clean` or `git checkout -- .` unless the user explicitly asks.
- **Delete** `node_modules` or the lockfile as a fix unless the user approves.
- **Add or upgrade dependencies** unless the failure is genuinely a missing or incompatible dependency. List every dependency change in the final report.
- **Poll background tasks.** Never call `manage_task` with `{"Action":"status"}` or `schedule` in a loop. Verification commands must run synchronously in foreground.
- **Exceed 3 repair rounds (3-Strike Circuit Breaker).** Stop immediately and report to user if a failure persists after 3 consecutive repair attempts.

## Verification Protocol

1. **Tier 1 (Inner Loop):** Batch all edits first. Prohibit full-repo checks during iteration. Run only targeted single-file checks: `npx.cmd eslint <modified-file>` and `npx.cmd vitest run <modified-spec-file> --reporter=dot`.
2. **Tier 2 (Outer Loop):** Execute full pipeline (`npm.cmd run lint:fast && npm.cmd run lint && npm.cmd run typecheck && npm.cmd run test:unit && npm.cmd run build`) exactly once in foreground as the final gate.
3. **No post-compaction re-runs:** If Tier 2 passed and compaction occurs with zero code changes since, conclude immediately.
