import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { Avatar, AvatarFallback, AvatarImage, ExternalLink, SiteDock } from '@/common/components';
import { dayjs, localeHref, SITE, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import { useExternalLinks, useSiteSections } from '@/common/viewmodels';

import { useContributions, useKstTime, type Contributions } from '../../viewmodels';
import { GithubContributionCalendar, RoleRotator } from '../components';

export function HomePage({ lang, updatedAt, contributions, fetchedAt }: HomePage.Props) {
  const { t } = useTranslation('home');
  const { total, days } = useContributions({ initialData: contributions, fetchedAt });

  const sections = useSiteSections(lang);
  const links = useExternalLinks().filter((link) => link.key !== 'rss');
  const kstTime = useKstTime();
  const roles = useMemo(() => t(($) => $.site.roles, { ns: 'common', returnObjects: true }), [t]);

  const entryClass = cn(
    'border-border hover:bg-muted flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors',
  );
  const contactClass = cn(
    'border-border hover:bg-muted inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
  );

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
        <header className="flex items-center gap-5">
          <Avatar className="size-20">
            <AvatarImage src="/images/profile.png" alt={SITE.handle} />
            <AvatarFallback className="text-foreground">{SITE.handle}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl leading-snug font-bold">
              {t(($) => $.site.name, { ns: 'common' })}
            </h1>
            <div className="text-muted-foreground">
              <RoleRotator roles={roles} />
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold">{t(($) => $.sections.about)}</h2>
          </div>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            {t(($) => $.site.bio, { ns: 'common', returnObjects: true }).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
        {days.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">{t(($) => $.sections.contributions)}</h2>
            <GithubContributionCalendar total={total} days={days} />
          </section>
        )}

        <section className="flex flex-col gap-4">
          <h2 id="entries-heading" className="font-bold">
            {t(($) => $.entries.label)}
          </h2>
          <nav aria-labelledby="entries-heading" className="flex flex-col gap-3">
            <ul className="grid gap-2 sm:grid-cols-5 sm:gap-3">
              {sections.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a href={href} className={entryClass}>
                    <Icon aria-hidden className="text-muted-foreground size-5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-2">
              {links.map(({ key, href, label, Icon, blank }) => (
                <li key={key}>
                  {blank ? (
                    <ExternalLink href={href} className={contactClass}>
                      <Icon aria-hidden className="text-muted-foreground size-4" />
                      {label}
                    </ExternalLink>
                  ) : (
                    <a href={href} className={contactClass}>
                      <Icon aria-hidden className="text-muted-foreground size-4" />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
          <p>
            {t(($) => $.site.location, { ns: 'common' })}
            {kstTime && ` · ${kstTime}`}
          </p>
          <p>
            {t(($) => $.footer.updated)}{' '}
            <span className="text-foreground">{dayjs(updatedAt).format('ll')}</span>
          </p>
        </div>

        <span
          aria-hidden
          className="bg-muted-foreground mx-auto inline-block size-12 shrink-0"
          style={{ mask: "url('/images/signature.png') center / contain no-repeat" }}
        />
      </main>

      <SiteDock lang={lang} altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/')} />
    </div>
  );
}

export declare namespace HomePage {
  export type Props = {
    lang: Language;
    updatedAt: string;
    contributions: Contributions;
    fetchedAt: number;
  };
}
