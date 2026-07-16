"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresHqTokenReplayRepository = void 0;
class PostgresHqTokenReplayRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async consume(jti, expiresAt) {
        await this.pool.query('DELETE FROM agap_sso_jti WHERE expires_at <= NOW()');
        const result = await this.pool.query(`INSERT INTO agap_sso_jti (jti, expires_at)
       VALUES ($1, $2)
       ON CONFLICT (jti) DO NOTHING
       RETURNING jti`, [jti, expiresAt]);
        return result.rowCount === 1;
    }
}
exports.PostgresHqTokenReplayRepository = PostgresHqTokenReplayRepository;
//# sourceMappingURL=hq-sso.repository.js.map