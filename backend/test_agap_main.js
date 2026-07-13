const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://Administrator1:pRZTbQ2T1JD7@stride-posgre-prod-01.postgres.database.azure.com:5432/AGAP-main?sslmode=require',
});

async function run() {
  try {
    const result = await pool.query("SELECT email_address FROM applicants LIMIT 5");
    console.log("Applicants emails:", result.rows);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
