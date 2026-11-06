#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

function findFiles(dir, skipDirs = new Set(['node_modules', '.git'])) {
  if (!existsSync(dir)) return [];
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (skipDirs.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...findFiles(full, skipDirs));
    } else {
      files.push(full);
    }
  }
  return files;
}

const FORBIDDEN_IMPORT_REGEX = /(?:from\s*['"][^'"]*(?:test-auth|test-lock|test-support)[^'"]*['"]|require\s*\(\s*['"][^'"]*(?:test-auth|test-lock|test-support)[^'"]*['"]\))/i;
const FORBIDDEN_ENV_REGEX = /process\.env(?:\.|\[['"`])(?:SKIP_AUTH|BYPASS_AUTH|DISABLE_LOCKS|DISABLE_AUTH)(?:['"`]\])?/i;
const FORBIDDEN_DIST_STRINGS = ['test-auth', 'test-lock', 'test-support', 'testAuthMiddleware', 'testAnonymousMiddleware'];

function scanFileForLeaks(filePath, isBuildOutput, isTestFile) {
  const leaks = [];
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    return leaks;
  }

  const lines = content.split('\n');

  if (isBuildOutput) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const token of FORBIDDEN_DIST_STRINGS) {
        if (line.includes(token)) {
          leaks.push({
            file: filePath,
            line: i + 1,
            issue: `Build output contains test double reference "${token}"`,
          });
        }
      }
    }
    return leaks;
  }

  if (!isTestFile) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (FORBIDDEN_IMPORT_REGEX.test(line)) {
        leaks.push({
          file: filePath,
          line: i + 1,
          issue: 'Imports test double or test-support module outside tests/ directory',
        });
      }
      if (FORBIDDEN_ENV_REGEX.test(line)) {
        leaks.push({
          file: filePath,
          line: i + 1,
          issue: 'Reads forbidden auth/lock bypass environment variable (e.g. SKIP_AUTH, BYPASS_AUTH, DISABLE_LOCKS)',
        });
      }
    }
  }

  return leaks;
}

function main() {
  const backendRoot = resolve(process.cwd(), process.argv[2] || 'apps/backend');
  if (!existsSync(backendRoot)) {
    console.error(`Backend root not found: ${backendRoot}`);
    process.exit(1);
  }

  const allFiles = findFiles(backendRoot);
  const leaks = [];

  for (const file of allFiles) {
    const rel = relative(backendRoot, file).replace(/\\/g, '/');
    const isBuildOutput = rel.startsWith('dist/');
    const isTestFile =
      rel.startsWith('tests/') ||
      rel.includes('/tests/') ||
      /\.(test|spec)\.(ts|js|tsx|jsx)$/.test(rel);

    const fileLeaks = scanFileForLeaks(file, isBuildOutput, isTestFile);
    for (const l of fileLeaks) {
      leaks.push({
        file: relative(process.cwd(), l.file).replace(/\\/g, '/'),
        line: l.line,
        issue: l.issue,
      });
    }
  }

  if (leaks.length > 0) {
    console.log('### Test Double Leaks Detected');
    console.log('');
    console.log(`Found ${leaks.length} leak(s):`);
    for (const leak of leaks) {
      console.log(`- \`${leak.file}:${leak.line}\`: ${leak.issue}`);
    }
    process.exit(1);
  } else {
    console.log('### Test Double Leak Scan');
    console.log('');
    console.log(`- Backend Root: \`${relative(process.cwd(), backendRoot).replace(/\\/g, '/')}\``);
    console.log('- Test doubles imported outside tests: **None**');
    console.log('- Bypass environment variables: **None**');
    console.log('- Build output leaks (`dist/`): **None**');
    console.log('');
    console.log('**Status: 0 leaks detected (Clean)**');
    process.exit(0);
  }
}

main();
