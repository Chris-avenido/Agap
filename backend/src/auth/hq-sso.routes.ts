import { Router } from 'express';
import { HqSsoController } from './hq-sso.controller';
import { HqSsoService } from './hq-sso.service';

export function resolveSsoApplicantEmail(env: NodeJS.ProcessEnv): string {
  const configuredEmail = env.AGAP_SSO_APPLICANT_EMAIL?.trim().toLowerCase();
  if (configuredEmail) return configuredEmail;
  if (env.NODE_ENV !== 'production') return 'test@gmail.com';
  throw new Error('AGAP_SSO_APPLICANT_EMAIL is required in production');
}

export function createHqSsoRouter(service: HqSsoService): Router {
  const router = Router();
  const controller = new HqSsoController(service);

  router.post('/hq/exchange', controller.exchange);
  router.get('/me', controller.me);
  return router;
}
