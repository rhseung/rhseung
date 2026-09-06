import { LANGUAGES } from './languages';

import type { LocaleRoute } from './href';

export const SITE = {
  url: 'https://www.rhseung.me',
  handle: 'rhseung',
  github: 'https://github.com/rhseung',
  email: 'ryu@rhseung.me',
  ogImage: '/images/og.png',
  title: 'Rhseung',
} as const satisfies {
  url: string;
  handle: string;
  github: string;
  email: string;
  ogImage: string;
  title: string;
};

const NOINDEX_ROUTES = ['/[lang]/resume'] as const satisfies readonly LocaleRoute[];

export function isNoindex(url: string): boolean {
  const { pathname } = new URL(url, SITE.url);

  return LANGUAGES.some((lang) =>
    NOINDEX_ROUTES.some((route) => pathname.startsWith(route.replace('[lang]', lang))),
  );
}

export function languagePaths() {
  return LANGUAGES.map((lang) => ({ params: { lang }, props: { lang } }));
}
