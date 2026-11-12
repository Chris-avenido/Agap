// Architecture guardrails only. General linting is handled by oxlint (`npm run lint`).
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'eslint.config.mjs'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { boundaries, import: importPlugin },
    settings: {
      'import/resolver': { node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] } },
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'boundaries/elements': [
        { type: 'feature', pattern: 'src/features/*', capture: ['featureName'] },
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
              from: { element: { type: 'feature' } },
              disallow: {
                to: {
                  element: {
                    type: 'feature',
                    captured: { featureName: '!{{ from.captured.featureName }}' },
                  },
                },
              },
              message: 'Features must not import other features. Move shared code to utils or components.',
            },
          ],
        },
      ],
    },
  },
);
