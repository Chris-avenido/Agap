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
  const claimedEmail =
    typeof emailValue === 'string' ? emailValue.trim().toLowerCase() : '';
  const isCurrentHandoff =
    decoded.iss === 'insighted-hq' &&
    decoded.aud === 'agap-applicants' &&
    decoded.type === 'hq_sso' &&
    decoded.sub === claimedEmail &&
    typeof decoded.jti === 'string' &&
    Boolean(decoded.jti);
  const isLegacyHandoff =
    decoded.iss === undefined &&
    decoded.aud === undefined &&
    decoded.type === undefined &&
    decoded.sub === undefined &&
    decoded.jti === undefined;

  if (
    !claimedEmail ||
    (!isCurrentHandoff && !isLegacyHandoff) ||
    decoded.role !== EXPECTED_ROLE ||
    !isUnixTimestamp(decoded.iat) ||
    !isUnixTimestamp(decoded.exp) ||
    decoded.iat > now + 30 ||
    decoded.exp <= decoded.iat ||
    decoded.exp - decoded.iat > MAX_SSO_TOKEN_TTL_SECONDS
  ) {
    throw new SsoAuthenticationError('Invalid HQ sign-in token payload');
  }

  const authorizedEmail = getAuthorizedHqEmail();
  if (isCurrentHandoff && claimedEmail !== authorizedEmail) {
    throw new SsoAuthenticationError(
      'This HQ account is not authorized for AGAP Applicants access',
    );
  }

  return {
    // Older HQ deployments signed a static applicant address and did not
    // include issuer/audience metadata. Its valid signature still proves the
    // handoff came from HQ, so map only that exact legacy shape to the locally
    // allowlisted identity during the deployment transition.
    email: authorizedEmail,
  };
}
