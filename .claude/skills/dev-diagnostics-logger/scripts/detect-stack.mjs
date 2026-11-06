#!/usr/bin/env node
// Deterministic, read-only repo inspection. Prints one JSON object. No network, no writes. Exit code is always 0.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const argIndex = process.argv.indexOf('--root');
const root = resolve(argIndex > -1 ? (process.argv[argIndex + 1] ?? '.') : '.');
const WATCHED = ['vite', 'react', 'react-dom', 'express', 'drizzle-orm', 'pg', 'pino', '@tanstack/react-query', 'eslint', 'oxlint', 'typescript', 'vitest', 'playwright', '@playwright/test'];
const ENTRY_CANDIDATES = ['src/main.tsx', 'src/index.tsx', 'src/main.ts', 'src/server.ts', 'src/index.ts', 'src/app.ts', 'src/main.jsx', 'src/index.jsx', 'src/main.js', 'src/server.js', 'src/index.js', 'src/app.js'];
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.logs', 'coverage', '.vite']);

const readJson = (file) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
};
const rootPkg = readJson(join(root, 'package.json'));

function packageManager() {
  if (existsSync(join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(root, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(root, 'package-lock.json'))) return 'npm';
  return null;
}

function expandWorkspaces() {
  let patterns = rootPkg?.workspaces;
  if (patterns && !Array.isArray(patterns)) patterns = patterns.packages;
  if (!patterns && existsSync(join(root, 'pnpm-workspace.yaml'))) {
    patterns = [...readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8').matchAll(/^\s*-\s*['"]?([^'"\n#]+?)['"]?\s*$/gm)].map((m) => m[1]);
  }
  const dirs = [];
  for (const pattern of patterns ?? []) {
    if (pattern.startsWith('!')) continue;
    if (pattern.endsWith('/*') || pattern.endsWith('/**')) {
      const parent = join(root, pattern.replace(/\/\*+$/, ''));
      if (existsSync(parent)) {
        for (const name of readdirSync(parent)) {
          const dir = join(parent, name);
          if (statSync(dir).isDirectory() && existsSync(join(dir, 'package.json'))) dirs.push(dir);
        }
      }
    } else if (existsSync(join(root, pattern, 'package.json'))) dirs.push(join(root, pattern));
  }
  if (!dirs.length) {
    for (const sub of ['frontend', 'backend', 'client', 'server', 'apps/*', 'packages/*']) {
      if (sub.endsWith('/*')) {
        const parent = join(root, sub.replace(/\/\*+$/, ''));
        if (existsSync(parent)) {
          for (const name of readdirSync(parent)) {
            const dir = join(parent, name);
            if (statSync(dir).isDirectory() && existsSync(join(dir, 'package.json'))) dirs.push(dir);
          }
        }
      } else if (existsSync(join(root, sub, 'package.json'))) {
        dirs.push(join(root, sub));
      }
    }
  }
  return dirs;
}

function walk(dir, found = [], depth = 0) {
  if (depth > 5) return found;
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, found, depth + 1);
    else if (/\.(ts|tsx|js|mjs)$/.test(name) && st.size < 200_000) found.push(full);
  }
  return found;
}

