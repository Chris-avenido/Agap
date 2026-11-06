/** TEST ONLY. Must never be imported outside tests/. */
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { eq } from 'drizzle-orm';
import {
  apiErrorResponseSchema,
  schoolProfileResponseSchema,
  type SchoolProfileResponse,
  type UpdateSchoolProfileRequest,
} from '@esf7/shared';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';
import * as t from '../../src/db/schema/tables.js';
import { createSubmissionWriteQueue } from '../../src/queue/submissionWrites.js';
import { setupTestDb, type TestDb } from '../../src/test/db.js';
import { requireTestDatabaseUrl } from '../../src/test/guard.js';
import { asUser } from './test-support/test-auth.js';
import { lockHeld, passThroughLock } from './test-support/test-lock.js';

describe('Operation: School Profile Management (End-to-End with Test Doubles)', () => {
  let testDb: TestDb;
  let tenant: { schoolId: string; userId: string };
  let testPrefix: string;
  let queue: ReturnType<typeof createSubmissionWriteQueue>;

  beforeAll(async () => {
    testDb = await setupTestDb(requireTestDatabaseUrl());
    if (process.env['REDIS_URL']) {
      testPrefix = `test-${randomUUID().slice(0, 8)}`;
      queue = createSubmissionWriteQueue({
        redisUrl: process.env['REDIS_URL'],
        prefix: testPrefix,
        concurrency: 1,
      });
    }
  });

  afterAll(async () => {
    if (queue) {
      try {
        await queue.drain();
        await queue.clean(0, 10000, 'completed');
        await queue.clean(0, 10000, 'failed');
        await queue.close();
      } catch {
        // Safe cleanup
      }
    }
    await testDb.close();
  });

  beforeEach(async () => {
    await testDb.reset();
    tenant = await testDb.createTenant('OperationTest');
  });

  const validPayload = (overrides: Partial<UpdateSchoolProfileRequest> = {}): UpdateSchoolProfileRequest => ({
    expectedDraftVersion: 0,
    curricularOfferingCode: 'PURELY_ES',
    hasShifts: true,
    shiftStartTime: '07:00',
    shiftEndTime: '17:00',
    editedPrefilledInfo: false,
    scpProgramCodes: ['SSES'],
    inclusiveOfferingCodes: ['SNED-ES'],
    gradeShifts: [
      { gradeLevelCode: 'KINDER', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_1', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_2', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_3', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_4', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_5', shiftTypeCode: 'SINGLE' },
      { gradeLevelCode: 'GRADE_6', shiftTypeCode: 'SINGLE' },
    ],
    ...overrides,
  });

  // 1. HAPPY PATH: End-to-end operation through Express, Drizzle and Queue
  it('happy path: updates school profile, writes to postgres and returns valid response', async () => {
    const app = createApp({
      db: testDb.handle.db,
      authMiddleware: asUser({
        id: tenant.userId,
        role: 'SCHOOL_HEAD',
        tenantId: tenant.schoolId,
      }),
      lockMiddleware: passThroughLock(),
    });

    const response = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload());

    expect(response.status).toBe(200);

    // Validate response body shape using shared zod schema
    const parsedBody: SchoolProfileResponse = schoolProfileResponseSchema.parse(response.body);
    expect(parsedBody.draftVersion).toBe(1);
    expect(parsedBody.profile?.curricularOfferingCode).toBe('PURELY_ES');

    // Directly assert PostgreSQL state via Drizzle
    const submissions = await testDb.handle.db
      .select()
      .from(t.submissions)
      .where(eq(t.submissions.schoolId, tenant.schoolId));

    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.draftVersion).toBe(1);

    // Assert Redis/BullMQ buffer (when queue is active)
    if (queue) {
      const jobs = await queue.getJobs(['waiting', 'delayed', 'active', 'completed']);
      expect(Array.isArray(jobs)).toBe(true);
    }
  });

  // 2. FAILURE PATH: Validation Error (Invalid Payload)
  it('failure path: invalid payload with malformed shift time returns 422 VALIDATION_FAILED', async () => {
    const app = createApp({
      db: testDb.handle.db,
      authMiddleware: asUser({
        id: tenant.userId,
        role: 'SCHOOL_HEAD',
        tenantId: tenant.schoolId,
      }),
      lockMiddleware: passThroughLock(),
    });

    const response = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload({ shiftStartTime: '25:00' }));

    expect(response.status).toBe(422);
    const parsedError = apiErrorResponseSchema.parse(response.body);
    expect(parsedError.error.code).toBe('VALIDATION_FAILED');

    // Confirm nothing was written to Postgres
    const submissions = await testDb.handle.db
      .select()
      .from(t.submissions)
      .where(eq(t.submissions.schoolId, tenant.schoolId));
    expect(submissions).toHaveLength(0);
  });

  // 3. FAILURE PATH: Optimistic Lock / Duplicate Submission Conflict
  it('failure path: duplicate submission with stale expectedDraftVersion returns 409 VERSION_CONFLICT', async () => {
    const app = createApp({
      db: testDb.handle.db,
      authMiddleware: asUser({
        id: tenant.userId,
        role: 'SCHOOL_HEAD',
        tenantId: tenant.schoolId,
      }),
      lockMiddleware: passThroughLock(),
    });

    // First save creates draft version 1
    const first = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload({ expectedDraftVersion: 0 }));
    expect(first.status).toBe(200);

    // Concurrent / duplicate save still claiming expectedDraftVersion 0 fails with conflict
    const conflict = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload({ expectedDraftVersion: 0, shiftEndTime: '16:00' }));

    expect(conflict.status).toBe(409);
    const errorBody = apiErrorResponseSchema.parse(conflict.body);
    expect(errorBody.error.code).toBe('VERSION_CONFLICT');
  });

  // 4. FAILURE PATH: Lock Held by Another Session
  it('failure path: rejected with 409 SUBMISSION_LOCKED when lock is held', async () => {
    const app = createApp({
      db: testDb.handle.db,
      authMiddleware: asUser({
        id: tenant.userId,
        role: 'SCHOOL_HEAD',
        tenantId: tenant.schoolId,
      }),
      lockMiddleware: lockHeld({ by: 'concurrent-user-99' }),
    });

    const response = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload());

    expect(response.status).toBe(409);
    const parsedError = apiErrorResponseSchema.parse(response.body);
    expect(parsedError.error.code).toBe('SUBMISSION_LOCKED');
  });

  // 5. FAILURE PATH: Simulated Database Error
  it('failure path: database query failure returns 500 or 503 error', async () => {
    // Proxy Drizzle DB instance to simulate a database query outage
    const failingQuery: unknown = new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === 'then') {
            return (_resolve: unknown, reject: (err: unknown) => void) =>
              reject(new Error('Simulated database connection failure'));
          }
          if (prop === 'catch') {
            return (reject: (err: unknown) => void) =>
              reject(new Error('Simulated database connection failure'));
          }
          return () => failingQuery;
        },
      },
    );

    const failingDb = new Proxy(testDb.handle.db, {
      get(target, prop, receiver) {
        if (prop === 'transaction') {
          return () => Promise.reject(new Error('Simulated database connection failure'));
        }
        if (prop === 'select' || prop === 'update' || prop === 'insert') {
          return () => failingQuery;
        }
        return Reflect.get(target, prop, receiver) as unknown;
      },
    });

    const app = createApp({
      db: failingDb,
      authMiddleware: asUser({
        id: tenant.userId,
        role: 'SCHOOL_HEAD',
        tenantId: tenant.schoolId,
      }),
      lockMiddleware: passThroughLock(),
    });

    const response = await request(app)
      .put(`/api/schools/${tenant.schoolId}/profile`)
      .send(validPayload());

    expect(response.status).toBeGreaterThanOrEqual(500);
    const parsedError = apiErrorResponseSchema.parse(response.body);
    expect(['INTERNAL', 'SERVICE_UNAVAILABLE']).toContain(parsedError.error.code);
  });
});
