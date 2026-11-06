#!/usr/bin/env node
// Deterministic scaffold: node scaffold.mjs <repo-path> <scope>
// Creates folders and a few fixed files. Never overwrites or deletes.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [repoArg, scopeArg] = process.argv.slice(2);
if (!repoArg || !scopeArg) {
  console.error('usage: node scaffold.mjs <repo-path> <scope>');
  process.exit(2);
}
const repo = resolve(repoArg);
if (!existsSync(repo)) {
  console.error(`repo path does not exist: ${repo}`);
  process.exit(1);
}
const scope = scopeArg.replace(/^@/, '').replace(/\/\*$/, '');

const dirs = [
  'apps/backend',
  'apps/frontend',
  'packages/shared',
  'docs',
  '.agents/rules',
  '.agents/skills/ci-gate',
  '.claude',
];

const files = {
  'docs/db-changes.md': `# DB changes (${scope})

Every schema change: edit \`schema.ts\`, generate with drizzle-kit, rehearse on a local or scratch database with realistic data, and write the rollback plan here before it goes to any shared database.
`,
  'CLAUDE.md': `@AGENTS.md

# ${scope}

Rules live in AGENTS.md (imported above). Docs: docs/. Skills in .agents/skills run on demand: ci-gate.
`,
  'apps/backend/CLAUDE.md': `@../../AGENTS.md

Backend (Express, ${scope}/backend). Docs: ../../docs/. Skills: ci-gate.
`,
  'apps/frontend/CLAUDE.md': `@../../AGENTS.md

Frontend (React + Mantine, ${scope}/frontend). Docs: ../../docs/. Skills: ci-gate.
`,
  '.agents/skills/ci-gate/SKILL.md': `---
name: ci-gate
description: Tier 2 outer-loop gate. Run once, as one consolidated foreground command, at the very end of a task after all edits and Tier 1 checks pass.
---

# ci-gate (Tier 2)

Run exactly once, at the very end, as ONE consolidated foreground command:

\`npm.cmd run lint && npm.cmd run typecheck && npm.cmd run test:unit -- --reporter=dot && npm.cmd run build\`

- \`lint\` covers \`lint:fast\` (oxlint then eslint), so there is no separate \`lint:fast\` pass. If a repo's \`lint\` does not cover \`lint:fast\`, prepend \`npm.cmd run lint:fast &&\`. Never drop a gate that is not covered.
- Passing-test output is suppressed with \`--reporter=dot\`; add \`--silent\` to npm calls if output is noisy.
- Foreground only. No polling, no background tasks, no status checks.
- 3-Strike Circuit Breaker: after 3 consecutive failed repair attempts, stop and report the exact error trace.
- Never weaken a lint rule, TypeScript strictness setting or unit test to pass.
- After a green run, record the passing status and git diff state; if nothing changed since, do not re-run.
`,
};

for (const d of dirs) {
  const p = join(repo, d);
  if (existsSync(p)) console.log(`skipped (exists): ${d}`);
  else {
    mkdirSync(p, { recursive: true });
    console.log(`created: ${d}`);
  }
}
for (const [rel, content] of Object.entries(files)) {
  const p = join(repo, rel);
  if (existsSync(p)) console.log(`skipped (exists): ${rel}`);
  else {
    writeFileSync(p, content);
    console.log(`created: ${rel}`);
  }
}
