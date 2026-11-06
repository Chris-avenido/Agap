#!/usr/bin/env node
// Deterministic PgBouncer / PostgreSQL sizing math. Node 18+, zero dependencies, no I/O besides stdout.
// Usage: node size-pool.mjs --pg-cores 8 --target-tps 2000 --latency-ms 8
//   [--spindles 1] [--safety 1.5] [--pgb-instances 1] [--db-user-pairs 1] [--reserve-pct 25]
//   [--app-instances N --driver-pool-max N] [--ram-gb N] [--superuser-reserved 3] [--admin-buffer 10]
// Exit 0 ok, 2 missing/invalid inputs.
const argv = process.argv.slice(2);
const KNOWN = ['pg-cores', 'spindles', 'target-tps', 'latency-ms', 'safety', 'pgb-instances', 'db-user-pairs', 'reserve-pct', 'app-instances', 'driver-pool-max', 'ram-gb', 'superuser-reserved', 'admin-buffer'];
const v = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith('--')) continue;
  const k = argv[i].slice(2);
  if (!KNOWN.includes(k)) { console.error(`Unknown flag --${k}. Known: ${KNOWN.map((x) => '--' + x).join(' ')}`); process.exit(2); }
  const n = Number(argv[i + 1]);
  if (argv[i + 1] === undefined || !Number.isFinite(n) || n <= 0) { console.error(`--${k} must be a positive number (got "${argv[i + 1]}")`); process.exit(2); }
  v[k] = n;
}
const d = (k, def) => (v[k] === undefined ? def : v[k]);
const spindles = d('spindles', 1), safety = d('safety', 1.5), pgb = d('pgb-instances', 1), pairs = d('db-user-pairs', 1);
const reservePct = d('reserve-pct', 25), superRes = d('superuser-reserved', 3), adminBuf = d('admin-buffer', 10);

const canA = v['pg-cores'] !== undefined;
const canB = v['target-tps'] !== undefined && v['latency-ms'] !== undefined;
if (!canA && !canB) {
  const m = [];
  if (!canA) m.push('--pg-cores (cores of the Postgres host, not the app VM)');
  if (!canB) m.push('--target-tps and --latency-ms (peak transactions/sec and avg transaction latency)');
  console.error('Missing inputs. Provide at least one of:\n  - ' + m.join('\n  - ') + '\nAsk the user, or pass a value and label it ASSUMED in the report.');
  process.exit(2);
}
if ((v['target-tps'] === undefined) !== (v['latency-ms'] === undefined)) {
  console.error('Missing inputs: --target-tps and --latency-ms must be given together.'); process.exit(2);
}
if ((v['app-instances'] === undefined) !== (v['driver-pool-max'] === undefined)) {
  console.error('Missing inputs: --app-instances and --driver-pool-max must be given together.'); process.exit(2);
}

const r = { inputs: v, defaultsUsed: { spindles, safety, pgbInstances: pgb, dbUserPairs: pairs, reservePct, superuserReserved: superRes, adminBuffer: adminBuf }, notes: [] };
const A = canA ? v['pg-cores'] * 2 + spindles : null;
const ceiling = A === null ? null : Math.floor(A * 1.25);
const B = canB ? Math.ceil(v['target-tps'] * (v['latency-ms'] / 1000) * safety) : null;
let total, basis;
if (A !== null && B !== null) { total = Math.min(B, ceiling); basis = 'min(B, usable ceiling)'; }
else if (A !== null) { total = ceiling; basis = 'usable ceiling only (B not computable: no tps/latency)'; }
else { total = B; basis = 'B only (A not computable: no pg-cores)'; }
r.A = A; r.usableCeiling = ceiling; r.B = B; r.totalPoolTarget = total; r.totalPoolBasis = basis;
r.dbBound = A !== null && B !== null && B > ceiling;
if (r.dbBound) r.notes.push('Required concurrency exceeds the hardware ceiling. Do not raise the pool; reduce transaction latency (indexes, caching, batching) or add database cores.');

