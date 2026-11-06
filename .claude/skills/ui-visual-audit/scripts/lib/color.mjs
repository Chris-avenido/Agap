// Deterministic color math (WCAG 2.x). Shared by the audit scripts and the verification step.
import { fileURLToPath } from 'node:url';

const NAMED = { transparent: { r: 0, g: 0, b: 0, a: 0 }, white: { r: 255, g: 255, b: 255, a: 1 }, black: { r: 0, g: 0, b: 0, a: 1 } };

/** Parse a CSS color to {r,g,b,a} (0-255, a 0-1). Returns null when unparseable. */
export function parseColor(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim().toLowerCase();
  if (NAMED[s]) return { ...NAMED[s] };
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
  }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) return fromParts(m[1].replace('/', ' ').split(/[\s,]+/).filter(Boolean), 255);
  m = s.match(/^color\(\s*srgb\s+([^)]+)\)$/);
  if (m) return fromParts(m[1].replace('/', ' ').split(/\s+/).filter(Boolean), 1, true);
  return null;
}

function fromParts(p, scale, unit = false) {
  if (p.length < 3) return null;
  const ch = (v) => {
    const n = parseFloat(v);
    if (Number.isNaN(n)) return NaN;
    const x = v.endsWith('%') ? (n / 100) * 255 : unit ? n * 255 : n;
    return Math.max(0, Math.min(255, x));
  };
  const [r, g, b] = [ch(p[0]), ch(p[1]), ch(p[2])];
  let a = 1;
  if (p[3] !== undefined) a = p[3].endsWith('%') ? parseFloat(p[3]) / 100 : parseFloat(p[3]);
  if ([r, g, b, a].some(Number.isNaN)) return null;
  return { r, g, b, a: Math.max(0, Math.min(1, a)) };
}

/** Alpha-blend fg over bg; result is opaque if bg is opaque. */
export function composite(fg, bg) {
  const a = fg.a + bg.a * (1 - fg.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const mix = (f, b) => (f * fg.a + b * bg.a * (1 - fg.a)) / a;
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a };
}

export function relativeLuminance({ r, g, b }) {
  const lin = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio. A translucent fg is composited over bg first. */
export function contrastRatio(fg, bg) {
  const f = fg.a < 1 ? composite(fg, bg) : fg;
  const l1 = relativeLuminance(f), l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function isLargeText(fontSizePx, fontWeight) {
  return fontSizePx >= 24 || (fontSizePx >= 18.66 && Number(fontWeight) >= 700);
}

export function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv.includes('--test')) {
  const W = parseColor('#fff'), K = parseColor('rgb(0,0,0)');
  const checks = [
    ['black on white = 21', Math.abs(contrastRatio(K, W) - 21) < 0.01],
    ['#767676 on white ~ 4.54', Math.abs(contrastRatio(parseColor('#767676'), W) - 4.54) < 0.02],
    ['#9CA3AF on white ~ 2.54', Math.abs(contrastRatio(parseColor('#9CA3AF'), W) - 2.54) < 0.02],
    ['rgba parse', parseColor('rgba(0, 0, 0, 0.5)').a === 0.5],
    ['space rgb parse', parseColor('rgb(10 20 30 / 50%)').a === 0.5],
    ['color(srgb) parse', parseColor('color(srgb 1 0 0)').r === 255],
    ['transparent', parseColor('transparent').a === 0],
    ['composite 50% black on white = 127.5', Math.abs(composite({ r: 0, g: 0, b: 0, a: 0.5 }, W).r - 127.5) < 0.01],
    ['large text 24px', isLargeText(24, 400)], ['large text 18.66 bold', isLargeText(18.66, 700)],
    ['not large 18.66 regular', !isLargeText(18.66, 400)],
  ];
  let bad = 0;
  for (const [n, ok] of checks) { console.log((ok ? 'PASS ' : 'FAIL ') + n); if (!ok) bad++; }
  process.exit(bad ? 1 : 0);
}

/** Smallest change (mix toward black or white) that reaches `target` contrast against bg. Returns {rgb, ratio} or null. */
export function suggestColor(fg, bg, target) {
  for (const end of [{ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }]) {
    let best = null;
    for (let t = 0; t <= 1.0001; t += 0.01) {
      const c = { r: fg.r + (end.r - fg.r) * t, g: fg.g + (end.g - fg.g) * t, b: fg.b + (end.b - fg.b) * t, a: 1 };
      const ratio = contrastRatio(c, bg);
      if (ratio >= target) { best = { rgb: c, ratio }; break; }
    }
    if (best) return best;
  }
  return null;
}
