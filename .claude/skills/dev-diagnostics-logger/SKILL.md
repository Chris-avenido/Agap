---
name: dev-diagnostics-logger
description: "Installs a dev-only diagnostics layer in a repo so that `npm run dev` captures browser errors, backend errors, build/type/lint errors and performance inefficiencies (slow requests, slow SQL queries, N+1 queries, long tasks, excessive re-renders) into a git-ignored `.logs/` folder with a `LATEST.md` digest that an agent IDE can read. Use when the user says things like 'set up dev logging for this repo', 'make npm run dev show errors to my agent', 'add a dev error logger', 'capture runtime errors and slow queries when I run dev', or 'my agent can't see my console errors'. Dev-time only: do NOT use for production logging, production incident investigation, log shipping or alerting, or deep SQL tuning."
---

# dev-diagnostics-logger

Installs a local, dev-only diagnostics layer. `npm run dev` keeps starting the same servers, and in addition every
browser error, backend error, build/type/lint finding and measurable inefficiency is written to `.logs/`
(git-ignored), with `.logs/LATEST.md` as the one digest an agent reads first. It is additive by default, inert in
production, redacts secrets, and never throws. Hard constraints are in `rules.md`; read it before editing anything.

## Workflow

Run every script from the repo root. Paths are relative to this skill folder (`.claude/skills/dev-diagnostics-logger/`).
Execute the saved scripts and assets; never regenerate their code.

0. **Baseline.** Run `git status --short` and keep the output. Files that are already modified are the user's
   uncommitted work: do not touch them except for the single lines named in step 4.
1. **Detect.** `node scripts/detect-stack.mjs` prints JSON: package manager, workspaces, frontend and backend dirs,
   which of Vite/React/Express/Drizzle/pg/pino/TanStack Query/eslint/oxlint/tsc/vitest/Playwright exist (root
   dependencies included), the current `dev` script, and existing logger files. Do not re-implement detection.
2. **Resolve ambiguity with the user, only if needed** (two frontends, no backend, an existing logger). Default is
   additive: never overwrite or delete an existing logger.
   - *Backend application logger (pino etc.)*: always kept. The skill only adds a stream beside it.
   - *Existing browser logger*: keep it and install with `captureGlobals: false`, forwarding with `devLogger.ingest(...)`.
     Only when the user explicitly asks to **supersede** it, use `--supersede <file>` (step 3), then migrate the
     remaining call sites. Never delete production logging: keep the minimal production path (see `rules.md`).
3. **Install.** `node scripts/install.mjs --dry-run` (add `--frontend`, `--backend`, one `--supersede <file>` per old
   logger file), show the file list and the `package.json` diff, then run it without `--dry-run`. It:
   - copies assets into each package's `src/devtools/` (shared `sanitize.ts` into both; the pg instrument only with
     `pg`; the logger test template only with `vitest`);
   - copies `dev-runner.mjs` and `summarize-logs.mjs` to `tools/dev-diagnostics/` and writes `stack.json` there;
   - **detects whether the root `dev` script starts the backend.** If it does, the runner wraps that script
     unchanged. If it does not (a monorepo where `dev` starts only the frontend), the runner starts the frontend
     and the backend itself, so `.logs/backend.jsonl` fills; `dev:raw` keeps the original command;
   - creates `dev-diagnostics.config.json` if missing, renames `dev` to `dev:raw`, adds `logs:summary` and `logs:clear`;
   - adds `.logs/` to `.gitignore` and the pointer line to `AGENTS.md` (to `CLAUDE.md` only if it does not import it);
   - is idempotent (a second run says "Nothing to do"), exits non-zero on a conflict instead of overwriting, and
     prints which entry points are still unwired. `--refresh` re-applies updated assets over installed files;
     `--check-wiring` only reports and exits non-zero when something is missing.
