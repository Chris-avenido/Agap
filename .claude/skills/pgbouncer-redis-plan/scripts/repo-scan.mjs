#!/usr/bin/env node
// Deterministic, read-only repo fingerprint. Node 18+, zero dependencies.
// Usage: node repo-scan.mjs [--root <dir>] [--max-files <n>]
//        node repo-scan.mjs --check-report <markdown file> [--root <dir>]
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d;
};
const root = path.resolve(opt('root', '.'));
const maxFiles = Number(opt('max-files', 4000));
const checkReport = opt('check-report');
const CAP = 25;
const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.turbo', '.logs', '.claude', '.agents', 'fixtures', '__fixtures__']);
const CODE = /\.(m?[jt]sx?|cjs|sql|ya?ml|ini|conf|json)$/i;

// ---------- --check-report ----------
if (checkReport) {
  const lines = fs.readFileSync(path.resolve(checkReport), 'utf8').split(/\r?\n/);
  const fails = [];
  const lenCache = new Map();
  const lineCount = (f) => {
    if (!lenCache.has(f)) lenCache.set(f, fs.existsSync(f) && fs.statSync(f).isFile() ? fs.readFileSync(f, 'utf8').split(/\r?\n/).length : -1);
    return lenCache.get(f);
  };
  const cite = /`([\w@./\\-]+\.[A-Za-z0-9]+):(\d+)(?:-(\d+))?`/g;
  const secrets = [
    [/postgres(?:ql)?:\/\/[^\s:@/]+:[^\s@]+@/i, 'connection string with credentials'],
    [/redis:\/\/[^\s:@/]*:[^\s@]+@/i, 'redis URL with password'],
    [/\bpassword\s*[=:]\s*(?!<|\$|\{|your|changeme|placeholder|\*|`|$)\S{3,}/i, 'password = value'],
  ];
  let inFence = false;
  lines.forEach((ln, i) => {
    const n = i + 1;
    for (const [re, label] of secrets) if (re.test(ln)) fails.push(`line ${n}: possible secret (${label})`);
    let m;
    cite.lastIndex = 0;
    while ((m = cite.exec(ln))) {
      const f = path.resolve(root, m[1]);
      const len = lineCount(f);
      const end = Number(m[3] || m[2]);
      if (len < 0) fails.push(`line ${n}: cited file not found: ${m[1]}`);
      else if (end > len || Number(m[2]) < 1) fails.push(`line ${n}: ${m[1]}:${m[2]}${m[3] ? '-' + m[3] : ''} beyond file length (${len})`);
    }
  });
  const text = lines.join('\n');
  for (const h of ['Repo Profile', 'Not applicable here']) {
    if (!new RegExp(`^#{1,4}\\s+.*${h}`, 'mi').test(text)) fails.push(`missing heading: ${h}`);
  }
  // action blocks: "### Action" headings under an Actions section need an Evidence: line
  const starts = [];
  lines.forEach((ln, i) => {
    if (/^###\s+(P[012])\b/.test(ln)) starts.push(i);
  });
  starts.forEach((s, k) => {
    const e = k + 1 < starts.length ? starts[k + 1] : lines.findIndex((l, j) => j > s && /^##\s/.test(l));
    const block = lines.slice(s, e > s ? e : lines.length).join('\n');
    if (!/^\s*[-*]?\s*\**Evidence:?\**:?/im.test(block)) fails.push(`line ${s + 1}: action block lacks an Evidence: line`);
  });
  if (!starts.length) fails.push('no action blocks found (expected headings like "### P0 - title")');
  if (fails.length) {
    fails.forEach((f) => console.log('FAIL ' + f));
    process.exit(1);
  }
  console.log('OK: citations, secrets, headings and Evidence lines pass');
  process.exit(0);
}

// ---------- scan mode ----------
const files = [];
let truncatedWalk = false;
(function walk(dir) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  ents.sort((a, b) => a.name.localeCompare(b.name));
  for (const e of ents) {
    if (files.length >= maxFiles) { truncatedWalk = true; return; }
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name)); }
    else if (e.isFile()) files.push(path.join(dir, e.name));
  }
})(root);
const rel = (f) => path.relative(root, f).split(path.sep).join('/');
const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };
const cap = (arr) => ({ items: arr.slice(0, CAP), total: arr.length, truncated: arr.length > CAP });
const base = (f) => path.basename(f);

