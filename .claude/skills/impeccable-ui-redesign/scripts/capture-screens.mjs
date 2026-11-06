#!/usr/bin/env node
// Before/after full-page screenshots of every route. Logs in once, then GET navigation only.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const PHASE = opt('--phase');
if (!['before', 'after'].includes(PHASE)) { console.error('usage: capture-screens.mjs --phase before|after [--base-url u] [--out dir] [--routes a,b] [--max-pages n]'); process.exit(2); }
const BASE = (opt('--base-url', process.env.CRAWL_BASE_URL || '')).replace(/\/$/, '');
const OUT = path.resolve(opt('--out', 'reports/ui-redesign'));
const MAX = Number(opt('--max-pages', 50));
const USER = process.env.CRAWL_USER, PASS = process.env.CRAWL_PASSWORD;
const WIDTHS = [{ name: 'desktop', w: 1440, h: 900 }, { name: 'mobile', w: 390, h: 844 }];
const SKIP = /(logout|log-out|signout|sign-out|delete|reset|remove|clear|destroy)/i;

if (!BASE) { console.error('ERROR: set --base-url or CRAWL_BASE_URL'); process.exit(2); }
if (!USER || !PASS) { console.error('ERROR: set CRAWL_USER and CRAWL_PASSWORD environment variables (never pass them as arguments)'); process.exit(2); }
const host = new URL(BASE).hostname;
const priv = host === 'localhost' || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
if (!priv) { console.error(`ERROR: refusing non-local base URL (${host}). Only localhost and private addresses are allowed.`); process.exit(2); }

// Playwright: prefer a copy next to a sibling skill that already installed Chromium, else the repo's.
const here = path.dirname(fileURLToPath(import.meta.url));
const tryRequire = (base, mod) => { try { return createRequire(path.join(base, 'x.js'))(mod); } catch { return null; } };
const chromium = tryRequire(path.join(here, '../../ui-visual-audit'), 'playwright')?.chromium
  ?? tryRequire(process.cwd(), 'playwright')?.chromium ?? tryRequire(process.cwd(), '@playwright/test')?.chromium;
if (!chromium) { console.error('ERROR: Playwright not found. Run bash .claude/skills/ui-visual-audit/scripts/setup.sh or install @playwright/test.'); process.exit(2); }

const slugOf = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '').toLowerCase() || 'home');
const phaseDir = path.join(OUT, PHASE);
fs.mkdirSync(phaseDir, { recursive: true });

function routesFromContext() {
  const f = path.join(OUT, 'ui-context.json');
  if (!fs.existsSync(f)) return [];
  return [...new Set(JSON.parse(fs.readFileSync(f, 'utf8')).routes.map((r) => (r.startsWith('/') ? r : '/' + r)).filter((r) => !r.includes(':') && !r.includes('*')))];
}

const browser = await chromium.launch();
// log in once (the only form interaction this script performs)
const lctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const lp = await lctx.newPage();
await lp.goto(BASE + '/login', { waitUntil: 'networkidle' });
if (!(await lp.locator('input[type=password]:visible').count())) {
  const tab = lp.getByText(/^\s*password\s*$/i).first();
  if (await tab.count()) await tab.click();
}
await lp.locator('input[type=password]:visible').first().fill(PASS);
const userBox = lp.locator('input:visible:not([type=password]):not([type=hidden]):not([type=checkbox])').first();
await userBox.fill(USER);
const submit = lp.getByRole('button', { name: /sign in|log in|login|continue|submit/i }).first();
if (await submit.count()) await submit.click(); else await lp.keyboard.press('Enter');
try { await lp.waitForURL((u) => !/\/login/.test(u.pathname), { timeout: 15000 }); } catch { console.error('ERROR: login did not leave /login; check CRAWL_USER / CRAWL_PASSWORD and that the app is running.'); await browser.close(); process.exit(1); }
await lp.waitForLoadState('networkidle');
const sessionData = await lp.evaluate(() => Object.fromEntries(Object.entries(sessionStorage)));
const state = await lctx.storageState({ indexedDB: true });

// route list: explicit > before-manifest (so before/after match) > ui-context + discovered links
let routes;
const beforeManifest = path.join(OUT, 'before', 'manifest.json');
if (opt('--routes')) routes = opt('--routes').split(',').map((r) => r.trim());
else if (PHASE === 'after' && fs.existsSync(beforeManifest)) routes = JSON.parse(fs.readFileSync(beforeManifest, 'utf8')).routes.map((r) => r.route);
else {
  const found = await lp.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('?')[0].split('#')[0]));
  routes = [...new Set(['/', ...routesFromContext(), ...found])];
}
await lctx.close();
routes = routes.filter((r) => r !== '/login').slice(0, MAX);

const manifest = { phase: PHASE, baseUrl: BASE, date: new Date().toISOString(), widths: WIDTHS.map((w) => w.w), routes: [], skipped: [] };
const makeCtx = async (w) => {
  const ctx = await browser.newContext({ viewport: { width: w.w, height: w.h }, storageState: state });
  await ctx.addInitScript((d) => { for (const k of Object.keys(d)) sessionStorage.setItem(k, d[k]); }, sessionData);
  return ctx;
};
const ctxs = {};
for (const w of WIDTHS) ctxs[w.name] = await makeCtx(w);
for (const route of routes) {
  const entry = { route, slug: slugOf(route), status: 'ok', finalPath: null, files: { desktop: null, mobile: null, reduced: null }, reason: null };
  if (SKIP.test(route)) { entry.status = 'skipped'; entry.reason = 'destructive-looking route'; manifest.routes.push(entry); manifest.skipped.push({ route, reason: entry.reason }); continue; }
  try {
    for (const w of WIDTHS) {
      const page = await ctxs[w.name].newPage();
      const resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
      if (resp && resp.status() >= 400) throw new Error(`HTTP ${resp.status()}`);
      await page.waitForTimeout(700);
      entry.finalPath = new URL(page.url()).pathname;
      const f = `${entry.slug}-${w.w}.png`;
      await page.screenshot({ path: path.join(phaseDir, f), fullPage: true });
      entry.files[w.name] = f;
      if (w.name === 'desktop') {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForTimeout(300);
        const rf = `${entry.slug}-${w.w}-reduced-motion.png`;
        await page.screenshot({ path: path.join(phaseDir, rf), fullPage: true });
        entry.files.reduced = rf;
      }
      await page.close();
    }
    if (entry.finalPath !== route && !(route === '/' && entry.finalPath === '/')) entry.reason = `redirected to ${entry.finalPath}`;
  } catch (e) { entry.status = 'error'; entry.reason = String(e.message || e).split('\n')[0]; manifest.skipped.push({ route, reason: entry.reason }); }
  manifest.routes.push(entry);
}
await browser.close();
fs.writeFileSync(path.join(phaseDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`capture-screens (${PHASE}): ${manifest.routes.filter((r) => r.status === 'ok').length}/${manifest.routes.length} routes captured, ${manifest.skipped.length} skipped -> ${phaseDir}`);
