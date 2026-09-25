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

// Initialize SQLite database connection with resilient driver fallback
function initSqliteDatabase(dbPath) {
  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath);
    } catch (e) {}
  }
  // Try Node.js built-in node:sqlite (Node 22.5+)
  try {
    const { DatabaseSync } = require('node:sqlite');
    const db = new DatabaseSync(dbPath);
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA synchronous = NORMAL;');
    db.exec('PRAGMA temp_store = MEMORY;');
    return {
      type: 'DatabaseSync (Node Built-in)',
      exec: (sql) => db.exec(sql),
      prepare: (sql) => db.prepare(sql),
      close: () => {
        try { db.exec('PRAGMA wal_checkpoint(TRUNCATE);'); } catch (e) {}
        try { db.exec('PRAGMA optimize;'); } catch (e) {}
        db.close();
      }
    };
  } catch (e) {
    // Try better-sqlite3 fallback
    try {
      let Database;
      try {
        Database = require('better-sqlite3');
      } catch (err) {
        Database = require(path.join(rootDir, 'backend', 'node_modules', 'better-sqlite3'));
      }
      const db = new Database(dbPath);
      db.pragma('journal_mode = WAL');
      db.pragma('synchronous = NORMAL');
      return {
        type: 'better-sqlite3',
        exec: (sql) => db.exec(sql),
        prepare: (sql) => {
          const stmt = db.prepare(sql);
          return { run: (...args) => stmt.run(...args) };
        },
        close: () => {
          try { db.pragma('wal_checkpoint(TRUNCATE)'); } catch (err) {}
          db.close();
        }
      };
    } catch (err) {
      throw new Error(`No SQLite driver found. Please use Node.js 22.5+ or install better-sqlite3. (${e.message})`);
    }
  }
}

// Map PostgreSQL column data type to SQLite column affinity
function mapPgTypeToSqlite(dataType) {
  const dt = (dataType || '').toLowerCase();
  if (dt.includes('int') || dt === 'serial' || dt === 'bigserial') return 'INTEGER';
  if (dt.includes('bool')) return 'INTEGER';
  if (dt.includes('numeric') || dt.includes('decimal') || dt.includes('real') || dt.includes('double') || dt.includes('float')) return 'REAL';
  if (dt === 'bytea') return 'BLOB';
  return 'TEXT';
}

