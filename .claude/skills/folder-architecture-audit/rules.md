# Rules: folder-architecture-audit

## Hard rules
- Strictly read-only on the audited repo. Never create, edit, move, rename, delete or format files there. Never run `git add`, `git commit`, `git checkout`, `git stash`, or any migration, build, install or test command.
- Never read or print `.env` files, keys or tokens. If a secret appears in any file, mention only its path, never its value.
- Never connect to a database, production server or VM. Never use the network.
- Targeted reads only: use the inventory JSON first, then specific files or line ranges. Do not open whole directories or dump large files into context.
- Scratch output goes to the OS temp directory only.
- Do not recommend a restructure without citing a specific measured pain from this repo. Do not claim certainty about regressions or agent accuracy.
- Three failed attempts at the same step (for example a script erroring) means stop and report the blocker. Do not loop and do not poll.
- Recommendations describe changes; this skill never applies them.

## Known failure modes to prevent
- Scoring from impressions instead of the inventory numbers.
- Treating a small repo like an enterprise one and demanding full layering.
- Citing paths or line numbers that do not exist (run `check-report-paths.mjs`).
- Recommending large moves in one step. Moves go one feature at a time, with verification (`ci-gate`) between steps.
- Writing the report into the repo by default.
- Overlapping with ORM scoring, file splitting or UI audits instead of handing off.
