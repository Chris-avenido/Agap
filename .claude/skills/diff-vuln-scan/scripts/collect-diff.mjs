#!/usr/bin/env node
// collect-diff.mjs - turn a git target into a compact JSON manifest. Zero dependencies, Node 18+.
// Usage: node collect-diff.mjs [--target <sha|A..B|staged|working>] [--repo <path>] [--out <path>]
//                              [--context 3] [--max-added-lines 800]
// Exit: 0 ok, 2 bad ref / not a git repo / bad args, 4 invalid risk pattern.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
const TARGET_RE = /^[A-Za-z0-9._\-\/\^~@{}]+(\.\.[A-Za-z0-9._\-\/\^~@{}]+)?$/;

function die(code, msg) { console.error(`collect-diff: ${msg}`); process.exit(code); }

const argv = process.argv.slice(2);
const opt = { target: 'HEAD', repo: process.cwd(), out: null, context: 3, maxAdded: 800 };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i], v = argv[i + 1];
  if (a === '--target') { opt.target = v; i++; }
  else if (a === '--repo') { opt.repo = path.resolve(v); i++; }
  else if (a === '--out') { opt.out = path.resolve(v); i++; }
  else if (a === '--context') { opt.context = Number(v); i++; }
  else if (a === '--max-added-lines') { opt.maxAdded = Number(v); i++; }
  else die(2, `unknown argument ${a}`);
}
if (!Number.isInteger(opt.context) || opt.context < 0 || !Number.isInteger(opt.maxAdded) || opt.maxAdded < 1) die(2, 'bad numeric argument');
if (!opt.target || !(opt.target === 'staged' || opt.target === 'working' || TARGET_RE.test(opt.target))) die(2, `invalid target "${opt.target}"`);

function git(args, cwd, allowFail = false) {
  try {
    return execFileSync('git', ['-c', 'core.quotepath=false', ...args], { cwd, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    if (allowFail) return null;
    die(2, `git ${args.join(' ')} failed: ${String(e.stderr || e.message).trim().split('\n')[0]}`);
  }
}

// ---- repo + target resolution
let root;
try { root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: opt.repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
catch { die(2, `not inside a git repository: ${opt.repo}`); }
root = path.resolve(root);
const repoName = path.basename(root);
const G = (args, allowFail) => git(args, root, allowFail);

const statusHash = (() => createHash('sha256').update(G(['status', '--porcelain'])).digest('hex'))();

const rev = (r) => (G(['rev-parse', '--verify', '--quiet', `${r}^{commit}`], true) || '').trim();
let kind, base, head, diffArgs, scanRef, scanRefKind, commitCount;
if (opt.target === 'staged' || opt.target === 'working') {
  head = rev('HEAD');
  if (!head) die(2, 'repository has no commits yet');
  kind = opt.target; base = head;
  diffArgs = opt.target === 'staged' ? ['--cached'] : ['HEAD'];
  scanRef = opt.target === 'staged' ? '' : head; // staged: read from index; working: read from disk
  scanRefKind = opt.target === 'staged' ? 'index' : 'worktree';
  commitCount = 0;
} else if (opt.target.includes('..')) {
  const [a, b] = opt.target.split('..');
  base = rev(a); head = rev(b || 'HEAD');
  if (!base) die(2, `unknown ref "${a}"`);
  if (!head) die(2, `unknown ref "${b}"`);
  kind = 'range'; diffArgs = [`${base}..${head}`]; scanRef = head; scanRefKind = 'commit';
  commitCount = Number(G(['rev-list', '--count', `${base}..${head}`]).trim());
} else {
  head = rev(opt.target);
  if (!head) die(2, `unknown ref "${opt.target}"`);
  const parent = rev(`${head}^`);
  base = parent || EMPTY_TREE;
  kind = 'commit'; diffArgs = [base, head]; scanRef = head; scanRefKind = 'commit'; commitCount = 1;
}
const shortSha = head.slice(0, 7) + (kind === 'staged' ? '-staged' : kind === 'working' ? '-working' : '');

const meta = (G(['log', '-1', '--format=%H%x1f%s%x1f%aI', head]) || '').trim().split('\x1f');
const commit = { sha: meta[0], subject: meta[1] || '', authorDate: meta[2] || '' };

// ---- output path (never inside the worktree)
const outPath = opt.out || path.join(os.tmpdir(), 'diff-vuln-scan', `${repoName}-${shortSha}.json`);
{
  const realRoot = fs.realpathSync(root);
  let probe = path.dirname(outPath);
  while (!fs.existsSync(probe)) probe = path.dirname(probe);
  const target = path.join(fs.realpathSync(probe), path.relative(probe, path.dirname(outPath)), path.basename(outPath));
  const rel = path.relative(realRoot, target);
  if (rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))) die(2, `--out must be outside the repo worktree: ${outPath}`);
}

// ---- optional repo config
const configPath = path.join(root, '.diff-vuln-scan.json');
let config = {};
if (fs.existsSync(configPath)) {
  try { config = JSON.parse(fs.readFileSync(configPath, 'utf8')); } catch (e) { die(2, `.diff-vuln-scan.json is not valid JSON: ${e.message}`); }
}

// ---- helpers
const globToRe = (g) => {
  const hasSlash = g.includes('/');
  let s = '';
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === '*') { if (g[i + 1] === '*') { s += '.*'; i++; if (g[i + 1] === '/') i++; } else s += '[^/]*'; }
    else if (c === '?') s += '[^/]';
    else s += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(hasSlash ? `^${s}$` : `(^|/)${s}$`);
};
const cfgLayers = Object.entries(config.layers || {}).map(([g, l]) => [g, globToRe(g), l]);
const ignoreRes = (config.ignorePaths || []).map(globToRe);

