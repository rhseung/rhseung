import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE, isLanguage, type Language } from '@/common/lib';

export function useLanguage(): Language {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return isLanguage(current) ? current : DEFAULT_LANGUAGE;
}
