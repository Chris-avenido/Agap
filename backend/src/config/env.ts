import dotenv from 'dotenv';
import path from 'path';

const backendRoot = path.resolve(__dirname, '..', '..');

// The backend has its own private configuration, while the legacy deployment
// still keeps shared values in the repository-level .env file. Load both in a
// deterministic order without allowing the parent file to overwrite backend
// settings.
dotenv.config({ path: path.join(backendRoot, '.env') });
dotenv.config({ path: path.join(backendRoot, '..', '.env') });
