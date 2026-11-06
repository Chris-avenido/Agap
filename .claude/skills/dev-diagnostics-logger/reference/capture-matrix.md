# Capture matrix

Each row names a capture source, the API used, and the `verify.mjs` fault that proves it works.

## Browser

| Source | Catches | API | Proven by |
|---|---|---|---|
| Uncaught errors | script errors, `throw` in handlers/timers | `window` `error` listener, capture `true` | `frontend: throw` |
| Resource failures | failed `img`, `script`, `link` loads (tag + URL) | same listener (capture phase; these events do not bubble) | `resource-404 img`, `resource-404 script` |
| Unhandled rejections | promise rejections nobody handled | `unhandledrejection`, `rejectionhandled` | `unhandled-rejection` |
| CSP violations | blocked scripts/styles/connections | `securitypolicyviolation` | `csp-violation` |
| Console | `console.error` / `console.warn` from libraries, Mantine, React dev warnings | wrapped console methods (original called first) | `console.error` |
| HTTP | non-2xx, network failures, duration, size, `x-request-id` | wrapped `fetch` and `XMLHttpRequest` | `failed-fetch 500`, `failed-fetch network` |
| React render | caught/uncaught/recoverable render errors | `createRoot` callbacks, `DevErrorBoundary` | `react-render-crash` |
| TanStack Query | query and mutation failures | `QueryCache` / `MutationCache` `onError` | covered by app tests; not injected |
| Page exit | unsent entries | `pagehide`, `visibilitychange` + `sendBeacon` | every browser fault (entries arrive) |

## Browser performance

| Source | Threshold (config) | API | Proven by |
|---|---|---|---|
| Slow fetch | `slowFetchMs` | fetch/XHR hook | not injected (needs a slow endpoint) |
| Duplicate GET | `duplicateGetWindowMs` | fetch hook | `duplicate-fetch` |
| Request burst per route load | `requestsPerRouteLoad` | fetch hook + route breadcrumbs | not injected |
| Large payload | `payloadBytes` | `content-length` | not injected |
| Long task | `longTaskMs` | `PerformanceObserver('longtask')` | `long-task` |
| LCP / layout shift / INP | built-in limits | `PerformanceObserver` | not injected |
| Excess renders / slow commits | `excessiveCommitsPer5s`, `slowCommitMs` | `DevProfiler` | not injected |
| Heap growth | `heapGrowthMb` | `performance.memory` (Chromium only) | not injected |

## Backend

| Source | Catches | API | Proven by |
|---|---|---|---|
| Process crashes | uncaught exceptions | `uncaughtExceptionMonitor` | not injected (would stop the server) |
| Unhandled rejections | | `unhandledRejection` | `backend: unhandled-rejection` |
| Node warnings | deprecations, listener leaks | `warning` | observed in console log |
| Express errors | thrown and rejected handlers, route pattern, status | `devErrorMiddleware` (registered last) | `sync-throw`, `async-reject` |
| Slow requests / 5xx / big responses | `slowRequestMs`, `payloadBytes` | `devRequestMiddleware` | `slow-request` |
| Slow SQL | `slowQueryMs` | `instrumentPool` (`pool.query`, client `query`) | `slow-query` |
| N+1 | `nPlusOneRepeats` per request | query shape counter in `AsyncLocalStorage` | `n-plus-one` |
| Pool wait / exhaustion | waiting > 1 s | `pool.waitingCount`, connect timing | not injected |
| Event loop | `eventLoopP99Ms` | `monitorEventLoopDelay` | `event-loop-block` |
| Memory trend | `rssGrowthMb` / 5 min | `process.memoryUsage()` | not injected |
| pino | `warn` and above | `devPinoStream()` beside the existing destination | observed |

## Dev tooling and static analysis

| Source | Catches | How |
|---|---|---|
| Dev console | `Error:`, `TypeError`, `ECONNREFUSED`, `EADDRINUSE`, `Cannot find module`, `[vite] error`, deprecations, crash loops (3 restarts in 30 s), non-zero exit | `dev-runner.mjs` pipes `dev:raw` output; stacks joined into one entry |
| Vite | server errors and warnings, WebSocket errors | `devLogSink` wraps `server.config.logger` |
| Type errors | every `tsc` diagnostic | `tsc --noEmit --watch` per package -> `static.json` (`static: type error`) |
| Lint findings | unused code, hook deps, floating promises | `eslint -f json` or `oxlint -f json`, debounced -> `static.json` |

## What this cannot capture

"All errors" means all errors in the sources above, not literally every failure.

- Errors thrown before the logger loads. The bootstrap module must be the first import; earlier code is invisible.
- Cross-origin script errors, which browsers report only as `Script error.` unless the script has `crossorigin` and
  the server sends CORS headers.
- Native browser crashes, tab kills and out-of-memory kills. Only the dev runner sees a child exit code.
- Errors inside iframes of other origins.
- Anything in a production build. The layer is dev-only by design.
- Backend crashes that exit the process before `.logs/backend.jsonl` is flushed (the runner still records the exit).
- Heap measurements outside Chromium, and INP/LCP in browsers without those observers.
