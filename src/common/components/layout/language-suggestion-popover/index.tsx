import type { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { LANGUAGE_NAMES, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { Button, buttonVariants } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export function LanguageSuggestionPopover({
  suggested,
  href,
  onDismiss,
  children,
}: LanguageSuggestionPopover.Props) {
  const { t } = useTranslation('common');

  const name = suggested === null ? '' : LANGUAGE_NAMES[suggested];

  return (
    <Popover
      open={suggested !== null}
      onOpenChange={(open) => {
        if (!open) onDismiss();
      }}
    >
      <PopoverTrigger nativeButton={false} render={children} />

      {suggested !== null && (
        <PopoverContent
          side="top"
          align="center"
          // `document.body` 로 포탈돼 독의 `print:hidden` 밖으로 빠져나간다.
          className="w-auto max-w-72 p-3 print:hidden"
          aria-label={t(($) => $.actions.switchLanguage)}
        >
          <p>{t(($) => $.language.available, { name })}</p>

          <div className="flex items-center gap-1">
            <a
              href={href}
              hrefLang={suggested}
              onClick={onDismiss}
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              {t(($) => $.language.view, { name })}
            </a>

            <Button variant="ghost" size="sm" onClick={onDismiss}>
              {t(($) => $.language.dismiss)}
            </Button>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}

export declare namespace LanguageSuggestionPopover {
  export type Props = {
    suggested: Language | null;
    href: string;
    onDismiss: () => void;
    children: ReactElement;
  };
}
