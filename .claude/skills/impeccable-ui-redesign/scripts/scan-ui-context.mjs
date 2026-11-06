#!/usr/bin/env node
// Read-only scan that collects UI facts from the codebase into ui-context.json (fixed structure).
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const REPO = path.resolve(opt('--repo', '.'));
const OUT = path.resolve(opt('--out', path.join(REPO, 'reports', 'ui-redesign')));
const IGNORE = new Set(['node_modules', 'dist', 'build', '.next', '.git', 'coverage', 'reports', 'ui-audit', '.claude', '.agents', '.vite']);
const SRC = /\.(css|scss|less|tsx|jsx|ts|js|html|mdx?)$/;
const rel = (f) => path.relative(REPO, f).split(path.sep).join('/');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (SRC.test(e.name) || e.name === 'package.json') out.push(p);
  }
  return out;
}
const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };
const files = walk(REPO);
const isTest = (f) => /\.(test|spec)\.|\/(test|tests|__tests__|e2e)\//.test(rel(f));
const srcFiles = files.filter((f) => /\.(css|scss|less|tsx|jsx|ts|js|html)$/.test(f) && !isTest(f) && /apps\/[^/]+\/(src|index)|packages\//.test(rel(f) + '/') || /\.(css)$/.test(f));

// packages
const pkgs = files.filter((f) => path.basename(f) === 'package.json').map((f) => ({ file: rel(f), json: (() => { try { return JSON.parse(read(f)); } catch { return {}; } })() }));
const deps = {};
for (const p of pkgs) Object.assign(deps, p.json.dependencies, p.json.devDependencies);
const ver = (n) => deps[n] ?? null;
const frontend = pkgs.find((p) => (p.json.dependencies?.react || p.json.devDependencies?.react) && /frontend|web|client|app/.test(p.file)) || pkgs.find((p) => p.json.dependencies?.react);
const feDir = frontend ? path.dirname(frontend.file) : '.';
const fe = srcFiles.filter((f) => rel(f).startsWith(feDir === '.' ? '' : feDir + '/'));

const count = (m, k) => m.set(k, (m.get(k) || 0) + 1);
const top = (m, n = 40) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([value, count]) => ({ value, count }));
const colors = new Map(), fonts = new Map(), sizes = new Map(), weights = new Map(), durations = new Map(), easings = new Map(), keyframes = new Set(), mantineColors = new Map();
const slop = []; const copy = []; const cardFiles = new Map(); let pjsLoaded = [];
const themeFiles = [], cssFiles = [], tokenFiles = [], animLibs = [];
for (const f of fe) {
  const t = read(f), r = rel(f);
  if (/\.css$/.test(f)) cssFiles.push(r);
  if (/createTheme|MantineProvider|theme\s*[:=]\s*\{|colorScheme|primaryColor/.test(t) && /\.(ts|tsx|js)$/.test(f)) themeFiles.push(r);
  if (/tokens?\b/i.test(path.basename(f)) || /:root\s*\{/.test(t)) tokenFiles.push(r);
  for (const m of t.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|\b(?:rgba?|hsla?)\([^)]*\)/g)) count(colors, m[0].toLowerCase().replace(/\s+/g, ''));
  for (const m of t.matchAll(/font-family\s*:\s*([^;}\n]+)|fontFamily\s*:\s*['"`]([^'"`]+)/g)) count(fonts, (m[1] || m[2]).trim().replace(/\s+/g, ' '));
  for (const m of t.matchAll(/font-size\s*:\s*([\d.]+(?:px|rem|em))|fontSize\s*:\s*['"`]?([\d.]+(?:px|rem|em)?)/g)) count(sizes, m[1] || m[2]);
  for (const m of t.matchAll(/font-weight\s*:\s*(\d{3}|bold|normal)|fontWeight\s*:\s*['"`]?(\d{3}|bold|normal)/g)) count(weights, m[1] || m[2]);
  for (const m of t.matchAll(/(?:transition|animation)(?:-duration)?\s*:\s*([^;}\n]+)/g)) {
    for (const d of m[1].matchAll(/(?<![\w.-])([\d.]+m?s)\b/g)) count(durations, d[1]);
    for (const e of m[1].matchAll(/ease(?:-in|-out|-in-out)?|linear|cubic-bezier\([^)]*\)/g)) count(easings, e[0]);
  }
  for (const m of t.matchAll(/@keyframes\s+([\w-]+)/g)) keyframes.add(m[1]);
  for (const m of t.matchAll(/\bcolor\s*=\s*["'](\w+(?:\.\d)?)["']|\bc\s*=\s*["'](\w+(?:\.\d)?)["']|variant\s*=\s*["'](\w+)["']/g)) count(mantineColors, m[1] || m[2] || m[3]);
  if (/plus[- ]jakarta/i.test(t)) pjsLoaded.push(r);
  for (const lib of ['framer-motion', 'motion', 'react-spring', '@react-spring/web', 'gsap', 'lottie-react', 'animate.css', 'react-transition-group']) if (new RegExp(`from ['"]${lib}['"]`).test(t) && !animLibs.includes(lib)) animLibs.push(lib);
  // slop signals
  const sl = (rule, re) => { const m = t.match(re); if (m) slop.push({ rule, file: r, line: t.slice(0, m.index).split('\n').length, snippet: m[0].slice(0, 100) }); };
  sl('gradient-purple-blue', /linear-gradient\([^)]*(?:#(?:7c3aed|8b5cf6|6366f1|a855f7|667eea|764ba2)|purple|violet|indigo)[^)]*\)/i);
  sl('gradient-text', /background-clip\s*:\s*text|-webkit-background-clip\s*:\s*text|variant\s*=\s*["']gradient["']/);
  sl('glassmorphism', /backdrop-filter\s*:\s*blur|backdropFilter/);
  sl('cyan-on-dark', /#(?:06b6d4|22d3ee|00e5ff|0ff)\b/i);
  sl('infinite-animation', /animation[^;{]*infinite/);
  sl('bounce-animation', /bounce|wiggle|jello/i);
  if (/\.(tsx|jsx)$/.test(f) && !isTest(f)) {
    const grids = (t.match(/<(?:SimpleGrid|Grid)\b/g) || []).length, cards = (t.match(/<Card\b|<Paper\b/g) || []).length;
    if (grids && cards >= 3) cardFiles.set(r, cards);
    for (const m of t.matchAll(/>\s*([A-Z][A-Za-z ,.'&/-]{8,80})\s*</g)) if (copy.length < 60) copy.push(m[1].trim());
  }
}
const html = files.filter((f) => /index\.html$/.test(f) && rel(f).startsWith(feDir === '.' ? '' : feDir + '/'));
for (const f of html) if (/jakarta/i.test(read(f))) pjsLoaded.push(rel(f));
const jakartaDeps = Object.keys(deps).filter((d) => /jakarta/i.test(d));

// routes
const routes = new Set();
for (const f of fe) { const t = read(f); if (!/createBrowserRouter|<Route\b|Routes|path\s*:/.test(t)) continue; for (const m of t.matchAll(/path\s*[:=]\s*['"{`]+([^'"`}]+)['"`}]/g)) routes.add(m[1]); }
const routeList = [...routes].filter((r) => r !== '*').sort();

// context hints
const readme = read(path.join(REPO, 'README.md'));
const headings = [...readme.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1].trim()).slice(0, 25);
const root = pkgs.find((p) => p.file === 'package.json');
const docs = ['README.md', 'AGENTS.md', 'PRODUCT.md', 'DESIGN.md', 'docs/architecture.md'].filter((d) => fs.existsSync(path.join(REPO, d)));

const out = {
  meta: { repo: REPO.split(path.sep).join('/'), date: new Date().toISOString(), filesScanned: fe.length },
  frontend: { dir: feDir, package: frontend?.json.name ?? null },
  stack: { react: ver('react'), mantine: ver('@mantine/core'), router: ver('react-router-dom'), vite: ver('vite'), tailwind: ver('tailwindcss'), cssModules: fe.some((f) => /\.module\.css$/.test(f)), animationLibraries: animLibs },
  themeFiles: [...new Set(themeFiles)], cssFiles, tokenFiles: [...new Set(tokenFiles)],
  colors: { distinct: colors.size, top: top(colors), mantineColorNames: top(mantineColors, 15) },
  typography: { families: top(fonts, 15), sizes: top(sizes, 30), weights: top(weights, 10), plusJakartaSans: { loaded: pjsLoaded.length > 0 || jakartaDeps.length > 0, files: [...new Set(pjsLoaded)], packages: jakartaDeps } },
  motion: { durations: top(durations, 20), easings: top(easings, 10), keyframes: [...keyframes], libraries: animLibs, motionCssFiles: cssFiles.filter((c) => /motion|animation|transition/i.test(c)) },
  slopSignals: slop,
  repeatedCardGrids: [...cardFiles].map(([file, cards]) => ({ file, cards })),
  routes: routeList,
  contextHints: { packageName: root?.json.name ?? null, packageDescription: root?.json.description ?? null, readmeHeadings: headings, docs, sampleUiCopy: [...new Set(copy)].slice(0, 40) },
};
const stamp = new Date().toISOString().slice(0, 16).replace('T', '-').replace(':', '');
const dir = argv.includes('--out') ? OUT : path.join(OUT, stamp);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'ui-context.json'), JSON.stringify(out, null, 2));
console.log(`scan-ui-context: ${fe.length} frontend files, ${out.colors.distinct} colors, ${slop.length} slop signals, ${routeList.length} routes -> ${path.join(dir, 'ui-context.json')}`);
