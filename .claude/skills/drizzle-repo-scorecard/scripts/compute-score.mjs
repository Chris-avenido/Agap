#!/usr/bin/env node
// compute-score.mjs - validate scorecard.json, compute scores, render the fixed-structure Markdown report.
// Zero dependencies, Node 18+. Writes only the file given by --out.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const W = JSON.parse(fs.readFileSync(path.join(HERE, 'weights.json'), 'utf8'));
const CRIT_IDS = Object.keys(W.criteria);

const SEVERITIES = ['critical', 'high', 'medium', 'low', 'info'];
const PENALTY = { critical: 4, high: 2.5, medium: 1, low: 0.3, info: 0 };
const SEV_POINTS = { critical: 8, high: 5, medium: 3, low: 1, info: 0 };
const EFFORT = { S: 1, M: 2, L: 4 };
const WORKLOADS = Object.keys(W.profiles);
const TENANCY = ['none', 'shared-schema', 'schema-per-tenant', 'db-per-tenant'];
const POOLERS = ['pgbouncer', 'none', 'unknown'];
const CONF = ['high', 'medium', 'low'];
const RULE_RE = /^(?:[A-Z]{2,5}\d{3})$/; // scanner ids (PK001, IDX001, ...) or judgment ids (JDG001)

function usage() {
  console.error('usage: compute-score.mjs SCORECARD_JSON [--out REPORT.md] [--check] [--print]');
  process.exit(1);
}
const args = process.argv.slice(2);
let input = null;
let outPath = null;
let check = false;
let print = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') outPath = args[++i] || usage();
  else if (args[i] === '--check') check = true;
  else if (args[i] === '--print') print = true;
  else if (args[i].startsWith('--')) usage();
  else if (!input) input = args[i];
  else usage();
}
if (!input) usage();

let sc;
try {
  sc = JSON.parse(fs.readFileSync(input, 'utf8'));
} catch (e) {
  console.error(`cannot read/parse ${input}: ${e.message}`);
  process.exit(2);
}

// ------------------------------------------------------------ validation
const problems = [];
const warnings = [];
const P = (m) => problems.push(m);
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

const repo = sc.repo || {};
for (const k of ['name', 'path', 'commit', 'date']) if (!isStr(repo[k])) P(`repo.${k} missing`);
const prof = sc.profile || {};
for (const k of ['purpose', 'workload', 'tenancy', 'scaleTarget', 'postgresVersion', 'pooler', 'confidence', 'verdict']) if (!isStr(prof[k])) P(`profile.${k} missing`);
if (!Array.isArray(prof.objectives) || !prof.objectives.length) P('profile.objectives must be a non-empty array');
if (!Array.isArray(prof.assumptions)) P('profile.assumptions must be an array');
if (isStr(prof.workload) && !WORKLOADS.includes(prof.workload)) P(`profile.workload "${prof.workload}" unknown (use: ${WORKLOADS.join(', ')})`);
if (isStr(prof.tenancy) && !TENANCY.includes(prof.tenancy)) P(`profile.tenancy "${prof.tenancy}" unknown`);
if (isStr(prof.pooler) && !POOLERS.includes(prof.pooler)) P(`profile.pooler "${prof.pooler}" unknown`);
if (isStr(prof.confidence) && !CONF.includes(prof.confidence)) P(`profile.confidence "${prof.confidence}" unknown`);

const criteria = Array.isArray(sc.criteria) ? sc.criteria : [];
if (!Array.isArray(sc.criteria)) P('criteria must be an array of 10 objects');
const byId = new Map();
for (const c of criteria) {
  if (!c || !CRIT_IDS.includes(c.id)) P(`criterion with unknown id ${JSON.stringify(c && c.id)}`);
  else if (byId.has(c.id)) P(`duplicate criterion ${c.id}`);
  else byId.set(c.id, c);
}
for (const id of CRIT_IDS) if (!byId.has(id)) P(`missing criterion ${id}`);

const repoDir = isStr(repo.path) ? path.resolve(repo.path) : null;
const repoExists = repoDir && fs.existsSync(repoDir) && fs.statSync(repoDir).isDirectory();
if (!repoExists && repoDir) warnings.push(`repo.path not found (${repoDir}); evidence file/line existence not checked`);
const lineCounts = new Map();
function lineCount(file) {
  if (!lineCounts.has(file)) {
    const p = path.resolve(repoDir, file);
    lineCounts.set(file, fs.existsSync(p) && fs.statSync(p).isFile() ? fs.readFileSync(p, 'utf8').split('\n').length : -1);
  }
  return lineCounts.get(file);
}

