import { Pool } from 'pg';

export interface HqTokenReplayRepository {
  consume(jti: string, expiresAt: Date): Promise<boolean>;
}

export class PostgresHqTokenReplayRepository implements HqTokenReplayRepository {
  constructor(private readonly pool: Pool) {}

  async consume(jti: string, expiresAt: Date): Promise<boolean> {
    await this.pool.query('DELETE FROM agap_sso_jti WHERE expires_at <= NOW()');
    const result = await this.pool.query(
      `INSERT INTO agap_sso_jti (jti, expires_at)
       VALUES ($1, $2)
       ON CONFLICT (jti) DO NOTHING
       RETURNING jti`,
      [jti, expiresAt],
    );
    return result.rowCount === 1;
  }
}
