---
name: backend-integration-tests
description: Run and write backend end-to-end integration tests (Vitest + Supertest) that exercise real operations through Express, Drizzle/Postgres and the Redis/BullMQ buffer on a local test database, with the auth and lock middleware swapped for test doubles so they never block the test. Use when the user says things like 'run the backend integration tests', 'test my backend operations end to end without auth', 'add tests for the new endpoint, bypassing the auth and lock middleware', 'which routes have no integration test', or 'test the submission flow from request to database'. Not for browser tests (use e2e-failure-path-tests), load or capacity tests (use load-capacity-test), or security scans (use security-testing).
---

# backend-integration-tests

Executes and authors operation-level backend integration tests that verify HTTP requests, validation, business logic, PostgreSQL writes via Drizzle ORM, and BullMQ/Redis jobs against a local test database, with the application's real authentication and lock middlewares swapped for injectable test doubles at the composition root so tests are never blocked by auth checks, accompanied by dedicated contract tests that verify real authentication strictly rejects unauthorized requests on protected endpoints.

## Tooling Execution Rule

**Always run the scripts in `scripts/` directly** (`node .claude/skills/backend-integration-tests/scripts/<script>.mjs`) instead of writing new ad-hoc code or commands for the same job, and copy reusable files from `assets/` into `apps/backend/tests/integration/` instead of regenerating them from scratch.

## Workflow

1. **Safety Gate:**
   Run `node .claude/skills/backend-integration-tests/scripts/check-test-db.mjs`.
   If it exits 1, abort immediately and report the error; never continue against any database that is not approved as local and safe.

2. **Check the App Factory:**
   Confirm the backend exposes `createApp({ db, authMiddleware, lockMiddleware })` (or equivalent) that can be imported without listening on a network port.
   If it does not yet accept test double middlewares, review `reference/app-factory.md`, show the user the minimal composition-root diff, and apply it only after receiving explicit user approval. Never edit the internal implementation of `authenticate.ts` or lock middleware files.

3. **Install and Configure:**
   If `supertest` or `@types/supertest` is missing from `apps/backend/package.json`, add them to devDependencies. Ensure `apps/backend/package.json` contains `"test:integration": "vitest run --project integration"` (or points to `assets/vitest.integration.config.ts`), and that `apps/backend/vitest.config.ts` includes `tests/integration/**/*.test.ts`.

4. **Inventory Route Coverage:**
   Run `node .claude/skills/backend-integration-tests/scripts/list-route-coverage.mjs`.
   Inspect the output Markdown table and `docs/test-reports/route-coverage.json` to inventory every route, its detected middlewares (auth, lock), and whether happy-path and failure-path tests are present.

5. **Write Missing Tests:**
   For every uncovered route, starting with mutating routes (`POST`, `PUT`, `PATCH`, `DELETE`):
   - Copy `assets/test-auth.ts` and `assets/test-lock.ts` into `apps/backend/tests/integration/test-support/`.
   - Copy `assets/operation.test.template.ts` into `apps/backend/tests/integration/<feature>.operation.test.ts`.
   - Follow `reference/test-patterns.md` to implement at least one happy-path test asserting HTTP status, response body, Drizzle database rows, and BullMQ jobs.
   - Implement failure-path tests for invalid payload (422), duplicate submission / optimistic locking (409), held lock via `lockHeld` (409), and simulated database outage.

6. **Auth Contract Tests:**
   Ensure an integration test suite builds the app with the **real** authentication middleware (`apps/backend/tests/integration/auth-contract.test.ts`) and asserts that unauthenticated requests (missing token, invalid token) and wrong-role requests return 401 or 403 on every protected route. This guarantees test doubles never hide broken authentication.

7. **Leak Scan:**
   Run `node .claude/skills/backend-integration-tests/scripts/scan-test-double-leaks.mjs`.
   Confirm test doubles are never imported outside `tests/` and that no bypass environment flags or marker strings exist in source files or the production build (`dist/`).

8. **Execute Tests:**
   Run `npm run test:integration -w apps/backend`.
   Collect any failures. Fix broken tests or identify real backend defects. If a backend bug is discovered, do not weaken assertions; document it as a real defect in the report.

9. **Write Final Report:**
   Write the final report to `docs/test-reports/backend-integration-report.md`:
   - Summary totals (routes covered, happy/failure counts).
   - Route coverage table.
   - Identified backend bugs or discrepancies.
   - Unverifiable items.

## References and Rules

- `reference/app-factory.md`: Composition root dependency injection design.
- `reference/test-patterns.md`: Testing patterns for Postgres, Drizzle, BullMQ, and Redis.
- `rules.md`: Mandatory constraints, database safety rules, and failure modes to prevent.

## Acceptance Criteria

- `scripts/check-test-db.mjs` passed before any tests were executed.
- `npm run test:integration` exits 0.
- Every mutating route has at least one happy-path and one failure-path integration test, per `list-route-coverage.mjs`.
- The auth contract test passes with the real auth middleware and covers every protected route.
- `scripts/scan-test-double-leaks.mjs` reports zero leaks.
- The report exists at `docs/test-reports/backend-integration-report.md` and every referenced file path exists.

## Verification Step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the Vitest run output, the route coverage script, the leak scan and the test-database safety check, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
