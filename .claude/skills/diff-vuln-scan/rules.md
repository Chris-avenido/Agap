# diff-vuln-scan: hard rules

## Hard rules

1. **Read-only.** Never modify, create, patch or delete any file in the repo during a scan, including with `--fix` flags and formatters. Scratch files go only to the OS temp directory (`<tmpdir>/diff-vuln-scan/`).
2. **Applying fixes is a separate request.** Apply only when the user asks in a later message, only for the approved finding IDs, then run the repo's own targeted checks, then its full verification once. Stop after 3 failed repair attempts and report the error trace.
3. **Detect, never assume.** Stack, package manager, commands, layer layout, auth middleware names and standards files come from the repo. If something cannot be detected, say so and mark dependent findings `Unverified`.
4. **Concrete exploits only.** Every finding has an exact payload and a traced code path. If a path cannot be traced, mark it `Unverified`. No generic best-practice lists.
5. **The attacker calls the backend or function directly.** Client-side limits, disabled buttons and UI validation never count as a defense.
6. **Secrets.** Never print or quote secrets from env files or the diff; mask them (the manifest already masks assignments).
7. **No active testing.** Never run active scanners, touch production systems, or use the network.
8. **Never claim a fix works unless it was executed.** Date fixes must be executed under `UTC`, a positive-offset zone and a negative-offset zone (a fix that parses a local-time string and then reads UTC getters still shifts dates in positive-offset zones). Otherwise label it `Unverified fix`.
9. **Do not install packages.** If a runner or tool is missing, mark the dependent finding `Unverified`.
10. **Respect the repo's own agent rules** (`AGENTS.md`, `CLAUDE.md`, `.agents/rules`) for command style, token efficiency and safety. Where they conflict with this skill, the stricter rule wins. Use OS-appropriate command names (for example `npm.cmd` only on Windows), no polling or background task status checks, at most 6 command runs per scan, quiet reporter flags.
11. **Stay inside the diff.** Do not scan or report on files outside the diff, except direct callers and consumers needed to trace impact.
12. **Do not write new code files** to do what `collect-diff.mjs`, `fuzz-pure-fn.mjs` or `check-report.mjs` already do. Run the saved scripts.
13. **Do not edit any repo's `CLAUDE.md` / `AGENTS.md`** unless asked; if asked, add one line pointing to this skill.

## Known failure modes to prevent

- Reporting theoretical issues without payloads.
- Severity inflation: use the rubric in `reference/stack-checklist.md`, not instinct.
- Missing the read path of stored poisoned data (a value written once that breaks every later read).
- Proposing patches that were never executed.
- Fixing only the frontend; the backend must enforce the same limit.
- Rewriting whole files instead of minimal diffs.
- Hardcoding one repo's paths, commands or package manager.
- Overlapping with whole-repo scanners (secret scan, SAST, sqlmap, ZAP) or CI gates; point to those skills instead.
