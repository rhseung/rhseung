export const LANGUAGES = ['ko', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

export type Localized<T> = Record<Language, T>;

export const DEFAULT_LANGUAGE = 'ko' satisfies Language;

export function languageName(target: Language, inLanguage: Language = target): string {
  return new Intl.DisplayNames([inLanguage], { type: 'language' }).of(target) ?? target;
}

export function languageTag(lang: Language): string {
  const { region } = new Intl.Locale(lang).maximize();

  return region === undefined ? lang : `${lang}-${region}`;
}

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as readonly string[]).includes(value);
}

export function otherLanguages(lang: Language): Language[] {
  return LANGUAGES.filter((candidate) => candidate !== lang);
}
