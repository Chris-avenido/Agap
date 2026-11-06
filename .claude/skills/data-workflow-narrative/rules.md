# Hard rules (data-workflow-narrative)

These apply at every step. If a rule blocks the task, stop and tell the user; do not work around it.

## Never

- **Edit application code, schema, migrations, config or `.env` files.** Read-only. Never print or copy secrets. The only files written are inside the output folder (default `docs/data-workflow/`).
- **Connect to any database**, production or otherwise. Never start the app, run migrations, or run tests.
- **Claim a bug without `file:line` and quoted evidence.** If it is only suspected, label it `Suspected` and say what runtime check would confirm it.
- **Fix code in this run.** The deliverable is the report. Fixes are a separate session driven by `FINDINGS.md`.
- **Write the narrative for programmers.** Non-programmer audience: short sentences, business words first, no code blocks.
- **Duplicate other skills.** No load plans or Mermaid readiness maps (`submission-dataflow-readiness`), no query tuning (`orm-optimizer`), no live schema docs (`pg-data-dictionary`), no security scan (`diff-vuln-scan`), no running tests (`backend-integration-tests`).
- **Generate replacement scanners.** Run the saved scripts.

## Re-runs

Update existing output in place. Keep finding IDs stable: a resolved finding moves to the "Resolved" section, IDs are never reused or renumbered.

## Known failure modes to prevent

- Describing code by file structure instead of what happens to the data. Say what the person does and what ends up where.
- Reporting every missing `await` as critical without checking whether the result is returned or awaited by the caller (a promise returned to a caller that awaits it is fine).
- Missing silent field loss. Zod strips unknown keys by default, so a field the frontend sends can vanish before it reaches the database. Compare what the client sends, what the schema keeps, and what the insert or update writes.
- Treating "returns 200" as "saved". Follow the data to the table.
- Writing the narrative before validating the candidates, so it describes behavior that is actually broken.
