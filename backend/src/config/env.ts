import dotenv from 'dotenv';
import path from 'path';

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const backendRoot = path.resolve(__dirname, '..', '..');

// Load root .env as primary single source of truth (consistent with agap_hrmo)
dotenv.config({ path: path.join(repoRoot, '.env') });
// Fallback to backend/.env if present
dotenv.config({ path: path.join(backendRoot, '.env') });
