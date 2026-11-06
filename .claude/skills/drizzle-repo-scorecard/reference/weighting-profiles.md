# Weighting profiles

`scripts/weights.json` is the single source of truth. If this file and the JSON disagree, the JSON wins and this file must be corrected.

Criteria order: C1 Primary keys, C2 Indexing, C3 Constraints, C4 Concurrency, C5 Multi-tenancy, C6 Modeling and growth, C7 ORM patterns, C8 Pooling and runtime, C9 Migrations, C10 Operations and purpose fit.

| Workload | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Sum |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| write-heavy-ingestion | 12 | 14 | 8 | 14 | 4 | 10 | 12 | 12 | 8 | 6 | 100 |
| multi-tenant-saas | 8 | 13 | 10 | 8 | 16 | 8 | 10 | 8 | 9 | 10 | 100 |
| read-heavy-reporting | 5 | 18 | 8 | 4 | 4 | 12 | 18 | 8 | 7 | 16 | 100 |
| append-only-events | 10 | 14 | 6 | 6 | 3 | 18 | 10 | 10 | 7 | 16 | 100 |
| internal-low-scale | 6 | 10 | 14 | 8 | 6 | 8 | 12 | 8 | 14 | 14 | 100 |
| mixed | 9 | 13 | 10 | 10 | 8 | 10 | 12 | 10 | 8 | 10 | 100 |

## When to choose each

- **write-heavy-ingestion**: bursts of concurrent writes (form submissions, sensor batches, deadline-day traffic). Weights tilt to key locality (C1), indexes that cost on every insert (C2), locking (C4), query batching (C7) and pooling (C8).
- **multi-tenant-saas**: many customers share one schema. Isolation (C5) dominates, with tenant-leading indexes (C2) and tenant-scoped uniques (C3).
- **read-heavy-reporting**: dashboards, analytics, exports. Indexing (C2) and query shape (C7) dominate; key locality and locking matter little; purpose fit (C10) such as rollups and caching matters.
- **append-only-events**: logs, audit trails, event streams. Growth management (C6: partitioning, retention, BRIN) and operations (C10: autovacuum, WAL) dominate; tenancy matters little.
- **internal-low-scale**: admin tools with modest traffic. Integrity (C3) and safe change management (C9) matter more than throughput tuning.
- **mixed**: no dominant pattern, or the profile cannot be inferred confidently. State the assumption in the profile.

## Non-applicable criteria

Criteria with `applicable: false` are dropped and the remaining weights are renormalized to sum to 100: `weight_i' = weight_i / sum(applicable weights) x 100`.

Worked example (`multi-tenant-saas`, single-tenant after all, so C5 not applicable): applicable sum = 100 - 16 = 84. C2 becomes 13 / 84 x 100 = 15.5; C10 becomes 10 / 84 x 100 = 11.9; the ten weights again total 100 across the nine remaining criteria. If the real workload is single-tenant, prefer picking the profile that matches it (`internal-low-scale` or `mixed`) instead of reusing `multi-tenant-saas`.
