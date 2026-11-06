#!/usr/bin/env node
// Measures the rendered UI with Playwright + axe-core. Navigates, scrolls, hovers and presses Tab only.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { parseColor, composite, contrastRatio, isLargeText, toHex, suggestColor } from './lib/color.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(here, '../reference/thresholds.json'), 'utf8'));
const require = createRequire(import.meta.url);

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const BASE = opt('--url');
if (!BASE) { console.error('usage: audit_page.mjs --url <base> [--routes /a,/b] [--out ui-audit] [--storage-state f] [--timeout ms]'); process.exit(2); }
const OUT = path.resolve(opt('--out', 'ui-audit'));
// Git Bash on Windows rewrites a bare '/' argument into the Git install path; undo that.
const ROUTES = opt('--routes', '/').split(',').map((r) => r.trim().replace(/^[A-Za-z]:[\/]Program Files[\/]Git/i, '') || '/').filter(Boolean);
const STORAGE = opt('--storage-state');
const TIMEOUT = Number(opt('--timeout', 30000));
const SCHEMES = ['light', 'dark'];
const HEIGHT = 800;
const THIRD_PARTY = /(intercom|hubspot|drift|crisp|zendesk|tawk|recaptcha|cookiebot|onetrust|osano|fb-root|twitter-|disqus|stripe|paypal|calendly|typeform|youtube|vimeo|gm-style|google-map)/i;

