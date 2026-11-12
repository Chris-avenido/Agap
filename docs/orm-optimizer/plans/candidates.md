# Candidate query sites (static, unverified)

Scanned 78 files under `agap_applicant`; schema: `not found` (0 tables parsed). Pooler hint in repo: no.
Every row is a **candidate**, not a conclusion. Nothing here is proven slow until EXPLAIN ANALYZE says so. `tier`: app = request-path code, script = one-off code.
One-off scripts excluded by default: **3 hits not listed** (rerun with `--include-scripts` to list them). By location: backend/scripts (1), database (2).

## Grouped by pattern and file (2 groups, 38 sites)

| Group | Sites |
|---|---|
| select-all:backend/src/applicants/applicants.service.ts | 33 |
| query-in-loop:database/export-backup.js | 5 |

## All sites

| # | file:line | pattern | access_layer | tier | note | snippet |
|---|---|---|---|---|---|---|
| 1 | backend/src/applicants/applicants.service.ts:336 | select-all | raw-pg | app | SELECT * in raw SQL | `const result = await pool.query('SELECT * FROM applicants WHERE id = $1', [` |
| 2 | backend/src/applicants/applicants.service.ts:357 | select-all | raw-pg | app | SELECT * in raw SQL | `const result = await pool.query(` |
| 3 | backend/src/applicants/applicants.service.ts:612 | select-all | raw-pg | app | SELECT * in raw SQL | `const result = await pool.query(` |
| 4 | backend/src/applicants/applicants.service.ts:1224 | select-all | raw-pg | app | SELECT * in raw SQL | `const appRes = await client.query(` |
| 5 | backend/src/applicants/applicants.service.ts:1500 | select-all | raw-pg | app | SELECT * in raw SQL | `const appRes = await client.query(` |
| 6 | backend/src/applicants/applicants.service.ts:1689 | select-all | raw-pg | app | SELECT * in raw SQL | `const result = await db.query(` |
| 7 | backend/src/applicants/applicants.service.ts:1721 | select-all | raw-pg | app | SELECT * in raw SQL | `const result = await pool.query(` |
| 8 | backend/src/applicants/applicants.service.ts:1743 | select-all | raw-pg | app | SELECT * in raw SQL | `const incRes = await db.query(` |
| 9 | backend/src/applicants/applicants.service.ts:1761 | select-all | raw-pg | app | SELECT * in raw SQL | `const incByAppPlantilla = await db.query(` |
| 10 | backend/src/applicants/applicants.service.ts:1769 | select-all | raw-pg | app | SELECT * in raw SQL | `const incByName = await db.query(` |
| 11 | backend/src/applicants/applicants.service.ts:1824 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisRes = await pool.query(` |
| 12 | backend/src/applicants/applicants.service.ts:1834 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcRes = await pool.query(` |
| 13 | backend/src/applicants/applicants.service.ts:1912 | select-all | raw-pg | app | SELECT * in raw SQL | `const incRes = await pool.query(` |
| 14 | backend/src/applicants/applicants.service.ts:1927 | select-all | raw-pg | app | SELECT * in raw SQL | `const incByName = await pool.query(` |
| 15 | backend/src/applicants/applicants.service.ts:1944 | select-all | raw-pg | app | SELECT * in raw SQL | `const incByEmail = await pool.query(` |
| 16 | backend/src/applicants/applicants.service.ts:1960 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisOnly = await pool.query(` |
| 17 | backend/src/applicants/applicants.service.ts:2646 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcRes = await pool.query(` |
| 18 | backend/src/applicants/applicants.service.ts:2654 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisRes = await pool.query(` |
| 19 | backend/src/applicants/applicants.service.ts:2735 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisRes = await pool.query(` |
| 20 | backend/src/applicants/applicants.service.ts:2787 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcRes = await pool.query(` |
| 21 | backend/src/applicants/applicants.service.ts:2950 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisRes = await pool.query(` |
| 22 | backend/src/applicants/applicants.service.ts:3003 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcRes = await pool.query(` |
| 23 | backend/src/applicants/applicants.service.ts:3405 | select-all | raw-pg | app | SELECT * in raw SQL | `let appRes = await pool.query(` |
| 24 | backend/src/applicants/applicants.service.ts:3446 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcRes = await pool.query(` |
| 25 | backend/src/applicants/applicants.service.ts:3525 | select-all | raw-pg | app | SELECT * in raw SQL | `const incRes = await pool.query(` |
| 26 | backend/src/applicants/applicants.service.ts:3631 | select-all | raw-pg | app | SELECT * in raw SQL | `const incRes = await client.query(` |
| 27 | backend/src/applicants/applicants.service.ts:3674 | select-all | raw-pg | app | SELECT * in raw SQL | `const appRes = await client.query(` |
| 28 | backend/src/applicants/applicants.service.ts:3753 | select-all | raw-pg | app | SELECT * in raw SQL | `const gmisRes = await client.query(` |
| 29 | backend/src/applicants/applicants.service.ts:3763 | select-all | raw-pg | app | SELECT * in raw SQL | `const existingGcRes = await client.query(` |
| 30 | backend/src/applicants/applicants.service.ts:3817 | select-all | raw-pg | app | SELECT * in raw SQL | `const appRes = await client.query(` |
| 31 | backend/src/applicants/applicants.service.ts:4022 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcCheck = await pool.query(` |
| 32 | backend/src/applicants/applicants.service.ts:4031 | select-all | raw-pg | app | SELECT * in raw SQL | `const gcCheckByName = await pool.query(` |
| 33 | backend/src/applicants/applicants.service.ts:4106 | select-all | raw-pg | app | SELECT * in raw SQL | `docsRes = await pool.query(` |
| 34 | database/export-backup.js:331 | query-in-loop | raw-pg | app | query call lexically inside a loop/callback (N+1 candidate) | `const colRes = await client.query('` |
| 35 | database/export-backup.js:353 | query-in-loop | raw-pg | app | query call lexically inside a loop/callback (N+1 candidate) | `const pkRes = await client.query('` |
| 36 | database/export-backup.js:403 | query-in-loop | raw-pg | app | query call lexically inside a loop/callback (N+1 candidate) | `await client.query('DECLARE "${cursorName}" NO SCROLL CURSOR FOR SELECT * FROM "${table}";');` |
| 37 | database/export-backup.js:421 | query-in-loop | raw-pg | app | query call lexically inside a loop/callback (N+1 candidate) | `const fetchRes = await client.query('FETCH ${batchSize} FROM "${cursorName}";');` |
| 38 | database/export-backup.js:443 | query-in-loop | raw-pg | app | query call lexically inside a loop/callback (N+1 candidate) | `await client.query('CLOSE "${cursorName}";');` |
