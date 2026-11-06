#!/usr/bin/env node
// Static inventory of endpoints, database writes and persistence-risk candidates (rules R01-R14).
// Read-only: never connects to a database, never runs the app. Node built-ins + the repo's own `typescript`.
// Usage: node inventory.mjs [--root .] [--backend <path>] [--frontend <path>] [--schema <glob>] [--out docs/data-workflow]
//                           [--check-expected <expected.json>]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const args = parseArgs(process.argv.slice(2));
const ROOT = path.resolve(args.root ?? process.cwd());
const OUT = path.resolve(ROOT, args.out ?? 'docs/data-workflow');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const fail = (m) => { console.error(`inventory: ${m}`); process.exit(1); };

function parseArgs(a) {
  const o = {};
  for (let i = 0; i < a.length; i++) if (a[i].startsWith('--')) o[a[i].slice(2)] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
  return o;
}

// ---------- locate inputs ----------
const exists = (p) => fs.existsSync(p);
const BACKEND = path.resolve(ROOT, args.backend ?? [ 'apps/backend', 'packages/backend', 'backend', 'server', 'src' ].find((p) => exists(path.join(ROOT, p))) ?? '');
if (!exists(BACKEND) || BACKEND === ROOT && !args.backend) fail('backend folder not found; pass --backend <path>');
const FRONTEND = args.frontend ? path.resolve(ROOT, args.frontend) : ['apps/frontend', 'packages/frontend', 'frontend', 'client'].map((p) => path.join(ROOT, p)).find(exists);
const SHARED = ['packages/shared', 'shared'].map((p) => path.join(ROOT, p)).find(exists);

const SKIP_DIR = new Set(['node_modules', 'dist', 'build', '.git', 'coverage', '.next', 'migrations', '.logs']);
function walk(dir, out = []) {
  if (!exists(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.isDirectory()) { if (!SKIP_DIR.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (/\.(ts|tsx|js|mjs|cjs)$/.test(e.name) && !/\.(test|spec|d)\.(ts|tsx|js)$/.test(e.name) && !e.name.endsWith('.d.ts')) out.push(path.join(dir, e.name));
  }
  return out;
}
const backendFiles = walk(BACKEND);
const sharedFiles = SHARED ? walk(SHARED) : [];
const frontendFiles = FRONTEND ? walk(FRONTEND) : [];
const srcFiles = [...new Set([...backendFiles, ...sharedFiles])];
if (!backendFiles.length) fail(`no source files under ${BACKEND}`);

// ---------- parser selection ----------
let ts = null;
for (const base of [path.join(ROOT, 'package.json'), import.meta.url.replace('file:///', '')]) {
  try { ts = createRequire(base.startsWith('http') ? base : base)('typescript'); break; } catch { /* try next */ }
}
if (!ts) { try { ts = createRequire(path.join(BACKEND, 'package.json'))('typescript'); } catch { /* regex fallback */ } }
if (ts && !(ts.createSourceFile && ts.ScriptTarget && ts.SyntaxKind)) ts = null; // e.g. TypeScript 7 has no JS compiler API
const PARSER = ts ? 'typescript' : 'regex';
const K = ts?.SyntaxKind;

// ---------- shared helpers ----------
const files = new Map(); // abs -> { sf, text }
const pushU = (arr, v) => { if (!arr.includes(v)) arr.push(v); };
const lineOf = (n) => n.getSourceFile().getLineAndCharacterOfPosition(n.getStart()).line + 1;
const txt = (n) => n.getText();
const snip = (n) => txt(n).split('\n').slice(0, 2).map((l) => l.trim()).join(' ').slice(0, 160);
const strVal = (n) => n && (n.kind === K.StringLiteral || n.kind === K.NoSubstitutionTemplateLiteral) ? n.text : null;
const isFn = (n) => n && (n.kind === K.FunctionDeclaration || n.kind === K.FunctionExpression || n.kind === K.ArrowFunction || n.kind === K.MethodDeclaration);
const propName = (n) => n?.name ? (n.name.text ?? n.name.getText()) : null;
const unwrap = (n) => { while (n && (n.kind === K.ParenthesizedExpression || n.kind === K.AsExpression || n.kind === K.NonNullExpression || n.kind === K.AwaitExpression || n.kind === K.SatisfiesExpression)) n = n.expression; return n; };
function walkNode(n, fn) { fn(n) !== false && n.forEachChild((c) => walkNode(c, fn)); }

function pathFromTemplate(n) {
  if (!n) return null;
  const s = strVal(n);
  if (s !== null) return s;
  if (n.kind === K.TemplateExpression) { let out = n.head.text; for (const sp of n.templateSpans) { out += (out.endsWith('/') ? ':p' : '') + sp.literal.text; } return out; }
  return null;
}

// Evaluate a string expression (literal, template, + concatenation, identifiers bound to consts in enclosing scopes).
let PARAM_ENV = null;
const localFnCache = new Map();
function localFn(sf, name) {
  let m = localFnCache.get(sf);
  if (!m) { m = new Map(); walkNode(sf, (x) => { if (x.kind === K.FunctionDeclaration && x.name) m.set(x.name.text, x); else if (x.kind === K.VariableDeclaration && x.name.kind === K.Identifier && x.initializer && isFn(unwrap(x.initializer))) m.set(x.name.text, unwrap(x.initializer)); }); localFnCache.set(sf, m); }
  return m.get(name) ?? null;
}
function fnReturnExpr(fn) {
  if (!fn.body) return null;
  if (fn.body.kind !== K.Block) return fn.body;
  let r = null; walkNode(fn.body, (x) => { if (!r && x.kind === K.ReturnStatement && x.expression) r = x.expression; });
  return r;
}
function evalStr(n, depth = 0) {
  n = unwrap(n);
  if (!n || depth > 6) return null;
  if (n.kind === K.CallExpression && n.expression.kind === K.Identifier) {
    const d = localFn(n.getSourceFile(), n.expression.text);
    const body = d && fnReturnExpr(d);
    if (body) { const prev = PARAM_ENV; PARAM_ENV = new Set(d.parameters.map((p) => p.name.getText())); const r = evalStr(body, depth + 1); PARAM_ENV = prev; return r; }
  }
  if (n.kind === K.Identifier && PARAM_ENV?.has(n.text)) return ':p';
  const s = strVal(n);
  if (s !== null) return s;
  if (n.kind === K.TemplateExpression) return n.templateSpans.reduce((acc, sp) => { const v = evalStr(sp.expression, depth + 1); return acc + (v !== null ? v : acc.endsWith('/') ? ':p' : '') + sp.literal.text; }, n.head.text);
  if (n.kind === K.BinaryExpression && n.operatorToken.kind === K.PlusToken) { const a = evalStr(n.left, depth + 1); const b = evalStr(n.right, depth + 1); return a === null || b === null ? null : a + b; }
  if (n.kind === K.Identifier) {
    for (let p = n.parent; p; p = p.parent) {
      if (!(isFn(p) || p.kind === K.SourceFile)) continue;
      let found = null;
      walkNode(p.kind === K.SourceFile ? p : (p.body ?? p), (x) => { if (!found && x.kind === K.VariableDeclaration && x.name.kind === K.Identifier && x.name.text === n.text && x.initializer && x.getSourceFile() === n.getSourceFile()) found = x.initializer; });
      if (found) return evalStr(found, depth + 1);
    }
    const c = constInit.get(n.text)?.[0];
    return c ? evalStr(c.init, depth + 1) : null;
  }
  return null;
}

// ---------- regex fallback ----------
function regexScan() {
  const tables = [], endpoints = [], candidates = [];
  for (const f of backendFiles) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, i) => {
      let m = /(\w+)\s*=\s*(?:pgTable|\w+\.table)\(\s*['"`]([^'"`]+)/.exec(l);
      if (m) tables.push({ name: m[2], variable: m[1], file: rel(f), line: i + 1, columns: [], uniques: [] });
      m = /\b(?:app|router)\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)/.exec(l);
      if (m) endpoints.push({ id: `${m[1].toUpperCase()} ${m[2]}`, verb: m[1].toUpperCase(), path: m[2], handler: { file: rel(f), line: i + 1 }, middleware: [], inputSchema: { schemas: [], bodyKeysRead: [], paramsRead: [], queryRead: [], usesRawBody: false }, writes: [], reads: [], responses: [], background: [] });
      if (/^\s*(?:db|tx)\.(?:insert|update|delete)\(/.test(l)) candidates.push({ key: `R01@${rel(f)}:${i + 1}`, rule: 'R01', confidence: 'low', file: rel(f), line: i + 1, snippet: l.trim().slice(0, 140), endpointId: null, note: 'regex parser: statement starts with a write and has no await' });
    });
  }
  return { tables, endpoints, candidates, frontendCalls: [], consumers: [] };
}

// ---------- AST mode ----------
function indexFiles() {
  for (const f of [...srcFiles, ...frontendFiles]) {
    const text = fs.readFileSync(f, 'utf8');
    const sf = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true, /\.(tsx|jsx)$/.test(f) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    files.set(f, { sf, text });
  }
}

const fnsByFile = new Map();   // file -> Map(name -> [fnInfo])
const allFns = new Map();      // name -> [fnInfo]
const imports = new Map();     // file -> Map(local -> {file, name})
const reexports = new Map();   // file -> [{file, names|null}]
const constInit = new Map();   // name -> [{init, file}]
const fnInfos = [];

function resolveModule(from, spec) {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(from), spec.replace(/\.(js|mjs|cjs)$/, ''));
  for (const c of [base + '.ts', base + '.tsx', base + '.js', path.join(base, 'index.ts'), path.join(base, 'index.js'), base]) if (files.has(c)) return c;
  return null;
}

