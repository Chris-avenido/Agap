#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const content = readFileSync(filePath, 'utf8');
  const env = {};
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

function loadAllowlist(allowlistPath) {
  if (!existsSync(allowlistPath)) return new Set();
  const content = readFileSync(allowlistPath, 'utf8');
  return new Set(
    content
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#')),
  );
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);
const PGBOUNCER_PORTS = new Set(['6432', 6432]);

function outputResult(ok, host, database, reason) {
  const result = {
    ok: Boolean(ok),
    host: String(host || ''),
    database: String(database || ''),
    reason: String(reason || ''),
  };
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  process.exit(ok ? 0 : 1);
}

function main() {
  const envArg = process.argv[2] || 'apps/backend/.env.test';
  const envPath = resolve(process.cwd(), envArg);
  const fallbackEnvPath = resolve(process.cwd(), 'apps/backend/.env');
  const allowlistPath = resolve(process.cwd(), 'apps/backend/.test-db-allowlist');

  const fileEnv = parseEnvFile(envPath);
  const fallbackEnv = parseEnvFile(fallbackEnvPath);

  // Read URL from target env file, process.env, or fallback .env (for dev/test environments)
  const rawDbUrl =
    fileEnv['TEST_DATABASE_URL'] ||
    fileEnv['DATABASE_URL'] ||
    process.env['TEST_DATABASE_URL'] ||
    fallbackEnv['TEST_DATABASE_URL'] ||
    fileEnv['DATABASE_URL'] ||
    process.env['DATABASE_URL'] ||
    fallbackEnv['DATABASE_URL'];

  if (!rawDbUrl) {
    outputResult(
      false,
      '',
      '',
      'No database URL found in env file or environment variables (checked TEST_DATABASE_URL and DATABASE_URL)',
    );
  }

  let dbParsed;
  try {
    dbParsed = new URL(rawDbUrl);
  } catch {
    outputResult(false, '', '', 'Database URL is malformed or not a valid URL');
  }

  if (!['postgres:', 'postgresql:'].includes(dbParsed.protocol)) {
    outputResult(false, '', '', 'Database URL protocol must be postgres: or postgresql:');
  }

  const host = dbParsed.hostname.replace(/^\[|\]$/g, '');
  if (!LOCAL_HOSTS.has(host)) {
    outputResult(false, host, '', `Refusing non-local database host "${host}". Must be localhost, 127.0.0.1 or ::1`);
  }

  const port = dbParsed.port || '5432';
  if (PGBOUNCER_PORTS.has(port)) {
    outputResult(
      false,
      host,
      '',
      `Port ${port} is a PgBouncer port. Integration tests require a direct PostgreSQL connection.`,
    );
  }

  const databaseName = dbParsed.pathname.replace(/^\//, '').split('?')[0] || '';
  if (!databaseName) {
    outputResult(false, host, '', 'Database name is missing from database URL');
  }

  if (databaseName.toLowerCase().includes('prod')) {
    outputResult(
      false,
      host,
      databaseName,
      `Database name "${databaseName}" contains "prod"; refusing execution against potential production database`,
    );
  }

  const allowlist = loadAllowlist(allowlistPath);
  const hasSafeSuffix = databaseName.endsWith('_test') || databaseName.endsWith('_local');
  const isAllowlisted = allowlist.has(databaseName);

  if (!hasSafeSuffix && !isAllowlisted) {
    outputResult(
      false,
      host,
      databaseName,
      `Database name "${databaseName}" does not end in _test or _local, and is not in .test-db-allowlist`,
    );
  }

  // Check Redis URL if present
  const rawRedisUrl =
    fileEnv['REDIS_URL'] ||
    process.env['REDIS_URL'] ||
    fallbackEnv['REDIS_URL'];
  const queuePrefix =
    fileEnv['QUEUE_PREFIX'] ||
    process.env['QUEUE_PREFIX'] ||
    fallbackEnv['QUEUE_PREFIX'] ||
    'esf7';

  let redisInfo = 'no Redis configured';
  if (rawRedisUrl) {
    try {
      const redisParsed = new URL(rawRedisUrl);
      const redisHost = redisParsed.hostname.replace(/^\[|\]$/g, '');
      const redisPort = redisParsed.port || '6379';
      if (!LOCAL_HOSTS.has(redisHost)) {
        outputResult(
          false,
          host,
          databaseName,
          `Refusing non-local Redis host "${redisHost}". Redis must be local for tests.`,
        );
      }
      redisInfo = `Redis approved at ${redisHost}:${redisPort} (prefix: ${queuePrefix})`;
    } catch {
      outputResult(false, host, databaseName, 'REDIS_URL is malformed');
    }
  }

  outputResult(
    true,
    host,
    databaseName,
    `Local test database approved. ${redisInfo}`,
  );
}

main();
