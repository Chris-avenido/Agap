#!/usr/bin/env node
// Fault-injection check of the whole pipeline. Usage:
//   node verify.mjs [--frontend-url http://localhost:5173] [--backend-url http://127.0.0.1:3000] [--skip-build]
// A SKIPPED check counts as a failure. NOTE lines (for example "synthetic, not end-to-end") are informational.
// Starts `npm run dev`, injects faults, asserts each lands in the right file within 10 s and in LATEST.md,
// greps .logs/ for seeded secrets, greps production builds for the marker, re-runs the installer, then cleans up.
import { spawn, spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(process.argv.includes('--root') ? process.argv[process.argv.indexOf('--root') + 1] : '.');
const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d);
const config = JSON.parse(readFileSync(join(root, 'dev-diagnostics.config.json'), 'utf8'));
const stack = JSON.parse(readFileSync(join(root, 'tools/dev-diagnostics/stack.json'), 'utf8'));
const logDir = resolve(root, config.logDir);
const FRONT = arg('--frontend-url', 'http://localhost:5173');
const BACK = arg('--backend-url', 'http://127.0.0.1:3000');
const WAIT_MS = 10_000;
const results = [];
const record = (name, status, note = '') => {
  results.push({ name, status, note });
  console.log(`${status.padEnd(9)} ${name}${note ? `  (${note})` : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const readLines = (file) => {
  const p = join(logDir, file);
  return existsSync(p)
    ? readFileSync(p, 'utf8').split('\n').flatMap((l) => {
        try {
          return l.trim() ? [JSON.parse(l)] : [];
        } catch {
          return [];
        }
      })
    : [];
};
async function expectEntry(name, file, predicate, note = '') {
  const end = Date.now() + WAIT_MS;
  while (Date.now() < end) {
    if (readLines(file).some(predicate)) return record(name, 'PASS', note);
    await sleep(250);
  }
  record(name, 'FAIL', `no matching entry in ${file} within ${WAIT_MS / 1000}s`);
}
async function until(url, ms = 90_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (r.status < 500) return true;
    } catch {
      // not up yet
    }
    await sleep(1000);
  }
  return false;
}

// Seeded fake secrets. The real .env value is read into memory only to prove it is redacted.
const envValue = (() => {
  for (const name of ['.env', '.env.local', '.env.development']) {
    const file = join(root, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = /^\s*([A-Za-z_]\w*)\s*=\s*(.*)\s*$/.exec(line);
      const v = m?.[2]?.replace(/^["']|["']$/g, '');
      if (m && v && v.length >= 8 && /secret|token|pass|key|dsn|credential|url/i.test(m[1])) return v;
    }
  }
  return null;
})();
const SEEDS = {
  password: 'seedPassw0rd-Zq81',
  bearer: 'seedbearer.token.value99',
  jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJzZWVkIjoidmVyaWZ5In0.c2VlZHNpZ25hdHVyZQ',
  queryToken: 'seedQueryTok-4471',
  ...(envValue ? { envValue } : {}),
};
const leakPayload = {
  password: SEEDS.password,
  headers: { authorization: `Bearer ${SEEDS.bearer}` },
  note: `jwt ${SEEDS.jwt} url http://x/y?token=${SEEDS.queryToken}&page=2`,
  ...(envValue ? { fromEnv: `value ${envValue}` } : {}),
};

// ------------------------------------------------------------------ entry-point wiring
{
  const wiring = spawnSync(process.execPath, [join(skillDir, 'scripts/install.mjs'), '--check-wiring', '--root', root], { encoding: 'utf8' });
  const missing = wiring.stdout.split('\n').filter((l) => l.startsWith('MISSING')).map((l) => l.slice(8));
  record('entry points are wired (pino stream, pg pool, fault routes, bootstrap, boundary)', wiring.status === 0 ? 'PASS' : 'FAIL', missing.join('; '));
}

// ------------------------------------------------------------------ start dev
// Clear the contents, not the folder: an editor or watcher holding the folder open makes removing it fail on Windows.
if (existsSync(logDir)) for (const name of readdirSync(logDir)) rmSync(join(logDir, name), { recursive: true, force: true });
const portOf = (url) => new URL(url).port;
// Ports and the proxy target travel by environment so the check can run beside a developer's own servers.
const devEnv = { ...process.env, PORT: portOf(BACK), VITE_PORT: portOf(FRONT), API_PROXY_TARGET: BACK };
const dev = spawn('npm run dev', { cwd: root, env: devEnv, shell: true, stdio: 'ignore', detached: process.platform !== 'win32' });
const killDev = () => {
  try {
    if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(dev.pid), '/T', '/F'], { stdio: 'ignore' });
    else process.kill(-dev.pid, 'SIGTERM');
  } catch {
    // already stopped
  }
};
process.on('exit', killDev);
const tmpFiles = [];

