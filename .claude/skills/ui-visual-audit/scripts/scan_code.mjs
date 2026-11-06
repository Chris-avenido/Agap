#!/usr/bin/env node
// Static scan of source files for visual-design issues. No browser.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(here, '../reference/thresholds.json'), 'utf8'));
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outFile = outIdx >= 0 ? args[outIdx + 1] : 'ui-audit/code-scan.json';
const root = path.resolve(args.find((a, i) => !a.startsWith('--') && i !== outIdx + 1) || '.');

const IGNORE = new Set(['node_modules', 'dist', 'build', '.next', '.git', 'coverage', 'ui-audit', '.claude', '.agents']);
const EXT = /\.(css|scss|sass|less|html|vue|svelte|jsx|tsx|js|ts)$/;
const SKIP = /(\.min\.|package-lock\.json|pnpm-lock|yarn\.lock|\.d\.ts$|\.test\.|\.spec\.)/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if ((EXT.test(e.name) || /^tailwind\.config\./.test(e.name)) && !SKIP.test(e.name)) out.push(p);
  }
  return out;
}

const findings = [];
const rel = (f) => path.relative(root, f).split(path.sep).join('/');
const snip = (s) => s.trim().slice(0, 120);

const files = walk(root);
const colors = new Map();
const fontSizes = new Map(), families = new Map(), weights = new Map(), radii = new Map(), shadows = new Map();
const offSpacing = [], arbitrary = [], smallFonts = [], pxBody = [], noFallback = [], focusKill = [], badDur = [], transAll = [], userScale = [];
let colorDecls = 0, tokenColorDecls = 0, tokensDetected = false;
let hasReduced = false, hasScheme = false, hasViewport = false, hasHtml = false, hasFocusVisible = false;
const SCALE = new Set(T.spacingScalePx);
const isTokenFile = (f, line, inRoot) => /(tokens?|theme|variables)\b/i.test(f) || /tailwind\.config/.test(f) || inRoot || /^\s*--[\w-]+\s*:/.test(line);

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.length > 600000) continue;
  const r = rel(file);
  const lines = text.split('\n');
  if (/prefers-reduced-motion/.test(text)) hasReduced = true;
  if (/prefers-color-scheme\s*:\s*dark|data-theme|\.dark\b|darkMode/.test(text)) hasScheme = true;
  if (/:focus-visible/.test(text)) hasFocusVisible = true;
  if (/^\s*:root|--[\w-]+\s*:|theme\s*:\s*\{|extend\s*:/m.test(text)) tokensDetected = true;
  if (/\.html$/.test(file)) {
    hasHtml = true;
    const m = text.match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
    if (m) {
      hasViewport = true;
      if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(m[0]))
        userScale.push({ file: r, line: lines.findIndex((l) => l.includes('viewport')) + 1, snippet: snip(m[0]) });
    }
  }
  let inRoot = false;
  lines.forEach((line, i) => {
    const ln = i + 1, loc = { file: r, line: ln, snippet: snip(line) };
    if (/^\s*(:root|\[data-theme|html\.dark|\.dark\b|@theme)/.test(line)) inRoot = true;
    if (inRoot && /^\s*}/.test(line)) inRoot = false;
    const tokenDef = isTokenFile(r, line, inRoot);
    for (const m of line.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgba?|hsla?)\([^)]*\)/g)) {
      if (!tokenDef) { const k = m[0].toLowerCase().replace(/\s+/g, ''); if (!colors.has(k)) colors.set(k, loc); }
    }
    if (/(^|[\s{;"'`])(color|background(-color)?|border(-\w+)?-color|fill|stroke)\s*:/.test(line)) {
      colorDecls++;
      if (/var\(--/.test(line)) tokenColorDecls++;
    }
    for (const m of line.matchAll(/\b(?:text|p[xytblr]?|m[xytblr]?|gap|space-[xy]|w|h|rounded|bg|border)-\[[^\]]+\]/g)) {
      if (/\[(var\(|theme\()/.test(m[0])) continue;
      arbitrary.push({ ...loc, snippet: m[0] });
    }
    const fsz = line.match(/font-size\s*:\s*([\d.]+)(px|rem|em)/);
    if (fsz) {
      const px = fsz[2] === 'px' ? +fsz[1] : +fsz[1] * 16;
      fontSizes.set(fsz[1] + fsz[2], loc);
      if (px < T.minAnyFontPx) smallFonts.push(loc);
      if (fsz[2] === 'px' && /\b(body|html)\b/.test(lines.slice(Math.max(0, i - 4), i + 1).join(' '))) pxBody.push(loc);
    }
    const ff = line.match(/font-family\s*:\s*([^;}]+)/);
    if (ff && !/var\(/.test(ff[1])) {
      const v = ff[1].trim().replace(/\s+/g, ' ');
      families.set(v, loc);
      if (!/(sans-serif|serif|monospace|system-ui|cursive|fantasy|ui-)/.test(v)) noFallback.push(loc);
    }
    const fw = line.match(/font-weight\s*:\s*(\d{3}|bold|normal)/);
    if (fw) weights.set(fw[1] === 'bold' ? '700' : fw[1] === 'normal' ? '400' : fw[1], loc);
    const sp = line.match(/(?:^|[\s{;])(margin|padding|gap|top|left|right|bottom)(?:-[\w-]+)?\s*:\s*([^;}]+)/);
    if (sp && !/var\(/.test(sp[2])) {
      for (const v of sp[2].matchAll(/(-?[\d.]+)px\b/g)) {
        const n = Math.abs(+v[1]);
        if (!SCALE.has(n) && n % T.spacingBasePx !== 0) offSpacing.push({ ...loc, snippet: `${v[0]} in: ${loc.snippet}` });
      }
    }
    const br = line.match(/border-radius\s*:\s*([^;}]+)/);
    if (br && !/var\(/.test(br[1])) radii.set(br[1].trim(), loc);
    const bs = line.match(/box-shadow\s*:\s*([^;}]+)/);
    if (bs && !/var\(|none/.test(bs[1])) shadows.set(bs[1].trim().replace(/\s+/g, ' '), loc);
    if (/outline\s*:\s*(none|0)\b/.test(line)) focusKill.push(loc);
    const tr = line.match(/(?:transition|animation)(?:-duration)?\s*:\s*([^;}]+)/);
    if (tr) {
      if (/\ball\b/.test(tr[1]) && /transition/.test(line)) transAll.push(loc);
      for (const d of tr[1].matchAll(/(?<![\w.-])([\d.]+)(ms|s)\b/g)) {
        const ms = d[2] === 's' ? +d[1] * 1000 : +d[1];
        if (ms > 0 && (ms < T.transitionMsRange[0] || ms > T.transitionMsRange[1])) { badDur.push(loc); break; }
      }
    }
  });
}

function F(id, category, severity, title, rule, items, expected, fix, measured) {
  const first = items && items[0];
  findings.push({
    id, category, severity, title, rule,
    location: first ? `${first.file}:${first.line}` : null,
    evidence: measured ?? (first ? `${first.file}:${first.line} \`${first.snippet}\`` : 'none found'),
    expected, fix, count: items ? items.length : 0,
    occurrences: (items || []).slice(0, 15),
    source: 'code',
  });
}
const sev = (bad) => (bad ? 'warn' : 'pass');
const withFirst = (items, msg) => (items.length ? `${msg}; first at ${items[0].file}:${items[0].line} \`${items[0].snippet}\`` : undefined);

F('code.colors.hardcoded', 'Tokens and consistency', sev(colors.size > T.maxDistinctColorsHardcoded), 'Hardcoded colors outside token files', 'hardcoded-colors',
  [...colors.values()], `<= ${T.maxDistinctColorsHardcoded} distinct hardcoded colors`,
  'Move repeated literals into CSS custom properties (or the Tailwind theme) and reference them.', `${colors.size} distinct hardcoded colors outside token files`);
F('code.type.sizes', 'Typography', sev(fontSizes.size > 8), 'Too many distinct font-size values', 'font-size-scale',
  [...fontSizes.values()], 'About 8 steps or fewer: 12/14/16/20/24/32/40', 'Collapse font sizes onto the type scale in reference/visual-standards.md.', `${fontSizes.size} distinct font-size values: ${[...fontSizes.keys()].join(', ')}`);
F('code.type.tiny', 'Typography', smallFonts.length ? 'fail' : 'pass', `font-size below ${T.minAnyFontPx}px`, 'font-size-min', smallFonts,
  `No font-size below ${T.minAnyFontPx}px`, `Raise to at least ${T.minAnyFontPx}px (caption) and 16px (body).`, withFirst(smallFonts, `${smallFonts.length} declarations`));
F('code.type.px-body', 'Typography', sev(pxBody.length), 'Body font size set in px', 'font-size-rem', pxBody, 'rem units so user font preferences are honored', 'Use rem (1rem = 16px) for body and the type scale.');
F('code.type.families', 'Typography', sev(families.size > T.maxFontFamilies), 'Too many font-family stacks', 'font-family-count', [...families.values()],
  `<= ${T.maxFontFamilies} families`, 'Keep one primary family and at most one display family.', `${families.size} distinct stacks`);
F('code.type.fallback', 'Typography', sev(noFallback.length), 'font-family without generic fallback', 'font-fallback', noFallback,
  'Stack ends with sans-serif/system-ui', 'Append: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif');
F('code.type.weights', 'Typography', sev(weights.size > T.maxFontWeights), 'Too many font-weight values', 'font-weight-count', [...weights.values()],
  `<= ${T.maxFontWeights} weights (400, 500, 600/700)`, 'Restrict to 400, 500 and one of 600/700.', `${weights.size} weights: ${[...weights.keys()].join(', ')}`);
F('code.spacing.off-scale', 'Spacing and layout', sev(offSpacing.length), 'Spacing values off the 4px scale', 'spacing-4px', offSpacing,
  `Multiples of ${T.spacingBasePx}px (${T.spacingScalePx.join(', ')})`, 'Round to the nearest scale step (e.g. 13px -> 12px or 16px).', withFirst(offSpacing, `${offSpacing.length} off-scale values`));
F('code.tailwind.arbitrary', 'Tokens and consistency', sev(arbitrary.length), 'Tailwind arbitrary values', 'tailwind-arbitrary', arbitrary,
  'Theme-scale utilities only', 'Replace with the nearest theme utility or extend the theme.', `${arbitrary.length} arbitrary-value classes`);
F('code.shape.radii', 'Shape and elevation', sev(radii.size > T.maxDistinctRadii), 'Too many border-radius values', 'radius-count', [...radii.values()],
  `<= ${T.maxDistinctRadii} distinct radii`, 'Use 4 / 8 / 16 / full.', `${radii.size} distinct radii: ${[...radii.keys()].join(' | ')}`);
F('code.shape.shadows', 'Shape and elevation', sev(shadows.size > T.maxDistinctShadows), 'Too many box-shadow values', 'shadow-count', [...shadows.values()],
  `<= ${T.maxDistinctShadows} distinct shadows`, 'Define 3 elevation tokens.', `${shadows.size} distinct shadows`);
F('code.focus.outline-none', 'Components and states', focusKill.length && !hasFocusVisible ? 'fail' : focusKill.length ? 'warn' : 'pass', 'outline removed without :focus-visible replacement',
  'focus-outline', focusKill, 'Visible 2px focus ring, 3:1 contrast', 'Replace with :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px }.', withFirst(focusKill, `${focusKill.length} outline removals, :focus-visible ${hasFocusVisible ? 'present' : 'absent'}`));
F('code.motion.reduced', 'Motion', sev(!hasReduced), 'No prefers-reduced-motion handling', 'reduced-motion', [], 'A prefers-reduced-motion media query', 'Add @media (prefers-reduced-motion: reduce) disabling non-essential animation.', hasReduced ? 'present' : 'absent in all scanned files');
F('code.motion.duration', 'Motion', sev(badDur.length), `Durations outside ${T.transitionMsRange.join('-')}ms`, 'motion-duration', badDur, `${T.transitionMsRange[0]}-${T.transitionMsRange[1]}ms`, 'Use 100-150ms for small changes, 200-300ms for transitions.');
F('code.motion.transition-all', 'Motion', sev(transAll.length), 'transition: all', 'transition-all', transAll, 'Transition only opacity/transform/color', 'List the specific properties.');
F('code.dark.scheme', 'Dark mode', sev(!hasScheme), 'No dark theme tokens found', 'dark-mode', [], 'prefers-color-scheme: dark or data-theme token set', 'Add a separate dark semantic token set.', hasScheme ? 'present' : 'absent in all scanned files');
if (hasHtml) {
  F('code.layout.viewport-meta', 'Spacing and layout', sev(!hasViewport), 'Missing viewport meta', 'viewport-meta', [], '<meta name="viewport" content="width=device-width, initial-scale=1">', 'Add the viewport meta tag.', hasViewport ? 'present' : 'absent');
  F('code.a11y.user-scalable', 'Accessibility (axe)', userScale.length ? 'fail' : 'pass', 'Viewport blocks zoom', 'viewport-zoom', userScale, 'No user-scalable=no / maximum-scale=1', 'Remove user-scalable=no and maximum-scale.');
}
const share = colorDecls ? Math.round((tokenColorDecls / colorDecls) * 100) : null;
F('code.tokens.layer', 'Tokens and consistency', sev(!tokensDetected), 'No token layer detected', 'token-layer', [], 'CSS custom properties, Tailwind theme or tokens JSON', 'Introduce primitive + semantic tokens.', tokensDetected ? 'token layer detected' : 'none');
F('code.tokens.share', 'Tokens and consistency', share === null ? 'pass' : sev(share < 50), 'Low share of color declarations using tokens', 'token-share', [], '>= 50% of color declarations use var(--...)', 'Replace literal colors in components with semantic tokens.', share === null ? 'no color declarations' : `${share}% (${tokenColorDecls}/${colorDecls})`);

const out = {
  meta: { root: root.split(path.sep).join('/'), date: new Date().toISOString(), filesScanned: files.length },
  summary: {
    tokens_detected: tokensDetected, token_color_share_pct: share, distinct_hardcoded_colors: colors.size,
    distinct_font_sizes: fontSizes.size, distinct_font_families: families.size, distinct_font_weights: weights.size,
    distinct_radii: radii.size, distinct_shadows: shadows.size, off_scale_spacing: offSpacing.length, tailwind_arbitrary: arbitrary.length,
  },
  findings,
};
fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log(`scan_code: ${files.length} files, ${findings.filter((f) => f.severity !== 'pass').length} non-pass findings -> ${outFile}`);
