export const LANGUAGES = ['ko', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

/** 접두사가 없는 언어. `astro.config.ts`의 `i18n.defaultLocale`과 같아야 한다. */
export const DEFAULT_LANGUAGE: Language = 'ko';

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as readonly string[]).includes(value);
}

export function langFromParam(param: string | undefined): Language {
  return isLanguage(param) ? param : DEFAULT_LANGUAGE;
}

/**
 * 언어 이름은 그 언어로 쓴다. 두 로케일에서 값이 같아서 로케일 JSON에 두면 복제만 된다.
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
};

/**
 * `navigator.languages`에서 첫 항목만 본다. 뒤쪽은 "이것도 읽을 수 있다"에 가깝지
 * "이걸로 보고 싶다"가 아니라서, 목록 어디든 있으면 제안하면 영어판을 일부러 연 사람에게도
 * 계속 뜬다. `ko-KR` 같은 지역 태그는 잘라 낸다.
 */
export function preferredLanguage(tags: readonly string[]): Language | null {
  const base = tags[0]?.split('-')[0];
  return isLanguage(base) ? base : null;
}
