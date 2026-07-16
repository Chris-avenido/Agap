"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HqSsoController = void 0;
const hq_sso_service_1 = require("./hq-sso.service");
class HqSsoController {
    service;
    constructor(service) {
        this.service = service;
    }
    exchange = async (req, res) => {
        const token = typeof req.body.token === 'string' ? req.body.token.trim() : '';
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: 'HQ sign-in token is required' });
        try {
            const data = await this.service.exchange(token);
            return res.json({ success: true, data });
        }
        catch (error) {
            if (error instanceof hq_sso_service_1.HqAuthenticationError) {
                return res.status(401).json({ success: false, message: error.message });
            }
            return res
                .status(500)
                .json({ success: false, message: 'Unable to complete HQ sign-in' });
        }
    };
    me = (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization?.startsWith('Bearer ')
            ? authorization.slice(7).trim()
            : '';
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: 'Not authenticated' });
        try {
            const user = this.service.authenticateApplicantToken(token);
            return res.json({ success: true, data: user });
        }
        catch (error) {
            if (error instanceof hq_sso_service_1.HqAuthenticationError) {
                return res.status(401).json({ success: false, message: error.message });
            }
            return res
                .status(500)
                .json({ success: false, message: 'Unable to validate session' });
        }
    };
}
exports.HqSsoController = HqSsoController;
//# sourceMappingURL=hq-sso.controller.js.map