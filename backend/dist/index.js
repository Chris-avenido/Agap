"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcryptjs"));
const database_1 = require("./database");
const applicants_routes_1 = __importDefault(require("./applicants/applicants.routes"));
const vacancies_routes_1 = __importDefault(require("./vacancies/vacancies.routes"));
const vacancies_cron_1 = require("./vacancies/vacancies.cron");
const hq_sso_module_1 = require("./auth/hq-sso.module");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', (0, hq_sso_module_1.createHqSsoModuleRouter)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/api/register-hr', async (req, res) => {
    const data = req.body;
    try {
        const existingUserResult = await database_1.pool.query('SELECT id FROM users WHERE email = $1', [data.email]);
        if (existingUserResult.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userUid = (0, crypto_1.randomUUID)();
        await database_1.pool.query(`
      INSERT INTO users (uid, email, password_hash, first_name, last_name, passcode, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [userUid, data.email, hashedPassword, data.first_name, data.last_name, data.passcode, 'Human Resources']);
        res.json({ success: true, data: { uid: userUid, email: data.email } });
    }
    catch (error) {
        console.error('Error registering HR admin:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});
app.use('/api/vacancies', vacancies_routes_1.default);
app.use('/api/applicants', applicants_routes_1.default);
(0, vacancies_cron_1.setupVacanciesCron)();
app.listen(port, () => {
    console.log(`🚀 Express server running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map