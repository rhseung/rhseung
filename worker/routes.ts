import { isLanguage, LANGUAGES, type Language } from '../src/common/lib/i18n/languages';

export type Route =
  | { kind: 'root' }
  | { kind: 'favicon'; host: string }
  | { kind: 'contributions' }
  | { kind: 'resume'; lang: Language }
  | { kind: 'renderResume' }
  | { kind: 'asset'; lang: Language | null };

const FAVICON = /^\/api\/favicon\/([^/]+)$/;
const RESUME = /^\/resume-([a-z]{2})\.pdf$/;

export function matchRoute(pathname: string): Route {
  if (pathname === '/') return { kind: 'root' };
  if (pathname === '/api/contributions') return { kind: 'contributions' };
  if (pathname === '/api/render-resume') return { kind: 'renderResume' };

  const favicon = FAVICON.exec(pathname);

  if (favicon !== null) return { kind: 'favicon', host: decodeURIComponent(favicon[1]) };

  const resume = RESUME.exec(pathname);

  if (resume !== null && isLanguage(resume[1])) return { kind: 'resume', lang: resume[1] };

  return {
    kind: 'asset',
    lang: LANGUAGES.find((lang) => pathname.startsWith(`/${lang}/`)) ?? null,
  };
}
