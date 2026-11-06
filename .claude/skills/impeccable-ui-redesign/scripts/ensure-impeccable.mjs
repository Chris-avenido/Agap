#!/usr/bin/env node
// Deterministic check-and-install of the Impeccable design skill (pbakaus/impeccable) at project scope.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const REPO = path.resolve(opt('--repo', '.'));
const CHECK_ONLY = argv.includes('--check-only');
const SOURCE = 'https://github.com/pbakaus/impeccable';

const roots = [path.join(REPO, '.claude', 'skills'), path.join(REPO, '.claude', 'commands'), path.join(os.homedir(), '.claude', 'skills'), path.join(os.homedir(), '.claude', 'commands')];
function findInstall() {
  for (const r of roots) {
    if (!fs.existsSync(r)) continue;
    for (const e of fs.readdirSync(r)) if (/^(teach-)?impeccable(.md)?$/i.test(e)) return path.join(r, e);
  }
  return null;
}
const summary = (o) => console.log(JSON.stringify({ installed: false, location: null, source: SOURCE, version: null, ...o }));
function version(loc) {
  try {
    const dir = fs.statSync(loc).isDirectory() ? loc : path.dirname(loc);
    for (const f of ['package.json', 'VERSION', '.version']) {
      const p = path.join(dir, f);
      if (fs.existsSync(p)) { const t = fs.readFileSync(p, 'utf8').trim(); try { return JSON.parse(t).version ?? t.slice(0, 40); } catch { return t.slice(0, 40); } }
    }
    const sk = path.join(dir, 'SKILL.md');
    if (fs.existsSync(sk)) { const m = fs.readFileSync(sk, 'utf8').match(/^version:\s*(.+)$/m); if (m) return m[1].trim(); }
  } catch { /* fall through */ }
  return null;
}

const existing = findInstall();
if (existing) {
  console.log(`Impeccable already installed at ${existing}`);
  summary({ installed: true, location: existing, version: version(existing) });
  process.exit(0);
}
if (CHECK_ONLY) { console.log('Impeccable is not installed (check-only).'); summary({}); process.exit(1); }

const run = (cmd, args, cwd) => spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
const claudeDir = path.join(REPO, '.claude');

console.log(`Installing Impeccable at project scope into ${claudeDir}`);
console.log(`Current instructions: ${SOURCE}#installation (checked when this script was written: npx impeccable install --providers=claude --scope=project). If both methods below fail, read that README and install by hand.`);
// Refuse to overwrite files silently: the installers prompt; we never pass a blanket "yes" for overwrites of existing files.
const methods = [
  ['npx impeccable install --providers=claude --scope=project', 'npx', ['-y', 'impeccable', 'install', '--providers=claude', '--scope=project']],
  ['npx mdskills install pbakaus/impeccable', 'npx', ['-y', 'mdskills', 'install', 'pbakaus/impeccable', '--yes']],
];
let source = null;
const before = new Set(fs.existsSync(claudeDir) ? fs.readdirSync(claudeDir, { recursive: true }).map(String) : []);
for (const [label, cmd, args] of methods) {
  const r = run(cmd, args, REPO);
  if (r.status === 0 && findInstall()) { source = label; break; }
  console.log(`Method failed: ${label}`);
}
if (!source) { console.error('ERROR: install failed. Impeccable needs network access to the npm registry and github.com. Check connectivity or install manually per the README.'); summary({}); process.exit(1); }
const added = fs.readdirSync(claudeDir, { recursive: true }).map(String).filter((f) => !before.has(f));
console.log(`Files added under ${claudeDir}: ${added.length}`);
let commit = null;
try { commit = spawnSync('npx', ['-y', 'impeccable', '--version'], { encoding: 'utf8', shell: process.platform === 'win32' }).stdout.trim() || null; } catch { /* optional */ }
const loc = findInstall();
if (!loc) { console.error('ERROR: install finished but no Impeccable folder was found.'); summary({}); process.exit(1); }
console.log(`Installed at ${loc}\nSource: ${source}`);
summary({ installed: true, location: loc, source: `${source} (${SOURCE})`, version: version(loc) ?? commit });