const LANG = { js: 'js', jsx: 'js', mjs: 'js', cjs: 'js', ts: 'ts', tsx: 'ts', mts: 'ts', cts: 'ts', py: 'py', go: 'go', java: 'java', kt: 'java', kts: 'java', php: 'php', rb: 'rb', cs: 'cs', sql: 'sql', sh: 'sh', bash: 'sh', zsh: 'sh', ps1: 'sh', json: 'json', yml: 'yaml', yaml: 'yaml', md: 'md', html: 'html', vue: 'js', svelte: 'js', css: 'css', tf: 'tf', toml: 'toml', txt: 'txt', env: 'env' };
const langOf = (p) => {
  const b = path.posix.basename(p).toLowerCase();
  if (b.startsWith('.env')) return 'env';
  if (/^dockerfile/.test(b)) return 'docker';
  return LANG[b.split('.').pop()] || 'other';
};

const SEG = [
  ['shared', ['shared', 'common', 'lib', 'packages']],
  ['backend', ['backend', 'server', 'api', 'services', 'routes', 'controllers', 'handlers']],
  ['frontend', ['frontend', 'client', 'web', 'ui', 'components', 'pages', 'views', 'app']],
  ['db', ['db', 'database', 'migrations', 'drizzle', 'prisma', 'alembic', 'schema']],
];
const MANIFESTS = /(^|\/)(package\.json|pyproject\.toml|requirements[^/]*\.txt|go\.mod|pom\.xml|composer\.json|Gemfile|[^/]+\.csproj|build\.gradle(\.kts)?)$/;
function classify(p) {
  for (const [g, re, l] of cfgLayers) if (re.test(p)) return [l, `config:${g}`];
  const segs = p.split('/');
  const base = segs[segs.length - 1];
  if (/\.(test|spec)\.[^/]+$/.test(base) || segs.some((s) => ['test', 'tests', '__tests__', 'e2e'].includes(s))) return ['tests', 'tests: *.test.*|*.spec.*|test dirs'];
  if (/\.md$/i.test(base) || segs.includes('docs')) return ['docs', 'docs: *.md|docs/'];
  if (/^\.env/.test(base) || /\.(ya?ml|tf)$/.test(base) || /^(dockerfile|nginx)/i.test(base) || MANIFESTS.test(p) || segs[0] === '.github' || segs[0] === '.gitlab' || segs[0] === '.circleci' || segs.includes('.husky')) return ['infra', 'infra: env|yaml|Dockerfile|nginx|tf|CI|manifest'];
  if (/\.sql$/.test(base)) return ['db', 'db: *.sql'];
  // earliest path segment that names a layer wins, so apps/frontend/src/lib stays frontend
  for (let i = 0; i < segs.length - 1; i++) {
    for (const [layer, names] of SEG) if (names.includes(segs[i].toLowerCase())) return [layer, `segment:${segs[i]}`];
  }
  return ['other', 'no rule matched'];
}

