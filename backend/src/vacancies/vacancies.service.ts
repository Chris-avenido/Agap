import { pool } from '../database';

export class VacanciesService {
  static async getOpenVacancies() {
    const result = await pool.query('SELECT * FROM vacancies WHERE status = $1 ORDER BY posting_start DESC', ['open']);
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
}
