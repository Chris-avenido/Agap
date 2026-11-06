#!/usr/bin/env node
// Deterministic scan of UI source for InsightED design-rule violations. Node built-ins only.
// Usage: node scan-ui-violations.mjs [--root <path>] [--category <name|all>] [--files a,b] [--theme-file <path>] [--json]
// Output: one line per violation "file:line  rule-id  snippet", then a count per rule. Exit 1 if any violation.
import fs from 'node:fs';
import path from 'node:path';
import {
  detectStack, walk, readText, loadLibraryConfig, loadTokens, firstMatch, posix, extOf,
  SCAN_EXTS, MARKUP_EXTS, STYLE_EXTS, TEMPLATE_EXTS, isGeneratedName, isGeneratedContent, isGeneratedPath, isTestName,
} from './detect-stack.mjs';

const CATEGORIES = ['tokens', 'typography', 'shell', 'tables', 'forms', 'feedback', 'icons', 'charts', 'motion', 'dark'];
const RULE_CATEGORIES = {
  'color-raw': ['tokens'], 'radius': ['tokens'], 'shadow': ['tokens'], 'theme-missing': ['tokens'],
  'lib-banned': ['tokens', 'icons', 'charts'],
  'font': ['typography'],
  'shell-missing': ['shell'], 'shell-breakpoint': ['shell'],
  'table-density': ['tables'], 'table-mobile': ['tables'],
  'label': ['forms'], 'form-errors': ['forms'],
  'loader': ['feedback'], 'destructive': ['feedback'],
  'icon-weight': ['icons'],
  'motion': ['motion'],
  'dark-missing': ['dark'], 'dark-forced': ['dark'],
};

const NAMED = new Set(`aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat whitesmoke yellow yellowgreen`.split(/\s+/));
const NAMED_JSX_EXTRA = new Set(['dark', 'grape']); // Mantine default palette names that are not CSS colors

function parseArgs(argv) {
  const a = { root: null, category: 'all', files: null, themeFile: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--root') a.root = argv[++i];
    else if (k === '--category') a.category = argv[++i];
    else if (k === '--files') a.files = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
    else if (k === '--theme-file') a.themeFile = argv[++i];
    else if (k === '--json') a.json = true;
    else if (k === '--help' || k === '-h') a.help = true;
  }
  return a;
}

