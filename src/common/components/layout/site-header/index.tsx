import { GlobeIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { Button, buttonVariants } from '../../ui/button';

const NAV_SECTIONS = ['projects', 'blog', 'career', 'resume'] as const;

type NavSection = (typeof NAV_SECTIONS)[number];

export function SiteHeader({ lang, current, altHref, className }: SiteHeader.Props) {
  const { t } = useTranslation('common');
  const { resolvedTheme, setTheme } = useTheme();

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];
  const isDark = resolvedTheme === 'dark';

  const navLabel: Record<NavSection, string> = {
    projects: t(($) => $.nav.projects),
    blog: t(($) => $.nav.blog),
    career: t(($) => $.nav.career),
    resume: t(($) => $.nav.resume),
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
          className="font-logo text-sm font-semibold tracking-tight hover:underline"
        >
          {t(($) => $.app.name)}
        </a>

        <nav aria-label={t(($) => $.nav.label)}>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
          {altHref && (
            <a
              href={altHref}
              hrefLang={nextLanguage}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
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
    current?: NavSection;
    altHref?: string;
    className?: string;
  };
}
