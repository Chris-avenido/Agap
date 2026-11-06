# Backend Integration Test Patterns

This reference documents recommended patterns and practices for writing robust, end-to-end integration tests using Vitest, Supertest, Drizzle ORM, and BullMQ/Redis.

---

## 1. Test Architecture & Structure

Each integration test exercises an HTTP route through Express down to PostgreSQL and Redis/BullMQ:
- Instantiate `createApp({ db, authMiddleware: asUser(...), lockMiddleware: passThroughLock() })`.
- Make calls using `request(app)` from `supertest`.
- Make direct assertions against database tables using Drizzle ORM (`testDb.handle.db`).
- Check any asynchronous BullMQ jobs placed on the queue.

```
Supertest HTTP Request ──► Express Route ──► Middleware (Test Doubles)
                                                     │
                                                     ▼
                                          Validation / Service
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             ▼                                               ▼
                     Drizzle / Postgres                               Redis / BullMQ
                  (Direct Table Assertions)                        (Queue Job Assertions)
```

---

## 2. Test Doubles: Auth and Locks

### User Injection with `asUser`
Use `asUser({ id, role, tenantId })` to set the exact `AuthContext` expected by `getAuthContext(req)`:
```typescript
const app = createApp({
  db: testDb.handle.db,
  authMiddleware: asUser({
    id: user.id,
    role: 'SCHOOL_HEAD',
    tenantId: school.id,
  }),
  lockMiddleware: passThroughLock(),
});
```

### Unauthenticated Simulation with `asAnonymous`
Use `asAnonymous()` to test endpoints that require authentication when unauthenticated:
```typescript
const app = createApp({
  db: testDb.handle.db,
  authMiddleware: asAnonymous(),
  lockMiddleware: passThroughLock(),
});
```

### Lock Conflict Simulation with `lockHeld`
To assert 409 responses when an edit lock or submission lock is active:
```typescript
const app = createApp({
  db: testDb.handle.db,
  authMiddleware: asUser({ id: user.id, role: 'SCHOOL_HEAD', tenantId: school.id }),
  lockMiddleware: lockHeld({ by: 'another-user' }),
});
```

---

## 3. Database Patterns: Assertions, Cleanup, and Failures

### Direct Postgres Assertions with Drizzle
Never rely solely on the HTTP response body. Always query the database to verify state transitions:
```typescript
const rows = await testDb.handle.db
  .select()
  .from(t.submissions)
  .where(eq(t.submissions.schoolId, school.id));

expect(rows).toHaveLength(1);
expect(rows[0].draftVersion).toBe(1);
```

### Database Cleanup Strategy
- In `beforeEach`, use `await testDb.reset()` which runs `TRUNCATE ... CASCADE` on transactional tables.
- Preserves lookup reference tables, school years, and base policies.
- Execute test suites with `fileParallelism: false` so multiple suites do not collide on the shared test database.

### Simulating Database Errors
To simulate database disconnections, statement timeouts, or query errors without bringing down PostgreSQL:
```typescript
const failingDb = new Proxy(testDb.handle.db, {
  get(target, prop, receiver) {
    if (prop === 'transaction' || prop === 'select' || prop === 'update' || prop === 'insert') {
      return () => Promise.reject(new Error('simulated query failure'));
    }
    return Reflect.get(target, prop, receiver);
  },
});

const app = createApp({
  db: failingDb,
  authMiddleware: asUser({ id: user.id, role: 'SCHOOL_HEAD', tenantId: school.id }),
  lockMiddleware: passThroughLock(),
});
```

---

## 4. Redis and BullMQ Queue Isolation

### Unique Prefix per Test Run
Never use the production prefix or shared queues across tests. Always generate a unique prefix:
```typescript
import { randomUUID } from 'node:crypto';

const testPrefix = `test-${randomUUID().slice(0, 8)}`;
const queue = createSubmissionWriteQueue({
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379/0',
  prefix: testPrefix,
  concurrency: 1,
});
```

### Asserting Queued Jobs
```typescript
const jobs = await queue.getJobs(['waiting', 'delayed', 'active']);
expect(jobs).toHaveLength(1);
expect(jobs[0].data).toMatchObject({
  kind: 'school-profile.update',
  schoolId: school.id,
});
```

### Safe Cleanup (Never `FLUSHALL`)
Never run `redis.flushall()` or `redis.flushdb()`. Only drain and remove jobs associated with the test prefix:
```typescript
afterAll(async () => {
  await queue.drain();
  await queue.clean(0, 10000, 'completed');
  await queue.clean(0, 10000, 'failed');
  await queue.close();
});
```

---

## 5. Concurrency and Conflict Patterns

### Duplicate Submissions / Optimistic Locking
Verify that two concurrent operations with the same version conflict cleanly:
```typescript
const [res1, res2] = await Promise.all([
  request(app).put(`/api/schools/${school.id}/profile`).send(payload(1)),
  request(app).put(`/api/schools/${school.id}/profile`).send(payload(1)),
]);

const statuses = [res1.status, res2.status].sort();
expect(statuses).toEqual([200, 409]);
```

---

## 6. Test Naming Conventions for Coverage Classification

`scripts/list-route-coverage.mjs` scans test files for HTTP calls and parses surrounding `describe` and `it` titles to classify happy vs. failure paths.

- **Happy-path tests:**
  - Standard behavior descriptions without error keywords.
  - Examples:
    - `it('happy path: updates school profile and increments version')`
    - `it('creates new draft record successfully')`

- **Failure-path tests:**
  - Must include at least one of these keywords in the `it(...)` or `describe(...)` description:
    - `"failure"`, `"invalid"`, `"duplicate"`, `"locked"`, `"conflict"`, or `"error"`.
  - Examples:
    - `it('invalid payload: rejects malformed shift start time with 422')`
    - `it('duplicate submission returns 409 conflict')`
    - `it('rejects when lock held by another session')`
    - `it('simulated database error returns 500 or 503')`

---

## 7. Handling Discovered Backend Bugs

When an integration test uncovers an unexpected backend issue:
1. **Never weaken or delete the test assertion** to force the test suite to pass.
2. Mark the test using `it.fails('...', () => { ... })` or keep it failing while documenting the bug.
3. Record full details in `docs/test-reports/backend-integration-report.md` under **Backend Bugs Found**:
   - HTTP method & route.
   - Expected behavior vs. Actual response.
   - Root cause file and line number.
   - Severity and suggested remedy.
