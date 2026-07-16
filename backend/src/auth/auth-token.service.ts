import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { ApplicantAccount } from '../applicants/applicants.repository';

type JwtPayload = Record<string, unknown> & {
  iss?: unknown;
  aud?: unknown;
  sub?: unknown;
  type?: unknown;
  iat?: unknown;
  exp?: unknown;
  jti?: unknown;
};

export type HqTokenClaims = {
  iss: 'insighted-hq';
  aud: 'agap-applicants';
  sub: string;
  type: 'hq_sso';
  iat: number;
  exp: number;
  jti: string;
};

export type ApplicantAccessClaims = {
  iss: 'agap-applicants';
  aud: 'agap-applicants-web';
  sub: string;
  type: 'agap_access';
  applicant_number: string;
  email: string;
  role: 'Applicant';
  iat: number;
  exp: number;
  jti: string;
};

const APPLICANT_TOKEN_TTL_SECONDS = 3 * 60 * 60;
const MAX_HQ_TOKEN_TTL_SECONDS = 5 * 60;

function decodePart(value: string): Buffer {
  if (!value || !/^[A-Za-z0-9_-]+$/.test(value))
    throw new Error('Malformed JWT');
  return Buffer.from(value, 'base64url');
}

function readAndVerifyJwt(token: string, secret: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT');
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = JSON.parse(
    decodePart(encodedHeader).toString('utf8'),
  ) as Record<string, unknown>;
  if (header.alg !== 'HS256') throw new Error('Unsupported JWT algorithm');

  const suppliedSignature = decodePart(encodedSignature);
  const expectedSignature = createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    throw new Error('Invalid JWT signature');
  }

  return JSON.parse(decodePart(encodedPayload).toString('utf8')) as JwtPayload;
}

function signJwt(payload: Record<string, unknown>, secret: string): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}

export class AuthTokenService {
  constructor(private readonly secret: string) {
    if (!secret) throw new Error('JWT_SECRET is required');
  }

  verifyHqToken(
    token: string,
    now = Math.floor(Date.now() / 1000),
  ): HqTokenClaims {
    const claims = readAndVerifyJwt(token, this.secret);
    if (
      claims.iss !== 'insighted-hq' ||
      claims.aud !== 'agap-applicants' ||
      claims.type !== 'hq_sso' ||
      typeof claims.sub !== 'string' ||
      !claims.sub.trim() ||
      !isInteger(claims.iat) ||
      !isInteger(claims.exp) ||
      typeof claims.jti !== 'string' ||
      !claims.jti.trim() ||
      claims.iat > now ||
      claims.exp <= now ||
      claims.exp <= claims.iat ||
      claims.exp - claims.iat > MAX_HQ_TOKEN_TTL_SECONDS
    ) {
      throw new Error('Invalid HQ token');
    }
    return claims as HqTokenClaims;
  }

  generateApplicantAccessToken(
    applicant: ApplicantAccount,
    now = Math.floor(Date.now() / 1000),
  ): string {
    return signJwt(
      {
        iss: 'agap-applicants',
        aud: 'agap-applicants-web',
        sub: String(applicant.id),
        type: 'agap_access',
        applicant_number: applicant.applicant_number,
        email: applicant.email_address,
        role: 'Applicant',
        iat: now,
        exp: now + APPLICANT_TOKEN_TTL_SECONDS,
        jti: randomUUID(),
      },
      this.secret,
    );
  }

  verifyApplicantAccessToken(
    token: string,
    now = Math.floor(Date.now() / 1000),
  ): ApplicantAccessClaims {
    const claims = readAndVerifyJwt(token, this.secret);
    if (
      claims.iss !== 'agap-applicants' ||
      claims.aud !== 'agap-applicants-web' ||
      claims.type !== 'agap_access' ||
      typeof claims.sub !== 'string' ||
      !claims.sub ||
      typeof claims.applicant_number !== 'string' ||
      typeof claims.email !== 'string' ||
      claims.role !== 'Applicant' ||
      !isInteger(claims.iat) ||
      !isInteger(claims.exp) ||
      claims.iat > now ||
      claims.exp <= now ||
      typeof claims.jti !== 'string' ||
      !claims.jti
    ) {
      throw new Error('Invalid applicant access token');
    }
    return claims as ApplicantAccessClaims;
  }
}