const dps = Math.ceil(total / pgb / pairs);
const rps = Math.ceil(dps * reservePct / 100);
const serverConns = pgb * pairs * (dps + rps);
r.default_pool_size = dps; r.reserve_pool_size = rps; r.totalServerConnections = serverConns;
r.max_connections = serverConns + superRes + adminBuf;
r.notes.push('Changing max_connections needs a PostgreSQL restart.');
if (v['app-instances'] !== undefined) {
  const raw = v['app-instances'] * v['driver-pool-max'] * 1.25;
  r.max_client_conn = Math.max(1000, Math.ceil(raw / 500) * 500);
  r.fileDescriptorNeed = r.max_client_conn + serverConns + 100;
  r.notes.push(`Confirm ulimit -n / systemd LimitNOFILE >= ${r.fileDescriptorNeed} for the PgBouncer process.`);
  r.totalClientDemand = v['app-instances'] * v['driver-pool-max'];
}
if (v['ram-gb'] !== undefined) {
  const ram = v['ram-gb'];
  r.shared_buffers_gb = +(ram * 0.25).toFixed(2);
  r.maintenance_work_mem_gb = +Math.min(ram * 0.05, 2).toFixed(2);
  r.work_mem_ceiling_mb = +((ram * 0.25 * 1024) / r.max_connections).toFixed(1);
  r.notes.push('work_mem ceiling is an upper bound per sort/hash node; one query can use several nodes and parallel workers, so keep a margin.');
}
if (canA) {
  r.max_worker_processes = v['pg-cores'];
  r.max_parallel_workers_per_gather = Math.floor(v['pg-cores'] / 2);
}
const missingOpt = [];
if (v['app-instances'] === undefined) missingOpt.push('--app-instances/--driver-pool-max (for max_client_conn)');
if (v['ram-gb'] === undefined) missingOpt.push('--ram-gb (for shared_buffers/work_mem)');
if (missingOpt.length) r.notes.push('Not computed, inputs missing: ' + missingOpt.join('; '));

const f = {
  A: 'A = pg_cores * 2 + spindles; usable ceiling = floor(A * 1.25)',
  B: 'B = ceil(target_tps * latency_ms/1000 * safety)  (Little\'s law)',
  pool: 'total pool = min(B, ceiling); default_pool_size = ceil(total / pgb_instances / db_user_pairs); reserve = ceil(reserve_pct% of default)',
  mc: 'max_client_conn = max(1000, ceil(app_instances * driver_pool_max * 1.25 / 500) * 500); FD need = max_client_conn + server conns + 100',
  pg: 'max_connections = pgb_instances * db_user_pairs * (default + reserve) + superuser_reserved + admin_buffer',
  mem: 'shared_buffers = 25% RAM; maintenance_work_mem = min(5% RAM, 2 GB); work_mem ceiling = RAM*0.25/max_connections',
};
console.log('Formulas:');
Object.values(f).forEach((s) => console.log('  ' + s));
console.log('\nResult:');
const rows = [['A (hardware ceiling)', A], ['usable ceiling', ceiling], ['B (required concurrency)', B], ['total pool target', total], ['dbBound', r.dbBound], ['default_pool_size', dps], ['reserve_pool_size', rps], ['total server connections', serverConns], ['max_client_conn', r.max_client_conn], ['file descriptors needed', r.fileDescriptorNeed], ['postgres max_connections', r.max_connections], ['shared_buffers (GB)', r.shared_buffers_gb], ['maintenance_work_mem (GB)', r.maintenance_work_mem_gb], ['work_mem ceiling (MB)', r.work_mem_ceiling_mb], ['max_worker_processes', r.max_worker_processes], ['max_parallel_workers_per_gather', r.max_parallel_workers_per_gather]];
rows.forEach(([k, val]) => console.log('  ' + k.padEnd(34) + (val === undefined || val === null ? 'n/a' : val)));
r.notes.forEach((n) => console.log('NOTE: ' + n));
console.log('\nJSON: ' + JSON.stringify(r));
