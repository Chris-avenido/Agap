#!/usr/bin/env node
// check-report.mjs - external verification of a diff-vuln-scan report.
// Usage: node check-report.mjs --report <path> --target <same target as collect-diff> --manifest <path>
// Exit: 0 all checks pass, 1 at least one failure (every failure is printed), 2 usage error.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';

const a = process.argv.slice(2);
const o = {};
for (let i = 0; i < a.length; i += 2) o[a[i].replace(/^--/, '')] = a[i + 1];
if (!o.report || !o.manifest) { console.error('check-report: --report and --manifest are required'); process.exit(2); }

const fails = [];
const fail = (m) => fails.push(m);
let manifest, text;
try { manifest = JSON.parse(fs.readFileSync(o.manifest, 'utf8')); } catch (e) { console.error('check-report: cannot read manifest: ' + e.message); process.exit(2); }
try { text = fs.readFileSync(o.report, 'utf8'); } catch (e) { console.error('check-report: cannot read report: ' + e.message); process.exit(2); }

const root = manifest.repo.root;
const git = (args) => execFileSync('git', ['-c', 'core.quotepath=false', ...args], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 256 * 1024 * 1024 });
if (o.target && o.target !== manifest.target.input) fail(`target mismatch: report checked with "${o.target}" but manifest was collected for "${manifest.target.input}"`);

