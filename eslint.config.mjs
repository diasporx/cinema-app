// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
  {
    ignorePatterns: ['tests/**/*'],
    rules: {
      'object-curly-spacing': ['error', 'always'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
    },
  },
);
