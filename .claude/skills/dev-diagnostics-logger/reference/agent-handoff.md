# Agent handoff

## Pointer line

`install.mjs` appends exactly this line to `AGENTS.md` and `CLAUDE.md` (if the file exists and lacks it):

When troubleshooting or improving runtime behavior, read `.logs/LATEST.md` first (run `npm run logs:summary` to refresh it); raw entries are in `.logs/*.jsonl`.

If `CLAUDE.md` imports `AGENTS.md` (`@AGENTS.md`), the installer adds the line to `AGENTS.md` only. Nothing else from this skill goes into those files.

## How an agent uses the digest

1. Read `.logs/LATEST.md`. Run `npm run logs:summary` first if it may be stale.
2. Pick the highest-impact item: the newest error with the highest count, or the top-ranked inefficiency.
3. Find the file from the first in-repo stack frame (frames under `node_modules` are not yours).
4. Reproduce it. Raw entries with full payloads are in `.logs/browser.jsonl`, `backend.jsonl`, `console.jsonl`.
5. Fix at the root cause.
6. Re-run `npm run dev`, repeat the action, and confirm the entry's count stops increasing (the digest is rebuilt
   about 2 seconds after any new error).

The digest holds facts and measurements only. Interpretation is the agent's job.

## Claude Code, Google Antigravity, Cursor

All three read the same files. There is no tool-specific format. Some IDEs skip git-ignored paths when indexing. Do
not un-ignore `.logs/`: add `.logs/LATEST.md` to the IDE's allow list instead (for Cursor, a `.cursorignore`
negation such as `!.logs/LATEST.md`; for Antigravity and Claude Code, an explicit file read works without any
setting). If an IDE still cannot read it, attach `.logs/LATEST.md` to the chat manually.

## In the browser

`window.exportDevErrorReport({ format: 'markdown' })`, `copyDevErrorReport()` and `downloadDevErrorReport()` give the
same facts for the current tab without opening any file.
