import { Pool } from 'pg';
export interface HqTokenReplayRepository {
    consume(jti: string, expiresAt: Date): Promise<boolean>;
}
export declare class PostgresHqTokenReplayRepository implements HqTokenReplayRepository {
    private readonly pool;
    constructor(pool: Pool);
    consume(jti: string, expiresAt: Date): Promise<boolean>;
}
