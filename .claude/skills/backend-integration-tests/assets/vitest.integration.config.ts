import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { conditions: ['@esf7/source'] },
  ssr: { resolve: { conditions: ['@esf7/source'] } },
  test: {
    name: 'integration',
    include: ['tests/integration/**/*.test.ts'],
    environment: 'node',
    // One shared database: files must not run in parallel against it.
    fileParallelism: false,
    globalSetup: ['./src/test/integration-guard.ts'],
    hookTimeout: 30_000,
    testTimeout: 30_000,
    env: {
      NODE_ENV: 'test',
    },
  },
});
