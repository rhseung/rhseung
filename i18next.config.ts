import { defineConfig } from 'i18next-cli';

import { DEFAULT_LANGUAGE, LANGUAGES, otherLanguages } from './src/common/lib/languages';

export default defineConfig({
  locales: [...LANGUAGES],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/{{language}}/{{namespace}}.json',

    defaultNS: 'common',
    nsSeparator: ':',
    keySeparator: '.',

    primaryLanguage: DEFAULT_LANGUAGE,
    secondaryLanguages: otherLanguages(DEFAULT_LANGUAGE),

    removeUnusedKeys: true,
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
    input: [`src/locales/${DEFAULT_LANGUAGE}/*.json`],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: true,
  },
});
