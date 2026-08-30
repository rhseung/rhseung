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
      <PopoverTrigger
        // 트리거가 버튼이 아니라 링크다 - 언어 페이지로 실제 이동해야 하니 `<a>`를 써야 한다.
        nativeButton={false}
        render={children}
      />

      {suggested !== null && (
        <PopoverContent
          side="top"
          align="center"
          sideOffset={8}
          // 팝오버는 `document.body`로 포탈돼서 독의 `print:hidden` 밖으로 빠져나간다. 안 걸면 이력서 PDF 머리에 언어 제안이 그대로 찍힌다.
          // 좁은 화면에서 팝오버가 뷰포트를 넘지 않게 - Base UI 는 폭을 안 줄인다.
          className="w-auto max-w-[min(20rem,calc(100vw-2rem))] p-4 print:hidden"
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