const seenFindingIds = new Set();
for (const c of byId.values()) {
  const tag = c.id;
  if (typeof c.applicable !== 'boolean') P(`${tag}: applicable must be boolean`);
  if (!CONF.includes(c.confidence)) P(`${tag}: confidence must be one of ${CONF.join('|')}`);
  if (!isStr(c.summary)) P(`${tag}: summary required (for non-applicable criteria it is the reason)`);
  if (!Array.isArray(c.findings)) P(`${tag}: findings must be an array`);
  if (c.applicable === false) {
    if (Array.isArray(c.findings) && c.findings.length) P(`${tag}: non-applicable criterion must not carry findings`);
    continue;
  }
  if (!isNum(c.score) || c.score < 0 || c.score > 10) P(`${tag}: score must be a number 0-10`);
  for (const f of c.findings || []) {
    const ft = `${tag}/${f && f.id}`;
    if (!f || !isStr(f.id)) P(`${tag}: finding without id`);
    else if (seenFindingIds.has(f.id)) P(`duplicate finding id ${f.id}`);
    else seenFindingIds.add(f.id);
    if (!f) continue;
    if (!RULE_RE.test(f.ruleId || '')) P(`${ft}: ruleId "${f.ruleId}" has unknown format (scanner id like IDX001 or judgment id like JDG001)`);
    if (!SEVERITIES.includes(f.severity)) P(`${ft}: unknown severity "${f.severity}"`);
    if (!Object.keys(EFFORT).includes(f.effort)) P(`${ft}: unknown effort "${f.effort}" (S|M|L)`);
    for (const k of ['problem', 'whyItMattersHere', 'recommendation']) if (!isStr(f[k])) P(`${ft}: ${k} missing`);
    if (!Array.isArray(f.evidence) || !f.evidence.length) P(`${ft}: evidence needs at least one {file,line}`);
    else
      for (const e of f.evidence) {
        if (!e || !isStr(e.file) || !Number.isInteger(e.line) || e.line < 1) P(`${ft}: evidence entry needs file and integer line >= 1`);
        else if (repoExists) {
          const n = lineCount(e.file);
          if (n < 0) P(`${ft}: evidence file not found: ${e.file}`);
          else if (e.line > n) P(`${ft}: evidence line ${e.line} beyond end of ${e.file} (${n} lines)`);
        }
      }
  }
}
for (const s of sc.strengths || []) if (!s || !isStr(s.criterion) || !isStr(s.note)) P('each strength needs criterion and note');
for (const u of sc.unverifiable || []) if (!u || !isStr(u.item) || !isStr(u.why) || !isStr(u.handoffSkill)) P('each unverifiable entry needs item, why, handoffSkill');
if (!Array.isArray(sc.strengths)) P('strengths must be an array');
if (!Array.isArray(sc.unverifiable)) P('unverifiable must be an array');
const method = sc.method || {};
if (!isStr(method.scannerVersion) || !Array.isArray(method.rulesFired) || !Array.isArray(method.limitations)) P('method needs scannerVersion, rulesFired[], limitations[]');

// ------------------------------------------------------------ scoring
const profile = W.profiles[prof.workload];
const applicable = CRIT_IDS.filter((id) => byId.get(id) && byId.get(id).applicable !== false);
const rawSum = profile ? applicable.reduce((s, id) => s + profile[id], 0) : 0;
const weight = {};
for (const id of CRIT_IDS) weight[id] = profile && applicable.includes(id) && rawSum > 0 ? (profile[id] / rawSum) * 100 : 0;
const weightSum = applicable.reduce((s, id) => s + weight[id], 0);
if (profile && applicable.length && Math.abs(weightSum - 100) > 1e-6) P(`applicable weights sum to ${weightSum}, expected 100`);
if (profile && !applicable.length) P('no applicable criteria');

