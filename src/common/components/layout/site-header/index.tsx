import { GlobeIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { Button } from '../../ui/button';

export function SiteHeader({ lang, altHref, className }: SiteHeader.Props) {
  const { t } = useTranslation('common');
  const { resolvedTheme, setTheme } = useTheme();

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];
  const isDark = resolvedTheme === 'dark';

  return (
    <header
      className={cn(
        'border-border bg-background/80 sticky top-0 z-10 border-b backdrop-blur-sm',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-4">
        <span className="text-sm font-semibold tracking-tight">{t(($) => $.app.name)}</span>

        <div className="flex items-center gap-1">
          {/*
            언어 전환은 상태 토글이 아니라 미러 URL로 가는 링크다 — 그래야 공유 링크가
            언어를 유지하고 크롤러가 두 벌을 각각 본다. 짝 문서가 없으면 링크를 숨긴다.
            Base UI 합성은 `asChild`가 아니라 `render` prop이다.
          */}
          {altHref && (
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              aria-label={t(($) => $.actions.switchLanguage)}
              render={
                <a href={altHref} hrefLang={nextLanguage}>
                  <GlobeIcon data-icon="inline-start" />
                  {nextLanguage.toUpperCase()}
                </a>
              }
            />
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={t(($) => $.actions.toggleTheme)}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export declare namespace SiteHeader {
  export type Props = {
    lang: Language;
    /** 이 문서의 다른 언어판 경로. 짝이 없으면 넘기지 않는다 — 버튼이 사라진다. */
    altHref?: string;
    className?: string;
  };
}