const titleLine = text.split('\n').find((l) => /^#\s+Security & Error Scan:/.test(l)) || '';
if (/[<>]/.test(titleLine)) fail('title still contains a <placeholder>');

// ---- sections
const SECTIONS = ['Executive Summary Matrix', 'Findings by Layer', 'Checked and Clean', 'Defensive Remediations', 'Fix Prompt for a Coding Agent', 'Unverified Items and Open Questions'];
for (const s of SECTIONS) if (!new RegExp(`^##\\s+${s}`, 'mi').test(text)) fail(`missing section "## ${s}"`);
if (!/^#\s+Security & Error Scan:/m.test(text)) fail('missing title "# Security & Error Scan: ..."');

// ---- matrix vs finding blocks
const sectionBody = (name) => { const m = text.match(new RegExp(`^##\\s+${name}[^\\n]*\\n([\\s\\S]*?)(?=^##\\s|(?![\\s\\S]))`, 'mi')); return m ? m[1] : ''; };
const matrixIds = [...sectionBody('Executive Summary Matrix').matchAll(/^\|\s*((?:SEC|ERR)-\d+)\s*\|/gm)].map((m) => m[1]);
const blockRe = /^###\s+((?:SEC|ERR)-\d+):[^\n]*\n([\s\S]*?)(?=^###\s|^##\s|(?![\s\S]))/gm;
const blocks = [...text.matchAll(blockRe)].map((m) => ({ id: m[1], body: m[2] }));
const dup = (arr) => arr.filter((x, i) => arr.indexOf(x) !== i);
if (dup(blocks.map((b) => b.id)).length) fail(`duplicate finding IDs: ${[...new Set(dup(blocks.map((b) => b.id)))].join(', ')}`);
if (dup(matrixIds).length) fail(`duplicate matrix IDs: ${[...new Set(dup(matrixIds))].join(', ')}`);
if (matrixIds.length !== blocks.length) fail(`matrix has ${matrixIds.length} rows but report has ${blocks.length} "### <ID>" finding blocks`);
for (const id of matrixIds) if (!blocks.some((b) => b.id === id)) fail(`matrix row ${id} has no finding block`);
for (const b of blocks) if (!matrixIds.includes(b.id)) fail(`finding ${b.id} is missing from the matrix`);

// ---- per-finding fields
const LABELS = ['Severity', 'CWE', 'Location', 'Evidence', 'Root cause', 'Exploit scenario', 'Impact', 'Standards cross-reference', 'Fix status', 'Correction', 'Regression test'];
function field(body, name) {
  const re = new RegExp(`^\\*\\*${name}:?\\*\\*:?[ \\t]*`, 'm');
  const m = re.exec(body);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = body.slice(start);
  const next = rest.search(new RegExp(`^\\*\\*(?:${LABELS.join('|')}):?\\*\\*`, 'm'));
  return (next === -1 ? rest : rest.slice(0, next));
}
const fence = (s, lang) => (lang ? new RegExp('```' + lang + '[^\\n]*\\n[\\s\\S]*?```') : /```[^\n]*\n[\s\S]*?```/).test(s);

const fileLineCount = (p) => {
  const t = manifest.target;
  let content;
  if (t.scanRefKind === 'commit') content = git(['show', `${t.scanRef}:${p}`]);
  else if (t.scanRefKind === 'index') content = git(['show', `:${p}`]);
  else content = fs.readFileSync(`${root}/${p}`, 'utf8');
  return content.split('\n').length - (content.endsWith('\n') ? 1 : 0);
};
const exists = (p) => {
  const t = manifest.target;
  try {
    if (t.scanRefKind === 'commit') git(['cat-file', '-e', `${t.scanRef}:${p}`]);
    else if (t.scanRefKind === 'index') git(['cat-file', '-e', `:${p}`]);
    else if (!fs.existsSync(`${root}/${p}`)) return false;
    return true;
  } catch { return false; }
};

for (const b of blocks) {
  const f = (n) => field(b.body, n);
  const sev = (f('Severity') || '').match(/\b(CRITICAL|HIGH|MEDIUM|LOW|INFO)\b/);
  if (!sev) fail(`${b.id}: Severity must be one of CRITICAL|HIGH|MEDIUM|LOW|INFO`);
  if (!/CWE-\d+/.test(f('CWE') || '')) fail(`${b.id}: CWE must look like CWE-<number>`);
  const loc = (f('Location') || '').replace(/[`*]/g, '').trim().match(/^(.+?):(\d+)(?:-\d+)?\b/);
  if (!loc) fail(`${b.id}: Location must be path:line`);
  else if (!exists(loc[1])) fail(`${b.id}: Location path "${loc[1]}" does not exist at the scanned ref (${manifest.target.scanRefKind}${manifest.target.scanRef ? ' ' + manifest.target.scanRef.slice(0, 7) : ''})`);
  else {
    let n = 0;
    try { n = fileLineCount(loc[1]); } catch { /* reported above */ }
    if (+loc[2] < 1 || +loc[2] > n) fail(`${b.id}: Location line ${loc[2]} is outside ${loc[1]} (${n} lines)`);
  }
  const ex = f('Exploit scenario');
  if (ex === null) fail(`${b.id}: missing Exploit scenario`); else if (!fence(ex)) fail(`${b.id}: Exploit scenario needs a fenced code block with the exact hostile input`);
  const ev = (f('Evidence') || '').trim();
  if (!/^(Confirmed \(executed\)|Confirmed \(traced\)|Unverified)(?!\w)/.test(ev.replace(/[`*]/g, ''))) fail(`${b.id}: Evidence must be "Confirmed (executed)", "Confirmed (traced)" or "Unverified"`);
  const fx = (f('Fix status') || '').replace(/[`*]/g, '');
  if (!/Executed in scratch|Unverified fix/.test(fx)) fail(`${b.id}: Fix status must say "Executed in scratch" or "Unverified fix"`);
  const co = f('Correction');
  if (co === null) fail(`${b.id}: missing Correction`); else if (!fence(co, 'diff')) fail(`${b.id}: Correction needs a fenced \`\`\`diff block`);
  if (f('Regression test') === null) fail(`${b.id}: missing Regression test`);
}

// ---- leftovers (outside code)
const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
const HTML = new Set('a b br code div em h1 h2 h3 hr i img li ol p pre script span strong sub sup table td th tr ul details summary'.split(' '));
for (const m of prose.matchAll(/\b(TODO|TBD)\b/g)) fail(`leftover "${m[1]}" text`);
for (const m of prose.matchAll(/<\/?([A-Za-z][A-Za-z0-9 _\-\/:.]*)>/g)) if (!HTML.has(m[1].toLowerCase())) fail(`leftover placeholder "<${m[1]}>"`);

// ---- read-only proof
const nowHash = createHash('sha256').update(git(['status', '--porcelain'])).digest('hex');
if (nowHash !== manifest.baselineStatusHash) fail('git status --porcelain changed since collect-diff ran: the repo was modified during the scan');

// ---- output
console.log(`check-report: ${blocks.length} finding(s), ${matrixIds.length} matrix row(s), target ${manifest.target.input}`);
if (fails.length) { fails.forEach((m) => console.log('FAIL ' + m)); console.log(`${fails.length} failure(s)`); process.exit(1); }
console.log('PASS all checks');
