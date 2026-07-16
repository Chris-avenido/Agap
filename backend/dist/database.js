"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const pg_1 = require("pg");
const connectionString = process.env.DATABASE_URL;
exports.pool = new pg_1.Pool({
    connectionString,
    ssl: connectionString?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
});
exports.pool.connect()
    .then((client) => {
    console.log('✅ Successfully connected to Azure PostgreSQL Database natively!');
    client.release();
})
    .catch((error) => console.error('❌ Failed to connect to the database:', error));
//# sourceMappingURL=database.js.map