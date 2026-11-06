// Deliberately bad Drizzle schema + data access. Used only by selftest.mjs.
import { pgTable, uuid, serial, text, timestamp, jsonb, integer, uniqueIndex } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export const submissions = pgTable(
  'submissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id),
    title: text('title').notNull(),
    status: text('status').notNull(),
    rawPayload: jsonb('raw_payload'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [uniqueIndex('submissions_title_uq').on(t.title)],
);

export const submissionEvents = pgTable('submission_events', {
  id: serial('id').primaryKey(),
  submissionId: uuid('submission_id')
    .notNull()
    .references(() => submissions.id, { onDelete: 'cascade' }),
  kind: text('kind').notNull(),
  attempt: integer('attempt').notNull(),
});

const client = postgres('postgres://app:secret@localhost:6432/app');
export const db = drizzle(client);

export async function lockAll(ids: string[]) {
  return db.transaction(async (tx) => {
    for (const id of ids) {
      await tx.select().from(submissions).where(eq(submissions.id, id)).for('update');
    }
    return tx.select().from(submissions).limit(10).offset(20);
  });
}
