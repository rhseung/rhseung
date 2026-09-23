import { LANGUAGES } from '../i18n/languages';

export function languagePaths() {
  return LANGUAGES.map((lang) => ({ params: { lang }, props: { lang } }));
}
