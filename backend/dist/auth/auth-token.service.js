"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenService = void 0;
const crypto_1 = require("crypto");
const APPLICANT_TOKEN_TTL_SECONDS = 3 * 60 * 60;
const HQ_TOKEN_TTL_SECONDS = 60;
function decodePart(value) {
    if (!value || !/^[A-Za-z0-9_-]+$/.test(value))
        throw new Error('Malformed JWT');
    return Buffer.from(value, 'base64url');
}
function readAndVerifyJwt(token, secret) {
    const parts = token.split('.');
    if (parts.length !== 3)
        throw new Error('Malformed JWT');
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = JSON.parse(decodePart(encodedHeader).toString('utf8'));
    if (header.alg !== 'HS256')
        throw new Error('Unsupported JWT algorithm');
    const suppliedSignature = decodePart(encodedSignature);
    const expectedSignature = (0, crypto_1.createHmac)('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest();
    if (suppliedSignature.length !== expectedSignature.length ||
        !(0, crypto_1.timingSafeEqual)(suppliedSignature, expectedSignature)) {
        throw new Error('Invalid JWT signature');
    }
    return JSON.parse(decodePart(encodedPayload).toString('utf8'));
}
function signJwt(payload, secret) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = (0, crypto_1.createHmac)('sha256', secret)
        .update(`${header}.${body}`)
        .digest('base64url');
    return `${header}.${body}.${signature}`;
}
function isInteger(value) {
    return typeof value === 'number' && Number.isInteger(value);
}
class AuthTokenService {
    secret;
    constructor(secret) {
        this.secret = secret;
        if (!secret)
            throw new Error('JWT_SECRET is required');
    }
    verifyHqToken(token, now = Math.floor(Date.now() / 1000)) {
        const claims = readAndVerifyJwt(token, this.secret);
        if (claims.iss !== 'insighted-hq' ||
            claims.aud !== 'agap-applicants' ||
            claims.type !== 'hq_sso' ||
            typeof claims.sub !== 'string' ||
            !claims.sub.trim() ||
            typeof claims.email !== 'string' ||
            !claims.email.trim() ||
            !isInteger(claims.iat) ||
            !isInteger(claims.exp) ||
            typeof claims.jti !== 'string' ||
            !claims.jti.trim() ||
            claims.iat > now ||
            claims.exp <= now ||
            claims.exp <= claims.iat ||
            claims.exp - claims.iat > HQ_TOKEN_TTL_SECONDS) {
            throw new Error('Invalid HQ token');
        }
        return claims;
    }
    generateApplicantAccessToken(applicant, now = Math.floor(Date.now() / 1000)) {
        return signJwt({
            iss: 'agap-applicants',
            aud: 'agap-applicants-web',
            sub: String(applicant.id),
            type: 'agap_access',
            applicant_number: applicant.applicant_number,
            email: applicant.email_address,
            role: 'Applicant',
            iat: now,
            exp: now + APPLICANT_TOKEN_TTL_SECONDS,
            jti: (0, crypto_1.randomUUID)(),
        }, this.secret);
    }
    verifyApplicantAccessToken(token, now = Math.floor(Date.now() / 1000)) {
        const claims = readAndVerifyJwt(token, this.secret);
        if (claims.iss !== 'agap-applicants' ||
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
            !claims.jti) {
            throw new Error('Invalid applicant access token');
        }
        return claims;
    }
}
exports.AuthTokenService = AuthTokenService;
//# sourceMappingURL=auth-token.service.js.map