try {
  const hasFront = Boolean(stack.frontendDir);
  const hasBack = Boolean(stack.backendDir);
  const upFront = hasFront ? await until(FRONT) : false;
  const upBack = hasBack ? await until(`${BACK}/health`, 90_000) : false;
  record('frontend dev server starts', !hasFront || upFront ? 'PASS' : 'FAIL', FRONT);
  record('backend dev server starts', !hasBack || upBack ? 'PASS' : 'FAIL', BACK);

  // -------------------------------------------------------------- backend faults
  if (hasBack && upBack) {
    const hit = (path, init) => fetch(`${BACK}/__dev/fault/${path}`, init).then((r) => r.json().catch(() => ({}))).catch(() => ({}));
    const idRes = await fetch(`${BACK}/__dev/fault/sync-throw`).catch(() => null);
    const faultRequestId = idRes?.headers.get('x-request-id') ?? null;
    await hit('validation-error');
    await hit('async-reject');
    await hit('unhandled-rejection');
    await hit('slow-request');
    const sq = await hit('slow-query');
    const np = await hit('n-plus-one');
    await hit('leak-secret', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(leakPayload) });
    await hit('event-loop-block');
    const has = (kind, text) => (e) => e.kind === kind && (!text || JSON.stringify(e).includes(text));
    await expectEntry('backend: sync-throw', 'backend.jsonl', has('express-error', 'Injected synchronous throw'));
    await expectEntry('backend: entry carries the response x-request-id', 'backend.jsonl', (e) => e.kind === 'express-error' && Boolean(faultRequestId) && e.requestId === faultRequestId);
    await expectEntry('backend: validation issues (paths and messages only) are logged with the response time', 'backend.jsonl', (e) => e.kind === 'express-error' && Array.isArray(e.details?.issues) && e.details.issues.length === 2 && e.details.issues[1].path === 'designations.1.personnelId' && e.details.issues[1].message === 'Invalid UUID' && !('code' in e.details.issues[1]) && e.details.responseTimeMs !== undefined);
    await expectEntry('backend: async-reject', 'backend.jsonl', has('express-error', 'Injected async rejection'));
    await expectEntry('backend: unhandled-rejection', 'backend.jsonl', has('rejection', 'Injected unhandled rejection'));
    await expectEntry('backend: slow-request', 'backend.jsonl', has('perf:slow-request'));
    if (sq.ok) await expectEntry('backend: slow-query', 'backend.jsonl', has('perf:slow-query'));
    else record('backend: slow-query', 'FAIL', 'fault route has no pool; pass { pool } to registerDevFaultRoutes');
    if (np.ok) await expectEntry('backend: n-plus-one', 'backend.jsonl', has('perf:n-plus-one'));
    else record('backend: n-plus-one', 'FAIL', 'fault route has no pool');
    await expectEntry('backend: leak-secret written', 'backend.jsonl', has('fault'));
    await expectEntry('backend: event-loop-block', 'backend.jsonl', has('perf:event-loop'));
    const pinoUsed = stack.backendDir && (function scan(d) { try { return readdirSync(d, { withFileTypes: true }).some((e) => e.name === 'node_modules' || e.name === 'devtools' ? false : e.isDirectory() ? scan(join(d, e.name)) : /\.(m?[jt]s|[jt]sx)$/.test(e.name) && /from\s+['"]pino['"]|require\(\s*['"]pino['"]/.test(readFileSync(join(d, e.name), 'utf8'))); } catch { return false; } })(join(root, stack.backendDir, 'src'));
    if (pinoUsed) await expectEntry('backend: pino stream (5xx request logged)', 'backend.jsonl', has('pino'));
    else record('backend: pino stream', 'PASS', 'not applicable: pino is declared but never imported in this repo');
  }

  // -------------------------------------------------------------- frontend faults
  if (hasFront && upFront) {
    let page = null;
    let browser = null;
    let mode = 'synthetic, not end-to-end';
    if (stack.playwright) {
      try {
        const pw = await import('playwright').catch(() => import('@playwright/test'));
        browser = await pw.chromium.launch();
        page = await browser.newPage();
        await page.goto(FRONT, { waitUntil: 'load' });
        await page.waitForTimeout(1500);
        mode = 'playwright';
      } catch (e) {
        record('playwright launch', 'NOTE', `falling back to synthetic entries: ${String(e.message).split('\n')[0]}`);
        page = null;
      }
    }
    const faults = [
      ['throw', 'WindowError', 'Injected throw', `setTimeout(() => { throw new Error('Injected throw'); }, 0)`],
      ['unhandled-rejection', 'UnhandledPromise', 'Injected rejection', `setTimeout(() => { void Promise.reject(new Error('Injected rejection')); }, 0)`],
      ['resource-404 img', 'ResourceError', '<img>', `{ const i = document.createElement('img'); i.src = '/__dev-missing.png'; document.body.append(i); }`],
      ['resource-404 script', 'ResourceError', '<script>', `{ const s = document.createElement('script'); s.src = '/__dev-missing.js'; document.body.append(s); }`],
      ['console.error', 'console', 'Injected console error', `console.error('Injected console error')`],
      ['failed-fetch 500', 'API', 'HTTP 500', `fetch('/__dev/fault/http-500', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ designations: [{ schoolId: 's-test-1', password: 'x' }] }) })`],
      ['failed-fetch 500 keeps the response body and request key names', 'API', '"injected"', `fetch('/__dev/fault/http-500', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ designations: [{ schoolId: 's-test-2' }] }) })`],
      ['path is not redacted', 'API', '/api/schools/s-test-900001/designations', `fetch('/api/schools/s-test-900001/designations', { method: 'PUT' })`],
      ['failed-fetch network', 'API', 'network error', `fetch('http://127.0.0.1:1/').catch(() => {})`],
      ['duplicate-fetch', null, null, `Promise.all([fetch('/__dev/fault/http-200'), fetch('/__dev/fault/http-200')])`, 'perf:duplicate-get'],
      ['long-task', null, null, `setTimeout(() => { const e = Date.now() + 300; while (Date.now() < e) {} }, 0)`, 'perf:long-task'],
      ['react-render-crash', 'ReactErrorBoundary', 'Injected render crash', `if (!window.__DEV_DIAG_CRASH__) throw new Error('DevErrorBoundary is not mounted'); window.__DEV_DIAG_CRASH__()`],
      ['csp-violation', 'CSP', 'CSP violation', `document.dispatchEvent(new SecurityPolicyViolationEvent('securitypolicyviolation', { blockedURI: 'https://blocked.example/x.js', effectiveDirective: 'script-src', violatedDirective: 'script-src', bubbles: true, composed: true }))`],
    ];
    for (const [name, context, text, code, kind] of faults) {
      if (page) {
        // Wrapped so statements (if/const) evaluate as one expression; a failed evaluation is reported, not swallowed.
        await page.evaluate(`(() => { ${code} })()`).catch((e) => record(`frontend: ${name} evaluate`, 'NOTE', String(e.message).split('\n')[0]));
      }
      else {
        let entry;
        if (name === 'path is not redacted') {
          const res = (await fetch(`${FRONT}/api/schools/s-test-900001/designations`, { method: 'PUT' }).catch(() => null)) ?? (await fetch(`${BACK}/api/schools/s-test-900001/designations`, { method: 'PUT' }).catch(() => null));
          const reqId = res?.headers.get('x-request-id') ?? 'syn-req-id';
          entry = { id: `syn-${name}`, ts: new Date().toISOString(), level: 'error', layer: 'browser', kind: 'http', context: 'API', message: 'PUT /api/schools/s-test-900001/designations failed with HTTP 401', fingerprint: `syn-${name}`, count: 1, details: { method: 'PUT', path: '/api/schools/s-test-900001/designations', status: 401, requestId: reqId, responseBody: { error: { code: 'UNAUTHENTICATED', message: 'Authentication is required.' } } } };
        } else if (name === 'failed-fetch 500 keeps the response body and request key names') {
          entry = { id: `syn-${name}`, ts: new Date().toISOString(), level: 'error', layer: 'browser', kind: kind ?? 'synthetic', context: context ?? 'Synthetic', message: `${text ?? name} (synthetic)`, fingerprint: `syn-${name}`, count: 1, details: { responseBody: { error: 'injected' }, requestKeyNames: ['designations'] } };
        } else {
          entry = { id: `syn-${name}`, ts: new Date().toISOString(), level: 'error', layer: 'browser', kind: kind ?? 'synthetic', context: context ?? 'Synthetic', message: `${text ?? name} (synthetic)`, fingerprint: `syn-${name}`, count: 1 };
        }
        await fetch(`${FRONT}/__dev/log`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'verify', entries: [entry] }) });
      }
      const match = kind ? (e) => e.kind === kind : (e) => e.context === context && JSON.stringify(e).includes(text);
      await expectEntry(`frontend: ${name}`, 'browser.jsonl', match, mode);
    }
    // One request, two layers: the browser entry's requestId (from the response header) must be on a backend entry.
    const crossLayer = readLines('browser.jsonl').find((e) => e.kind === 'http' && String(e.message).includes('/api/schools/s-test-900001/designations') && e.details?.requestId);
    if (hasBack && upBack) {
      if (crossLayer) await expectEntry('correlation: backend entry has the browser requestId', 'backend.jsonl', (e) => e.requestId === crossLayer.details.requestId);
      else record('correlation: backend entry has the browser requestId', 'FAIL', 'no browser entry with a requestId for the proxied API call');
    }
    // Seeded secrets through the real console hook (or synthetically).
    const leakText = JSON.stringify(leakPayload);
    if (page) await page.evaluate((t) => console.error(`leak ${t}`), leakText).catch(() => {});
    else await fetch(`${FRONT}/__dev/log`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'verify', entries: [{ ts: new Date().toISOString(), level: 'error', kind: 'synthetic', context: 'LeakTest', message: `leak ${leakText}`, details: leakPayload }] }) });
    await sleep(1500);
    await browser?.close();
  }

  // -------------------------------------------------------------- dev console / static analysis
  if (stack.frontendDir || stack.backendDir) {
    const dir = stack.frontendDir ?? stack.backendDir;
    const file = join(root, dir, 'src/__dev_diag_type_error.ts');
    tmpFiles.push(file);
    writeFileSync(file, 'export const devDiagTypeError: number = "not a number";\n');
    const end = Date.now() + 20_000;
    let ok = false;
    while (Date.now() < end && !ok) {
      await sleep(500);
      try {
        ok = JSON.stringify(JSON.parse(readFileSync(join(logDir, 'static.json'), 'utf8')).files).includes('__dev_diag_type_error');
      } catch {
        // not written yet
      }
    }
    record('static: type error reaches static.json', ok ? 'PASS' : 'FAIL', ok ? '' : 'not seen within 20 s (tsc watch may need a longer first compile)');
    rmSync(file, { force: true });
  }

  // -------------------------------------------------------------- digest
  // A failure whose first frames are the logger and the API client: the digest must name the real caller.
  const ts = new Date().toISOString();
  const frames = [
    'at DevLogger.logApiError (http://localhost:5173/src/devtools/dev-logger.ts:219:5)',
    'at request (http://localhost:5173/src/api/client.ts:122:19)',
    'at loadServerSchedule (http://localhost:5173/src/data/sync/personnelSync.ts:931:15)',
    'at applyServerOverlay (http://localhost:5173/src/features/workload/Workload.tsx:171:34)',
    'at commitHookEffectListMount (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js:16:3)',
  ];
  writeFileSync(join(logDir, 'browser.jsonl'), `${JSON.stringify({ id: 'syn-caller', sessionId: 'verify', ts, level: 'error', layer: 'browser', kind: 'http', context: 'API', message: 'GET /api/synthetic-caller failed with HTTP 500', fingerprint: 'syn-caller', count: 1, firstSeen: ts, lastSeen: ts, error: { name: 'ApiError', message: 'boom', stack: `ApiError: boom\n    ${frames.join('\n    ')}` }, details: { status: 500, path: '/api/synthetic-caller', requestId: 'req-syn' } })}\n`, { flag: 'a' });
  // A 401 that a refresh and retry then fixed is information, not a problem.
  {
    const at = Date.now();
    const iso = (ms) => new Date(at + ms).toISOString();
    const lines = [
      { id: 'syn-401', ts: iso(0), level: 'error', layer: 'browser', kind: 'http', context: 'API', message: 'GET /api/synthetic-recovered failed with HTTP 401', fingerprint: 'syn-401', count: 1, firstSeen: iso(0), lastSeen: iso(0), details: { method: 'GET', path: '/api/synthetic-recovered', status: 401, requestId: 'req-recovered' } },
      { id: 'syn-refresh', ts: iso(800), level: 'info', layer: 'browser', kind: 'auth-refresh', context: 'Auth', message: 'Session refreshed', fingerprint: 'syn-refresh', count: 1, firstSeen: iso(800), lastSeen: iso(800) },
    ];
    writeFileSync(join(logDir, 'browser.jsonl'), lines.map((l) => `${JSON.stringify(l)}\n`).join(''), { flag: 'a' });
  }
  await sleep(config.summaryDebounceMs + 1500);
  spawnSync(process.execPath, [join(root, 'tools/dev-diagnostics/summarize-logs.mjs')], { cwd: root });
  const latest = existsSync(join(logDir, 'LATEST.md')) ? readFileSync(join(logDir, 'LATEST.md'), 'utf8') : '';
  const sections = ['## 1. Session', '## 2. Errors', '## 3. Inefficiencies', '## 4. Static analysis', '## 5. Dev console problems', '## 6. Coverage'];
  const positions = sections.map((s) => latest.indexOf(s));
  const authLine = 'PUT /api/schools/s-test-900001/designations failed with HTTP 401';
  record('digest: the 401 appears once, under Auth problems, with path and response body',
    latest.split(authLine).length - 1 === 1 && latest.includes('### Auth problems (401/403)') && latest.includes('UNAUTHENTICATED') && /Request id: \S+/.test(latest) ? 'PASS' : 'FAIL',
    `occurrences ${latest.split(authLine).length - 1}`);
  const calledFrom = /- Called from: (.*)/.exec(latest.slice(latest.indexOf('/api/synthetic-caller')))?.[1] ?? '';
  record('digest: "Called from" skips logger, API-client and library frames', calledFrom.includes('personnelSync.ts:931') ? 'PASS' : 'FAIL', calledFrom.slice(0, 80));
  record('digest: a 401 followed by a successful refresh is information, not an error',
    latest.includes('expected token refreshes') && latest.includes('/api/synthetic-recovered') && !latest.includes('GET /api/synthetic-recovered failed with HTTP 401') ? 'PASS' : 'FAIL');
  record('digest: browser and backend entries are joined on the request id', !hasBack || !upBack || latest.includes('Same request, backend') ? 'PASS' : 'FAIL');
  record('LATEST.md has six sections in order', positions.every((p, i) => p > -1 && (i === 0 || p > positions[i - 1])) ? 'PASS' : 'FAIL');

  // -------------------------------------------------------------- retention: rotation keeps errors
  // Write past the cap, trigger an error, and expect the rotated file plus the error in errors.jsonl.
  const fillPastCap = (file) => {
    const line = `${JSON.stringify({ id: 'filler', ts: new Date().toISOString(), level: 'info', kind: 'filler', context: 'verify', message: 'x'.repeat(900) })}\n`;
    const chunk = line.repeat(1000);
    const target = join(logDir, file);
    while (!existsSync(target) || statSync(target).size <= config.maxFileBytes) appendFileSync(target, chunk);
  };
  if (hasFront && upFront) {
    fillPastCap('browser.jsonl');
    const entry = { id: 'rot-browser', ts: new Date().toISOString(), level: 'error', layer: 'browser', kind: 'error', context: 'RotationTest', message: 'rotation test error (browser)', fingerprint: 'rot-b', count: 1 };
    await fetch(`${FRONT}/__dev/log`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'verify', entries: [entry] }) });
    await expectEntry('retention: browser.jsonl was rotated past the cap', 'browser.jsonl.1', (e) => e.id === 'filler');
    await expectEntry('retention: the browser error survives in errors.jsonl', 'errors.jsonl', (e) => e.id === 'rot-browser');
  }
  if (hasBack && upBack) {
    fillPastCap('backend.jsonl');
    await fetch(`${BACK}/__dev/fault/log-error?tag=rotation`).catch(() => null);
    await expectEntry('retention: backend.jsonl was rotated past the cap', 'backend.jsonl.1', (e) => e.id === 'filler');
    await expectEntry('retention: the backend error survives in errors.jsonl', 'errors.jsonl', (e) => String(e.message).includes('retention test rotation'));
  }
  // The filler is test data: remove it so it cannot be mistaken for a real session.
  for (const name of ['browser.jsonl.1', 'backend.jsonl.1']) rmSync(join(logDir, name), { force: true });
} finally {
  killDev();
  for (const f of tmpFiles) rmSync(f, { force: true });
}
await sleep(1500);

