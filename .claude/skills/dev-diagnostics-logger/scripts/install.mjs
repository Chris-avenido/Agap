#!/usr/bin/env node
// Deterministic, idempotent installer. Usage:
//   node install.mjs [--frontend dir] [--backend dir] [--dry-run] [--force-config] [--supersede <file>]...
// --refresh overwrites installed files that were edited since installation (assets are the source of truth).
// --supersede deletes an existing frontend logger file the user agreed to replace and rewrites every import of it
// to the new dev-logger. Without that flag nothing existing is ever deleted or overwritten.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const values = (name) => args.flatMap((a, i) => (a === name ? [args[i + 1]] : []));
const dryRun = flag('--dry-run');
const root = resolve(value('--root') ?? '.');

const detected = JSON.parse(spawnSync(process.execPath, [join(skillDir, 'scripts/detect-stack.mjs'), '--root', root], { encoding: 'utf8' }).stdout);
const frontendDir = value('--frontend') ?? detected.frontendDir;
const backendDir = value('--backend') ?? detected.backendDir;
if (!frontendDir && !backendDir) fail('No frontend or backend package detected. Pass --frontend and/or --backend.');
if (detected.ambiguous.multipleFrontends && !value('--frontend')) fail('Several frontends detected; pass --frontend <dir>.');
if (detected.ambiguous.multipleBackends && !value('--backend')) fail('Several backends detected; pass --backend <dir>.');

