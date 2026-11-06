# How data moves through <app name>

<!-- Plain English. No code blocks. Technical names only in parentheses after a plain name. Delete these comments. -->

## At a glance

<!-- 5-6 sentences: purpose of the system, how data comes in, where it ends up, what runs in the background. -->

## The main people and systems involved

<!-- Bulleted list: each kind of user (what they enter, what they read), the browser app, the server, the database, the temporary holding area, outside services. -->

## Where the data lives

<!-- One paragraph per business concept. For each: which tables (plain name, then technical name in parentheses), who writes them (which workflow), who reads them, anything notable (required fields, history kept or not). EVERY table written by any endpoint must be named here. -->

## The workflows

### <Workflow name, as a business action, e.g. "A school submits its staff list">

- **Trigger:** <who does what>
- **Entry points:** <list every endpoint of this workflow on this one line, separated by semicolons, e.g. PUT /api/schools/:schoolId/personnel; POST /api/schools/:schoolId/submit>
- **What is sent:** <the information, in business words>
- **Checks:** <what the system verifies, and what the person sees when a check fails>
- **What is saved, in order:** <numbered steps; table by plain name>
- **What the person sees:** <confirmation, errors, what appears on screen>
- **In the background:** <anything that happens later, or "Nothing.">
- **Known problems:** <finding IDs from FINDINGS.md, e.g. DW-003, DW-007; or "None found.">

<!-- Repeat per workflow. EVERY endpoint that writes to the database must appear (by path) in exactly the workflow it belongs to. Read-only endpoints may be grouped in "How data is read back". -->

## Things that run on their own

<!-- Queues, timers, scheduled jobs, startup tasks, background workers: what starts them, what they do, what happens when they fail. "Nothing" is a valid answer; say it. -->

## How data is read back

<!-- Screens/reports and the read-only endpoints behind them: what they show, where it comes from, whether it can be out of date. -->

## Problems in one paragraph

<!-- Counts by severity and the most important problems in plain words. Point to FINDINGS.md. Mention finding IDs. -->
