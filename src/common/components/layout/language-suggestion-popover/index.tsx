import type { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';

import { LANGUAGE_NAMES, type Language } from '@/common/lib';

import { Button, buttonVariants } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

const actions = css({ display: 'flex', alignItems: 'center', gap: '1' });

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
          // `document.body` 로 포탈돼 독의 print 숨김 밖으로 빠져나간다.
          css={{ w: 'auto', maxW: '72', p: '3', _print: { display: 'none' } }}
          aria-label={t(($) => $.actions.switchLanguage)}
        >
          <p>{t(($) => $.language.available, { name })}</p>

          <div className={actions}>
            <a
              href={href}
              hrefLang={suggested}
              onClick={onDismiss}
              className={buttonVariants({ size: 'sm' })}
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
