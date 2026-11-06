# Redis reference

Contents: [Evidence grade](#evidence-grade) | [Roles](#roles) | [Instance split](#instance-split) | [Read path](#read-path) | [Two-tier cache](#optional-two-tier-cache) | [Write path](#write-path) | [Mandatory conditions](#mandatory-conditions-for-any-buffered-write) | [Config matrix](#config-matrix) | [Security](#security) | [Monitoring](#monitoring) | [Operation classification](#operation-classification)

## Evidence grade

Same as the PgBouncer reference: the numbers come from a research document built largely from vendor and blog posts. Rules of thumb; validate by measurement.

## Roles

PgBouncer controls how fast data enters Postgres; Redis keeps repeat reads and write spikes from reaching it. Plan each Redis use as either CACHE or BUFFER.

## Instance split

`maxmemory-policy` is per instance (correction to the source document). A cache instance may use `allkeys-lfu`. Any instance holding queue, stream or buffered-write data must use `noeviction` (BullMQ documents this requirement; verify), otherwise memory pressure silently deletes pending writes. If the repo shares one Redis for both, flag it P0 and propose two instances (or two ports).

## Read path

Plain cache-aside suffers a cache stampede at TTL expiry (for example 10,000 requests missing at once and saturating the PgBouncer pool). Use XFetch probabilistic early expiration: recompute early when `currentTime - beta * delta * ln(random()) > expiryTime`, where delta is the measured recompute time stored with the cached value, beta is about 1.0, random is uniform in (0,1]. Correction to the source: XFetch greatly reduces but does not mathematically guarantee a single recompute, so pair it with a single-flight lock (`SET key:lock NX PX`) and serve the stale value while one worker refreshes. Also: TTL jitter, tenant-scoped keys, no PII in key names, invalidation on write, and `SCAN` instead of `KEYS` (a single `KEYS *` blocks the single-threaded event loop). Fall back to Postgres if Redis is down, rate limited, so a Redis outage does not become a database outage.

## Optional two-tier cache

In-process LRU (document claims about 0.01 ms) in front of Redis (about 3-8 ms); only for tiny hot reference data.

## Write path

Redis Streams per the document: `XADD` on the request path returns in sub-millisecond time; background workers read with `XREADGROUP` in a consumer group (at-least-once delivery; unacknowledged messages stay in the Pending Entries List); workers coalesce updates to the same record, write multi-row `INSERT ... ON CONFLICT` or `COPY` through PgBouncer in one transaction (document claims COPY is 5-10x faster than row inserts; measure), then `XACK`.

If the repo already uses BullMQ, stay with BullMQ and do not add Streams beside it: one job per submission or batch, `removeOnComplete` only after the DB commit, `attempts` with backoff, failed jobs retained (`removeOnFail: false`), so nothing is deleted until the database write succeeds.

## Mandatory conditions for any buffered write

- An idempotency key with a unique constraint so retries cannot duplicate.
- A 202 Accepted style response with a status lookup.
- Backpressure: return "please wait" when queue depth or oldest-job age passes a threshold.
- Total concurrent worker writers no greater than the PgBouncer pool.
- Batch size tuned by measurement.
- A dead-letter path for poison messages.
- Durability: `appendonly yes` with `appendfsync everysec` (up to about one second of loss on a crash) or `always` when zero loss is mandatory, on persistent storage.

State plainly in the report that without persistence an acknowledged write can be lost.

## Config matrix

Document values with caveats.

| Parameter | Document value | Caveat |
|---|---|---|
| maxmemory | 70-75% of RAM | on a shared VM compute from the RAM budget actually free for Redis; keep headroom for fork copy-on-write during BGSAVE/AOF rewrite |
| maxmemory-policy | allkeys-lfu | cache-only instances; `noeviction` for queue/buffer instances |
| lfu-decay-time | 3600 | unit is minutes (60 hours); default is 1; keep the default unless measured |
| activedefrag | yes | enable when measured fragmentation is high (ratio above about 1.5); needs the jemalloc build |
| active-defrag-ignore-bytes | 100mb | idle until this much is fragmented |
| io-threads / io-threads-do-reads | 4-8 / yes | only when Redis is network- or CPU-bound and spare cores exist; keep below core count; `io-threads-do-reads` is version dependent, check `redis-server --version`; skip on small shared VMs |
| tcp-backlog | 511-10000 | also raise `net.core.somaxconn` or the value is capped |
| client-output-buffer-limit | pubsub 32mb 8mb 60 | equals the common default; set only if changed |

## Security

Addition: bind to localhost or a private interface, require auth or ACLs, keep protected mode on. The data may be personal records.

## Monitoring

`INFO`: `keyspace_hits` / `keyspace_misses`, `evicted_keys`, `used_memory` vs `used_memory_rss`, `mem_fragmentation_ratio`, `connected_clients`, `blocked_clients`. Streams: `XLEN`, `XPENDING`. BullMQ: waiting/active/failed counts and age of the oldest waiting job. `SLOWLOG`.

## Operation classification

| Class | Criteria |
|---|---|
| Cacheable read | SELECT, same result for many requests, tolerates seconds-to-minutes staleness, high call rate, not tied to caller identity/permissions |
| Hot write for the buffer | Burst path, small payload, idempotently keyable, user accepts "queued", no immediate read-your-write (or status endpoint covers it) |
| Must stay direct | Migrations, session advisory locks, LISTEN/NOTIFY, multi-step transactions with dependent reads, synchronous validation against current DB state, bulk deletes |
| Fine as is | Low-rate or per-user operations where caching or buffering adds risk without reducing load |