function indexFile(f) {
  const { sf } = files.get(f);
  const fm = new Map(); fnsByFile.set(f, fm);
  const im = new Map(); imports.set(f, im);
  const rx = []; reexports.set(f, rx);
  const add = (name, node, cls) => {
    if (!name) return;
    const info = { name, file: f, node, cls: cls ?? null, isAsync: !!node.modifiers?.some((m) => m.kind === K.AsyncKeyword) };
    fnInfos.push(info);
    (fm.get(name) ?? fm.set(name, []).get(name)).push(info);
    (allFns.get(name) ?? allFns.set(name, []).get(name)).push(info);
  };
  walkNode(sf, (n) => {
    if (n.kind === K.ImportDeclaration) {
      const target = resolveModule(f, n.moduleSpecifier.text);
      const c = n.importClause;
      if (c?.name) im.set(c.name.text, { file: target, name: 'default' });
      const nb = c?.namedBindings;
      if (nb?.kind === K.NamespaceImport) im.set(nb.name.text, { file: target, name: '*' });
      else if (nb) for (const el of nb.elements) im.set(el.name.text, { file: target, name: (el.propertyName ?? el.name).text });
    } else if (n.kind === K.ExportDeclaration && n.moduleSpecifier) {
      const target = resolveModule(f, n.moduleSpecifier.text);
      if (target) rx.push({ file: target, names: n.exportClause?.elements?.map((e) => (e.propertyName ?? e.name).text) ?? null });
    } else if (n.kind === K.FunctionDeclaration && n.name) add(n.name.text, n);
    else if (n.kind === K.VariableDeclaration && n.name.kind === K.Identifier && n.initializer) {
      const init = unwrap(n.initializer);
      (constInit.get(n.name.text) ?? constInit.set(n.name.text, []).get(n.name.text)).push({ init: n.initializer, file: f });
      if (isFn(init)) add(n.name.text, init);
    } else if (n.kind === K.MethodDeclaration && n.name) add(propName(n), n, n.parent?.name?.text);
    else if (n.kind === K.PropertyAssignment && n.name && isFn(unwrap(n.initializer))) add(propName(n), unwrap(n.initializer));
  });
}

function findExported(file, name, depth = 0) {
  if (!file || depth > 4) return null;
  const direct = fnsByFile.get(file)?.get(name)?.[0];
  if (direct) return direct;
  for (const r of reexports.get(file) ?? []) if (!r.names || r.names.includes(name)) { const x = findExported(r.file, name, depth + 1); if (x) return x; }
  return null;
}

const NOISE = new Set(['map', 'filter', 'forEach', 'push', 'get', 'set', 'has', 'add', 'then', 'catch', 'json', 'status', 'send', 'end', 'log', 'warn', 'error', 'info', 'debug', 'parse', 'safeParse', 'toString', 'join', 'includes', 'find', 'some', 'every', 'reduce', 'slice', 'sort', 'next', 'delete', 'register', 'run', 'default']);
function resolveCall(call, f, cls) {
  const callee = call.expression;
  if (callee.kind === K.Identifier) {
    const local = fnsByFile.get(f)?.get(callee.text)?.[0];
    if (local) return local;
    const imp = imports.get(f)?.get(callee.text);
    if (imp?.file) return findExported(imp.file, imp.name);
    return null;
  }
  if (callee.kind === K.PropertyAccessExpression) {
    const n = callee.name.text;
    const o = callee.expression;
    if (o.kind === K.Identifier) {
      const imp = imports.get(f)?.get(o.text);
      if (imp?.name === '*' && imp.file) return findExported(imp.file, n);
    }
    if (NOISE.has(n)) return null;
    if (o.kind === K.ThisKeyword) { const m = fnsByFile.get(f)?.get(n); if (m) return m.find((x) => x.cls === cls) ?? m[0]; }
    const cands = allFns.get(n);
    if (!cands) return null;
    if (cands.length === 1) return cands[0];
    const same = cands.filter((c) => c.file === f);
    return same.length === 1 ? same[0] : null;
  }
  return null;
}

