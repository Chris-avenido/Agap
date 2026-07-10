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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_1 = require("./prisma");
const applicants_routes_1 = __importDefault(require("./applicants/applicants.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/api/register-hr', async (req, res) => {
    const data = req.body;
    try {
        const existingUser = await prisma_1.prisma.users.findFirst({
            where: { email: data.email }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma_1.prisma.users.create({
            data: {
                uid: (0, crypto_1.randomUUID)(),
                email: data.email,
                password_hash: hashedPassword,
                first_name: data.first_name,
                last_name: data.last_name,
                passcode: data.passcode,
                role: 'Human Resources'
            }
        });
        res.json({ success: true, data: { uid: user.uid, email: user.email } });
    }
    catch (error) {
        console.error('Error registering HR admin:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});
app.use('/api/applicants', applicants_routes_1.default);
app.listen(port, () => {
    console.log(`🚀 Express server running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map