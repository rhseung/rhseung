import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Avatar, AvatarFallback, AvatarImage, ExternalLink, SiteDock } from '@/common/components';
import { dayjs, SITE, type Language } from '@/common/lib';
import { page } from '@/common/styles';
import { useExternalLinks, useSiteSections } from '@/common/viewmodels';

import { useContributions, useKstTime, type Contributions } from '../../viewmodels';
import { GithubContributionCalendar, RoleRotator } from '../components';

const main = css({
  mx: 'auto',
  display: 'flex',
  maxW: '3xl',
  flexDirection: 'column',
  gap: '12',
  px: '4',
  py: '16',
});
const hero = css({ display: 'flex', alignItems: 'center', gap: '5' });
const heroText = stack({ gap: '1' });
const name = css({ textStyle: 'heading.page' });
const muted = css({ color: 'text.muted' });
const section = stack({ gap: '4' });
const heading = css({ textStyle: 'heading.sub' });
const bio = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
  color: 'text.muted',
  textStyle: 'body',
});
const entries = stack({ gap: '3' });
const entryGrid = css({
  display: 'grid',
  gap: '2',
  sm: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '3' },
});
const entry = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  rounded: 'lg',
  border: 'line',
  p: '3',
  textStyle: 'sm',
  fontWeight: 'medium',
  transition: 'colors',
  _hover: { bg: 'surface.muted' },
  '& > svg': { color: 'text.muted', boxSize: '5' },
});
const contacts = css({ display: 'flex', flexWrap: 'wrap', gap: '2' });
const contact = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  rounded: 'full',
  border: 'line',
  px: '4',
  py: '2',
  textStyle: 'sm',
  fontWeight: 'medium',
  transition: 'colors',
  _hover: { bg: 'surface.muted' },
  '& > svg:first-child': { color: 'text.muted', boxSize: '4' },
});
const footer = css({
  mt: '4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'text.muted',
  textStyle: 'caption',
});
const strong = css({ color: 'text' });
const signature = css({
  mx: 'auto',
  display: 'inline-block',
  boxSize: '12',
  flexShrink: 0,
  bg: 'text.muted',
});

export function HomePage({ lang, updatedAt, contributions, fetchedAt }: HomePage.Props) {
  const { t } = useTranslation('home');
  const { total, days } = useContributions({ initialData: contributions, fetchedAt });
  const shell = page();

  const sections = useSiteSections(lang);
  const links = useExternalLinks().filter((link) => link.key !== 'rss');
  const kstTime = useKstTime();
  const roles = useMemo(() => t(($) => $.site.roles, { ns: 'common', returnObjects: true }), [t]);

  return (
    <div className={shell.root}>
      <main className={main}>
        <header className={hero}>
          <Avatar size="xl">
            <AvatarImage src="/images/profile.png" alt={SITE.handle} />
            <AvatarFallback>{SITE.handle}</AvatarFallback>
          </Avatar>
          <div className={heroText}>
            <h1 className={name}>{t(($) => $.site.name, { ns: 'common' })}</h1>
            <div className={muted}>
              <RoleRotator roles={roles} />
            </div>
          </div>
        </header>

        <section className={section}>
          <h2 className={heading}>{t(($) => $.sections.about)}</h2>
          <div className={bio}>
            {t(($) => $.site.bio, { ns: 'common', returnObjects: true }).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
        {days.length > 0 && (
          <section className={section}>
            <h2 className={heading}>{t(($) => $.sections.contributions)}</h2>
            <GithubContributionCalendar total={total} days={days} />
          </section>
        )}

        <section className={section}>
          <h2 id="entries-heading" className={heading}>
            {t(($) => $.entries.label)}
          </h2>
          <nav aria-labelledby="entries-heading" className={entries}>
            <ul className={entryGrid}>
              {sections.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a href={href} className={entry}>
                    <Icon aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className={contacts}>
              {links.map(({ key, href, label, Icon, blank }) => (
                <li key={key}>
                  {blank ? (
                    <ExternalLink href={href} plain className={contact}>
                      <Icon aria-hidden />
                      {label}
                    </ExternalLink>
                  ) : (
                    <a href={href} className={contact}>
                      <Icon aria-hidden />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className={footer}>
          <p>
            {t(($) => $.site.location, { ns: 'common' })}
            {kstTime && ` · ${kstTime}`}
          </p>
          <p>
            {t(($) => $.footer.updated)}{' '}
            <span className={strong}>{dayjs(updatedAt).format('ll')}</span>
          </p>
        </div>

        <span
          aria-hidden
          className={signature}
          style={{ mask: "url('/images/signature.png') center / contain no-repeat" }}
        />
      </main>

      <SiteDock lang={lang} route={{ to: '/[lang]' }} />
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
