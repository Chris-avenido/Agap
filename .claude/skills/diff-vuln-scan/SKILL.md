---
name: diff-vuln-scan
description: "Scan a git diff (a commit, a range such as main..HEAD, staged changes or the working tree) in any repository for security vulnerabilities and functional errors, trace each change across the repo's layers (shared code, backend, frontend, database, exports, config), and offer concrete corrections as patches plus regression tests. Read-only. Use when the user says things like 'scan commit <sha> for vulnerabilities', 'security scan my latest diff', 'review this commit for bugs and security issues', 'scan the diff and suggest fixes', or '/diff-vuln-scan'. Scoped to changed code only; for whole-repo secret/SAST/sqlmap/ZAP scans use a dedicated security-testing skill, and for build/lint/test gates use a CI-gate skill."
---

# diff-vuln-scan

A diff-scoped, hostile-input, read-only security and error review that ends in corrections (patches plus regression tests), not just findings. It works in any git repository: it detects the stack, layers and commands instead of assuming them. Full analysis for JavaScript/TypeScript and Python; pattern-level analysis for Go, Java/Kotlin, PHP, Ruby, C#, SQL and shell. Anything that cannot be executed is labeled `Unverified`.

`<skill>` below means the folder containing this file. Scripts need Node 18+ and no packages.

## Workflow

1. **Resolve target.** Use the user's SHA, range (`A..B`), `staged` or `working`; default `HEAD` ("latest commit"). Do not ask if the target is given. Confirm the current directory is inside a git repo (`git rev-parse --show-toplevel`); if not, stop and say so.
2. **Detect the repo profile (one parallel batch).** Read, if present: `AGENTS.md`, `CLAUDE.md` (root and nested), `.agents/rules/`, `.claude/`, `CONTRIBUTING.md`, `SECURITY.md`, `README.md`, package manifests (`package.json`, `pyproject.toml`, `requirements.txt`, `go.mod`, `pom.xml`, `composer.json`, `Gemfile`, `*.csproj`) and `.diff-vuln-scan.json` (format: `reference/repo-config.md`). Determine languages, frameworks, package manager, test/lint commands, layer layout, auth middleware names and any hard rules the repo states. Never assume a stack the repo does not show.
3. **Find standards files.** If the user named one (for example "the consultant file", "our security rules"), search the repo for it by name and keywords. If none is named, look in `docs/`, `SECURITY.md` and rule files. If a named file is not found, say so plainly and fall back to what exists. Never invent contents of a file you could not find. Cite file and section for every standards cross-reference.
4. **Collect the diff.** Run `node <skill>/scripts/collect-diff.mjs --target <target>` from inside the repo. It writes a JSON manifest to the OS temp directory (files with added/removed lines and numbers, layer, `riskHits`, `repoProfile`, `baselineStatusHash`) and prints a short summary. Do not write new git-parsing code.
5. **Triage.** Rank changed files by layer risk (trust boundaries first: request handlers, validation schemas, DB access and migrations, auth, file/process/network access, user-input UI, exports) and by `riskHits`.
6. **Targeted reads.** Search first, then read only the changed functions and their direct callers/consumers, in 150-250 line windows. Issue 3 to 6 independent reads or searches in parallel per turn; never re-read an unmodified file already in context. Trace each change end to end: input boundary -> validation -> business logic -> storage -> read path -> UI/export.
7. **Hostile-input analysis.** For every changed function, route, schema and input, assume an attacker bypasses any client and calls the backend or function directly with null bytes, oversized strings, wrong types (number, boolean, object, array, `__proto__`), extra keys and previously stored poisoned data. Read `reference/stack-checklist.md` and walk the categories that fit the detected stack.
8. **Confirm with execution.** For pure functions changed in the diff (JS/TS or Python), run `node <skill>/scripts/fuzz-pure-fn.mjs --module <file> --export <name> [--args-template '[...]'] [--date-roundtrip]` (timezone matrix plus hostile payloads). Mark each finding `Confirmed (executed)`, `Confirmed (traced)` with `path:line` evidence, or `Unverified` with the reason.
9. **Error pass.** Look for regressions in the diff itself: removed checks, changed defaults, off-by-one, swallowed errors, type holes (`any`, casts, ignore-comments), client/server limit mismatches, and violations of rules in the standards files. Optionally run the repo's own targeted lint or type check on changed files only, read-only (no `--fix`, no formatters, no full builds), using the commands detected in step 2.
10. **Corrections.** For each finding write the smallest unified-diff patch plus a regression test in the repo's existing test framework and style. Validate every patch by copying the original and patched function into a scratch folder under the OS temp directory (never in the repo) and running `node <skill>/scripts/fuzz-pure-fn.mjs --module <orig> --compare <patched> --export <name>`. A patch that was not executed is labeled `Unverified fix`.
11. **Write the report** from `<skill>/assets/report-template.md` into the OS temp directory (or to `docs/security-scans/<short-sha>-diff-scan.md` only if the user asks), then run `node <skill>/scripts/check-report.mjs --report <file> --target <target> --manifest <manifest>` and fix every error it prints.
12. **Return the report in chat** plus a short list of what could not be verified. Offer "Apply approved fixes?" and stop. Applying is a separate explicit user request (see `rules.md`).

**Steps 4, 8 and 11 run the saved scripts directly.** Do not write new code to parse diffs, fuzz functions or check reports.

## Reference files

- Read `reference/stack-checklist.md` in step 7.
- Read `reference/repo-config.md` in step 2 only if a `.diff-vuln-scan.json` exists.
- Read `reference/risk-patterns.json` and `reference/hostile-payloads.json` only when extending or debugging the scripts.
- Read `rules.md` for hard constraints (read-only, no installs, no network, command budget, failure modes).

## Acceptance criteria

- Every finding has: ID (`SEC-nn` security, `ERR-nn` functional), layer, severity, CWE, a `path:line` that exists at the scanned ref, a concrete exploit payload or failing input, evidence level, and a correction.
- Negative results are listed under "Checked and clean" with the reason (for example "regex X has no nested quantifiers, so no ReDoS").
- Zero files in the repo were modified (`check-report.mjs` compares `git status --porcelain` against the baseline hash recorded by `collect-diff.mjs`).
- Every proposed patch was executed in scratch or is labeled `Unverified fix`.
- Standards cross-references cite a real file and section, or state that the file was not found.
- Nothing in the report assumes a stack, path or command that was not detected in step 2.
- `check-report.mjs` exits 0.

## Verification step

Before returning the final output, define the acceptance criteria. Create the first version, inspect it using scripts/check-report.mjs plus executed fuzz/repro runs of every proposed fix, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
