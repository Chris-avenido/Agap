import { ApplicantAccountRepository } from '../applicants/applicants.repository';
import { AuthTokenService } from './auth-token.service';
import { HqTokenReplayRepository } from './hq-sso.repository';
export declare const APPLICANT_LANDING_ROUTE: "/applicant-dashboard";
export declare class HqAuthenticationError extends Error {
}
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
export declare class HqSsoService {
    private readonly tokens;
    private readonly applicants;
    private readonly replayTokens;
    private readonly applicantEmail;
    constructor(tokens: AuthTokenService, applicants: ApplicantAccountRepository, replayTokens: HqTokenReplayRepository, applicantEmail: string);
    exchange(token: string): Promise<HqExchangeResult>;
    authenticateApplicantToken(token: string): ApplicantUser;
    private toExchangeResult;
}
