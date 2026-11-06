# scorecard.json schema

The exact shape consumed by `scripts/compute-score.mjs`. Validation failures exit with code 2.

```jsonc
{
  "repo": { "name": "string", "path": "absolute or cwd-relative repo path", "commit": "string", "date": "YYYY-MM-DD" },
  "profile": {
    "purpose": "string",
    "objectives": ["string"],                      // non-empty
    "workload": "write-heavy-ingestion | multi-tenant-saas | read-heavy-reporting | append-only-events | internal-low-scale | mixed",
    "tenancy": "none | shared-schema | schema-per-tenant | db-per-tenant",
    "scaleTarget": "string",
    "postgresVersion": "17 | 18 | unknown | ...",
    "pooler": "pgbouncer | none | unknown",
    "confidence": "high | medium | low",
    "assumptions": ["string"],                     // may be empty
    "verdict": "one sentence tied to the objectives"
  },
  "criteria": [                                     // exactly C1..C10, once each
    {
      "id": "C1",
      "applicable": true,                           // false => no findings; summary holds the reason
      "score": 7.5,                                 // 0-10; within 1.5 of suggested score
      "adjustmentReason": "required if score differs from suggested",
      "confidence": "high | medium | low",
      "summary": "string",
      "findings": [
        {
          "id": "C1-1",                             // unique across the file
          "ruleId": "PK001",                        // scanner id, or JDG### for judgment findings
          "severity": "critical | high | medium | low | info",
          "tableRole": "high-volume | reference | transactional",   // optional
          "evidence": [{ "file": "repo-relative path", "line": 12 }],  // at least one; must exist
          "problem": "string",
          "whyItMattersHere": "tied to this repo's objectives",
          "recommendation": "concrete fix",
          "effort": "S | M | L"
        }
      ]
    }
  ],
  "strengths": [{ "criterion": "C4", "note": "string", "evidence": "file:line" }],
  "unverifiable": [{ "item": "string", "why": "string", "handoffSkill": "orm-optimizer | pg-health-assessment | pgbouncer-redis-plan | security-testing" }],
  "method": { "scannerVersion": "1.0.0", "rulesFired": ["PK001"], "limitations": ["string"] }
}
```

Notes:

- `ruleId` format is two to five capital letters plus three digits. Use the scanner's id when a hit is confirmed, or `JDG001`, `JDG002`... for findings you identified by reading.
- `evidence` files are resolved against `repo.path`; the check fails if a file is missing or the line is past the end. `strengths[].evidence` may be a string `file:line`, or an object/array of `{file,line}`.
- Info findings carry no penalty and are not ranked in recommendations.
- Use `node scripts/compute-score.mjs scorecard.json --check` to validate; it prints each criterion's weight, your score and the suggested score.

## Minimal example

```json
{
  "repo": { "name": "demo", "path": ".", "commit": "abc1234", "date": "2026-01-01" },
  "profile": {
    "purpose": "Collects school submissions", "objectives": ["10k concurrent submissions"],
    "workload": "write-heavy-ingestion", "tenancy": "shared-schema", "scaleTarget": "10k concurrent writes",
    "postgresVersion": "unknown", "pooler": "pgbouncer", "confidence": "medium",
    "assumptions": ["PostgreSQL version not stated"], "verdict": "Sound foundation, key strategy limits write scaling."
  },
  "criteria": [
    { "id": "C1", "applicable": true, "score": 7.5, "confidence": "high", "summary": "Main table uses random UUIDs.",
      "findings": [ { "id": "C1-1", "ruleId": "PK001", "severity": "high", "tableRole": "high-volume",
        "evidence": [{ "file": "src/db/schema.ts", "line": 12 }], "problem": "Random UUID PK on submissions",
        "whyItMattersHere": "Index page splits under 10k concurrent inserts", "recommendation": "Use uuidv7()", "effort": "S" } ] },
    { "id": "C2", "applicable": true, "score": 10, "confidence": "high", "summary": "ok", "findings": [] },
    { "id": "C3", "applicable": true, "score": 10, "confidence": "high", "summary": "ok", "findings": [] },
    { "id": "C4", "applicable": true, "score": 10, "confidence": "medium", "summary": "ok", "findings": [] },
    { "id": "C5", "applicable": false, "confidence": "high", "summary": "Single tenant in practice", "findings": [] },
    { "id": "C6", "applicable": true, "score": 10, "confidence": "medium", "summary": "ok", "findings": [] },
    { "id": "C7", "applicable": true, "score": 10, "confidence": "medium", "summary": "ok", "findings": [] },
    { "id": "C8", "applicable": true, "score": 10, "confidence": "medium", "summary": "ok", "findings": [] },
    { "id": "C9", "applicable": true, "score": 10, "confidence": "medium", "summary": "ok", "findings": [] },
    { "id": "C10", "applicable": true, "score": 8, "confidence": "low", "summary": "Write path buffering not evidenced.", "adjustmentReason": "No finding recorded, but objective is not demonstrably designed for", "findings": [] }
  ],
  "strengths": [{ "criterion": "C2", "note": "FKs indexed", "evidence": "src/db/schema.ts:30" }],
  "unverifiable": [{ "item": "Autovacuum settings", "why": "Server config is not in the repo", "handoffSkill": "pg-health-assessment" }],
  "method": { "scannerVersion": "1.0.0", "rulesFired": ["PK001"], "limitations": ["Regex scan"] }
}
```
