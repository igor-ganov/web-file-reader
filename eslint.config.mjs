// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';

/**
 * Flat ESLint config shared across all @web-file-reader packages.
 * Enforces the project TypeScript style: no `any`, no casts, no `null`,
 * plus Lit best practices and accessibility rules.
 */
export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.astro/**', '**/coverage/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: 'TSAsExpression', message: 'Type assertions are forbidden — model types so casts are unnecessary.' },
        { selector: 'Literal[raw="null"]', message: 'Use undefined instead of null.' },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    plugins: { lit, 'lit-a11y': litA11y },
    rules: {
      ...lit.configs.recommended.rules,
      ...litA11y.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/vitest.config.ts', '**/tsup.config.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
