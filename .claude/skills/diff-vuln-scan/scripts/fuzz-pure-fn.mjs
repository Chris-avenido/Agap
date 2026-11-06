#!/usr/bin/env node
// fuzz-pure-fn.mjs - run one exported function against hostile payloads in several timezones.
// Usage: node fuzz-pure-fn.mjs --module <path> --export <name> [--lang js|ts|py]
//          [--args-template '["$PAYLOAD"]'] [--tz Asia/Manila,UTC,America/Los_Angeles]
//          [--payloads <file>] [--timeout-ms 2000] [--compare <patched-module>] [--date-roundtrip]
// Exit: 0 ran (flags are reported), 1 --compare and patched still flagged, 2 usage error,
//       3 UNVERIFIED (no runner / module could not be loaded). Never installs or writes in the repo.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TMP = path.join(os.tmpdir(), 'diff-vuln-scan');

// ============================================================ child mode (JS runner)
// dispatch is at the bottom of the file so every const is initialised first

function expand(v) {
  if (typeof v === 'string') {
    if (v === '$$NaN') return NaN;
    if (v === '$$undefined') return undefined;
    if (v === '$$dateObject') return new Date(2026, 9, 27);
    let m = v.match(/^\$\$dateLocal:(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    return v;
  }
  if (Array.isArray(v)) return v.map(expand);
  if (v && typeof v === 'object') {
    if (typeof v.$repeat === 'string') return v.$repeat.repeat(v.count);
    const o = {};
    for (const [k, x] of Object.entries(v)) Object.defineProperty(o, k, { value: expand(x), enumerable: true, writable: true, configurable: true });
    return o;
  }
  return v;
}
const ymd = (y, m, d) => `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

async function childMain(jobFile) {
  const job = JSON.parse(fs.readFileSync(jobFile, 'utf8'));
  const out = (s) => fs.writeSync(1, s + '\n');
  let fn;
  try {
    const mod = await import(pathToFileURL(job.module).href);
    fn = job.export.split('.').reduce((o, k) => o?.[k], mod);
    if (typeof fn !== 'function') throw new Error(`export "${job.export}" is not a function`);
  } catch (e) {
    out('@@LOADERR ' + JSON.stringify(String(e && e.stack || e).slice(0, 600)));
    return;
  }
  for (const it of job.items) {
    out('@@START ' + it.name);
    const t0 = performance.now();
    const rec = { name: it.name };
    try {
      let r = fn(...expand(it.args));
      if (r && typeof r.then === 'function') r = await Promise.race([r, new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error('async timeout'), { name: 'AsyncTimeout' })), job.timeoutMs * 2))]);
      rec.ok = true;
      rec.isString = typeof r === 'string';
      if (r instanceof Date) {
        rec.dateLocal = isNaN(r) ? null : ymd(r.getFullYear(), r.getMonth() + 1, r.getDate());
        rec.dateUtc = isNaN(r) ? null : ymd(r.getUTCFullYear(), r.getUTCMonth() + 1, r.getUTCDate());
        rec.str = isNaN(r) ? 'Invalid Date' : r.toISOString();
      } else {
        try { rec.str = typeof r === 'string' ? r : (r === undefined ? 'undefined' : Number.isNaN(r) ? 'NaN' : JSON.stringify(r)); }
        catch { rec.str = String(r); }
        if (typeof rec.str !== 'string') rec.str = String(rec.str);
      }
      rec.str = rec.str.slice(0, 4_000_000);
    } catch (e) {
      rec.ok = false;
      rec.errClass = (e && e.name) || typeof e;
      rec.errMsg = String(e && e.message || e).slice(0, 200);
    }
    rec.ms = Math.round((performance.now() - t0) * 10) / 10;
    out('@@RESULT ' + JSON.stringify(rec));
  }
  out('@@DONE');
}

// ============================================================ parent mode
function usage(msg) { console.error('fuzz-pure-fn: ' + msg); process.exit(2); }

async function parentMain() {
  const a = process.argv.slice(2);
  const o = { module: null, export: null, lang: null, argsTemplate: '["$PAYLOAD"]', tz: 'Asia/Manila,UTC,America/Los_Angeles', payloads: path.join(HERE, '..', 'reference', 'hostile-payloads.json'), timeoutMs: 2000, compare: null, dateRoundtrip: false };
  for (let i = 0; i < a.length; i++) {
    const k = a[i], v = a[i + 1];
    if (k === '--module') { o.module = path.resolve(v); i++; }
    else if (k === '--export') { o.export = v; i++; }
    else if (k === '--lang') { o.lang = v; i++; }
    else if (k === '--args-template') { o.argsTemplate = v; i++; }
    else if (k === '--tz') { o.tz = v; i++; }
    else if (k === '--payloads') { o.payloads = path.resolve(v); i++; }
    else if (k === '--timeout-ms') { o.timeoutMs = Number(v); i++; }
    else if (k === '--compare') { o.compare = path.resolve(v); i++; }
    else if (k === '--date-roundtrip') o.dateRoundtrip = true;
    else usage('unknown argument ' + k);
  }
  if (!o.module || !o.export) usage('--module and --export are required');
  if (!fs.existsSync(o.module)) usage('module not found: ' + o.module);
  if (o.compare && !fs.existsSync(o.compare)) usage('--compare module not found: ' + o.compare);
  let template;
  try { template = JSON.parse(o.argsTemplate); if (!Array.isArray(template)) throw new Error('not an array'); } catch (e) { usage('--args-template must be a JSON array: ' + e.message); }
  const tzs = o.tz.split(',').map((s) => s.trim()).filter(Boolean);
  fs.mkdirSync(TMP, { recursive: true });

  // items: [{name, args(raw, markers unexpanded), payload(raw), intended?}]
  const sub = (t, p) => (t === '$PAYLOAD' ? p : Array.isArray(t) ? t.map((x) => sub(x, p)) : t && typeof t === 'object' ? Object.fromEntries(Object.entries(t).map(([k, x]) => [k, sub(x, p)])) : t);
  let items;
  if (o.dateRoundtrip) {
    const D = '2026-10-27';
    const list = [['isoDateOnly', D, D], ['mdy', '10/27/2026', D], ['dmy', '27/10/2026', D], ['isoWithZ', '2026-10-27T00:00:00.000Z', D], ['isoWithOffset', '2026-10-27T00:00:00+08:00', D], ['dateObjectLocal', '$$dateLocal:2026-10-27', D]];
    items = list.map(([name, payload, intended]) => ({ name, payload, intended, args: sub(template, payload) }));
  } else {
    let pj;
    try { pj = JSON.parse(fs.readFileSync(o.payloads, 'utf8')); } catch (e) { usage('cannot read payloads: ' + e.message); }
    items = Object.entries(pj).filter(([k]) => !k.startsWith('_')).map(([name, payload]) => ({ name, payload, args: sub(template, payload) }));
  }

  const runOne = (mod) => {
    const lang = o.lang || (mod.endsWith('.py') ? 'py' : /\.[cm]?tsx?$/.test(mod) ? 'ts' : 'js');
    const byTz = {};
    for (const tz of tzs) {
      const r = runChild(lang, mod, tz, items, o);
      if (r.unverified) { console.log('UNVERIFIED: ' + r.unverified); process.exit(3); }
      byTz[tz] = r.results;
    }
    return byTz;
  };

  const orig = runOne(o.module);
  const patched = o.compare ? runOne(o.compare) : null;
  const flagged = (byTz) => Object.fromEntries(Object.entries(byTz).map(([tz, rs]) => [tz, rs.map((r) => ({ ...r, flags: flagsFor(r, items.find((i) => i.name === r.name), o) }))]));
  const A = flagged(orig), B = patched && flagged(patched);

  const slim = (rec) => ({ name: rec.name, ok: rec.ok, value: rec.ok ? trunc(rec.isString ? rec.str : rec.str, 80) : undefined, error: rec.ok ? undefined : `${rec.errClass}: ${rec.errMsg}`, ms: rec.ms, flags: rec.flags });
  const outFile = path.join(TMP, `fuzz-${path.basename(o.module).replace(/\W+/g, '_')}-${o.export.replace(/\W+/g, '_')}-${Date.now()}.json`);
  const dump = (x) => Object.fromEntries(Object.entries(x).map(([tz, rs]) => [tz, rs.map(slim)]));
  fs.writeFileSync(outFile, JSON.stringify({ module: o.module, export: o.export, original: dump(A), patched: B ? dump(B) : null }, null, 1));

  // table: one row per payload that has a flag or (in compare) differs
  const names = items.map((i) => i.name);
  const cell = (byTz, name) => {
    const parts = [];
    for (const tz of tzs) { const r = byTz[tz].find((x) => x.name === name); if (r.flags.length) parts.push(`${short(tz)}:${r.flags.join('+')}`); }
    return parts.join(' ') || 'ok';
  };
  const rows = [];
  for (const n of names) {
    const ca = cell(A, n), cb = B ? cell(B, n) : null;
    if (ca !== 'ok' || (cb && cb !== 'ok')) rows.push(B ? [n, ca, cb] : [n, ca, brief(A, n, tzs)]);
  }
  console.log(`fuzz ${path.basename(o.module)}#${o.export}  payloads=${items.length} tz=${tzs.join(',')}${o.dateRoundtrip ? ' mode=date-roundtrip' : ''}`);
  if (rows.length) table(B ? ['payload', 'original', 'patched'] : ['payload', 'flags (tz:flag)', 'result/error'], rows);
  else console.log('no flags raised');
  const nOrig = names.filter((n) => cell(A, n) !== 'ok').length;
  const nPatch = B ? names.filter((n) => cell(B, n) !== 'ok').length : null;
  console.log(`flagged payloads: original=${nOrig}${B ? ` patched=${nPatch}` : ''}`);
  console.log(`json: ${outFile}`);
  process.exit(B && nPatch > 0 ? 1 : 0);
}

const short = (tz) => tz.split('/').pop();
const trunc = (s, n) => { s = String(s).replace(/[\u0000-\u001f]/g, (c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')); return s.length > n ? s.slice(0, n) + '…' : s; };
function brief(byTz, name, tzs) {
  const r = byTz[tzs[0]].find((x) => x.name === name);
  return r.ok ? '→ ' + trunc(r.str, 50) : `throws ${r.errClass}: ${trunc(r.errMsg, 40)}`;
}
function table(head, rows) {
  const w = head.map((h, i) => Math.min(60, Math.max(h.length, ...rows.map((r) => String(r[i]).length))));
  const line = (r) => '| ' + r.map((c, i) => String(c).padEnd(w[i]).slice(0, w[i])).join(' | ') + ' |';
  console.log(line(head)); console.log('|' + w.map((x) => '-'.repeat(x + 2)).join('|') + '|');
  rows.forEach((r) => console.log(line(r)));
}

// ---- flag evaluation (parent side, language independent)
const VALIDATION_MSG = /invalid|validation|must be|expected|not a valid|required|too (long|large)|out of range/i;
const UNEXPECTED = new Set(['TypeError', 'RangeError', 'AttributeError', 'KeyError', 'IndexError']);
function flagsFor(r, item, o) {
  const flags = [];
  if (!r.ok && r.errClass === 'AsyncTimeout') flags.push('SLOW');
  else if (!r.ok && UNEXPECTED.has(r.errClass) && !VALIDATION_MSG.test(r.errMsg || '')) flags.push('UNEXPECTED_THROW');
  if (r.killed || (r.ms ?? 0) > o.timeoutMs) flags.push('SLOW');
  if (r.ok && typeof item.payload === 'string' || (r.ok && item.payload && typeof item.payload === 'object' && typeof item.payload.$repeat === 'string')) {
    const p = typeof item.payload === 'string' ? item.payload : item.payload.$repeat.repeat(item.payload.count);
    if (!p.startsWith('$$')) {
      const s = r.str || '';
      const raw = r.isString ? s : s.replace(/\\u0000/g, '\u0000');
      if (p.includes('\u0000') && raw.includes('\u0000')) flags.push('PASSTHROUGH');
      else if (/^[=+\-@\t\r]/.test(p) && !o.dateRoundtrip && (r.isString ? s.startsWith(p[0]) && s.includes(p.slice(1, 12)) : s.includes(JSON.stringify(p).slice(1, 12)))) flags.push('PASSTHROUGH');
      else if (p.length >= 50000 && s.length >= p.length * 0.9) flags.push('PASSTHROUGH');
    }
  }
  if (o.dateRoundtrip && r.ok) {
    let got = null;
    if (r.dateLocal !== undefined) got = [r.dateLocal, r.dateUtc];
    else { const m = (r.str || '').match(/^"?(\d{4}-\d{2}-\d{2})/); if (m) got = [m[1], m[1]]; }
    if (got && got[0] !== item.intended && got[1] !== item.intended) flags.push('DATE_SHIFT');
    else if (got && got[0] !== got[1] && (got[0] !== item.intended || got[1] !== item.intended) && r.dateLocal !== undefined) flags.push('DATE_SHIFT');
  }
  return [...new Set(flags)];
}

// ---- child launch
function findUp(start, rel) {
  let d = start;
  for (;;) { const p = path.join(d, rel); if (fs.existsSync(p)) return p; const n = path.dirname(d); if (n === d) return null; d = n; }
}
function pickPython() {
  for (const cmd of process.platform === 'win32' ? ['python', 'python3', 'py'] : ['python3', 'python']) {
    const r = spawnSync(cmd, cmd === 'py' ? ['-3', '--version'] : ['--version'], { encoding: 'utf8' });
    if (r.status === 0 && /Python 3/.test(r.stdout + r.stderr)) return cmd === 'py' ? ['py', '-3'] : [cmd];
  }
  return null;
}
function pickTsRunner(mod) {
  const dir = path.dirname(mod);
  if (findUp(dir, 'node_modules/tsx/package.json')) return { flags: ['--import', 'tsx'], name: 'tsx' };
  if (findUp(dir, 'node_modules/ts-node/package.json')) return { flags: ['--loader', 'ts-node/esm'], name: 'ts-node' };
  const t = spawnSync(process.execPath, ['--experimental-strip-types', '-e', '0'], { encoding: 'utf8' });
  if (t.status === 0) return { flags: ['--experimental-strip-types', '--no-warnings'], name: 'strip-types' };
  return null;
}
function runChild(lang, mod, tz, items, o) {
  const job = { module: mod, export: o.export, timeoutMs: o.timeoutMs, items: items.map((i) => ({ name: i.name, args: i.args })) };
  const jobFile = path.join(TMP, `job-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`);
  fs.writeFileSync(jobFile, JSON.stringify(job));
  let cmd, args, cwd = path.dirname(mod);
  if (lang === 'py') {
    const py = pickPython();
    if (!py) return { unverified: 'no Python 3 interpreter available' };
    const harness = path.join(TMP, 'harness.py');
    fs.writeFileSync(harness, PY_HARNESS);
    [cmd, ...args] = [...py, harness, jobFile];
  } else {
    let flags = [];
    if (lang === 'ts') {
      const r = pickTsRunner(mod);
      if (!r) return { unverified: 'no TypeScript runner available' };
      flags = r.flags;
    }
    cmd = process.execPath; args = [...flags, fileURLToPath(import.meta.url), '--child', jobFile];
  }
  const total = o.timeoutMs * (items.length + 2) + 15000;
  const r = spawnSync(cmd, args, { cwd, env: { ...process.env, TZ: tz, PYTHONIOENCODING: 'utf-8', PYTHONDONTWRITEBYTECODE: '1' }, encoding: 'utf8', maxBuffer: 1024 * 1024 * 1024, timeout: total });
  try { fs.unlinkSync(jobFile); } catch { /* scratch only */ }
  const stdout = r.stdout || '';
  const results = [];
  let current = null;
  for (const line of stdout.split('\n')) {
    if (line.startsWith('@@LOADERR ')) return { unverified: `module could not be loaded (${lang}): ${JSON.parse(line.slice(10))}` };
    if (line.startsWith('@@START ')) current = line.slice(8);
    else if (line.startsWith('@@RESULT ')) { results.push(JSON.parse(line.slice(9))); current = null; }
  }
  if (!results.length && !stdout.includes('@@DONE')) return { unverified: `runner produced no results (${lang}, exit ${r.status}): ${(r.stderr || '').trim().slice(0, 300)}` };
  if (current) results.push({ name: current, ok: false, errClass: 'Killed', errMsg: 'process killed after timeout', killed: true, ms: total });
  const seen = new Set(results.map((x) => x.name));
  for (const i of items) if (!seen.has(i.name)) results.push({ name: i.name, ok: false, errClass: 'NotRun', errMsg: 'not executed (earlier payload hung)', ms: 0 });
  return { results };
}

const PY_HARNESS = `import sys, json, time, math, importlib.util, datetime, os
job = json.load(open(sys.argv[1], encoding="utf-8"))
sys.path.insert(0, os.path.dirname(job["module"]))
def out(s):
    sys.stdout.write(s + "\\n"); sys.stdout.flush()
def expand(v):
    if isinstance(v, str):
        if v == "$$NaN": return float("nan")
        if v == "$$undefined": return None
        if v == "$$dateObject": return datetime.date(2026, 10, 27)
        if v.startswith("$$dateLocal:"):
            y, m, d = v.split(":")[1].split("-"); return datetime.date(int(y), int(m), int(d))
        return v
    if isinstance(v, list): return [expand(x) for x in v]
    if isinstance(v, dict):
        if "$repeat" in v: return v["$repeat"] * v["count"]
        return {k: expand(x) for k, x in v.items()}
    return v
try:
    spec = importlib.util.spec_from_file_location("target_mod", job["module"])
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    fn = mod
    for part in job["export"].split("."): fn = getattr(fn, part)
    if not callable(fn): raise TypeError("export is not callable")
except BaseException as e:
    out("@@LOADERR " + json.dumps(("%s: %s" % (type(e).__name__, e))[:600])); sys.exit(0)
def dflt(o):
    if isinstance(o, (datetime.date, datetime.datetime)): return o.isoformat()
    return str(o)
for it in job["items"]:
    out("@@START " + it["name"])
    t0 = time.perf_counter(); rec = {"name": it["name"]}
    try:
        r = fn(*expand(it["args"]))
        rec["ok"] = True; rec["isString"] = isinstance(r, str)
        if isinstance(r, (datetime.date, datetime.datetime)):
            rec["dateLocal"] = rec["dateUtc"] = r.isoformat()[:10]; rec["str"] = r.isoformat()
        elif isinstance(r, str): rec["str"] = r
        else:
            try: rec["str"] = json.dumps(r, default=dflt)
            except Exception: rec["str"] = str(r)
        rec["str"] = rec["str"][:4000000]
    except BaseException as e:
        rec["ok"] = False; rec["errClass"] = type(e).__name__; rec["errMsg"] = str(e)[:200]
    rec["ms"] = round((time.perf_counter() - t0) * 1000, 1)
    out("@@RESULT " + json.dumps(rec))
out("@@DONE")
`;

if (process.argv[2] === '--child') await childMain(process.argv[3]);
else await parentMain();
