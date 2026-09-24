import { DEFAULT_LANGUAGE } from '../src/common/lib/i18n/languages';
import { acceptedLanguages, preferredLanguage } from '../src/common/lib/i18n/preferred-language';

export function rootResponse(acceptLanguage: string | null): Response {
  const lang = preferredLanguage(acceptedLanguages(acceptLanguage)) ?? DEFAULT_LANGUAGE;

  return new Response(null, {
    status: 302,
    headers: {
      location: `/${lang}/`,
      vary: 'accept-language',
      'cache-control': 'no-store',
    },
  });
}