const SECRET_RE = /((?:KEY|TOKEN|SECRET|PASSWORD|PASSWD|PRIVATE)\w*\s*[:=]\s*)(['"]?)[^'"\s,;]+/gi;
const mask = (s) => s.replace(SECRET_RE, '$1$2***');

// ---- risk patterns (fail loudly on a bad regex)
function loadPatterns() {
  const file = path.join(HERE, '..', 'reference', 'risk-patterns.json');
  let list;
  try { list = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { die(4, `cannot read risk-patterns.json: ${e.message}`); }
  list = list.concat(Array.isArray(config.extraPatterns) ? config.extraPatterns : []);
  return list.map((p) => {
    try {
      return { ...p, re: new RegExp(p.regex, p.flags || ''), pathRe: p.pathRegex ? new RegExp(p.pathRegex) : null };
    } catch (e) { die(4, `risk pattern "${p.id}" does not compile: ${e.message}`); }
  });
}
const patterns = loadPatterns();

// ---- collect
const nameStatus = new Map();
for (const line of G(['diff', '--name-status', '-M', ...diffArgs]).split('\n')) {
  if (!line) continue;
  const parts = line.split('\t');
  nameStatus.set(parts[parts.length - 1], { status: parts[0][0], oldPath: parts[0][0] === 'R' ? parts[1] : null });
}
const numstat = new Map();
for (const line of G(['diff', '--numstat', '-M', ...diffArgs]).split('\n')) {
  if (!line) continue;
  const [a, d, ...rest] = line.split('\t');
  let p = rest.join('\t');
  const m = p.match(/^(.*)\{.* => (.*)\}(.*)$/); // rename shorthand a/{b => c}/d
  if (m) p = (m[1] + m[2] + m[3]).replace(/\/\//g, '/');
  else if (p.includes(' => ')) p = p.split(' => ')[1];
  numstat.set(p, { binary: a === '-', added: a === '-' ? 0 : +a, removed: d === '-' ? 0 : +d });
}

const SKIP_DIR = new Set(['node_modules', 'dist', 'build', 'vendor', '.next', '__pycache__']);
const LOCK = /(^|\/)(package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|poetry\.lock|Pipfile\.lock|Cargo\.lock|composer\.lock|Gemfile\.lock|go\.sum|uv\.lock)$/;
const skipped = [];
const skipReason = (p, binary) => {
  if (binary) return 'binary';
  if (LOCK.test(p)) return 'lockfile';
  const d = p.split('/').find((s) => SKIP_DIR.has(s));
  if (d) return `vendored/generated (${d})`;
  if (ignoreRes.some((re) => re.test(p))) return 'ignorePaths (.diff-vuln-scan.json)';
  return null;
};

const files = [];
const diffText = G(['diff', `-U${opt.context}`, '--no-color', '--no-ext-diff', '-M', ...diffArgs]);
let cur = null, oldLn = 0, newLn = 0;
const flush = () => { if (cur) { finalize(cur); cur = null; } };
function finalize(f) {
  const ns = nameStatus.get(f.path) || {};
  const num = numstat.get(f.path) || {};
  const reason = skipReason(f.path, num.binary || f.binary);
  if (reason) { skipped.push({ path: f.path, reason }); return; }
  const [layer, rule] = classify(f.path);
  files.push({
    path: f.path, oldPath: f.oldPath !== f.path ? f.oldPath : (ns.oldPath || null),
    status: ns.status || f.status || 'M', language: langOf(f.path), layer, layerRule: rule,
    addedCount: num.added ?? f.added.length, removedCount: num.removed ?? f.removed.length,
    truncated: f.added.length > opt.maxAdded,
    added: f.added.slice(0, opt.maxAdded), removed: f.removed.slice(0, opt.maxAdded),
  });
}
for (const raw of diffText.split('\n')) {
  if (raw.startsWith('diff --git ')) {
    flush();
    const m = raw.match(/^diff --git a\/(.*) b\/(.*)$/);
    cur = { path: m ? m[2] : '', oldPath: m ? m[1] : '', status: null, binary: false, added: [], removed: [], inHunk: false };
    oldLn = newLn = 0;
    continue;
  }
  if (!cur) continue;
  if (!cur.inHunk) {
    if (raw.startsWith('new file mode')) cur.status = 'A';
    else if (raw.startsWith('deleted file mode')) cur.status = 'D';
    else if (raw.startsWith('rename to ')) cur.path = raw.slice(10);
    else if (raw.startsWith('rename from ')) cur.oldPath = raw.slice(12);
    else if (raw.startsWith('Binary files')) cur.binary = true;
    else if (raw.startsWith('+++ ') && raw !== '+++ /dev/null') cur.path = raw.slice(4).replace(/^b\//, '').replace(/\t.*$/, '');
    else if (raw.startsWith('--- ') && raw === '--- /dev/null') cur.status = 'A';
  }
  const h = raw.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
  if (h) { cur.inHunk = true; oldLn = +h[1]; newLn = +h[2]; continue; }
  if (!cur.inHunk) continue;
  if (raw.startsWith('+')) { cur.added.push({ line: newLn++, text: mask(raw.slice(1)).slice(0, 400) }); }
  else if (raw.startsWith('-')) { cur.removed.push({ line: oldLn++, text: mask(raw.slice(1)).slice(0, 400) }); }
  else if (raw.startsWith(' ')) { oldLn++; newLn++; }
}
flush();

// ---- risk hits (added lines only)
const riskHits = [];
for (const f of files) {
  if (f.status === 'D') continue;
  for (const p of patterns) {
    if (p.languages && !p.languages.includes('any') && !p.languages.includes(f.language)) continue;
    if (p.appliesTo && !p.appliesTo.includes('any') && !p.appliesTo.includes(f.layer)) continue;
    if (p.pathRe && !p.pathRe.test(f.path)) continue;
    for (const l of f.added) {
      if (p.re.test(l.text)) riskHits.push({ patternId: p.id, layer: f.layer, file: f.path, line: l.line, snippet: l.text.trim().slice(0, 160), cweHint: p.cweHint, severityHint: p.severityHint });
    }
  }
}

// ---- repo profile
function repoProfile() {
  const tracked = (G(['ls-files'], true) || '').split('\n').filter(Boolean);
  const langs = {};
  for (const p of tracked) { if (skipReason(p, false)) continue; const l = langOf(p); if (l !== 'other') langs[l] = (langs[l] || 0) + 1; }
  const has = (re) => tracked.filter((p) => re.test(p));
  const pmMap = [[/(^|\/)package-lock\.json$/, 'npm'], [/(^|\/)yarn\.lock$/, 'yarn'], [/(^|\/)pnpm-lock\.yaml$/, 'pnpm'], [/(^|\/)bun\.lockb?$/, 'bun'], [/(^|\/)poetry\.lock$/, 'poetry'], [/(^|\/)uv\.lock$/, 'uv'], [/(^|\/)Pipfile\.lock$/, 'pipenv'], [/(^|\/)requirements[^/]*\.txt$/, 'pip'], [/(^|\/)go\.mod$/, 'go modules'], [/(^|\/)Cargo\.lock$/, 'cargo'], [/(^|\/)composer\.lock$/, 'composer'], [/(^|\/)Gemfile\.lock$/, 'bundler'], [/(^|\/)pom\.xml$/, 'maven'], [/(^|\/)build\.gradle(\.kts)?$/, 'gradle']];
  const packageManagers = [...new Set(pmMap.filter(([re]) => has(re).length).map(([, n]) => n))];
  const manifests = has(MANIFESTS).slice(0, 15);
  const testHints = new Set();
  for (const m of manifests.filter((p) => p.endsWith('package.json')).slice(0, 8)) {
    try {
      const pj = JSON.parse(fs.readFileSync(path.join(root, m), 'utf8'));
      for (const [k, v] of Object.entries(pj.scripts || {})) if (/^(test|lint|typecheck|check)/.test(k)) testHints.add(`${m}: scripts.${k} = ${String(v).slice(0, 80)}`);
      for (const d of ['vitest', 'jest', 'mocha', 'playwright', '@playwright/test', 'tsx', 'ts-node']) if ({ ...pj.dependencies, ...pj.devDependencies }[d]) testHints.add(`${m}: dep ${d}`);
    } catch { /* ignore unreadable manifest */ }
  }
  for (const re of [/(^|\/)(vitest|jest)\.config\.[cm]?[jt]s$/, /(^|\/)pytest\.ini$/, /(^|\/)tox\.ini$/, /(^|\/)conftest\.py$/, /(^|\/)playwright\.config\.[jt]s$/, /(^|\/)phpunit\.xml(\.dist)?$/, /(^|\/)\.rspec$/]) for (const p of has(re).slice(0, 3)) testHints.add(`config: ${p}`);
  return { languagesByFileCount: Object.fromEntries(Object.entries(langs).sort((a, b) => b[1] - a[1])), packageManagers, manifests, testRunnerHints: [...testHints], configFile: fs.existsSync(configPath) ? '.diff-vuln-scan.json' : null };
}

const manifest = {
  schemaVersion: 1,
  repo: { name: repoName, root },
  target: { input: opt.target, kind, base, head, shortSha, scanRef, scanRefKind },
  commit, commitCount,
  baselineStatusHash: statusHash,
  repoProfile: repoProfile(),
  files, skipped, riskHits,
};
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 1));

// ---- summary
const count = (arr, k) => arr.reduce((m, x) => ((m[x[k]] = (m[x[k]] || 0) + 1), m), {});
const fmt = (o) => Object.entries(o).map(([k, v]) => `${k}=${v}`).join(' ') || '-';
console.log(`repo:     ${repoName}`);
console.log(`target:   ${opt.target} (${kind}) ${commit.subject ? '- ' + commit.subject : ''}`);
console.log(`commits:  ${commitCount}   files: ${files.length}   skipped: ${skipped.length}   riskHits: ${riskHits.length}`);
console.log(`layers:   ${fmt(count(files, 'layer'))}`);
console.log(`langs:    ${fmt(count(files, 'language'))}`);
console.log('top risk hits:');
const sev = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3, INFO: 4 };
const lp = { backend: 0, shared: 0, db: 0, frontend: 1, infra: 2, other: 3, tests: 4, docs: 5 };
for (const h of [...riskHits].sort((a, b) => (lp[a.layer] ?? 3) - (lp[b.layer] ?? 3) || (sev[a.severityHint] ?? 9) - (sev[b.severityHint] ?? 9)).slice(0, 10)) console.log(`  [${h.severityHint}] ${h.patternId} ${h.file}:${h.line}  ${h.snippet.slice(0, 80)}`);
console.log(`manifest: ${outPath}`);
