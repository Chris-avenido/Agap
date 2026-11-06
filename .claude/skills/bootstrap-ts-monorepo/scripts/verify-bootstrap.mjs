#!/usr/bin/env node
// Read-only structural check: node verify-bootstrap.mjs <repo-path>
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const repoArg = process.argv[2];
if (!repoArg) {
  console.error('usage: node verify-bootstrap.mjs <repo-path>');
  process.exit(2);
}
const repo = resolve(repoArg);
let failed = 0;
const check = (name, ok) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) failed++;
};
const read = (rel) => {
  try {
    return readFileSync(join(repo, rel), 'utf8');
  } catch {
    return null;
  }
};
const isDir = (rel) => existsSync(join(repo, rel)) && statSync(join(repo, rel)).isDirectory();

// structure (backend/frontend folders may be named backend|api and frontend|web)
const be = isDir('apps/backend') || !isDir('apps/api') ? 'apps/backend' : 'apps/api';
const fe = isDir('apps/frontend') || !isDir('apps/web') ? 'apps/frontend' : 'apps/web';
for (const d of [be, fe, 'packages/shared', 'docs', '.agents/rules', '.agents/skills', '.claude'])
  check(`dir ${d}`, isDir(d));
for (const f of [
  'AGENTS.md',
  'CLAUDE.md',
  `${be}/CLAUDE.md`,
  `${fe}/CLAUDE.md`,
  'docs/db-changes.md',
  '.agents/rules/antigravity-permissions.md',
  '.agents/skills/ci-gate/SKILL.md',
  '.claude/settings.json',
  'package.json',
])
  check(`file ${f}`, existsSync(join(repo, f)));

// CLAUDE.md imports
for (const f of ['CLAUDE.md', `${be}/CLAUDE.md`, `${fe}/CLAUDE.md`]) {
  const t = read(f);
  check(`${f} imports AGENTS.md`, t !== null && /^@(\.\.\/)*AGENTS\.md\s*$/m.test(t));
}

// AGENTS.md content
const agents = read('AGENTS.md') ?? '';
const agentChecks = {
  'hard rule: no secrets': /never print or commit secrets/i,
  'hard rule: drizzle-kit + rehearsal + rollback': /drizzle-kit[\s\S]*rehearsed[\s\S]*rollback plan/i,
  'hard rule: done means green': /done means green/i,
  'hard rule: no prod DB/VM without asking': /never touch the production DB or VM without asking/i,
  'Parallel Tool Batching Mandate': /Parallel Tool Batching Mandate/,
  'Search-First Targeted-Slice, 150-250 windows': /Search-First, Targeted-Slice[\s\S]*150-250/,
  'Pre-Edit Test & Schema Contract Rule': /Pre-Edit Test & Schema Contract Rule/,
  'Two-Tier Verification': /Two-Tier Verification/,
  'run_command cap (6)': /at most 6 `?run_command/,
  '3-Strike Circuit Breaker': /3-Strike Circuit Breaker/,
  'polling prohibition': /polling prohibition/i,
  'silent-reporter rule': /--reporter=dot/,
  'Environment Execution Profile': /Environment Execution Profile/,
  'post-compaction rule': /Post-compaction rule/i,
};
for (const [name, re] of Object.entries(agentChecks)) check(`AGENTS.md ${name}`, re.test(agents));

// antigravity permissions
const perm = read('.agents/rules/antigravity-permissions.md') ?? '';
check('antigravity-permissions polling ban', /poll/i.test(perm) && /(no|ban|prohibit|never)/i.test(perm));
check('antigravity-permissions batching mandate', /Parallel Tool Batching Mandate/.test(perm));

// ci-gate
const gate = read('.agents/skills/ci-gate/SKILL.md') ?? '';
const pkg = (() => {
  try {
    return JSON.parse(read('package.json'));
  } catch {
    return null;
  }
})();
const scripts = pkg?.scripts ?? {};
const gateChain = gate.match(/npm\.cmd run lint[^\n`]*build/)?.[0] ?? '';
check('ci-gate has one consolidated Tier 2 chain', /consolidated/i.test(gate) && gateChain.includes('typecheck') && gateChain.includes('test:unit') && gateChain.includes('--reporter=dot'));
const lintCoversFast = scripts.lint && scripts['lint:fast'] && scripts.lint.includes(scripts['lint:fast']);
const gateRunsFast = /run lint:fast/.test(gateChain);
check('ci-gate no duplicate lint pass', !(gateRunsFast && lintCoversFast));

// package.json scripts
for (const s of ['lint:fast', 'lint', 'typecheck', 'test:unit', 'build']) check(`package.json script ${s}`, typeof scripts[s] === 'string');

// settings.json
let settings = null;
try {
  settings = JSON.parse(read('.claude/settings.json'));
} catch {}
check('.claude/settings.json valid JSON', settings !== null);
const deny = settings?.permissions?.deny ?? [];
check('.claude/settings.json denies reading .env*', Array.isArray(deny) && deny.some((d) => /^Read\(.*\.env/.test(d)));

process.exit(failed ? 1 : 0);
