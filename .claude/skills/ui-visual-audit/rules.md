# Hard rules

1. Read-only on the app's source code. Never edit, format, or delete project files during an audit. Writes go only to `ui-audit/`.
2. Only audit localhost, 127.0.0.1, or a staging URL the user explicitly names. Never audit a URL the user does not own or has not named.
3. Never click, submit, type, or accept dialogs in the browser. Navigate, scroll, hover, and press Tab only.
4. Never store or print credentials or session tokens. If a storage-state file is used, reference it by path only.
5. Never estimate a measured number. If the scripts cannot measure something, list it under "could not be measured".
6. Do not write new scanning or browser code; execute the saved scripts. If a script has a bug, fix the script and rerun.
7. Do not report a finding without evidence and a specific fix.
8. If the dev server was started by the skill, stop it when finished.

## Known failure modes to prevent

- Reporting contrast on text over images or gradients as a pass or fail. It must be unknown.
- Counting the same issue once per viewport instead of deduplicating.
- Flagging third-party widgets or iframes as the user's fault. Mark them third-party.
- Treating the sample hex values as mandatory. If the project has its own tokens, audit consistency with them and flag only contrast and scale violations.
- Auditing a loading, error, or blank state instead of the real page. Wait for networkidle and check that the page has visible text.