// ---- runs inside the browser; must be self-contained --------------------------------------------
function measurePage({ cap, thirdPartyRe, spacingBase, radiusFull }) {
  const re = new RegExp(thirdPartyRe, 'i');
  const cs = (e) => getComputedStyle(e);
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const rgba = (c) => {
    if (cache.has(c)) return cache.get(c);
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data; const v = `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${+(d[3] / 255).toFixed(3)})`;
    cache.set(c, v); return v;
  };
  const sel = (e) => {
    const parts = []; let n = e;
    for (let i = 0; n && n.nodeType === 1 && i < 4; i++) {
      let s = n.tagName.toLowerCase();
      if (n.id) { parts.unshift(s + '#' + CSS.escape(n.id)); break; }
      s += [...n.classList].slice(0, 2).map((x) => '.' + CSS.escape(x)).join('');
      const sib = n.parentElement ? [...n.parentElement.children].filter((x) => x.tagName === n.tagName) : [];
      if (sib.length > 1) s += `:nth-of-type(${sib.indexOf(n) + 1})`;
      parts.unshift(s); n = n.parentElement;
    }
    return parts.join(' > ');
  };
  const visible = (e) => {
    const r = e.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) return false;
    const s = cs(e); return s.visibility === 'visible' && s.display !== 'none' && parseFloat(s.opacity) > 0;
  };
  const alphaOf = (c) => parseFloat(c.match(/,\s*([\d.]+)\)$/)[1]);
  const layers = (el) => {
    const out = []; let unknown = null; let opaque = false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = cs(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') { unknown = unknown || `background-image on ${sel(n)}`; }
      const c = rgba(s.backgroundColor);
      if (alphaOf(c) > 0) { out.push(c); if (alphaOf(c) === 1) { opaque = true; break; } }
    }
    if (!opaque) out.push(/dark/.test(cs(document.documentElement).colorScheme) ? 'rgba(18, 18, 18, 1)' : 'rgba(255, 255, 255, 1)');
    return { layers: out, unknown };
  };
  const opacityChain = (el) => { let o = 1; for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= parseFloat(cs(n).opacity); return o; };
  const tp = (el) => { for (let n = el; n && n.nodeType === 1; n = n.parentElement) { if (re.test((n.id || '') + ' ' + (typeof n.className === 'string' ? n.className : '') + ' ' + (n.getAttribute('src') || ''))) return true; } return false; };
  const media = [...document.querySelectorAll('img,video,canvas,iframe,object,picture')].filter(visible).map((m) => m.getBoundingClientRect());
  const overMedia = (r) => media.some((m) => {
    const w = Math.min(r.right, m.right) - Math.max(r.left, m.left), h = Math.min(r.bottom, m.bottom) - Math.max(r.top, m.top);
    return w > 0 && h > 0 && (w * h) / (r.width * r.height) >= 0.2 && m.width * m.height > r.width * r.height * 1.5;
  });
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH', 'BR', 'HEAD', 'META', 'LINK', 'TEMPLATE', 'OPTION']);
  const INTERACTIVE = 'a[href],button,input:not([type=hidden]),select,textarea,[role=button],[tabindex]:not([tabindex="-1"])';
  let all = [...document.body.querySelectorAll('*')].filter((e) => !SKIP.has(e.tagName.toUpperCase()) && !(e.closest('svg') && e.tagName.toLowerCase() !== 'svg') && visible(e));
  const total = all.length;
  if (all.length > cap) { const k = all.length / cap; all = Array.from({ length: cap }, (_, i) => all[Math.floor(i * k)]); }
  const ctx2 = document.createElement('canvas').getContext('2d');
  const SAMPLE = 'The quick brown fox jumps over the lazy dog and keeps running ';
  const elements = [];
  const fams = new Map(), weights = new Map(), radii = new Map(), shadows = new Map();
  const spacing = { total: 0, on: 0, off: [] };
  const edge = (v) => Math.round(v * 100) / 100;
  for (const e of all) {
    const s = cs(e), r = e.getBoundingClientRect(), tag = e.tagName.toLowerCase();
    const ownText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const interactive = e.matches(INTERACTIVE);
    // shape
    for (const corner of ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius']) {
      const v = parseFloat(s[corner]); if (v > 0 || /%/.test(s[corner])) { const k = v >= radiusFull || /%/.test(s[corner]) ? 'full' : edge(v) + 'px'; if (!radii.has(k)) radii.set(k, sel(e)); }
    }
    if (s.boxShadow && s.boxShadow !== 'none') { const k = s.boxShadow.replace(/rgba?\([^)]*\)|oklch\([^)]*\)|color\([^)]*\)/g, (m) => rgba(m)); if (!shadows.has(k)) shadows.set(k, sel(e)); }
    // spacing (horizontal margins skipped because auto-centering yields arbitrary used values)
    {
      const vals = [['paddingTop', s.paddingTop], ['paddingRight', s.paddingRight], ['paddingBottom', s.paddingBottom], ['paddingLeft', s.paddingLeft], ['marginTop', s.marginTop], ['marginBottom', s.marginBottom], ['rowGap', s.rowGap], ['columnGap', s.columnGap]];
      for (const [p, raw] of vals) {
        const v = parseFloat(raw); if (!(v > 0) || v < spacingBase / 2) continue;
        spacing.total++;
        if (Math.abs(v / spacingBase - Math.round(v / spacingBase)) < 0.01) spacing.on++;
        else if (spacing.off.length < 60) spacing.off.push({ sel: sel(e), prop: p, value: edge(v) });
      }
    }
    if (!ownText && !interactive) continue;
    const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    if (ownText) { fams.set(fam, (fams.get(fam) || 0) + 1); weights.set(s.fontWeight, (weights.get(s.fontWeight) || 0) + 1); }
    const bg = layers(e);
    const text = (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
    const rec = {
      sel: sel(e), tag, text: text.slice(0, 40), ownText, interactive, thirdParty: tp(e),
      fs: parseFloat(s.fontSize), fw: s.fontWeight, fam, lhRaw: s.lineHeight, lh: s.lineHeight === 'normal' ? null : parseFloat(s.lineHeight),
      align: s.textAlign, color: rgba(s.color), opacity: opacityChain(e), layers: bg.layers, bgUnknown: bg.unknown || (ownText && overMedia(r) ? 'text over image/video/canvas' : null),
      w: r.width, h: r.height, display: s.display, inline: s.display === 'inline',
      inText: interactive && s.display === 'inline' && !!e.parentElement && e.parentElement.textContent.trim().length > e.textContent.trim().length + 10,
      disabled: e.disabled === true || e.getAttribute('aria-disabled') === 'true',
    };
    if (interactive) {
      const lab = e.labels && e.labels[0] ? e.labels[0].getBoundingClientRect() : null;
      if (lab) { rec.w = Math.max(rec.w, lab.width); rec.h = Math.max(rec.h, lab.height); }
      const par = e.parentElement ? layers(e.parentElement) : { layers: ['rgba(255, 255, 255, 1)'], unknown: null };
      rec.parentLayers = par.layers; rec.parentUnknown = par.unknown;
      rec.borderColor = parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none' ? rgba(s.borderTopColor) : null;
      rec.ownBg = rgba(s.backgroundColor);
      rec.isControl = /^(button|input|select|textarea)$/.test(tag) || e.getAttribute('role') === 'button';
    }
    if (/^(p|li|blockquote|dd)$/.test(tag) && text.length >= 80) {
      ctx2.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const avg = ctx2.measureText(SAMPLE).width / SAMPLE.length;
      const cw = r.width - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
      rec.para = true; rec.cpl = Math.floor(cw / avg); rec.lines = Math.round(r.height / (rec.lh || rec.fs * 1.2));
    }
    elements.push(rec);
  }
  const de = document.documentElement;
  const overflowEls = de.scrollWidth > de.clientWidth ? [...document.body.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > de.clientWidth + 1 && visible(e)).slice(0, 5).map(sel) : [];
  const body = layers(document.body);
  const hasMedia = !!document.querySelector('canvas');
  return {
    elements, total, sampled: all.length, visibleText: (document.body.innerText || '').trim().length,
    fams: [...fams], weights: [...weights], radii: [...radii], shadows: [...shadows], spacing,
    overflow: { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, els: overflowEls }, bodyLayers: body.layers, hasCanvas: hasMedia,
  };
}

function motionPage() {
  const bad = [];
  for (const e of document.body.querySelectorAll('*')) {
    const s = getComputedStyle(e);
    const anim = s.animationName !== 'none' && parseFloat(s.animationDuration) > 0.01;
    const tr = Math.max(...s.transitionDuration.split(',').map(parseFloat)) > 0.01;
    if (anim || tr) bad.push({ sel: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + [...e.classList].slice(0, 2).map((c) => '.' + c).join(''), kind: anim ? `animation ${s.animationName} ${s.animationDuration}` : `transition ${s.transitionDuration}` });
  }
  return bad;
}

// ---- helpers (node side) -----------------------------------------------------------------------
const slugOf = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '').toLowerCase() || 'home');
const opaque = (layers) => {
  let acc = parseColor(layers[layers.length - 1]);
  for (let i = layers.length - 2; i >= 0; i--) acc = composite(parseColor(layers[i]), acc);
  return acc;
};
const textColor = (el, bg) => { const c = parseColor(el.color); c.a *= el.opacity; return c.a < 1 ? composite(c, bg) : c; };

