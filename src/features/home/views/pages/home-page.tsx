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
const section = stack({ gap: '4' });
const heading = css({ textStyle: 'heading.sub' });
const entries = stack({ gap: '3' });
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
        <header className={css({ display: 'flex', alignItems: 'center', gap: '5' })}>
          <Avatar size="xl">
            <AvatarImage src="/images/profile.png" alt={SITE.handle} />
            <AvatarFallback>{SITE.handle}</AvatarFallback>
          </Avatar>
          <div className={stack({ gap: '1' })}>
            <h1 className={css({ textStyle: 'heading.page' })}>
              {t(($) => $.site.name, { ns: 'common' })}
            </h1>
            <div className={css({ color: 'text.muted' })}>
              <RoleRotator roles={roles} />
            </div>
          </div>
        </header>

        <section className={section}>
          <h2 className={heading}>{t(($) => $.sections.about)}</h2>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '3',
              color: 'text.muted',
              textStyle: 'body',
            })}
          >
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
            <ul
              className={css({
                display: 'grid',
                gap: '2',
                sm: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '3' },
              })}
            >
              {sections.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={css({
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
                    })}
                  >
                    <Icon aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '2' })}>
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

        <div
          className={css({
            mt: '4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'text.muted',
            textStyle: 'caption',
          })}
        >
          <p>
            {t(($) => $.site.location, { ns: 'common' })}
            {kstTime && ` · ${kstTime}`}
          </p>
          <p>
            {t(($) => $.footer.updated)}{' '}
            <span className={css({ color: 'text' })}>{dayjs(updatedAt).format('ll')}</span>
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
