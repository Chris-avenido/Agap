// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  // --- Architecture guardrails (errors) ---------------------------------
  {
    files: ['src/**/*.ts'],
    plugins: { boundaries, import: importPlugin },
    settings: {
      'import/resolver': { node: { extensions: ['.ts', '.js'] } },
      'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
      'boundaries/elements': [
        { type: 'routes', pattern: '**/*.routes.ts', mode: 'file' },
        { type: 'controllers', pattern: '**/*.controller.ts', mode: 'file' },
        { type: 'services', pattern: '**/*.service.ts', mode: 'file' },
      ],
    },
    rules: {
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'routes' } },
              disallow: { to: { element: { type: 'routes' } } },
              message: 'Route handlers must not import other route handlers.',
            },
            {
              from: { element: { type: 'controllers' } },
              disallow: { to: { element: { types: ['routes', 'controllers'] } } },
              message: 'Controllers must not import routes or other controllers.',
            },
            {
              from: { element: { type: 'services' } },
              disallow: { to: { element: { types: ['routes', 'controllers'] } } },
              message: 'Services must not import routes or controllers.',
            },
          ],
        },
      ],
    },
  },
  // --- Pre-existing lint debt: reported as warnings so `ci` can gate on new
  // errors. Ratchet these back to 'error' as files are cleaned up. ---------
  {
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      'no-empty': 'warn',
      'prefer-const': 'warn',
    },
  },
);