let FINDINGS;
function mk(id, category, severity, title, rule, o) {
  FINDINGS.push({ id, category, severity, title, rule, location: o.items?.[0]?.sel ?? null, evidence: o.evidence, expected: o.expected, fix: o.fix, count: o.items?.length ?? 0, occurrences: (o.items || []).slice(0, 25), screenshot: o.screenshot ?? null, source: 'page', ...o.tags });
}
// emits fail/warn from own elements, downgrades to a third-party warn when only third-party elements offend, else pass
function check(id, category, title, rule, items, o, sevOwn = 'fail') {
  const own = items.filter((i) => !i.thirdParty), third = items.filter((i) => i.thirdParty);
  if (own.length) mk(id, category, sevOwn, title, rule, { ...o, items: own, evidence: o.evidence(own) });
  else if (third.length) mk(id, category, 'warn', title + ' (third-party)', rule, { ...o, items: third.map((t) => ({ ...t, thirdParty: true })), evidence: o.evidence(third) + ' [third-party widget, not the app\'s own code]' });
  else mk(id, category, 'pass', title, rule, { ...o, items: [], evidence: 'no violations measured' });
}

function analyze(m, tags, shot) {
  const els = m.elements, W = tags.viewport, T_ = T;
  const mkO = (expected, fix, evidence) => ({ expected, fix, evidence, screenshot: shot, tags });
  const txt = els.filter((e) => e.ownText);
  const sel = (e, extra) => ({ sel: e.sel, text: e.text, thirdParty: e.thirdParty, ...extra });
  // typography
  check('page.type.tiny', 'Typography', `Text below ${T_.minAnyFontPx}px`, 'font-size-min', txt.filter((e) => e.fs < T_.minAnyFontPx).map((e) => sel(e, { fontSize: e.fs })),
    mkO(`>= ${T_.minAnyFontPx}px`, `Raise to ${T_.minAnyFontPx}px minimum (caption) and 16px for body text.`, (i) => `${i.length} elements; ${i[0].sel} is ${i[0].fontSize}px ("${i[0].text}")`));
  check('page.type.body-size', 'Typography', `Body text below ${T_.minBodyFontPx}px`, 'font-size-body', txt.filter((e) => /^(p|li|td|dd|blockquote)$/.test(e.tag) && e.fs >= T_.minAnyFontPx && e.fs < T_.minBodyFontPx).map((e) => sel(e, { fontSize: e.fs })),
    mkO(`>= ${T_.minBodyFontPx}px`, 'Set body copy to 1rem (16px); keep 14px for secondary text only.', (i) => `${i.length} paragraph-like elements; ${i[0].sel} is ${i[0].fontSize}px`), 'warn');
  const paras = els.filter((e) => e.para);
  check('page.type.line-height', 'Typography', 'Paragraph line-height outside 1.4-1.6', 'line-height',
    paras.filter((e) => e.lines >= 2).filter((e) => e.lh === null || e.lh / e.fs < T_.lineHeightBody[0] - 0.005 || e.lh / e.fs > T_.lineHeightBody[1] + 0.005).map((e) => sel(e, { ratio: e.lh === null ? 'normal' : +(e.lh / e.fs).toFixed(2) })),
    mkO(`${T_.lineHeightBody[0]}-${T_.lineHeightBody[1]}`, 'Set line-height: 1.5 on body copy.', (i) => `${i.length} paragraphs; ${i[0].sel} line-height ${i[0].ratio}`), 'warn');
  check('page.type.line-length', 'Typography', 'Paragraph line length outside 45-75 characters', 'line-length',
    paras.filter((e) => e.cpl > T_.lineLengthChars[1] || (W >= 768 && e.cpl < T_.lineLengthChars[0] && e.lines >= 2)).map((e) => sel(e, { chars: e.cpl })),
    mkO(`${T_.lineLengthChars[0]}-${T_.lineLengthChars[1]} chars (estimated from element width / canvas-measured average glyph width)`, 'Constrain text containers with max-width: 65ch.', (i) => `${i.length} paragraphs; ${i[0].sel} ~${i[0].chars} chars per line`), 'warn');
  check('page.type.justify', 'Typography', 'Justified text', 'text-justify', txt.filter((e) => e.align === 'justify').map((e) => sel(e)),
    mkO('text-align: left (start)', 'Use text-align: left; justified text creates uneven word gaps.', (i) => `${i.length} elements justified, e.g. ${i[0].sel}`), 'warn');
  if (m.fams.length > T_.maxFontFamilies) mk('page.type.families', 'Typography', 'warn', 'Too many font families on the page', 'font-family-count', { items: m.fams.map(([f]) => ({ sel: f })), evidence: `${m.fams.length} families: ${m.fams.map(([f]) => f).join(', ')}`, expected: `<= ${T_.maxFontFamilies}`, fix: 'Keep one primary family (and one display family at most).', screenshot: shot, tags });
  else mk('page.type.families', 'Typography', 'pass', 'Font families on the page', 'font-family-count', { items: [], evidence: `${m.fams.length} families`, expected: `<= ${T_.maxFontFamilies}`, fix: 'n/a', tags });
  if (m.weights.length > T_.maxFontWeights) mk('page.type.weights', 'Typography', 'warn', 'Too many font weights on the page', 'font-weight-count', { items: m.weights.map(([w]) => ({ sel: `font-weight ${w}` })), evidence: `${m.weights.length} weights: ${m.weights.map(([w]) => w).join(', ')}`, expected: `<= ${T_.maxFontWeights}`, fix: 'Use 400, 500 and one of 600/700.', screenshot: shot, tags });
  else mk('page.type.weights', 'Typography', 'pass', 'Font weights on the page', 'font-weight-count', { items: [], evidence: `${m.weights.length} weights`, expected: `<= ${T_.maxFontWeights}`, fix: 'n/a', tags });
  // spacing & layout
  const sp = m.spacing, pct = sp.total ? +((sp.on / sp.total) * 100).toFixed(1) : 100;
  if (sp.off.length) mk('page.spacing.scale', 'Spacing and layout', 'warn', 'Spacing values off the 4px scale', 'spacing-4px', { items: sp.off.map((o) => ({ sel: o.sel, text: `${o.prop}: ${o.value}px` })), evidence: `${pct}% of ${sp.total} padding/margin/gap values on the 4px scale; ${sp.off.length} off-scale, e.g. ${sp.off[0].sel} ${sp.off[0].prop}: ${sp.off[0].value}px`, expected: `multiples of ${T_.spacingBasePx}px (${T_.spacingScalePx.join(', ')})`, fix: 'Round each value to the nearest scale step (e.g. 13px -> 12px).', screenshot: shot, tags });
  else mk('page.spacing.scale', 'Spacing and layout', 'pass', 'Spacing on the 4px scale', 'spacing-4px', { items: [], evidence: `${pct}% on scale (${sp.total} values)`, expected: 'multiples of 4px', fix: 'n/a', tags });
  if (W === T_.viewports[0]) {
    if (m.overflow.els.length || m.overflow.scrollWidth > m.overflow.clientWidth) mk('page.layout.overflow', 'Spacing and layout', 'fail', `Horizontal overflow at ${W}px`, 'overflow-x', { items: m.overflow.els.map((s) => ({ sel: s })), evidence: `scrollWidth ${m.overflow.scrollWidth}px > clientWidth ${m.overflow.clientWidth}px; widest offenders: ${m.overflow.els.join(' | ')}`, expected: 'scrollWidth <= clientWidth', fix: 'Constrain offenders with max-width: 100%, flex-wrap or overflow handling.', screenshot: shot, tags });
    else mk('page.layout.overflow', 'Spacing and layout', 'pass', `No horizontal overflow at ${W}px`, 'overflow-x', { items: [], evidence: `scrollWidth ${m.overflow.scrollWidth} <= ${m.overflow.clientWidth}`, expected: 'no overflow', fix: 'n/a', tags });
  }
  check('page.layout.measure', 'Spacing and layout', `Text block wider than ${T_.maxContentWidthPx}px`, 'max-content-width', paras.filter((e) => e.w > T_.maxContentWidthPx).map((e) => sel(e, { width: Math.round(e.w) })),
    mkO(`<= ${T_.maxContentWidthPx}px`, `Cap readable containers at max-width: ${T_.maxContentWidthPx}px (or 65ch).`, (i) => `${i.length} blocks; ${i[0].sel} is ${i[0].width}px wide`), 'warn');
  // shape
  const rN = m.radii.length, sN = m.shadows.length;
  mk('page.shape.radii', 'Shape and elevation', rN > T_.maxDistinctRadii ? 'warn' : 'pass', 'Distinct border-radius values', 'radius-count', { items: rN > T_.maxDistinctRadii ? m.radii.map(([v, s]) => ({ sel: s, text: v })) : [], evidence: `${rN} distinct radii: ${m.radii.map(([v]) => v).join(', ')}`, expected: `<= ${T_.maxDistinctRadii}`, fix: 'Collapse to 4 / 8 / 16 / full.', screenshot: shot, tags });
  mk('page.shape.shadows', 'Shape and elevation', sN > T_.maxDistinctShadows ? 'warn' : 'pass', 'Distinct box-shadow values', 'shadow-count', { items: sN > T_.maxDistinctShadows ? m.shadows.map(([v, s]) => ({ sel: s, text: v.slice(0, 60) })) : [], evidence: `${sN} distinct shadows`, expected: `<= ${T_.maxDistinctShadows}`, fix: 'Define three elevation tokens.', screenshot: shot, tags });
  // components: target size and control contrast
  const ctl = els.filter((e) => e.interactive && !e.disabled && !e.inText && !(e.tag === 'input' && /^(hidden)$/.test(e.tag)));
  check('page.target.min', 'Components and states', `Interactive target under ${T_.minTargetPxAA}x${T_.minTargetPxAA}px`, 'target-size-aa', ctl.filter((e) => e.w < T_.minTargetPxAA || e.h < T_.minTargetPxAA).map((e) => sel(e, { size: `${Math.round(e.w)}x${Math.round(e.h)}` })),
    mkO(`>= ${T_.minTargetPxAA}x${T_.minTargetPxAA} CSS px (WCAG 2.2 AA 2.5.8)`, `Increase size/padding to at least ${T_.minTargetPxRecommended}px.`, (i) => `${i.length} targets; ${i[0].sel} is ${i[0].size}px ("${i[0].text}")`));
  if (W === T_.viewports[0]) check('page.target.recommended', 'Components and states', `Touch target under ${T_.minTargetPxRecommended}x${T_.minTargetPxRecommended}px at ${W}px`, 'target-size-rec', ctl.filter((e) => (e.w < T_.minTargetPxRecommended || e.h < T_.minTargetPxRecommended) && e.w >= T_.minTargetPxAA && e.h >= T_.minTargetPxAA).map((e) => sel(e, { size: `${Math.round(e.w)}x${Math.round(e.h)}` })),
    mkO(`>= ${T_.minTargetPxRecommended}x${T_.minTargetPxRecommended} (Apple HIG; Material 48dp)`, 'Add padding or min-height: 44px to touch controls.', (i) => `${i.length} targets; ${i[0].sel} is ${i[0].size}px`), 'warn');
  const ctlLow = [];
  for (const e of ctl.filter((x) => x.isControl && !x.parentUnknown)) {
    const parent = opaque(e.parentLayers), own = parseColor(e.ownBg), border = e.borderColor && parseColor(e.borderColor);
    const rb = border ? contrastRatio(border.a < 1 ? composite(border, parent) : border, parent) : 0;
    const rf = own.a > 0 ? contrastRatio(composite(own, parent), parent) : 0;
    if (!border && own.a === 0) continue;
    if (Math.max(rb, rf) < T_.contrastUi) ctlLow.push(sel(e, { ratio: +Math.max(rb, rf).toFixed(2), parent: toHex(parent) }));
  }
  check('page.ctrl.contrast', 'Color and contrast', 'Control boundary contrast below 3:1', 'ui-contrast-1.4.11', ctlLow,
    mkO(`>= ${T_.contrastUi}:1 between control border/background and surroundings`, 'Use a #6B7280-class border (or darker) for form controls.', (i) => `${i.length} controls; ${i[0].sel} border/background ${i[0].ratio}:1 on ${i[0].parent}`), 'warn');
  // contrast items are stored for the post-pass (dark-only separation)
  const items = [], unknown = [];
  for (const e of txt.concat(els.filter((x) => x.interactive && !x.ownText && /^(input|select|textarea)$/.test(x.tag)))) {
    if (e.bgUnknown) { unknown.push({ sel: e.sel, reason: e.bgUnknown }); continue; }
    const bg = opaque(e.layers), fg = textColor(e, bg), ratio = contrastRatio(fg, bg), large = isLargeText(e.fs, e.fw);
    items.push({ sel: e.sel, text: e.text, thirdParty: e.thirdParty, fg: toHex(fg), bg: toHex(bg), ratio: +ratio.toFixed(2), required: large ? T_.contrastLargeText : T_.contrastText, fontSize: e.fs, large, key: e.sel + '|' + e.text });
  }
  return { contrastItems: items, unknown, bg: toHex(opaque(m.bodyLayers)) };
}