const suggested = {};
for (const id of applicable) {
  const c = byId.get(id);
  const pen = (c.findings || []).reduce((s, f) => s + (PENALTY[f && f.severity] || 0), 0);
  suggested[id] = Math.max(0, Math.round((10 - pen) * 100) / 100);
  if (isNum(c.score)) {
    const diff = Math.abs(c.score - suggested[id]);
    if (diff > 1.5) P(`${id}: score ${c.score} is ${diff.toFixed(2)} away from suggested ${suggested[id]} (max 1.5)`);
    else if (diff > 0.05 && !isStr(c.adjustmentReason)) P(`${id}: score ${c.score} differs from suggested ${suggested[id]} but adjustmentReason is missing`);
  }
}

const allFindings = [];
for (const id of applicable) for (const f of byId.get(id).findings || []) if (f && SEVERITIES.includes(f.severity)) allFindings.push({ ...f, criterion: id });

if (check) {
  console.log(`scorecard check: ${input}`);
  console.log(`workload: ${prof.workload} | applicable: ${applicable.length}/10 | weight sum: ${weightSum.toFixed(2)}`);
  console.log('criterion | weight | score | suggested');
  for (const id of applicable) console.log(`${id} | ${weight[id].toFixed(1)} | ${byId.get(id).score} | ${suggested[id]}`);
  for (const w of warnings) console.log(`warning: ${w}`);
  if (problems.length) {
    console.log(`${problems.length} problem(s):`);
    for (const p of problems) console.log(` - ${p}`);
    process.exit(2);
  }
  console.log('OK');
  process.exit(0);
}
if (problems.length) {
  console.error(`${problems.length} validation problem(s):`);
  for (const p of problems) console.error(` - ${p}`);
  process.exit(2);
}

let overall = applicable.reduce((s, id) => s + (weight[id] * byId.get(id).score) / 10, 0);
overall = Math.round(overall * 10) / 10;
const hasCritical = allFindings.some((f) => f.severity === 'critical');
let capped = false;
if (hasCritical && overall > 79.9) {
  overall = 79.9;
  capped = true;
}
const grade = overall >= 90 ? 'A' : overall >= 80 ? 'B' : overall >= 70 ? 'C' : overall >= 60 ? 'D' : 'F';

for (const f of allFindings) f.priority = SEV_POINTS[f.severity] * weight[f.criterion] * (1 / EFFORT[f.effort]);
const ranked = allFindings
  .filter((f) => f.severity !== 'info')
  .sort((a, b) => b.priority - a.priority || SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity) || (a.ruleId < b.ruleId ? -1 : a.ruleId > b.ruleId ? 1 : 0) || (a.id < b.id ? -1 : 1));

