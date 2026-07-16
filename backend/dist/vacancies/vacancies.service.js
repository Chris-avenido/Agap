"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacanciesService = void 0;
const database_1 = require("../database");
class VacanciesService {
    static async getOpenVacancies() {
        const result = await database_1.pool.query('SELECT * FROM vacancies WHERE status = $1 ORDER BY posting_start DESC', ['open']);
        return result.rows;
    }
    static async markExpiredVacancies() {
        const result = await database_1.pool.query(`
      UPDATE vacancies
      SET status = 'EXPIRED'
      WHERE status = 'open' AND posting_end <= CURRENT_DATE
    `);
        return result.rowCount;
    }
}
exports.VacanciesService = VacanciesService;
//# sourceMappingURL=vacancies.service.js.map