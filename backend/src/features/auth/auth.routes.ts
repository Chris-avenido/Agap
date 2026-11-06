import { Router } from 'express';
import * as controller from './auth.controller';

/** Mounted at /api/applicants (credential flows). */
export const applicantAuthRouter = Router();
applicantAuthRouter.post('/login', controller.login);
applicantAuthRouter.post('/reclass-register', controller.reclassRegister);
applicantAuthRouter.post('/reclass-login', controller.reclassLogin);
applicantAuthRouter.post('/forgot-password', controller.forgotPassword);
applicantAuthRouter.post('/reset-password', controller.resetPassword);
applicantAuthRouter.post('/sso-login', controller.ssoLogin);

/** Mounted at /api (HR admin registration). */
export const hrAuthRouter = Router();
hrAuthRouter.post('/register-hr', controller.registerHr);
