# dev-diagnostics-logger hard rules

## Hard rules

- **Dev-only capture, minimal production path.** Capture, buffering, breadcrumbs, persistence, transport and every
  other installed code path are inert outside development: frontend code is guarded by `import.meta.env.DEV`;
  backend code by `NODE_ENV !== 'production'` at runtime (backend output cannot be tree-shaken, so the guard is
  the only protection; it carries no marker). The marker `__DEV_DIAGNOSTICS__` must never appear in production
  build output (hidden source maps contain source text and are never served). The one thing that stays in
  production is the minimal path: the frontend logger's `warn` and `error` still write to the console, with secrets
  redacted, and nothing else. State both limits in the final report.
- **Never turn off existing production logging.** A logger being replaced keeps its production `warn`/`error`
  console output; the backend's application logger (pino etc.) and its destinations are never removed, replaced or
  reconfigured away; the skill only adds a stream beside them.
- **Secrets.** Never print, store or commit secrets. Never read `.env` values into any log: values are loaded into
  memory only, to build the redaction list. Everything under `.logs/` goes through `sanitize`; `.logs/` stays
  git-ignored. URL paths and the `path`/`url`/`route` fields are locations, not secrets: they are never redacted by
  the long-string rules (credentials inside them, such as `?token=`, still are).
- **Never throw or recurse.** The logger must not throw, recurse, block the main thread or change application
  behavior. Wrap every hook in try/catch, guard re-entrancy, and ignore its own traffic.
- **Additive by default; touch only what is needed.** Never delete or overwrite an existing logger, `vite.config`,
  entry file or `dev` script behavior on your own initiative. `dev:raw` stays equal to the original `dev` command.
  In existing files, edit only the lines named in SKILL.md step 4 and, when superseding, the logger import lines.
- **Uncommitted user work is not yours.** Run `git status --short` before and after. Files that were already
  modified before you started are the user's: do not reformat, revert, stash or rewrite them; change only the single
  lines you must (an import, one call). Never `git checkout`, `git stash` or `git reset` anything you did not create.
- **Supersede only on explicit instruction** (`install.mjs --supersede <file>`: rewrites imports, deletes only the
  files named). Migrate the remaining call sites by hand, then run the repo's typecheck, lint and tests.
- **Ignores stay narrow.** If a lint or design-hook finding is a false positive on a fixture, add at most one
  suppression, scoped to that one named file and rule, and say so in the report. Never disable a rule globally,
  never ignore a whole directory, never weaken a check to get green.
- **No production contact.** Never connect to or touch a production database or VM. The pg instrument wraps only
  the local pool in the running dev process.
- **Facts only.** The digest states facts and measurements, never diagnoses or fixes. Perf numbers measured in a dev
  build are labelled as such.
- **Localhost only.** The sink and the fault routes bind to localhost, refuse other `Host` headers, and are never
  registered in production or tests.
- **No new UI.** Keep the app's visual direction. The skill adds no visible interface.

## Known failure modes to prevent

- Logger imported after other code, so early errors are lost (the bootstrap module must be the first import).
- The `fetch` hook logging its own transport request in an infinite loop.
- Debug noise evicting error entries (separate buffers; errors also go to `errors.jsonl`).
- One failed request logged twice (fetch hook and the API client's own error log): merge by request id.
- Redacting URL paths, ids or `queryKey` fields while missing JWTs and secrets in messages and stacks.
- Unbounded log growth (rotate at the cap, check at startup, rate-limit perf entries per fingerprint).
- A 401 that a refresh and retry immediately fixes being reported as a problem.
- The `dev` wrapper breaking colors, prompts or Ctrl+C; or starting only the frontend so the backend is not captured.
- Double installation duplicating hooks; two loggers patching `console`, `fetch` and `window` at once.
- Browser console output echoed by the dev server being captured a second time as a dev-console problem.
- Reporting first frames that belong to the logger or the API client instead of the real caller.
- A verification that skips checks and still reports success.
- Running `npm ci` or deleting `node_modules` as part of verification while a dev server or IDE holds files open.
