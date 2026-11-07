import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { devLogSink } from './src/devtools/vite-plugin-dev-log-sink.ts';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, '');
  const apiPort = env.PORT || process.env.PORT || '3000';
  const apiProxyTarget = process.env.API_PROXY_TARGET || env.VITE_API_PROXY_TARGET || `http://localhost:${apiPort}`;

  return {
    plugins: [react(), tailwindcss(), devLogSink()],
    base: env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || '/',
    envDir: repoRoot,
    assetsInclude: ['**/*.docx'],
    server: {
      port: Number(process.env.VITE_PORT || env.VITE_PORT) || 5174,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (_err, _req, res) => {
              if (res && !('headersSent' in res && (res as any).headersSent)) {
                (res as any).writeHead(503, { 'Content-Type': 'application/json' });
                (res as any).end(JSON.stringify({ success: false, message: 'Backend service starting up...' }));
              }
            });
          },
        },
      },
    },
  };
});
