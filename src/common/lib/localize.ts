import { omit } from 'es-toolkit';

import { LANGUAGES, type Language, type Localized } from './languages';

export function localize<I extends Localized<object>>(
  item: I,
  lang: Language,
): Omit<I, Language> & I[Language] {
  return { ...omit(item, [...LANGUAGES]), ...item[lang] };
}
