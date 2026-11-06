#!/usr/bin/env node
// Verifies on the live pages: Plus Jakarta Sans is the only family (and really rendered), WCAG AA contrast, visible focus.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const BASE = (opt('--base-url', process.env.CRAWL_BASE_URL || '')).replace(/\/$/, '');
const OUT = path.resolve(opt('--out', 'reports/ui-redesign'));
const USER = process.env.CRAWL_USER, PASS = process.env.CRAWL_PASSWORD;
if (!BASE || !USER || !PASS) { console.error('ERROR: need --base-url (or CRAWL_BASE_URL) and CRAWL_USER / CRAWL_PASSWORD env vars'); process.exit(2); }
const host = new URL(BASE).hostname;
if (!(host === 'localhost' || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host))) { console.error('ERROR: only localhost/private addresses are allowed'); process.exit(2); }

const here = path.dirname(fileURLToPath(import.meta.url));
const tryRequire = (base, mod) => { try { return createRequire(path.join(base, 'x.js'))(mod); } catch { return null; } };
const chromium = tryRequire(path.join(here, '../../ui-visual-audit'), 'playwright')?.chromium ?? tryRequire(process.cwd(), 'playwright')?.chromium ?? tryRequire(process.cwd(), '@playwright/test')?.chromium;
if (!chromium) { console.error('ERROR: Playwright not found (see capture-screens.mjs).'); process.exit(2); }
let color;
try { color = await import(pathToFileURL(path.join(here, '../../ui-visual-audit/scripts/lib/color.mjs')).href); } catch { console.error('ERROR: needs .claude/skills/ui-visual-audit/scripts/lib/color.mjs for contrast math.'); process.exit(2); }
const { parseColor, composite, contrastRatio, isLargeText } = color;

