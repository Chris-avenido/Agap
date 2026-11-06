#!/usr/bin/env node
// Deterministic check of DATA-WORKFLOW.md and FINDINGS.md against endpoint-inventory.json and candidate-findings.json.
// Usage: node check-output.mjs [--out docs/data-workflow] [--root <repo root, default cwd>]
// Reports every failure (not only the first). Exit 0 only if everything passes.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const ROOT = path.resolve(opt('root', process.cwd()));
const OUT = path.resolve(ROOT, opt('out', 'docs/data-workflow'));

const results = [];
const check = (name, problems) => results.push({ name, problems });
const read = (f) => { const p = path.join(OUT, f); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; };

const invText = read('endpoint-inventory.json');
const candText = read('candidate-findings.json');
const narrative = read('DATA-WORKFLOW.md');
const findings = read('FINDINGS.md');
const missing = [['endpoint-inventory.json', invText], ['candidate-findings.json', candText], ['DATA-WORKFLOW.md', narrative], ['FINDINGS.md', findings]].filter(([, t]) => t === null).map(([n]) => n);
if (missing.length) {
  console.log(`FAIL  required files exist\n      - missing in ${OUT}: ${missing.join(', ')}`);
  process.exit(1);
}
const inv = JSON.parse(invText);
const cands = JSON.parse(candText);

const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const N = stripComments(narrative);
const F = stripComments(findings);
const section = (text, title) => {
  const m = new RegExp(`^##\\s+${title}\\s*$`, 'mi').exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = /^##\s+/m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
};

// 1. every write-performing endpoint appears in the narrative by path
{
  const p = [];
  for (const e of inv.endpoints.filter((x) => x.writes.length)) if (!N.includes(e.path)) p.push(`endpoint ${e.id} writes to the database but its path is not in DATA-WORKFLOW.md`);
  check('every write endpoint appears in the narrative (by path)', p);
}

// 2. every table written appears in "Where the data lives"
{
  const p = [];
  const sec = section(N, 'Where the data lives');
  if (sec === null) p.push('section "## Where the data lives" not found');
  else {
    const tables = new Set(inv.endpoints.flatMap((e) => e.writes.map((w) => w.table)).filter((t) => t && t !== '?'));
    for (const t of [...tables].sort()) {
      const short = t.split('.').pop();
      if (!new RegExp(`(^|[^\\w])(${escapeRe(t)}|${escapeRe(short)})([^\\w]|$)`).test(sec)) p.push(`table ${t} is written by an endpoint but not described in "Where the data lives"`);
    }
  }
  check('every written table is described in "Where the data lives"', p);
}

