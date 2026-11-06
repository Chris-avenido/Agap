import express from 'express';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, redis } from './db';
import { schools, staff, audit } from './schema';

export const app = express();
app.use(express.json());
const schoolBody = z.object({ name: z.string(), region: z.string(), code: z.string() });
const staffBody = z.object({ schoolId: z.string().uuid(), fullName: z.string(), position: z.string().optional() });
const nameBody = z.object({ name: z.string() });
const actionBody = z.object({ action: z.string() });

app.post('/api/schools', async (req, res) => { // R01 write not awaited
  const b = schoolBody.parse(req.body);
  db.insert(schools).values({ name: b.name, region: b.region, code: b.code });
  res.status(201).json({ ok: true });
});
app.post('/api/staff', async (req, res) => { // R02 error swallowed
  const b = staffBody.parse(req.body);
  try {
    await db.insert(staff).values({ schoolId: b.schoolId, fullName: b.fullName, position: b.position });
  } catch (e) { console.log(e); }
  res.status(201).json({ ok: true });
});
app.post('/api/audit', async (req, res) => { // R03 response before write
  const b = actionBody.parse(req.body);
  res.status(200).json({ ok: true });
  await db.insert(audit).values({ action: b.action });
});
app.post('/api/staff/draft', async (req, res) => { // R04 position never written
  const b = staffBody.parse(req.body);
  await db.insert(staff).values({ schoolId: b.schoolId, fullName: b.fullName });
  res.status(201).json({ ok: true });
});
app.post('/api/schools/quick', async (req, res) => { // R05 region and code missing
  const b = nameBody.parse(req.body);
  await db.insert(schools).values({ name: b.name });
  res.status(201).json({ ok: true });
});
app.delete('/api/staff/:id', async (req, res) => { // R06 no row check
  await db.delete(staff).where(eq(staff.id, req.params.id));
  res.status(204).end();
});
app.post('/api/schools/with-staff', async (req, res) => { // R07 two tables, no transaction
  const b = schoolBody.parse(req.body);
  const [s] = await db.insert(schools).values({ name: b.name, region: b.region, code: b.code }).returning();
  await db.insert(staff).values({ schoolId: s.id, fullName: 'Head' });
  res.status(201).json(s);
});
app.post('/api/events', async (req, res) => { // R08 buffered, no consumer
  await redis.rpush('pending-events', JSON.stringify(req.body));
  res.status(202).json({ queued: true });
});
app.post('/api/schools/safe', async (req, res, next) => { // correct: transaction, checked, rethrown
  try {
    const b = schoolBody.parse(req.body);
    const row = await db.transaction(async (tx) => {
      const [s] = await tx.insert(schools).values({ name: b.name, region: b.region, code: b.code }).returning();
      await tx.insert(staff).values({ schoolId: s.id, fullName: 'Head' });
      return s;
    });
    res.status(201).json(row);
  } catch (err) { next(err); }
});
app.put('/api/staff/:id/position', async (req, res) => { // correct: row checked
  const b = z.object({ position: z.string() }).parse(req.body);
  const [row] = await db.update(staff).set({ position: b.position }).where(eq(staff.id, req.params.id)).returning();
  if (!row) { res.status(404).json({ error: 'not found' }); return; }
  res.json(row);
});
