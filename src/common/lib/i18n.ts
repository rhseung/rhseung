import i18next, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './languages';

const modules = import.meta.glob<Record<string, unknown>>('@/locales/*/*.json', {
  eager: true,
  import: 'default',
});

const resources: Resource = {};

for (const [path, json] of Object.entries(modules)) {
  const match = /\/locales\/([^/]+)\/([^/]+)\.json$/.exec(path);
  if (match === null) throw new Error(`로케일 경로가 아닙니다: ${path}`);

  const [, lang, namespace] = match as unknown as [string, string, string];
  (resources[lang] ??= {})[namespace] = json;
}

export const I18N_NAMESPACES: readonly string[] = [
  ...new Set(Object.values(resources).flatMap((bundle) => Object.keys(bundle))),
];

void i18next.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  ns: [...I18N_NAMESPACES],
  nsSeparator: ':',
  keySeparator: '.',
  interpolation: { escapeValue: false },
});

export const i18n = i18next;
