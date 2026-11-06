// Same domain as bad-schema.ts, written correctly. Used only by selftest.mjs.
import { pgTable, uuid, bigint, text, timestamp, integer, uniqueIndex, index, sql } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { and, eq, asc } from 'drizzle-orm';

export const EVENT_RETENTION_DAYS = 90; // submission_events: retention policy

const RETRYABLE_SQLSTATES = new Set(['40P01', '40001']);

export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().default(sql`uuidv7()`),
  name: text('name').notNull(),
});

export const submissions = pgTable(
  'submissions',
  {
    id: uuid('id').primaryKey().default(sql`uuidv7()`),
    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, { onDelete: 'restrict' }),
    title: text('title').notNull(),
    status: text('status').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex('submissions_school_title_uq').on(t.schoolId, t.title),
    index('submissions_school_created_idx').on(t.schoolId, t.createdAt),
  ],
).enableRLS();

export const submissionEvents = pgTable(
  'submission_events',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    submissionId: uuid('submission_id')
      .notNull()
      .references(() => submissions.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    attempt: integer('attempt').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('submission_events_submission_idx').on(t.submissionId),
    index('submission_events_created_brin').using('brin', t.createdAt),
  ],
);

const client = postgres('postgres://localhost:6432/app', {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
  connection: { statement_timeout: 30000, idle_in_transaction_session_timeout: 10000 },
});
export const db = drizzle(client);

export function isRetryable(code: string) {
  return RETRYABLE_SQLSTATES.has(code);
}

export async function lockAll(ids: string[], schoolId: string) {
  return db.transaction(async (tx) => {
    const rows = await tx
      .select()
      .from(submissions)
      .where(and(eq(submissions.schoolId, schoolId)))
      .orderBy(asc(submissions.id))
      .for('no key update');
    return rows.filter((r) => ids.includes(r.id));
  });
}
