import jwt, { JwtPayload } from 'jsonwebtoken';

const MAX_SSO_TOKEN_TTL_SECONDS = 5 * 60;
const EXPECTED_ROLE = 'Applicant';

export class SsoConfigurationError extends Error {}
export class SsoAuthenticationError extends Error {}

export type ApplicantSsoClaims = {
  email: string;
};

function getSharedSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new SsoConfigurationError(
      'JWT_SECRET is required to verify InsightED HQ sign-in tokens',
    );
  }
  return secret;
}

function getAuthorizedHqEmail(): string {
  const email = process.env.AGAP_SSO_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new SsoConfigurationError(
      'AGAP_SSO_EMAIL is required to authorize the InsightED HQ applicant identity',
    );
  }
  return email;
}

function isUnixTimestamp(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}

export function verifyApplicantSsoToken(
  token: string,
  now = Math.floor(Date.now() / 1000),
): ApplicantSsoClaims {
  let decoded: JwtPayload | string;

  try {
    decoded = jwt.verify(token, getSharedSecret(), {
      algorithms: ['HS256'],
      issuer: 'insighted-hq',
      audience: 'agap-applicants',
      clockTimestamp: now,
    });
  } catch (error) {
    if (error instanceof SsoConfigurationError) throw error;
    throw new SsoAuthenticationError('Invalid or expired HQ sign-in token');
  }

  if (typeof decoded === 'string') {
    throw new SsoAuthenticationError('Invalid HQ sign-in token payload');
  }

  const emailValue = decoded.email ?? decoded.email_address;
  const email = typeof emailValue === 'string' ? emailValue.trim().toLowerCase() : '';

  if (
    !email ||
    decoded.type !== 'hq_sso' ||
    decoded.sub !== email ||
    decoded.role !== EXPECTED_ROLE ||
    typeof decoded.jti !== 'string' ||
    !decoded.jti ||
    !isUnixTimestamp(decoded.iat) ||
    !isUnixTimestamp(decoded.exp) ||
    decoded.iat > now + 30 ||
    decoded.exp <= decoded.iat ||
    decoded.exp - decoded.iat > MAX_SSO_TOKEN_TTL_SECONDS
  ) {
    throw new SsoAuthenticationError('Invalid HQ sign-in token payload');
  }

  if (email !== getAuthorizedHqEmail()) {
    throw new SsoAuthenticationError(
      'This HQ account is not authorized for AGAP Applicants access',
    );
  }

  return {
    email,
  };
}
