import { GlobeIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { Button, buttonVariants } from '../../ui/button';

/** 라우트가 생길 때마다 여기 한 줄. 없는 경로를 미리 걸면 404다. */
const NAV_SECTIONS = ['projects', 'blog', 'about'] as const;

type NavSection = (typeof NAV_SECTIONS)[number];

export function SiteHeader({ lang, current, altHref, className }: SiteHeader.Props) {
  const { t } = useTranslation('common');
  const { resolvedTheme, setTheme } = useTheme();

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];
  const isDark = resolvedTheme === 'dark';

  // 동적 키는 셀렉터로 못 쓴다 — 정적 맵으로 각 항목을 직접 호출한다.
  const navLabel: Record<NavSection, string> = {
    projects: t(($) => $.nav.projects),
    blog: t(($) => $.nav.blog),
    about: t(($) => $.nav.about),
  };

  return (
    <header
      className={cn(
        'border-border bg-background/80 sticky top-0 z-10 border-b backdrop-blur-sm',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-4 px-4">
        <a
          href={localeHref(lang, '/')}
          className="text-sm font-semibold tracking-tight hover:underline"
        >
          {t(($) => $.app.name)}
        </a>

        <nav aria-label={t(($) => $.nav.label)}>
          <ul className="flex items-center gap-3">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <a
                  href={localeHref(lang, `/${section}`)}
                  aria-current={current === section ? 'page' : undefined}
                  className={cn(
                    'text-sm hover:underline',
                    current === section ? 'text-foreground font-medium' : 'text-muted-foreground',
                  )}
                >
                  {navLabel[section]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {/*
            이동은 링크다. `Button render={<a/>}`는 Base UI가 `role="button"`을 씌워서
            스크린리더가 "버튼"이라고 읽는다 — 실제로는 페이지가 넘어가는데도.
          */}
          {altHref && (
            <a
              href={altHref}
              hrefLang={nextLanguage}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              // 접근 가능한 이름이 보이는 텍스트를 포함해야 한다 (WCAG 2.5.3).
              aria-label={`${nextLanguage.toUpperCase()} — ${t(($) => $.actions.switchLanguage)}`}
            >
              <GlobeIcon data-icon="inline-start" />
              {nextLanguage.toUpperCase()}
            </a>
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
    /** 지금 보고 있는 섹션. 네비에서 강조된다. 홈은 넘기지 않는다. */
    current?: NavSection;
    /** 이 문서의 다른 언어판 경로. 짝이 없으면 넘기지 않는다 — 버튼이 사라진다. */
    altHref?: string;
    className?: string;
  };
}
