import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import blogEn from '@/locales/en/blog.json';
import commonEn from '@/locales/en/common.json';
import homeEn from '@/locales/en/home.json';
import projectsEn from '@/locales/en/projects.json';
import researchEn from '@/locales/en/research.json';
import resumeEn from '@/locales/en/resume.json';
import blogKo from '@/locales/ko/blog.json';
import commonKo from '@/locales/ko/common.json';
import homeKo from '@/locales/ko/home.json';
import projectsKo from '@/locales/ko/projects.json';
import researchKo from '@/locales/ko/research.json';
import resumeKo from '@/locales/ko/resume.json';

import { DEFAULT_LANGUAGE } from './languages';

export const I18N_NAMESPACES = [
  'common',
  'blog',
  'home',
  'projects',
  'research',
  'resume',
] as const;

export type I18nNamespace = (typeof I18N_NAMESPACES)[number];

// 리소스는 HTTP 백엔드가 아니라 정적 import다 — `changeLanguage`가 동기라서
// `AppProviders`가 첫 렌더 전에 라우트 언어로 갈아끼울 수 있다.
void i18next.use(initReactI18next).init({
  resources: {
    ko: {
      common: commonKo,
      blog: blogKo,
      home: homeKo,
      projects: projectsKo,
      research: researchKo,
      resume: resumeKo,
    },
    en: {
      common: commonEn,
      blog: blogEn,
      home: homeEn,
      projects: projectsEn,
      research: researchEn,
      resume: resumeEn,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  ns: [...I18N_NAMESPACES],
  nsSeparator: ':',
  keySeparator: '.',
  interpolation: { escapeValue: false },
});

export const i18n = i18next;
