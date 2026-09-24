const fs = require('fs');
const path = require('path');

// Base directory is the AGAP Portal root
const rootDir = path.resolve(__dirname, '..');

// Load environment variables (.env.server takes precedence for production credentials, fallback to .env)
let dotenv;
try {
  dotenv = require('dotenv');
} catch (e) {
  dotenv = require(path.join(rootDir, 'backend', 'node_modules', 'dotenv'));
}

const envServerPath = path.join(rootDir, '.env.server');
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envServerPath)) {
  dotenv.config({ path: envServerPath });
}
dotenv.config({ path: envPath });

let Pool;
try {
  Pool = require('pg').Pool;
} catch (e) {
  Pool = require(path.join(rootDir, 'backend', 'node_modules', 'pg')).Pool;
}

// Target database connection string (AGAP production database)
const sourceUrl = process.env.BACKUP_SOURCE_URL || 
  process.argv[2] || 
  process.env.DATABASE_URL || 
  'postgres://Administrator1:pRZTbQ2T1JD7@stride-posgre-prod-01.postgres.database.azure.com:5432/AGAP?sslmode=require';

if (!sourceUrl) {
  console.error('❌ Error: Database connection string not found.');
  process.exit(1);
}

// Determine backup folder based on current date (YYYYMMDD)
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const dateStamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
const backupDir = path.join(__dirname, 'backups', `server_backup_${dateStamp}`);

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// SSL Configuration: rejectUnauthorized: false is used to connect to Azure PostgreSQL
// Flexible Server via TLS/SSL without requiring a locally pinned DigiCert root CA bundle.
const pool = new Pool({
  connectionString: sourceUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});

