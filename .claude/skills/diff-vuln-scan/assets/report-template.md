# Security & Error Scan: `<short-sha>` (`<subject>`)

- **Repo:** <repo name>
- **Target:** <target as scanned>
- **Assessment mode:** read-only (no repo file modified)
- **Detected stack:** <languages, frameworks, package manager, test runner as detected in the repo>
- **Standards files used:** <paths, or "not found">

## Executive Summary Matrix

| ID | Layer / Component | Flaw | Severity | CWE | Concrete Impact |
|----|-------------------|------|----------|-----|-----------------|
| SEC-01 | <layer / file> | <one-line flaw> | HIGH | CWE-20 | <what an attacker or user gets> |

## Findings by Layer

Use one bold layer line per group (shared, backend, frontend, db, infra, other), then one block per finding. IDs: `SEC-nn` for security, `ERR-nn` for functional errors. Delete this paragraph and every unused example line.

**Layer: backend**

### SEC-01: <title>

**Severity:** HIGH
**CWE:** CWE-20
**Location:** `path/to/file.ext:42`
**Evidence:** Confirmed (executed) | Confirmed (traced) | Unverified
**Root cause:**

```
<code excerpt at the location>
```

**Exploit scenario:**

1. <attacker step>
2. <exact request or call>

```
<exact hostile payload or failing input>
```

**Impact:** <consequence, who is affected, whether it persists>
**Standards cross-reference:** <file and section, or "standards file not found">
**Fix status:** Executed in scratch | Unverified fix
**Correction:**

```diff
--- a/path/to/file.ext
+++ b/path/to/file.ext
@@ -40,3 +40,3 @@
-old line
+new line
```

**Regression test:**

```
<test case in the repo's own framework and style>
```

## Checked and Clean

- <what was checked, and why it is clean (for example "regex X has no nested quantifiers, so no ReDoS")>

## Defensive Remediations, in Order

1. <SEC-01 first because ...>
2. <ERR-01, depends on step 1>

## Fix Prompt for a Coding Agent

```
Apply the approved corrections for <IDs> in <repo>. Edit only the files named in the patches.
Run the targeted checks first: <detected lint/test command on changed files>.
Then run the full verification pipeline once: <detected command>.
Stop after 3 failed repair attempts and report the error trace.
```

## Unverified Items and Open Questions

- <item and the reason it could not be verified>