// Blank out comments (and keep newlines) so regexes never match commented-out code.
function stripComments(text, ext) {
  const isCss = ext === '.css';
  const lineComments = !isCss && !(MARKUP_EXTS.has(ext) && !['.vue', '.svelte', '.astro'].includes(ext));
  const html = MARKUP_EXTS.has(ext);
  const out = new Array(text.length);
  let i = 0;
  let str = null;
  const blank = (from, to) => {
    for (let k = from; k < to; k++) out[k] = text[k] === '\n' ? '\n' : ' ';
  };
  while (i < text.length) {
    const c = text[i];
    const n = text[i + 1];
    if (str) {
      out[i] = c;
      if (c === '\\') {
        if (i + 1 < text.length) out[i + 1] = text[i + 1];
        i += 2;
        continue;
      }
      if (c === str || (c === '\n' && str !== '`')) str = null;
      i++;
      continue;
    }
    if (c === '/' && n === '*') {
      const end = text.indexOf('*/', i + 2);
      const stop = end === -1 ? text.length : end + 2;
      blank(i, stop);
      i = stop;
      continue;
    }
    if (lineComments && c === '/' && n === '/' && (i === 0 || text[i - 1] !== ':')) {
      let end = text.indexOf('\n', i);
      if (end === -1) end = text.length;
      blank(i, end);
      i = end;
      continue;
    }
    if (html && c === '<' && text.startsWith('<!--', i)) {
      const end = text.indexOf('-->', i + 4);
      const stop = end === -1 ? text.length : end + 3;
      blank(i, stop);
      i = stop;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') str = c;
    out[i] = c;
    i++;
  }
  return out.join('');
}

function makeLiner(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return (idx) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= idx) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

const normHex = (h) => {
  let x = h.replace('#', '').toLowerCase();
  if (x.length === 3 || x.length === 4) x = [...x].map((c) => c + c).join('');
  return `#${x.slice(0, 6)}`;
};
const normShadow = (s) => s.toLowerCase().replace(/\s+/g, '').replace(/(?<![\d])0\./g, '.');

function lineAround(S, idx) {
  const start = S.lastIndexOf('\n', idx - 1) + 1;
  let end = S.indexOf('\n', idx);
  if (end === -1) end = S.length;
  return { start, end, line: S.slice(start, end) };
}
const clip = (s, n = 90) => {
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function toMs(num, unit) {
  const n = parseFloat(num);
  return unit === 's' ? n * 1000 : n;
}

function radiusBad(raw) {
  const v = raw.trim().replace(/!important/i, '').replace(/['"`]/g, '').trim();
  if (!v || /var\(|calc\(|env\(|theme|\$\{|\(/.test(v)) return false;
  for (const p of v.split(/[\s/,]+/).filter(Boolean)) {
    if (/^(none|unset|initial|inherit|revert)$/i.test(p)) continue;
    const m = p.match(/^(-?\d*\.?\d+)(px|rem|em|%)?$/i);
    if (!m) continue; // identifiers and theme names are token-driven
    const n = parseFloat(m[1]);
    const unit = (m[2] || 'px').toLowerCase();
    if (unit === '%') {
      if (n !== 50 && n !== 100) return true;
      continue;
    }
    const px = unit === 'px' ? n : n * 16;
    if (px === 0 || (px >= 4 && px <= 6) || px >= 100) continue;
    return true;
  }
  return false;
}

function blockOf(S, idx) {
  const open = S.lastIndexOf('{', idx);
  let close = S.indexOf('}', idx);
  if (close === -1) close = S.length;
  return S.slice(Math.max(open, 0), close);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('node scan-ui-violations.mjs [--root <path>] [--category tokens|typography|shell|tables|forms|feedback|icons|charts|motion|dark|all] [--files a,b] [--theme-file <path>] [--json]');
    return 0;
  }
  if (args.category !== 'all' && !CATEGORIES.includes(args.category)) throw new Error(`unknown --category "${args.category}"`);
  const root = path.resolve(args.root || process.cwd());
  const stack = detectStack(root);
  const lib = loadLibraryConfig();
  const tokens = loadTokens();
  const allowHex = new Set((JSON.stringify(tokens).match(/#[0-9a-fA-F]{6}\b/g) || []).map(normHex));
  const tokenShadows = new Set(
    [...Object.values(tokens.shadows).filter((v) => typeof v === 'string'), ...Object.values(tokens.shadows.dark)].map(normShadow),
  );
  const comp = tokens.components;
  const errorSummaryRe = new RegExp(`\\b${escapeRe(comp.errorSummary)}\\w*|form-error-summary`, 'i');
  const confirmRe = new RegExp(`\\b${escapeRe(comp.confirmDestructive.replace(/Dialog$/, ''))}\\w*|confirm-destructive`, 'i');

  // --files and --theme-file are relative to --root; fall back to the current directory, or absolute paths.
  const toRel = (p) => {
    const underRoot = path.resolve(root, p);
    return posix(path.relative(root, path.isAbsolute(p) || fs.existsSync(underRoot) ? underRoot : path.resolve(p)));
  };
  const themeFiles = args.themeFile ? [toRel(args.themeFile)] : stack.themeFileCandidates;
  const themeSet = new Set(themeFiles);

  // file list
  let scanFiles;
  const scoped = !!args.files;
  if (scoped) {
    scanFiles = args.files.map(toRel).filter((f) => fs.existsSync(path.join(root, f)) && SCAN_EXTS.has(extOf(f)));
  } else {
    scanFiles = walk(root).filter((f) => {
      const name = path.posix.basename(f);
      return SCAN_EXTS.has(extOf(f)) && !isGeneratedName(name) && !isGeneratedPath(f) && !isTestName(name) &&
        stack.uiSourceFolders.some((r) => r === '.' || f === r || f.startsWith(`${r}/`));
    });
  }

  const violations = [];
  const seen = new Set();
  const add = (file, line, rule, category, snippet) => {
    const key = `${file}|${line}|${rule}|${snippet}`;
    if (seen.has(key)) return;
    seen.add(key);
    violations.push({ file, line, rule, category, snippet: clip(snippet) });
  };

  const fileData = [];
  for (const rel of scanFiles) {
    const raw = readText(root, rel);
    if (!raw || isGeneratedContent(raw)) continue;
    const ext = extOf(rel);
    const S = stripComments(raw, ext);
    fileData.push({ rel, ext, S, lineOf: makeLiner(S), isTheme: themeSet.has(rel) });
  }

  // ---- phase 1: per-file rules, collecting import specifiers ----
  const specsByFile = new Map();
  const famCounts = {};
  const SPEC_RE = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*|@import\s+(?:url\(\s*)?)(['"])([^'"\n]+)\1/g;
  const familyOf = (spec) => Object.keys(lib.components.uiFamilies).find((f) => firstMatch(spec, lib.components.uiFamilies[f]));

  for (const fd of fileData) {
    const { rel, ext, S, lineOf, isTheme } = fd;
    const specs = [];
    for (const m of S.matchAll(SPEC_RE)) {
      specs.push({ spec: m[2], idx: m.index });
      const fam = familyOf(m[2]);
      if (fam) famCounts[fam] = (famCounts[fam] || 0) + 1;
    }
    specsByFile.set(rel, specs);
    fd.usesPhosphor = specs.some((s) => firstMatch(s.spec, lib.icons.approved)) || /IconContext/.test(S);
    fd.usesMantine = specs.some((s) => s.spec.startsWith('@mantine/'));

    // color-raw
    const prefixReject = /(?:\b(?:href|to|id|for|htmlFor|name|target|src|data-[\w-]+|aria-[\w-]+)\s*=\s*\{?\s*['"`]|\burl\(\s*['"]?|\b(?:from|import|require\()\s*['"`])$/;
    for (const m of S.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])/g)) {
      const idx = m.index;
      if (idx > 0 && /[\w&#]/.test(S[idx - 1])) continue;
      const { start, line } = lineAround(S, idx);
      if (/<meta\b/i.test(line)) continue;
      const prefix = S.slice(start, idx);
      if (prefixReject.test(prefix)) continue;
      const prev = S[idx - 1];
      const next = S[idx + m[0].length];
      let ok = (prev === '"' || prev === "'" || prev === '`') && next === prev;
      if (!ok && /[\w-]+\s*:\s*[^;{}]*$/.test(prefix)) {
        const rest = S.slice(idx + m[0].length, lineAround(S, idx).end);
        ok = !/^\s*(?:\{|[.:>[+~][^;]*\{)/.test(rest) && !(/\{\s*$/.test(rest) && !/;/.test(rest));
      }
      if (!ok && /^[\s,(]*$/.test(prefix)) {
        const before = S.slice(0, start).trimEnd();
        ok = /[,(:]$/.test(before);
      }
      if (!ok) continue;
      if (!isTheme) add(rel, lineOf(idx), 'color-raw', 'tokens', m[0]);
      else if (!allowHex.has(normHex(m[0]))) add(rel, lineOf(idx), 'color-raw', 'tokens', `${m[0]} not in the InsightED official palette`);
    }
    for (const m of S.matchAll(/(?<![\w.$-])(rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
      if (/var\(/.test(m[2])) continue;
      if (isTheme && /^rgba?$/.test(m[1])) {
        const nums = (m[2].match(/[\d.]+/g) || []).slice(0, 3).map(Number);
        if (nums.length === 3 && nums.every((n) => n >= 0 && n <= 255)) {
          const hex = `#${nums.map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`;
          if (allowHex.has(hex)) continue;
        }
      }
      add(rel, lineOf(m.index), 'color-raw', 'tokens', m[0]);
    }
    for (const m of S.matchAll(/(?<![\w-])(--[\w-]+|[a-zA-Z-]*(?:color|Color|background|Background|border|Border|outline|Outline|shadow|Shadow|fill|stroke))\s*:\s*([^;{}\n]+)/g)) {
      const value = m[2].replace(/var\([^)]*\)|url\([^)]*\)/g, ' ');
      for (const tok of value.split(/[\s,()'"`]+/)) {
        const t = tok.toLowerCase().replace(/!important/, '');
        if (NAMED.has(t)) add(rel, lineOf(m.index), 'color-raw', 'tokens', `${m[1]}: ${t}`);
      }
    }
    for (const m of S.matchAll(/(?<![\w.$-])(color|c|bg|bgcolor|fill|stroke|iconColor|borderColor|backgroundColor|stopColor)\s*[:=]\s*\{?\s*(['"`])([A-Za-z]+)(?:\.\d+)?\2/g)) {
      const t = m[3].toLowerCase();
      if (NAMED.has(t) || NAMED_JSX_EXTRA.has(t)) add(rel, lineOf(m.index), 'color-raw', 'tokens', `${m[1]}: ${t}`);
    }

    // radius
    for (const m of S.matchAll(/(?<![\w-])border(?:-(?:top|bottom)-(?:left|right)|-(?:start|end)-(?:start|end))?-radius\s*:\s*([^;}\n]+)/gi)) {
      if (radiusBad(m[1])) add(rel, lineOf(m.index), 'radius', 'tokens', m[0]);
    }
    for (const m of S.matchAll(/(?<![\w-])border(?:Top|Bottom)?(?:Left|Right)?(?:Start|End)?Radius\s*:\s*([^,}\n]+)/g)) {
      if (radiusBad(m[1])) add(rel, lineOf(m.index), 'radius', 'tokens', m[0]);
    }
    for (const m of S.matchAll(/(?<![\w-])radius\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*(?:(\d+(?:\.\d+)?)|["'`]([^"'`]+)["'`])\s*\})/g)) {
      const val = m[1] ?? m[2] ?? m[3] ?? m[4];
      if (val !== undefined && /^[\d.]+(px|rem|em|%)?$/.test(val) && radiusBad(val)) add(rel, lineOf(m.index), 'radius', 'tokens', m[0]);
    }

    // shadow
    for (const m of S.matchAll(/(?<![\w-])(?:box-shadow|boxShadow)\s*:\s*/g)) {
      const from = m.index + m[0].length;
      const first = S[from];
      let value;
      if (first === '"' || first === "'" || first === '`') {
        const end = S.indexOf(first, from + 1);
        value = S.slice(from + 1, end === -1 ? from + 200 : end);
      } else {
        const rest = S.slice(from, from + 400);
        const end = rest.search(/[;}]/);
        value = end === -1 ? rest : rest.slice(0, end);
      }
      const v = value.trim();
      if (!v || /^(var\(|none\b|inherit\b|initial\b|unset\b|revert\b|theme\b|\$\{)/i.test(v)) continue;
      if (!/^(?:inset\b|[-\d.]|rgba?\(|#|hsla?\()/i.test(v)) continue; // identifier or theme reference
      if (isTheme && tokenShadows.has(normShadow(v))) continue;
      add(rel, lineOf(m.index), 'shadow', 'tokens', `box-shadow: ${v}`);
    }

    // font: heading, body and data families are all allowed
    const fontNames = new Set([tokens.font.name, ...(tokens.font.also ?? [])].map((n) => n.toLowerCase()));
    const fontBad = (value) => {
      const first = value.split(',')[0].trim().replace(/^['"`]|['"`]$/g, '').trim();
      if (!first || /^(var\(|inherit$|initial$|unset$|revert$|\$\{|env\()/i.test(first) || /^[\w.$]+$/.test(first) && /[.$]/.test(first)) return null;
      return fontNames.has(first.toLowerCase().replace(/ variable$/, "")) ? null : first;
    };
    for (const m of S.matchAll(/(?<![\w-])font-family\s*[:=]\s*(?:"([^"]*)"|'([^']*)'|([^;}\n]+))/gi)) {
      const bad = fontBad(m[1] ?? m[2] ?? m[3]);
      if (bad) add(rel, lineOf(m.index), 'font', 'typography', `font-family: ${bad}`);
    }
    for (const m of S.matchAll(/(?<![\w-])fontFamily\s*:\s*(['"`])([^'"`]*)\1/g)) {
      const bad = fontBad(m[2]);
      if (bad) add(rel, lineOf(m.index), 'font', 'typography', `fontFamily: ${bad}`);
    }
    for (const m of S.matchAll(/fonts\.googleapis\.com[^\s"')>]*/g)) {
      for (const f of m[0].matchAll(/family=([^&:;"')]+)/g)) {
        const name = decodeURIComponent(f[1].replace(/\+/g, ' '));
        if (!fontNames.has(name.toLowerCase())) add(rel, lineOf(m.index), 'font', 'typography', `Google font: ${name}`);
      }
    }

    // motion
    for (const m of S.matchAll(/(?<![\w-])(transition|animation)(-[a-z-]+|[A-Z][a-zA-Z]*)?\s*:\s*([^;}\n]+)/g)) {
      const value = m[3];
      const isShorthandAnim = m[1] === 'animation';
      const spinner = (isShorthandAnim || m[2]) && /infinite/.test(blockOf(S, m.index)) && /spin|rotate|loader|loading|spinner/i.test(blockOf(S, m.index));
      let bad = null;
      if (!spinner) {
        for (const t of value.matchAll(/(?<![\w.#-])(\d*\.?\d+)(ms|s)\b/g)) {
          if (toMs(t[1], t[2]) > tokens.motion.maxDurationMs) {
            bad = `${t[0]} exceeds ${tokens.motion.maxDurationMs}ms`;
            break;
          }
        }
      }
      for (const cb of value.matchAll(/cubic-bezier\(\s*([^)]*)\)/g)) {
        const n = cb[1].split(',').map(Number);
        if (n.length === 4 && (n[1] < 0 || n[1] > 1 || n[3] < 0 || n[3] > 1)) bad = `overshoot easing ${cb[0]}`;
      }
      if (/\blinear\(/.test(value) || /\b(bounce|spring|elastic|overshoot)\b|ease-(?:in|out|in-out)-back/i.test(value)) bad = bad || 'spring or bounce easing';
      if (bad) add(rel, lineOf(m.index), 'motion', 'motion', `${m[0].trim()}  (${bad})`);
    }
    for (const m of S.matchAll(/@keyframes\s+([\w-]*(?:bounce|spring|elastic|wobble|overshoot)[\w-]*)/gi)) {
      add(rel, lineOf(m.index), 'motion', 'motion', m[0]);
    }
    const jsDur = [
      /(?<![\w-])(?:transitionDuration|exitDuration)\s*[=:]\s*\{?\s*['"`]?(\d+(?:\.\d+)?)(ms|s)?/g,
      /<Transition\b[^>]*?\bduration\s*=\s*\{?\s*(\d+)()/g,
      /transitionProps\s*[=:]\s*\{\s*\{?[^}]*?\bduration\s*:\s*(\d+)()/g,
    ];
    for (const re of jsDur) {
      for (const m of S.matchAll(re)) {
        if (toMs(m[1], m[2] || 'ms') > tokens.motion.maxDurationMs) add(rel, lineOf(m.index), 'motion', 'motion', `${clip(m[0], 70)}  (exceeds ${tokens.motion.maxDurationMs}ms)`);
      }
    }

    // loader
    for (const m of S.matchAll(/<\s*(?:[A-Za-z]+\.)?\w*Skeleton\w*\b/g)) add(rel, lineOf(m.index), 'loader', 'feedback', m[0]);
    for (const m of S.matchAll(/\b(?:function|const|class)\s+\w*Skeleton\w*/g)) add(rel, lineOf(m.index), 'loader', 'feedback', m[0]);
    for (const m of S.matchAll(/(?:\.|["'`\s])((?:[\w-]*-)?(?:skeleton|shimmer)(?:-[\w-]+)?)(?=[\s"'`{.:,>)[])/g)) {
      add(rel, lineOf(m.index), 'loader', 'feedback', `skeleton style "${m[1]}"`);
    }

    // label (floating-label component)
    if (!/floating[-_]?(label|field|input)/i.test(rel)) {
      for (const m of S.matchAll(/<\s*(input|select|textarea)\b([^>]*)>/gi)) {
        const type = (m[2].match(/\btype\s*=\s*["']?(\w+)/i) || [])[1];
        if (type && /^(hidden|checkbox|radio|submit|button|reset|file|range|color|image)$/i.test(type)) continue;
        if (/floating/i.test(S.slice(Math.max(0, m.index - 300), m.index))) continue;
        add(rel, lineOf(m.index), 'label', 'forms', `<${m[1]}> outside ${comp.floatingLabel}`);
      }
      if (fd.usesMantine) {
        for (const m of S.matchAll(/<\s*(TextInput|PasswordInput|NumberInput|Select|Textarea|Autocomplete|MultiSelect|DateInput|DatePickerInput|DateTimePicker|NativeSelect|TagsInput|JsonInput|ColorInput|FileInput|InputBase|Input|MaskedInput)(?![\w.])/g)) {
          add(rel, lineOf(m.index), 'label', 'forms', `<${m[1]}> used directly, wrap in ${comp.floatingLabel}`);
        }
      }
    }

    // form-errors
    if (!/form-?error-?summary/i.test(rel)) {
      const formM = S.match(/<\s*[Ff]orm\b|\buseForm\s*\(|\buseFormik\b|\buseFormState\b|\bhandleSubmit\b/);
      if (formM) {
        if (!errorSummaryRe.test(S)) add(rel, lineOf(formM.index), 'form-errors', 'forms', `form without ${comp.errorSummary}`);
        if (!/(?:\berror\s*=|\berrors?\.|\bform\.errors|aria-invalid|errorMessage|helperText|:error\b|\bhasError|\binvalid\b)/.test(S)) {
          add(rel, lineOf(formM.index), 'form-errors', 'forms', 'form without inline field errors');
        }
      }
    }

    // destructive
    if (!/confirm-?destructive/i.test(rel) && !confirmRe.test(S)) {
      const patterns = [
        /\bon(?:Click|Press|Select|Confirm)\s*=\s*\{[^}]{0,200}?\b(?:delete|remove|destroy|discard|overwrite|purge|wipe|truncate)\w*/gi,
        /(?:@click|v-on:click|on:click)\s*=\s*["'{][^"'}]{0,200}?\b(?:delete|remove|destroy|discard|overwrite|purge|wipe)\w*/gi,
        />\s*(?:Delete|Remove|Discard|Overwrite|Purge|Wipe)\b[^<{]{0,40}</g,
        /<form[^>]*method\s*=\s*["']?delete/gi,
        /data-(?:action|method)\s*=\s*["']delete/gi,
      ];
      for (const re of patterns) {
        for (const m of S.matchAll(re)) add(rel, lineOf(m.index), 'destructive', 'feedback', `${clip(m[0], 70)}  (no ${comp.confirmDestructive})`);
      }
    }

    // icon-weight
    if (fd.usesPhosphor) {
      for (const m of S.matchAll(/(?<![-\w])weight\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*["'`]([^"'`]+)["'`]\s*\})/g)) {
        const w = m[1] ?? m[2] ?? m[3];
        if (w !== 'duotone') add(rel, lineOf(m.index), 'icon-weight', 'icons', m[0]);
      }
      for (const m of S.matchAll(/(?<![-\w])weight\s*:\s*["'`](\w+)["'`]/g)) {
        if (m[1] !== 'duotone') add(rel, lineOf(m.index), 'icon-weight', 'icons', m[0]);
      }
    }

    // dark-forced
    for (const m of S.matchAll(/\bforceColorScheme\s*=|color-scheme\s*:\s*light\s*[;}\n]/g)) {
      add(rel, lineOf(m.index), 'dark-forced', 'dark', m[0].trim());
    }

    // tailwind directives (banned beside a component library)
    if (stack.uiLibrary !== 'none' && STYLE_EXTS.has(ext)) {
      for (const m of S.matchAll(/@(?:tailwind|apply)\b/g)) add(rel, lineOf(m.index), 'lib-banned', 'tokens', `${m[0]} (Tailwind beside ${stack.uiLibraryNames.join('/')})`);
    }
  }

  // ---- phase 2: classify import specifiers and package.json dependencies ----
  const primaryFamily = stack.profile === 'react-mantine'
    ? 'mantine'
    : Object.entries(famCounts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))[0]?.[0] || null;
  const utilityCssBanned = stack.uiLibrary !== 'none';
  const loaderBanned = lib.loaders?.banned || [];

  function classify(spec, fromPackageJson) {
    if (firstMatch(spec, lib.icons.approved)) return null;
    let m = firstMatch(spec, lib.icons.banned);
    if (m) return { rule: 'lib-banned', category: 'icons', why: `banned icon library "${m}"` };
    if (lib.charts.profiles.includes(stack.profile)) {
      m = firstMatch(spec, lib.charts.banned);
      if (m) {
        const peer = lib.charts.peerExemptions?.[m];
        if (!(fromPackageJson && peer && fromPackageJson.has(peer))) return { rule: 'lib-banned', category: 'charts', why: `use @mantine/charts, not "${m}"` };
      }
    }
    m = firstMatch(spec, lib.motion.banned);
    if (m) return { rule: 'motion', category: 'motion', why: `animation library "${m}"` };
    m = firstMatch(spec, loaderBanned);
    if (m) return { rule: 'loader', category: 'feedback', why: `skeleton library "${m}"` };
    m = firstMatch(spec, lib.components.profileBanned[stack.profile] || []);
    if (m) return { rule: 'lib-banned', category: 'tokens', why: `banned beside Mantine: "${m}"` };
    if (utilityCssBanned && (m = firstMatch(spec, lib.components.utilityCss))) return { rule: 'lib-banned', category: 'tokens', why: `utility CSS "${m}" beside ${stack.uiLibraryNames.join('/') || 'the UI library'}` };
    const fam = familyOf(spec);
    if (fam && primaryFamily && fam !== primaryFamily) return { rule: 'lib-banned', category: 'tokens', why: `second component library "${fam}" (primary is "${primaryFamily}")` };
    return null;
  }

  for (const fd of fileData) {
    for (const { spec, idx } of specsByFile.get(fd.rel)) {
      const c = classify(spec, null);
      if (c) add(fd.rel, fd.lineOf(idx), c.rule, c.category, `${spec}  (${c.why})`);
    }
    if (MARKUP_EXTS.has(fd.ext)) {
      for (const m of fd.S.matchAll(/(?:src|href)\s*=\s*["'](?:https?:)?\/\/([^"']+)["']/gi)) {
        const url = m[1].toLowerCase();
        const names = [...lib.icons.banned, ...lib.motion.banned, ...loaderBanned, ...lib.components.utilityCss]
          .map((e) => e.replace(/\*$/, ''))
          .filter((e) => !e.startsWith('@') && e.length >= 4);
        const hit = names.find((e) => new RegExp(`(^|[^a-z0-9])${escapeRe(e.toLowerCase())}([^a-z0-9]|$)`).test(url));
        if (hit) add(fd.rel, fd.lineOf(m.index), 'lib-banned', 'tokens', `CDN reference to "${hit}"`);
      }
    }
  }
  if (!scoped) {
    for (const pj of stack.packageJsonFiles) {
      if (pj.startsWith('.')) continue;
      const text = readText(root, pj);
      let pkg;
      try {
        pkg = JSON.parse(text);
      } catch {
        continue;
      }
      const names = new Set(['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].flatMap((k) => Object.keys(pkg[k] || {})));
      const lineOf = makeLiner(text);
      for (const name of names) {
        const c = classify(name, names);
        if (c) add(pj, lineOf(Math.max(text.indexOf(`"${name}"`), 0)), c.rule, c.category, `${name}  (${c.why})`);
      }
    }
    if (utilityCssBanned) {
      for (const f of walk(root, { includeDot: false })) {
        const b = path.posix.basename(f);
        if (/^tailwind\.config\.[cm]?[jt]s$/.test(b)) add(f, 1, 'lib-banned', 'tokens', 'tailwind config beside a component library');
        if (b === 'components.json' && /shadcn/i.test(readText(root, f, 50_000))) add(f, 1, 'lib-banned', 'tokens', 'shadcn/ui config');
      }
    }
  }

  // ---- phase 3: repo-level checks (skipped when scoped by --files) ----
  if (!scoped) {
    const all = fileData.map((f) => f.S).join('\n');
    if (!themeFiles.length) {
      add('.', 0, 'theme-missing', 'tokens', 'no theme or token file found: create one from assets/insighted-tokens.json');
    } else {
      const themeText = themeFiles.map((f) => readText(root, f)).join('\n');
      if (!/dark/i.test(themeText)) add(themeFiles[0], 1, 'dark-missing', 'dark', 'theme defines no dark scheme');
    }
    if (fileData.length > 0) {
      const hasTop = /AppShell\.Header|<\s*header\b|\b(?:TopBar|Topbar|AppHeader|HeaderBar|Navbar|NavBar)\b|(?:class|className)\s*=\s*["'`{][^"'`}]*(?:topbar|top-bar|app-header)/i.test(all);
      const sideRe = /AppShell\.Navbar|<\s*aside\b|\b(?:Sidebar|SideBar|SideNav|AppNavbar|NavigationDrawer)\b|(?:class|className)\s*=\s*["'`{][^"'`}]*(?:sidebar|side-nav)|\.(?:sidebar|side-nav)\b[^{]*\{/i;
      const hasSide = sideRe.test(all);
      if (!hasTop || !hasSide) add('.', 0, 'shell-missing', 'shell', `no ${[!hasTop && 'top bar', !hasSide && 'sidebar'].filter(Boolean).join(' or ')} found`);
      if (hasSide) {
        const sideFile = fileData.find((f) => sideRe.test(f.S));
        const responsive = /@media|useMediaQuery|breakpoint|Burger|Drawer|matchMedia|isMobile/.test(all);
        if (!responsive) add(sideFile.rel, 1, 'shell-breakpoint', 'shell', 'sidebar has no breakpoint or drawer behavior for small screens');
      }
    }
    // tables
    const themeTableSpacing = /Table\s*:|verticalSpacing/.test(themeFiles.map((f) => readText(root, f)).join('\n'));
    const cssWithTableMobile = fileData.some((f) => STYLE_EXTS.has(f.ext) && /table/i.test(f.S) && /overflow-x|@media/.test(f.S));
    for (const fd of fileData) {
      const tagRe = /<Table(?![.\w])(?:=>|[^>])*>/g;
      for (const m of fd.S.matchAll(tagRe)) {
        if (!themeTableSpacing && !/verticalSpacing/.test(m[0])) add(fd.rel, fd.lineOf(m.index), 'table-density', 'tables', '<Table> without verticalSpacing');
      }
      const tableM = fd.S.match(/<\s*table\b|<Table(?![\w])/);
      if (tableM && !cssWithTableMobile) {
        const sibling = fileData.find((f) => STYLE_EXTS.has(f.ext) && path.posix.dirname(f.rel) === path.posix.dirname(fd.rel) && path.posix.basename(f.rel).split('.')[0] === path.posix.basename(fd.rel).split('.')[0]);
        const marker = /overflow-x|overflowX|overflow:\s*auto|ScrollArea|ScrollContainer|@media|useMediaQuery|data-label|responsive/;
        if (!marker.test(fd.S) && !(sibling && marker.test(sibling.S))) add(fd.rel, fd.lineOf(tableM.index), 'table-mobile', 'tables', 'table has no stacked-card or own-container scroll handling');
      }
    }
    // icon provider
    const phosphorFile = fileData.find((f) => f.usesPhosphor && specsByFile.get(f.rel).some((s) => firstMatch(s.spec, lib.icons.approved)));
    if (phosphorFile) {
      const hasProvider = fileData.some((f) => /duotone/.test(f.S) && /IconContext|provide\(|setContext\(|defaultProps|weight\s*[:=]/.test(f.S));
      if (!hasProvider) {
        const first = specsByFile.get(phosphorFile.rel).find((s) => firstMatch(s.spec, lib.icons.approved));
        add(phosphorFile.rel, phosphorFile.lineOf(first.idx), 'icon-weight', 'icons', 'no global provider or shared wrapper sets weight "duotone"');
      }
    }
  }

  // ---- output ----
  const wanted = args.category === 'all' ? violations : violations.filter((v) => v.category === args.category);
  wanted.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line || (a.rule < b.rule ? -1 : 1)));
  const ruleIds = Object.keys(RULE_CATEGORIES).filter((r) => args.category === 'all' || RULE_CATEGORIES[r].includes(args.category));
  const counts = Object.fromEntries(ruleIds.map((r) => [r, wanted.filter((v) => v.rule === r).length]));

  if (args.json) {
    console.log(JSON.stringify({
      root: posix(root), profile: stack.profile, category: args.category, scope: scoped ? 'files' : 'all',
      scannedFiles: fileData.length, themeFiles, total: wanted.length, counts, violations: wanted,
    }));
  } else {
    for (const v of wanted) console.log(`${v.file}:${v.line}  ${v.rule}  ${v.snippet}`);
    if (wanted.length) console.log('');
    console.log(`scanned ${fileData.length} files, profile ${stack.profile}, category ${args.category}${scoped ? ', scoped by --files (repo-level checks skipped)' : ''}`);
    for (const r of ruleIds) console.log(`${r.padEnd(18)} ${counts[r]}`);
    console.log(`${'total'.padEnd(18)} ${wanted.length}`);
  }
  return wanted.length ? 1 : 0;
}

try {
  process.exitCode = main();
} catch (err) {
  console.error(`scan-ui-violations: ${err.message}`);
  process.exitCode = 2;
}
