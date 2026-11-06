#!/usr/bin/env node
// selftest.mjs - checks scan-repo.mjs and compute-score.mjs against the bundled fixtures.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCAN = path.join(HERE, 'scan-repo.mjs');
const SCORE = path.join(HERE, 'compute-score.mjs');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'scorecard-selftest-'));
const errors = [];
const run = (script, args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });

function scanFixture(label, file) {
  const repo = path.join(tmp, label);
  fs.mkdirSync(path.join(repo, 'src', 'db'), { recursive: true });
  fs.mkdirSync(path.join(repo, 'drizzle', 'meta'), { recursive: true });
  fs.copyFileSync(path.join(HERE, 'fixtures', file), path.join(repo, 'src', 'db', 'schema.ts'));
  fs.writeFileSync(path.join(repo, 'drizzle', '0000_init.sql'), 'CREATE TABLE "schools" ("id" uuid PRIMARY KEY);\n');
  fs.writeFileSync(path.join(repo, 'drizzle', 'meta', '_journal.json'), JSON.stringify({ entries: [{ idx: 0, tag: '0000_init' }] }));
  const out = path.join(tmp, `${label}.json`);
  const r = run(SCAN, [repo, '--out', out, '--include-fixtures']);
  if (r.status !== 0) {
    errors.push(`scanner failed on ${file}: ${r.stderr}`);
    return null;
  }
  const first = fs.readFileSync(out, 'utf8');
  const again = run(SCAN, [repo, '--out', out + '.2', '--include-fixtures']);
  const strip = (s) => JSON.stringify(JSON.parse(s), (k, v) => (k === 'scannedAt' ? undefined : v));
  if (again.status !== 0 || strip(first) !== strip(fs.readFileSync(out + '.2', 'utf8'))) errors.push(`scanner output is not deterministic for ${file}`);
  return JSON.parse(first);
}

const bad = scanFixture('bad', 'bad-schema.ts');
const good = scanFixture('good', 'good-schema.ts');

const EXPECT_BAD = ['PK001', 'PK002', 'IDX001', 'IDX002', 'CON001', 'CON002', 'CON004', 'MOD001', 'MOD002', 'LCK001', 'ORM001', 'ORM003', 'POOL002'];
if (bad) {
  const got = new Set(bad.hits.map((h) => h.ruleId));
  const missing = EXPECT_BAD.filter((r) => !got.has(r));
  if (missing.length) errors.push(`bad-schema.ts: expected rules not fired: ${missing.join(', ')}`);
}
const POSITIVE = new Set(['LCK002', 'LCK006', 'CON003', 'OPS001', 'OPS002', 'OPS003', 'OPS004']);
if (good) {
  const got = new Set(good.hits.map((h) => h.ruleId));
  if (!got.has('LCK002')) errors.push('good-schema.ts: LCK002 (positive signal) not fired');
  const negatives = good.hits.filter((h) => !POSITIVE.has(h.ruleId));
  if (negatives.length) errors.push(`good-schema.ts: negative rules fired: ${negatives.map((h) => `${h.ruleId}@${h.file}:${h.line}`).join(', ')}`);
  const pk = good.tables.find((t) => t.name === 'submissions');
  if (!pk || pk.primaryKey.kind !== 'uuid-v7') errors.push('good-schema.ts: submissions PK should be detected as uuid-v7');
}

// scorer
const fixturesDir = path.join(HERE, 'fixtures');
const mkFinding = (id, sev, rule, crit) => ({
  id, ruleId: rule, severity: sev, tableRole: 'high-volume',
  evidence: [{ file: 'bad-schema.ts', line: 1 }],
  problem: `problem ${id}`, whyItMattersHere: 'reason', recommendation: 'fix', effort: 'S',
});
function card(mutate) {
  const criteria = Object.keys(JSON.parse(fs.readFileSync(path.join(HERE, 'weights.json'), 'utf8')).criteria).map((id) => ({
    id, applicable: true, score: 10, confidence: 'medium', summary: 'ok', findings: [],
  }));
  criteria[0].score = 7.5;
  criteria[0].findings = [mkFinding('F1', 'high', 'PK001', 'C1')];
  const c = {
    repo: { name: 'selftest', path: fixturesDir, commit: 'abc123', date: '2026-01-01' },
    profile: { purpose: 'test', objectives: ['o'], workload: 'mixed', tenancy: 'shared-schema', scaleTarget: 'small', postgresVersion: 'unknown', pooler: 'unknown', confidence: 'medium', assumptions: [], verdict: 'v' },
    criteria,
    strengths: [{ criterion: 'C4', note: 'n', evidence: 'good-schema.ts:1' }],
    unverifiable: [{ item: 'autovacuum', why: 'needs live db', handoffSkill: 'pg-health-assessment' }],
    method: { scannerVersion: '1.0.0', rulesFired: ['PK001'], limitations: ['x'] },
  };
  if (mutate) mutate(c);
  return c;
}
function runCard(name, c) {
  const p = path.join(tmp, name);
  fs.writeFileSync(p, JSON.stringify(c));
  return run(SCORE, [p, '--check']);
}
const ok = runCard('valid.json', card());
if (ok.status !== 0) errors.push(`valid scorecard rejected: ${ok.stdout}${ok.stderr}`);
const invalid = runCard('invalid.json', card((c) => c.criteria.pop()));
if (invalid.status !== 2) errors.push(`invalid scorecard (missing C10) should exit 2, got ${invalid.status}`);
const far = runCard('far.json', card((c) => { c.criteria[0].score = 10; }));
if (far.status !== 2) errors.push(`score 2.5 above suggested without reason should exit 2, got ${far.status}`);
const noEv = runCard('noev.json', card((c) => { c.criteria[0].findings[0].evidence = []; }));
if (noEv.status !== 2) errors.push(`finding without evidence should exit 2, got ${noEv.status}`);
const rep = path.join(tmp, 'out', 'report.md');
const full = run(SCORE, [path.join(tmp, 'valid.json'), '--out', rep]);
if (full.status !== 0 || !fs.existsSync(rep)) errors.push(`report render failed: ${full.stderr}`);
else {
  const md = fs.readFileSync(rep, 'utf8');
  const order = ['## Repo Profile', '## Overall score', '## Criteria', '## Top 10 recommendations', '## Roadmap', '## Findings by criterion', '## Strengths', '## Unverifiable from the repo', '## Method and limitations'];
  let last = -1;
  for (const h of order) {
    const i = md.indexOf(h);
    if (i <= last) errors.push(`report section out of order or missing: ${h}`);
    last = i;
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
if (errors.length) {
  console.error('SELFTEST FAILED');
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}
console.log('selftest OK');