function contrastFindings(combo, darkOnly) {
  const fails = combo.contrast.contrastItems.filter((i) => i.ratio + 1e-9 < i.required);
  const keep = darkOnly ? fails.filter((f) => darkOnly.has(f.key)) : fails.filter((f) => !combo.skipKeys?.has(f.key));
  const t = { route: combo.route, viewport: combo.viewport, scheme: combo.scheme };
  const withFix = keep.map((f) => {
    const s = suggestColor(parseColor(f.fg), parseColor(f.bg), f.required);
    return { ...f, suggested: s ? toHex(s.rgb) : null, suggestedRatio: s ? +s.ratio.toFixed(2) : null };
  });
  return { keep: withFix, t };
}

// ---- driver --------------------------------------------------------------------------------------
async function run() {
  fs.mkdirSync(path.join(OUT, 'screenshots', 'focus'), { recursive: true });
  const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  const browser = await chromium.launch();
  const result = { meta: { url: BASE, date: new Date().toISOString(), viewports: T.viewports, schemes: SCHEMES, routes: ROUTES }, routes: [] };
  // Playwright storage state has no sessionStorage; an optional per-origin "sessionStorage" object in the file is replayed (never printed).
  const sessionByOrigin = {};
  if (STORAGE) for (const o of JSON.parse(fs.readFileSync(STORAGE, 'utf8')).origins || []) if (o.sessionStorage) sessionByOrigin[o.origin] = o.sessionStorage;
  const mkCtx = async (width, scheme, reduced) => {
    const ctx = await browser.newContext({ viewport: { width, height: HEIGHT }, colorScheme: scheme, reducedMotion: reduced, ...(STORAGE ? { storageState: STORAGE } : {}) });
    if (Object.keys(sessionByOrigin).length) {
      await ctx.addInitScript((map) => { const d = map[location.origin]; if (d) for (const k of Object.keys(d)) sessionStorage.setItem(k, d[k]); }, sessionByOrigin);
    }
    return ctx;
  };

  for (const route of ROUTES) {
    const slug = slugOf(route), url = new URL(route, BASE).href;
    const R = { route, slug, url, status: 'ok', measurements: [], unmeasured: [], findings: [] };
    FINDINGS = R.findings;
    const combos = [];
    try {
      for (const width of T.viewports) for (const scheme of SCHEMES) {
        const ctx = await mkCtx(width, scheme, 'no-preference');
        const page = await ctx.newPage(); page.setDefaultTimeout(TIMEOUT);
        page.on('dialog', (d) => d.dismiss());
        const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT });
        if (resp && resp.status() >= 400) throw new Error(`HTTP ${resp.status()} for ${url}`);
        let m = await page.evaluate(measurePage, { cap: 3000, thirdPartyRe: THIRD_PARTY.source, spacingBase: T.spacingBasePx, radiusFull: 999 });
        if (m.visibleText < 20) { await page.waitForTimeout(3000); m = await page.evaluate(measurePage, { cap: 3000, thirdPartyRe: THIRD_PARTY.source, spacingBase: T.spacingBasePx, radiusFull: 999 }); }
        if (m.visibleText < 20) throw new Error('page has no visible text (loading, error or blank state); not audited');
        if (/\/(login|signin|sign-in|auth)\b/i.test(new URL(page.url()).pathname) && !/login|signin|auth/i.test(route)) R.unmeasured.push({ what: 'route redirected to a login page', reason: `${route} is auth-gated; provide --storage-state` });
        const shotRel = `screenshots/${slug}-${width}-${scheme}.png`;
        await page.screenshot({ path: path.join(OUT, shotRel), fullPage: true });
        const tags = { route, viewport: width, scheme };
        const before = FINDINGS.length;
        const contrast = analyze(m, tags, shotRel);
        // axe
        await page.evaluate(axeSrc);
        const ax = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
        for (const v of ax.violations) {
          const nodes = v.nodes.map((n) => ({ sel: Array.isArray(n.target[0]) ? n.target[0].join(' ') : n.target.join(' '), text: (n.html || '').slice(0, 80), thirdParty: n.target.length > 1 || THIRD_PARTY.test(n.html || '') }));
          const own = nodes.filter((n) => !n.thirdParty), use = own.length ? own : nodes;
          mk(`axe.${v.id}`, 'Accessibility (axe)', own.length ? (['critical', 'serious'].includes(v.impact) ? 'fail' : 'warn') : 'warn', v.help + (own.length ? '' : ' (third-party)'), v.id, { items: use, evidence: `${use.length} nodes (${v.impact}); e.g. ${use[0].sel}`, expected: v.help, fix: `${v.description} See ${v.helpUrl}`, screenshot: shotRel, tags });
        }
        for (const p of ax.passes) mk(`axe.${p.id}`, 'Accessibility (axe)', 'pass', p.help, p.id, { items: [], evidence: `${p.nodes.length} nodes pass`, expected: p.help, fix: 'n/a', tags });
        const combo = { route, viewport: width, scheme, contrast, shot: shotRel, startIdx: before };
        combos.push(combo);
        R.unmeasured.push(...contrast.unknown.map((u) => ({ what: u.sel, reason: u.reason })));
        R.measurements.push({ viewport: width, scheme, elementsVisible: m.total, elementsMeasured: m.sampled, sampled: m.total > m.sampled, spacingOnScalePct: m.spacing.total ? +((m.spacing.on / m.spacing.total) * 100).toFixed(1) : null, bodyBg: contrast.bg, contrastChecked: contrast.contrastItems.length, contrastUnknown: contrast.unknown.length, fonts: m.fams.map(([f]) => f), weights: m.weights.map(([w]) => w), radii: m.radii.length, shadows: m.shadows.length });
        if (m.hasCanvas) R.unmeasured.push({ what: '<canvas> content', reason: 'canvas pixels are not inspectable' });

        if (width === T.viewports[T.viewports.length - 1] && scheme === 'light') {
          await focusTest(page, tags, slug);
          await hoverTest(page, tags);
        }
        await ctx.close();
      }
      // reduced motion runs
      for (const width of T.viewports) for (const scheme of SCHEMES) {
        const ctx = await mkCtx(width, scheme, 'reduce');
        const page = await ctx.newPage(); page.setDefaultTimeout(TIMEOUT);
        await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT });
        const bad = await page.evaluate(motionPage);
        const tags = { route, viewport: width, scheme, reducedMotion: 'reduce' };
        mk('page.motion.reduced', 'Motion', bad.length ? 'warn' : 'pass', 'Animation or transition still active under prefers-reduced-motion', 'reduced-motion', { items: bad.slice(0, 25).map((b) => ({ sel: b.sel, text: b.kind })), evidence: bad.length ? `${bad.length} elements still animate/transition, e.g. ${bad[0].sel} (${bad[0].kind})` : 'no active animation or transition > 0.01s', expected: 'animation none and transition-duration <= 0.01s when reduce is set', fix: 'Add @media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation: none !important; transition-duration: 0.01ms !important } }', tags });
        await ctx.close();
      }
      // post-pass: contrast + dark mode
      FINDINGS = R.findings;
      for (const width of T.viewports) {
        const light = combos.find((c) => c.viewport === width && c.scheme === 'light'), dark = combos.find((c) => c.viewport === width && c.scheme === 'dark');
        const lightFail = new Set(light.contrast.contrastItems.filter((i) => i.ratio + 1e-9 < i.required).map((i) => i.key));
        const darkOnly = new Set(dark.contrast.contrastItems.filter((i) => i.ratio + 1e-9 < i.required && !lightFail.has(i.key)).map((i) => i.key));
        for (const combo of [light, dark]) {
          const { keep, t } = contrastFindings(combo, null);
          const useKeep = combo.scheme === 'dark' ? keep.filter((k) => !darkOnly.has(k.key)) : keep;
          const own = useKeep.filter((k) => !k.thirdParty), third = useKeep.filter((k) => k.thirdParty);
          const fix = (k) => k.suggested ? `change ${k.sel} text from ${k.fg} to ${k.suggested} for ${k.suggestedRatio}:1 on ${k.bg}` : `adjust ${k.sel} colors to reach ${k.required}:1`;
          const base = { rule: 'contrast-1.4.3', category: 'Color and contrast' };
          if (own.length) mk('page.contrast.text', base.category, 'fail', 'Text contrast below WCAG AA', base.rule, { items: own, evidence: `${own.length} text elements fail; worst ${own.slice().sort((a, b) => a.ratio - b.ratio)[0].sel}: ${own.slice().sort((a, b) => a.ratio - b.ratio)[0].fg} on ${own.slice().sort((a, b) => a.ratio - b.ratio)[0].bg} = ${own.slice().sort((a, b) => a.ratio - b.ratio)[0].ratio}:1`, expected: '>= 4.5:1 body text, >= 3:1 large text (WCAG 1.4.3)', fix: fix(own.slice().sort((a, b) => a.ratio - b.ratio)[0]), screenshot: combo.shot, tags: t });
          else if (third.length) mk('page.contrast.text', base.category, 'warn', 'Text contrast below WCAG AA (third-party)', base.rule, { items: third, evidence: `${third.length} third-party elements fail`, expected: '>= 4.5:1', fix: 'Configure the third-party widget theme.', screenshot: combo.shot, tags: t });
          else mk('page.contrast.text', base.category, 'pass', 'Text contrast meets WCAG AA', base.rule, { items: [], evidence: `${combo.contrast.contrastItems.length} text elements measured, ${combo.contrast.unknown.length} unknown background`, expected: '>= 4.5:1 / 3:1 large', fix: 'n/a', tags: t });
        }
        // dark-mode checks
        const dt = { route, viewport: width, scheme: 'dark' };
        const darkKeep = contrastFindings(dark, darkOnly).keep;
        if (darkKeep.length) { const w = darkKeep.slice().sort((a, b) => a.ratio - b.ratio)[0]; mk('page.dark.contrast', 'Dark mode', 'fail', 'Contrast failures that appear only in dark mode', 'dark-contrast', { items: darkKeep, evidence: `${darkKeep.length} elements pass in light but fail in dark; worst ${w.sel}: ${w.fg} on ${w.bg} = ${w.ratio}:1`, expected: '>= 4.5:1 (3:1 large) in dark', fix: w.suggested ? `change ${w.sel} text from ${w.fg} to ${w.suggested} (${w.suggestedRatio}:1) in the dark token set` : 'Re-verify every dark token pair.', screenshot: dark.shot, tags: dt }); }
        else mk('page.dark.contrast', 'Dark mode', 'pass', 'No dark-only contrast failures', 'dark-contrast', { items: [], evidence: 'none', expected: 'n/a', fix: 'n/a', tags: dt });
        const same = light.contrast.bg === dark.contrast.bg;
        mk('page.dark.no-theme', 'Dark mode', same ? 'warn' : 'pass', 'Page background identical in light and dark schemes', 'dark-theme', { items: same ? [{ sel: 'body' }] : [], evidence: `light ${light.contrast.bg} vs dark ${dark.contrast.bg}`, expected: 'distinct dark surface', fix: 'Add a dark token set via prefers-color-scheme. (If the app uses a manual theme toggle, emulation cannot flip it; note that in the review.)', screenshot: dark.shot, tags: dt });
        mk('page.dark.pure-black', 'Dark mode', dark.contrast.bg === '#000000' ? 'warn' : 'pass', 'Pure #000000 page background in dark mode', 'dark-pure-black', { items: dark.contrast.bg === '#000000' ? [{ sel: 'body' }] : [], evidence: `dark background ${dark.contrast.bg}`, expected: 'surface between #0F172A and #1E293B', fix: 'Use #0F172A (not pure black) and lift elevated surfaces lighter.', screenshot: dark.shot, tags: dt });
      }
    } catch (err) {
      R.status = 'aborted'; R.error = String(err.message || err);
      console.error(`route ${route} aborted: ${R.error}`);
      R.findings = []; // partial results of an aborted route are discarded
      R.unmeasured.push({ what: route, reason: `route aborted: ${R.error}` });
    }
    result.routes.push(R);
    console.log(`route ${route}: ${R.status}, ${R.findings.filter((f) => f.severity !== 'pass').length} non-pass findings`);
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'page-scan.json'), JSON.stringify(result, null, 2));
  console.log(`audit_page: wrote ${path.join(OUT, 'page-scan.json')}`);
}

