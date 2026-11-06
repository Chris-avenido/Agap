# Log schema

## Files in `.logs/`

| File | Written by | Content |
|---|---|---|
| `LATEST.md` | `summarize-logs.mjs` | the digest an agent reads first |
| `latest.json` | `summarize-logs.mjs --json` | the same data, machine-readable |
| `errors.jsonl` | Vite sink, backend, runner | every `error`-level entry, in its own file (cap `maxErrorsFileBytes`) so rotating busy files never loses an error |
| `browser.jsonl` | Vite sink (`POST /__dev/log`) | browser entries |
| `backend.jsonl` | `devLog` in the backend process | backend entries |
| `console.jsonl` | `dev-runner.mjs`, Vite logger hook | dev tooling problems |
| `console.log` | `dev-runner.mjs` | every dev output line, ANSI stripped, redacted |
| `static.json` | `dev-runner.mjs` | latest tsc + lint snapshot (replaced, not appended) |
| `session.json` | `dev-runner.mjs` | session id, start time, branch, commit, node, ports |
| `previous/<timestamp>/` | `dev-runner.mjs` | prior sessions, last 3 kept |

Rotation: a `.jsonl` / `.log` file larger than `maxFileBytes` (5 MB; `maxErrorsFileBytes` for `errors.jsonl`) is
renamed to `<file>.1`, replacing any older `.1`. The size is checked on every append and once at startup.
Perf entries are rate-limited per fingerprint (`perfRateLimit`: `perFingerprint` per `windowMs`). Everything is sanitized before it is written.

## Entry (one JSON object per line)

| Field | Type | Notes |
|---|---|---|
| `id` | string | unique |
| `sessionId` | string | the runner sets `DEV_DIAG_SESSION`; processes started by it share it |
| `ts` | ISO string | when written |
| `level` | `debug` `info` `warn` `error` | |
| `layer` | `browser` `backend` `console` | |
| `kind` | string | (also `auth-refresh`: an info entry for each successful token refresh; the digest uses it to recognise a recovered 401) |
| `kind` (values) | string | `error`, `http`, `resource`, `csp`, `rejection`, `console`, `express-error`, `db-error`, `init`, or `perf:<name>` |
| `context` | string | for example `WindowError`, `API`, `Database`, `Request` |
| `message` | string | sanitized, truncated |
| `fingerprint` | 8 hex chars | see below |
| `count`, `firstSeen`, `lastSeen` | number, ISO, ISO | identical consecutive entries are collapsed |
| `error` | `{name, message, stack?, cause?, errors?}` | `cause` recursive (depth 3), `errors` for `AggregateError` |
| `details` | any | sanitized payload |
| `route` | string | path + query **keys** only, never values |
| `requestId` | string | backend, from `x-request-id` or generated |
| `durationMs` | number | for timed events |
| `devMode` | boolean | perf entries only: measured in a dev build, so durations include dev-mode overhead |
| `userAgent`, `viewport`, `online`, `build`, `user{id,role}` | | browser only; never email or tokens |
| `breadcrumbs` | `[{ts,type,message}]` | browser warn/error: last 30 (route, click by testid/role/aria-label, fetch, console, log) |
| `droppedBefore` | number | browser entries lost because the sink was unreachable |

Examples

```json
{"layer":"browser","kind":"http","level":"error","context":"API","message":"GET /api/schools failed with HTTP 500","fingerprint":"3fa9c1d2","count":1,"durationMs":212,"route":"/schools","details":{"method":"GET","path":"/api/schools","status":500,"requestId":"req-9"}}
{"layer":"backend","kind":"perf:slow-query","level":"warn","context":"Database","message":"Slow query (412 ms): select ... where id = ?","fingerprint":"a01b77e0","durationMs":412,"requestId":"req-9","details":{"paramCount":1,"rowCount":1}}
{"layer":"console","kind":"error-line","level":"error","context":"dev-runner","message":"Error: Cannot find module './x'","fingerprint":"9c2e4410"}
```

## Fingerprint

`FNV-1a 32-bit(layer | context | normalized message | top 3 stack frames)`, hex, 8 chars. Normalization replaces UUIDs
with `U` and digit runs with `N`, caps the message at 300 characters, and strips `:line:col` from frames. The same
function (`hash32` / `fingerprintOf` in `sanitize.ts`) runs in browser and Node so fingerprints agree.

## `static.json`

```json
{ "generatedAt": "...", "sources": { "tsc": { "active": true, "packages": ["apps/frontend"] }, "lint": { "active": true, "tool": "eslint" } },
  "files": { "apps/frontend/src/x.ts": [ { "source": "tsc", "rule": "TS2322", "severity": "error", "line": 3, "column": 7, "message": "..." } ] } }
```

## `LATEST.md` section order (fixed)

1. Session (id, start, git branch and commit, Node, ports, counts)
2. Errors, newest first (count, first/last seen, layer, route or request id, message, top 10 frames, cause chain,
   sanitized payload, last 10 breadcrumbs)
3. Inefficiencies, ranked by impact (total time, else count x duration)
4. Static analysis (type errors, then lint errors, then warnings; capped at 50 with the total)
5. Dev console problems
6. Coverage (which sources were active and which were not)

The file is capped near 400 lines; when something is cut, the file says what.
