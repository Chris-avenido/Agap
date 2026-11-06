# pg-clone-to-local: hard rules

- The source database is strictly read-only: only `pg_dump` and read-only queries. Never run DDL or DML against it.
- Only drop and create databases on a `localhost`, `127.0.0.1` or `::1` server. Never drop a database with the same host, port and name as the source.
- Never print, log or commit passwords or full connection URLs. Mask them in all output.
- Never modify `DATABASE_URL` or any `.env` line other than the single `LOCAL_DATABASE_URL` line.
- Do not write to `.env` unless the verification result is PASS.
- The dump contains real data: keep it only in a `mktemp -d` directory and delete it on exit, success or failure. Never place it inside the repo.
- Do not `source` or `eval` the `.env` file.
- Do not edit `.gitignore`; warn the user if `.env` is not ignored.

## Known failure modes to prevent
- `pg_dump` older than the source server: stop and tell the user to install a matching client version.
- Passwords with special characters breaking URL parsing: URL-decode, pass via `PGPASSWORD`.
- Duplicate `LOCAL_DATABASE_URL` lines after repeated runs: always replace, never blindly append.
- Active connections blocking `DROP DATABASE`: terminate them first.
- `.env` without trailing newline merging lines: the script rewrites line by line and always ends with a newline.
