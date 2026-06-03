import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.codex/**',
      'node_modules/**',
      '.wrangler/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
  },
]
