#!/usr/bin/env node
// scan-repo.mjs - deterministic, read-only, regex-based scan of a Drizzle/PostgreSQL repo.
// Zero dependencies, Node 18+. Never writes inside the scanned repo.
import fs from 'node:fs';
import path from 'node:path';

const SCANNER_VERSION = '1.0.0';

// ---------------------------------------------------------------- args
function parseArgs(argv) {
  const o = { repo: '.', out: null, maxFiles: 5000, ignore: [], includeFixtures: false, tenantColumns: [] };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const need = () => {
      if (i + 1 >= argv.length) fail(`missing value for ${a}`);
      return argv[++i];
    };
    if (a === '--out') o.out = need();
    else if (a === '--max-files') {
      o.maxFiles = Number(need());
      if (!Number.isInteger(o.maxFiles) || o.maxFiles < 1) fail('--max-files must be a positive integer');
    } else if (a === '--ignore') o.ignore.push(...need().split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--tenant-column') o.tenantColumns.push(...need().split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--include-fixtures') o.includeFixtures = true;
    else if (a.startsWith('--')) fail(`unknown argument ${a}`);
    else rest.push(a);
  }
  if (rest.length > 1) fail('only one REPO_PATH is allowed');
  if (rest[0]) o.repo = rest[0];
  return o;
}
function fail(msg) {
  console.error(`scan-repo: ${msg}`);
  process.exit(1);
}

const opts = parseArgs(process.argv.slice(2));
const ROOT = path.resolve(opts.repo);
if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) fail(`repo path not readable: ${ROOT}`);

// ---------------------------------------------------------------- file walk
const ALWAYS_IGNORE = new Set(['node_modules', 'dist', 'build', '.next', '.git', 'coverage', '.claude', '.agents']);
const globToRe = (g) =>
  new RegExp(
    '^' +
      g
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*\*/g, '\u0000')
        .replace(/\*/g, '[^/]*')
        .replace(/\u0000/g, '.*') +
      '$',
  );
const extraIgnore = opts.ignore.map(globToRe);
const limitations = [];
const files = [];
let truncated = false;

function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    limitations.push(`Could not read directory ${path.relative(ROOT, dir) || '.'}`);
    return;
  }
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const e of entries) {
    if (truncated) return;
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) {
      if (ALWAYS_IGNORE.has(e.name)) continue;
      if (!opts.includeFixtures && /(^|\/)scripts\/fixtures$/.test(rel)) continue;
      if (extraIgnore.some((r) => r.test(rel) || r.test(e.name))) continue;
      walk(abs);
    } else if (e.isFile()) {
      if (extraIgnore.some((r) => r.test(rel) || r.test(e.name))) continue;
      if (files.length >= opts.maxFiles) {
        truncated = true;
        limitations.push(`Stopped after --max-files=${opts.maxFiles}; later files were not scanned.`);
        return;
      }
      files.push({ rel, abs, base: e.name });
    }
  }
}
walk(ROOT);

const CODE_RE = /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts)$/;
const INFRA_RE = /(\.(ya?ml|conf|sh|ini|toml|j2|ps1)$|^Dockerfile|^docker-compose|^\.env\.example$)/;
const isSecretEnv = (b) => b.startsWith('.env') && b !== '.env.example';
const isTestFile = (rel) => /(\.(test|spec)\.[cm]?[jt]sx?$|(^|\/)(__tests__|e2e|tests?)\/)/.test(rel);

const texts = new Map(); // rel -> raw
function readText(f) {
  if (texts.has(f.rel)) return texts.get(f.rel);
  let t = null;
  try {
    if (fs.statSync(f.abs).size <= 1_500_000) t = fs.readFileSync(f.abs, 'utf8');
    else limitations.push(`Skipped large file ${f.rel}`);
  } catch {
    limitations.push(`Could not read ${f.rel}`);
  }
  texts.set(f.rel, t);
  return t;
}

// ---------------------------------------------------------------- text helpers
function maskComments(src) {
  const out = src.split('');
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const d = src[i + 1];
    if (c === '"' || c === "'" || c === '`') {
      const q = c;
      i++;
      while (i < n && src[i] !== q) {
        if (src[i] === '\\') i++;
        i++;
      }
      i++;
    } else if (c === '/' && d === '/') {
      while (i < n && src[i] !== '\n') out[i++] = ' ';
    } else if (c === '/' && d === '*') {
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] !== '\n') out[i] = ' ';
        i++;
      }
      if (i < n) {
        out[i] = ' ';
        out[i + 1] = ' ';
      }
      i += 2;
    } else i++;
  }
  return out.join('');
}
function skipString(s, i) {
  const q = s[i];
  for (let j = i + 1; j < s.length; j++) {
    if (s[j] === '\\') {
      j++;
      continue;
    }
    if (s[j] === q) return j;
  }
  return s.length;
}
function findMatching(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(s, i);
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
function splitTop(s, base = 0) {
  const out = [];
  let depth = 0;
  let last = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(s, i);
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === ',' && depth === 0) {
      out.push({ text: s.slice(last, i), start: base + last });
      last = i + 1;
    }
  }
  if (s.slice(last).trim()) out.push({ text: s.slice(last), start: base + last });
  return out;
}
function makeLineOf(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return (off) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= off) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}
const norm = (s) => String(s).toLowerCase().replace(/_/g, '');
const strLit = (s) => {
  const m = /^\s*['"`]([^'"`]*)['"`]/.exec(s || '');
  return m ? m[1] : null;
};
function redact(s) {
  return s.replace(/(:\/\/[^:/\s'"`@]+):[^@\s'"`]+@/g, '$1:***@').replace(/(password\s*[:=]\s*)['"`][^'"`]+['"`]/gi, "$1'***'");
}

// ---------------------------------------------------------------- hits
const hits = new Map();
const CRIT = {
  PK: 'C1', IDX: 'C2', CON: 'C3', LCK: 'C4', TEN: 'C5', MOD: 'C6', ORM: 'C7', POOL: 'C8', MIG: 'C9', OPS: 'C10',
};
function addHit(ruleId, rel, line, snippetLine, confidence = 'medium', extra = {}) {
  const key = `${ruleId}|${rel}|${line}|${extra.table || ''}|${extra.column || ''}`;
  if (hits.has(key)) return;
  hits.set(key, {
    ruleId,
    criterion: CRIT[ruleId.replace(/\d+$/, '')],
    file: rel,
    line,
    snippet: redact((snippetLine || '').trim()).slice(0, 160),
    confidence,
    ...extra,
  });
}
const rawLine = (raw, line) => (raw.split('\n')[line - 1] || '');
const lineCache = new Map();
function lineText(rel, line) {
  if (!lineCache.has(rel)) lineCache.set(rel, (texts.get(rel) || '').split('\n'));
  return lineCache.get(rel)[line - 1] || '';
}

// ---------------------------------------------------------------- tenant + growth heuristics
const TENANT_SET = new Set(['tenantid', 'orgid', 'schoolid', 'organizationid', 'accountid', ...opts.tenantColumns.map(norm)]);
const GROWTH_RE = /(log|event|audit|history|histor|transition|submission)/i;
const TIME_COL_RE = /^(created_?at|occurred_?at|logged_?at|recorded_?at|timestamp|ts|event_?time|submitted_?at)$/i;
const STATUS_LIKE = /^(is_?\w+|has_?\w+|status|state|active|deleted|archived|enabled)$/i;
const MONEY_RE = /(price|amount|total|balance|cost|salary|fee)/i;
const PAYLOAD_RE = /(raw_?payload|payload|^raw_|^raw[A-Z]|^data$|blob)/i;
const INT4_PK = new Set(['serial', 'integer', 'smallserial', 'int']);

