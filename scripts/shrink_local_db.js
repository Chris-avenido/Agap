const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'agap_production_backup.db');
console.log('Connecting to:', dbPath);

const db = new DatabaseSync(dbPath);

console.log('--- Initial counts ---');
const getCount = (tbl) => {
  try {
    return db.prepare(`SELECT count(*) as c FROM ${tbl}`).get().c;
  } catch (e) {
    return 'N/A';
  }
};

console.log('applicants:', getCount('applicants'));
console.log('document_audit_logs:', getCount('document_audit_logs'));
console.log('application_history:', getCount('application_history'));
console.log('qual_evals:', getCount('qual_evals'));
console.log('vacancies:', getCount('vacancies'));

// 1. Drop or truncate obsolete internal backup table
console.log('\nCleaning obsolete backup tables...');
try {
  db.exec('DROP TABLE IF EXISTS applicants_backup_20260810;');
  console.log('Dropped applicants_backup_20260810');
} catch (e) {
  console.warn(e.message);
}

// 2. Select applicant IDs to keep:
// Keep all reclass applicants + top 100 + latest 50 applicants
const keepApplicants = db.prepare(`
  SELECT id FROM applicants 
  WHERE registrant_type = 'reclass' 
     OR plantilla_item_number IS NOT NULL
     OR id IN (SELECT id FROM applicants ORDER BY id ASC LIMIT 100)
     OR id IN (SELECT id FROM applicants ORDER BY id DESC LIMIT 50)
`).all().map(r => r.id);

console.log(`Identified ${keepApplicants.length} applicants to keep.`);

// Delete other applicants
const keepAppSet = new Set(keepApplicants);
console.log('Pruning applicants table...');
db.exec(`
  DELETE FROM applicants 
  WHERE registrant_type != 'reclass' 
    AND plantilla_item_number IS NULL
    AND id NOT IN (SELECT id FROM applicants ORDER BY id ASC LIMIT 100)
    AND id NOT IN (SELECT id FROM applicants ORDER BY id DESC LIMIT 50);
`);
console.log('Remaining applicants:', getCount('applicants'));

// 3. Prune dependent tables
console.log('Pruning dependent tables...');
db.exec(`
  DELETE FROM document_audit_logs WHERE applicant_id NOT IN (SELECT id FROM applicants);
`);
console.log('Remaining document_audit_logs:', getCount('document_audit_logs'));

db.exec(`
  DELETE FROM applications WHERE applicant_id NOT IN (SELECT id FROM applicants);
`);
console.log('Remaining applications:', getCount('applications'));

db.exec(`
  DELETE FROM application_history WHERE application_id NOT IN (SELECT id FROM applications);
`);
console.log('Remaining application_history:', getCount('application_history'));

db.exec(`
  DELETE FROM qual_evals WHERE application_id NOT IN (SELECT id FROM applications);
`);
console.log('Remaining qual_evals:', getCount('qual_evals'));

db.exec(`
  DELETE FROM saved_clusters WHERE applicant_id NOT IN (SELECT id FROM applicants);
`);
console.log('Remaining saved_clusters:', getCount('saved_clusters'));

// 4. Prune vacancies: keep a solid sample across regions/divisions (~300 vacancies)
console.log('Pruning vacancies to a representative sample (~300)...');
db.exec(`
  DELETE FROM vacancies 
  WHERE id NOT IN (
    SELECT id FROM (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY region, division ORDER BY id) as rn
      FROM vacancies
    ) WHERE rn <= 3
  );
`);
console.log('Remaining vacancies:', getCount('vacancies'));

// 5. Seed extra reclass_gc items for easy testing
console.log('Seeding extra GMIS reclass items for testing...');
const seedItems = [
  { item_no: 'GC-04', current_position: 'GUIDANCE COORDINATOR I', first_name: 'JUAN', last_name: 'LUNA', email: 'JUAN.LUNA@DEPED.GOV.PH', region: 'REGION IV-A', division: 'CAVITE', school_name: 'CAVITE NATIONAL HIGH SCHOOL' },
  { item_no: 'GC-05', current_position: 'GUIDANCE COORDINATOR II', first_name: 'GABRIELA', last_name: 'SILANG', email: 'GABRIELA.SILANG@DEPED.GOV.PH', region: 'REGION I', division: 'ILOCOS SUR', school_name: 'VIGAN NATIONAL HIGH SCHOOL' },
  { item_no: 'GC-06', current_position: 'GUIDANCE COORDINATOR III', first_name: 'ANDRES', last_name: 'BONIFACIO', email: 'ANDRES.BONIFACIO@DEPED.GOV.PH', region: 'NCR', division: 'MANILA', school_name: 'MANILA HIGH SCHOOL' },
  { item_no: 'GC-07', current_position: 'GUIDANCE COORDINATOR I', first_name: 'MELCHORA', last_name: 'AQUINO', email: 'MELCHORA.AQUINO@DEPED.GOV.PH', region: 'NCR', division: 'QUEZON CITY', school_name: 'QUEZON CITY HIGH SCHOOL' },
  { item_no: 'GC-08', current_position: 'GUIDANCE COUNSELOR I', first_name: 'JOSE', last_name: 'RIZAL', email: 'JOSE.RIZAL@DEPED.GOV.PH', region: 'REGION IV-A', division: 'LAGUNA', school_name: 'CALAMBA HIGH SCHOOL' },
];

for (const item of seedItems) {
  const existing = db.prepare('SELECT id FROM reclass_gc WHERE item_no = ?').get(item.item_no);
  if (!existing) {
    db.prepare(`
      INSERT INTO reclass_gc (
        item_no, current_position, first_name, last_name, email, region, division, school_name,
        qs_status, stage_of_reclassification, reclass_position, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'QUALIFIED', 'FOR REVIEW', 'SCHOOL COUNSELOR II', datetime('now'), datetime('now'))
    `).run(
      item.item_no, item.current_position, item.first_name, item.last_name, item.email,
      item.region, item.division, item.school_name
    );
    console.log(`+ Seeded GMIS Plantilla Item: ${item.item_no} (${item.first_name} ${item.last_name})`);
  }
}
console.log('Total reclass_gc items:', getCount('reclass_gc'));

// 6. VACUUM to reclaim disk space
console.log('\nRunning VACUUM to reclaim disk space and shrink file...');
db.exec('PRAGMA wal_checkpoint(TRUNCATE);');
db.exec('VACUUM;');
db.exec('PRAGMA optimize;');

db.close();

const stats = fs.statSync(dbPath);
console.log(`\n🎉 Done! New database size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
