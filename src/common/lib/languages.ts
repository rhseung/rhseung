export const LANGUAGES = ['ko', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

/** 접두사가 없는 언어. `astro.config.ts`의 `i18n.defaultLocale`과 같아야 한다. */
export const DEFAULT_LANGUAGE: Language = 'ko';

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as readonly string[]).includes(value);
}

/** `[...lang]` rest 파라미터. 기본 언어 경로에선 `undefined`다. */
export function langFromParam(param: string | undefined): Language {
  return isLanguage(param) ? param : DEFAULT_LANGUAGE;
}