// ------------------------------------------------------------ render
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const ev = (f) => f.evidence.map((e) => `${e.file}:${e.line}`).join(', ');
const evFirst = (f) => `${f.evidence[0].file}:${f.evidence[0].line}`;
const nameOf = (id) => W.criteria[id];
const L = [];
L.push(`# Repo Scorecard: ${repo.name} (${repo.date})`, '');
L.push('## Repo Profile', '');
L.push(`- **Purpose:** ${prof.purpose}`);
L.push(`- **Objectives:** ${prof.objectives.join('; ')}`);
L.push(`- **Workload:** ${prof.workload}`);
L.push(`- **Tenancy:** ${prof.tenancy}`);
L.push(`- **Scale target:** ${prof.scaleTarget}`);
L.push(`- **PostgreSQL version:** ${prof.postgresVersion}`);
L.push(`- **Pooler:** ${prof.pooler}`);
L.push(`- **Profile confidence:** ${prof.confidence}`);
L.push('- **Assumptions:**');
if (prof.assumptions.length) for (const a of prof.assumptions) L.push(`  - ${a}`);
else L.push('  - none');
L.push('');
L.push('## Overall score', '');
L.push(`**${overall.toFixed(1)} / 100, grade ${grade}**${capped ? ' (Capped by critical finding)' : ''}`, '');
L.push(prof.verdict, '');
L.push('## Criteria', '');
L.push('| ID | Criterion | Weight | Score | Confidence | Findings |', '| --- | --- | ---: | ---: | --- | ---: |');
for (const id of CRIT_IDS) {
  const c = byId.get(id);
  if (c.applicable === false) L.push(`| ${id} | ${nameOf(id)} | n/a | n/a | ${c.confidence} | 0 |`);
  else L.push(`| ${id} | ${nameOf(id)} | ${weight[id].toFixed(1)} | ${c.score.toFixed(1)} | ${c.confidence} | ${c.findings.length} |`);
}
L.push('');
const na = CRIT_IDS.filter((id) => byId.get(id).applicable === false);
if (na.length) {
  L.push('Not applicable:');
  for (const id of na) L.push(`- ${id} ${nameOf(id)}: ${byId.get(id).summary}`);
  L.push('');
}
L.push('## Top 10 recommendations', '');
if (!ranked.length) L.push('No actionable findings.', '');
else {
  L.push('| # | Severity | Criterion | Location | Problem | Why it matters here | Fix | Effort |', '| ---: | --- | --- | --- | --- | --- | --- | --- |');
  ranked.slice(0, 10).forEach((f, i) => L.push(`| ${i + 1} | ${f.severity} | ${f.criterion} | ${esc(evFirst(f))} | ${esc(f.problem)} | ${esc(f.whyItMattersHere)} | ${esc(f.recommendation)} | ${f.effort} |`));
  L.push('');
}
const now = ranked.filter((f) => ['critical', 'high'].includes(f.severity) && ['S', 'M'].includes(f.effort));
const nextUp = ranked.filter((f) => !now.includes(f) && (f.severity === 'critical' || f.severity === 'high' || (f.severity === 'medium' && f.effort !== 'L')));
const later = ranked.filter((f) => !now.includes(f) && !nextUp.includes(f));
L.push('## Roadmap', '');
L.push('_Now = critical/high with S or M effort. Next = remaining critical/high plus medium with S or M effort. Later = low severity and medium with L effort._', '');
for (const [title, list] of [['Now', now], ['Next', nextUp], ['Later', later]]) {
  L.push(`### ${title}`, '');
  if (!list.length) L.push('- none');
  for (const f of list) L.push(`- [${f.severity}] ${f.id} (${f.criterion}, ${f.effort}) ${f.problem} (${evFirst(f)})`);
  L.push('');
}
L.push('## Findings by criterion', '');
for (const id of CRIT_IDS) {
  const c = byId.get(id);
  L.push(`### ${id} ${nameOf(id)}`, '');
  if (c.applicable === false) {
    L.push(`Not applicable: ${c.summary}`, '');
    continue;
  }
  L.push(`Score ${c.score.toFixed(1)} (script-suggested ${suggested[id].toFixed(1)}), confidence ${c.confidence}.${c.adjustmentReason ? ` Adjustment: ${c.adjustmentReason}` : ''}`, '', c.summary, '');
  if (!c.findings.length) L.push('No findings.', '');
  for (const f of c.findings) {
    L.push(`#### ${f.id} [${f.severity}] ${f.ruleId}${f.tableRole ? ` (${f.tableRole})` : ''}`, '');
    L.push(`- **Evidence:** ${ev(f)}`, `- **Problem:** ${f.problem}`, `- **Why it matters here:** ${f.whyItMattersHere}`, `- **Fix:** ${f.recommendation}`, `- **Effort:** ${f.effort}`, '');
  }
}
L.push('## Strengths', '');
if (!sc.strengths.length) L.push('- none recorded');
for (const s of sc.strengths) L.push(`- **${s.criterion}:** ${s.note}${s.evidence ? ` (${typeof s.evidence === 'string' ? s.evidence : Array.isArray(s.evidence) ? s.evidence.map((e) => (typeof e === 'string' ? e : `${e.file}:${e.line}`)).join(', ') : `${s.evidence.file}:${s.evidence.line}`})` : ''}`);
L.push('');
L.push('## Unverifiable from the repo', '');
if (!sc.unverifiable.length) L.push('- none listed');
else {
  L.push('| Item | Why | Can be checked by |', '| --- | --- | --- |');
  for (const u of sc.unverifiable) L.push(`| ${esc(u.item)} | ${esc(u.why)} | ${esc(u.handoffSkill)} |`);
}
L.push('');
L.push('## Method and limitations', '');
L.push(`- Scanner version: ${method.scannerVersion}`, `- Date: ${repo.date}`, `- Commit: ${repo.commit}`, `- Rules fired: ${method.rulesFired.length ? method.rulesFired.join(', ') : 'none'}`, '- Limitations:');
for (const l of method.limitations) L.push(`  - ${l}`);
L.push('');
const report = L.join('\n');

if (outPath) {
  const target = path.resolve(outPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, report);
  console.error(`report written: ${target}`);
}
if (print || !outPath) process.stdout.write(report);
