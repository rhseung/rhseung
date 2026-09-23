import { SITE } from './site';
import { LANGUAGES } from '../i18n/languages';

import type { LocaleRoute } from './href';

const NOINDEX_ROUTES = ['/[lang]/resume', '/[lang]/404'] as const satisfies readonly LocaleRoute[];

export function isNoindex(url: string): boolean {
  const { pathname } = new URL(url, SITE.url);

  return LANGUAGES.some((lang) =>
    NOINDEX_ROUTES.some((route) => pathname.startsWith(route.replace('[lang]', lang))),
  );
}
