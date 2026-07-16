import {
  ApplicantAccount,
  ApplicantAccountRepository,
} from '../applicants/applicants.repository';
import { AuthTokenService, HqTokenClaims } from './auth-token.service';
import { HqTokenReplayRepository } from './hq-sso.repository';

export const APPLICANT_LANDING_ROUTE = '/applicant-dashboard' as const;

export class HqAuthenticationError extends Error {}

export type ApplicantUser = {
  id: number;
  applicant_number: string;
  email: string;
  role: 'Applicant';
};

export type HqExchangeResult = {
  accessToken: string;
  user: ApplicantUser;
  landingRoute: typeof APPLICANT_LANDING_ROUTE;
};

export class HqSsoService {
  constructor(
    private readonly tokens: AuthTokenService,
    private readonly applicants: ApplicantAccountRepository,
    private readonly replayTokens: HqTokenReplayRepository,
    private readonly applicantEmail: string,
  ) {}

  async exchange(token: string): Promise<HqExchangeResult> {
    let claims: HqTokenClaims;
    try {
      claims = this.tokens.verifyHqToken(token);
    } catch {
      throw new HqAuthenticationError('Invalid or expired HQ sign-in token');
    }

    const consumed = await this.replayTokens.consume(
      claims.jti,
      new Date(claims.exp * 1000),
    );
    if (!consumed)
      throw new HqAuthenticationError('HQ sign-in token has already been used');

    const applicant = await this.applicants.findByEmail(this.applicantEmail);
    if (!applicant?.applicant_number) {
      throw new HqAuthenticationError(
        'Configured AGAP applicant account is unavailable',
      );
    }

    return this.toExchangeResult(applicant);
  }

  authenticateApplicantToken(token: string): ApplicantUser {
    try {
      const claims = this.tokens.verifyApplicantAccessToken(token);
      return {
        id: Number(claims.sub),
        applicant_number: claims.applicant_number,
        email: claims.email,
        role: 'Applicant',
      };
    } catch {
      throw new HqAuthenticationError(
        'Invalid or expired applicant access token',
      );
    }
  }

  private toExchangeResult(applicant: ApplicantAccount): HqExchangeResult {
    return {
      accessToken: this.tokens.generateApplicantAccessToken(applicant),
      user: {
        id: applicant.id,
        applicant_number: applicant.applicant_number,
        email: applicant.email_address,
        role: 'Applicant',
      },
      landingRoute: APPLICANT_LANDING_ROUTE,
    };
  }
}
