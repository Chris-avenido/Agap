# Narrative style

## Audience

A smart non-programmer: a project owner, a school administrator, an analyst. They know the business (schools, teachers, sections, schedules) but not the code.

## Style

- Short sentences. One idea each.
- Describe actions: "The school's administrator submits the form. The system checks every field. It saves the school's record, then each staff member's record."
- Name tables by business concept, with the technical name once, in parentheses: "the staff list (the `personnel` table)". After that, use the plain name.
- Explain any unavoidable term the first time it appears.
- No code blocks. No framework talk: say "the server", "the database", "the temporary holding area" (for Redis or a queue), "the background worker".
- Identifiers (table names, field names, file paths, route paths) appear only inside parentheses after a plain-English name. The one exception is the endpoint's path, which each workflow lists on one line starting "Entry points:" (semicolon-separated) so readers can find it.
- Say what is NOT saved as clearly as what is.

## Required structure (mirrors `assets/DATA-WORKFLOW.template.md`)

1. **At a glance**: five or six sentences: what the system is for, how data comes in, where it ends up.
2. **The main people and systems involved**: who or what sends data, who reads it.
3. **Where the data lives**: one paragraph per business concept. Which tables, who writes them, who reads them.
4. **The workflows**: one section per business workflow. Each has: trigger, what is sent, checks, what is saved and in what order, what the person sees, what happens in the background, and a final "Known problems" line.
5. **Things that run on their own**: queues, timers, scheduled jobs, startup tasks.
6. **How data is read back**: the screens or reports that read it, and what they trust.
7. **Problems in one paragraph**: a summary that points to `FINDINGS.md`.

## Good paragraph

> A school administrator opens the staff screen and presses Save. The screen sends the whole list of staff to the server. The server first checks that the administrator belongs to that school and that each person has a name and a position. If anything is wrong, nothing is saved and the screen shows which row to fix. If everything is fine, the server replaces the school's staff list (the personnel table) in one step, so a half-saved list cannot happen. It then tells the screen the new list.

## Bad paragraph (do not write this)

> `PUT /api/schools/:schoolId/personnel` runs `authenticate`, then `validate(updatePersonnelRequestSchema)`, then `updatePersonnel()` in `services/personnel.ts`, which calls `db.transaction` and `tx.insert(personnel).onConflictDoUpdate(...)`.

Why it is bad: it describes code, not data; every term is an unexplained identifier; a non-programmer cannot tell what was saved or what the person sees.