const POINTER = 'When troubleshooting or improving runtime behavior, read `.logs/LATEST.md` first (run `npm run logs:summary` to refresh it); raw entries are in `.logs/*.jsonl`.';
const sha = (text) => createHash('sha256').update(text).digest('hex');
const rel = (p) => relative(root, p).split(sep).join('/');
const manifestPath = join(root, 'tools/dev-diagnostics/manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { files: {} };

/** @type {{path:string, before:string|null, after:string}[]} */
const changes = [];
const deletions = [];
const conflicts = [];
const notes = [];

function fail(message) {
  console.error(`install: ${message}`);
  process.exit(1);
}

const adopted = [];
function plan(path, after, { owned = true } = {}) {
  const before = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (before === after) {
    // Identical to what we would write: nothing to change, but remember it as ours so later updates are not conflicts.
    if (owned && !manifest.files[rel(path)]) adopted.push(path);
    return;
  }
  // A file we installed earlier and the user then edited is a conflict, not something to overwrite.
  const key = rel(path);
  if (owned && before !== null && manifest.files[key] && manifest.files[key] !== sha(before) && !flag('--refresh')) {
    conflicts.push(`${key} was edited after installation`);
    return;
  }
  if (owned && before !== null && !manifest.files[key] && !flag('--refresh')) {
    conflicts.push(`${key} already exists and was not installed by this skill`);
    return;
  }
  changes.push({ path, before, after, owned });
}

const asset = (name, { esmExtensions = false } = {}) => {
  const text = readFileSync(join(skillDir, 'assets', name), 'utf8');
  // NodeNext / Node16 packages need explicit `.js` on relative imports.
  return esmExtensions ? text.replace(/(from\s+')(\.{1,2}\/[^'.]+)(')/g, '$1$2.js$3') : text;
};
const usesJsExtensions = (dir) => {
  for (const f of ['src/index.ts', 'src/app.ts', 'src/server.ts']) {
    const p = join(root, dir, f);
    if (existsSync(p) && /from\s+'\.{1,2}\/[^']+\.js'/.test(readFileSync(p, 'utf8'))) return true;
  }
  return false;
};

// 1. Source assets.
const targets = [];
if (frontendDir) {
  const dir = join(root, frontendDir, 'src/devtools');
  const files = ['shared/sanitize.ts', 'frontend/dev-logger.ts', 'frontend/vite-plugin-dev-log-sink.ts', 'frontend/DevErrorBoundary.tsx', 'frontend/DevProfiler.tsx'];
  if (detected.has.vitest) files.push('tests/dev-logger.test.ts');
  else notes.push('vitest not found: the logger test template was not installed');
  targets.push([dir, files]);
}
if (backendDir) {
  const dir = join(root, backendDir, 'src/devtools');
  const files = ['shared/sanitize.ts', 'backend/dev-diagnostics.ts', 'backend/express-dev-error-middleware.ts'];
  if (detected.has.pg) files.push('backend/pg-pool-instrument.ts');
  else notes.push('pg not found: pg-pool-instrument.ts skipped (SQL capture not installed)');
  targets.push([dir, files, usesJsExtensions(backendDir)]);
}
for (const [dir, files, esmExtensions] of targets) {
  for (const f of files) plan(join(dir, f.split('/').pop()), asset(f, { esmExtensions: Boolean(esmExtensions) }));
}

// 2. Root files.
plan(join(root, 'tools/dev-diagnostics/dev-runner.mjs'), readFileSync(join(skillDir, 'scripts/dev-runner.mjs'), 'utf8'));
plan(join(root, 'tools/dev-diagnostics/summarize-logs.mjs'), readFileSync(join(skillDir, 'scripts/summarize-logs.mjs'), 'utf8'));
const linter = detected.has.oxlint ? 'oxlint' : detected.has.eslint ? 'eslint' : null;
// `npm run dev` starts every dev server through the runner. If the original root dev script already starts the
// backend (one script for both, or concurrently/npm-run-all/workspaces), the runner wraps that script unchanged;
// otherwise it starts one command per package with a dev script, so the backend is captured too.
const pmName = detected.packageManager ?? 'npm';
const rootPackage = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const originalDev = String(rootPackage.scripts?.['dev:raw'] ?? rootPackage.scripts?.dev ?? '');
const backendPackage = detected.packages.find((p) => p.dir === backendDir);
const rootDevStartsBackend =
  Boolean(backendDir) &&
  (originalDev.includes(backendDir) ||
    Boolean(backendPackage?.name && originalDev.includes(backendPackage.name)) ||
    /--workspaces|\s-ws\b|concurrently|npm-run-all|run-p\b|\s&\s/.test(originalDev));
const perPackage = [backendDir, frontendDir]
  .filter(Boolean)
  .filter((dir) => detected.packages.find((p) => p.dir === dir)?.scripts.dev)
  .map((dir) => (detected.isMonorepo ? `${pmName} run dev -w ${dir}` : `${pmName} run dev:raw`));
const devCommands = !backendDir || rootDevStartsBackend || !detected.isMonorepo ? [`${pmName} run dev:raw`] : perPackage;
if (backendDir && !rootDevStartsBackend && detected.isMonorepo) notes.push('root dev did not start the backend: the runner now starts frontend and backend, so backend.jsonl is filled');
if (backendDir && rootDevStartsBackend) notes.push('root dev already starts the backend: the runner wraps the original script unchanged');
const stack = {
  devCommands,
  frontendDir: frontendDir ?? null,
  backendDir: backendDir ?? null,
  tsconfigDirs: detected.packages.filter((p) => p.hasTsconfig && p.role !== 'unknown').map((p) => p.dir),
  linter,
  packageManager: detected.packageManager ?? 'npm',
  playwright: detected.has.playwright,
  has: detected.has,
  notes,
};
plan(join(root, 'tools/dev-diagnostics/stack.json'), `${JSON.stringify(stack, null, 2)}\n`);
const configPath = join(root, 'dev-diagnostics.config.json');
if (!existsSync(configPath) || flag('--force-config')) plan(configPath, asset('config/dev-diagnostics.config.json'), { owned: false });

// 3. package.json scripts (root).
const pkgPath = join(root, 'package.json');
const pkgText = readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(pkgText);
pkg.scripts ??= {};
if (!pkg.scripts.dev && !pkg.scripts['dev:raw']) fail('Root package.json has no "dev" script to wrap.');
if (!String(pkg.scripts.dev ?? '').includes('dev-runner.mjs')) {
  pkg.scripts['dev:raw'] = pkg.scripts.dev;
  pkg.scripts.dev = 'node tools/dev-diagnostics/dev-runner.mjs';
}
pkg.scripts['logs:summary'] = 'node tools/dev-diagnostics/summarize-logs.mjs';
pkg.scripts['logs:clear'] = 'node -e "require(\'node:fs\').rmSync(\'.logs\',{recursive:true,force:true})"';
const indent = /^\{\n( +)"/.exec(pkgText)?.[1]?.length ?? 2;
const eol = pkgText.includes('\r\n') ? '\r\n' : '\n';
const pkgOut = `${JSON.stringify(pkg, null, indent)}${pkgText.endsWith('\n') ? '\n' : ''}`.replace(/\n/g, eol);
plan(pkgPath, pkgOut, { owned: false });

// 4. .gitignore and agent pointers.
const gi = join(root, '.gitignore');
const giText = existsSync(gi) ? readFileSync(gi, 'utf8') : '';
if (!giText.split(/\r?\n/).some((l) => l.trim() === '.logs/' || l.trim() === '.logs')) {
  plan(gi, `${giText}${giText && !giText.endsWith('\n') ? '\n' : ''}.logs/\n`, { owned: false });
}
for (const name of ['AGENTS.md', 'CLAUDE.md']) {
  const file = join(root, name);
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  // A CLAUDE.md that imports AGENTS.md already carries the line; repeating it would duplicate shared rules.
  if (name === 'CLAUDE.md' && /@AGENTS\.md/.test(text)) continue;
  if (!text.includes(POINTER)) plan(file, `${text}${text.endsWith('\n') ? '' : '\n'}\n${POINTER}\n`, { owned: false });
}

// 5. Supersede an existing frontend logger (explicit user approval only).
const supersede = values('--supersede').map((f) => resolve(root, f));
if (supersede.length && frontendDir) {
  const srcDir = join(root, frontendDir, 'src');
  const newModule = join(srcDir, 'devtools/dev-logger');
  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => {
      const full = join(dir, n);
      return statSync(full).isDirectory() ? (n === 'node_modules' ? [] : walk(full)) : /\.(ts|tsx)$/.test(n) ? [full] : [];
    });
  const strip = (p) => p.replace(/\.(ts|tsx)$/, '');
  const doomed = new Set(supersede.map(strip));
  for (const file of walk(srcDir)) {
    if (supersede.includes(file)) continue;
    const text = readFileSync(file, 'utf8');
    const next = text.replace(/(from\s+|import\s+)(['"])(\.{1,2}\/[^'"]+)\2/g, (m, lead, q, spec) => {
      const target = strip(resolve(dirname(file), spec));
      if (!doomed.has(target)) return m;
      let r = relative(dirname(file), newModule).split(sep).join('/');
      if (!r.startsWith('.')) r = `./${r}`;
      return `${lead}${q}${r}${q}`;
    });
    if (next !== text) changes.push({ path: file, before: text, after: next, owned: false });
  }
  for (const f of supersede) if (existsSync(f)) deletions.push(f);
}

// Entry-point wiring the installer cannot safely edit: report it, and fail --check-wiring when it is missing.
function walkSrc(dir) {
  const out = [];
  const visit = (d) => {
    for (const name of readdirSync(d)) {
      if (name === 'node_modules' || name === 'devtools' || name === 'dist') continue;
      const full = join(d, name);
      if (statSync(full).isDirectory()) visit(full);
      else if (/\.(ts|tsx|mjs|js|jsx)$/.test(name)) out.push(full);
    }
  };
  if (existsSync(dir)) visit(dir);
  return out;
}
const found = (dir, re) => walkSrc(join(root, dir, 'src')).some((f) => re.test(readFileSync(f, 'utf8')));
const firstImportIsBootstrap = (dir, candidates) => {
  for (const c of candidates) {
    const file = join(root, dir, c);
    if (!existsSync(file)) continue;
    const first = readFileSync(file, 'utf8').split('\n').find((l) => /^\s*import\b/.test(l));
    return Boolean(first && first.includes('dev-bootstrap'));
  }
  return false;
};
function wiring() {
  const items = [];
  if (backendDir) {
    items.push(['backend: dev-bootstrap is the first import of the entry file', firstImportIsBootstrap(backendDir, ['src/index.ts', 'src/server.ts', 'src/server.js', 'src/index.js'])]);
    if (detected.has.pino && found(backendDir, /from\s+['"]pino['"]|require\(\s*['"]pino['"]/)) items.push(['backend: devPinoStream() is added to the pino setup (existing destinations kept)', found(backendDir, /devPinoStream\s*\(/)]);
    if (detected.has.pg) items.push(['backend: the pg pool is wrapped with instrumentPool()', found(backendDir, /instrumentPool\s*\(/)]);
    if (detected.has.express) {
      items.push(['backend: devRequestMiddleware() is mounted', found(backendDir, /devRequestMiddleware\s*\(/)]);
      items.push(['backend: devErrorMiddleware is registered after the routes', found(backendDir, /devErrorMiddleware/)]);
      if (detected.has.pg) items.push(['backend: registerDevFaultRoutes receives the pg pool', found(backendDir, /registerDevFaultRoutes\s*\([^)]*pool/)]);
    }
  }
  if (frontendDir) {
    items.push(['frontend: dev-bootstrap is the first import of the entry file', firstImportIsBootstrap(frontendDir, ['src/main.tsx', 'src/index.tsx', 'src/main.ts', 'src/main.jsx', 'src/index.jsx', 'src/main.js'])]);
    const viteConfig = detected.packages.find((p) => p.dir === frontendDir)?.viteConfig;
    items.push(['frontend: devLogSink() is in the Vite plugins', Boolean(viteConfig) && /devLogSink\s*\(/.test(readFileSync(join(root, viteConfig), 'utf8'))]);
    items.push(['frontend: DevErrorBoundary wraps the app', found(frontendDir, /<DevErrorBoundary/)]);
    if (detected.has.react19) items.push(['frontend: reactRootErrorHandlers are passed to createRoot', found(frontendDir, /reactRootErrorHandlers/)]);
  }
  return items;
}
if (flag('--check-wiring')) {
  const items = wiring();
  for (const [label, ok] of items) console.log(`${ok ? 'WIRED  ' : 'MISSING'} ${label}`);
  process.exit(items.every(([, ok]) => ok) ? 0 : 3);
}

// Report.
if (conflicts.length) {
  console.error(`install: conflicts, nothing written:\n  - ${conflicts.join('\n  - ')}`);
  process.exit(2);
}
const line = (s) => console.log(s);
line(dryRun ? 'DRY RUN: nothing will be written.' : 'Applying changes.');
for (const c of changes) {
  line(`${c.before === null ? 'create' : 'update'}  ${rel(c.path)}`);
  if (dryRun && c.before !== null && c.path.endsWith('package.json')) {
    const b = new Set(c.before.split('\n'));
    const a = new Set(c.after.split('\n'));
    for (const l of c.before.split('\n')) if (!a.has(l)) line(`  - ${l}`);
    for (const l of c.after.split('\n')) if (!b.has(l)) line(`  + ${l}`);
  }
}
for (const d of deletions) line(`delete  ${rel(d)}`);
for (const n of notes) line(`note    ${n}`);
if (!changes.length && !deletions.length) line('Nothing to do: already installed (empty diff).');
for (const [label, ok] of wiring()) line(`${ok ? 'wired  ' : 'MISSING'} ${label}`);

if (!dryRun) {
  for (const c of changes) {
    mkdirSync(dirname(c.path), { recursive: true });
    writeFileSync(c.path, c.after, 'utf8');
    if (c.owned) manifest.files[rel(c.path)] = sha(c.after);
  }
  for (const d of deletions) rmSync(d, { force: true });
  for (const path of adopted) manifest.files[rel(path)] = sha(readFileSync(path, 'utf8'));
  if (changes.some((c) => c.owned) || adopted.length) {
    mkdirSync(dirname(manifestPath), { recursive: true });
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  }
}
