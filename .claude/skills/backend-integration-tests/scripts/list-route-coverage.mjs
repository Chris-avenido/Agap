#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure we run with TypeScript resolution if needed
if (!process.env.__TSX_ACTIVE) {
  const tsxCli = resolve(process.cwd(), 'node_modules/tsx/dist/cli.mjs');
  const args = [tsxCli, '--conditions=@esf7/source', __filename, ...process.argv.slice(2)];
  const res = spawnSync(process.execPath, args, {
    stdio: 'inherit',
    env: { ...process.env, __TSX_ACTIVE: '1' },
    shell: false,
  });
  process.exit(res.status ?? 0);
}

function findTestFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findTestFiles(full));
    } else if (/\.(test|spec)\.ts$/.test(entry)) {
      results.push(full);
    }
  }
  return results;
}

function parseTestFileCalls(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const tests = [];

  // Parse describe/it blocks and request(app).<method>(...) calls
  // Simple token/regex walk to locate it/test blocks and calls inside them
  const itRegex = /(?:it|test)(?:\.only|\.skip|\.fails)?\s*\(\s*['"`](.*?)['"`]/g;
  let match;
  const itBlocks = [];
  while ((match = itRegex.exec(content)) !== null) {
    itBlocks.push({
      title: match[1],
      index: match.index,
    });
  }

  for (let i = 0; i < itBlocks.length; i++) {
    const block = itBlocks[i];
    const nextBlockIndex = i + 1 < itBlocks.length ? itBlocks[i + 1].index : content.length;
    const blockContent = content.slice(block.index, nextBlockIndex);

    // Find request(app).<method>('<path>') or request(app)[method]('<path>') or call(..., '<method>', ...)
    const callPatterns = [
      /request\s*\(\s*\w+\s*\)\s*\.\s*(get|post|put|patch|delete|options|head)\s*\(\s*[`'"](.*?)[`'"]/gi,
      /call\s*\([^,]*,\s*['"`](GET|POST|PUT|PATCH|DELETE)['"`]\s*,\s*[^,)]*(?:,\s*['"`](.*?)['"`])?/gi,
      /\.\s*(get|post|put|patch|delete)\s*\(\s*[`'"](.*?)[`'"]/gi,
    ];

    const calls = [];
    for (const pattern of callPatterns) {
      let callMatch;
      while ((callMatch = pattern.exec(blockContent)) !== null) {
        const method = (callMatch[1] || 'GET').toUpperCase();
        let pathPattern = callMatch[2] || '';
        calls.push({ method, pathPattern });
      }
    }

    const titleLower = block.title.toLowerCase();
    const isFailurePath =
      titleLower.includes('failure') ||
      titleLower.includes('invalid') ||
      titleLower.includes('duplicate') ||
      titleLower.includes('locked') ||
      titleLower.includes('conflict') ||
      titleLower.includes('reject') ||
      titleLower.includes('error');

    tests.push({
      file: relative(process.cwd(), filePath).replace(/\\/g, '/'),
      title: block.title,
      isFailurePath,
      calls,
      blockContent,
    });
  }

  return tests;
}

function matchRouteToTest(routeMethod, routePath, parsedTests) {
  let happyTest = null;
  let failureTest = null;

  // Convert routePath (e.g. /api/schools/:schoolId/profile) into regex
  const pathRegexStr =
    '^' +
    routePath
      .replace(/:[a-zA-Z0-9_]+/g, '([^/]+|\\$\\{[^}]+\\})')
      .replace(/\//g, '\\/') +
    '$';
  const pathRegex = new RegExp(pathRegexStr);

  for (const test of parsedTests) {
    let matched = false;
    for (const call of test.calls) {
      if (call.method === routeMethod) {
        // Strip query strings or trailing template expressions
        const cleanedPath = call.pathPattern.split('?')[0];
        if (
          cleanedPath === routePath ||
          pathRegex.test(cleanedPath) ||
          (cleanedPath.includes(routePath.split(':')[0]) && routePath !== '/')
        ) {
          matched = true;
          break;
        }
      }
    }

    // Also match if route path is explicitly mentioned in test block content
    if (!matched && test.blockContent.includes(routePath)) {
      if (test.blockContent.toLowerCase().includes(routeMethod.toLowerCase())) {
        matched = true;
      }
    }

    if (matched) {
      const label = `${test.file}: ${test.title}`;
      if (test.isFailurePath) {
        if (!failureTest) failureTest = label;
      } else {
        if (!happyTest) happyTest = label;
      }
    }
  }

  return { happyTest, failureTest };
}

function walkRouter(router, prefix = '') {
  const routes = [];
  if (!router || !router.stack) return routes;

  for (const layer of router.stack) {
    if (layer.route) {
      const route = layer.route;
      const methods = Object.keys(route.methods || {})
        .filter((m) => route.methods[m])
        .map((m) => m.toUpperCase());

      // Check middlewares inside route.stack
      let hasAuth = false;
      let hasLock = false;

      for (const h of route.stack || []) {
        const handle = h.handle || {};
        const name = handle.name || h.name || '';
        const tag = handle.tag || handle._name || '';

        if (
          tag === 'auth' ||
          name.includes('Auth') ||
          name.includes('auth') ||
          name === 'authenticate' ||
          name === 'guard' ||
          name === 'schoolAccess'
        ) {
          hasAuth = true;
        }
        if (
          tag === 'lock' ||
          name.includes('Lock') ||
          name.includes('lock') ||
          name === 'passThroughLock' ||
          name === 'lockHeld'
        ) {
          hasLock = true;
        }
      }

      for (const method of methods) {
        const fullPath = (prefix + route.path).replace(/\/+/g, '/');
        routes.push({
          method,
          path: fullPath,
          auth: hasAuth,
          lock: hasLock,
        });
      }
    } else if (layer.name === 'router' || layer.handle?.stack) {
      let subPrefix = prefix;
      if (layer.regexp) {
        // Approximate mount path if any
        const match = layer.regexp.source
          .replace('^\\', '')
          .replace('\\/?(?=\\/|$)', '')
          .replace(/\\\//g, '/');
        if (match && !match.startsWith('^') && !match.includes('?=')) {
          subPrefix = (prefix + '/' + match).replace(/\/+/g, '/');
        }
      }
      routes.push(...walkRouter(layer.handle, subPrefix));
    }
  }
  return routes;
}

async function main() {
  const appPath = resolve(process.cwd(), process.argv[2] || 'apps/backend/src/app.ts');
  const testsDir = resolve(process.cwd(), process.argv[3] || 'apps/backend/tests/integration');
  const fallbackTestsDir = resolve(process.cwd(), 'apps/backend/src/routes');

  if (!existsSync(appPath)) {
    console.error(`App factory not found at: ${appPath}`);
    process.exit(1);
  }

  // Load app factory with tagged inert middlewares
  const appModule = await import(pathToFileURL(appPath).href);
  const createApp = appModule.createApp || appModule.default;
  if (typeof createApp !== 'function') {
    console.error(`createApp is not exported as a function from: ${appPath}`);
    process.exit(1);
  }

  const authMiddleware = (req, res, next) => next();
  authMiddleware.tag = 'auth';
  authMiddleware._name = 'authMiddleware';
  Object.defineProperty(authMiddleware, 'name', { value: 'authMiddleware' });

  const lockMiddleware = (req, res, next) => next();
  lockMiddleware.tag = 'lock';
  lockMiddleware._name = 'lockMiddleware';
  Object.defineProperty(lockMiddleware, 'name', { value: 'lockMiddleware' });

  const dummyDb = new Proxy({}, { get: () => () => ({}) });
  const dummyVerifier = { verify: async () => null };

  const app = createApp({
    db: dummyDb,
    verifier: dummyVerifier,
    authMiddleware,
    lockMiddleware,
  });

  const expressRouter = app.router || app._router;
  const rawRoutes = walkRouter(expressRouter);

  // De-duplicate routes by method + path
  const uniqueRoutesMap = new Map();
  for (const r of rawRoutes) {
    const key = `${r.method} ${r.path}`;
    if (!uniqueRoutesMap.has(key)) {
      uniqueRoutesMap.set(key, r);
    } else {
      const existing = uniqueRoutesMap.get(key);
      existing.auth = existing.auth || r.auth;
      existing.lock = existing.lock || r.lock;
    }
  }
  const routes = Array.from(uniqueRoutesMap.values());

  // Find test files
  const testFiles = [...findTestFiles(testsDir), ...findTestFiles(fallbackTestsDir)];
  const allParsedTests = [];
  for (const f of testFiles) {
    allParsedTests.push(...parseTestFileCalls(f));
  }

  const reportItems = [];
  for (const route of routes) {
    const { happyTest, failureTest } = matchRouteToTest(route.method, route.path, allParsedTests);
    reportItems.push({
      method: route.method,
      path: route.path,
      auth: route.auth,
      lock: route.lock,
      happyPathTest: happyTest,
      failurePathTest: failureTest,
    });
  }

  // Write JSON copy
  const reportsDir = resolve(process.cwd(), 'docs/test-reports');
  mkdirSync(reportsDir, { recursive: true });
  const jsonPath = join(reportsDir, 'route-coverage.json');
  writeFileSync(jsonPath, JSON.stringify(reportItems, null, 2), 'utf8');

  // Print Markdown table
  console.log('| Method | Path | Auth | Lock | Happy-Path Test | Failure-Path Test |');
  console.log('| :--- | :--- | :--- | :--- | :--- | :--- |');
  for (const item of reportItems) {
    const happy = item.happyPathTest ? item.happyPathTest : 'none';
    const failure = item.failurePathTest ? item.failurePathTest : 'none';
    const auth = item.auth ? 'yes' : 'no';
    const lock = item.lock ? 'yes' : 'no';
    console.log(`| ${item.method} | ${item.path} | ${auth} | ${lock} | ${happy} | ${failure} |`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