// 3. findings: structure + evidence
const blocks = [];
{
  const re = /^###\s+(DW-\d{3,})\s*$/gm;
  const ms = [...F.matchAll(re)];
  ms.forEach((m, i) => {
    blocks.push({ id: m[1], text: F.slice(m.index, endOfFindings(F, m.index + m[0].length, ms[i + 1]?.index)) });
  });
}
function endOfFindings(text, from, nextStart) {
  const h2 = /^##\s+/m.exec(text.slice(from));
  const h2At = h2 ? from + h2.index : text.length;
  return nextStart !== undefined ? Math.min(nextStart, h2At) : h2At;
}
const field = (b, name) => {
  const m = new RegExp(`^- \\*\\*${name}:\\*\\*[ \\t]*(.*)$`, 'm').exec(b.text);
  return m ? m[1].trim() : null;
};
{
  const p = [];
  const seen = new Set();
  for (const b of blocks) {
    if (seen.has(b.id)) p.push(`${b.id}: duplicate finding ID`);
    seen.add(b.id);
    const need = ['ID', 'Severity', 'Status', 'Workflow', 'Endpoint', 'Where', 'What is wrong \\(plain English\\)', 'What the user experiences'];
    for (const n of need) if (!field(b, n)) p.push(`${b.id}: missing field "${n.replace(/\\/g, '')}"`);
    if (field(b, 'ID') && field(b, 'ID') !== b.id) p.push(`${b.id}: ID field says ${field(b, 'ID')}`);
    const sev = field(b, 'Severity'); if (sev && !/^(Critical|High|Medium|Low)$/.test(sev)) p.push(`${b.id}: severity "${sev}" is not Critical/High/Medium/Low`);
    const st = field(b, 'Status'); if (st && !/^(Confirmed|Suspected)$/.test(st)) p.push(`${b.id}: status "${st}" is not Confirmed/Suspected`);
    if (!/^- \*\*Fix brief:\*\*/m.test(b.text)) p.push(`${b.id}: missing Fix brief`);
    else for (const sub of ['Required behavior', 'Files to change', 'How to confirm']) if (!new RegExp(`^\\s+- ${sub}:\\s*\\S`, 'm').test(b.text)) p.push(`${b.id}: Fix brief lacks "${sub}"`);
    // Where + evidence
    const where = field(b, 'Where');
    const wm = where && /([^\s`]+?):(\d+)/.exec(where);
    const ev = /^- \*\*Evidence:\*\*[^\n]*\n+```[^\n]*\n([\s\S]*?)\n```/m.exec(b.text);
    if (!ev) p.push(`${b.id}: missing Evidence code block`);
    if (where && !wm) p.push(`${b.id}: "Where" is not file:line`);
    if (wm) {
      const file = path.resolve(ROOT, wm[1]); const line = Number(wm[2]);
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) p.push(`${b.id}: file ${wm[1]} does not exist`);
      else {
        const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
        if (line < 1 || line > lines.length) p.push(`${b.id}: line ${line} is outside ${wm[1]} (${lines.length} lines)`);
        else if (ev) {
          const quoted = ev[1].split('\n').map((l) => l.trim()).filter(Boolean);
          const n = quoted.length;
          if (n < 1 || n > 12) p.push(`${b.id}: evidence should be 3-8 lines (found ${n})`);
          const norm = lines.map((l) => l.trim());
          let ok = false;
          for (let s = Math.max(0, line - 1 - 3); s <= Math.min(norm.length - 1, line - 1 + 3) && !ok; s++) {
            if (norm[s] !== quoted[0]) continue;
            let j = s; let good = true;
            for (const q of quoted.slice(1)) { j++; while (j < norm.length && norm[j] === '' ) j++; if (norm[j] !== q) { good = false; break; } }
            if (good) ok = true;
          }
          if (!ok) p.push(`${b.id}: evidence does not appear verbatim (in order) within 3 lines of ${wm[1]}:${line}`);
        }
      }
    }
  }
  if (!blocks.length && !/No findings/i.test(F)) p.push('no finding blocks (### DW-001 ...) found and no "No findings" statement');
  check('every finding has all required fields, a real file:line and verbatim evidence', p);
}

// 4. candidates accounted for
{
  const p = [];
  const checkedSec = section(F, 'Checked and fine') ?? '';
  for (const c of cands) {
    if (!F.includes(c.key)) { p.push(`candidate ${c.key} (${c.rule}, ${c.confidence}) is neither a finding nor in "Checked and fine"`); continue; }
    const inBlock = blocks.some((b) => b.text.includes(c.key));
    if (!inBlock) {
      const line = checkedSec.split('\n').find((l) => l.includes(c.key));
      if (!line) p.push(`candidate ${c.key} appears outside "Checked and fine" and outside any finding block`);
      else if (line.replace(c.key, '').replace(/[`\-*:\s]/g, '').length < 10) p.push(`candidate ${c.key} is in "Checked and fine" without a reason`);
    }
  }
  check('every candidate is a finding or in "Checked and fine" with a reason', p);
}

