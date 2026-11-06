# .claude/settings.json permissions shape

Merge this into the target repo's `.claude/settings.json`. If the file exists, union the `deny` and `ask` arrays and keep every other key.

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/.env)",
      "Read(./**/.env.*)"
    ],
    "ask": [
      "Bash(ssh:*)",
      "PowerShell(ssh:*)",
      "Bash(scp:*)",
      "PowerShell(scp:*)",
      "Bash(psql:*)",
      "PowerShell(psql:*)",
      "Bash(pg_dump:*)",
      "Bash(pg_restore:*)",
      "Bash(pm2 delete:*)",
      "PowerShell(pm2 delete:*)",
      "Bash(*DROP *)",
      "PowerShell(*DROP *)",
      "Bash(*TRUNCATE *)",
      "PowerShell(*TRUNCATE *)",
      "Bash(*FLUSH*)",
      "PowerShell(*FLUSH*)",
      "Bash(redis-cli:*)",
      "PowerShell(redis-cli:*)"
    ]
  }
}
```

## How each entry enforces the hard rules

| Entry | Enforces |
| --- | --- |
| `Read(./.env*)` variants in `deny` | Hard rule 1: secrets in `.env` files are never read, so they cannot be printed or committed. Deny wins over any allow. |
| `ssh`, `scp` in `ask` | Hard rule 4: any connection to the VM, including production, needs an explicit yes. The matcher cannot tell production from other hosts, so all are gated. |
| `psql`, `pg_dump`, `pg_restore` in `ask` | Hard rule 4 and the schema rule: no production database access without asking. |
| `pm2 delete` in `ask` | Hard rule 4: removing a production process needs approval. |
| `DROP`, `TRUNCATE` patterns in `ask` | Hard rule 2: destructive SQL never runs unreviewed; it must come with a rehearsal and rollback plan. |
| `FLUSH*`, `redis-cli` in `ask` | Hard rule 4: Redis (write buffer) holds unflushed writes; `FLUSHALL`/`FLUSHDB` could lose data. |

Notes: patterns use the harness's prefix/wildcard matching; keep them in `ask`, not `allow`. The deny list is read-time protection only, so rule 1 in AGENTS.md still applies to values already in context.