// purpose hints
const pkgFiles = files.filter((f) => base(f) === 'package.json');
const watch = ['drizzle-orm', 'drizzle-kit', 'pg', 'postgres', 'prisma', '@prisma/client', 'typeorm', 'knex', 'sequelize', 'ioredis', 'redis', 'bullmq', 'bull', 'express', 'fastify', '@nestjs/core', 'pm2', 'zod', 'pino'];
const packages = pkgFiles.map((f) => {
  let j = {};
  try { j = JSON.parse(read(f)); } catch {}
  const all = { ...j.dependencies, ...j.devDependencies };
  return { path: rel(f), name: j.name || null, description: j.description || null, deps: Object.fromEntries(watch.filter((w) => all[w]).map((w) => [w, all[w]])) };
});
const readmeF = files.find((f) => rel(f).toLowerCase() === 'readme.md');
let readme = null;
if (readmeF) {
  const t = read(readmeF).split(/\r?\n/);
  const hi = t.findIndex((l) => /^#\s/.test(l));
  const para = t.slice(hi + 1).join('\n').split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#!\[<|`-]/.test(p)) || '';
  readme = { heading: hi >= 0 ? t[hi].replace(/^#\s*/, '') : null, firstParagraph: para.slice(0, 400) };
}
const has = (n) => fs.existsSync(path.join(root, n));

// infra files
const infraRe = /^(pgbouncer.*\.ini|redis.*\.conf|docker-compose.*\.ya?ml|ecosystem\.config\..+|nginx.*\.conf|drizzle\.config\..+|schema\.ts)$/i;
const infra = files.filter((f) => infraRe.test(base(f))).map(rel);

// env var names only
const envNames = new Set();
files.filter((f) => /^\.env/.test(base(f))).forEach((f) => {
  for (const ln of read(f).split(/\r?\n/)) {
    const m = ln.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/);
    if (m && /DATABASE|PG|POSTGRES|REDIS|POOL|PGBOUNCER/i.test(m[1])) envNames.add(m[1]);
  }
});

// pattern scan over code files (skip tests for hazards? keep, but flag path)
const rules = {
  driver: [
    ['drizzle(', /\bdrizzle\s*\(/],
    ['new Pool(', /new\s+Pool\s*\(/],
    ['postgres(', /(?<![\w.])postgres\s*\(/],
    ['.prepare(', /\.prepare\s*\(/],
    ['prepare option', /\bprepare\s*:\s*(true|false)/],
    ['pool max', /\bmax\s*:\s*\d+/],
    ['idle_timeout', /\bidle_?[tT]imeout\w*\s*:\s*\d+/],
  ],
  hazards: [
    ['pg_advisory_lock', /pg_(try_)?advisory_lock\b(?!_)/i, 'hazard'],
    ['pg_advisory_xact_lock', /pg_(try_)?advisory_xact_lock/i, 'safe'],
    ['LISTEN/NOTIFY', /\b(LISTEN\s+\w|NOTIFY\s+\w|pg_notify)/, 'hazard'],
    ['plain SET', /\bSET\s+(?!LOCAL\b|TRANSACTION\b|CONSTRAINTS\b|NULL\b|DEFAULT\b)(?:SESSION\s+)?(statement_timeout|search_path|work_mem|lock_timeout|role|application_name|timezone|time\s+zone)\b/i, 'hazard'],
    ['CREATE TEMP', /CREATE\s+TEMP(ORARY)?\s+TABLE/i, 'hazard'],
    ['WITH HOLD', /\bWITH\s+HOLD\b/i, 'hazard'],
    ['PREPARE', /\bPREPARE\s+\w+\s*(\(|AS\b)/, 'hazard'],
    ['DECLARE CURSOR', /\bDECLARE\s+\w+\s+(NO\s+SCROLL\s+)?CURSOR/i, 'hazard'],
  ],
  redis: [
    ['redis client', /new\s+(Redis|IORedis)\s*\(|createClient\s*\(/],
    ['stream ops', /\b(XADD|XREADGROUP|XACK|xadd|xreadgroup|xack)\b/],
    ['bullmq', /new\s+(Queue|Worker|QueueEvents)\s*\(/],
    ['KEYS call', /\.keys\s*\(\s*['"`][^'"`]*\*|\bKEYS\s+\*/],
    ['maxmemory', /^\s*maxmemory(-policy)?\s/m],
  ],
};
const hits = { driver: [], hazards: [], redis: [] };
let txCount = 0;
const routes = new Map();
const routeRe = /\b(?:router|app|r|api)\.(get|post|put|patch|delete)\s*\(/g;
const writeRe = /\.(insert|update|delete|transaction)\s*\(/;
const tables = [];
let jsonCols = 0;
const tenantCols = new Map();
const isTest = (p) => /(\.test\.|\.spec\.|__tests__|\/tests?\/|\/fixtures?\/)/.test(p);
for (const f of files) {
  if (!CODE.test(f) && !/redis.*\.conf$/i.test(base(f))) continue;
  const text = read(f);
  if (!text || text.length > 2_000_000) continue;
  const p = rel(f);
  const ls = text.split(/\r?\n/);
  const isSrc = /\.(m?[jt]sx?|cjs)$/i.test(f) || /\.sql$/i.test(f);
  const conf = /\.conf$/i.test(f);
  ls.forEach((ln, i) => {
    if (isSrc) {
      for (const [k, re] of rules.driver) if (re.test(ln) && !isTest(p)) hits.driver.push({ at: `${p}:${i + 1}`, kind: k });
      for (const [k, re, cls] of rules.hazards) if (re.test(ln) && !isTest(p) && !/^\s*(\/\/|\*|#|--)/.test(ln)) hits.hazards.push({ at: `${p}:${i + 1}`, kind: k, class: cls });
      for (const [k, re] of rules.redis) if (k !== 'maxmemory' && re.test(ln) && !isTest(p)) hits.redis.push({ at: `${p}:${i + 1}`, kind: k });
      if (/\.transaction\s*\(/.test(ln) && !isTest(p)) txCount++;
      if (/\b(json|jsonb)\s*\(/.test(ln) && /schema/i.test(p)) jsonCols++;
      if (/schema/i.test(p)) {
        const c = ln.match(/["'`](school_id|tenant_id|org_id|organization_id)["'`]/);
        if (c) tenantCols.set(c[1], (tenantCols.get(c[1]) || 0) + 1);
      }
    }
    if (conf) for (const [k, re] of rules.redis) if (k === 'maxmemory' && re.test(ln)) hits.redis.push({ at: `${p}:${i + 1}`, kind: 'maxmemory', text: ln.trim().slice(0, 80) });
  });
  if (isSrc && /schema/i.test(p) && !isTest(p)) {
    const tre = /(?:pgTable|\w+\.table)\(\s*["'`](\w+)["'`]/g;
    let tm;
    while ((tm = tre.exec(text))) tables.push({ name: tm[1], at: `${p}:${text.slice(0, tm.index).split('\n').length}` });
  }
  if (isSrc && !isTest(p) && /(route|controller|api|server|app)/i.test(p)) {
    const n = (text.match(routeRe) || []).length;
    if (n) routes.set(p, { file: p, routes: n, writes: ls.some((l) => writeRe.test(l)) });
  }
}
const driverMax = hits.driver.filter((h) => h.kind === 'pool max');
const byKind = (arr) => arr.reduce((a, h) => ((a[h.kind] = (a[h.kind] || 0) + 1), a), {});
const sibRe = /(dataflow|orm|pg-health|load|readiness|scaling)/i;
const siblings = files.map(rel).filter((p) => /^(docs|reports)\//i.test(p) && /\.(md|json|txt)$/i.test(p) && sibRe.test(base(p)) && !/pgbouncer-redis-plan/.test(p));

const out = {
  root: base(root),
  filesScanned: files.length,
  walkTruncated: truncatedWalk,
  purposeHints: { packages: cap(packages), readme, hasAgentsMd: has('AGENTS.md'), hasClaudeMd: has('CLAUDE.md'), hasDocs: has('docs') },
  infraFiles: cap(infra),
  envVarNames: cap([...envNames].sort()),
  driverWiring: { counts: byKind(hits.driver), ...cap(hits.driver.filter((h) => h.kind !== 'pool max' && h.kind !== 'idle_timeout')), poolMaxCandidates: cap(driverMax.map((h) => h.at)) },
  sessionStateHazards: { counts: byKind(hits.hazards), ...cap(hits.hazards) },
  redisUsage: { counts: byKind(hits.redis), ...cap(hits.redis) },
  transactions: { transactionCalls: txCount },
  schema: { tableCount: tables.length, jsonColumns: jsonCols, tenantColumns: Object.fromEntries(tenantCols), tables: cap(tables.map((t) => `${t.name} (${t.at})`)) },
  endpoints: { heuristic: true, ...cap([...routes.values()].sort((a, b) => b.routes - a.routes)) },
  siblingReports: cap(siblings),
};
out.endpoints.items = out.endpoints.items.slice(0, 15);
// compact serializer: any object/array whose JSON fits in 160 chars is one line
const ser = (x, ind = '') => {
  const one = JSON.stringify(x);
  if (one === undefined || one.length <= 160 || typeof x !== 'object' || x === null) return one;
  const pad = ind + ' ';
  if (Array.isArray(x)) return '[\n' + x.map((e) => pad + ser(e, pad)).join(',\n') + '\n' + ind + ']';
  return '{\n' + Object.entries(x).map(([k, e]) => pad + JSON.stringify(k) + ': ' + ser(e, pad)).join(',\n') + '\n' + ind + '}';
};
console.log(ser(out));
