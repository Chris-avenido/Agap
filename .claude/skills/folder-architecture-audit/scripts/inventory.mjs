#!/usr/bin/env node
// folder-architecture-audit: deterministic, read-only inventory of a TS/Node repo.
// Built-in modules only. Writes JSON to the OS temp dir (never inside --root).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import process from 'node:process';

// ---------- args ----------
function parseArgs(argv) {
  const o = { root: process.cwd(), out: null, treeDepth: 4 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const v = argv[i + 1];
    if (a === '--root' && v) { o.root = v; i++; }
    else if (a === '--out' && v) { o.out = v; i++; }
    else if (a === '--tree-depth' && v && /^\d+$/.test(v)) { o.treeDepth = Number(v); i++; }
    else { console.error(`Bad argument: ${a}\nUsage: inventory.mjs [--root <path>] [--out <path>] [--tree-depth <n>]`); process.exit(2); }
  }
  return o;
}
const args = parseArgs(process.argv.slice(2));
const ROOT = path.resolve(args.root);
if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) { console.error(`Root not found: ${ROOT}`); process.exit(2); }
const OUT = path.resolve(args.out || path.join(os.tmpdir(), 'folder-arch-audit.json'));
const rel0 = path.relative(ROOT, OUT);
if (rel0 === '' || (!rel0.startsWith('..') && !path.isAbsolute(rel0))) {
  console.error(`Refusing to write inside the audited repo: ${OUT}`); process.exit(2);
}

const warnings = [];
const norm = (p) => p.split(path.sep).join('/');
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.turbo']);
const SRC_EXT = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
const isSrc = (f) => SRC_EXT.includes(path.extname(f)) && !f.endsWith('.d.ts');
const isSecret = (n) => n === '.env' || n.startsWith('.env.') || n.endsWith('.pem') || n.endsWith('.key');
const median = (a) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };
function readText(rel) {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
  catch (e) { warnings.push(`unreadable: ${rel} (${e.code || e.message})`); return null; }
}
function readJson(rel) {
  const t = readText(rel); if (t == null) return null;
  try { return JSON.parse(t); } catch { try { return JSON.parse(stripJsonc(t)); } catch { warnings.push(`bad json: ${rel}`); return null; } }
}
function stripJsonc(t) {
  let out = '', i = 0, inStr = false;
  while (i < t.length) {
    const c = t[i], n = t[i + 1];
    if (inStr) { out += c; if (c === '\\') { out += n; i += 2; continue; } if (c === '"') inStr = false; i++; continue; }
    if (c === '"') { inStr = true; out += c; i++; continue; }
    if (c === '/' && n === '/') { while (i < t.length && t[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < t.length && !(t[i] === '*' && t[i + 1] === '/')) i++; i += 2; continue; }
    out += c; i++;
  }
  return out.replace(/,(\s*[}\]])/g, '$1');
}