// Escape value safely for PostgreSQL INSERT statements
function escapeSqlValue(val, colType) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return Number.isFinite(val) ? String(val) : 'NULL';
  if (val instanceof Date) {
    if (colType === 'date') {
      const yyyy = val.getFullYear();
      const mm = String(val.getMonth() + 1).padStart(2, '0');
      const dd = String(val.getDate()).padStart(2, '0');
      return `'${yyyy}-${mm}-${dd}'`;
    }
    return `'${val.toISOString()}'`;
  }
  
  if (colType === 'ARRAY' || (Array.isArray(val) && colType !== 'jsonb')) {
    if (!val || (Array.isArray(val) && val.length === 0)) return "'{}'::text[]";
    const arr = Array.isArray(val) ? val : [val];
    const items = arr.map(x => `'${String(x).replace(/'/g, "''").replace(/\0/g, '')}'`).join(', ');
    return `ARRAY[${items}]::text[]`;
  }

  if (typeof val === 'object') {
    if (Buffer.isBuffer(val)) {
      return `'\\x${val.toString('hex')}'`;
    }
    const jsonStr = JSON.stringify(val).replace(/'/g, "''").replace(/\0/g, '');
    return `'${jsonStr}'::jsonb`;
  }

  const str = String(val).replace(/'/g, "''").replace(/\0/g, '');
  return `'${str}'`;
}

// Helper to write to stream with backpressure handling
function writeToStream(stream, data) {
  return new Promise((resolve) => {
    if (!stream.write(data)) {
      stream.once('drain', resolve);
    } else {
      process.nextTick(resolve);
    }
  });
}

// Map column data type to SQL DDL type definition
function mapColumnType(col) {
  const dt = (col.data_type || '').toLowerCase();
  const udt = (col.udt_name || '').toLowerCase();
  
  if (dt === 'character varying') {
    return col.character_maximum_length ? `VARCHAR(${col.character_maximum_length})` : 'VARCHAR(255)';
  }
  if (dt === 'character') {
    return `CHAR(${col.character_maximum_length || 1})`;
  }
  if (dt === 'text') return 'TEXT';
  if (dt === 'integer') return 'INT';
  if (dt === 'bigint') return 'BIGINT';
  if (dt === 'smallint') return 'SMALLINT';
  if (dt === 'boolean') return 'BOOLEAN';
  if (dt === 'timestamp with time zone') return 'TIMESTAMPTZ';
  if (dt === 'timestamp without time zone') return 'TIMESTAMP';
  if (dt === 'date') return 'DATE';
  if (dt === 'time with time zone') return 'TIMETZ';
  if (dt === 'time without time zone') return 'TIME';
  if (dt === 'numeric' || dt === 'decimal') {
    if (col.numeric_precision && col.numeric_scale) {
      return `NUMERIC(${col.numeric_precision},${col.numeric_scale})`;
    }
    return 'NUMERIC';
  }
  if (dt === 'double precision') return 'DOUBLE PRECISION';
  if (dt === 'real') return 'REAL';
  if (dt === 'jsonb') return 'JSONB';
  if (dt === 'json') return 'JSON';
  if (dt === 'uuid') return 'UUID';
  if (dt === 'bytea') return 'BYTEA';
  if (dt === 'user-defined') return udt.toUpperCase() || 'VARCHAR(255)';
  if (dt === 'array') return 'TEXT[]';
  
  return col.udt_name ? col.udt_name.toUpperCase() : 'TEXT';
}

async function runBackup() {
  const startTime = Date.now();
  console.log('================================================================');
  console.log('📦 Starting AGAP Production Database Backup');
  console.log(`   Source Database: AGAP (Azure PostgreSQL Flexible Server)`);
  console.log(`   Target Output: ${backupDir}`);
  console.log('   Mode: STRICT READ-ONLY SAFE TRANSACTION (Zero writes to server)');
  console.log('   Streaming: Memory-Safe Server-Side Cursors (FETCH 500)');
  console.log('================================================================');
  console.log('⚠️  SCOPE NOTICE:');
  console.log('   This is a Tables + Column Definitions + Row Data export.');
  console.log('   It is NOT a full PostgreSQL disaster-recovery backup.');
  console.log('   Excluded objects: Foreign Keys, Secondary Indexes, Unique/Check');
  console.log('   Constraints (except PK), Sequences/Identity State, Triggers,');
  console.log('   Functions/Procedures, Views, Extensions, Roles/Permissions.');
  console.log('================================================================\n');

  const client = await pool.connect();
  const manifest = {
    backupDate: new Date().toISOString(),
    databaseName: 'AGAP',
    host: 'stride-posgre-prod-01.postgres.database.azure.com',
    backupType: 'Tables and Data Export (Memory-Safe Cursor Stream)',
    excludedObjects: [
      'foreign keys',
      'secondary indexes',
      'unique/check constraints',
      'sequences/identity state',
      'triggers',
      'functions/procedures',
      'views',
      'extensions',
      'roles/permissions'
    ],
    tables: {},
    totalRows: 0,
  };

  const sqlOutPath = path.join(backupDir, 'agap_production_backup.sql');
  const sqlStream = fs.createWriteStream(sqlOutPath, { encoding: 'utf8' });

  await writeToStream(sqlStream, `-- ====================================================================\n`);
  await writeToStream(sqlStream, `-- AGAP Portal Production Database Backup (Tables & Data Export)\n`);
  await writeToStream(sqlStream, `-- Extracted from Server: stride-posgre-prod-01.postgres.database.azure.com / AGAP\n`);
  await writeToStream(sqlStream, `-- Timestamp: ${manifest.backupDate}\n`);
  await writeToStream(sqlStream, `-- Mode: STRICT READ-ONLY SAFE EXTRACTION (Zero writes performed on server)\n`);
  await writeToStream(sqlStream, `-- NOTICE: Does NOT include foreign keys, secondary indexes, triggers,\n`);
  await writeToStream(sqlStream, `--         sequences, views, functions, extensions, or permissions.\n`);
  await writeToStream(sqlStream, `-- ====================================================================\n\n`);
  await writeToStream(sqlStream, `BEGIN;\n\n`);

  try {
    await client.query('BEGIN READ ONLY;');
    console.log('🔒 [Backup] Safe read-only transaction started on server.');

    // Introspect live database connection to guarantee and verify target identity directly from PostgreSQL
    const dbInfoRes = await client.query(`
      SELECT 
        current_database() as database_name, 
        current_user as user_name,
        inet_server_addr() as server_ip,
        version() as pg_version;
    `);
    const dbInfo = dbInfoRes.rows[0];
    manifest.databaseName = dbInfo.database_name;
    manifest.connectedUser = dbInfo.user_name;
    manifest.serverIp = dbInfo.server_ip ? String(dbInfo.server_ip) : 'stride-posgre-prod-01.postgres.database.azure.com';

    console.log(`\n🔍 [Verified Connection Identity]`);
    console.log(`   Database Name: ${dbInfo.database_name} ${dbInfo.database_name === 'AGAP' ? '✅ (PROD CONFIRMED)' : '⚠️ (NON-PROD)'}`);
    console.log(`   Database User: ${dbInfo.user_name}`);
    console.log(`   PostgreSQL Version: ${dbInfo.pg_version.split(' on ')[0]}`);

    // 1. Discover all base tables in the public schema
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const tables = tablesRes.rows.map(r => r.table_name);
    console.log(`\n📋 Found ${tables.length} tables to export from ${dbInfo.database_name}.\n`);

    for (const table of tables) {
      console.log(`--> Processing table: "${table}"...`);

      // 2. Introspect table columns
      const colRes = await client.query(`
        SELECT 
          column_name, 
          data_type, 
          udt_name, 
          is_nullable, 
          column_default,
          character_maximum_length,
          numeric_precision,
          numeric_scale
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = $1
        ORDER BY ordinal_position;
      `, [table]);

      if (colRes.rows.length === 0) {
        console.log(`    ⚠️  Skipped (No columns found)`);
        continue;
      }

      // 3. Introspect primary keys
      const pkRes = await client.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_schema = 'public'
          AND tc.table_name = $1
        ORDER BY kcu.ordinal_position;
      `, [table]);

      const pkCols = pkRes.rows.map(r => `"${r.column_name}"`);

      // 4. Generate DDL
      await writeToStream(sqlStream, `-- Table Definition: ${table}\n`);
      await writeToStream(sqlStream, `CREATE TABLE IF NOT EXISTS "${table}" (\n`);

      const colDefs = colRes.rows.map(col => {
        const typeStr = mapColumnType(col);
        const nullStr = col.is_nullable === 'NO' ? ' NOT NULL' : '';
        const defStr = col.column_default && !col.column_default.startsWith('nextval') 
          ? ` DEFAULT ${col.column_default}` 
          : '';
        return `  "${col.column_name}" ${typeStr}${nullStr}${defStr}`;
      });

      if (pkCols.length > 0) {
        colDefs.push(`  PRIMARY KEY (${pkCols.join(', ')})`);
      }

      await writeToStream(sqlStream, colDefs.join(',\n') + '\n);\n\n');

      // 5. Stream Table Data using Cursor (Memory-Safe FETCH 500)
      const cursorName = `cur_${table.replace(/[^a-zA-Z0-9_]/g, '_')}_${Date.now()}`;
      await client.query(`DECLARE "${cursorName}" NO SCROLL CURSOR FOR SELECT * FROM "${table}";`);

      const columns = colRes.rows.map(c => c.column_name);
      const colTypeMap = {};
      colRes.rows.forEach(c => {
        colTypeMap[c.column_name] = c.data_type;
      });

      const colListStr = columns.map(c => `"${c}"`).join(', ');
      let tableRowCount = 0;
      const batchSize = 500;

      while (true) {
        const fetchRes = await client.query(`FETCH ${batchSize} FROM "${cursorName}";`);
        const rows = fetchRes.rows;
        if (rows.length === 0) break;

        tableRowCount += rows.length;

        await writeToStream(sqlStream, `INSERT INTO "${table}" (${colListStr}) VALUES\n`);
        const valueRows = rows.map(row => {
          const valList = columns.map(col => escapeSqlValue(row[col], colTypeMap[col]));
          return `  (${valList.join(', ')})`;
        });
        await writeToStream(sqlStream, valueRows.join(',\n') + ';\n\n');
      }

      await client.query(`CLOSE "${cursorName}";`);

      manifest.tables[table] = tableRowCount;
      manifest.totalRows += tableRowCount;
      console.log(`    ✅ Exported ${tableRowCount.toLocaleString()} rows.`);
    }

    await writeToStream(sqlStream, `COMMIT;\n`);
    sqlStream.end();

    await client.query('ROLLBACK;');
    console.log('\n🔒 [Backup] Safe read-only transaction closed. ZERO changes made to server database.');

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const stats = fs.statSync(sqlOutPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('================================================================');
    console.log(`🎉 Backup successfully created!`);
    console.log(`   File: ${sqlOutPath}`);
    console.log(`   File Size: ${sizeMb} MB (${stats.size.toLocaleString()} bytes)`);
    console.log(`   Total Tables Exported: ${Object.keys(manifest.tables).length}`);
    console.log(`   Total Rows Dumped: ${manifest.totalRows.toLocaleString()}`);
    console.log(`   Duration: ${elapsed}s`);
    console.log('================================================================');

    const manifestPath = path.join(backupDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  } catch (err) {
    try { await client.query('ROLLBACK;'); } catch (e) {}
    console.error('❌ [Backup] Error during backup:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runBackup();
