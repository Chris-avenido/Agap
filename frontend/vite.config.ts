import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, '');
  const apiPort = env.PORT || process.env.PORT || '3000';
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || `http://localhost:${apiPort}`;

  return {
    plugins: [react(), tailwindcss()],
    base: env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || '/',
    envDir: repoRoot,
    assetsInclude: ['**/*.docx'],
    server: {
      port: Number(env.VITE_PORT) || 5174,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
