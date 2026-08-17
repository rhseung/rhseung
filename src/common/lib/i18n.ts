import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '@/locales/en/common.json';
import commonKo from '@/locales/ko/common.json';

import { DEFAULT_LANGUAGE } from './languages';

export const I18N_NAMESPACES = ['common'] as const;

export type I18nNamespace = (typeof I18N_NAMESPACES)[number];

// 리소스를 런타임 HTTP 백엔드가 아니라 정적으로 import한다 — 워커 위의 SSR/SSG에서
// 요청 워터폴 없이 그대로 돈다. 로케일 파일이 커지면 그때 재검토.
void i18next.use(initReactI18next).init({
  resources: {
    ko: { common: commonKo },
    en: { common: commonEn },
  },
  // 언어는 URL이 정한다 — `AppProviders`가 라우트의 lang으로 즉시 갈아끼운다.
  // 리소스가 정적 import라 `changeLanguage`가 동기라서 첫 렌더 전에 끝난다.
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  ns: [...I18N_NAMESPACES],
  nsSeparator: ':',
  keySeparator: '.',
  interpolation: { escapeValue: false },
});

export const i18n = i18next;
