import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { Request, Response, Router } from 'express';
import { Pool, PoolClient } from 'pg';

const MAX_HQ_TOKEN_AGE_SECONDS = 60;

type JwtClaims = { iss: string; aud: string; sub: string; email: string; role?: string; iat: number; exp: number; jti: string };
export type AgapUser = { uid: string; email: string; role: string | null; first_name: string | null; last_name: string | null };

export interface HqSsoStore {
  consumeAndFindUser(jti: string, email: string): Promise<AgapUser | null>;
  findActiveUser(uid: string, email: string): Promise<AgapUser | null>;
}

export class ReusedTokenError extends Error {}

export class PostgresHqSsoStore implements HqSsoStore {
  constructor(private readonly pool: Pool) {}

  async consumeAndFindUser(jti: string, email: string): Promise<AgapUser | null> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`INSERT INTO agap_sso_jti (jti, expires_at) VALUES ($1, NOW() + INTERVAL '5 minutes')`, [jti]);
      const user = await this.findByEmail(client, email);
      await client.query('COMMIT');
      return user;
    } catch (error: any) {
      await client.query('ROLLBACK');
      if (error?.code === '23505' && error?.constraint === 'agap_sso_jti_pkey') throw new ReusedTokenError();
      throw error;
    } finally {
      client.release();
    }
  }

  async findActiveUser(uid: string, email: string): Promise<AgapUser | null> {
    const result = await this.pool.query<AgapUser>(`${this.activeUserSelect()} AND uid = $1 AND LOWER(TRIM(email)) = $2 LIMIT 1`, [uid, email]);
    return result.rows[0] ?? null;
  }

  private async findByEmail(client: PoolClient, email: string): Promise<AgapUser | null> {
    const result = await client.query<AgapUser>(`${this.activeUserSelect()} AND LOWER(TRIM(email)) = $1 LIMIT 1`, [email]);
    return result.rows[0] ?? null;
  }

  private activeUserSelect(): string {
    return `SELECT uid, email, role, first_name, last_name FROM users
            WHERE COALESCE(disabled, false) = false
              AND LOWER(COALESCE(registration_status, 'valid')) IN ('valid', 'active')`;
  }
}

export type HqSsoConfig = {
  ssoSecret: string; authSecret: string; issuer: string; audience: string;
  authIssuer: string; authAudience: string; frontendCallback: string;
  successRedirect: string; authTokenTtlSeconds: number;
};

function decodeBase64Url(value: string): Buffer {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Malformed JWT');
  return Buffer.from(value, 'base64url');
}

function verifyJwt(token: string, secret: string): JwtClaims {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT');
  const [headerPart, payloadPart, signaturePart] = parts;
  const header = JSON.parse(decodeBase64Url(headerPart).toString('utf8'));
  if (header?.alg !== 'HS256') throw new Error('Unsupported JWT algorithm');
  const supplied = decodeBase64Url(signaturePart);
  const expected = createHmac('sha256', secret).update(`${headerPart}.${payloadPart}`).digest();
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) throw new Error('Invalid JWT signature');
  return JSON.parse(decodeBase64Url(payloadPart).toString('utf8')) as JwtClaims;
}

export function verifyHqToken(token: string, config: HqSsoConfig, now = Math.floor(Date.now() / 1000)): JwtClaims {
  const claims = verifyJwt(token, config.ssoSecret);
  if (claims.iss !== config.issuer || claims.aud !== config.audience ||
      typeof claims.sub !== 'string' || !claims.sub.trim() || typeof claims.email !== 'string' || !claims.email.trim() ||
      typeof claims.iat !== 'number' || !Number.isInteger(claims.iat) || typeof claims.exp !== 'number' || !Number.isInteger(claims.exp) ||
      typeof claims.jti !== 'string' || !claims.jti.trim()) throw new Error('Missing or invalid JWT claims');
  if (claims.exp <= now) throw new Error('Expired JWT');
  if (claims.iat > now || now - claims.iat > MAX_HQ_TOKEN_AGE_SECONDS) throw new Error('JWT is too old');
  return claims;
}

