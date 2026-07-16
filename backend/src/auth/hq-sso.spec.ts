import { createHmac } from 'crypto';
import express from 'express';
import request from 'supertest';
import { AgapUser, createHqSsoRouter, HqSsoConfig, HqSsoStore, ReusedTokenError } from './hq-sso';

const config: HqSsoConfig = {
  ssoSecret: 'hq-test-secret-that-is-at-least-32-characters', authSecret: 'agap-test-secret-that-is-at-least-32-characters',
  issuer: 'insighted-hq', audience: 'agap-portal', authIssuer: 'agap-portal', authAudience: 'agap-web',
  frontendCallback: '/auth/hq-callback', successRedirect: '/applicant-dashboard', authTokenTtlSeconds: 10800,
};
const user: AgapUser = { uid: 'user-1', email: 'person@example.com', role: 'Human Resources', first_name: 'Test', last_name: 'User' };

function sign(overrides: Record<string, unknown> = {}, secret = config.ssoSecret): string {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iss: config.issuer, aud: config.audience, sub: 'hq-user', email: ' Person@Example.com ', iat: now, exp: now + 60, jti: `jti-${Math.random()}`, ...overrides })).toString('base64url');
  return `${header}.${payload}.${createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url')}`;
}

class MemoryStore implements HqSsoStore {
  used = new Set<string>(); authorized = true; lastEmail?: string;
  async consumeAndFindUser(jti: string, email: string) {
    if (this.used.has(jti)) throw new ReusedTokenError();
    this.used.add(jti); this.lastEmail = email;
    return this.authorized ? user : null;
  }
  async findActiveUser(uid: string, email: string) { return this.authorized && uid === user.uid && email === user.email ? user : null; }
}
function appFor(store: HqSsoStore) { const app = express(); app.use('/api/auth', createHqSsoRouter(store, config)); return app; }

describe('HQ SSO and AGAP token authentication', () => {
  it('issues an AGAP token and redirects for a valid HQ token', async () => {
    const store = new MemoryStore();
    const response = await request(appFor(store)).get(`/api/auth/hq-sso?token=${encodeURIComponent(sign({ jti: 'valid' }))}`);
    expect(response.status).toBe(302); expect(response.headers.location).toMatch(/^\/auth\/hq-callback#token=/); expect(store.lastEmail).toBe('person@example.com');
  });
  it('rejects an expired token', async () => {
    const now = Math.floor(Date.now() / 1000);
    expect((await request(appFor(new MemoryStore())).get(`/api/auth/hq-sso?token=${sign({ iat: now - 61, exp: now - 1 })}`)).status).toBe(401);
  });
  it('rejects an invalid signature', async () => {
    expect((await request(appFor(new MemoryStore())).get(`/api/auth/hq-sso?token=${sign({}, 'wrong-secret')}`)).status).toBe(401);
  });
  it('rejects a reused jti', async () => {
    const store = new MemoryStore(); const token = sign({ jti: 'one-time' }); const app = appFor(store);
    await request(app).get(`/api/auth/hq-sso?token=${token}`); expect((await request(app).get(`/api/auth/hq-sso?token=${token}`)).status).toBe(409);
  });
  it('rejects an unauthorized user', async () => {
    const store = new MemoryStore(); store.authorized = false;
    expect((await request(appFor(store)).get(`/api/auth/hq-sso?token=${sign()}`)).status).toBe(403);
  });
  it('validates the issued AGAP token through /auth/me', async () => {
    const app = appFor(new MemoryStore());
    const login = await request(app).get(`/api/auth/hq-sso?token=${sign({ jti: 'me-test' })}`);
    const token = new URLSearchParams(login.headers.location.split('#')[1]).get('token')!;
    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200); expect(me.body.data).toMatchObject({ uid: user.uid, email: user.email, role: user.role });
  });
});
