import { EnvelopeSimpleIcon, GithubLogoIcon, RssIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { ExternalLink } from '@/common/components';
import { SITE, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

export function SiteFooter({ lang, className }: SiteFooter.Props) {
  const { t } = useTranslation('common');

  const linkClass = 'text-muted-foreground hover:text-foreground text-xs hover:underline';

  return (
    <footer className={cn('border-border mt-16 border-t print:hidden', className)}>
      <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-8">
        <span className="text-muted-foreground text-xs">© {SITE.name[lang]}</span>

        <nav aria-label={t(($) => $.footer.label)} className="ml-auto">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              <ExternalLink href={SITE.github} className={linkClass}>
                <GithubLogoIcon aria-hidden className="size-3.5 shrink-0" />
                GitHub
              </ExternalLink>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className={cn(linkClass, 'inline-flex items-center gap-1')}
              >
                <EnvelopeSimpleIcon aria-hidden className="size-3.5 shrink-0" />
                {t(($) => $.footer.email)}
              </a>
            </li>
            <li>
              <a href="/rss.xml" className={cn(linkClass, 'inline-flex items-center gap-1')}>
                <RssIcon aria-hidden className="size-3.5 shrink-0" />
                RSS
              </a>
            </li>
            <li>
              <a href={localeHref(lang, '/resume')} className={linkClass}>
                {t(($) => $.nav.resume)}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export declare namespace SiteFooter {
  export type Props = {
    lang: Language;
    className?: string;
  };
}
