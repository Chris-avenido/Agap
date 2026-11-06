---
name: pg-clone-to-local
description: "Reads the source Postgres URL from the repo's .env, dumps the whole database (schema and all data), restores it into a localhost Postgres database (fully dropping and recreating the local copy if it already exists), verifies row counts, then adds LOCAL_DATABASE_URL to .env. Use whenever the user says things like 'clone the database to localhost', 'copy the production database to my local postgres', 'refresh my local database from the .env database', 'make a local copy of the database and add it to the env', or 'sync localhost db with the remote db'. Not for backups (use a backup skill), migrations, or schema-only changes."
---

# pg-clone-to-local

Full-refresh clone of the `.env` source database into localhost Postgres, ending with `LOCAL_DATABASE_URL` written to `.env`. The source is only read; any existing local copy is dropped and recreated.

## Workflow
1. Confirm `.env` exists and contains the source key (default `DATABASE_URL`). Never print the URL or password; show only host, port and database name.
2. Tell the user in one line: source host/db (read-only), local target db name, and that an existing local copy will be dropped and recreated. Proceed without asking again unless the target is not localhost (then stop; see `rules.md`).
3. Run `bash .claude/skills/pg-clone-to-local/scripts/clone_db.sh` from the repo root. Pass flags only if the user gave overrides: `--env-file`, `--source-key`, `--local-db`, `--local-admin-url` (or env `LOCAL_PG_ADMIN_URL`), `--local-key`. Do not write new dump, restore or env-editing code.
4. Read the script's report. If it exited non-zero, go to step 6.
5. Confirm `LOCAL_DATABASE_URL` exists in `.env`, `DATABASE_URL` is unchanged, and `.env` is gitignored (warn if not; do not edit `.gitignore`).
6. On failure, report the exact failing stage (`[stage N/10 name]`) and error with secrets masked. Do not retry destructive steps blindly. Common causes: local Postgres not running, `pg_dump` older than the server, wrong local admin credentials, source unreachable.
7. Hard constraints: see `rules.md`.

## Acceptance criteria
- Source database was only read, never written to.
- Local database exists and every user table's row count equals the source count from the same dump window (per-table comparison and final `RESULT: PASS`/`FAIL`).
- Table, sequence and index counts match between source and local.
- `.env` has exactly one `LOCAL_DATABASE_URL` line pointing to localhost; the `DATABASE_URL` line is byte-identical to before.
- No dump file or password remains on disk or in terminal output.

## Verification
Before returning the final output, define the acceptance criteria. Create the first version, inspect it using the script's per-table row-count comparison, the table/index/sequence counts, and a diff of .env before and after, fix every issue, run another pass. Return only after it meets the criteria, with a short summary of what you checked. Report anything that cannot be verified.
