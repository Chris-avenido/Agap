"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({
    connectionString,
    ssl: connectionString?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new client_1.PrismaClient({ adapter });
exports.prisma.$connect()
    .then(() => console.log('✅ Successfully connected to Azure PostgreSQL Database!'))
    .catch((error) => console.error('❌ Failed to connect to the database:', error));
//# sourceMappingURL=prisma.js.map