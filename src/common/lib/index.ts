// 이 배럴은 부수효과 트리거를 겸한다. `@/common/lib`를 어디서든 import하면
// dayjs가 i18next에 연결된다.
import './dayjs';

export { dayjs } from './dayjs';
export { I18N_NAMESPACES, i18n, type I18nNamespace } from './i18n';
export { DEFAULT_LANGUAGE, LANGUAGES, isLanguage, langFromParam, type Language } from './languages';
export { languagePaths, profileOf, SITE, localeHref, type Profile } from './site';
export type { LogoPath, Url } from './scalars';
export { formatYearMonth, yearMonthKey, type YearMonth, type YearOrMonth } from './year-month';
export { TECH, type Tech } from './tech';