// ---------------------------------------------------------------- schema parsing
const tables = [];
const enums = [];
const globalSchemaVars = new Map();
const helpers = new Map();
const rlsSqlTables = new Set();

function methodsChain(masked, pos, end) {
  const out = [];
  let p = pos;
  const re = /^\s*\??\.\s*([$\w]+)\s*/;
  while (p < end) {
    const m = re.exec(masked.slice(p, end));
    if (!m) break;
    p += m[0].length;
    let args = '';
    let argsStart = p;
    if (masked[p] === '(') {
      const c = findMatching(masked, p);
      if (c < 0) break;
      args = masked.slice(p + 1, c);
      argsStart = p + 1;
      p = c + 1;
    }
    out.push({ name: m[1], args, argsStart });
  }
  return out;
}
const refKeys = (txt) => [...txt.matchAll(/\b[\w$]+\.([\w$]+)/g)].map((m) => m[1]);

function parseColumn(masked, entry, lineOf, enumVars) {
  const km = /^(\s*)(?:([A-Za-z_$][\w$]*)|'([^']+)'|"([^"]+)")\s*:\s*/.exec(entry.text);
  if (!km) return null;
  const key = km[2] || km[3] || km[4];
  const exprAbs = entry.start + km[0].length;
  const expr = entry.text.slice(km[0].length);
  const tm = /^\s*(?:[A-Za-z_$][\w$]*\.)?([A-Za-z_$][\w$]*)\s*\(/.exec(expr);
  if (!tm) return null;
  const typeName = tm[1];
  const typeOpen = exprAbs + tm[0].length - 1;
  const typeClose = findMatching(masked, typeOpen);
  if (typeClose < 0) return null;
  const typeArgs = masked.slice(typeOpen + 1, typeClose);
  const chain = methodsChain(masked, typeClose + 1, entry.start + entry.text.length);
  const col = {
    key,
    name: strLit(typeArgs) || key,
    type: enumVars.has(typeName) ? `enum:${typeName}` : typeName,
    typeArgs,
    notNull: false,
    primaryKey: false,
    unique: false,
    defaultKind: null,
    defaultText: '',
    identity: false,
    fk: null,
    line: lineOf(entry.start + (entry.text.length - entry.text.trimStart().length)),
  };
  for (const m of chain) {
    if (m.name === 'notNull') col.notNull = true;
    else if (m.name === 'primaryKey') col.primaryKey = true;
    else if (m.name === 'unique') col.unique = true;
    else if (m.name === 'defaultRandom') {
      col.defaultKind = 'random';
      col.defaultText = 'defaultRandom()';
    } else if (m.name === 'default' || m.name === '$defaultFn' || m.name === '$default') {
      col.defaultKind = m.name === 'default' ? 'sql' : 'fn';
      col.defaultText = m.args.replace(/\s+/g, ' ').trim();
    } else if (m.name === 'generatedAlwaysAsIdentity' || m.name === 'generatedByDefaultAsIdentity') col.identity = true;
    else if (m.name === 'references') {
      const target = /=>\s*([\w$.]+)/.exec(m.args);
      const od = /onDelete\s*:\s*['"]([^'"]+)['"]/.exec(m.args);
      col.fk = { target: target ? target[1] : '?', onDelete: od ? od[1] : null };
    }
  }
  return col;
}

