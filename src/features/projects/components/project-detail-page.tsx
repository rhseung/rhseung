import { TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, DetailHeader, LinkRow, Prose } from '@/common/components';
import { useLanguage } from '@/common/hooks';
import { formatPeriod, formatYearMonth, localeHref } from '@/common/lib';
import { metaText, page } from '@/common/styles';
import type { Award } from '@/features/career';

import { PROJECT_LINK_ICON, useProjectLabels } from '../hooks';
import { projectLinks, type Project } from '../lib';

const main = css({ display: 'flex', minW: '0', flexDirection: 'column', gap: '8' });
const header = stack({ gap: '3' });

export function ProjectDetailPage({ project, awards = [], children }: ProjectDetailPage.Props) {
  const lang = useLanguage();
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const shell = page();

  const periodText = formatPeriod(
    project.start,
    project.end,
    t(($) => $.period.ongoing),
  );

  const links = projectLinks(project).map(({ kind, href }) => ({
    key: kind,
    href,
    label: label.link[kind],
    Icon: PROJECT_LINK_ICON[kind],
  }));

  return (
    <div className={shell.root}>
      <div className={shell.frame}>
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/[lang]/projects')}
          backLabel={t(($) => $.detail.back)}
        />

        <main className={main}>
          <header className={header}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: '1.5' })}>
              <Badge variant="outline">{label.status[project.status]}</Badge>
              <span className={cx(metaText, css({ ml: 'auto' }))}>{periodText}</span>
            </div>

            <h1 data-vt-title={project.slug} className={css({ textStyle: 'heading.page' })}>
              {project.title}
            </h1>
            <p className={css({ color: 'text.muted', textStyle: 'body' })}>{project.summary}</p>

            {project.highlight && (
              <p
                className={css({
                  borderLeftWidth: '[2px]',
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'line',
                  pl: '3',
                  fontWeight: 'medium',
                })}
              >
                {project.highlight}
              </p>
            )}

            <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '1' })}>
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>

            <LinkRow links={links} variant="button" />
            {awards.length > 0 && (
              <ul className={stack({ gap: '1' })}>
                {awards.map((item) => (
                  <li
                    key={item.slug}
                    className={css({
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'baseline',
                      columnGap: '2',
                      textStyle: 'sm',
                    })}
                  >
                    <TrophyIcon
                      aria-hidden
                      className={css({ color: 'accent', boxSize: '4', flexShrink: 0 })}
                    />
                    <span className={css({ fontWeight: 'medium' })}>{item.title}</span>
                    {item.issuer && (
                      <span className={css({ color: 'text.muted' })}>{item.issuer}</span>
                    )}
                    <span className={metaText}>{formatYearMonth(item.date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <Prose>{children}</Prose>
        </main>
      </div>
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    project: Project;
    awards?: Award[];
    children: React.ReactNode;
  };
}
