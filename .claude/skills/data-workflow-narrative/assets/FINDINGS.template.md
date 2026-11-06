# Data workflow findings

<!-- Ranked: Critical, High, Medium, Low. IDs are stable and never reused. Keep every field; check-output.mjs enforces them. -->

## Summary

| ID | Severity | Endpoint | Problem |
| --- | --- | --- | --- |
| DW-001 | High | PUT /api/example/:id | <one line> |

## Findings

### DW-001

- **ID:** DW-001
- **Severity:** High
- **Status:** Confirmed
- **Workflow:** <exact workflow heading from DATA-WORKFLOW.md>
- **Endpoint:** PUT /api/example/:id
- **Where:** apps/backend/src/services/example.ts:42
- **Candidates:** R01@apps/backend/src/services/example.ts:42
- **What is wrong (plain English):** <what happens to the data and why that is a problem>
- **Evidence:**

```
<3-8 lines copied verbatim from the cited location>
```

- **What the user experiences:** <the visible consequence: success shown but data missing, etc.>
- **Fix brief:**
  - Required behavior: <what must be true after the fix>
  - Files to change: <paths>
  - How to confirm: <what to run or check>
  - Suggested test: <one integration or unit test description>

## Checked and fine

<!-- One bullet per discarded candidate: `R06@path:line`: reason it is not a problem. -->

## Resolved

<!-- Findings fixed since the last run: ID, date, how verified. Never reuse these IDs. -->
