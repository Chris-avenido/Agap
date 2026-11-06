# Optional per-repo config: `.diff-vuln-scan.json`

Place this file at a repo root to override detection. The skill only reads it and never creates it. **The skill works with no config file at all.**

| Field | Type | Meaning |
|-------|------|---------|
| `layers` | object, glob -> layer name | Checked first; overrides the default path-based layer rules. Layers: `shared`, `backend`, `frontend`, `db`, `infra`, `tests`, `docs`, `other` (or your own names). |
| `standardsFiles` | string[] | Paths to cross-reference (security manual, consultant file, rules). |
| `authMiddlewareNames` | string[] | Names that count as protecting a route (for `new-route-registration` hits). |
| `ignorePaths` | string[] | Globs collected into `skipped` instead of scanned. |
| `extraPatterns` | array | Same shape as `reference/risk-patterns.json` (`id`, `regex`, `cweHint`, `severityHint`, `message`, `languages`, `appliesTo`; optional `flags`, `pathRegex`). Must compile or `collect-diff.mjs` exits 4. |
| `testCommand` | string | Read-only targeted test command to use for changed files. |
| `lintCommand` | string | Read-only targeted lint command to use for changed files (no `--fix`). |

Glob rules: `*` matches within a path segment, `**` crosses segments, a glob without `/` matches a basename.

## Example (illustrative values only)

```json
{
  "layers": { "services/**": "backend", "web/src/**": "frontend", "sql/**": "db" },
  "standardsFiles": ["docs/security-manual.md"],
  "authMiddlewareNames": ["requireAuth", "requireRole"],
  "ignorePaths": ["**/generated/**"],
  "extraPatterns": [
    { "id": "no-todo-auth", "regex": "TODO.*auth", "cweHint": "CWE-306", "severityHint": "LOW", "message": "Unfinished auth", "languages": ["any"], "appliesTo": ["any"] }
  ],
  "testCommand": "npm run test:unit -- <files>",
  "lintCommand": "npx eslint <files>"
}
```