// 5. narrative language rules
{
  const p = [];
  if (/^```/m.test(N)) p.push('narrative contains a fenced code block');
  const lines = N.split('\n');
  lines.forEach((raw, i) => {
    if (/^\s*- \*\*Entry points:\*\*/.test(raw)) return;
    const noParens = raw.replace(/\([^)]*\)/g, ' ');
    const hits = [];
    for (const m of noParens.matchAll(/`[^`]+`/g)) hits.push(m[0]);
    for (const m of noParens.replace(/`[^`]*`/g, ' ').matchAll(/\b[a-z]+(?:[A-Z][a-z0-9]*)+\b|\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b|(?:^|\s)\/[A-Za-z][\w/:.-]*|\b[\w-]+\.(?:ts|tsx|js|mjs|json|md|sql)\b|\b[\w-]+\/[\w-]+\/[\w./-]+/g)) hits.push(m[0].trim());
    if (hits.length) p.push(`line ${i + 1}: identifier-like text outside parentheses: ${[...new Set(hits)].slice(0, 4).join(', ')}`);
  });
  check('narrative has no code blocks and no unexplained identifiers', p);
}

// 6. cross-links
{
  const p = [];
  const findingIds = new Set(blocks.map((b) => b.id));
  const resolvedSec = section(F, 'Resolved') ?? '';
  const resolvedIds = new Set([...resolvedSec.matchAll(/DW-\d{3,}/g)].map((m) => m[0]));
  const narrIds = new Set([...N.matchAll(/DW-\d{3,}/g)].map((m) => m[0]));
  for (const id of narrIds) if (!findingIds.has(id) && !resolvedIds.has(id)) p.push(`${id} is mentioned in DATA-WORKFLOW.md but is not a finding`);
  // workflows
  const wfSec = section(N, 'The workflows') ?? '';
  const wfs = [...wfSec.matchAll(/^###\s+(.+?)\s*$/gm)];
  const wfBodies = new Map();
  wfs.forEach((m, i) => wfBodies.set(m[1].trim(), wfSec.slice(m.index, i + 1 < wfs.length ? wfs[i + 1].index : wfSec.length)));
  for (const [name, body] of wfBodies) if (!/^- \*\*Known problems:\*\*/m.test(body)) p.push(`workflow "${name}" has no "Known problems" line`);
  for (const b of blocks) {
    const wf = field(b, 'Workflow');
    if (wf) {
      const body = wfBodies.get(wf.replace(/^"|"$/g, ''));
      if (!body) p.push(`${b.id}: workflow "${wf}" is not a workflow heading in DATA-WORKFLOW.md`);
      else if (!new RegExp(`Known problems:\\*\\*[^\\n]*${b.id}`).test(body)) p.push(`${b.id}: not listed in the "Known problems" line of workflow "${wf}"`);
    }
    if (!narrIds.has(b.id) && !resolvedIds.has(b.id)) p.push(`${b.id}: never mentioned in DATA-WORKFLOW.md`);
  }
  // summary table
  const sum = section(F, 'Summary') ?? '';
  const sumIds = new Set([...sum.matchAll(/\|\s*(DW-\d{3,})\s*\|/g)].map((m) => m[1]));
  for (const b of blocks) if (!sumIds.has(b.id)) p.push(`${b.id}: missing from the summary table`);
  for (const id of sumIds) if (!findingIds.has(id)) p.push(`${id}: in the summary table but has no finding block`);
  check('cross-links resolve (findings <-> narrative <-> summary table)', p);
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let bad = 0;
for (const r of results) {
  console.log(`${r.problems.length ? 'FAIL' : 'PASS'}  ${r.name}`);
  for (const pr of r.problems.slice(0, 40)) console.log(`      - ${pr}`);
  if (r.problems.length > 40) console.log(`      ... and ${r.problems.length - 40} more`);
  bad += r.problems.length;
}
console.log(bad ? `\n${bad} problem(s). Fix them and run again.` : '\nAll checks passed.');
process.exit(bad ? 1 : 0);
