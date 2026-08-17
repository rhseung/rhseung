export const LANGUAGES = ['ko', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

/** 접두사가 없는 기본 언어. `astro.config.ts`의 `i18n.defaultLocale`과 같아야 한다. */
export const DEFAULT_LANGUAGE: Language = 'ko';

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * `[...lang]` rest 파라미터를 언어로 읽는다.
 * 기본 언어 경로(`/projects`)에선 파라미터가 `undefined`고, `/en/projects`에선 `'en'`이다.
 *
 * 브라우저 언어는 더 이상 보지 않는다 — 언어는 URL이 정한다. 그래야 공유 링크가 언어를
 * 유지하고, 크롤러가 ko/en 두 벌을 각각 색인한다.
 */
export function langFromParam(param: string | undefined): Language {
  return isLanguage(param) ? param : DEFAULT_LANGUAGE;
}
