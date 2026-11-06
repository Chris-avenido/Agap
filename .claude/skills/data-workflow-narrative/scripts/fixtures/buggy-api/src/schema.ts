import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  region: text('region').notNull(),
  code: text('code').notNull(),
});
export const staff = pgTable('staff', {
  id: uuid('id').primaryKey().defaultRandom(),
  schoolId: uuid('school_id').notNull().references(() => schools.id),
  fullName: text('full_name').notNull(),
  position: text('position'),
});
export const audit = pgTable('audit', {
  id: uuid('id').primaryKey().defaultRandom(),
  action: text('action').notNull(),
});