// ------------------------------------------------------------------ secret grep
const allFiles = (dir) =>
  existsSync(dir) ? readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? allFiles(join(dir, n)) : [join(dir, n)])) : [];
const logText = allFiles(logDir).map((f) => readFileSync(f, 'utf8')).join('\n');
const leaked = Object.entries(SEEDS).filter(([, v]) => logText.includes(v)).map(([k]) => k);
record('no seeded secret appears under .logs/', leaked.length ? 'FAIL' : 'PASS', leaked.length ? `leaked: ${leaked.join(', ')}` : envValue ? 'incl. a real .env value' : 'no .env value available to test');

// ------------------------------------------------------------------ production builds
if (process.argv.includes('--skip-build')) record('production build has no marker', 'FAIL', '--skip-build was passed; the build check is required');
else {
  const build = spawnSync('npm run build', { cwd: root, shell: true, encoding: 'utf8' });
  if (build.status !== 0) record('production build has no marker', 'FAIL', 'npm run build failed');
  else {
    const hits = [];
    for (const d of [stack.frontendDir, stack.backendDir].filter(Boolean)) {
      for (const f of allFiles(join(root, d, 'dist'))) if (/\.(js|mjs|cjs|html|css)$/.test(f) && readFileSync(f, 'utf8').includes('__DEV_DIAGNOSTICS__')) hits.push(f);
    }
    record('production build has no marker', hits.length ? 'FAIL' : 'PASS', hits.slice(0, 3).join(', '));
  }
}

// ------------------------------------------------------------------ idempotence
const again = spawnSync(process.execPath, [join(skillDir, 'scripts/install.mjs'), '--dry-run', '--root', root], { encoding: 'utf8' });
record('second install run changes nothing', again.status === 0 && /Nothing to do/.test(again.stdout) ? 'PASS' : 'FAIL', again.status === 0 ? '' : again.stderr.split('\n')[0]);

const git = spawnSync('git status --porcelain .logs', { cwd: root, shell: true, encoding: 'utf8' });
record('.logs/ is git-ignored', git.stdout.trim() === '' ? 'PASS' : 'FAIL');

console.log('\n' + results.map((r) => `${r.status.padEnd(9)} ${r.name}`).join('\n'));
const failed = results.filter((r) => r.status === 'FAIL' || r.status === 'SKIPPED').length;
console.log(`\n${failed ? `${failed} check(s) FAILED or SKIPPED (a skip counts as a failure)` : 'All checks passed'}`);
process.exit(failed ? 1 : 0);
