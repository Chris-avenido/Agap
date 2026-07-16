"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresApplicantRepository = void 0;
class PostgresApplicantRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async findByEmail(email) {
        const result = await this.pool.query(`SELECT id, applicant_number, email_address, password_hash
       FROM applicants
       WHERE LOWER(TRIM(email_address)) = $1
       LIMIT 1`, [email.trim().toLowerCase()]);
        return result.rows[0] ?? null;
    }
}
exports.PostgresApplicantRepository = PostgresApplicantRepository;
//# sourceMappingURL=applicants.repository.js.map