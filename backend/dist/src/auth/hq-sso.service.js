"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HqSsoService = exports.HqAuthenticationError = exports.APPLICANT_LANDING_ROUTE = void 0;
exports.APPLICANT_LANDING_ROUTE = '/applicant-dashboard';
class HqAuthenticationError extends Error {
}
exports.HqAuthenticationError = HqAuthenticationError;
class HqSsoService {
    tokens;
    applicants;
    replayTokens;
    applicantEmail;
    constructor(tokens, applicants, replayTokens, applicantEmail) {
        this.tokens = tokens;
        this.applicants = applicants;
        this.replayTokens = replayTokens;
        this.applicantEmail = applicantEmail;
    }
    async exchange(token) {
        let claims;
        try {
            claims = this.tokens.verifyHqToken(token);
        }
        catch {
            throw new HqAuthenticationError('Invalid or expired HQ sign-in token');
        }
        const consumed = await this.replayTokens.consume(claims.jti, new Date(claims.exp * 1000));
        if (!consumed)
            throw new HqAuthenticationError('HQ sign-in token has already been used');
        const applicant = await this.applicants.findByEmail(this.applicantEmail);
        if (!applicant?.applicant_number) {
            throw new HqAuthenticationError('Configured AGAP applicant account is unavailable');
        }
        return this.toExchangeResult(applicant);
    }
    authenticateApplicantToken(token) {
        try {
            const claims = this.tokens.verifyApplicantAccessToken(token);
            return {
                id: Number(claims.sub),
                applicant_number: claims.applicant_number,
                email: claims.email,
                role: 'Applicant',
            };
        }
        catch {
            throw new HqAuthenticationError('Invalid or expired applicant access token');
        }
    }
    toExchangeResult(applicant) {
        return {
            accessToken: this.tokens.generateApplicantAccessToken(applicant),
            user: {
                id: applicant.id,
                applicant_number: applicant.applicant_number,
                email: applicant.email_address,
                role: 'Applicant',
            },
            landingRoute: exports.APPLICANT_LANDING_ROUTE,
        };
    }
}
exports.HqSsoService = HqSsoService;
//# sourceMappingURL=hq-sso.service.js.map