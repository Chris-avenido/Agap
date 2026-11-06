# Hard Rules for backend-integration-tests

## Non-negotiable Constraints

1. **Database Safety Gate:**
   - Run tests **only** against a local database explicitly approved by `scripts/check-test-db.mjs`.
   - Never run integration tests against a production database, the shared production VM, a staging database, or PgBouncer connection pools.
   - Any database URL hostname must strictly be `localhost`, `127.0.0.1`, or `::1`, and the database name must end in `_test` or `_local` (or match an entry in `apps/backend/.test-db-allowlist`).

2. **Secrets Protection:**
   - Never print, log, echo, or commit `.env` file contents, passwords, tokens, or connection credentials.
   - Scripts and test reports must report only the host and database name, redacting all credentials.

3. **No Auth/Lock Code Alteration:**
   - Never edit, modify, or loosen real auth (`src/middleware/authenticate.ts`) or real lock middleware code.
   - Swap auth and lock middlewares **only** through dependency injection at the composition root (`createApp(deps)`).

4. **No Backdoors in Production Code:**
   - Never use environment flags (e.g., `SKIP_AUTH`, `BYPASS_AUTH`, `DISABLE_LOCKS`), special request headers, or query parameters in application code to bypass auth or locks.
   - Any mechanism that bypasses auth based on runtime flags is strictly forbidden.

5. **Test Double Isolation:**
   - Test doubles (`test-auth.ts`, `test-lock.ts`) and test-support utilities must live exclusively under `tests/` or the skill's `assets/`.
   - Test doubles must never be imported or referenced by non-test application code or included in production build outputs (`dist/`).
   - Every double must carry the `/** TEST ONLY. Must never be imported outside tests/. */` guard comment.

6. **Redis / BullMQ Isolation:**
   - Never execute `FLUSHALL`, `FLUSHDB`, or flush an entire Redis instance.
   - All test queue and cache operations must use a dedicated, unique key prefix per test run (e.g., `test-<uuid>:`).
   - Only keys and jobs bearing the test run prefix may be cleaned up or drained.

7. **Integrity of Assertions:**
   - When a test reveals a real backend bug, do not weaken, skip, or delete the assertion to make the run green.
   - Keep the assertion failing (or mark with `it.fails` with explicit issue tracking notes) and report the backend bug in `docs/test-reports/backend-integration-report.md`.

## Known Failure Modes to Prevent

- **False-positive green suites:** Tests passing solely because auth was bypassed, without a complementary auth-contract test proving that real auth rejects unauthorized requests on protected endpoints.
- **Context mismatch:** Test doubles setting an arbitrary user shape that diverges from what `setAuthContext` / `getAuthContext` expects in production.
- **Shared test state / Race conditions:** Running integration tests with concurrency (`fileParallelism: true`) against a single shared test database causing flaky state pollution. Keep `fileParallelism: false`.
- **Redis leakages:** Dangling background jobs or left-over Redis keys polluting subsequent test runs due to missing prefix scoping.
- **Unbalanced route coverage:** Endpoints having only happy-path tests while omitting critical failure paths (validation errors, conflict handling, locked state).
- **Production leakage:** Test-only helper doubles accidentally bundled into `dist/` or imported by server routers.
