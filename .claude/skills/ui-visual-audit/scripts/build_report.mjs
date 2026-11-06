#!/usr/bin/env node
// Merges code-scan.json, page-scan.json and judgment.json into findings.json and report.md.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const IN = path.resolve(opt('--in', 'ui-audit'));
const OUT = path.resolve(opt('--out', path.join(IN, 'report.md')));
const CATEGORIES = ['Typography', 'Color and contrast', 'Spacing and layout', 'Shape and elevation', 'Components and states', 'Motion', 'Dark mode', 'Tokens and consistency', 'Accessibility (axe)', 'Judgment'];
const RANK = { fail: 2, warn: 1, pass: 0 };

function load(name) {
  const f = path.join(IN, name);
  if (!fs.existsSync(f)) { console.error(`build_report: missing input ${f}`); process.exit(1); }
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { console.error(`build_report: malformed JSON in ${f}: ${e.message}`); process.exit(1); }
}
const code = load('code-scan.json'), page = load('page-scan.json'), judgment = load('judgment.json');
if (!Array.isArray(code.findings) || !page.meta || !Array.isArray(page.routes) || !Array.isArray(judgment)) { console.error('build_report: inputs do not match the expected schema'); process.exit(1); }
for (const j of judgment) {
  const bad = ['id', 'category', 'severity', 'title', 'evidence', 'fix', 'screenshot', 'confidence'].filter((k) => !(k in j));
  if (bad.length || j.category !== 'judgment' || !['warn', 'pass'].includes(j.severity)) { console.error(`build_report: judgment item ${j.id ?? '?'} invalid (${bad.join(', ') || 'category/severity'})`); process.exit(1); }
}

// ---- gather + dedupe -------------------------------------------------------------------------
const raw = [];
for (const f of code.findings) raw.push({ ...f, affected: ['source code'] });
for (const r of page.routes) {
  if (r.status !== 'ok') continue;
  for (const f of r.findings) raw.push({ ...f, affected: [`${f.route} @${f.viewport}px/${f.scheme}${f.reducedMotion ? '/reduced-motion' : ''}`] });
}
for (const j of judgment) raw.push({ id: `judgment.${j.id}`, category: 'Judgment', severity: j.severity, title: j.title, rule: 'judgment', location: null, evidence: j.evidence, expected: 'Visual design rubric (reference/visual-standards.md)', fix: j.fix, screenshot: j.screenshot, source: 'judgment', confidence: j.confidence, count: 1, occurrences: [], affected: ['screenshots'] });

const merged = new Map();
for (const f of raw) {
  const m = merged.get(f.id);
  if (!m) { merged.set(f.id, { ...f, affected: [...f.affected], occurrences: [...(f.occurrences || [])] }); continue; }
  const worse = RANK[f.severity] > RANK[m.severity];
  if (f.severity !== 'pass' || m.severity === 'pass') {
    if (m.severity === 'pass' && f.severity !== 'pass') m.affected = [];
    m.affected.push(...f.affected);
  }
  const seen = new Set(m.occurrences.map((o) => JSON.stringify([o.sel ?? o.file, o.line, o.text ?? o.snippet])));
  for (const o of f.occurrences || []) { const k = JSON.stringify([o.sel ?? o.file, o.line, o.text ?? o.snippet]); if (!seen.has(k)) { seen.add(k); m.occurrences.push(o); } }
  if (worse) Object.assign(m, { severity: f.severity, title: f.title, evidence: f.evidence, expected: f.expected, fix: f.fix, screenshot: f.screenshot, location: f.location });
  m.count = Math.max(m.count || 0, f.count || 0, m.occurrences.length);
}
const findings = [...merged.values()].map((f) => {
  f.affected = [...new Set(f.affected)];
  f.occurrences = f.occurrences.slice(0, 25);
  if (f.severity === 'pass') f.affected = f.affected.slice(0, 1);
  return f;
}).sort((a, b) => RANK[b.severity] - RANK[a.severity] || (b.count || 0) - (a.count || 0) || a.id.localeCompare(b.id));

const nonPass = findings.filter((f) => f.severity !== 'pass');
const incomplete = nonPass.filter((f) => !f.evidence || !f.fix || !(f.location || f.evidence));
if (incomplete.length) { console.error('build_report: findings without evidence or fix: ' + incomplete.map((f) => f.id).join(', ')); process.exit(1); }

// ---- scores ----------------------------------------------------------------------------------
const scores = {};
for (const c of CATEGORIES) {
  const inCat = findings.filter((f) => f.category === c);
  scores[c] = { checks: inCat.length, passed: inCat.filter((f) => f.severity === 'pass').length, failed: inCat.filter((f) => f.severity === 'fail').length, warned: inCat.filter((f) => f.severity === 'warn').length, score: inCat.length ? Math.round((inCat.filter((f) => f.severity === 'pass').length / inCat.length) * 100) : null };
}
const measured = Object.values(scores).filter((s) => s.score !== null);
const overall = measured.length ? Math.round(measured.reduce((a, s) => a + s.score, 0) / measured.length) : null;

