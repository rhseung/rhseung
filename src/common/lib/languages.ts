export const LANGUAGES = ['ko', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

export type Localized<T> = Record<Language, T>;

export const DEFAULT_LANGUAGE = 'ko' satisfies Language;

export const LANGUAGE_NAMES = {
  ko: '한국어',
  en: 'English',
} satisfies Record<Language, string>;

export const LANGUAGE_TAGS = {
  ko: 'ko-KR',
  en: 'en-US',
} satisfies Record<Language, `${string}-${string}`>;

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as readonly string[]).includes(value);
}

export function langFromParam(param: string | undefined): Language {
  return isLanguage(param) ? param : DEFAULT_LANGUAGE;
}

export function otherLanguages(lang: Language): Language[] {
  return LANGUAGES.filter((candidate) => candidate !== lang);
}

export function preferredLanguage(tags: readonly string[]): Language | null {
  const base = tags[0]?.split('-')[0];
  return isLanguage(base) ? base : null;
}