async function focusTest(page, tags, slug) {
  await page.evaluate(() => {
    const q = 'a[href],button,input:not([type=hidden]),select,textarea,[role=button],[tabindex]:not([tabindex="-1"]),summary';
    window.__base = new WeakMap();
    document.querySelectorAll(q).forEach((e) => { const s = getComputedStyle(e); window.__base.set(e, { os: s.outlineStyle, ow: s.outlineWidth, oc: s.outlineColor, bs: s.boxShadow }); });
    window.scrollTo(0, 0); if (document.activeElement) document.activeElement.blur();
  });
  const fails = [], lowRing = [], seen = new Set(); let tabs = 0;
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab'); tabs++;
    const info = await page.evaluate(() => {
      const e = document.activeElement; if (!e || e === document.body || e === document.documentElement) return null;
      const s = getComputedStyle(e), b = window.__base.get(e) || {}, r = e.getBoundingClientRect();
      const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
      const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${+(d[3] / 255).toFixed(3)})`; };
      const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
      const outlineChanged = outline && (s.outlineStyle !== b.os || s.outlineWidth !== b.ow || s.outlineColor !== b.oc);
      const shadowChanged = s.boxShadow !== 'none' && s.boxShadow !== b.bs;
      const sm = s.boxShadow.match(/(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)/);
      let ring = null; if (outlineChanged) ring = rgba(s.outlineColor); else if (shadowChanged && sm) ring = rgba(sm[0]);
      const layers = (el) => { const out = []; for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const c = rgba(getComputedStyle(n).backgroundColor); const a = parseFloat(c.match(/,\s*([\d.]+)\)$/)[1]); if (a > 0) { out.push(c); if (a === 1) return out; } } out.push('rgba(255, 255, 255, 1)'); return out; };
      let path = e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + [...e.classList].slice(0, 2).map((c) => '.' + c).join('');
      return { sel: path, text: (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().slice(0, 40), changed: outlineChanged || shadowChanged, ring, layers: layers(e.parentElement || e), rect: { x: r.x, y: r.y, w: r.width, h: r.height }, key: path + '@' + Math.round(r.x) + ',' + Math.round(r.y + window.scrollY) };
    });
    if (!info || seen.has(info.key)) break;
    seen.add(info.key);
    const clip = { x: Math.max(0, info.rect.x - 16), y: Math.max(0, info.rect.y - 16), width: Math.min(info.rect.w + 32, 600), height: Math.min(info.rect.h + 32, 200) };
    const rel = `screenshots/focus/${slug}-${tabs}.png`;
    try { await page.screenshot({ path: path.join(OUT, rel), clip }); } catch { /* element outside viewport clip */ }
    if (!info.changed) fails.push({ sel: info.sel, text: info.text, screenshot: rel });
    else if (info.ring) {
      const bg = opaque(info.layers), ring = parseColor(info.ring), r = contrastRatio(ring.a < 1 ? composite(ring, bg) : ring, bg);
      if (r < T.contrastUi) lowRing.push({ sel: info.sel, text: info.text, ratio: +r.toFixed(2), screenshot: rel });
    }
  }
  const sh = `screenshots/${slug}-${tags.viewport}-${tags.scheme}.png`;
  mk('page.focus.visible', 'Components and states', fails.length ? 'fail' : 'pass', 'Keyboard focus indicator not visible', 'focus-visible-2.4.7', { items: fails, evidence: fails.length ? `${fails.length} of ${seen.size} tab stops show no outline/box-shadow change; first ${fails[0].sel} (${fails[0].screenshot})` : `${seen.size} tab stops all show a focus change`, expected: 'visible 2px ring on every focusable element (WCAG 2.4.7)', fix: 'Add :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px } and never remove it without a replacement.', screenshot: fails[0]?.screenshot ?? sh, tags });
  mk('page.focus.contrast', 'Components and states', lowRing.length ? 'warn' : 'pass', 'Focus ring contrast below 3:1', 'focus-ring-contrast', { items: lowRing, evidence: lowRing.length ? `${lowRing.length} rings below 3:1; ${lowRing[0].sel} ${lowRing[0].ratio}:1` : 'all measured rings >= 3:1', expected: `>= ${T.contrastUi}:1 against surroundings`, fix: 'Use a ring colour with 3:1 against both the element and its background.', screenshot: lowRing[0]?.screenshot ?? sh, tags });
}

async function hoverTest(page, tags) {
  const handles = await page.$$('button:not([disabled]), a[href]');
  const props = ['color', 'backgroundColor', 'borderTopColor', 'boxShadow', 'transform', 'textDecorationLine', 'opacity'];
  const noChange = []; let tested = 0;
  for (const h of handles) {
    if (tested >= 15) break;
    if (!(await h.isVisible())) continue;
    await h.scrollIntoViewIfNeeded();
    const box = await h.boundingBox(); if (!box || box.width < 2 || box.height < 2) continue;
    const readStyles = () => h.evaluate((e, ps) => { const s = getComputedStyle(e); return { v: ps.map((p) => s[p]), sel: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + [...e.classList].slice(0, 2).map((c) => '.' + c).join(''), text: (e.innerText || '').trim().slice(0, 40) }; }, props);
    await page.mouse.move(0, 0); await page.waitForTimeout(120);
    const a = await readStyles();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(400);
    const b = await readStyles();
    tested++;
    if (a.v.join('|') === b.v.join('|')) noChange.push({ sel: a.sel, text: a.text });
  }
  await page.mouse.move(0, 0);
  const sh = `screenshots/${tags.route === '/' ? 'home' : slugOf(tags.route)}-${tags.viewport}-${tags.scheme}.png`;
  mk('page.hover.change', 'Components and states', noChange.length ? 'warn' : 'pass', 'Hover state gives no visual change', 'hover-state', { items: noChange, evidence: noChange.length ? `${noChange.length} of ${tested} tested links/buttons unchanged on hover; e.g. ${noChange[0].sel} ("${noChange[0].text}")` : `${tested} tested, all change on hover`, expected: 'color, background, border, shadow, transform, decoration or opacity changes', fix: 'Add a :hover style one tonal step darker/lighter than the default.', screenshot: sh, tags });
}

run().catch((e) => { console.error(e); process.exit(1); });
