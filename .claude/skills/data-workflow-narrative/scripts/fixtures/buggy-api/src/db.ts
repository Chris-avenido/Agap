import { drizzle } from 'drizzle-orm/node-postgres';
import Redis from 'ioredis';
export const db = drizzle(process.env.DATABASE_URL as string);
export const redis = new Redis();
