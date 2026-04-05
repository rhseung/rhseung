import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

import { LANGUAGES, type Language } from './languages';

export function useLanguage(): Language {
  const { i18n: i18nInstance } = useTranslation();
  return i18nInstance.language as Language;
}

const browserLng = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'ko';
const initialLng: Language = (LANGUAGES as readonly string[]).includes(browserLng)
  ? (browserLng as Language)
  : 'ko';

await i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'ko',
    defaultNS: '_',
    nsSeparator: ':',
    keySeparator: '.',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
