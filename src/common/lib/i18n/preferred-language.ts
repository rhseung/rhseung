import { isLanguage, type Language } from './languages';

const QUALITY = /^q=(\d+(\.\d+)?)$/i;

function quality(parameters: readonly string[]): number {
  for (const parameter of parameters) {
    const match = QUALITY.exec(parameter.trim());

    if (match !== null) return Number(match[1]);
  }

  return 1;
}

export function acceptedLanguages(header: string | null): string[] {
  if (header === null) return [];

  return header
    .split(',')
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(';');

      return { tag, quality: quality(parameters) };
    })
    .filter((entry) => entry.tag.length > 0 && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.tag);
}

function primarySubtag(tag: string): string | undefined {
  try {
    return new Intl.Locale(tag).language;
  } catch {
    return undefined;
  }
}

export function preferredLanguage(tags: readonly string[]): Language | null {
  for (const tag of tags) {
    const base = primarySubtag(tag);

    if (isLanguage(base)) return base;
  }

  return null;
}