// Format JavaScript / Postgres value for SQLite insertion
function formatSqliteValue(val, colType) {
  if (val === null || val === undefined) return null;
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (typeof val === 'number') return Number.isFinite(val) ? val : null;
  if (val instanceof Date) {
    if (colType === 'date') {
      const yyyy = val.getFullYear();
      const mm = String(val.getMonth() + 1).padStart(2, '0');
      const dd = String(val.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return val.toISOString();
  }
  if (Buffer.isBuffer(val)) {
    return val;
  }
  if (typeof val === 'object') {
    return JSON.stringify(val);
  }
  return String(val);
}

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
  console.log(`   Target Output:   ${backupDir}`);
  console.log(`   Outputs:`);
  console.log(`     1. SQLite Database:  agap_production_backup.db`);
  console.log(`     2. SQL Script Dump:  agap_production_backup.sql`);
  console.log(`     3. Manifest Record:  manifest.json`);
  console.log('   Mode: STRICT READ-ONLY SAFE TRANSACTION (Zero writes to server)');
  console.log('   Streaming: Memory-Safe Server-Side Cursors (FETCH 500)');
  console.log('================================================================');
  console.log('⚠️  SCOPE NOTICE:');
  console.log('   This is a complete Tables + Column Definitions + Row Data export.');
  console.log('   All data is stored directly in a standalone SQLite .db database.');
  console.log('================================================================\n');

  const dbOutPath = path.join(backupDir, 'agap_production_backup.db');
  const sqlOutPath = path.join(backupDir, 'agap_production_backup.sql');

  const sqliteDb = initSqliteDatabase(dbOutPath);
  console.log(`[Backup] Initialized SQLite engine: ${sqliteDb.type}`);

  const client = await pool.connect();
  const manifest = {
    backupDate: new Date().toISOString(),
    databaseName: 'AGAP',
    host: 'stride-posgre-prod-01.postgres.database.azure.com',
    backupType: 'Tables and Data Export (Memory-Safe Cursor Stream)',
    sqliteFile: 'agap_production_backup.db',
    sqlFile: 'agap_production_backup.sql',
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

  const sqlStream = fs.createWriteStream(sqlOutPath, { encoding: 'utf8' });
  sqlStream.on('error', (err) => {
    console.error('❌ [SQL Stream Error]:', err.message);
  });

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

      // 4. Generate SQL DDL
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

      // 5. Generate SQLite DDL in .db
      const sqliteColDefs = colRes.rows.map(c => {
        const sqliteType = mapPgTypeToSqlite(c.data_type);
        let line = `  "${c.column_name}" ${sqliteType}`;
        if (c.is_nullable === 'NO' && pkCols.includes(`"${c.column_name}"`)) {
          line += ' NOT NULL';
        }
        return line;
      });
      if (pkCols.length > 0) {
        sqliteColDefs.push(`  PRIMARY KEY (${pkCols.join(', ')})`);
      }
      const createSqliteSql = `CREATE TABLE IF NOT EXISTS "${table}" (\n${sqliteColDefs.join(',\n')}\n);`;
      sqliteDb.exec(createSqliteSql);

      // 6. Stream Table Data using Cursor (Memory-Safe FETCH 500)
      const cursorName = `cur_${table.replace(/[^a-zA-Z0-9_]/g, '_')}_${Date.now()}`;
      await client.query(`DECLARE "${cursorName}" NO SCROLL CURSOR FOR SELECT * FROM "${table}";`);

      const columns = colRes.rows.map(c => c.column_name);
      const colTypeMap = {};
      colRes.rows.forEach(c => {
        colTypeMap[c.column_name] = c.data_type;
      });

      const colListStr = columns.map(c => `"${c}"`).join(', ');
      const sqlitePlaceholders = columns.map(() => '?').join(', ');
      const sqliteInsertStmt = sqliteDb.prepare(`INSERT INTO "${table}" (${colListStr}) VALUES (${sqlitePlaceholders});`);

      let tableRowCount = 0;
      const batchSize = 500;

      sqliteDb.exec('BEGIN TRANSACTION;');

      while (true) {
        const fetchRes = await client.query(`FETCH ${batchSize} FROM "${cursorName}";`);
        const rows = fetchRes.rows;
        if (rows.length === 0) break;

        tableRowCount += rows.length;

        // Write to SQL script
        await writeToStream(sqlStream, `INSERT INTO "${table}" (${colListStr}) VALUES\n`);
        const valueRows = rows.map(row => {
          const valList = columns.map(col => escapeSqlValue(row[col], colTypeMap[col]));
          return `  (${valList.join(', ')})`;
        });
        await writeToStream(sqlStream, valueRows.join(',\n') + ';\n\n');

        // Insert into SQLite binary database
        for (const row of rows) {
          const params = columns.map(col => formatSqliteValue(row[col], colTypeMap[col]));
          sqliteInsertStmt.run(...params);
        }
      }

      sqliteDb.exec('COMMIT;');
      await client.query(`CLOSE "${cursorName}";`);

      manifest.tables[table] = tableRowCount;
      manifest.totalRows += tableRowCount;
      console.log(`    ✅ Exported ${tableRowCount.toLocaleString()} rows into .db and .sql`);
    }

    await writeToStream(sqlStream, `COMMIT;\n`);
    await new Promise((resolve) => {
      sqlStream.end(() => resolve());
    });

    // Cleanly close SQLite connection
    sqliteDb.close();

    await client.query('ROLLBACK;');
    console.log('\n🔒 [Backup] Safe read-only transaction closed. ZERO changes made to server database.');

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const dbStats = fs.existsSync(dbOutPath) ? fs.statSync(dbOutPath) : { size: 0 };
    const sqlStats = fs.existsSync(sqlOutPath) ? fs.statSync(sqlOutPath) : { size: 0 };
    const dbSizeMb = (dbStats.size / (1024 * 1024)).toFixed(2);
    const sqlSizeMb = (sqlStats.size / (1024 * 1024)).toFixed(2);

    manifest.fileSizes = {
      sqliteDb: `${dbSizeMb} MB (${dbStats.size.toLocaleString()} bytes)`,
      sqlDump: `${sqlSizeMb} MB (${sqlStats.size.toLocaleString()} bytes)`,
    };

    console.log('================================================================');
    console.log(`🎉 Backup successfully created!`);
    console.log(`   📦 SQLite Database (.db): ${dbOutPath} [${dbSizeMb} MB]`);
    console.log(`   📄 SQL Script Dump (.sql): ${sqlOutPath} [${sqlSizeMb} MB]`);
    console.log(`   Total Tables Exported:    ${Object.keys(manifest.tables).length}`);
    console.log(`   Total Rows Exported:      ${manifest.totalRows.toLocaleString()}`);
    console.log(`   Duration:                 ${elapsed}s`);
    console.log('================================================================');

    const manifestPath = path.join(backupDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  } catch (err) {
    try { sqliteDb.close(); } catch (e) {}
    try { await client.query('ROLLBACK;'); } catch (e) {}
    console.error('❌ [Backup] Error during backup:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runBackup();
