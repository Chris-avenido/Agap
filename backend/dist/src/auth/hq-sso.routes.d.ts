import { Router } from 'express';
import { HqSsoService } from './hq-sso.service';
export declare function resolveSsoApplicantEmail(env: NodeJS.ProcessEnv): string;
export declare function createHqSsoRouter(service: HqSsoService): Router;
