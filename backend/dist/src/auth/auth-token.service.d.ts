import { ApplicantAccount } from '../applicants/applicants.repository';
export type HqTokenClaims = {
    iss: 'insighted-hq';
    aud: 'agap-applicants';
    sub: string;
    email: string;
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
export declare class AuthTokenService {
    private readonly secret;
    constructor(secret: string);
    verifyHqToken(token: string, now?: number): HqTokenClaims;
    generateApplicantAccessToken(applicant: ApplicantAccount, now?: number): string;
    verifyApplicantAccessToken(token: string, now?: number): ApplicantAccessClaims;
}
