#!/usr/bin/env node
// folder-architecture-audit: verify every path and line cited in a draft report exists. Read-only.
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
let report = null, root = process.cwd();
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--report' && argv[i + 1]) report = argv[++i];
  else if (argv[i] === '--root' && argv[i + 1]) root = argv[++i];
  else { console.error(`Bad argument: ${argv[i]}\nUsage: check-report-paths.mjs --report <path> [--root <path>]`); process.exit(2); }
}
if (!report || !fs.existsSync(report) || !fs.existsSync(root)) { console.error('Missing or unreadable --report / --root'); process.exit(2); }
root = path.resolve(root);

// Drop fenced blocks whose info string or first line marks a proposed target tree.
const lines = fs.readFileSync(report, 'utf8').split(/\r?\n/);
const kept = [];
let inFence = false, skipFence = false, prevLine = '';
for (const ln of lines) {
  if (/^\s*```/.test(ln)) {
    if (!inFence) { inFence = true; skipFence = /tree|target/i.test(ln) || /proposed target tree/i.test(prevLine); }
    else { inFence = false; skipFence = false; }
    prevLine = ln; continue;
  }
  if (!(inFence && skipFence)) kept.push(ln);
  if (ln.trim()) prevLine = ln;
}
const text = kept.join('\n');

const KNOWN_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|css|sql|yml|yaml)$/;
const problems = [];
const seen = new Set();
let checked = 0;
for (const m of text.matchAll(/`([^`\n]+)`/g)) {
  let tok = m[1].trim();
  if (/^[a-z]+:\/\//i.test(tok) || /\s/.test(tok)) continue;
  const lm = tok.match(/^(.*?):(\d+)(?:-(\d+))?$/);
  let start = null, end = null;
  if (lm) { tok = lm[1]; start = Number(lm[2]); end = lm[3] ? Number(lm[3]) : start; }
  if (!(tok.includes('/') || KNOWN_EXT.test(tok))) continue;
  if (/[*<>{}$|]/.test(tok) || tok.startsWith('@') || tok.startsWith('-') || /^[A-Za-z]:\\/.test(tok)) continue;
  if (!KNOWN_EXT.test(tok) && !/\/$/.test(tok) && start == null) continue; // bare folder-like words are not file claims
  const key = `${tok}:${start}-${end}`;
  if (seen.has(key)) continue; seen.add(key);
  const clean = tok.replace(/^\.\//, '').replace(/\/$/, '');
  const abs = path.resolve(root, clean);
  if (path.relative(root, abs).startsWith('..')) { problems.push(`MISSING ${tok}`); checked++; continue; }
  checked++;
  let st;
  try { st = fs.statSync(abs); } catch { problems.push(`MISSING ${tok}`); continue; }
  if (start != null) {
    if (!st.isFile()) { problems.push(`MISSING ${tok} (not a file)`); continue; }
    const n = fs.readFileSync(abs, 'utf8').split('\n').length;
    if (start < 1 || end > n || end < start) problems.push(`LINE_OUT_OF_RANGE ${tok}:${start}${end !== start ? '-' + end : ''} (file has ${n} lines)`);
  }
}
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log(`OK ${checked} references checked`);
process.exit(0);
