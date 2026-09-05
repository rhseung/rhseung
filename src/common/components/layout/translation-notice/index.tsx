import { LanguageIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_NAMES, type Language } from '@/common/lib';

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

export function TranslationNotice({ bodyLang }: TranslationNotice.Props) {
  const { t } = useTranslation('common');

  return (
    <Alert>
      <LanguageIcon aria-hidden />
      <AlertTitle>{t(($) => $.language.untranslated.title)}</AlertTitle>
      <AlertDescription>
        {t(($) => $.language.untranslated.description, { name: LANGUAGE_NAMES[bodyLang] })}
      </AlertDescription>
    </Alert>
  );
}

export declare namespace TranslationNotice {
  export type Props = {
    bodyLang: Language;
  };
}
