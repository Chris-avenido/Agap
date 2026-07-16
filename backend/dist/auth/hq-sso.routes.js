"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSsoApplicantEmail = resolveSsoApplicantEmail;
exports.createHqSsoRouter = createHqSsoRouter;
const express_1 = require("express");
const hq_sso_controller_1 = require("./hq-sso.controller");
function resolveSsoApplicantEmail(env) {
    const configuredEmail = env.AGAP_SSO_APPLICANT_EMAIL?.trim().toLowerCase();
    if (configuredEmail)
        return configuredEmail;
    if (env.NODE_ENV !== 'production')
        return 'test@gmail.com';
    throw new Error('AGAP_SSO_APPLICANT_EMAIL is required in production');
}
function createHqSsoRouter(service) {
    const router = (0, express_1.Router)();
    const controller = new hq_sso_controller_1.HqSsoController(service);
    router.post('/hq/exchange', controller.exchange);
    router.get('/me', controller.me);
    return router;
}
//# sourceMappingURL=hq-sso.routes.js.map