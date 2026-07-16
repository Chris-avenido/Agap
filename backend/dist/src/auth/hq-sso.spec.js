"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const auth_token_service_1 = require("./auth-token.service");
const hq_sso_routes_1 = require("./hq-sso.routes");
const hq_sso_service_1 = require("./hq-sso.service");
const secret = 'shared-test-secret-that-is-at-least-32-characters';
const applicant = {
    id: 42,
    applicant_number: 'AGAP-0042',
    email_address: 'test@gmail.com',
};
function signHqToken(overrides = {}, signingSecret = secret) {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
        iss: 'insighted-hq',
        aud: 'agap-applicants',
        sub: 'hq-user-1',
        email: 'hq.user@example.com',
        type: 'hq_sso',
        iat: now,
        exp: now + 60,
        jti: `jti-${Math.random()}`,
        ...overrides,
    })).toString('base64url');
    const signature = (0, crypto_1.createHmac)('sha256', signingSecret)
        .update(`${header}.${payload}`)
        .digest('base64url');
    return `${header}.${payload}.${signature}`;
}
class MemoryApplicants {
    enabled = true;
    lastEmail;
    async findByEmail(email) {
        this.lastEmail = email;
        return this.enabled ? applicant : null;
    }
}
class MemoryReplayTokens {
    used = new Set();
    async consume(jti) {
        if (this.used.has(jti))
            return false;
        this.used.add(jti);
        return true;
    }
}
function createTestApp(applicants = new MemoryApplicants(), replayTokens = new MemoryReplayTokens()) {
    const service = new hq_sso_service_1.HqSsoService(new auth_token_service_1.AuthTokenService(secret), applicants, replayTokens, 'test@gmail.com');
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/auth', (0, hq_sso_routes_1.createHqSsoRouter)(service));
    return { app, applicants, replayTokens };
}
describe('POST /api/auth/hq/exchange', () => {
    it('exchanges a valid HQ handoff for an applicant access token', async () => {
        const { app, applicants } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ jti: 'valid-token' }) });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            data: {
                user: {
                    id: 42,
                    applicant_number: 'AGAP-0042',
                    email: 'test@gmail.com',
                    role: 'Applicant',
                },
                landingRoute: '/applicant-dashboard',
            },
        });
        expect(response.body.data.accessToken).toEqual(expect.any(String));
        expect(applicants.lastEmail).toBe('test@gmail.com');
    });
    it('rejects an expired token with HTTP 401', async () => {
        const now = Math.floor(Date.now() / 1000);
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ iat: now - 120, exp: now - 1 }) });
        expect(response.status).toBe(401);
    });
    it('rejects a token with the wrong audience with HTTP 401', async () => {
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ aud: 'another-application' }) });
        expect(response.status).toBe(401);
    });
    it('rejects a token with the wrong issuer with HTTP 401', async () => {
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ iss: 'another-issuer' }) });
        expect(response.status).toBe(401);
    });
    it('rejects a token without the authenticated HQ email', async () => {
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ email: '' }) });
        expect(response.status).toBe(401);
    });
    it('rejects an HQ token whose lifetime exceeds 60 seconds', async () => {
        const now = Math.floor(Date.now() / 1000);
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ iat: now, exp: now + 61 }) });
        expect(response.status).toBe(401);
    });
    it('rejects a missing token with HTTP 401', async () => {
        const { app } = createTestApp();
        const response = await (0, supertest_1.default)(app).post('/api/auth/hq/exchange').send({});
        expect(response.status).toBe(401);
    });
    it('rejects a token with the wrong type or signature', async () => {
        const { app } = createTestApp();
        expect((await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ type: 'access' }) })).status).toBe(401);
        expect((await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({}, 'wrong-secret') })).status).toBe(401);
    });
    it('prevents reuse of a consumed jti', async () => {
        const { app } = createTestApp();
        const token = signHqToken({ jti: 'one-time-token' });
        expect((await (0, supertest_1.default)(app).post('/api/auth/hq/exchange').send({ token })).status).toBe(200);
        expect((await (0, supertest_1.default)(app).post('/api/auth/hq/exchange').send({ token })).status).toBe(401);
    });
    it('issues a token recognized by the protected-session endpoint', async () => {
        const { app } = createTestApp();
        const exchange = await (0, supertest_1.default)(app)
            .post('/api/auth/hq/exchange')
            .send({ token: signHqToken({ jti: 'protected-session' }) });
        const me = await (0, supertest_1.default)(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${exchange.body.data.accessToken}`);
        expect(me.status).toBe(200);
        expect(me.body.data).toEqual({
            id: 42,
            applicant_number: 'AGAP-0042',
            email: 'test@gmail.com',
            role: 'Applicant',
        });
    });
});
describe('SSO applicant configuration', () => {
    it('uses the development fallback only outside production', () => {
        expect((0, hq_sso_routes_1.resolveSsoApplicantEmail)({ NODE_ENV: 'development' })).toBe('test@gmail.com');
        expect(() => (0, hq_sso_routes_1.resolveSsoApplicantEmail)({ NODE_ENV: 'production' })).toThrow('AGAP_SSO_APPLICANT_EMAIL is required in production');
    });
});
//# sourceMappingURL=hq-sso.spec.js.map