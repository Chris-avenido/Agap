"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHqSsoModuleRouter = createHqSsoModuleRouter;
const applicants_repository_1 = require("../applicants/applicants.repository");
const database_1 = require("../database");
const auth_token_service_1 = require("./auth-token.service");
const hq_sso_repository_1 = require("./hq-sso.repository");
const hq_sso_routes_1 = require("./hq-sso.routes");
const hq_sso_service_1 = require("./hq-sso.service");
function createHqSsoModuleRouter() {
    const service = new hq_sso_service_1.HqSsoService(new auth_token_service_1.AuthTokenService(process.env.JWT_SECRET ?? ''), new applicants_repository_1.PostgresApplicantRepository(database_1.pool), new hq_sso_repository_1.PostgresHqTokenReplayRepository(database_1.pool), (0, hq_sso_routes_1.resolveSsoApplicantEmail)(process.env));
    return (0, hq_sso_routes_1.createHqSsoRouter)(service);
}
//# sourceMappingURL=hq-sso.module.js.map