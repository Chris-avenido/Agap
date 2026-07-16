import { Router } from 'express';
import { PostgresApplicantRepository } from '../applicants/applicants.repository';
import { pool } from '../database';
import { AuthTokenService } from './auth-token.service';
import { PostgresHqTokenReplayRepository } from './hq-sso.repository';
import { createHqSsoRouter, resolveSsoApplicantEmail } from './hq-sso.routes';
import { HqSsoService } from './hq-sso.service';

export function createHqSsoModuleRouter(): Router {
  const service = new HqSsoService(
    new AuthTokenService(process.env.JWT_SECRET ?? ''),
    new PostgresApplicantRepository(pool),
    new PostgresHqTokenReplayRepository(pool),
    resolveSsoApplicantEmail(process.env),
  );
  return createHqSsoRouter(service);
}
