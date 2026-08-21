import { useTranslation } from 'react-i18next';

import { LANGUAGE_NAMES, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { Button, buttonVariants } from '../../ui/button';

export function LanguageSuggestion({ language, href, onDismiss }: LanguageSuggestion.Props) {
  const { t } = useTranslation('common');

  const name = LANGUAGE_NAMES[language];

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm">{t(($) => $.language.available, { name })}</p>

      <div className="flex items-center gap-1">
        <a
          href={href}
          hrefLang={language}
          onClick={onDismiss}
          className={cn(buttonVariants({ size: 'sm' }))}
        >
          {t(($) => $.language.view, { name })}
        </a>

        <Button variant="ghost" size="sm" onClick={onDismiss}>
          {t(($) => $.language.dismiss)}
        </Button>
      </div>
    </div>
  );
}

export declare namespace LanguageSuggestion {
  export type Props = {
    language: Language;
    href: string;
    onDismiss: () => void;
  };
}
