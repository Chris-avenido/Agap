# Scoring rubric (100 points)

| # | Category | Max | Metric source |
|---|---|---|---|
| A | Feature colocation and cohesion | 20 | `layerVsFeature`, `endpoints.stats` medians |
| B | Separation of concerns and dependency direction | 15 | `crossBoundary`, `cycles`, shared-package purity |
| C | Boundary enforcement tooling | 15 | `boundaryTooling` |
| D | File size and granularity | 10 | `sizeBuckets` |
| E | Endpoint traceability | 15 | `endpoints.resolveRate`, hops, handler review |
| F | Agent context files and progressive disclosure | 10 | `agentFiles` |
| G | Debuggability and verification loop | 10 | `tests`, `scripts`, review of logging and error handling |
| H | Naming and discoverability | 5 | `naming` |

**Confidence rule.** Metric-derived scores are High confidence. Judgment-derived parts are labelled Medium or Low, with the evidence read (`path:line`).

## A. Feature colocation and cohesion (20)
Bands, using median endpoint footprint (`endpoints.stats.medianFilesLoaded`, `medianDirectories`) and `layerVsFeature[*].style`:
- 18 to 20: feature-first in every app and median footprint at most 6 files across at most 3 directories.
- 12 to 17: mixed, or median at most 12 files and 5 directories.
- 6 to 11: layer-first with some feature folders, median at most 25 files.
- 0 to 5: pure layer-first, or median above 25 files.
Adjust within the band by `technicalShare` (lower share, higher in band). Small repos (under about 50 source files): do not score below 12 for lacking layering alone.

## B. Separation of concerns and dependency direction (15)
Start at 15. Subtract:
- 5 if any frontend file imports server-only code or backend paths (`crossBoundary.counts.frontendServerImports > 0`).
- 5 if the shared package imports app-specific code or contains database or Express code (`sharedAppImports`, `sharedServerCode`).
- 5 if workspaces import each other other than through the shared package (`workspaceToWorkspace`).
- 1 per cycle (`cycles.count`, cap 5).
- 1 per 5 deep imports into another module's internals (`deepImports` counts summed, cap 5).
Floor at 0.

## C. Boundary enforcement tooling (15)
- 0: no lint boundary or cycle tooling.
- 5: lint exists but no boundary or cycle rules.
- 10: boundary or cycle rules configured but not run in CI or in the `ci-gate` skill, or covering only one app.
- 15: rules enforced in lint and CI for every app and the shared package.
Subtract 2 if rules use blanket `allow` patterns that defeat them (`blanketAllowPatterns`). A linter such as `oxlint` alone is not boundary tooling.

## D. File size and granularity (10)
Generated files are excluded. Use `sizeBuckets` over `total`.
- 10: no source file over 500 lines.
- 7: at most 5% over 500 and none over 1000.
- 4: some over 1000, none over 2000.
- 0: any over 2000, or 10% or more over 500.
(If bands conflict, take the lowest that applies.)

## E. Endpoint traceability (15)
- Up to 6 for `resolveRate`: 95% or higher = 6; 80 to 94% = 4; 50 to 79% = 2; below 50% = 0.
- Up to 4 for hops: median `hopsToDataLayer` of 3 or fewer = 4; 4 to 5 = 2; more or unknown = 0.
- Up to 5 for sampled handlers (judgment, state confidence): validation, handler logic and data access separable; no giant inline handlers (`inlineHandlers` share); one consistent route registration pattern.

## F. Agent context files and progressive disclosure (10)
- `AGENTS.md` exists and is at most 150 lines: 3 (exists but longer: 1).
- Nested `AGENTS.md` or `CLAUDE.md` for each app: 2 (partial: 1).
- A routing table pointing to skills or rules (`routingTable`): 3.
- Contains build/test commands and hard constraints rather than generic advice: 2 (judgment).

## G. Debuggability and verification loop (10)
- Single-command checks for typecheck, lint, test (or a `ci` script): 3.
- Tests colocated or mirrored predictably (`colocatedShare` 60% or higher, or a clearly mirrored `tests/` tree): 3.
- Logging, error handling and request correlation each live in one obvious place: 2 (judgment).
- Health or diagnostic endpoint or dev logger present: 2.

## H. Naming and discoverability (5)
Start at 5. Deduct 1 for each of: generic-name share above 10% (`genericShare`); five or more repeated basenames (`repeatedBasenames`); no barrel or index convention (`barrelCount` 0); `utils`/`helpers` folders larger than 10 files. Floor at 0.

## Grades
| Total | Grade |
|---|---|
| 90 to 100 | A (agent-ready) |
| 75 to 89 | B (good, targeted fixes) |
| 60 to 74 | C (workable, noticeable agent cost) |
| 40 to 59 | D (agents will struggle) |
| below 40 | F (restructure before heavy agent use) |