function signAgapToken(user: AgapUser, config: HqSsoConfig, now = Math.floor(Date.now() / 1000)): string {
  if (!user.role) throw new Error('AGAP user has no assigned role');
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: config.authIssuer, aud: config.authAudience, sub: user.uid, email: user.email, role: user.role,
    iat: now, exp: now + config.authTokenTtlSeconds, jti: randomUUID(),
  })).toString('base64url');
  const signature = createHmac('sha256', config.authSecret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifyAgapToken(token: string, config: HqSsoConfig, now = Math.floor(Date.now() / 1000)): JwtClaims {
  const claims = verifyJwt(token, config.authSecret);
  if (claims.iss !== config.authIssuer || claims.aud !== config.authAudience ||
      typeof claims.sub !== 'string' || !claims.sub || typeof claims.email !== 'string' || !claims.email ||
      typeof claims.role !== 'string' || !claims.role || typeof claims.iat !== 'number' ||
      typeof claims.exp !== 'number' || typeof claims.jti !== 'string' || !claims.jti || claims.exp <= now || claims.iat > now) {
    throw new Error('Invalid AGAP token');
  }
  return claims;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const bearerToken = (req: Request) => req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7).trim() : null;

export function createHqSsoRouter(store: HqSsoStore, config: HqSsoConfig): Router {
  const router = Router();

  router.get('/hq-sso', async (req: Request, res: Response) => {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    if (!token) return res.status(400).json({ message: 'Missing SSO token' });
    let claims: JwtClaims;
    try { claims = verifyHqToken(token, config); } catch { return res.status(401).json({ message: 'Invalid SSO token' }); }
    try {
      const user = await store.consumeAndFindUser(claims.jti, normalizeEmail(claims.email));
      if (!user?.role) return res.status(403).json({ message: 'AGAP user is not authorized' });
      const agapToken = signAgapToken(user, config);
      return res.redirect(302, `${config.frontendCallback}#token=${encodeURIComponent(agapToken)}`);
    } catch (error) {
      if (error instanceof ReusedTokenError) return res.status(409).json({ message: 'SSO token has already been used' });
      return res.status(500).json({ message: 'Unable to authenticate' });
    }
  });

  router.get('/me', async (req: Request, res: Response) => {
    const token = bearerToken(req);
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    try {
      const claims = verifyAgapToken(token, config);
      const user = await store.findActiveUser(claims.sub, normalizeEmail(claims.email));
      if (!user?.role) return res.status(401).json({ message: 'User is no longer authorized' });
      return res.json({ success: true, data: user, landingRoute: config.successRedirect });
    } catch { return res.status(401).json({ message: 'Invalid or expired token' }); }
  });
  return router;
}

export function loadHqSsoConfig(env: NodeJS.ProcessEnv): HqSsoConfig {
  const required = ['AGAP_SSO_SHARED_SECRET', 'AGAP_AUTH_JWT_SECRET', 'AGAP_SSO_ISSUER', 'AGAP_SSO_AUDIENCE', 'AGAP_AUTH_ISSUER', 'AGAP_AUTH_AUDIENCE', 'AGAP_SSO_FRONTEND_CALLBACK', 'AGAP_SSO_SUCCESS_REDIRECT'] as const;
  for (const name of required) if (!env[name]) throw new Error(`${name} is required`);
  if (env.AGAP_SSO_SHARED_SECRET!.length < 32 || env.AGAP_AUTH_JWT_SECRET!.length < 32) throw new Error('JWT secrets must contain at least 32 characters');
  for (const name of ['AGAP_SSO_FRONTEND_CALLBACK', 'AGAP_SSO_SUCCESS_REDIRECT'] as const) {
    if (!/^\/(?!\/)/.test(env[name]!)) throw new Error(`${name} must be an AGAP-local path`);
  }
  const ttl = Number(env.AGAP_AUTH_TOKEN_TTL_SECONDS || 10800);
  if (!Number.isInteger(ttl) || ttl <= 0) throw new Error('AGAP_AUTH_TOKEN_TTL_SECONDS must be a positive integer');
  return {
    ssoSecret: env.AGAP_SSO_SHARED_SECRET!, authSecret: env.AGAP_AUTH_JWT_SECRET!, issuer: env.AGAP_SSO_ISSUER!,
    audience: env.AGAP_SSO_AUDIENCE!, authIssuer: env.AGAP_AUTH_ISSUER!, authAudience: env.AGAP_AUTH_AUDIENCE!,
    frontendCallback: env.AGAP_SSO_FRONTEND_CALLBACK!, successRedirect: env.AGAP_SSO_SUCCESS_REDIRECT!, authTokenTtlSeconds: ttl,
  };
}
