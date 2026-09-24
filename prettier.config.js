export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  plugins: ['prettier-plugin-astro'],
  overrides: [{ files: '*.jsonc', options: { trailingComma: 'none' } }],
};