4. **Entry-point edits** (small; the script cannot do these safely; make exactly these and nothing else):
   - *Frontend:* create `src/devtools/dev-bootstrap.ts` (`import { initDevDiagnostics } from './dev-logger';
     initDevDiagnostics();`) and add `import './devtools/dev-bootstrap';` as the FIRST import of the entry file; add
     `devLogSink()` to the Vite `plugins`; pass `reactRootErrorHandlers` to `createRoot` (React 19); use
     `devLogger.queryCacheOnError` / `mutationCacheOnError` in the existing caches; wrap the app in
     `DevErrorBoundary` (inside any existing boundary) and the root in `DevProfiler`; give `devLogger.setContextProvider`
     the signed-in user's **id and role only**.
   - *Backend:* create `src/devtools/dev-bootstrap.ts` (`initDevDiagnostics()`) and import it FIRST in the entry file;
     **wrap the pg pool with `instrumentPool()`** where it is created; mount `devRequestMiddleware()` right after the
     HTTP logger; **when pino is detected, add `devPinoStream()` as an extra stream beside the existing destination**
     (`pino.multistream([{ level: 'trace', stream: existing }, { level: 'warn', stream: devPinoStream() }])`; keep
     pretty-printing by using an in-process `pino-pretty` stream; keep every current destination); register
     `devErrorMiddleware` after the routes; **pass the pool**: `registerDevFaultRoutes(app, { pool })`, only when
     `NODE_ENV` is neither production nor test.
   - Edit existing files only on those lines (and the logger import lines when superseding). Run `git status --short`
     again afterwards and confirm the only differences from the baseline are the files you meant to touch.
5. **Coverage.** Read `reference/capture-matrix.md` and confirm each source for the detected layers is wired. If a
   source does not apply (no Drizzle, no pino, no Playwright), skip it and say so.
6. **Verify.** `node scripts/verify.mjs` (pass `--frontend-url`/`--backend-url` to use ports other than a developer's
   running servers; the check sets `PORT`, `VITE_PORT` and the proxy target). **A skipped check counts as a failure.**
   It checks the wiring, injects every fault, proves errors survive file rotation, greps for seeded secrets and for
   the production marker, and re-runs the installer. Fix every failure at the root cause (script, asset, entry edit
   or this file) and re-run until it passes.
7. **Smoke test.** Run `npm run dev` for 20 seconds: the same servers and ports must come up, and `.logs/LATEST.md`
   must exist. Stop it.
8. **Report** what was installed, what was skipped and why, what could not be verified, and a **"Behavior changes"**
   section that lists, plainly, anything that behaves differently from before the install: scripts changed
   (`dev` now runs the runner, what it starts), logging that went away or moved (never silently dropped), console
   output that changed, ports or environment variables used, files created outside `.logs/`, and limits (for example
   backend code cannot be tree-shaken, so it is guarded at runtime). If nothing changed, say "none".

## Using the digest later

Run `node tools/dev-diagnostics/summarize-logs.mjs` (or `npm run logs:summary`) instead of writing a log parser. The
sources rebuild it automatically: soon after an error, later (10 s) after a warning. Options: `--since ISO`,
`--level error|warn|all`, `--out path`, `--json`. The digest joins browser and backend entries on the request id,
puts 401/403 in their own group, treats a 401 followed by a successful refresh and retry as information, names the
first frame past the logger and the API client as "Called from", and says in the coverage section when the backend
(or pino, or the pg pool) is not captured. Use `reference/log-schema.md` for entry fields and
`reference/capture-matrix.md` for what each layer must capture.

## Acceptance criteria

All must pass, checked by `scripts/verify.mjs` and the commands below, never by rereading code:

- No check is skipped; each injected fault appears in the right `.jsonl` file within 10 seconds and in `LATEST.md`.
- Entry points are wired (bootstrap first, pino stream, pg pool instrumented, fault routes receive the pool).
- Past the size cap a file is rotated and the error still exists in `errors.jsonl`.
- A seeded fake secret (`password`, `Authorization: Bearer ...`, a JWT, `?token=` in a URL, a value from `.env`)
  appears nowhere under `.logs/`; a URL path such as `/api/schools/s-test-900001/designations` is not redacted.
- A failed request is one entry (not two), with request id, status, path, the sanitized response body and, for
  validation failures, the issue paths and messages; the digest shows it once.
- `npm run build` output contains zero occurrences of `__DEV_DIAGNOSTICS__`.
- The logger does not throw or hang on a circular object, a 5 MB string, a `Map`, a `DOMException`, an `Error` with
  `cause`, and an `AggregateError`.
- Running `install.mjs` a second time produces an empty diff; `npm run dev:raw` equals the original `dev` command.
- `.logs/` is git-ignored; the repo's own lint, typecheck, build and tests still pass.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using `scripts/verify.mjs` fault injection, a grep for seeded secrets across `.logs/`, a grep for `__DEV_DIAGNOSTICS__` in the production build output, and a second run of `install.mjs` to confirm idempotence, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