let routes;
if (opt('--routes')) routes = opt('--routes').split(',').map((r) => r.trim());
else {
  const m = ['after', 'before'].map((p) => path.join(OUT, p, 'manifest.json')).find((f) => fs.existsSync(f));
  if (!m) { console.error('ERROR: no --routes and no manifest found; run capture-screens.mjs first'); process.exit(2); }
  routes = JSON.parse(fs.readFileSync(m, 'utf8')).routes.filter((r) => r.status === 'ok').map((r) => r.route);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const lp = await ctx.newPage();
await lp.goto(BASE + '/login', { waitUntil: 'networkidle' });
if (!(await lp.locator('input[type=password]:visible').count())) {
  const tab = lp.getByText(/^\s*password\s*$/i).first();
  if (await tab.count()) await tab.click();
}
await lp.locator('input[type=password]:visible').first().fill(PASS);
await lp.locator('input:visible:not([type=password]):not([type=hidden]):not([type=checkbox])').first().fill(USER);
const submit = lp.getByRole('button', { name: /sign in|log in|login|continue|submit/i }).first();
if (await submit.count()) await submit.click(); else await lp.keyboard.press('Enter');
await lp.waitForURL((u) => !/\/login/.test(u.pathname), { timeout: 15000 }).catch(() => { console.error('ERROR: login failed'); process.exit(1); });
await lp.waitForLoadState('networkidle');
const sessionData = await lp.evaluate(() => Object.fromEntries(Object.entries(sessionStorage)));
const state = await ctx.storageState({ indexedDB: true });
await ctx.close();
const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
await rctx.addInitScript((d) => { for (const k of Object.keys(d)) sessionStorage.setItem(k, d[k]); }, sessionData);

function measure() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${+(d[3] / 255).toFixed(3)})`; };
  const alpha = (c) => parseFloat(c.match(/,\s*([\d.]+)\)$/)[1]);
  const sel = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + [...e.classList].slice(0, 2).map((c) => '.' + c).join('');
  const layers = (el) => { const out = []; let unknown = null; for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== 'none') unknown = unknown || sel(n); const c = rgba(s.backgroundColor); if (alpha(c) > 0) { out.push(c); if (alpha(c) === 1) return { out, unknown }; } } out.push('rgba(255, 255, 255, 1)'); return { out, unknown }; };
  const rows = [];
  for (const e of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH'].includes(e.tagName.toUpperCase())) continue;
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    if (r.width <= 1 || r.height <= 1 || s.visibility !== 'visible' || s.display === 'none' || parseFloat(s.opacity) === 0) continue;
    let op = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity);
    const l = layers(e);
    rows.push({ sel: sel(e), tag: e.tagName.toLowerCase(), text: e.textContent.trim().slice(0, 30), family: s.fontFamily, fs: parseFloat(s.fontSize), fw: s.fontWeight, color: rgba(s.color), op, layers: l.out, unknown: l.unknown, mono: !!e.closest('code,pre,kbd,samp'), disabled: !!e.closest('[disabled],[aria-disabled=true],[data-disabled]') });
  }
  const faces = [...document.fonts].map((f) => ({ family: f.family.replace(/["']/g, ''), status: f.status }));
  return { rows, faces };
}

const result = { date: new Date().toISOString(), baseUrl: BASE, routes: [], summary: {} };
let fontFail = 0, contrastFail = 0, focusFail = 0;
for (const route of routes) {
  const page = await rctx.newPage();
  const R = { route, fontFailures: [], platformFonts: [], jakartaLoaded: false, contrastFailures: [], contrastUnknown: 0, textChecked: 0, focusFailures: [], error: null };
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);
    const m = await page.evaluate(measure);
    R.jakartaLoaded = m.faces.some((f) => /plus jakarta sans/i.test(f.family) && f.status === 'loaded');
    for (const r of m.rows) {
      const first = r.family.split(',')[0].replace(/["']/g, '').trim();
      const ok = /plus jakarta sans/i.test(first) || (r.mono && /mono/i.test(r.family));
      if (!ok) R.fontFailures.push({ sel: r.sel, family: r.family.slice(0, 80) });
      if (r.disabled) continue; // WCAG 1.4.3 exempts inactive controls
      if (r.unknown) { R.contrastUnknown++; continue; }
      R.textChecked++;
      let bg = parseColor(r.layers[r.layers.length - 1]);
      for (let i = r.layers.length - 2; i >= 0; i--) bg = composite(parseColor(r.layers[i]), bg);
      const fg = parseColor(r.color); fg.a *= r.op;
      const ratio = contrastRatio(fg.a < 1 ? composite(fg, bg) : fg, bg), req = isLargeText(r.fs, r.fw) ? 3 : 4.5;
      if (ratio + 1e-9 < req) R.contrastFailures.push({ sel: r.sel, text: r.text, ratio: +ratio.toFixed(2), required: req, fg: color.toHex ? color.toHex(fg) : r.color, bg: color.toHex ? color.toHex(bg) : null });
    }
    // what Chromium actually rendered (platform fonts) for one element per tag
    const cdp = await rctx.newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable'); await cdp.send('DOM.getDocument', { depth: 0 });
    const seenTags = new Set();
    for (const r of m.rows) {
      if (seenTags.has(r.tag) || seenTags.size >= 12) continue; seenTags.add(r.tag);
      try {
        const { result: obj } = await cdp.send('Runtime.evaluate', { expression: `[...document.body.querySelectorAll(${JSON.stringify(r.tag)})].find(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))` });
        if (!obj.objectId) continue;
        const { nodeId } = await cdp.send('DOM.requestNode', { objectId: obj.objectId });
        const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
        for (const f of fonts) { R.platformFonts.push({ tag: r.tag, family: f.familyName, custom: f.isCustomFont }); }
      } catch { /* element vanished */ }
    }
    const bad = R.platformFonts.filter((f) => !/plus jakarta/i.test(f.family) && !(f.tag === 'code' || f.tag === 'pre' || f.tag === 'kbd'));
    for (const b of bad) R.fontFailures.push({ sel: b.tag, family: `rendered as ${b.family}` });
    // focus visibility
    await page.evaluate(() => { window.__b = new WeakMap(); document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])').forEach((e) => { const s = getComputedStyle(e); window.__b.set(e, s.outlineStyle + s.outlineWidth + s.outlineColor + s.boxShadow); }); if (document.activeElement) document.activeElement.blur(); });
    const seen = new Set();
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const f = await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const now = s.outlineStyle + s.outlineWidth + s.outlineColor + s.boxShadow; const r = e.getBoundingClientRect(); return { sel: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + [...e.classList].slice(0, 2).map((c) => '.' + c).join(''), changed: now !== window.__b.get(e) && (s.outlineStyle !== 'none' || s.boxShadow !== 'none'), key: e.tagName + Math.round(r.x) + ',' + Math.round(r.y + scrollY) }; });
      if (!f || seen.has(f.key)) break; seen.add(f.key);
      if (!f.changed) R.focusFailures.push({ sel: f.sel });
    }
  } catch (e) { R.error = String(e.message || e).split('\n')[0]; }
  await page.close();
  if (!R.jakartaLoaded) R.fontFailures.push({ sel: 'document.fonts', family: 'Plus Jakarta Sans not reported as loaded' });
  fontFail += R.fontFailures.length; contrastFail += R.contrastFailures.length; focusFail += R.focusFailures.length;
  result.routes.push(R);
}
await browser.close();
result.summary = { routes: routes.length, fontFailures: fontFail, contrastFailures: contrastFail, focusFailures: focusFail, pass: fontFail === 0 && contrastFail === 0 };
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'verification-checks.json'), JSON.stringify(result, null, 2));
console.log(`font:     ${fontFail ? 'FAIL' : 'PASS'} (${fontFail} issues)`);
console.log(`contrast: ${contrastFail ? 'FAIL' : 'PASS'} (${contrastFail} elements below AA)`);
console.log(`focus:    ${focusFail ? 'WARN' : 'PASS'} (${focusFail} tab stops without visible change)`);
console.log(`-> ${path.join(OUT, 'verification-checks.json')}`);
process.exit(fontFail || contrastFail ? 1 : 0);