// ---- report ----------------------------------------------------------------------------------
const reportDir = path.dirname(OUT);
const link = (p) => (p ? `[${p}](${path.relative(reportDir, path.join(IN, p)).split(path.sep).join('/')})` : 'none (not visible in a single screenshot)');
const L = [];
const routes = page.meta.routes.join(', ');
L.push('# UI Visual Audit Report', '', `- Date: ${page.meta.date}`, `- URL: ${page.meta.url}`, `- Routes: ${routes}`, `- Viewports: ${page.meta.viewports.join(', ')} px; schemes: ${page.meta.schemes.join(', ')}; reduced-motion: no-preference and reduce`, `- Source scanned: ${code.meta.root} (${code.meta.filesScanned} files)`, '');
L.push('## Score table', '', '| Category | Score | Fail | Warn | Checks |', '|---|---|---|---|---|');
for (const c of CATEGORIES) { const s = scores[c]; L.push(`| ${c} | ${s.score === null ? 'not measured' : s.score + '%'} | ${s.failed} | ${s.warned} | ${s.checks} |`); }
L.push(`| **Overall** | **${overall === null ? 'not measured' : overall + '%'}** | ${nonPass.filter((f) => f.severity === 'fail').length} | ${nonPass.filter((f) => f.severity === 'warn').length} | ${findings.length} |`, '');

const item = (f) => {
  const tag = f.severity === 'fail' ? 'FAIL' : 'WARN';
  const out = [`- [ ] [${tag}] ${f.title}${f.source === 'judgment' ? ' (judgment, confidence: ' + f.confidence + ')' : ''}`];
  out.push(`  - Evidence: ${f.location && !String(f.evidence).includes(f.location) ? f.location + ' - ' : ''}${f.evidence}`);
  out.push(`  - Expected: ${f.expected}`);
  out.push(`  - Fix: ${f.fix}`);
  out.push(`  - Screenshot: ${link(f.screenshot)}`);
  if (f.affected.length && f.source === 'page') out.push(`  - Affected: ${f.affected.slice(0, 8).join('; ')}${f.affected.length > 8 ? ` (+${f.affected.length - 8} more)` : ''}`);
  return out;
};
L.push('## Checklist of recommendations', '');
for (const c of CATEGORIES.filter((x) => x !== 'Judgment')) {
  L.push(`### ${c}`, '');
  const items = nonPass.filter((f) => f.category === c);
  if (!items.length) L.push(scores[c].checks ? 'No issues found.' : 'Not measured.');
  for (const f of items) L.push(...item(f));
  L.push('');
}

// quick wins
const wins = [];
for (const f of nonPass) {
  const byColor = new Map();
  for (const o of f.occurrences) if (o.fg && o.suggested) { const k = `${o.fg}|${o.bg}|${o.suggested}`; byColor.set(k, (byColor.get(k) || 0) + 1); }
  for (const [k, n] of byColor) { const [fg, bg, sg] = k.split('|'); wins.push({ n, text: `Change text colour ${fg} to ${sg} on ${bg} (clears ${n} contrast failures with one token change)` }); }
  if (!byColor.size) wins.push({ n: Math.max(f.count || 1, 1) * (f.severity === 'fail' ? 1.5 : 1), text: `${f.title} - ${f.fix} (${f.count || 1} occurrences)` });
}
wins.sort((a, b) => b.n - a.n);
L.push('## Quick wins', '');
if (!wins.length) L.push('Nothing to fix.');
wins.slice(0, 5).forEach((w, i) => L.push(`${i + 1}. ${w.text}`));
L.push('');

const unm = new Map();
for (const r of page.routes) for (const u of r.unmeasured || []) { const k = `${u.reason}`; if (!unm.has(k)) unm.set(k, new Set()); unm.get(k).add(u.what); }
L.push('## What could not be measured', '');
L.push('- Text over images, gradients, video or canvas: contrast is reported as unknown, never as pass or fail.', '- Auth-gated routes: only audited when a storage-state file is supplied.', '- Content inside canvas elements and cross-origin iframes (third-party content is marked third-party).');
for (const [reason, whats] of unm) L.push(`- ${reason}: ${[...whats].slice(0, 6).join(', ')}${whats.size > 6 ? ` (+${whats.size - 6} more)` : ''}`);
for (const r of page.routes) if (r.status !== 'ok') L.push(`- Route ${r.route} was not audited: ${r.error}`);
L.push('');

L.push('## Judgment findings (lower confidence)', '', 'Subjective review of screenshots against the rubric; not measured by script.', '');
const jItems = nonPass.filter((f) => f.category === 'Judgment');
if (!jItems.length) L.push(scores.Judgment.checks ? 'No issues found.' : 'Not measured.');
for (const f of jItems) L.push(...item(f));
L.push('');

fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(OUT, L.join('\n'));
fs.writeFileSync(path.join(reportDir, 'findings.json'), JSON.stringify({ meta: { url: page.meta.url, date: page.meta.date, routes: page.meta.routes, viewports: page.meta.viewports, schemes: page.meta.schemes }, scores, overall, findings }, null, 2));
const listed = (L.join('\n').match(/^- \[ \] /gm) || []).length;
console.log(`build_report: ${findings.length} findings (${nonPass.length} non-pass, ${listed} checklist items), overall ${overall === null ? 'n/a' : overall + '%'} -> ${OUT}`);
if (listed !== nonPass.length) { console.error('build_report: checklist count mismatch'); process.exit(1); }
