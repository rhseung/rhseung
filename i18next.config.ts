import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['ko', 'en'],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/{{language}}/{{namespace}}.json',

    defaultNS: 'common',
    nsSeparator: ':',
    keySeparator: '.',

    primaryLanguage: 'ko',
    secondaryLanguages: ['en'],

    removeUnusedKeys: true,

    // `input` 에 `.astro` 를 넣어도 파서가 조용히 건너뛴다. 거기서만 쓰는 키를 지킨다.
    preservePatterns: ['common:nav.*', 'common:site.description'],
    sort: true,
    indentation: 2,
    defaultValue: '',

    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    useTranslationNames: ['useTranslation'],
    extractFromComments: true,
  },

  lint: {
    ignoredAttributes: ['data-testid', 'aria-label'],
    ignoredTags: ['pre', 'code'],
    ignore: ['**/*.stories.@(ts|tsx)'],
  },

  types: {
    input: ['src/locales/ko/*.json'],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: true,
  },
});
