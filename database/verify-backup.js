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

const pool = new Pool({
  connectionString: sourceUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});

async function verifyBackup() {
  console.log('================================================================');
  console.log('🔍 AGAP Production Backup Verification Tool');
  console.log('   Mode: STRICT READ-ONLY (Zero writes performed)');
  console.log('================================================================\n');

  // 1. Locate latest backup folder
  const backupsBase = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupsBase)) {
    console.error('❌ No backups directory found at:', backupsBase);
    console.log('👉 Please run `backup.bat` or `npm run backup` first.');
    process.exit(1);
  }

  const backupDirs = fs.readdirSync(backupsBase)
    .filter(name => fs.statSync(path.join(backupsBase, name)).isDirectory() && name.startsWith('server_backup_'))
    .sort()
    .reverse();

  if (backupDirs.length === 0) {
    console.error('❌ No backup folders found in:', backupsBase);
    console.log('👉 Please run `backup.bat` or `npm run backup` first.');
    process.exit(1);
  }

  const latestDir = path.join(backupsBase, backupDirs[0]);
  const manifestPath = path.join(latestDir, 'manifest.json');
  const sqlPath = path.join(latestDir, 'agap_production_backup.sql');
  const dbPath = path.join(latestDir, 'agap_production_backup.db');

  console.log(`📁 Inspecting Latest Backup Directory: ${latestDir}`);

  if (!fs.existsSync(manifestPath)) {
    console.error('❌ Manifest file missing:', manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  if (fs.existsSync(dbPath)) {
    const dbStats = fs.statSync(dbPath);
    const dbSizeMb = (dbStats.size / (1024 * 1024)).toFixed(2);
    console.log(`📦 SQLite Database:  agap_production_backup.db (${dbSizeMb} MB) ✅`);
  }

  if (fs.existsSync(sqlPath)) {
    const sqlStats = fs.statSync(sqlPath);
    const sqlSizeMb = (sqlStats.size / (1024 * 1024)).toFixed(2);
    console.log(`📄 SQL Script Dump:  agap_production_backup.sql (${sqlSizeMb} MB) ✅`);
  }

  console.log(`⏱️  Backup Timestamp: ${manifest.backupDate}`);
  console.log(`🏷️  Manifest Database: ${manifest.databaseName}`);
  console.log('----------------------------------------------------------------\n');

  // 2. Connect to Live Database (Read-Only)
  const client = await pool.connect();
  try {
    await client.query('BEGIN READ ONLY;');

    const dbIdentityRes = await client.query(`
      SELECT 
        current_database() as database_name, 
        current_user as user_name,
        inet_server_addr() as server_ip,
        version() as pg_version;
    `);
    const dbInfo = dbIdentityRes.rows[0];

    console.log('🌐 [Live Database Identity]');
    console.log(`   Connected Database: ${dbInfo.database_name} ${dbInfo.database_name === 'AGAP' ? '✅ (PROD CONFIRMED)' : '⚠️ (NON-PROD)'}`);
    console.log(`   Connected User:     ${dbInfo.user_name}`);
    console.log(`   Server Address:     ${dbInfo.server_ip || 'stride-posgre-prod-01.postgres.database.azure.com'}\n`);

    // 3. Compare row counts table by table
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('📊 [Table-by-Table Comparison: Live Production vs. Backup File]');
    console.log('-------------------------------------------------------------------------');
    console.log(
      'Table Name'.padEnd(35) + 
      'Live Rows'.padStart(12) + 
      'Backup Rows'.padStart(14) + 
      '  Status'
    );
    console.log('-------------------------------------------------------------------------');

    let totalLiveRows = 0;
    let matchCount = 0;
    let mismatchCount = 0;

    for (const r of tablesRes.rows) {
      const table = r.table_name;
      const countRes = await client.query(`SELECT COUNT(*)::int as count FROM "${table}"`);
      const liveCount = countRes.rows[0].count;
      const backupCount = manifest.tables[table] !== undefined ? manifest.tables[table] : 'N/A';
      totalLiveRows += liveCount;

      let status = '';
      if (backupCount === liveCount) {
        status = '✅ MATCH';
        matchCount++;
      } else if (backupCount === 'N/A') {
        status = '⚠️ MISSING';
        mismatchCount++;
      } else {
        status = `ℹ️ DIFF (Live: ${liveCount}, Backup: ${backupCount})`;
      }

      console.log(
        table.padEnd(35) + 
        String(liveCount.toLocaleString()).padStart(12) + 
        String(typeof backupCount === 'number' ? backupCount.toLocaleString() : backupCount).padStart(14) + 
        '  ' + status
      );
    }

    console.log('-------------------------------------------------------------------------');
    console.log(`Total Live Rows in DB:    ${totalLiveRows.toLocaleString()}`);
    console.log(`Total Dumped in Backup:   ${manifest.totalRows.toLocaleString()}`);
    console.log(`Database Identity Match:  ${dbInfo.database_name === manifest.databaseName ? '✅ YES (' + dbInfo.database_name + ')' : '❌ MISMATCH'}`);
    console.log('================================================================');

    await client.query('ROLLBACK;');
  } finally {
    client.release();
    await pool.end();
  }
}

verifyBackup().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
