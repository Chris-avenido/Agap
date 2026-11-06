import { Request } from 'express';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { pool } from '../../database';
import { ApplicantsService } from '../../applicants/applicants.service';
import { verifyApplicantSsoToken } from '../../applicants/applicants-sso.service';

export {
  SsoAuthenticationError,
  SsoConfigurationError,
} from '../../applicants/applicants-sso.service';

export const APPLICANT_SESSION_TTL_MS = 3 * 60 * 60 * 1000;

// ---- In-memory rate limiter for failed Reclassification login attempts ----
interface FailedAttemptRecord {
  attempts: number;
  lockedUntil: number;
}
const reclassFailedAttempts = new Map<string, FailedAttemptRecord>();

export function getAttemptKey(email: string, req: Request): string {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  return `${(email || '').trim().toLowerCase()}_${ip}`;
}

export function checkRateLimit(key: string): { locked: boolean; remainingMinutes?: number } {
  const record = reclassFailedAttempts.get(key);
  if (!record) return { locked: false };
  if (record.lockedUntil > Date.now()) {
    const remainingMinutes = Math.ceil((record.lockedUntil - Date.now()) / (60 * 1000));
    return { locked: true, remainingMinutes };
  }
  if (record.lockedUntil > 0 && record.lockedUntil <= Date.now()) {
    reclassFailedAttempts.delete(key);
  }
  return { locked: false };
}

export function recordFailedAttempt(key: string): void {
  const record = reclassFailedAttempts.get(key) || { attempts: 0, lockedUntil: 0 };
  record.attempts += 1;
  if (record.attempts >= 5) {
    record.lockedUntil = Date.now() + 15 * 60 * 1000; // 15-minute lockout
  }
  reclassFailedAttempts.set(key, record);
}

export function clearFailedAttempts(key: string): void {
  reclassFailedAttempts.delete(key);
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export const AuthService = {
  login: (...a: Parameters<typeof ApplicantsService.login>) =>
    ApplicantsService.login(...a),
  reclassLogin: (...a: Parameters<typeof ApplicantsService.reclassLogin>) =>
    ApplicantsService.reclassLogin(...a),
  authenticateReclassAccount: (
    ...a: Parameters<typeof ApplicantsService.authenticateReclassAccount>
  ) => ApplicantsService.authenticateReclassAccount(...a),
  registerReclassAccount: (
    ...a: Parameters<typeof ApplicantsService.registerReclassAccount>
  ) => ApplicantsService.registerReclassAccount(...a),
  forgotPassword: (...a: Parameters<typeof ApplicantsService.forgotPassword>) =>
    ApplicantsService.forgotPassword(...a),
  resetPassword: (...a: Parameters<typeof ApplicantsService.resetPassword>) =>
    ApplicantsService.resetPassword(...a),

  /** Verifies an HQ SSO token and returns the applicant session payload. */
  async exchangeSsoToken(ssoToken: string) {
    const claims = verifyApplicantSsoToken(ssoToken);

    let applicant = await ApplicantsService.findByEmail(claims.email);
    if (!applicant) {
      // Wilfredo is an HQ administrative identity and does not have a legacy
      // applicant row. Provision a dedicated passwordless applicant profile on
      // the first verified HQ handoff so the dashboard never exposes another
      // applicant's records.
      try {
        applicant = await ApplicantsService.create({
          email_address: claims.email,
          first_name: 'Wilfredo',
          surname: 'Cabral',
        });
      } catch (error) {
        // A simultaneous first sign-in may win the unique-email insert. Read
        // the row again before treating the provisioning attempt as failed.
        applicant = await ApplicantsService.findByEmail(claims.email);
        if (!applicant) throw error;
      }
    }

    return {
      id: applicant.id,
      applicant_number: applicant.applicant_number,
      email: applicant.email_address,
      expiry: Date.now() + APPLICANT_SESSION_TTL_MS,
    };
  },

  /** Registers a Human Resources admin user (previously inline in index.ts). */
  async registerHr(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    passcode: string;
  }) {
    const existingUserResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [data.email],
    );
    if (existingUserResult.rows.length > 0) {
      throw new HttpError(400, 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userUid = randomUUID();
    await pool.query(
      `
      INSERT INTO users (uid, email, password_hash, first_name, last_name, passcode, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        userUid,
        data.email,
        hashedPassword,
        data.first_name,
        data.last_name,
        data.passcode,
        'Human Resources',
      ],
    );
    return { uid: userUid, email: data.email };
  },
};