function parseTable(rel, raw, masked, lineOf, callIdx, openIdx, schemaName, enumVars) {
  const close = findMatching(masked, openIdx);
  if (close < 0) throw new Error('unbalanced pgTable call');
  const args = splitTop(masked.slice(openIdx + 1, close), openIdx + 1);
  const name = strLit(args[0] && args[0].text);
  if (!name) throw new Error('could not read table name');
  const before = masked.slice(Math.max(0, callIdx - 160), callIdx);
  const vm = /(?:const|let|var)\s+([\w$]+)\s*(?::[^=]+)?=\s*$/.exec(before);
  const table = {
    name,
    schema: schemaName || null,
    varName: vm ? vm[1] : null,
    file: rel,
    line: lineOf(callIdx),
    columnCount: 0,
    primaryKey: { kind: 'none', columns: [], type: null },
    columns: [],
    foreignKeys: [],
    indexes: [],
    uniqueConstraints: [],
    checkConstraints: [],
    jsonbColumns: [],
    timestamps: [],
    hasTenantColumn: false,
    tenantColumn: null,
    rls: false,
    _compositePk: null,
    _spread: false,
  };

  // columns
  const colArg = args[1];
  if (colArg) {
    const t = colArg.text;
    let braceRel = -1;
    if (/^\s*\{/.test(t)) braceRel = t.indexOf('{');
    else if (t.includes('=>')) braceRel = t.indexOf('{', t.indexOf('=>'));
    if (braceRel >= 0) {
      const abs = colArg.start + braceRel;
      const end = findMatching(masked, abs);
      if (end > 0) {
        for (const e of splitTop(masked.slice(abs + 1, end), abs + 1)) {
          const sp = /^\s*\.\.\.\s*([\w$]+)\s*\(/.exec(e.text);
          if (sp && helpers.has(sp[1])) {
            const h = helpers.get(sp[1]);
            for (const he of h.entries) {
              const hc = parseColumn(h.masked, he, h.lineOf, enumVars);
              if (hc) {
                hc.viaHelper = `${h.rel}:${hc.line}`;
                hc.line = lineOf(e.start + (e.text.length - e.text.trimStart().length));
                table.columns.push(hc);
              }
            }
            continue;
          }
          if (/^\s*\.\.\./.test(e.text)) {
            table._spread = true;
            continue;
          }
          const c = parseColumn(masked, e, lineOf, enumVars);
          if (c) table.columns.push(c);
        }
      }
    }
  }
  table.columnCount = table.columns.length;
  const byKey = new Map(table.columns.map((c) => [c.key, c]));
  const nameOf = (k) => (byKey.get(k) ? byKey.get(k).name : k);

  // extra config
  const extra = args[2];
  if (extra) {
    const t = extra.text;
    const arrow = t.indexOf('=>');
    const base = arrow >= 0 ? arrow + 2 : 0;
    const sub = t.slice(base);
    const m = /[[{]/.exec(sub);
    if (m) {
      const abs = extra.start + base + m.index;
      const end = findMatching(masked, abs);
      if (end > 0) {
        for (const e of splitTop(masked.slice(abs + 1, end), abs + 1)) {
          let text = e.text;
          let start = e.start;
          const ks = /^\s*[\w$'"]+\s*:\s*/.exec(text);
          if (ks && !/^\s*[\w$]+\s*\(/.test(text)) {
            text = text.slice(ks[0].length);
            start += ks[0].length;
          }
          text = text.replace(/^(\s*)\.\.\./, '$1');
          const hm = /^\s*(?:[\w$]+\.)?(index|uniqueIndex|unique|primaryKey|foreignKey|check|pgPolicy)\s*\(/.exec(text);
          if (!hm) {
            const cm = /^\s*([\w$]+)\s*\(/.exec(text);
            const h = cm && fnHelpers.get(cm[1]);
            if (h) {
              const co = start + cm[0].length - 1;
              const cc = findMatching(masked, co);
              if (cc < 0) continue;
              const cargs = splitTop(masked.slice(co + 1, cc), co + 1);
              const line = lineOf(start + (text.length - text.trimStart().length));
              if (h.kinds.has('primaryKey')) table._compositePk = h.pkCols.length ? h.pkCols : ['id'];
              if (h.kinds.has('foreignKey')) {
                const colArg = cargs[h.colIdx >= 0 ? h.colIdx : 0];
                const od = h.onDeleteIdx >= 0 && cargs[h.onDeleteIdx] ? strLit(cargs[h.onDeleteIdx].text) : h.onDeleteDefault;
                const tgt = cargs[h.colIdx + 1] || cargs[1];
                table.foreignKeys.push({ columns: colArg ? refKeys(colArg.text) : [], references: tgt ? tgt.text.replace(/\s+/g, ' ').trim() : '?', onDelete: od, line, viaHelper: cm[1] });
              }
              if (h.kinds.has('unique') && h.uniqueCols.length) table.uniqueConstraints.push({ kind: 'unique', name: null, columns: h.uniqueCols, method: 'btree', where: false, include: [], line, unique: true });
            }
            continue;
          }
          const kind = hm[1];
          const callOpen = start + hm[0].length - 1;
          const callClose = findMatching(masked, callOpen);
          if (callClose < 0) continue;
          const callArgs = masked.slice(callOpen + 1, callClose);
          const chain = methodsChain(masked, callClose + 1, start + text.length);
          const line = lineOf(start + (text.length - text.trimStart().length));
          const ent = { kind, name: strLit(callArgs), columns: [], method: 'btree', where: false, include: [], line };
          for (const c of chain) {
            if (c.name === 'on') ent.columns = refKeys(c.args);
            else if (c.name === 'using') {
              ent.method = strLit(c.args) || 'btree';
              const cols = refKeys(c.args.replace(/^\s*['"`][^'"`]*['"`]\s*,?/, ''));
              if (cols.length) ent.columns = cols;
            } else if (c.name === 'where') ent.where = true;
            else if (c.name === 'include') ent.include = refKeys(c.args);
          }
          if (kind === 'index' || kind === 'uniqueIndex') {
            table.indexes.push({ ...ent, unique: kind === 'uniqueIndex' });
          } else if (kind === 'unique') {
            table.uniqueConstraints.push({ ...ent, unique: true });
          } else if (kind === 'primaryKey') {
            const cm = /columns\s*:\s*\[([^\]]*)\]/.exec(callArgs);
            table._compositePk = cm ? refKeys(cm[1]) : [];
          } else if (kind === 'foreignKey') {
            const cm = /columns\s*:\s*\[([^\]]*)\]/.exec(callArgs);
            const fm = /foreignColumns\s*:\s*\[([^\]]*)\]/.exec(callArgs);
            const od = /onDelete\s*:\s*['"]([^'"]+)['"]/.exec(callArgs) || chain.map((c) => /['"]([^'"]+)['"]/.exec(c.name === 'onDelete' ? c.args : '')).find(Boolean);
            table.foreignKeys.push({
              columns: cm ? refKeys(cm[1]) : [],
              references: fm ? fm[1].replace(/\s+/g, ' ').trim() : '?',
              onDelete: od ? od[1] : null,
              line,
            });
          } else if (kind === 'check') {
            table.checkConstraints.push({ name: strLit(callArgs), line });
          } else if (kind === 'pgPolicy') table.rls = true;
        }
      }
    }
  }
  const tail = masked.slice(close + 1, close + 60);
  if (/^\s*\.\s*enableRLS\s*\(/.test(tail)) table.rls = true;

  // derived
  for (const c of table.columns) {
    if (c.fk) table.foreignKeys.push({ columns: [c.key], references: c.fk.target, onDelete: c.fk.onDelete, line: c.line });
    if (c.unique) table.uniqueConstraints.push({ kind: 'unique', name: null, columns: [c.key], method: 'btree', where: false, include: [], line: c.line, unique: true, columnLevel: true });
    if (/^jsonb?$/.test(c.type)) table.jsonbColumns.push({ name: c.name, type: c.type, line: c.line });
    if (c.type === 'timestamp' || c.type === 'timestamptz') {
      table.timestamps.push({ name: c.name, withTimezone: c.type === 'timestamptz' || /withTimezone\s*:\s*true/.test(c.typeArgs), line: c.line });
    }
    if (!table.hasTenantColumn && (TENANT_SET.has(norm(c.name)) || TENANT_SET.has(norm(c.key)))) {
      table.hasTenantColumn = true;
      table.tenantColumn = c.key;
    }
  }
  // primary key
  const pkCols = table._compositePk && table._compositePk.length ? table._compositePk : table.columns.filter((c) => c.primaryKey).map((c) => c.key);
  table.primaryKey.columns = pkCols;
  if (pkCols.length > 1) table.primaryKey.kind = 'composite';
  else if (pkCols.length === 1) {
    const c = byKey.get(pkCols[0]);
    table.primaryKey.type = c ? c.type : null;
    const d = c ? c.defaultText : '';
    if (!c) table.primaryKey.kind = 'other';
    else if (c.type === 'uuid') {
      if (/uuid_?v7|uuidv7/i.test(d)) table.primaryKey.kind = 'uuid-v7';
      else if (c.defaultKind === 'random' || /gen_random_uuid|randomUUID|uuid_generate_v4|uuidv4|\bv4\b/i.test(d)) table.primaryKey.kind = 'uuid-random';
      else table.primaryKey.kind = 'uuid-other';
    } else if (/serial$/i.test(c.type)) table.primaryKey.kind = 'serial';
    else if (c.identity) table.primaryKey.kind = 'identity';
    else if (c.type === 'text' || c.type === 'varchar' || c.type === 'char') table.primaryKey.kind = 'text';
    else table.primaryKey.kind = 'other';
  }
  table._byKey = byKey;
  table._nameOf = nameOf;
  return table;
}

function parseSchemaFile(f, raw) {
  const masked = maskComments(raw);
  const lineOf = makeLineOf(raw);
  const enumVars = new Set();
  for (const m of masked.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*pgEnum\s*\(/g)) {
    enumVars.add(m[1]);
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    const a = splitTop(masked.slice(open + 1, close), open + 1);
    const vals = a[1] ? [...a[1].text.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]) : [];
    enums.push({ varName: m[1], name: strLit(a[0] && a[0].text), values: vals, file: f.rel, line: lineOf(m.index), tablesUsing: [] });
  }
  const schemaVars = globalSchemaVars;
  const callRe = new RegExp(`(?<![\\w$.])pgTable\\s*\\(|(?<![\\w$])(${[...schemaVars.keys()].map((k) => k.replace(/\$/g, '\\$')).join('|') || '\\b\\B'})\\.table\\s*\\(`, 'g');
  for (const m of masked.matchAll(callRe)) {
    try {
      const open = m.index + m[0].length - 1;
      const t = parseTable(f.rel, raw, masked, lineOf, m.index, open, m[1] ? schemaVars.get(m[1]) : null, enumVars);
      tables.push(t);
    } catch (e) {
      limitations.push(`Parse failure in ${f.rel}:${lineOf(m.index)} (${e.message}); table skipped.`);
    }
  }
}

// ---------------------------------------------------------------- classify + parse schema files
const codeFiles = files.filter((f) => CODE_RE.test(f.base) && !isSecretEnv(f.base));
const schemaFiles = [];
const pgFiles = [];
for (const f of codeFiles) {
  const raw = readText(f);
  if (raw == null) continue;
  if (!/drizzle-orm\/pg-core|pgTable|pgSchema/.test(raw)) continue;
  pgFiles.push(f);
  const masked = maskComments(raw);
  for (const m of masked.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*pgSchema\s*\(\s*['"]([^'"]+)['"]/g)) globalSchemaVars.set(m[1], m[2]);
  const lineOf = makeLineOf(raw);
  for (const m of masked.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*\([^)]*\)\s*(?::[^=>{]+)?=>\s*\(\s*\{/g)) {
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    if (close > 0) helpers.set(m[1], { rel: f.rel, masked, lineOf, entries: splitTop(masked.slice(open + 1, close), open + 1) });
  }
}
// Local helper functions that wrap primaryKey()/foreignKey()/unique() (e.g. pkey(t), fk(col, target, 'cascade')).
const fnHelpers = new Map();
for (const f of pgFiles) {
  const masked = maskComments(texts.get(f.rel));
  for (const m of masked.matchAll(/(?:const|function)\s+([\w$]+)\s*=?\s*(\([^)]*(?:\([^)]*\)[^)]*)*\))\s*(?::[^=>{]+)?=>\s*/g)) {
    let p = m.index + m[0].length;
    let end;
    if ('([{'.includes(masked[p])) end = findMatching(masked, p);
    else end = masked.indexOf(';', p);
    if (end < 0) continue;
    fnHelpers.set(m[1], { body: masked.slice(p, end + 1), params: m[2], file: f.rel });
  }
}
for (const [name, h] of fnHelpers) {
  h.kinds = new Set();
  h.pkCols = [];
  h.uniqueCols = [];
  h.colIdx = -1;
  h.onDeleteIdx = -1;
  h.onDeleteDefault = null;
}
for (let pass = 0; pass < 3; pass++) {
  for (const [name, h] of fnHelpers) {
    if (/\bprimaryKey\s*\(/.test(h.body)) h.kinds.add('primaryKey');
    if (/\bforeignKey\s*\(/.test(h.body)) h.kinds.add('foreignKey');
    if (/\bunique\s*\(/.test(h.body)) h.kinds.add('unique');
    for (const [other, o] of fnHelpers) {
      if (other !== name && new RegExp(`(?<![\\w$.])${other.replace(/\$/g, '\\$')}\\s*\\(`).test(h.body)) for (const k of o.kinds) h.kinds.add(k);
    }
  }
}
for (const [name, h] of fnHelpers) {
  const pm = /columns\s*:\s*\[([^\]]*)\]/.exec(h.body);
  if (h.kinds.has('primaryKey')) h.pkCols = pm && !/\bcolumns\b\s*\]/.test(pm[1]) ? [...pm[1].matchAll(/\bt\.([\w$]+)/g)].map((x) => x[1]) : [];
  const um = /\bunique\s*\([^)]*\)\s*\.on\s*\(([^)]*)\)/.exec(h.body);
  if (um) h.uniqueCols = [...um[1].matchAll(/\bt\.([\w$]+)/g)].map((x) => x[1]);
  const ps = splitTop(h.params.slice(1, -1));
  h.colIdx = ps.findIndex((p) => /^\s*columns?\b/.test(p.text));
  h.onDeleteIdx = ps.findIndex((p) => /^\s*onDelete\b/.test(p.text));
  if (h.onDeleteIdx >= 0) {
    const d = /=\s*['"]([^'"]+)['"]/.exec(ps[h.onDeleteIdx].text);
    h.onDeleteDefault = d ? d[1] : null;
  }
}
const schemaVarRe = globalSchemaVars.size
  ? new RegExp(`(?<![\\w$])(?:${[...globalSchemaVars.keys()].map((k) => k.replace(/\$/g, '\\$')).join('|')})\\.table\\s*\\(`)
  : null;
for (const f of pgFiles) {
  const raw = texts.get(f.rel);
  if (/\bpgTable\s*\(/.test(raw) || (schemaVarRe && schemaVarRe.test(raw))) {
    schemaFiles.push(f);
    try {
      parseSchemaFile(f, raw);
    } catch (e) {
      limitations.push(`Schema parse failure in ${f.rel}: ${e.message}`);
    }
  }
}
tables.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line));

// ---------------------------------------------------------------- drizzle config + versions
const configFile = files.find((f) => /^drizzle\.config\.[cm]?[jt]s$/.test(f.base));
const drizzleInfo = { configPath: null, dialect: null, out: null, configSchema: [], schemaPaths: [], drizzleOrmVersion: null, drizzleKitVersion: null, drivers: [] };
if (configFile) {
  drizzleInfo.configPath = configFile.rel;
  const t = readText(configFile) || '';
  const d = /dialect\s*:\s*['"](\w+)['"]/.exec(t);
  drizzleInfo.dialect = d ? d[1] : null;
  const o = /\bout\s*:\s*['"]([^'"]+)['"]/.exec(t);
  drizzleInfo.out = o ? o[1] : null;
  const s = /schema\s*:\s*(\[[^\]]*\]|['"][^'"]+['"])/.exec(t);
  if (s) drizzleInfo.configSchema = [...s[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}
for (const f of files.filter((x) => x.base === 'package.json')) {
  try {
    const j = JSON.parse(readText(f) || '{}');
    const dep = { ...(j.dependencies || {}), ...(j.devDependencies || {}) };
    if (dep['drizzle-orm'] && !drizzleInfo.drizzleOrmVersion) drizzleInfo.drizzleOrmVersion = `${dep['drizzle-orm']} (${f.rel})`;
    if (dep['drizzle-kit'] && !drizzleInfo.drizzleKitVersion) drizzleInfo.drizzleKitVersion = `${dep['drizzle-kit']} (${f.rel})`;
  } catch {
    limitations.push(`Invalid JSON in ${f.rel}`);
  }
}
{
  const cfgDir = configFile ? path.posix.dirname(configFile.rel) : '.';
  const set = new Set(schemaFiles.map((f) => f.rel));
  for (const g of drizzleInfo.configSchema) {
    const joined = path.posix.normalize(path.posix.join(cfgDir, g.replace(/^\.\//, '')));
    const re = globToRe(joined);
    for (const f of files) if (re.test(f.rel) && CODE_RE.test(f.base)) set.add(f.rel);
  }
  drizzleInfo.schemaPaths = [...set].sort();
}

// ---------------------------------------------------------------- migrations
const sqlFiles = files.filter((f) => f.base.endsWith('.sql'));
const journalFiles = files.filter((f) => f.base === '_journal.json');
const migDirs = new Map(); // dir -> {sql:[], journal:null}
for (const j of journalFiles) {
  const dir = path.posix.dirname(path.posix.dirname(j.rel));
  migDirs.set(dir, { sql: [], journal: j });
}
for (const f of sqlFiles) {
  const dir = path.posix.dirname(f.rel);
  if (migDirs.has(dir)) migDirs.get(dir).sql.push(f);
  else if (/(^|\/)(drizzle|migrations?)(\/|$)/i.test(dir) && !/\/meta(\/|$)/.test(dir)) {
    if (!migDirs.has(dir)) migDirs.set(dir, { sql: [], journal: null });
    migDirs.get(dir).sql.push(f);
  }
}
const migrations = [];
const migSql = [];
for (const [dir, v] of [...migDirs.entries()].sort()) {
  v.sql.sort((a, b) => (a.rel < b.rel ? -1 : 1));
  migSql.push(...v.sql);
  let entries = null;
  let drift = [];
  if (v.journal) {
    try {
      const j = JSON.parse(readText(v.journal) || '{}');
      entries = (j.entries || []).map((e) => e.tag);
      const sqlTags = new Set(v.sql.map((f) => f.base.replace(/\.sql$/, '')));
      const jTags = new Set(entries);
      drift = [...jTags].filter((t) => !sqlTags.has(t)).map((t) => `journal entry without .sql: ${t}`).concat([...sqlTags].filter((t) => !jTags.has(t)).map((t) => `.sql without journal entry: ${t}`));
      if (drift.length) addHit('MIG006', v.journal.rel, 1, drift[0], 'high');
    } catch {
      limitations.push(`Invalid journal JSON ${v.journal.rel}`);
    }
  }
  migrations.push({ folder: dir, fileCount: v.sql.length, journal: v.journal ? v.journal.rel : null, journalEntries: entries ? entries.length : null, journalConsistent: v.journal ? drift.length === 0 : null, drift });
}
if (tables.length && migSql.length === 0) {
  const anchor = schemaFiles[0];
  addHit('MIG007', anchor.rel, 1, 'schema files found but no migration folder with .sql files', 'medium');
}

// per-statement migration rules
const OBJ = '(?:"?\\w+"?\\.)?"?(\\w+)"?';
for (const f of migSql) {
  const raw = readText(f);
  if (!raw) continue;
  const lineOf = makeLineOf(raw);
  const created = new Set([...raw.matchAll(new RegExp(`CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?${OBJ}`, 'gi'))].map((m) => m[1]));
  const stmtEnd = (idx) => {
    const e = raw.indexOf(';', idx);
    return e < 0 ? raw.length : e;
  };
  for (const m of raw.matchAll(new RegExp(`CREATE\\s+(?:UNIQUE\\s+)?INDEX\\s+(?!CONCURRENTLY)(?:IF\\s+NOT\\s+EXISTS\\s+)?"?\\w+"?\\s+ON\\s+(?:ONLY\\s+)?${OBJ}`, 'gi'))) {
    if (!created.has(m[1])) addHit('MIG001', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'medium', { table: m[1] });
  }
  for (const m of raw.matchAll(/ALTER\s+TYPE\s+[^;]*?(?:ADD\s+VALUE|RENAME\s+VALUE|RENAME\s+TO)|DROP\s+TYPE/gi)) addHit('MIG002', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'high');
  for (const m of raw.matchAll(new RegExp(`ALTER\\s+TABLE\\s+(?:ONLY\\s+)?${OBJ}\\s+ALTER\\s+COLUMN\\s+"?\\w+"?\\s+(SET\\s+NOT\\s+NULL|(?:SET\\s+DATA\\s+)?TYPE)`, 'gi'))) {
    const prior = raw.slice(0, m.index);
    const backfilled = new RegExp(`UPDATE\\s+(?:"?\\w+"?\\.)?"?${m[1]}"?\\s`, 'i').test(prior);
    if (!backfilled && !created.has(m[1])) addHit('MIG003', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'medium', { table: m[1] });
  }
  for (const m of raw.matchAll(/DROP\s+(?:COLUMN|TABLE)/gi)) addHit('MIG004', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'high');
  for (const m of raw.matchAll(new RegExp(`^\\s*UPDATE\\s+${OBJ}`, 'gim'))) {
    const stmt = raw.slice(m.index, stmtEnd(m.index));
    if (!/LIMIT|BETWEEN|ctid|SKIP\s+LOCKED|batch/i.test(stmt) && !created.has(m[1])) addHit('MIG005', f.rel, lineOf(m.index + (m[0].length - m[0].trimStart().length)), lineText(f.rel, lineOf(m.index + (m[0].length - m[0].trimStart().length))), 'medium', { table: m[1] });
  }
  for (const m of raw.matchAll(/INSERT\s+INTO\s+[^;]*?\bSELECT\b/gis)) {
    const stmt = raw.slice(m.index, stmtEnd(m.index));
    if (!/LIMIT|BETWEEN|ctid|SKIP\s+LOCKED|batch/i.test(stmt)) addHit('MIG005', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'low');
  }
}
// RLS in SQL
for (const f of sqlFiles) {
  const raw = readText(f) || '';
  for (const m of raw.matchAll(new RegExp(`ALTER\\s+TABLE\\s+(?:ONLY\\s+)?${OBJ}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'gi'))) rlsSqlTables.add(m[1]);
}

// ---------------------------------------------------------------- table-level rules
for (const e of enums) e.tablesUsing = [...new Set(tables.filter((t) => t.columns.some((c) => c.type === `enum:${e.varName}`)).map((t) => t.name))].sort();
for (const e of enums) addHit('CON003', e.file, e.line, `pgEnum ${e.name} (${e.values.length} values, ${e.tablesUsing.length} tables)`, 'high', { enumName: e.name });

const allFileText = () => [...texts.entries()].filter(([, t]) => t != null);

function tableRules(t) {
  const L = (line) => lineText(t.file, line);
  const ex = { table: t.name };
  const pk = t.primaryKey;
  const pkCol = pk.columns.length === 1 ? t._byKey.get(pk.columns[0]) : null;
  const growth = GROWTH_RE.test(t.name);
  if (pk.kind === 'uuid-random') addHit('PK001', t.file, pkCol.line, L(pkCol.line), 'high', ex);
  if (pkCol && INT4_PK.has(pkCol.type) && growth) addHit('PK002', t.file, pkCol.line, L(pkCol.line), 'high', ex);
  if (pk.kind === 'text') addHit('PK003', t.file, pkCol.line, L(pkCol.line), 'medium', ex);
  if (pk.kind === 'none' && !t._spread) addHit('PK004', t.file, t.line, L(t.line), 'high', ex);
  if (t.hasTenantColumn && pk.kind === 'composite' && !pk.columns.some((k) => TENANT_SET.has(norm(t._nameOf(k))) || TENANT_SET.has(norm(k)))) addHit('PK005', t.file, t.line, L(t.line), 'medium', ex);

  // leading columns
  const leading = new Set();
  const isTenantKey = (k) => TENANT_SET.has(norm(k)) || TENANT_SET.has(norm(t._nameOf(k)));
  for (const i of [...t.indexes, ...t.uniqueConstraints]) if (i.columns[0]) leading.add(i.columns[0]);
  if (pk.columns.length) leading.add(pk.columns[0]);
  for (const i of t.indexes) i.tenantLeads = !!(i.columns[0] && isTenantKey(i.columns[0]));
  for (const fk of t.foreignKeys) {
    const first = fk.columns[0];
    if (first && !leading.has(first)) addHit('IDX001', t.file, fk.line, L(fk.line), 'high', { ...ex, column: t._nameOf(first) });
  }
  if (t.hasTenantColumn) {
    const any = [...t.indexes, ...t.uniqueConstraints].some((i) => i.columns[0] && isTenantKey(i.columns[0])) || (pk.columns[0] && isTenantKey(pk.columns[0]));
    if (!any) addHit('IDX002', t.file, t.line, L(t.line), 'high', ex);
  }
  // prefix / duplicate indexes
  const plain = t.indexes.filter((i) => !i.where && i.method === 'btree' && i.columns.length);
  for (const a of plain) {
    if (a.unique) continue;
    for (const b of plain) {
      if (a === b || b.columns.length < a.columns.length) continue;
      const prefix = a.columns.every((c, n) => b.columns[n] === c);
      if (!prefix) continue;
      if (b.columns.length === a.columns.length && (a.line > b.line || (a.line === b.line && a.name > b.name))) continue;
      if (b.columns.length === a.columns.length && a.unique !== b.unique && !b.unique) continue;
      addHit('IDX003', t.file, a.line, L(a.line), 'high', { ...ex, index: a.name || undefined });
      break;
    }
  }
  // BRIN candidate
  const appendOnly = growth || (t.columns.some((c) => TIME_COL_RE.test(c.name)) && !t.columns.some((c) => /^updated_?at$/i.test(c.name)));
  if (appendOnly) {
    for (const i of t.indexes) {
      const c0 = i.columns[0] && t._byKey.get(i.columns[0]);
      if (c0 && TIME_COL_RE.test(c0.name) && i.method !== 'brin') addHit('IDX004', t.file, i.line, L(i.line), 'low', ex);
    }
  }
  for (const i of t.indexes) {
    if (i.include.some((k) => /^(jsonb?|text)$/.test((t._byKey.get(k) || {}).type || ''))) addHit('IDX005', t.file, i.line, L(i.line), 'high', ex);
    if (i.columns.length === 1 && !i.where && !i.unique) {
      const c = t._byKey.get(i.columns[0]);
      if (c && (c.type === 'boolean' || STATUS_LIKE.test(c.name))) addHit('IDX006', t.file, i.line, L(i.line), 'low', ex);
    }
  }

  // C3
  for (const u of t.uniqueConstraints.concat(t.indexes.filter((i) => i.unique))) {
    if (t.hasTenantColumn && !u.columns.some(isTenantKey)) addHit('CON001', t.file, u.line, L(u.line), 'medium', ex);
  }
  for (const ts of t.timestamps) if (!ts.withTimezone) addHit('CON002', t.file, ts.line, L(ts.line), 'high', { ...ex, column: ts.name });
  for (const fk of t.foreignKeys) if (!fk.onDelete) addHit('CON004', t.file, fk.line, L(fk.line), 'high', ex);
  for (const c of t.columns) {
    if (MONEY_RE.test(c.name) && (c.type === 'real' || c.type === 'doublePrecision' || c.type === 'float')) addHit('CON005', t.file, c.line, L(c.line), 'high', { ...ex, column: c.name });
    if (!c.notNull && !c.primaryKey && (/_id$/i.test(c.name) || /^status$/i.test(c.name) || /^created_?at$/i.test(c.name))) addHit('CON006', t.file, c.line, L(c.line), 'medium', { ...ex, column: c.name });
  }

  // C5
  if (t.hasTenantColumn && !t.rls && !rlsSqlTables.has(t.name)) addHit('TEN001', t.file, t.line, L(t.line), 'medium', ex);
  if (rlsSqlTables.has(t.name)) t.rls = true;

  // C6
  for (const j of t.jsonbColumns) {
    addHit('MOD001', t.file, j.line, L(j.line), 'high', { ...ex, column: j.name });
    const typed = t.columns.filter((c) => !/^jsonb?$/.test(c.type) && !c.primaryKey).length;
    if (PAYLOAD_RE.test(j.name) && typed >= 3) addHit('MOD002', t.file, j.line, L(j.line), 'low', { ...ex, column: j.name });
  }
  if (t.columnCount > 40) addHit('MOD003', t.file, t.line, L(t.line), 'high', ex);
  if (growth) {
    const evidence = allFileText().some(([rel, txt]) => /PARTITION\s+BY|partitionBy|retention|archiv|purge/i.test(txt) && (txt.includes(`"${t.name}"`) || txt.includes(`'${t.name}'`) || txt.includes(t.name)) && (CODE_RE.test(rel) || rel.endsWith('.sql')));
    if (!evidence) addHit('MOD004', t.file, t.line, L(t.line), 'low', ex);
  }
}
for (const t of tables) tableRules(t);

// ---------------------------------------------------------------- code rules
const codeFacts = { transactions: 0, lockingReads: { forUpdate: 0, forNoKeyUpdate: 0, other: 0 }, retryHandlingFiles: [], advisoryLocks: 0, pools: [], poolerSignals: [], statementTimeoutFiles: [], drivers: [] };
const poolConstructions = [];
const lockingReadSites = [];

function eachMatch(re, s) {
  re.lastIndex = 0;
  return [...s.matchAll(re)];
}
function loopRanges(masked) {
  const out = [];
  for (const m of eachMatch(/(?<![\w$.])(?:for|while)\s*(?:await\s*)?\(/g, masked)) {
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    if (close < 0) continue;
    let p = close + 1;
    while (/\s/.test(masked[p] || '')) p++;
    if (masked[p] === '{') {
      const e = findMatching(masked, p);
      if (e > 0) out.push([p, e]);
    } else {
      const e = masked.indexOf(';', p);
      if (e > 0) out.push([p, e]);
    }
  }
  for (const m of eachMatch(/\.(?:map|forEach|flatMap|reduce|filter)\s*\(/g, masked)) {
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    if (close > 0) out.push([open, close]);
  }
  return out;
}

for (const f of codeFiles) {
  const raw = texts.get(f.rel);
  if (raw == null || isTestFile(f.rel)) continue;
  const masked = maskComments(raw);
  const lineOf = makeLineOf(raw);
  const L = (off) => lineText(f.rel, lineOf(off));
  const hit = (id, off, conf, ex) => addHit(id, f.rel, lineOf(off), L(off), conf, ex);

  // drivers
  if (/from\s+['"]postgres['"]/.test(masked + raw.slice(0, 0)) || /from\s+'postgres'|from\s+"postgres"/.test(raw)) codeFacts.drivers.push('postgres-js');
  if (/from\s+['"]pg['"]/.test(raw)) codeFacts.drivers.push('node-postgres');
  if (/@neondatabase\/serverless/.test(raw)) codeFacts.drivers.push('neon');
  const usesPostgresJs = /from\s+['"]postgres['"]/.test(raw);

  // C4
  codeFacts.transactions += eachMatch(/\.transaction\s*\(/g, masked).length;
  const lockRe = /\.for\s*\(\s*['"`](update|no key update|share|key share)['"`]|\bFOR\s+(NO\s+KEY\s+UPDATE|KEY\s+SHARE|UPDATE|SHARE)\b/gi;
  for (const m of eachMatch(lockRe, raw)) {
    const kind = (m[1] || m[2]).toLowerCase().replace(/\s+/g, ' ');
    if (kind === 'update') {
      codeFacts.lockingReads.forUpdate++;
      hit('LCK001', m.index, 'medium');
    } else if (kind === 'no key update') {
      codeFacts.lockingReads.forNoKeyUpdate++;
      hit('LCK002', m.index, 'high');
    } else codeFacts.lockingReads.other++;
    lockingReadSites.push({ rel: f.rel, off: m.index, line: lineOf(m.index) });
    const startBack = Math.max(0, m.index - 500);
    const semi = raw.lastIndexOf(';', m.index);
    const win = raw.slice(Math.max(startBack, semi + 1), m.index + 120);
    if (!/orderBy|ORDER\s+BY/i.test(win)) hit('LCK003', m.index, 'low');
  }
  for (const m of eachMatch(/pg_advisory(?:_xact)?_lock|advisory_lock/gi, raw)) {
    codeFacts.advisoryLocks++;
    hit('LCK006', m.index, 'high');
  }
  for (const m of eachMatch(/\.transaction\s*\(/g, masked)) {
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    if (close < 0) continue;
    const body = masked.slice(open, close);
    for (const x of body.matchAll(/(?<![\w$.])fetch\s*\(|\baxios\b|\bsendMail\s*\(|\bsendEmail\s*\(|\bhttps?\.(?:request|get)\s*\(/g)) hit('LCK004', open + x.index, 'medium');
  }
  if (/40P01|40001|deadlock_detected|serialization_failure/.test(raw)) codeFacts.retryHandlingFiles.push(f.rel);

  // C5
  for (const m of eachMatch(/\bSET\s+(?!LOCAL\b|SESSION\s+CHARACTERISTICS|TRANSACTION|CONSTRAINTS|NAMES|ROLE\b)(?:SESSION\s+)?[a-z_]+\.[a-z_]+\s*(?:=|TO)\b/gi, raw)) hit('TEN002', m.index, 'medium');
  for (const m of eachMatch(/set_config\s*\([^)]*,\s*(?:false|'f')\s*\)/gi, raw)) hit('TEN002', m.index, 'medium');
  for (const m of eachMatch(/CREATE\s+SCHEMA|\bsearch_path\b/gi, raw)) hit('TEN003', m.index, 'low');

  // C7
  for (const [a, b] of loopRanges(masked)) {
    const body = masked.slice(a, b);
    let first = true;
    for (const m of body.matchAll(/\bawait\s+(?:this\.)?(?:db|tx|trx|dbOrTx|database)\b[^;]{0,400}/g)) {
      const off = a + m.index;
      if (first) hit('ORM001', off, 'medium');
      first = false;
      if (/\.insert\s*\(/.test(m[0])) hit('ORM004', off, 'medium');
    }
  }
  const adminCtx = /(admin|export|seed|script|migrat|cron|report)/i.test(f.rel);
  for (const m of eachMatch(/\b(?:db|tx|trx)\s*\.\s*select\s*\(/g, masked)) {
    const rest = masked.slice(m.index, m.index + 900);
    const stmt = rest.split(/;|\n\s*\n/)[0];
    const before = masked.slice(Math.max(0, m.index - 60), m.index);
    if (/\.limit\s*\(|\.findFirst|\.for\s*\(/.test(stmt) || /\b(count|sum|max|min|avg)\s*\(/i.test(stmt.slice(0, 200)) || /const\s*\[/.test(before) || adminCtx) continue;
    hit('ORM002', m.index, 'low');
  }
  for (const m of eachMatch(/\.findMany\s*\(/g, masked)) {
    const open = m.index + m[0].length - 1;
    const close = findMatching(masked, open);
    if (close > 0 && !/\blimit\b/.test(masked.slice(open, close)) && !adminCtx) hit('ORM002', m.index, 'low');
  }
  for (const m of eachMatch(/\.offset\s*\(/g, masked)) hit('ORM003', m.index, 'high');
  for (const m of eachMatch(/\bsql\.raw\s*\(/g, masked)) hit('ORM005', m.index, 'medium');
  for (const m of eachMatch(/\.(?:execute|query)\s*\(\s*`[^`]*\$\{/g, raw)) hit('ORM005', m.index, 'medium');
  for (const m of eachMatch(/\bcount\s*\(/gi, masked)) {
    const win = masked.slice(m.index, m.index + 300);
    const fm = /\.from\s*\(\s*([\w$.]+)/.exec(win);
    if (fm && GROWTH_RE.test(fm[1]) && /(route|controller|handler|api|server)/i.test(f.rel)) hit('ORM006', m.index, 'low');
  }

  // C8
  const cons = [];
  for (const m of eachMatch(/\bnew\s+(?:[\w$]+\.)?Pool\s*\(/g, masked)) cons.push({ kind: 'node-postgres', m });
  if (usesPostgresJs) for (const m of eachMatch(/(?<![\w$.])postgres\s*\(/g, masked)) cons.push({ kind: 'postgres-js', m });
  for (const m of eachMatch(/(?<![\w$.])drizzle\s*\(\s*(?:process\.env|['"`]|\{)/g, masked)) cons.push({ kind: 'drizzle-own-pool', m });
  for (const c of cons) {
    const open = c.m.index + c.m[0].length - 1;
    const close = c.m[0].endsWith('(') ? findMatching(masked, open) : -1;
    const args = close > 0 ? masked.slice(open, close) : masked.slice(open, open + 400);
    const grab = (re) => {
      const x = re.exec(args);
      return x ? x[1].trim() : null;
    };
    const info = {
      file: f.rel,
      line: lineOf(c.m.index),
      kind: c.kind,
      max: grab(/\bmax\s*:\s*([^,}\n]+)/),
      idleTimeout: grab(/\b(?:idle_timeout|idleTimeoutMillis)\s*:\s*([^,}\n]+)/),
      connectTimeout: grab(/\b(?:connect_timeout|connectionTimeoutMillis)\s*:\s*([^,}\n]+)/),
      prepare: grab(/\bprepare\s*:\s*([^,}\n]+)/),
      statementTimeout: grab(/\bstatement_timeout\s*:\s*([^,}\n]+)/),
    };
    codeFacts.pools.push(info);
    if (c.kind !== 'drizzle-own-pool') poolConstructions.push({ ...info, off: c.m.index, indent: /^\s*/.exec(lineText(f.rel, info.line))[0].length, raw, masked });
    if (c.kind !== 'drizzle-own-pool' && info.max == null) hit('POOL001', c.m.index, 'high');
    if (c.kind === 'postgres-js' && !/prepare\s*:\s*false/.test(args)) info._needsPrepareCheck = true;
  }
  if (/statement_timeout|idle_in_transaction_session_timeout/.test(raw)) codeFacts.statementTimeoutFiles.push(f.rel);
  for (const m of eachMatch(/\b6432\b|pgbouncer/gi, raw)) codeFacts.poolerSignals.push({ file: f.rel, line: lineOf(m.index) });
  // POOL004: construction inside function bodies
  for (const c of cons) {
    if (c.kind === 'drizzle-own-pool') continue;
    const line = lineOf(c.m.index);
    const indent = /^\s*/.exec(lineText(f.rel, line))[0].length;
    if (indent === 0) continue;
    const back = masked.slice(Math.max(0, c.m.index - 400), c.m.index);
    if (/let\s+[\w$]+|if\s*\(\s*!|\?\?=|\|\|=|function\s+(?:create|get|init|build|make)\w*|(?:create|get|init|build|make)\w*\s*=\s*(?:async\s*)?\(/i.test(back)) continue;
    if (/(route|controller|handler|api|middleware|service)/i.test(f.rel) || /\b(req|request|res|ctx)\b/.test(back)) hit('POOL004', c.m.index, 'low');
  }
  // C10 (code files)
  for (const m of eachMatch(/autovacuum_vacuum_scale_factor/g, raw)) hit('OPS001', m.index, 'high');
  for (const m of eachMatch(/pg_stat_statements/g, raw)) hit('OPS002', m.index, 'high');
}

// ---------------------------------------------------------------- non-code text rules
const infraFiles = files.filter((f) => (INFRA_RE.test(f.base) || f.base.endsWith('.sql')) && !isSecretEnv(f.base));
for (const f of infraFiles) {
  const raw = readText(f);
  if (!raw) continue;
  const lineOf = makeLineOf(raw);
  const isSql = f.base.endsWith('.sql');
  for (const m of raw.matchAll(/\b6432\b|pgbouncer/gi)) if (!isSql) codeFacts.poolerSignals.push({ file: f.rel, line: lineOf(m.index) });
  if (/statement_timeout|idle_in_transaction_session_timeout/.test(raw)) codeFacts.statementTimeoutFiles.push(f.rel);
  if (isSql || /\.(ya?ml|conf|sh|ini|toml|j2)$/.test(f.base) || /^docker/i.test(f.base)) {
    for (const m of raw.matchAll(/autovacuum_vacuum_scale_factor/g)) addHit('OPS001', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'high');
    for (const m of raw.matchAll(/pg_stat_statements/g)) addHit('OPS002', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'high');
  }
  if (!isSql) {
    for (const m of raw.matchAll(/max_slot_wal_keep_size|random_page_cost|effective_cache_size|shared_buffers/g)) addHit('OPS003', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'high');
    for (const m of raw.matchAll(/pg_dump|pg_restore|pg_basebackup/g)) addHit('OPS004', f.rel, lineOf(m.index), lineText(f.rel, lineOf(m.index)), 'medium');
  }
}
for (const f of files) {
  if (/(backup|restore)/i.test(f.base) && /\.(sh|ps1|mjs|js|ts|ya?ml)$/.test(f.base) && !isSecretEnv(f.base)) addHit('OPS004', f.rel, 1, `file name suggests backup/restore: ${f.base}`, 'medium');
}

// post rules needing global state
const hasPoolerSignal = codeFacts.poolerSignals.length > 0;
for (const c of poolConstructions) {
  if (c.kind === 'postgres-js' && hasPoolerSignal && !/prepare\s*:\s*false/.test(c.masked.slice(c.off, c.off + 600))) {
    const ln = c.line;
    addHit('POOL002', c.file, ln, lineText(c.file, ln), 'medium');
  }
}
if (!codeFacts.statementTimeoutFiles.length && poolConstructions.length) {
  const c = poolConstructions[0];
  addHit('POOL003', c.file, c.line, lineText(c.file, c.line), 'medium');
} else if (!codeFacts.statementTimeoutFiles.length && configFile) addHit('POOL003', configFile.rel, 1, 'no statement_timeout / idle_in_transaction_session_timeout found anywhere', 'low');
// POOL005: more than one pool per app dir
{
  const groups = new Map();
  for (const c of poolConstructions) {
    if (/(script|seed|migrat|worker|test)/i.test(c.file)) continue;
    const m = /^((?:apps|packages)\/[^/]+)\//.exec(c.file);
    const key = m ? m[1] : '.';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line));
    if (list.length > 1) addHit('POOL005', list[1].file, list[1].line, lineText(list[1].file, list[1].line), 'low');
  }
}
// LCK005
if (lockingReadSites.length && !codeFacts.retryHandlingFiles.length) {
  const s = lockingReadSites.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : a.line - b.line))[0];
  addHit('LCK005', s.rel, s.line, lineText(s.rel, s.line), 'medium');
}

// ---------------------------------------------------------------- RLS summary + drivers
const rls = {
  anyEnableRLS: tables.some((t) => t.rls) || rlsSqlTables.size > 0,
  sqlEnabledTables: [...rlsSqlTables].sort(),
  perTable: tables.map((t) => ({ table: t.name, tenantAware: t.hasTenantColumn, rls: t.rls })),
};
drizzleInfo.drivers = [...new Set(codeFacts.drivers)].sort();
if (!drizzleInfo.drivers.length) drizzleInfo.drivers = ['unknown'];
delete codeFacts.drivers;
codeFacts.retryHandlingFiles = [...new Set(codeFacts.retryHandlingFiles)].sort();
codeFacts.statementTimeoutFiles = [...new Set(codeFacts.statementTimeoutFiles)].sort();
codeFacts.poolerSignals = codeFacts.poolerSignals.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line)).slice(0, 10);
codeFacts.pools.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line));
for (const p of codeFacts.pools) delete p._needsPrepareCheck;

// ---------------------------------------------------------------- limitations
limitations.push(
  'Regex/heuristic scan, no TypeScript compiler: columns built via helpers, spreads (...timestamps) or dynamic table factories are not resolved.',
  'Test files, fixtures (unless --include-fixtures), .claude, .agents, node_modules, dist and build are not scanned.',
  'Hit severity is not assigned by the scanner; the agent grades it by table role and expected volume.',
  'PK005 only checks explicit composite primary keys; a surrogate single-column id on a tenant table is not flagged.',
  'ORM001/ORM002/ORM006 are pattern matches and need reading the surrounding code to confirm.',
  'Infra rules (OPS001-OPS004) only see files in the repo; server configuration, autovacuum state and replication slots are not visible.',
);
if (tables.some((t) => t._spread)) limitations.push(`Tables using column spreads (column list may be incomplete): ${tables.filter((t) => t._spread).map((t) => t.name).join(', ')}`);
if (!tables.length) limitations.push('No Drizzle pgTable() definitions found; the repo may use another ORM or raw SQL. Only SQL migration rules are meaningful.');

// ---------------------------------------------------------------- output
function commitOf() {
  try {
    const head = fs.readFileSync(path.join(ROOT, '.git', 'HEAD'), 'utf8').trim();
    if (!head.startsWith('ref:')) return head.slice(0, 40);
    const ref = head.slice(5).trim();
    const p = path.join(ROOT, '.git', ref);
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8').trim();
    const packed = fs.readFileSync(path.join(ROOT, '.git', 'packed-refs'), 'utf8').split('\n').find((l) => l.endsWith(' ' + ref));
    return packed ? packed.split(' ')[0] : null;
  } catch {
    return null;
  }
}
const hitList = [...hits.values()].sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line || (a.ruleId < b.ruleId ? -1 : a.ruleId > b.ruleId ? 1 : 0)));
const byRule = {};
for (const h of hitList) byRule[h.ruleId] = (byRule[h.ruleId] || 0) + 1;

const cleanTable = (t) => ({
  name: t.name,
  schema: t.schema,
  file: t.file,
  line: t.line,
  columnCount: t.columnCount,
  primaryKey: t.primaryKey,
  columns: t.columns.map((c) => ({ name: c.name, key: c.key, type: c.type, nullable: !c.notNull && !c.primaryKey, default: c.defaultText || null, identity: c.identity, line: c.line })),
  foreignKeys: t.foreignKeys.map((f) => ({ columns: f.columns.map(t._nameOf), references: f.references, onDelete: f.onDelete, line: f.line })),
  indexes: t.indexes.map((i) => ({ name: i.name, columns: i.columns.map(t._nameOf), unique: i.unique, method: i.method, partial: i.where, include: i.include.map(t._nameOf), tenantLeads: !!i.tenantLeads, line: i.line })),
  uniqueConstraints: t.uniqueConstraints.map((u) => ({ name: u.name, columns: u.columns.map(t._nameOf), line: u.line })),
  checkConstraints: t.checkConstraints,
  jsonbColumns: t.jsonbColumns,
  timestamps: t.timestamps,
  hasTenantColumn: t.hasTenantColumn,
  tenantColumn: t.tenantColumn ? t._nameOf(t.tenantColumn) : null,
  rls: t.rls,
});

const out = {
  scannerVersion: SCANNER_VERSION,
  repo: { path: ROOT, commit: commitOf(), scannedAt: new Date().toISOString() },
  drizzle: drizzleInfo,
  tables: tables.map(cleanTable),
  enums: enums.map((e) => ({ name: e.name, values: e.values, tablesUsing: e.tablesUsing, file: e.file, line: e.line })),
  rls,
  migrations,
  codeFacts,
  hits: hitList,
  stats: { filesScanned: files.length, codeFiles: codeFiles.length, schemaFiles: schemaFiles.length, tables: tables.length, sqlMigrationFiles: migSql.length, hits: hitList.length, hitsByRule: Object.fromEntries(Object.entries(byRule).sort()) },
  limitations: [...new Set(limitations)],
};
const json = JSON.stringify(out, null, 2) + '\n';
if (opts.out) {
  const target = path.resolve(opts.out);
  if (target === ROOT || target.startsWith(ROOT + path.sep)) {
    // allow only the single report-style locations; scanner output belongs in the OS temp dir
    if (!/[\\/]\.claude[\\/]reports[\\/]/.test(target)) fail('refusing to write scanner output inside the scanned repo; use the OS temp dir');
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, json);
  console.error(`scan-repo: ${hitList.length} hits, ${tables.length} tables -> ${target}`);
} else process.stdout.write(json);