const LOGGER_NAME = /(^|\/)(\w*logger|logging|log)\.(ts|tsx|js|mjs)$/i;
const LOGGER_CONTENT = [/class\s+\w*Logger\b/, /console\.error\s*=\s*/, /\bpino\s*\(/, /window\.addEventListener\(\s*['"]unhandledrejection/];

function findLoggers(pkgDir) {
  const src = join(pkgDir, 'src');
  if (!existsSync(src)) return [];
  const hits = [];
  for (const file of walk(src)) {
    const rel = relative(root, file).replaceAll('\\', '/');
    if (rel.includes('/devtools/') || /\.test\.|\.spec\./.test(rel)) continue;
    let reason = null;
    if (LOGGER_NAME.test(rel)) reason = 'name';
    else {
      const text = readFileSync(file, 'utf8');
      const matched = LOGGER_CONTENT.find((re) => re.test(text));
      if (matched) reason = `content: ${matched.source}`;
    }
    if (reason) hits.push({ file: rel, reason });
  }
  return hits;
}

function classify(pkg, dir) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps.vite && deps.react) return 'frontend';
  if (deps.express || deps.fastify || deps.koa) return 'backend';
  if (!deps.vite && !deps.express && (pkg.main || pkg.exports) && /shared|common|types/i.test(dir)) return 'shared';
  return 'unknown';
}

function describePackage(dir, pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const found = Object.fromEntries(WATCHED.map((name) => [name, deps[name] ?? null]));
  const rel = relative(root, dir).replaceAll('\\', '/') || '.';
  const entries = ENTRY_CANDIDATES.filter((e) => existsSync(join(dir, e))).map((e) => (rel === '.' ? e : `${rel}/${e}`));
  const viteConfig = ['vite.config.ts', 'vite.config.mts', 'vite.config.js', 'vite.config.mjs'].find((f) => existsSync(join(dir, f)));
  return {
    name: pkg.name ?? null,
    dir: rel,
    role: classify(pkg, rel),
    hasTsconfig: existsSync(join(dir, 'tsconfig.json')),
    viteConfig: viteConfig ? (rel === '.' ? viteConfig : `${rel}/${viteConfig}`) : null,
    entryFiles: entries,
    dependencies: found,
    scripts: { dev: pkg.scripts?.dev ?? null, lint: pkg.scripts?.lint ?? null, build: pkg.scripts?.build ?? null },
    existingLoggers: findLoggers(dir),
  };
}

const workspaceDirs = expandWorkspaces();
const packages = [];
if (rootPkg) {
  const dirs = workspaceDirs.length ? workspaceDirs : [];
  if (!dirs.length) packages.push(describePackage(root, rootPkg));
  for (const dir of dirs) {
    const pkg = readJson(join(dir, 'package.json'));
    if (pkg) packages.push(describePackage(dir, pkg));
  }
}

const rootDeps = { ...rootPkg?.dependencies, ...rootPkg?.devDependencies };
const all = [
  ...packages.flatMap((p) => Object.entries(p.dependencies).filter(([, v]) => v).map(([k]) => k)),
  ...WATCHED.filter((name) => rootDeps[name]),
];
const has = (n) => all.includes(n);
const devScript = rootPkg?.scripts?.dev ?? null;
const frontends = packages.filter((p) => p.role === 'frontend');
const backends = packages.filter((p) => p.role === 'backend');
const reactVersion = packages.map((p) => p.dependencies.react).find(Boolean) ?? null;

console.log(
  JSON.stringify(
    {
      root,
      packageManager: packageManager(),
      isMonorepo: Boolean(rootPkg?.workspaces || existsSync(join(root, 'pnpm-workspace.yaml'))),
      packages,
      frontendDir: frontends.length === 1 ? frontends[0].dir : null,
      backendDir: backends.length === 1 ? backends[0].dir : null,
      ambiguous: { multipleFrontends: frontends.length > 1, multipleBackends: backends.length > 1 },
      has: {
        vite: has('vite'),
        react: has('react'),
        react19: Boolean(reactVersion && /(^|[^\d])(19|[\^~>=]*19)\./.test(reactVersion)),
        express: has('express'),
        drizzle: has('drizzle-orm'),
        pg: has('pg'),
        pino: has('pino'),
        tanstackQuery: has('@tanstack/react-query'),
        eslint: has('eslint'),
        oxlint: has('oxlint'),
        typescript: has('typescript'),
        vitest: has('vitest'),
        playwright: has('playwright') || has('@playwright/test'),
      },
      devScript,
      devAlreadyWrapped: Boolean(devScript && devScript.includes('dev-diagnostics')),
      devRawScript: rootPkg?.scripts?.['dev:raw'] ?? null,
      existingLoggers: packages.flatMap((p) => p.existingLoggers),
      alreadyInstalled: existsSync(join(root, 'tools/dev-diagnostics/dev-runner.mjs')),
    },
    null,
    2,
  ),
);