// ----- tables -----
const tables = [];
const tableByVar = new Map();
function chainCalls(expr) { // [{name, args}] from outermost-to-root of a method chain, plus root call
  const calls = [];
  let e = expr;
  while (e) {
    e = unwrap(e);
    if (e.kind === K.CallExpression) {
      const c = e.expression;
      if (c.kind === K.PropertyAccessExpression) { calls.push({ name: c.name.text, args: e.arguments, node: e }); e = c.expression; }
      else { calls.push({ name: c.kind === K.Identifier ? c.text : txt(c), args: e.arguments, node: e, root: true }); break; }
    } else break;
  }
  return calls.reverse(); // root first
}
function colInfo(init) {
  const ch = chainCalls(init);
  if (!ch.length) return null;
  const root = ch[0];
  const info = { dbName: strVal(root.args[0]) ?? null, type: root.name, notNull: false, hasDefault: false, primaryKey: false, unique: false, references: null, generated: false };
  for (const c of ch.slice(1)) {
    if (c.name === 'notNull') info.notNull = true;
    else if (/^(default|defaultNow|defaultRandom|\$defaultFn|\$default|\$onUpdate|\$onUpdateFn)$/.test(c.name)) info.hasDefault = true;
    else if (c.name === 'primaryKey') { info.primaryKey = true; info.notNull = true; }
    else if (c.name === 'unique') info.unique = true;
    else if (c.name === 'references') info.references = c.args[0] ? txt(c.args[0]).replace(/^\(\)\s*=>\s*/, '') : null;
    else if (/^generated/.test(c.name)) info.generated = true;
  }
  if (/^(serial|bigserial|smallserial)$/.test(root.name)) info.hasDefault = true;
  return info;
}
function objectLiteralOf(n, depth = 0) {
  n = unwrap(n);
  if (!n || depth > 3) return null;
  if (n.kind === K.ObjectLiteralExpression) return n;
  if (n.kind === K.Identifier) { const c = constInit.get(n.text)?.[0]; return c ? objectLiteralOf(c.init, depth + 1) : null; }
  if (n.kind === K.CallExpression && n.expression.kind === K.Identifier) {
    const fn = findFnByName(n.expression.text);
    if (fn) { let r = null; walkNode(fn.node.body ?? fn.node, (x) => { if (!r && x.kind === K.ReturnStatement && x.expression) r = objectLiteralOf(x.expression, depth + 1); if (!r && x === fn.node.body && x.kind !== K.Block) r = objectLiteralOf(x, depth + 1); }); return r; }
  }
  return null;
}
const findFnByName = (name) => allFns.get(name)?.[0];
function columnsOf(obj, spreadUnknown) {
  const cols = {};
  for (const p of obj.properties) {
    if (p.kind === K.PropertyAssignment) { const ci = colInfo(p.initializer); if (ci) cols[propName(p)] = ci; }
    else if (p.kind === K.SpreadAssignment) {
      const o = objectLiteralOf(p.expression);
      if (o) Object.assign(cols, columnsOf(o, spreadUnknown)); else spreadUnknown.push(txt(p.expression));
    }
  }
  return cols;
}
function scanTables(schemaGlobRe) {
  const schemaVars = new Set();
  for (const f of srcFiles) walkNode(files.get(f).sf, (n) => {
    if (n.kind === K.VariableDeclaration && n.initializer && n.initializer.kind === K.CallExpression && txt(n.initializer.expression) === 'pgSchema') schemaVars.add(n.name.getText());
  });
  for (const f of srcFiles) {
    if (schemaGlobRe && !schemaGlobRe.test(rel(f))) continue;
    walkNode(files.get(f).sf, (n) => {
      if (n.kind !== K.CallExpression) return;
      const c = n.expression;
      const isPg = (c.kind === K.Identifier && c.text === 'pgTable') || (c.kind === K.PropertyAccessExpression && c.name.text === 'table' && schemaVars.has(txt(c.expression)));
      if (!isPg) return;
      const name = strVal(n.arguments[0]);
      if (!name || !n.arguments[1]) return;
      const obj = objectLiteralOf(n.arguments[1]);
      if (!obj) return;
      const spreadUnknown = [];
      const columns = columnsOf(obj, spreadUnknown);
      const uniques = [], pks = [];
      for (const [k, v] of Object.entries(columns)) { if (v.unique) uniques.push([k]); if (v.primaryKey) pks.push(k); }
      const third = n.arguments[2];
      if (third) walkNode(third, (x) => {
        if (x.kind !== K.CallExpression) return;
        const chain = chainCalls(x);
        const rootName = chain[0]?.name;
        const onCall = chain.find((cc) => cc.name === 'on');
        if (/^(unique|uniqueIndex)$/.test(rootName) && onCall) uniques.push([...onCall.args].map((a) => txt(a).split('.').pop()));
        if (x.expression.kind === K.Identifier) { const helper = findFnByName(x.expression.text); const m = helper && /primaryKey\([\s\S]*?columns:\s*\[\s*t\.(\w+)/s.exec(txt(helper.node)); if (m) pks.push(m[1]); }
        if (rootName === 'primaryKey') { const o = chain[0].args[0]; const colsProp = o && o.kind === K.ObjectLiteralExpression ? o.properties.find((p) => propName(p) === 'columns') : null; if (colsProp?.initializer?.elements) pks.push(...colsProp.initializer.elements.map((e) => txt(e).split('.').pop())); }
      });
      const varDecl = n.parent?.kind === K.VariableDeclaration ? n.parent.name.getText() : null;
      const t = { name: (schemaVars.has(c.kind === K.PropertyAccessExpression ? txt(c.expression) : '') ? `${strVal(findSchemaName(c.expression)) ?? ''}.`.replace(/^\.$/, '') : '') + name, shortName: name, variable: varDecl, file: rel(f), line: lineOf(n),
        columns: Object.fromEntries(Object.entries(columns).sort(([a], [b]) => a.localeCompare(b))), primaryKey: pks.sort(), uniques: uniques.map((u) => u.sort()), spreadUnresolved: spreadUnknown };
      tables.push(t);
      if (varDecl) tableByVar.set(varDecl, t);
    });
  }
  tables.sort((a, b) => a.name.localeCompare(b.name));
}
function findSchemaName(idNode) { // pgSchema('esf7') -> 'esf7'
  const c = constInit.get(txt(idNode))?.[0];
  const init = c && unwrap(c.init);
  return init?.kind === K.CallExpression ? init.arguments[0] : null;
}

// ----- zod schema evaluation -----
const schemaCache = new Map();
function evalSchema(n, depth = 0) {
  n = unwrap(n);
  const empty = () => ({ keys: new Map(), strict: false, passthrough: false, unresolved: false });
  if (!n || depth > 8) return { ...empty(), unresolved: true };
  if (n.kind === K.Identifier) {
    if (schemaCache.has(n.text)) return schemaCache.get(n.text);
    const c = constInit.get(n.text)?.[0];
    if (!c) return { ...empty(), unresolved: true };
    schemaCache.set(n.text, { ...empty(), unresolved: true });
    const r = evalSchema(c.init, depth + 1);
    schemaCache.set(n.text, r);
    return r;
  }
  if (n.kind === K.PropertyAccessExpression && n.name.text === 'shape') return evalSchema(n.expression, depth + 1);
  if (n.kind !== K.CallExpression) return { ...empty(), unresolved: true };
  const c = n.expression;
  if (c.kind === K.PropertyAccessExpression) {
    const m = c.name.text;
    const base = c.expression;
    if (base.kind === K.Identifier && base.text === 'z') {
      const r = empty();
      if (m === 'object' || m === 'strictObject' || m === 'looseObject') {
        r.strict = m === 'strictObject'; r.passthrough = m === 'looseObject';
        addShape(r, n.arguments[0], depth);
      } else if (m === 'array' || m === 'optional' || m === 'nullable') { const e = n.arguments[0] ? evalSchema(n.arguments[0], depth + 1) : r; return e; }
      else if (m === 'union' || m === 'discriminatedUnion') {
        const arr = n.arguments[m === 'union' ? 0 : 1];
        for (const el of arr?.elements ?? []) { const e = evalSchema(el, depth + 1); for (const [k, v] of e.keys) r.keys.set(k, v); r.unresolved ||= e.unresolved; }
        r.partialUnion = true;
      } else r.unresolved = true;
      return r;
    }
    const b = evalSchema(base, depth + 1);
    const r = { keys: new Map(b.keys), strict: b.strict, passthrough: b.passthrough, unresolved: b.unresolved };
    if (m === 'extend') addShape(r, n.arguments[0], depth);
    else if (m === 'merge' || m === 'and') { const o = evalSchema(n.arguments[0], depth + 1); for (const [k, v] of o.keys) r.keys.set(k, v); r.unresolved ||= o.unresolved; }
    else if (m === 'pick' || m === 'omit') {
      const o = n.arguments[0]; const ks = o?.kind === K.ObjectLiteralExpression ? o.properties.map(propName) : null;
      if (ks) for (const k of [...r.keys.keys()]) if (m === 'pick' ? !ks.includes(k) : ks.includes(k)) r.keys.delete(k); else r.unresolved ||= false;
      else r.unresolved = true;
    } else if (m === 'strict') r.strict = true;
    else if (m === 'passthrough' || m === 'loose') r.passthrough = true;
    return r;
  }
  return { ...empty(), unresolved: true };
}
function addShape(r, arg, depth) {
  const o = objectLiteralOf(arg);
  if (!o) { if (arg?.kind === K.Identifier) { const e = evalSchema(arg, depth + 1); for (const [k, v] of e.keys) r.keys.set(k, v); r.unresolved ||= e.unresolved; } else r.unresolved = true; return; }
  for (const p of o.properties) {
    if (p.kind === K.PropertyAssignment) r.keys.set(propName(p), txt(p.initializer).replace(/\s+/g, ' ').slice(0, 200));
    else if (p.kind === K.ShorthandPropertyAssignment) r.keys.set(propName(p), p.name.text);
    else if (p.kind === K.SpreadAssignment) { const e = objectLiteralOf(p.expression); if (e) addShape(r, e, depth + 1); else r.unresolved = true; }
  }
}
const isSchemaName = (name) => { const c = constInit.get(name)?.[0]; if (!c) return false; const r = unwrap(c.init); return r?.kind === K.CallExpression && /\bz\b|Schema|object\(|extend\(/.test(txt(r).slice(0, 80)) || /Schema$/.test(name); };

// ----- function fact extraction -----
const DB_NAME = /^(db|tx|trx|database|dbc|conn|executor|dbOrTx|client)$/i;
const READER = /^(replica|readDb|readdb|reader|readOnly|cache|redis|cacheClient)$/i;
const mutating = (v) => /^(POST|PUT|PATCH|DELETE)$/.test(v);
const factsCache = new Map();

function consumption(top) {
  let n = top;
  for (let i = 0; i < 10; i++) {
    const p = n.parent;
    if (!p) return 'unknown';
    switch (p.kind) {
      case K.AwaitExpression: return 'awaited';
      case K.ReturnStatement: return 'returned';
      case K.ExpressionStatement: return 'floating';
      case K.VoidExpression: return 'voided';
      case K.ArrowFunction: if (p.body === n) { const c = p.parent; if (c?.kind === K.CallExpression) { n = c; continue; } return 'returned'; } return 'unknown';
      case K.ArrayLiteralExpression: case K.ParenthesizedExpression: case K.AsExpression: case K.NonNullExpression: case K.ConditionalExpression: case K.BinaryExpression:
        if (p.kind === K.BinaryExpression && p.operatorToken.kind === K.EqualsToken) return 'assigned';
        n = p; continue;
      case K.CallExpression:
        if (p.arguments.includes(n) && /^Promise\.(all|allSettled|race|any)$/.test(txt(p.expression))) { n = p; continue; }
        if (p.expression === n) { n = p; continue; }
        return 'passed';
      case K.PropertyAccessExpression: if (p.expression === n) { n = p.parent; if (!n) return 'unknown'; continue; } return 'unknown';
      case K.VariableDeclaration: case K.PropertyAssignment: case K.ShorthandPropertyAssignment: return 'assigned';
      default: return 'unknown';
    }
  }
  return 'unknown';
}
function resultUsed(top) {
  let p = top.parent;
  while (p && (p.kind === K.AwaitExpression || p.kind === K.ParenthesizedExpression || p.kind === K.AsExpression)) p = p.parent;
  return !!p && p.kind !== K.ExpressionStatement && p.kind !== K.VoidExpression;
}
function keysOfValues(arg, scopeNode) {
  const out = { keys: [], known: true, spread: false };
  const take = (n, depth = 0) => {
    n = unwrap(n);
    if (!n || depth > 3) { out.known = false; return; }
    if (n.kind === K.ObjectLiteralExpression) {
      for (const p of n.properties) {
        if (p.kind === K.SpreadAssignment) { out.spread = true; out.known = false; }
        else pushU(out.keys, propName(p));
      }
    } else if (n.kind === K.ArrayLiteralExpression) n.elements.forEach((e) => take(e, depth + 1));
    else if (n.kind === K.Identifier) {
      let found = null;
      walkNode(scopeNode, (x) => { if (!found && x.kind === K.VariableDeclaration && x.name.kind === K.Identifier && x.name.text === n.text && x.initializer) found = x.initializer; });
      if (found) take(found, depth + 1); else out.known = false;
    } else if (n.kind === K.CallExpression && n.expression.kind === K.PropertyAccessExpression && n.expression.name.text === 'map') {
      const cb = unwrap(n.arguments[0]);
      if (isFn(cb)) { if (cb.body.kind === K.Block) { let got = false; walkNode(cb.body, (x) => { if (x.kind === K.ReturnStatement && x.expression) { take(x.expression, depth + 1); got = true; } }); if (!got) out.known = false; } else take(cb.body, depth + 1); }
      else out.known = false;
    } else out.known = false;
  };
  take(arg);
  return out;
}

function extractFacts(fi) {
  if (factsCache.has(fi)) return factsCache.get(fi);
  const f = fi.file;
  const facts = { fi, file: f, writes: [], reads: [], responses: [], bg: [], calls: [], tx: 0, bodyKeys: new Set(), paramKeys: new Set(), queryKeys: new Set(), usesRawBody: false, parseCalls: [], tokens: new Set(), todo: false, nextCalls: 0 };
  factsCache.set(fi, facts);
  const root = fi.node;
  const dbParams = new Set();
  for (const p of root.parameters ?? []) if (p.type && /Database|Transaction|NodePg|PgTransaction|DbOrTx|Executor/.test(txt(p.type))) dbParams.add(p.name.getText());
  const dbLike = (name) => DB_NAME.test(name) || dbParams.has(name);

  const visit = (n, ctx) => {
    if (n !== root && (n.kind === K.FunctionDeclaration || (n.kind === K.VariableDeclaration && n.initializer && isFn(unwrap(n.initializer)) && n.name.kind === K.Identifier))) return;
    let c = ctx;
    if (n.kind === K.Identifier) facts.tokens.add(n.text);
    else if (n.kind === K.StringLiteral) facts.tokens.add(n.text);
    else if (n.kind === K.ForStatement || n.kind === K.ForOfStatement || n.kind === K.ForInStatement || n.kind === K.WhileStatement || n.kind === K.DoStatement) c = { ...c, loop: true };
    else if (n.kind === K.TryStatement) {
      const cc = n.catchClause;
      const info = { node: n, catchLine: cc ? lineOf(cc) : null, end: n.getEnd(), catch: cc ? classifyCatch(cc) : null };
      visit(n.tryBlock, { ...c, tries: [...c.tries, info] });
      if (cc) visit(cc.block, { ...c, inCatch: true });
      if (n.finallyBlock) visit(n.finallyBlock, c);
      return;
    }
    if (n.kind === K.CallExpression) {
      const callee = n.expression;
      const name = callee.kind === K.PropertyAccessExpression ? callee.name.text : callee.kind === K.Identifier ? callee.text : '';
      const recv = callee.kind === K.PropertyAccessExpression ? callee.expression : null;
      const recvName = recv ? (recv.kind === K.PropertyAccessExpression ? recv.name.text : recv.kind === K.Identifier ? recv.text : '') : '';
      // loops via callbacks
      if (recv && /^(forEach|map|reduce|flatMap)$/.test(name) && n.arguments[0] && isFn(unwrap(n.arguments[0]))) {
        const cb = unwrap(n.arguments[0]);
        const asyncCb = !!cb.modifiers?.some((m) => m.kind === K.AsyncKeyword);
        n.arguments.forEach((a) => visit(a, { ...c, loop: true, asyncForEach: name === 'forEach' && asyncCb ? true : c.asyncForEach }));
        visit(callee, c);
        return;
      }
      if (name === 'transaction' && recv && dbLike(recvName)) {
        facts.tx++;
        const cb = unwrap(n.arguments[0]);
        const txName = cb?.parameters?.[0]?.name?.getText() ?? 'tx';
        n.arguments.forEach((a) => visit(a, { ...c, tx: txName }));
        return;
      }
      // drizzle chain root
      if (recv && /^(insert|update|delete)$/.test(name) && dbLike(recvName)) recordWrite(n, name, recvName, c);
      else if (recv && name === 'select' && dbLike(recvName)) recordRead(n, c, recvName);
      else if (recv && recv.kind === K.PropertyAccessExpression && recv.expression.kind === K.PropertyAccessExpression && txt(recv.expression).endsWith('.query') && /^find/.test(name)) facts.reads.push({ table: recv.name.text, file: f, line: lineOf(n), pos: n.getStart(), source: 'db.query', fromCache: false });
      else if (recv && /^(execute|query|unsafe|raw)$/.test(name) && dbLike(recvName)) recordRaw(n, c, recvName);
      // responses
      if (recv && /^(json|send|end|sendStatus|redirect|sendFile|render)$/.test(name) && /^(res|response|reply)$/.test(chainRootName(callee)) ) recordResponse(n, name, c);
      if (callee.kind === K.Identifier && callee.text === 'next') { facts.nextCalls++; (facts.nexts ??= []).push({ pos: n.getStart(), arg: n.arguments.length }); }
      // background
      recordBackground(n, name, recv, recvName, c);
      // inputs
      if (/^(parse|safeParse|parseAsync|safeParseAsync)$/.test(name) && recv && n.arguments[0] && /\b(req|request)\.(body|query|params)\b|^(body|input|payload|data)$/.test(txt(n.arguments[0]))) facts.parseCalls.push({ schema: chainRootName(callee, true), inline: recv.kind === K.CallExpression ? recv : null, source: /query/.test(txt(n.arguments[0])) ? 'query' : /params/.test(txt(n.arguments[0])) ? 'params' : 'body' });
      if (name === 'getValidated' || (callee.kind === K.Identifier && callee.text === 'getValidated')) { const a = n.arguments[1]; if (a?.kind === K.Identifier) facts.parseCalls.push({ schema: a.text, source: strVal(n.arguments[2]) ?? 'body' }); }
      // calls into project functions
      const target = resolveCall(n, f, fi.cls);
      if (target && target !== fi) facts.calls.push({ target, pos: n.getStart(), line: lineOf(n), node: n, cons: consumption(n), block: nearestBlock(n), inCatch: !!c.inCatch, loop: !!c.loop, tx: c.tx, tries: c.tries });
    }
    if (n.kind === K.PropertyAccessExpression) {
      const o = n.expression;
      if (o.kind === K.PropertyAccessExpression && o.expression.kind === K.Identifier && /^(req|request)$/.test(o.expression.text)) {
        const k = n.name.text; const which = o.name.text;
        (which === 'body' ? facts.bodyKeys : which === 'params' ? facts.paramKeys : which === 'query' ? facts.queryKeys : new Set()).add(k);
      } else if (o.kind === K.Identifier && /^(req|request)$/.test(o.text) && n.name.text === 'body' && !(n.parent.kind === K.PropertyAccessExpression && n.parent.expression === n) && !(n.parent.kind === K.CallExpression && n.parent.expression.kind === K.PropertyAccessExpression && /^(safeParse|parse|parseAsync|safeParseAsync)$/.test(n.parent.expression.name.text))) facts.usesRawBody = true;
      facts.tokens.add(n.name.text);
    }
    if (n.kind === K.VariableDeclaration && n.name.kind === K.ObjectBindingPattern && n.initializer) {
      const it = txt(unwrap(n.initializer));
      const m = /^(?:req|request)\.(body|params|query)$/.exec(it);
      if (m) for (const el of n.name.elements) (m[1] === 'body' ? facts.bodyKeys : m[1] === 'params' ? facts.paramKeys : facts.queryKeys).add((el.propertyName ?? el.name).getText());
    }
    if (n.kind === K.ShorthandPropertyAssignment) facts.tokens.add(n.name.text);
    if (n.kind === K.PropertyAssignment && n.name) facts.tokens.add(propName(n));
    n.forEachChild((ch) => visit(ch, c));
  };

  const classifyCatch = (cc) => {
    const info = { rethrows: false, next: false, errorResponse: false, successResponse: false, returnsValue: false, empty: cc.block.statements.length === 0 };
    walkNode(cc.block, (x) => {
      if (x.kind === K.ThrowStatement) info.rethrows = true;
      if (x.kind === K.ReturnStatement && x.expression) info.returnsValue = true;
      if (x.kind === K.CallExpression) {
        const cl = x.expression;
        if (cl.kind === K.Identifier && cl.text === 'next') info.next = true;
        if (cl.kind === K.PropertyAccessExpression && /^(json|send|end|sendStatus)$/.test(cl.name.text) && /^(res|response)$/.test(chainRootName(cl))) { const s = statusOf(x); if (s !== null && s >= 400) info.errorResponse = true; else info.successResponse = true; }
        if (cl.kind === K.PropertyAccessExpression && /^(reject)$/.test(cl.name.text)) info.rethrows = true;
      }
    });
    return info;
  };
  const chainRootName = (callee, schema = false) => { let e = callee; while (e) { e = unwrap(e); if (e.kind === K.CallExpression) e = e.expression; else if (e.kind === K.PropertyAccessExpression) { if (schema && e.expression.kind === K.Identifier) return e.expression.text; e = e.expression; } else break; } return e?.kind === K.Identifier ? e.text : (e ? txt(e) : ''); };
  const statusOf = (callNode) => {
    let e = callNode;
    while (e) {
      e = unwrap(e);
      if (e.kind === K.CallExpression) {
        const cl = e.expression;
        if (cl.kind === K.PropertyAccessExpression && cl.name.text === 'status') { const a = e.arguments[0]; return a && a.kind === K.NumericLiteral ? Number(a.text) : null; }
        if (cl.kind === K.PropertyAccessExpression && cl.name.text === 'sendStatus') { const a = e.arguments[0]; return a && a.kind === K.NumericLiteral ? Number(a.text) : null; }
        e = cl.kind === K.PropertyAccessExpression ? cl.expression : null;
      } else if (e.kind === K.PropertyAccessExpression) e = e.expression;
      else break;
    }
    return 200;
  };
  const nearestBlock = (n) => { let p = n.parent; while (p && p.kind !== K.Block && p.kind !== K.SourceFile && p.kind !== K.CaseClause && p.kind !== K.DefaultClause) p = p.parent; return p; };
  const stmtOf = (n) => { let p = n; while (p.parent && p.parent.kind !== K.Block && p.parent.kind !== K.SourceFile && p.parent.kind !== K.CaseClause) p = p.parent; return p; };

  function recordResponse(n, name, c) {
    const status = statusOf(n);
    facts.responses.push({ status, pos: n.getStart(), end: n.getEnd(), line: lineOf(n), file: f, isReturn: stmtOf(n).kind === K.ReturnStatement || n.parent?.kind === K.ReturnStatement, inCatch: !!c.inCatch, block: nearestBlock(n), stmt: stmtOf(n) });
  }
  function recordWrite(call, kind, recvName, c) {
    let top = call; const names = [];
    names.push(kind);
    while (top.parent?.kind === K.PropertyAccessExpression && top.parent.expression === top && top.parent.parent?.kind === K.CallExpression && top.parent.parent.expression === top.parent) { top = top.parent.parent; names.push(top.expression.name.text); }
    const chain = chainCalls(top);
    const tArg = call.arguments[0];
    const tvar = tArg?.kind === K.Identifier ? tArg.text : tArg?.kind === K.PropertyAccessExpression ? tArg.name.text : null;
    const table = tableByVar.get(tvar)?.name ?? tvar ?? '?';
    const v = chain.find((x) => x.name === 'values' || x.name === 'set');
    const vk = v ? keysOfValues(v.args[0], root) : { keys: [], known: false, spread: false };
    const tinfo = tableByVar.get(tvar);
    const wholeJson = !!(v && v.args[0]?.kind === K.ObjectLiteralExpression && v.args[0].properties.some((p) => (p.kind === K.PropertyAssignment && unwrap(p.initializer).kind === K.Identifier || p.kind === K.ShorthandPropertyAssignment) && /json/i.test(tinfo?.columns[propName(p)]?.type ?? '')));
    const oc = chain.find((x) => /^onConflict/.test(x.name));
    let conflict = null;
    if (oc) {
      const o = oc.args[0]; let target = [];
      if (o?.kind === K.ObjectLiteralExpression) { const t = o.properties.find((p) => propName(p) === 'target'); const te = t?.initializer; target = te?.kind === K.ArrayLiteralExpression ? te.elements.map((e) => txt(e).split('.').pop()) : te ? [txt(te).split('.').pop()] : []; }
      conflict = { kind: oc.name, target };
    }
    const cons = consumption(top);
    const tryInfo = c.tries.length ? c.tries[c.tries.length - 1] : null;
    const catchClause = chain.find((x) => x.name === 'catch');
    facts.writes.push({ kind, table, tableVar: tvar, file: f, line: lineOf(top), pos: top.getStart(), snippet: snip(top), cons, awaited: cons === 'awaited' || cons === 'returned', resultUsed: resultUsed(top) || names.includes('returning') && resultUsed(top), returning: names.includes('returning'), hasWhere: names.includes('where'),
      inTransaction: !!c.tx || /^(tx|trx)$/i.test(recvName), txName: c.tx ?? null, executor: recvName, wrongExecutor: !!c.tx && recvName !== c.tx, loop: !!c.loop, asyncForEach: !!c.asyncForEach, keys: vk.keys.sort(), keysKnown: vk.known, spread: vk.spread, wholeJson, conflict, hasCatch: !!catchClause, catchSwallow: catchClause ? !/throw|next\(|reject/.test(txt(catchClause.args[0] ?? top)) : false,
      try: tryInfo ? { catchLine: tryInfo.catchLine, ...tryInfo.catch } : null, tryEnd: tryInfo?.end ?? null, inCatch: !!c.inCatch, block: nearestBlock(top), stmt: stmtOf(top), valueNodes: v ? v.args[0] : null });
  }
  function recordRead(call, c, recvName) {
    let top = call; const chain = [];
    while (top.parent?.kind === K.PropertyAccessExpression && top.parent.expression === top && top.parent.parent?.kind === K.CallExpression) { top = top.parent.parent; chain.push(top); }
    const from = chain.find((x) => x.expression.name?.text === 'from');
    const a = from?.arguments[0];
    const tv = a?.kind === K.Identifier ? a.text : a?.kind === K.PropertyAccessExpression ? a.name.text : null;
    facts.reads.push({ table: tableByVar.get(tv)?.name ?? tv ?? '?', file: f, line: lineOf(call), pos: call.getStart(), source: recvName, fromCache: READER.test(recvName) });
  }
  function recordRaw(call, c, recvName) {
    const a = call.arguments[0];
    const text = a ? txt(a) : '';
    const m = /\b(insert\s+into|(?<!for\s+)update|delete\s+from)\s+("?[\w.]+"?(?:\."?\w+"?)?)/i.exec(text);
    if (m) {
      const kind = /insert/i.test(m[1]) ? 'insert' : /update/i.test(m[1]) ? 'update' : 'delete';
      const top = call; const cons = consumption(top);
      facts.writes.push({ kind, table: m[2].replace(/"/g, ''), raw: true, file: f, line: lineOf(call), pos: call.getStart(), snippet: snip(call), cons, awaited: cons === 'awaited' || cons === 'returned', resultUsed: resultUsed(top), returning: /returning/i.test(text), hasWhere: /\bwhere\b/i.test(text), inTransaction: !!c.tx, txName: c.tx ?? null, executor: recvName, wrongExecutor: !!c.tx && recvName !== c.tx, loop: !!c.loop, asyncForEach: !!c.asyncForEach, keys: [], keysKnown: false, spread: false, conflict: /on\s+conflict/i.test(text) ? { kind: 'raw', target: [] } : null, hasCatch: false, catchSwallow: false, try: c.tries.length ? { catchLine: c.tries[c.tries.length - 1].catchLine, ...c.tries[c.tries.length - 1].catch } : null, tryEnd: c.tries.length ? c.tries[c.tries.length - 1].end : null, inCatch: !!c.inCatch, block: nearestBlock(call), stmt: stmtOf(call) });
    } else if (/\bselect\b/i.test(text)) facts.reads.push({ table: (/\bfrom\s+("?[\w.]+"?)/i.exec(text)?.[1] ?? '?').replace(/"/g, ''), file: f, line: lineOf(call), pos: call.getStart(), source: recvName, fromCache: false });
  }
  function recordBackground(n, name, recv, recvName, c) {
    const bgCommon = { file: f, line: lineOf(n), pos: n.getStart(), snippet: snip(n), cons: consumption(n), inTransaction: !!c.tx };
    if (recv && /^(add|addBulk)$/.test(name) && (QUEUE_VARS.has(recvName) || /queue|jobs|buffer/i.test(recvName))) {
      const a = n.arguments[0]; let kind = strVal(a);
      if (!kind && a?.kind === K.ObjectLiteralExpression) { const k = a.properties.find((p) => propName(p) === 'kind'); kind = k?.initializer ? strVal(k.initializer) : null; }
      facts.bg.push({ type: 'queue-enqueue', detail: `${recvName}.${name}`, queueVar: recvName, jobKind: kind, ...bgCommon });
    } else if (recv && /^(lpush|rpush|xadd|publish|sadd|zadd|hset|hmset|setex|lpushx|rpushx)$/i.test(name) && /redis|cache|client|pub|store/i.test(recvName)) {
      facts.bg.push({ type: /^(lpush|rpush|xadd|lpushx|rpushx)$/i.test(name) ? 'redis-buffer' : /publish/i.test(name) ? 'redis-pubsub' : 'redis-set', detail: `${recvName}.${name}`, key: strVal(n.arguments[0]) ?? (n.arguments[0] ? txt(n.arguments[0]).slice(0, 60) : null), ttl: /setex/i.test(name) ? (n.arguments[1]?.kind === K.NumericLiteral ? Number(n.arguments[1].text) : null) : null, ...bgCommon });
    } else if (recv && name === 'set' && /redis|cache/i.test(recvName) && n.arguments.length >= 3) {
      const t = n.arguments.slice(2).find((x) => x.kind === K.NumericLiteral);
      facts.bg.push({ type: 'redis-set', detail: `${recvName}.set`, key: strVal(n.arguments[0]) ?? txt(n.arguments[0]).slice(0, 60), ttl: t ? Number(t.text) : null, ...bgCommon });
    } else if (!recv && /^(setTimeout|setInterval|setImmediate)$/.test(name)) facts.bg.push({ type: 'timer', detail: name, ...bgCommon });
    else if (recv && name === 'schedule' && /cron/i.test(recvName)) facts.bg.push({ type: 'cron', detail: 'cron.schedule', ...bgCommon });
    if (recv && /^(get|mget|hget|hgetall|lrange)$/.test(name) && READER.test(recvName)) facts.reads.push({ table: strVal(n.arguments[0]) ?? '(cache)', file: f, line: lineOf(n), pos: n.getStart(), source: recvName, fromCache: true });
  }

  const params = root.parameters ?? [];
  void params;
  const body = root.body ?? root;
  const ctx0 = { loop: false, tx: null, tries: [], inCatch: false, asyncForEach: false };
  if (body.kind === K.Block) body.forEachChild((ch) => visit(ch, ctx0)); else visit(body, ctx0);
  const comments = files.get(f).text.slice(root.getStart(), root.getEnd());
  facts.todo = /\bTODO\b|not implemented|\bstub\b|NOT_IMPLEMENTED|501/i.test(comments);
  return facts;
}

// ----- project-wide background scan -----
const QUEUE_VARS = new Set();
const consumers = [];
function scanBackgroundGlobals() {
  for (const f of backendFiles) walkNode(files.get(f).sf, (n) => {
    if (n.kind === K.VariableDeclaration && n.initializer?.kind === K.NewExpression && txt(n.initializer.expression) === 'Queue' && n.name.kind === K.Identifier) QUEUE_VARS.add(n.name.text);
    if (n.kind === K.PropertyAssignment && n.initializer?.kind === K.NewExpression && txt(n.initializer.expression) === 'Queue') QUEUE_VARS.add(propName(n));
    if (n.kind === K.PropertyDeclaration && n.initializer?.kind === K.NewExpression && txt(n.initializer.expression) === 'Queue') QUEUE_VARS.add(n.name.getText());
    if (n.kind === K.NewExpression && /^(Worker|QueueScheduler)$/.test(txt(n.expression)) && txt(n.expression) === 'Worker') consumers.push({ type: 'queue-worker', file: rel(f), line: lineOf(n), queue: n.arguments[0] ? (strVal(n.arguments[0]) ?? txt(n.arguments[0])) : null });
    if (n.kind === K.CallExpression && n.expression.kind === K.PropertyAccessExpression) {
      const m = n.expression.name.text;
      if (/^(blpop|brpop|lpop|rpop|xread|xreadgroup|lrange|lmove|brpoplpush|subscribe|psubscribe|lpoprpush)$/i.test(m)) consumers.push({ type: 'redis-read', file: rel(f), line: lineOf(n), queue: strVal(n.arguments[0]) ?? (n.arguments[0] ? txt(n.arguments[0]).slice(0, 60) : null) });
    }
  });
  consumers.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

// ----- routes -----
const units = new Map(); // key -> { key, routes[], mounts[] }
const unitOf = (k) => units.get(k) ?? units.set(k, { key: k, routes: [], mounts: [] }).get(k);
const VERBS = new Set(['get', 'post', 'put', 'patch', 'delete']);

function expressVars(sf) {
  const vars = new Map(); // name -> 'app' | 'router'
  walkNode(sf, (n) => {
    if (n.kind === K.VariableDeclaration && n.name.kind === K.Identifier && n.initializer) {
      const t = txt(unwrap(n.initializer));
      if (/^express\(\)$/.test(t)) vars.set(n.name.text, 'app');
      else if (/^(express\.)?Router\(/.test(t)) vars.set(n.name.text, 'router');
    }
  });
  return vars;
}
function enclosingFnName(n) { let p = n.parent; while (p) { if (isFn(p) || p.kind === K.FunctionDeclaration) { const nm = p.name?.text ?? (p.parent?.kind === K.VariableDeclaration ? p.parent.name.getText() : null); if (nm && !/^(req|res)/.test(nm)) { if (p.parent && p.parent.kind === K.VariableDeclaration || p.kind === K.FunctionDeclaration) return nm; } } p = p.parent; } return '<module>'; }
function mountTargetKeys(expr, f) {
  expr = unwrap(expr);
  if (!expr) return [];
  if (expr.kind === K.Identifier) {
    const imp = imports.get(f)?.get(expr.text);
    if (imp?.file) {
      // imported router variable
      const k = `${imp.file}::${imp.name}`;
      if (units.has(k)) return [k];
    }
    return [`${f}::${expr.text}`];
  }
  if (expr.kind === K.CallExpression) {
    const callee = expr.expression;
    if (callee.kind === K.Identifier || callee.kind === K.PropertyAccessExpression) {
      const target = resolveCall(expr, f, null);
      if (target) return [`${target.file}::fn:${target.name}`];
    }
    if (txt(callee) === 'express.Router' || txt(callee) === 'Router') return [];
  }
  return [];
}
function scanRoutes() {
  const sfs = backendFiles;
  // pass 1: routes + mounts
  for (const f of sfs) {
    const sf = files.get(f).sf;
    const vars = expressVars(sf);
    const unitKeyFor = (recvNode, n) => {
      const r = unwrap(recvNode);
      if (r.kind === K.Identifier) {
        const kind = vars.get(r.text);
        const fnName = enclosingFnName(n);
        // a router built inside a factory function is keyed by that function so that the factory call can be mounted
        const inFactory = fnName !== '<module>' && kind === 'router' && isDeclaredInFn(r.text, fnName, sf);
        return inFactory ? `${f}::fn:${fnName}` : `${f}::${r.text}`;
      }
      return null;
    };
    walkNode(sf, (n) => {
      if (n.kind !== K.CallExpression || n.expression.kind !== K.PropertyAccessExpression) return;
      const m = n.expression.name.text;
      const recv = n.expression.expression;
      const rName = recv.kind === K.Identifier ? recv.text : null;
      // router.route('/x').get(...)
      let routePath = null; let recvNode = recv;
      if (VERBS.has(m) && recv.kind === K.CallExpression && recv.expression.kind === K.PropertyAccessExpression && recv.expression.name.text === 'route') { routePath = evalStr(recv.arguments[0]); recvNode = recv.expression.expression; }
      if (VERBS.has(m)) {
        const first = routePath !== null ? null : n.arguments[0];
        const p = routePath ?? evalStr(first);
        const argStart = routePath !== null ? 0 : 1;
        const known = rName ? vars.has(rName) : recvNode.kind === K.Identifier && vars.has(recvNode.text);
        if (p === null || !p.startsWith('/') && p !== '*' && p !== '') return;
        if (!known && n.arguments.length - argStart < 1) return;
        if (!known && !/^(app|router|api|r|server|routes?)$/i.test((recvNode.kind === K.Identifier ? recvNode.text : ''))) return;
        const key = unitKeyFor(recvNode, n); if (!key) return;
        const handlerArgs = [...n.arguments].slice(argStart);
        if (!handlerArgs.length) return;
        unitOf(key).routes.push({ verb: m.toUpperCase(), path: p, node: n, file: f, line: lineOf(n), handlerArgs });
      } else if (m === 'use') {
        const key = unitKeyFor(recv, n); if (!key) return;
        let prefix = ''; let rest = [...n.arguments];
        const s = rest.length ? evalStr(rest[0]) : null;
        if (s !== null && rest.length > 1) { prefix = s === '/' ? '' : s; rest = rest.slice(1); }
        for (const a of rest) for (const k of mountTargetKeys(a, f)) unitOf(key).mounts.push({ child: k, prefix });
      }
    });
  }
  // factories: `fn:name` unit is the router created inside; plain `fn:name` mount targets map to it
}
function isDeclaredInFn(varName, fnName, sf) {
  let yes = false;
  walkNode(sf, (n) => { if (!yes && n.kind === K.VariableDeclaration && n.name.getText() === varName && enclosingFnName(n) === fnName) yes = true; });
  return yes;
}

function expandRoutes() {
  const childSet = new Set();
  for (const u of units.values()) for (const m of u.mounts) childSet.add(m.child);
  const out = [];
  const visit = (key, prefix, seen) => {
    if (seen.has(key)) return; const u = units.get(key); if (!u) return;
    const s2 = new Set(seen).add(key);
    for (const r of u.routes) out.push({ ...r, full: (prefix + r.path).replace(/\/{2,}/g, '/').replace(/(.)\/$/, '$1') || '/' });
    for (const m of u.mounts) visit(m.child, prefix + m.prefix, s2);
  };
  const roots = [...units.keys()].filter((k) => !childSet.has(k)).sort();
  for (const k of roots) visit(k, '', new Set());
  return out;
}

function handlerFunction(handlerArgs, f) {
  const last = unwrap(handlerArgs[handlerArgs.length - 1]);
  if (!last) return null;
  if (isFn(last)) return fnInfos.find((x) => x.node === last) ?? { name: '<inline>', file: f, node: last, cls: null, isAsync: !!last.modifiers?.some((m) => m.kind === K.AsyncKeyword) };
  if (last.kind === K.Identifier) {
    const loc = fnsByFile.get(f)?.get(last.text)?.[0]; if (loc) return loc;
    const imp = imports.get(f)?.get(last.text); if (imp?.file) return findExported(imp.file, imp.name);
    return null;
  }
  if (last.kind === K.CallExpression) { const inner = last.arguments.map(unwrap).find(isFn); if (inner) return fnInfos.find((x) => x.node === inner) ?? { name: '<inline>', file: f, node: inner, cls: null, isAsync: true }; }
  return null;
}
function mwName(a) {
  a = unwrap(a);
  if (a.kind === K.Identifier) return a.text;
  if (a.kind === K.CallExpression) return `${txt(a.expression)}(${a.arguments.map((x) => (x.kind === K.Identifier || x.kind === K.StringLiteral ? txt(x) : '…')).join(', ')})`;
  if (isFn(a)) return '<inline>';
  return txt(a).slice(0, 40);
}

// ----- endpoint assembly -----
function graphOf(handler) {
  const visited = new Map(); // fi -> {depth, via}
  const order = [];
  const walk = (fi, depth, via) => {
    if (visited.has(fi) || depth > 4) return;
    visited.set(fi, { depth, via });
    order.push(fi);
    const facts = extractFacts(fi);
    for (const c of facts.calls) walk(c.target, depth + 1, [...via, c.target.name]);
  };
  walk(handler, 0, [handler.name]);
  return { visited, order };
}
function hasWritesDeep(fi, seen = new Set(), depth = 0) {
  if (seen.has(fi) || depth > 4) return false; seen.add(fi);
  const f = extractFacts(fi);
  return f.writes.length > 0 || f.calls.some((c) => hasWritesDeep(c.target, seen, depth + 1));
}

const endpoints = [];
const candidates = [];
const candSeen = new Map();
function addCand(rule, confidence, file, line, snippet, endpointId, note) {
  const key = `${rule}@${rel(file)}:${line}`;
  const prev = candSeen.get(key);
  if (prev) { if (endpointId && !prev.endpointIds.includes(endpointId)) prev.endpointIds.push(endpointId); return; }
  const c = { key, rule, confidence, file: rel(file), line, snippet, endpointId, endpointIds: endpointId ? [endpointId] : [], note };
  candSeen.set(key, c); candidates.push(c);
}

function buildEndpoints() {
  const routes = expandRoutes();
  const seenIds = new Set();
  for (const r of routes) {
    const id = `${r.verb} ${r.full}`;
    if (seenIds.has(id)) continue; seenIds.add(id);
    const mwArgs = r.handlerArgs.slice(0, -1);
    const handler = handlerFunction(r.handlerArgs, r.file);
    const ep = { id, verb: r.verb, path: r.full, handler: { file: rel(r.file), line: handler ? lineOf(handler.node) : r.line, name: handler?.name ?? null, resolved: !!handler }, routeLine: r.line, middleware: mwArgs.map(mwName), inputSchema: { schemas: [], bodyKeysRead: [], paramsRead: [], queryRead: [], usesRawBody: false }, writes: [], reads: [], responses: [], background: [] };
    ep._srcFile = r.file;
    // input schemas from middleware + handler parse calls
    const schemaRefs = [];
    for (const a of mwArgs) { const u = unwrap(a); if (u.kind === K.CallExpression) { const src = /'query'|"query"/.test(txt(u)) ? 'query' : /'params'|"params"/.test(txt(u)) ? 'params' : 'body'; for (const x of u.arguments) if (x.kind === K.Identifier && isSchemaName(x.text)) schemaRefs.push({ name: x.text, source: src, via: txt(u.expression) }); } }
    const strictMw = ep.middleware.some((m) => /rejectUnknownKeys|strict/i.test(m));
    const g = handler ? graphOf(handler) : { visited: new Map(), order: [] };
    ep._graph = g;
    for (const fi of g.order) {
      const fa = extractFacts(fi);
      for (const pc of fa.parseCalls) {
        if (pc.inline) schemaRefs.push({ name: `<inline:${rel(fa.file)}:${lineOf(pc.inline)}>`, node: pc.inline, source: pc.source, via: 'parse' });
        else if (isSchemaName(pc.schema)) schemaRefs.push({ name: pc.schema, source: pc.source, via: 'parse' });
      }
      fa.bodyKeys.forEach((k) => pushU(ep.inputSchema.bodyKeysRead, k)); fa.paramKeys.forEach((k) => pushU(ep.inputSchema.paramsRead, k)); fa.queryKeys.forEach((k) => pushU(ep.inputSchema.queryRead, k));
      ep.inputSchema.usesRawBody ||= fa.usesRawBody;
    }
    const seenS = new Set();
    for (const s of schemaRefs) {
      const sk = `${s.name}|${s.source}`; if (seenS.has(sk)) continue; seenS.add(sk);
      const e = s.node ? evalSchema(s.node, 0) : evalSchema({ kind: K.Identifier, text: s.name, getText: () => s.name }, 0);
      ep.inputSchema.schemas.push({ name: s.name, source: s.source, via: s.via, keys: [...e.keys.keys()].sort(), strict: e.strict || (strictMw && s.source === 'body'), passthrough: e.passthrough, unresolved: e.unresolved });
      (ep._schemaLeaves ??= new Map()).set(sk, e.keys);
    }
    ep.inputSchema.schemas.sort((a, b) => a.name.localeCompare(b.name));
    // writes / reads / responses / bg from graph
    for (const fi of g.order) {
      const fa = extractFacts(fi); const via = g.visited.get(fi).via;
      for (const w of fa.writes) ep.writes.push({ kind: w.kind, table: w.table, file: rel(w.file), line: w.line, awaited: w.awaited, consumption: w.cons, resultUsed: w.resultUsed, returning: w.returning, inTransaction: w.inTransaction, tryCatch: { wrapped: !!w.try || w.hasCatch, catchLine: w.try?.catchLine ?? null, swallowed: w.try ? swallowed(w.try) : w.catchSwallow }, via, keys: w.keys, keysKnown: w.keysKnown, onConflict: w.conflict, raw: !!w.raw, _w: w });
      for (const rd of fa.reads) ep.reads.push({ table: rd.table, file: rel(rd.file), line: rd.line, source: rd.source, fromCache: rd.fromCache, via });
      for (const b of fa.bg) ep.background.push({ type: b.type, detail: b.detail, file: rel(b.file), line: b.line, key: b.key ?? null, jobKind: b.jobKind ?? null, ttl: b.ttl ?? null, consumerFound: null, via, _b: b });
      for (const rs of fa.responses) {
        const wp = [...fa.writes.map((w) => w.pos), ...fa.calls.filter((c) => hasWritesDeep(c.target)).map((c) => c.pos)];
        const rel2 = !wp.length ? 'unrelated' : wp.every((p) => p > rs.pos) ? 'before' : wp.every((p) => p < rs.pos) ? 'after' : 'mixed';
        ep.responses.push({ status: rs.status, file: rel(rs.file), line: rs.line, relativeToWrite: rel2, inCatch: rs.inCatch, via });
      }
    }
    endpoints.push(ep);
  }
  endpoints.sort((a, b) => a.path.localeCompare(b.path) || a.verb.localeCompare(b.verb));
  for (const ep of endpoints) {
    for (const key of ['writes', 'reads', 'responses', 'background']) ep[key].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
    ep.writes = dedupeBy(ep.writes, (w) => `${w.file}:${w.line}`);
    ep.reads = dedupeBy(ep.reads, (w) => `${w.file}:${w.line}:${w.table}`);
    ep.responses = dedupeBy(ep.responses, (w) => `${w.file}:${w.line}`);
    ep.background = dedupeBy(ep.background, (w) => `${w.file}:${w.line}`);
  }
}
const dedupeBy = (arr, fn) => { const s = new Set(); return arr.filter((x) => { const k = fn(x); if (s.has(k)) return false; s.add(k); return true; }); };
const swallowed = (t) => !t.rethrows && !t.next && !t.errorResponse;

// ----- rules -----
const tableByName = new Map(); // by full or short name
function tableOf(name) { return tableByName.get(name) ?? null; }

function runRules() {
  for (const t of tables) { tableByName.set(t.name, t); tableByName.set(t.shortName, t); }
  const consumerQueues = consumers.filter((c) => c.type === 'queue-worker');
  for (const ep of endpoints) {
    const g = ep._graph;
    const eid = ep.id;
    const hasSuccessRes = (fa, after) => fa.responses.some((r) => !r.inCatch && (r.status === null || r.status < 400) && (after == null || r.pos > after));
    for (const fi of g.order) {
      const fa = extractFacts(fi);
      for (const w of fa.writes) {
        // R01
        if (w.cons === 'floating' && fi.isAsync !== false) addCand('R01', 'high', w.file, w.line, w.snippet, eid, 'Write used as a statement with no await/return/then.');
        else if (w.cons === 'voided') addCand('R01', 'low', w.file, w.line, w.snippet, eid, 'Write is voided on purpose? Confirm failures are handled elsewhere.');
        else if (w.asyncForEach) addCand('R01', 'medium', w.file, w.line, w.snippet, eid, 'Write inside async forEach: the loop does not wait for it.');
        // R02
        const swallow = w.try ? swallowed(w.try) : (w.hasCatch && w.catchSwallow);
        if (swallow && !w.inCatch) {
          const t = w.try;
          const conf = t?.successResponse || hasSuccessRes(fa, w.tryEnd ?? w.pos) ? 'high' : t?.returnsValue ? 'low' : fa.responses.length ? 'high' : 'medium';
          addCand('R02', conf, w.file, w.line, w.snippet, eid, `Catch block (line ${t?.catchLine ?? '?'}) neither rethrows nor passes the error on${t?.empty ? ' (empty)' : ''}.`);
        }
        // R03
        for (const rs of fa.responses) {
          if (rs.isReturn || rs.inCatch || (rs.status !== null && rs.status >= 400) || rs.pos > w.pos || w.inCatch) continue;
          if (!(rs.block && w.pos >= rs.block.getStart() && w.pos <= rs.block.getEnd())) continue;
          const stmts = rs.block.statements ?? []; const si = stmts.indexOf(rs.stmt);
          const returnsBetween = si >= 0 && stmts.slice(si + 1).some((s) => s.kind === K.ReturnStatement && s.getStart() < w.pos);
          if (!returnsBetween) addCand('R03', 'high', w.file, w.line, w.snippet, eid, `Success response sent at line ${rs.line} before this write.`);
        }
        // R05
        const t = tableOf(w.table);
        if (t && w.kind === 'insert' && w.keysKnown && !w.spread && w.keys.length) {
          const missing = Object.entries(t.columns).filter(([k, c]) => c.notNull && !c.hasDefault && !c.generated && !w.keys.includes(k)).map(([k]) => k);
          if (missing.length && !t.spreadUnresolved.length) addCand('R05', 'high', w.file, w.line, w.snippet, eid, `Insert into ${t.name} never sets NOT NULL column(s) without default: ${missing.join(', ')}.`);
        }
        // R06
        if ((w.kind === 'update' || w.kind === 'delete') && !w.returning && !w.resultUsed && !w.raw) {
          const readBefore = fa.reads.some((r) => r.pos < w.pos && !r.fromCache) || (w.kind === 'delete' && fa.writes.some((o) => o.table === w.table && o.kind === 'insert' && o.pos > w.pos));
          addCand('R06', readBefore ? 'low' : /:\w+/.test(ep.path) ? 'high' : 'medium', w.file, w.line, w.snippet, eid, `${w.kind} does not check the affected row count or use returning${readBefore ? ' (an earlier read, or a re-insert of the same table, may make this intentional)' : ''}.`);
        }
        // R07b
        if (w.wrongExecutor) addCand('R07', 'high', w.file, w.line, w.snippet, eid, `Write uses "${w.executor}" inside a transaction that provides "${w.txName}".`);
        // R11
        if (t && w.kind === 'insert' && !w.raw) {
          const uniq = t.uniques.filter((u) => u.length && !u.some((c) => t.primaryKey.includes(c)));
          const replaced = fa.writes.some((o) => o.table === w.table && o.kind === 'delete' && o.pos < w.pos);
          if (uniq.length && !w.conflict && !w.try?.catch && !(w.try && !swallowed(w.try))) addCand('R11', replaced ? 'low' : 'medium', w.file, w.line, w.snippet, eid, `${t.name} has unique constraint(s) ${uniq.map((u) => `(${u.join(',')})`).join(' ')}; insert has no conflict handling.`);
        }
        if (t && w.conflict && w.conflict.target.length) {
          const tgt = [...w.conflict.target].sort().join(',');
          const ok = [t.primaryKey, ...t.uniques].some((u) => u.length && [...u].sort().join(',') === tgt) || w.conflict.target.every((x) => !t.columns[x]);
          if (!ok) addCand('R11', 'high', w.file, w.line, w.snippet, eid, `Upsert target (${tgt}) is not a primary key or unique set of ${t.name}.`);
        }
        // R12
        if (w.loop && !w.inTransaction) addCand('R12', w.try ? 'low' : 'medium', w.file, w.line, w.snippet, eid, 'Per-row write in a loop with no transaction and no per-row failure report.');
        // R14 (looseness vs column)
        if (t && w.keysKnown) for (const s of ep.inputSchema.schemas.filter((x) => x.source === 'body')) {
          const leaves = ep._schemaLeaves?.get(`${s.name}|${s.source}`);
          for (const k of w.keys) { const leaf = leaves?.get(k); const col = t.columns[k]; if (!leaf || !col) continue;
            if (/^z\.string\(\)$/.test(leaf) && (col.type === 'uuid' || col.type === 'varchar' || /enum/i.test(col.type))) addCand('R14', 'low', w.file, w.line, w.snippet, eid, `Schema field "${k}" is a bare string but the column is ${col.type}.`);
          }
        }
      }
      // R01 on calls to async writers
      for (const c of fa.calls) if (c.cons === 'floating' && c.target.isAsync && hasWritesDeep(c.target)) addCand('R01', 'medium', fa.file, c.line, snip(c.node), eid, `Call to ${c.target.name} (which writes) is not awaited.`);
    }
    // R07a multi-table
    const wtabs = [...new Set(ep.writes.map((w) => w.table))];
    if (wtabs.length >= 2 && ep.writes.some((w) => !w.inTransaction)) { const w = ep.writes.find((x) => !x.inTransaction); const full = ep.writes.find((x) => !x.inTransaction)._w; addCand('R07', 'medium', full.file, w.line, full.snippet, eid, `Writes ${wtabs.length} tables (${wtabs.join(', ')}) without one transaction.`); }
    // R08
    for (const b of ep.background) {
      if (b.type === 'queue-enqueue') {
        const found = consumerQueues.length > 0; b.consumerFound = found;
        if (!found) addCand('R08', 'high', path.join(ROOT, b.file), b.line, b._b.snippet, eid, 'Job enqueued but no queue worker exists anywhere in the backend.');
      } else if (b.type === 'redis-buffer') {
        const rd = consumers.filter((c) => c.type === 'redis-read'); const found = rd.some((c) => !c.queue || c.queue === b.key || !/^['"`]/.test(String(c.queue)) && !strOnly(c.queue)); b.consumerFound = found;
        if (!found) addCand('R08', 'high', path.join(ROOT, b.file), b.line, b._b.snippet, eid, `Data pushed to "${b.key}" but nothing in the backend reads it back.`);
      } else if (b.type === 'redis-set' && b.ttl != null && b.ttl <= 300 && mutating(ep.verb)) {
        addCand('R08', 'low', path.join(ROOT, b.file), b.line, b._b.snippet, eid, `Value stored with a ${b.ttl}s expiry by a mutating endpoint; confirm a reader consumes it before it expires.`);
      }
    }
    // R10
    if (mutating(ep.verb) && ep.handler.resolved) {
      const noWrite = !ep.writes.length && !ep.background.some((b) => /queue-enqueue|redis-buffer/.test(b.type));
      const todo = g.order.some((fi) => extractFacts(fi).todo);
      const benign = /login|logout|refresh|token|verify|validate|preview|check|calc|export|search|query|dry|simulat|lookup|resolve|report|print|download|forgot|reset|logs?$/i.test(ep.path);
      if (noWrite && todo) addCand('R10', 'medium', path.join(ROOT, ep.handler.file), ep.handler.line, `${ep.id}`, eid, 'Mutating endpoint writes nothing and its code mentions TODO/stub/not implemented.');
      else if (noWrite && !benign) addCand('R10', 'low', path.join(ROOT, ep.handler.file), ep.handler.line, `${ep.id}`, eid, 'Mutating endpoint whose call graph contains no database write or enqueue.');
    } else if (mutating(ep.verb) && !ep.handler.resolved) addCand('R10', 'low', path.join(ROOT, ep.handler.file), ep.handler.line, `${ep.id}`, eid, 'Handler could not be resolved statically; inspect by hand.');
    // R13
    for (const fi of g.order) {
      const fa = extractFacts(fi);
      for (const rd of fa.reads) if (rd.fromCache && fa.writes.some((w) => w.pos < rd.pos)) addCand('R13', 'medium', rd.file, rd.line, `read from ${rd.source}`, eid, `Reads from ${rd.source} after writing in the same flow.`);
    }
    // R14 no schema on a mutating route
    if (mutating(ep.verb) && ep.handler.resolved && !ep.inputSchema.schemas.some((s) => s.source === 'body') && (ep.inputSchema.bodyKeysRead.length || ep.inputSchema.usesRawBody) && ep.writes.length) addCand('R14', ep.inputSchema.usesRawBody ? 'high' : 'medium', path.join(ROOT, ep.handler.file), ep.handler.line, ep.id, eid, 'Mutating endpoint reads the request body without any schema validation.');
    // R04 server side: schema keys never referenced downstream
    const body = ep.inputSchema.schemas.filter((s) => s.source === 'body' && !s.unresolved);
    const wholeWrite = ep.writes.some((w) => !w.keysKnown || w.spread || w._w.wholeJson) || ep.inputSchema.usesRawBody;
    if (body.length && ep.writes.length && !wholeWrite) {
      const tokens = new Set(); for (const fi of g.order) extractFacts(fi).tokens.forEach((t) => tokens.add(t.toLowerCase().replace(/_/g, '')));
      for (const s of body) for (const k of s.keys) if (!tokens.has(k.toLowerCase().replace(/_/g, ''))) { const w = ep.writes[0]; addCand('R04', 'medium', path.join(ROOT, w.file), w.line, w._w.snippet, eid, `Schema ${s.name} accepts "${k}" but nothing in the call graph reads or writes it.`); }
    }
  }
}
const strOnly = (q) => /^['"`]/.test(String(q));

// ----- frontend -----
const frontendCalls = [];
const norm = (p) => p.split('?')[0].replace(/\/+$/, '').replace(/:[A-Za-z_]\w*/g, ':p') || '/';
function scanFrontend() {
  for (const f of frontendFiles) {
    const { sf } = files.get(f);
    walkNode(sf, (n) => {
      if (n.kind !== K.CallExpression) return;
      const c = n.expression; let verb = null; let argIdx = 0; let optsIdx = 1;
      if (c.kind === K.Identifier && c.text === 'fetch') { verb = 'GET'; }
      else if (c.kind === K.PropertyAccessExpression && VERBS.has(c.name.text) && /client|api|axios|http|request|fetcher/i.test(txt(c.expression))) verb = c.name.text.toUpperCase();
      if (!verb) return;
      const first = n.arguments[argIdx]; const p0 = evalStr(first);
      if (p0 === null) return;
      let p = p0.replace(/^(:p)+(?=\/)/, '');
      if (!p.startsWith('/') || !/^\/(api\b|[\w-]+)/.test(p)) return;
      const opts = n.arguments[optsIdx]; let bodyNode = null;
      if (opts?.kind === K.ObjectLiteralExpression) {
        for (const pr of opts.properties) { const nm = propName(pr); if (nm === 'method' && pr.initializer && strVal(pr.initializer)) verb = strVal(pr.initializer).toUpperCase(); if (nm === 'body' || nm === 'data') bodyNode = pr.kind === K.ShorthandPropertyAssignment ? pr.name : pr.initializer; }
      }
      let keys = null; let ptype = null;
      let bn = unwrap(bodyNode);
      if (bn?.kind === K.CallExpression && txt(bn.expression) === 'JSON.stringify') bn = unwrap(bn.arguments[0]);
      if (bn?.kind === K.ObjectLiteralExpression) { keys = bn.properties.filter((x) => x.kind !== K.SpreadAssignment).map(propName).sort(); if (bn.properties.some((x) => x.kind === K.SpreadAssignment)) keys = null; }
      else if (bn?.kind === K.Identifier) { let p2 = n.parent; while (p2 && !isFn(p2)) p2 = p2.parent; const par = p2?.parameters?.find((x) => x.name.getText() === bn.text); if (par?.type) { ptype = txt(par.type); const sname = ptype.replace(/^./, (ch) => ch.toLowerCase()) + 'Schema'; if (constInit.has(sname)) { const e = evalSchema({ kind: K.Identifier, text: sname, getText: () => sname }, 0); if (!e.unresolved) keys = [...e.keys.keys()].sort(); } } }
      frontendCalls.push({ file: rel(f), line: lineOf(n), verb, path: p.split('?')[0], relative: first.kind === K.TemplateExpression && first.head.text === '' && !/^\/api\b/.test(p), payloadKeys: keys, payloadType: ptype, matchedEndpoint: null, note: null });
    });
  }
  const byNorm = new Map(); for (const e of endpoints) { const k = norm(e.path); (byNorm.get(k) ?? byNorm.set(k, []).get(k)).push(e); }
  for (const fc of frontendCalls) {
    let list = byNorm.get(norm(fc.path)) ?? [];
    if (fc.relative) {
      list = endpoints.filter((e) => norm(e.path).endsWith(norm(fc.path)));
      const same = list.filter((e) => e.verb === fc.verb);
      if (same.length) {
        fc.matchedEndpoint = same[0].id;
        fc.note = `path is relative to a base passed in by the caller; ${same.length} backend route(s) end with it`;
        if (same.length === 1) matchPayload(fc, same[0]);
        continue;
      }
    }
    const m = list.find((e) => e.verb === fc.verb);
    if (m) { fc.matchedEndpoint = m.id; matchPayload(fc, m); }
    else if (list.length) { fc.note = `route exists with other verb(s): ${list.map((e) => e.verb).join(', ')}`; addCand('R09', 'high', path.join(ROOT, fc.file), fc.line, `${fc.verb} ${fc.path}`, list[0].id, `Client uses ${fc.verb} but backend defines ${list.map((e) => e.verb).join('/')} for this path.`); }
    else { fc.note = 'no matching backend route'; if (/^\/api\b/.test(fc.path) || fc.relative) addCand('R09', 'high', path.join(ROOT, fc.file), fc.line, `${fc.verb} ${fc.path}`, null, 'Client calls a path with no matching backend route.'); }
  }
  frontendCalls.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}
function matchPayload(fc, ep) {
  if (!fc.payloadKeys || !mutating(fc.verb)) return;
  const sch = ep.inputSchema.schemas.filter((s) => s.source === 'body' && !s.unresolved);
  if (sch.length) {
    const known = new Set(sch.flatMap((s) => s.keys));
    for (const k of fc.payloadKeys) if (!known.has(k)) {
      if (sch.some((s) => s.passthrough)) continue;
      if (sch.some((s) => s.strict)) addCand('R09', 'high', path.join(ROOT, fc.file), fc.line, `${fc.verb} ${fc.path} sends "${k}"`, ep.id, `Server schema is strict and rejects key "${k}".`);
      else addCand('R04', 'medium', path.join(ROOT, fc.file), fc.line, `${fc.verb} ${fc.path} sends "${k}"`, ep.id, `Server schema strips key "${k}" silently (Zod default).`);
    }
  } else {
    const tokens = new Set(); for (const fi of ep._graph.order) extractFacts(fi).tokens.forEach((t) => tokens.add(t));
    for (const k of fc.payloadKeys) if (!tokens.has(k)) addCand('R09', 'medium', path.join(ROOT, fc.file), fc.line, `${fc.verb} ${fc.path} sends "${k}"`, ep.id, `Key "${k}" is never read by the handler's call graph.`);
  }
}

// ---------- main ----------
function main() {
  let result;
  if (!ts) result = regexScan();
  else {
    indexFiles();
    for (const f of srcFiles) indexFile(f); // frontend files are only parsed, never part of the backend call graph
    const re = args.schema ? new RegExp(String(args.schema).replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '§').replace(/\*/g, '[^/]*').replace(/§/g, '.*')) : null;
    scanTables(re);
    if (!tables.length && args.schema) fail(`no pgTable definitions matched --schema ${args.schema}`);
    scanBackgroundGlobals();
    scanRoutes();
    buildEndpoints();
    scanFrontend0();
    runRules();
    scanFrontend1();
    result = { tables, endpoints, candidates, frontendCalls, consumers };
  }
  writeOut(result);
}
function scanFrontend0() { /* frontend call matching needs endpoints; rules for frontend run after endpoint rules */ }
function scanFrontend1() { scanFrontend(); }

function strip(ep) {
  const { _srcFile, _graph, _schemaLeaves, ...rest } = ep;
  void _srcFile; void _graph; void _schemaLeaves;
  rest.writes = rest.writes.map(({ _w, ...w }) => w);
  rest.background = rest.background.map(({ _b, ...b }) => b);
  return rest;
}
function writeOut(r) {
  fs.mkdirSync(OUT, { recursive: true });
  const cands = r.candidates.map((c) => ({ key: c.key ?? `${c.rule}@${c.file}:${c.line}`, rule: c.rule, confidence: c.confidence, file: c.file, line: c.line, snippet: c.snippet, endpointId: c.endpointId, endpointIds: (c.endpointIds ?? []).slice().sort(), note: c.note }));
  const order = { high: 0, medium: 1, low: 2 };
  cands.sort((a, b) => a.rule.localeCompare(b.rule) || order[a.confidence] - order[b.confidence] || a.file.localeCompare(b.file) || a.line - b.line);
  const inv = { parser: PARSER, root: path.basename(ROOT), backend: rel(BACKEND) || '.', frontend: FRONTEND ? rel(FRONTEND) : null,
    tables: r.tables.map((t) => ({ name: t.name, variable: t.variable ?? null, file: t.file, line: t.line, columns: t.columns ?? {}, primaryKey: t.primaryKey ?? [], uniques: t.uniques ?? [] })),
    endpoints: r.endpoints.map((e) => (PARSER === 'typescript' ? strip(e) : e)), frontendCalls: r.frontendCalls, consumers: r.consumers };
  const write = (n, o) => fs.writeFileSync(path.join(OUT, n), JSON.stringify(o, null, 2) + '\n');
  write('endpoint-inventory.json', inv);
  write('candidate-findings.json', cands);
  const writers = inv.endpoints.filter((e) => e.writes.length);
  const byRule = {}; for (const c of cands) byRule[c.rule] = (byRule[c.rule] ?? 0) + 1;
  console.log(`parser: ${PARSER}`);
  console.log(`tables: ${inv.tables.length}  endpoints: ${inv.endpoints.length}  write-endpoints: ${writers.length}  frontend calls: ${inv.frontendCalls.length}  consumers: ${inv.consumers.length}`);
  console.log(`candidates: ${cands.length}  ${Object.entries(byRule).sort().map(([k, v]) => `${k}=${v}`).join(' ')}`);
  console.log(`written: ${rel(path.join(OUT, 'endpoint-inventory.json'))}, ${rel(path.join(OUT, 'candidate-findings.json'))}`);
  if (args['check-expected']) {
    const exp = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), args['check-expected']), 'utf8'));
    const got = new Set(cands.map((c) => `${c.rule} ${c.endpointId}`));
    const want = new Set(exp.map((e) => `${e.rule} ${e.endpoint}`));
    const missing = [...want].filter((x) => !got.has(x)); const extra = [...got].filter((x) => !want.has(x));
    if (missing.length || extra.length) { console.error(`self-test FAILED\n  missing: ${missing.join('; ') || '-'}\n  unexpected: ${extra.join('; ') || '-'}`); process.exit(1); }
    console.log(`self-test passed: ${want.size} planted bugs found, no false positives`);
  }
}
main();
