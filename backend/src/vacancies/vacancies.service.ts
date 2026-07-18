import { pool } from '../database';

export class VacanciesService {
  static async getOpenVacancies() {
    const result = await pool.query(`
      SELECT 
        v.*,
        p.salary_grade,
        p.required_bachelor_degree
      FROM vacancies v
      LEFT JOIN positions p ON v.position_id = p.id
      WHERE v.status = $1 
      ORDER BY v.posting_start DESC
    `, ['open']);
    return result.rows;
  }

  static async markExpiredVacancies() {
    const result = await pool.query(`
      UPDATE vacancies
      SET status = 'EXPIRED'
      WHERE status = 'open' AND posting_end <= CURRENT_DATE
    `);
    return result.rowCount;
  }

  static async getAgapLocations() {
    const regionsResult = await pool.query('SELECT region FROM agap_schools WHERE region IS NOT NULL GROUP BY region ORDER BY region');
    const divisionsResult = await pool.query('SELECT division FROM agap_schools WHERE division IS NOT NULL GROUP BY division ORDER BY division');
    return {
      regions: regionsResult.rows.map(r => r.region),
      divisions: divisionsResult.rows.map(r => r.division)
    };
  }
}