// ---------- walk ----------
const allFiles = [];           // rel paths (forward slashes)
const dirFileCount = new Map(); // rel dir -> direct file count
const allDirs = [];
function walk(relDir) {
  let entries;
  try { entries = fs.readdirSync(path.join(ROOT, relDir), { withFileTypes: true }); }
  catch (e) { warnings.push(`unreadable dir: ${relDir || '.'}`); return; }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  let n = 0;
  for (const e of entries) {
    const rel = relDir ? `${relDir}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue;
      allDirs.push(rel); walk(rel);
    } else if (e.isFile()) {
      if (isSecret(e.name)) continue;
      allFiles.push(rel); n++;
    }
  }
  dirFileCount.set(relDir, n);
}
walk('');
const isGenerated = (f) => /(^|\/)drizzle\//.test(f) || /\.generated\./.test(f) || f.endsWith('.d.ts');
const isTest = (f) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(f) || /(^|\/)(__tests__|e2e|tests?)\//.test(f);

// ---------- workspaces ----------
const rootPkg = readJson('package.json') || {};
let wsPatterns = Array.isArray(rootPkg.workspaces) ? rootPkg.workspaces : (rootPkg.workspaces && rootPkg.workspaces.packages) || [];
if (fs.existsSync(path.join(ROOT, 'pnpm-workspace.yaml'))) {
  const y = readText('pnpm-workspace.yaml') || '';
  for (const m of y.matchAll(/^\s*-\s*['"]?([^'"\s#]+)['"]?/gm)) wsPatterns.push(m[1]);
}
const dirSet = new Set(allDirs);
const hasFile = (rel) => allFiles.includes(rel);
const fileSet = new Set(allFiles);
function expandPattern(p) {
  p = p.replace(/^\.\//, '').replace(/\/$/, '');
  if (p.endsWith('/*') || p.endsWith('/**')) {
    const base = p.replace(/\/\*+$/, '');
    return allDirs.filter((d) => path.posix.dirname(d) === base);
  }
  return dirSet.has(p) ? [p] : [];
}
const wsMap = new Map();
for (const p of wsPatterns) for (const d of expandPattern(p)) if (!wsMap.has(d)) wsMap.set(d, true);
const declared = new Set(wsMap.keys());
for (const d of allDirs) { // implicit packages (have package.json, depth <= 2)
  if (d.split('/').length <= 2 && fileSet.has(`${d}/package.json`) && !wsMap.has(d)) wsMap.set(d, false);
}
const workspaces = [];
for (const [d, decl] of wsMap) {
  const pkg = readJson(`${d}/package.json`) || {};
  workspaces.push({ name: pkg.name || d, path: d, declared: decl, hasPackageJson: fileSet.has(`${d}/package.json`),
    hasTsconfig: fileSet.has(`${d}/tsconfig.json`), hasAgentsMd: fileSet.has(`${d}/AGENTS.md`), hasClaudeMd: fileSet.has(`${d}/CLAUDE.md`),
    _pkg: pkg });
}
const isMonorepo = workspaces.length >= 2;
if (!isMonorepo && !workspaces.length) {
  workspaces.push({ name: rootPkg.name || '(root)', path: '.', declared: false, hasPackageJson: fileSet.has('package.json'),
    hasTsconfig: fileSet.has('tsconfig.json'), hasAgentsMd: fileSet.has('AGENTS.md'), hasClaudeMd: fileSet.has('CLAUDE.md'), _pkg: rootPkg });
}
workspaces.sort((a, b) => b.path.length - a.path.length);
function wsOf(rel) {
  for (const w of workspaces) if (w.path === '.' || rel === w.path || rel.startsWith(w.path + '/')) return w;
  return null;
}
const wsName = (rel) => (wsOf(rel) || { name: '(root)' }).name;
function roleOf(w) {
  const deps = { ...(w._pkg.dependencies || {}), ...(w._pkg.devDependencies || {}) };
  const s = `${w.path} ${w.name}`.toLowerCase();
  if (/(^|[\/@-])(shared|common|contracts)($|[\/-])/.test(s)) return 'shared';
  if (/frontend|client|web\b|ui\b/.test(s) || deps.react || deps.vite) return 'frontend';
  if (/backend|server|api\b/.test(s) || deps.express || deps.fastify) return 'backend';
  return 'other';
}
for (const w of workspaces) w.role = roleOf(w);
const roleOfFile = (rel) => (wsOf(rel) ? wsOf(rel).role : 'other');

// ---------- source files ----------
const srcFiles = allFiles.filter(isSrc);
const generated = allFiles.filter(isGenerated);
const content = new Map();
const files = [];
for (const f of srcFiles) {
  const t = readText(f); if (t == null) continue;
  content.set(f, t);
  const gen = isGenerated(f);
  files.push({ path: f, lines: t.split('\n').length, estimatedTokens: Math.round(t.length / 4), workspace: wsName(f), generated: gen, test: isTest(f) });
}
const fileInfo = new Map(files.map((x) => [x.path, x]));
const stat = files.filter((x) => !x.generated);
const sizeBuckets = { over300: 0, over500: 0, over1000: 0, over2000: 0, total: stat.length };
for (const x of stat) { if (x.lines > 300) sizeBuckets.over300++; if (x.lines > 500) sizeBuckets.over500++; if (x.lines > 1000) sizeBuckets.over1000++; if (x.lines > 2000) sizeBuckets.over2000++; }
const largest = [...stat].sort((a, b) => b.lines - a.lines).slice(0, 20).map(({ path: p, lines, estimatedTokens }) => ({ path: p, lines, estimatedTokens }));

// ---------- tree ----------
const tree = [];
for (const d of ['', ...allDirs]) {
  const depth = d ? d.split('/').length : 0;
  if (depth <= args.treeDepth) tree.push({ dir: d || '.', depth, files: dirFileCount.get(d) || 0 });
}

// ---------- tsconfig aliases ----------
const tsconfigCache = new Map();
function loadTsconfig(rel, seen = new Set()) {
  if (tsconfigCache.has(rel)) return tsconfigCache.get(rel);
  const r = { baseUrl: null, paths: {} };
  tsconfigCache.set(rel, r);
  if (seen.has(rel) || !fileSet.has(rel)) return r;
  seen.add(rel);
  const j = readJson(rel); if (!j) return r;
  const dir = path.posix.dirname(rel);
  if (typeof j.extends === 'string' && j.extends.startsWith('.')) {
    const ext = path.posix.normalize(path.posix.join(dir, j.extends.endsWith('.json') ? j.extends : j.extends + '.json'));
    const e = loadTsconfig(ext, seen); r.baseUrl = e.baseUrl; r.paths = { ...e.paths };
  }
  const co = j.compilerOptions || {};
  if (co.baseUrl) r.baseUrl = path.posix.normalize(path.posix.join(dir, co.baseUrl));
  if (co.paths) {
    const base = r.baseUrl || dir;
    for (const [k, v] of Object.entries(co.paths)) r.paths[k] = (v || []).map((x) => path.posix.normalize(path.posix.join(base, x)));
  }
  return r;
}

// ---------- import resolution ----------
function tryFile(base) {
  base = path.posix.normalize(base);
  const cands = [base];
  const ext = path.posix.extname(base);
  const stem = ext ? base.slice(0, -ext.length) : base;
  if (ext === '.js') cands.push(stem + '.ts', stem + '.tsx');
  if (ext === '.jsx') cands.push(stem + '.tsx');
  if (ext === '.mjs') cands.push(stem + '.mts');
  for (const e of SRC_EXT) cands.push(base + e);
  for (const e of SRC_EXT) cands.push(`${base}/index${e}`);
  for (const c of cands) if (fileSet.has(c) && isSrc(c)) return c;
  return null;
}
function wsEntry(w, sub) {
  if (sub) return tryFile(`${w.path}/${sub}`) || tryFile(`${w.path}/src/${sub}`);
  const p = w._pkg; const tries = [];
  const ex = p.exports && (typeof p.exports === 'string' ? p.exports : p.exports['.']);
  const exs = typeof ex === 'string' ? ex : ex && (ex.import || ex.default || ex.types);
  for (const x of [exs, p.source, p.module, p.main, p.types]) if (typeof x === 'string') tries.push(x);
  for (const t of tries) { const r = tryFile(`${w.path}/${t.replace(/^\.\//, '')}`); if (r) return r; }
  return tryFile(`${w.path}/src/index`) || tryFile(`${w.path}/index`);
}
const nameToWs = new Map(workspaces.filter((w) => w._pkg.name).map((w) => [w._pkg.name, w]));
function resolveSpec(from, spec) {
  if (spec.startsWith('.')) { const r = tryFile(path.posix.join(path.posix.dirname(from), spec)); return r ? { local: r } : { unresolvedLocal: true }; }
  const w = wsOf(from);
  const tcs = [];
  if (w && w.path !== '.') tcs.push(`${w.path}/tsconfig.json`);
  tcs.push('tsconfig.json');
  for (const t of tcs) {
    const c = loadTsconfig(t);
    for (const [k, vs] of Object.entries(c.paths)) {
      const star = k.indexOf('*');
      let sub = null;
      if (star < 0) { if (spec === k) sub = ''; }
      else if (spec.startsWith(k.slice(0, star)) && spec.endsWith(k.slice(star + 1))) sub = spec.slice(star, spec.length - (k.length - star - 1));
      if (sub == null) continue;
      for (const v of vs) { const r = tryFile(v.replace('*', sub)); if (r) return { local: r }; }
    }
    if (c.baseUrl) { const r = tryFile(`${c.baseUrl}/${spec}`); if (r) return { local: r }; }
  }
  for (const [name, ww] of nameToWs) {
    if (spec === name) { const r = wsEntry(ww, ''); if (r) return { local: r }; }
    else if (spec.startsWith(name + '/')) { const r = wsEntry(ww, spec.slice(name.length + 1)); if (r) return { local: r }; }
  }
  const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
  return { external: pkg.replace(/^node:/, '') };
}

const IMPORT_RES = [
  /(?:import|export)\s+(?:type\s+)?([\s\S]*?)\s+from\s*['"]([^'"\n]+)['"]/g,
  /import\s*['"]([^'"\n]+)['"]/g,
  /require\(\s*['"]([^'"\n]+)['"]\s*\)/g,
  /import\(\s*['"]([^'"\n]+)['"]\s*\)/g,
];
const graph = new Map();      // file -> Set(local file)
const externals = new Map();  // file -> Set(pkg)
const bindings = new Map();   // file -> Map(ident -> local file)
let unresolvedLocal = 0;
function parseClause(clause, target, map) {
  clause = clause.replace(/\btype\s+/g, '');
  const ns = clause.match(/\*\s+as\s+([\w$]+)/); if (ns) map.set(ns[1], target);
  const named = clause.match(/\{([\s\S]*?)\}/);
  if (named) for (const part of named[1].split(',')) { const m = part.trim().match(/(?:[\w$]+\s+as\s+)?([\w$]+)$/); if (m) map.set(m[1], target); }
  const def = clause.replace(/\{[\s\S]*?\}/, '').replace(/\*\s+as\s+[\w$]+/, '').split(',')[0].trim();
  if (/^[\w$]+$/.test(def)) map.set(def, target);
}
for (const [f, t] of content) {
  const g = new Set(), ex = new Set(), bm = new Map();
  const add = (spec, clause) => {
    const r = resolveSpec(f, spec);
    if (r.local) { if (r.local !== f) g.add(r.local); if (clause) parseClause(clause, r.local, bm); }
    else if (r.external) ex.add(r.external);
    else if (r.unresolvedLocal) unresolvedLocal++;
  };
  for (const m of t.matchAll(IMPORT_RES[0])) add(m[2], m[1]);
  for (const m of t.matchAll(IMPORT_RES[1])) add(m[1]);
  for (const m of t.matchAll(IMPORT_RES[2])) {
    add(m[1]);
    const pre = t.slice(Math.max(0, m.index - 80), m.index);
    const b = pre.match(/(?:const|let|var)\s+(\{[^}]*\}|[\w$]+)\s*=\s*$/);
    if (b) { const r = resolveSpec(f, m[1]); if (r.local) parseClause(b[1], r.local, bm); }
  }
  for (const m of t.matchAll(IMPORT_RES[3])) add(m[1]);
  graph.set(f, g); externals.set(f, ex); bindings.set(f, bm);
}
const importsOut = {};
let edgeCount = 0;
for (const [f, g] of graph) { importsOut[f] = { local: [...g].sort(), external: [...externals.get(f)].sort() }; edgeCount += g.size; }

// ---------- layer vs feature ----------
const TECH = new Set(['controllers', 'services', 'repositories', 'models', 'routes', 'middleware', 'middlewares', 'components', 'hooks', 'store', 'utils', 'helpers', 'types', 'lib', 'config', 'schemas', 'validators', 'handlers']);
const layerVsFeature = {};
for (const w of workspaces) {
  const srcDir = dirSet.has(`${w.path}/src`) ? `${w.path}/src` : w.path === '.' ? '' : w.path;
  const prefix = srcDir ? srcDir + '/' : '';
  const top = new Map(), second = new Map();
  for (const x of stat) {
    if (!x.path.startsWith(prefix) || wsOf(x.path) !== w) continue;
    const parts = x.path.slice(prefix.length).split('/');
    if (parts.length > 1) top.set(parts[0], (top.get(parts[0]) || 0) + 1);
    if (parts.length > 2) { const k = `${parts[0]}/${parts[1]}`; second.set(k, (second.get(k) || 0) + 1); }
  }
  const cls = (name) => (TECH.has(name.toLowerCase()) ? 'technical' : 'feature');
  const topList = [...top].map(([name, files]) => ({ name, files, kind: cls(name) }));
  const secList = [...second].map(([name, files]) => ({ name, files, kind: cls(name.split('/')[1]) }));
  const tt = topList.filter((x) => x.kind === 'technical').length;
  const st = secList.filter((x) => x.kind === 'technical').length;
  const all = topList.length + secList.length;
  const share = all ? +(((tt + st) / all)).toFixed(2) : 0;
  const topShare = topList.length ? +(tt / topList.length).toFixed(2) : 0;
  layerVsFeature[w.name] = { srcDir: srcDir || '.', topLevel: topList, secondLevel: secList,
    technicalShare: share, topLevelTechnicalShare: topShare,
    style: !topList.length ? 'flat' : topShare >= 0.6 ? 'layer-first' : topShare <= 0.3 ? 'feature-first' : 'mixed' };
}

// ---------- cross boundary ----------
const SERVER_ONLY = ['express', 'drizzle-orm', 'drizzle-kit', 'pg', 'ioredis', 'redis', 'bullmq', 'postgres', 'fastify'];
const isServerPkg = (p) => SERVER_ONLY.includes(p) || p.startsWith('drizzle-orm');
const crossBoundary = { workspaceToWorkspace: [], frontendServerImports: [], sharedAppImports: [], sharedServerCode: [], deepImports: {} };
const CONTAINERS = new Set(['modules', 'features', 'pages', 'domains', 'slices', 'widgets', 'entities']);
function moduleOf(f) {
  const w = wsOf(f); if (!w) return null;
  const srcDir = dirSet.has(`${w.path}/src`) ? `${w.path}/src/` : w.path === '.' ? '' : `${w.path}/`;
  if (!f.startsWith(srcDir)) return null;
  const parts = f.slice(srcDir.length).split('/');
  if (parts.length < 2) return null;
  if (CONTAINERS.has(parts[0])) return parts.length > 2 ? `${parts[0]}/${parts[1]}` : null;
  return parts[0];
}
for (const [f, g] of graph) {
  const fi = fileInfo.get(f); if (fi.generated || fi.test) continue;
  const wf = wsOf(f), rf = roleOfFile(f);
  for (const t of g) {
    const wt = wsOf(t), rt = roleOfFile(t);
    if (wf && wt && wf !== wt) {
      if (rt !== 'shared') crossBoundary.workspaceToWorkspace.push({ from: f, to: t });
      if (rf === 'frontend' && rt === 'backend') crossBoundary.frontendServerImports.push({ from: f, to: t, kind: 'backend-path' });
      if (rf === 'shared' && (rt === 'backend' || rt === 'frontend')) crossBoundary.sharedAppImports.push({ from: f, to: t });
    }
    // deep imports (only into feature-classified module folders)
    const mf = moduleOf(f), mt = moduleOf(t);
    if (mt && mf !== mt && wf === wt && !/^index\./.test(path.posix.basename(t))) {
      const last = mt.split('/').pop();
      if (!TECH.has(last.toLowerCase())) {
        const key = wf.name;
        (crossBoundary.deepImports[key] ||= { count: 0, samples: [] }).count++;
        if (crossBoundary.deepImports[key].samples.length < 15) crossBoundary.deepImports[key].samples.push({ from: f, to: t });
      }
    }
  }
  for (const p of externals.get(f)) {
    if (rf === 'frontend' && isServerPkg(p)) crossBoundary.frontendServerImports.push({ from: f, to: p, kind: 'server-package' });
    if (rf === 'shared' && isServerPkg(p)) crossBoundary.sharedServerCode.push({ file: f, package: p });
  }
}
for (const v of Object.values(crossBoundary.deepImports)) v.samples.sort((a, b) => a.from.localeCompare(b.from));
crossBoundary.counts = { workspaceToWorkspace: crossBoundary.workspaceToWorkspace.length, frontendServerImports: crossBoundary.frontendServerImports.length,
  sharedAppImports: crossBoundary.sharedAppImports.length, sharedServerCode: crossBoundary.sharedServerCode.length,
  deepImports: Object.fromEntries(Object.entries(crossBoundary.deepImports).map(([k, v]) => [k, v.count])) };

// ---------- cycles (Tarjan) ----------
const idx = new Map(), low = new Map(), onStack = new Set(), stack = [], sccs = [];
let counter = 0;
function strong(v) {
  idx.set(v, counter); low.set(v, counter); counter++; stack.push(v); onStack.add(v);
  for (const w of graph.get(v) || []) {
    if (!graph.has(w)) continue;
    if (!idx.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
    else if (onStack.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
  }
  if (low.get(v) === idx.get(v)) {
    const comp = []; let w;
    do { w = stack.pop(); onStack.delete(w); comp.push(w); } while (w !== v);
    if (comp.length >= 2) sccs.push(comp.sort());
  }
}
for (const v of [...graph.keys()].sort()) if (!idx.has(v)) strong(v);
const cycles = { count: sccs.length, top: sccs.sort((a, b) => b.length - a.length).slice(0, 10).map((m) => ({ size: m.length, members: m })) };

// ---------- endpoints ----------
const ROUTE_RE = /\b(app|router|[A-Za-z0-9_]*[Rr]outer)\.(get|post|put|patch|delete|all)\(\s*(['"`])([^'"`]+)\3/g;
const CHAIN_RE = /\.route\(\s*(['"`])([^'"`]+)\1\s*\)/g;
const lineAt = (t, off) => { let n = 1; for (let i = 0; i < off; i++) if (t.charCodeAt(i) === 10) n++; return n; };
function balancedArgs(t, openIdx) { // openIdx points at '('
  let d = 0, inS = null, i = openIdx;
  for (; i < t.length && i < openIdx + 4000; i++) {
    const c = t[i];
    if (inS) { if (c === '\\') i++; else if (c === inS) inS = null; continue; }
    if (c === '"' || c === "'" || c === '`') inS = c;
    else if (c === '(' || c === '[' || c === '{') d++;
    else if (c === ')' || c === ']' || c === '}') { d--; if (d === 0) break; }
  }
  return t.slice(openIdx + 1, i);
}
function splitTop(s) {
  const out = []; let d = 0, inS = null, cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inS) { cur += c; if (c === '\\') { cur += s[++i] || ''; } else if (c === inS) inS = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inS = c; cur += c; continue; }
    if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--;
    if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}
function classifyArgs(parts) {
  const inline = parts.some((p) => /=>|\bfunction\b/.test(p));
  const idents = parts.filter((p) => /^[A-Za-z_$][\w$.]*(\(.*\))?$/.test(p) && !/=>/.test(p));
  if (!idents.length && !inline) return { handlers: [], middleware: [], inline };
  const handlers = inline ? ['inline'] : [idents[idents.length - 1]];
  return { handlers, middleware: inline ? idents : idents.slice(0, -1), inline };
}
const endpoints = [];
const mounts = [];
const appFiles = new Set();
for (const [f, t] of content) {
  const fi = fileInfo.get(f); if (fi.test || fi.generated) continue;
  if (/\bexpress\(\s*\)/.test(t)) appFiles.add(f);
  for (const m of t.matchAll(ROUTE_RE)) {
    if (!/^[\/*]/.test(m[4])) continue;
    const open = m.index + m[0].indexOf('(', m[1].length);
    const parts = splitTop(balancedArgs(t, open)).slice(1);
    const c = classifyArgs(parts);
    endpoints.push({ method: m[2].toUpperCase(), path: m[4], file: f, line: lineAt(t, m.index), handlers: c.handlers, middleware: c.middleware, inline: c.inline });
  }
  for (const m of t.matchAll(CHAIN_RE)) {
    const seg = t.slice(m.index + m[0].length, m.index + m[0].length + 2500).split(/;\s*\n/)[0];
    for (const mm of seg.matchAll(/\.(get|post|put|patch|delete|all)\(/g)) {
      const parts = splitTop(balancedArgs(seg, mm.index + mm[0].length - 1));
      const c = classifyArgs(parts);
      endpoints.push({ method: mm[1].toUpperCase(), path: m[2], file: f, line: lineAt(t, m.index), handlers: c.handlers, middleware: c.middleware, inline: c.inline });
    }
  }
  const bm = bindings.get(f);
  for (const m of t.matchAll(/\b[A-Za-z0-9_]+\.use\(/g)) {
    const parts = splitTop(balancedArgs(t, m.index + m[0].length - 1));
    let prefix = '';
    if (parts[0] && /^(['"`])[^'"`]*\1$/.test(parts[0])) prefix = parts.shift().slice(1, -1);
    for (const p of parts) {
      const id = p.match(/^([A-Za-z_$][\w$]*)(?:\.[\w$]+)*(?:\(.*\))?$/);
      const target = id && bm.get(id[1]);
      if (target) { mounts.push({ parent: f, prefix, target }); continue; }
      if (!id) continue;
      // best-effort: `arr.forEach((ident) => app.use(prefix, ident))` over a local array of imported routers
      const fe = t.match(new RegExp(String.raw`([\w$]+)\.forEach\(\s*\(?\s*${id[1]}\b`));
      const arr = fe && t.match(new RegExp(String.raw`(?:const|let|var)\s+${fe[1]}\s*(?::[^=]+)?=\s*\[([\s\S]*?)\]`));
      if (arr) for (const el of arr[1].split(',')) { const tg = bm.get(el.trim()); if (tg) mounts.push({ parent: f, prefix, target: tg }); }
    }
  }
}
const joinPath = (a, b) => ('/' + a + '/' + b).replace(/\/+/g, '/').replace(/(.)\/$/, '$1');
function resolveMount(file, seen = new Set()) {
  if (appFiles.has(file)) return { prefix: '', ok: true };
  if (seen.has(file)) return { prefix: '', ok: false };
  seen.add(file);
  for (const m of mounts.filter((x) => x.target === file && x.parent !== file)) {
    const up = resolveMount(m.parent, seen);
    if (up.ok) return { prefix: joinPath(up.prefix, m.prefix), ok: true };
  }
  return { prefix: '', ok: false };
}

// ---------- footprint ----------
const DATA_FILE = (f) => /(^|\/)db\//.test(f) || /(^|\/)(schema|db)\.[cm]?[jt]sx?$/.test(f) || [...(externals.get(f) || [])].some((p) => p.startsWith('drizzle-orm'));
const fpCache = new Map();
function footprint(start) {
  if (fpCache.has(start)) return fpCache.get(start);
  const dist = new Map([[start, 0]]); const q = [start]; let hops = null;
  while (q.length) {
    const v = q.shift(); const d = dist.get(v);
    if (hops === null && DATA_FILE(v)) hops = d;
    for (const w of graph.get(v) || []) if (!dist.has(w)) { dist.set(w, d + 1); q.push(w); }
  }
  const inScope = [...dist].filter(([f, d]) => d <= 6 && !(fileInfo.get(f) || {}).generated).map(([f]) => f);
  const dirs = new Map();
  for (const f of inScope) { const d = path.posix.dirname(f); dirs.set(d, (dirs.get(d) || 0) + 1); }
  const r = { filesLoaded: inScope.length, directoriesTouched: dirs.size,
    estimatedTokens: inScope.reduce((s, f) => s + (fileInfo.get(f)?.estimatedTokens || 0), 0),
    touchesDataLayer: hops !== null, hopsToDataLayer: hops,
    topDirectories: [...dirs].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5).map(([dir, files]) => ({ dir, files })) };
  fpCache.set(start, r); return r;
}
let resolvedCount = 0;
for (const e of endpoints) {
  const r = resolveMount(e.file);
  e.fullPath = r.ok ? joinPath(r.prefix, e.path) : e.path;
  e.mountResolved = r.ok; if (r.ok) resolvedCount++;
  if (r.ok) { const alt = [...new Set(mounts.filter((x) => x.target === e.file && appFiles.has(x.parent)).map((x) => joinPath(x.prefix, e.path)))].filter((x) => x !== e.fullPath); if (alt.length) e.alsoMountedAt = alt; }
  e.footprint = footprint(e.file);
}
endpoints.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.method.localeCompare(b.method));
const endpointStats = { total: endpoints.length, resolved: resolvedCount, resolveRate: endpoints.length ? +(resolvedCount / endpoints.length).toFixed(2) : null,
  medianFilesLoaded: median(endpoints.map((e) => e.footprint.filesLoaded)), maxFilesLoaded: Math.max(0, ...endpoints.map((e) => e.footprint.filesLoaded)),
  medianDirectories: median(endpoints.map((e) => e.footprint.directoriesTouched)), medianTokens: median(endpoints.map((e) => e.footprint.estimatedTokens)),
  maxTokens: Math.max(0, ...endpoints.map((e) => e.footprint.estimatedTokens)),
  medianHopsToData: median(endpoints.map((e) => e.footprint.hopsToDataLayer).filter((h) => h !== null)),
  endpointsWithoutDataPath: endpoints.filter((e) => !e.footprint.touchesDataLayer).length, inlineHandlers: endpoints.filter((e) => e.inline).length };

// ---------- boundary tooling ----------
const allPkgs = [rootPkg, ...workspaces.map((w) => w._pkg)];
const depNames = new Set(); for (const p of allPkgs) for (const k of ['dependencies', 'devDependencies']) Object.keys(p[k] || {}).forEach((d) => depNames.add(d));
const eslintCfgs = allFiles.filter((f) => /(^|\/)(eslint\.config\.[cm]?[jt]s|\.eslintrc(\.[a-z]+)?)$/.test(f));
const eslintText = eslintCfgs.map((f) => readText(f) || '').join('\n');
const depCruiserCfgs = allFiles.filter((f) => /(^|\/)\.dependency-cruiser\./.test(f) || /dependency-cruiser\.config/.test(f));
const rootScriptsText = JSON.stringify(rootPkg.scripts || {});
const ciGateText = (readText('.claude/skills/ci-gate/SKILL.md') || '') + '\n' + (readText('AGENTS.md') || '').split('\n').slice(0, 200).join('\n');
const ghActions = (() => { try { return fs.readdirSync(path.join(ROOT, '.github/workflows')).map((n) => readText(`.github/workflows/${n}`) || '').join('\n'); } catch { return ''; } })();
const ciText = rootScriptsText + '\n' + ciGateText + '\n' + ghActions;
const tsRefs = allFiles.some((f) => /(^|\/)tsconfig[^/]*\.json$/.test(f) && /"references"\s*:/.test(readText(f) || ''));
const tool = (found, needle) => ({ found, inCi: found ? needle.some((n) => ciText.includes(n)) : false });
const lintScript = Object.keys(rootPkg.scripts || {}).some((k) => /lint/.test(k));
const boundaryTooling = {
  eslintConfigs: eslintCfgs, lintScriptPresent: lintScript,
  'eslint-plugin-boundaries': tool(depNames.has('eslint-plugin-boundaries') || /boundaries\//.test(eslintText), ['lint']),
  'eslint-plugin-import': tool(depNames.has('eslint-plugin-import') || depNames.has('eslint-plugin-import-x'), ['lint']),
  'import/no-restricted-paths': { found: /no-restricted-paths/.test(eslintText), inCi: /no-restricted-paths/.test(eslintText) && lintScript },
  'import/no-cycle': { found: /no-cycle/.test(eslintText), inCi: /no-cycle/.test(eslintText) && lintScript },
  'no-restricted-imports': { found: /no-restricted-imports/.test(eslintText), inCi: /no-restricted-imports/.test(eslintText) && lintScript },
  'dependency-cruiser': { ...tool(depNames.has('dependency-cruiser') || depCruiserCfgs.length > 0, ['depcruise', 'dependency-cruiser']), configs: depCruiserCfgs },
  madge: tool(depNames.has('madge'), ['madge']),
  'typescript-project-references': { found: tsRefs, inCi: tsRefs && /tsc\s+(-b|--build)/.test(ciText) },
  oxlint: tool(depNames.has('oxlint'), ['oxlint']),
  blanketAllowPatterns: /allow\s*:\s*\[?\s*['"]\*\*?['"]/.test(eslintText),
};

// ---------- agent files ----------
const lineCount = (rel) => (readText(rel) || '').split('\n').length;
const ctxFiles = allFiles.filter((f) => /(^|\/)(AGENTS|CLAUDE)\.md$/.test(f));
const listDir = (d) => { try { return fs.readdirSync(path.join(ROOT, d)).sort(); } catch { return []; } };
const rootAgents = (readText('AGENTS.md') || '').split('\n').slice(0, 300).join('\n');
const rootClaude = (readText('CLAUDE.md') || '').split('\n').slice(0, 300).join('\n');
const routingRe = /SKILL\.md|\.claude\/skills|\.agents\/skills/;
const agentFiles = {
  contextFiles: ctxFiles.map((f) => ({ path: f, lines: lineCount(f) })),
  agentRules: listDir('.agents/rules'), agentSkills: listDir('.agents/skills'), claudeSkills: listDir('.claude/skills'),
  claudeSettings: fs.existsSync(path.join(ROOT, '.claude/settings.json')),
  cursorRules: fs.existsSync(path.join(ROOT, '.cursorrules')) || fs.existsSync(path.join(ROOT, '.cursor/rules')),
  routingTable: { agentsMd: routingRe.test(rootAgents), claudeMd: routingRe.test(rootClaude) },
  agentsMdHasCommands: /npm|pnpm|yarn|npx/.test(rootAgents),
};

// ---------- tests ----------
const testFiles = stat.filter((x) => x.test).map((x) => x.path);
const nonTestSrc = new Set(stat.filter((x) => !x.test).map((x) => x.path));
const baseNoExt = (p) => path.posix.basename(p).replace(/\.(test|spec)(?=\.)/, '').replace(/\.[cm]?[jt]sx?$/, '');
let colocated = 0;
for (const t of testFiles) {
  const dir = path.posix.dirname(t); const b = baseNoExt(t);
  const dirs = [dir, ...(path.posix.basename(dir) === '__tests__' ? [path.posix.dirname(dir)] : [])];
  if (dirs.some((d) => SRC_EXT.some((e) => nonTestSrc.has(`${d}/${b}${e}`)))) colocated++;
}
const frameworks = ['vitest', 'jest', 'mocha', '@playwright/test', 'cypress', 'supertest'].filter((d) => depNames.has(d));
const tests = { testFiles: testFiles.length, colocatedCount: colocated, colocatedShare: testFiles.length ? +(colocated / testFiles.length).toFixed(2) : null,
  testDirs: [...new Set(testFiles.map((t) => path.posix.dirname(t)))].slice(0, 15), frameworks };

// ---------- scripts ----------
const SCRIPT_RE = /typecheck|tsc|lint|build|test|ci|dev/;
const pick = (s) => Object.fromEntries(Object.entries(s || {}).filter(([k]) => SCRIPT_RE.test(k)));
const scripts = { root: pick(rootPkg.scripts), workspaces: Object.fromEntries(workspaces.filter((w) => w.path !== '.').map((w) => [w.name, pick(w._pkg.scripts)])) };

// ---------- naming ----------
const GENERIC = new Set(['utils', 'helpers', 'common', 'misc', 'shared', 'types', 'constants']);
const generic = []; const baseCount = new Map();
for (const x of stat) {
  const b = path.posix.basename(x.path).replace(/\.[cm]?[jt]sx?$/, '');
  if (GENERIC.has(b.toLowerCase())) generic.push(x.path);
  if (b !== 'index' && !x.test) { (baseCount.get(b) || baseCount.set(b, []).get(b)).push(path.posix.dirname(x.path)); }
}
const srcDirs = new Set(stat.map((x) => path.posix.dirname(x.path)));
const genericDirs = [...new Set(stat.flatMap((x) => path.posix.dirname(x.path).split('/')))].length
  ? allDirs.filter((d) => GENERIC.has(path.posix.basename(d).toLowerCase()) && [...srcDirs].some((s) => s === d || s.startsWith(d + '/'))) : [];
const utilsFolders = allDirs.filter((d) => /^(utils|helpers)$/i.test(path.posix.basename(d)) && [...srcDirs].some((s) => s === d || s.startsWith(d + '/')))
  .map((d) => ({ dir: d, files: stat.filter((x) => x.path.startsWith(d + '/')).length }));
const barrels = stat.filter((x) => /^index\.[cm]?[jt]sx?$/.test(path.posix.basename(x.path)));
const repeated = [...baseCount].filter(([, ds]) => new Set(ds).size >= 5).map(([name, ds]) => ({ name, count: ds.length })).sort((a, b) => b.count - a.count);
const naming = { genericFiles: generic.length, genericFolders: genericDirs.length,
  genericShare: +((generic.length + genericDirs.length) / Math.max(1, stat.length + srcDirs.size)).toFixed(3),
  genericFilePaths: generic.slice(0, 20), barrelCount: barrels.length, repeatedBasenames: repeated.slice(0, 15), utilsFolders };

// ---------- emit ----------
const result = {
  schemaVersion: 1, root: norm(ROOT), isMonorepo,
  workspaces: workspaces.map(({ _pkg, ...w }) => w).sort((a, b) => a.path.localeCompare(b.path)),
  tree, files: { count: stat.length, generatedExcluded: files.length - stat.length, items: files }, sizeBuckets, largest,
  generatedFiles: { count: generated.length, samples: generated.slice(0, 10) },
  layerVsFeature, imports: { edgeCount, unresolvedLocal, graph: importsOut }, crossBoundary, cycles,
  endpoints: { resolveRate: endpointStats.resolveRate, stats: endpointStats, list: endpoints },
  boundaryTooling, agentFiles, tests, scripts, naming, warnings,
};
fs.writeFileSync(OUT, JSON.stringify(result, null, 1));

const L = [];
L.push(`Inventory written: ${norm(OUT)}`);
L.push(`Root: ${norm(ROOT)}  monorepo: ${isMonorepo}`);
L.push(`Workspaces: ${result.workspaces.map((w) => `${w.name} [${w.role}] (${w.path}${w.declared ? '' : ', implicit'})`).join('; ')}`);
L.push(`Source files: ${stat.length} (+${files.length - stat.length} generated, excluded)  local import edges: ${edgeCount}  unresolved relative: ${unresolvedLocal}`);
L.push(`Size buckets: >300=${sizeBuckets.over300} >500=${sizeBuckets.over500} >1000=${sizeBuckets.over1000} >2000=${sizeBuckets.over2000}`);
L.push(`Largest: ${largest.slice(0, 5).map((x) => `${x.path}(${x.lines})`).join(', ')}`);
for (const [k, v] of Object.entries(layerVsFeature)) L.push(`Layout ${k}: ${v.style}, technical share ${v.technicalShare} (top-level ${v.topLevelTechnicalShare})`);
L.push(`Endpoints: ${endpointStats.total}  resolveRate: ${endpointStats.resolveRate}  inline handlers: ${endpointStats.inlineHandlers}  no data path: ${endpointStats.endpointsWithoutDataPath}`);
L.push(`Footprint (files): median ${endpointStats.medianFilesLoaded}, max ${endpointStats.maxFilesLoaded}; dirs median ${endpointStats.medianDirectories}; tokens median ${endpointStats.medianTokens}, max ${endpointStats.maxTokens}; hops to data median ${endpointStats.medianHopsToData}`);
L.push(`Cycles: ${cycles.count}`);
const cc = crossBoundary.counts;
L.push(`Cross-boundary: ws->ws ${cc.workspaceToWorkspace}, frontend->server ${cc.frontendServerImports}, shared->app ${cc.sharedAppImports}, shared server code ${cc.sharedServerCode}, deep imports ${JSON.stringify(cc.deepImports)}`);
const bt = boundaryTooling;
L.push(`Boundary tooling found: ${Object.entries(bt).filter(([, v]) => v && v.found).map(([k, v]) => `${k}${v.inCi ? '(ci)' : ''}`).join(', ') || 'none'}; lint script: ${bt.lintScriptPresent}; blanket allow: ${bt.blanketAllowPatterns}`);
L.push(`Agent files: ${agentFiles.contextFiles.map((x) => `${x.path}(${x.lines})`).join(', ') || 'none'}; skills: ${agentFiles.claudeSkills.length}; rules: ${agentFiles.agentRules.length}; routing table AGENTS/CLAUDE: ${agentFiles.routingTable.agentsMd}/${agentFiles.routingTable.claudeMd}`);
L.push(`Tests: ${tests.testFiles} files, colocated share ${tests.colocatedShare}, frameworks ${tests.frameworks.join(',') || 'none'}`);
L.push(`Naming: generic share ${naming.genericShare}, barrels ${naming.barrelCount}, repeated basenames ${repeated.length}, utils/helpers folders ${utilsFolders.length}`);
L.push(`Warnings: ${warnings.length}`);
console.log(L.slice(0, 60).join('\n'));
process.exit(0);
