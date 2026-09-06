import { TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, DetailHeader, LinkRow, Prose, SiteDock } from '@/common/components';
import { formatPeriod, formatYearMonth, localeHref, type Language } from '@/common/lib';
import { metaText, page } from '@/common/styles';
import type { Award } from '@/features/career';

import { PROJECT_LINK_ICON, projectLinks, useProjectLabels, type Project } from '../../viewmodels';

const main = css({ display: 'flex', minW: '0', flexDirection: 'column', gap: '8' });
const header = stack({ gap: '3' });
const statusRow = css({ display: 'flex', alignItems: 'center', gap: '1.5' });
const period = css({ ml: 'auto' });
const title = css({ textStyle: 'heading.page' });
const summary = css({ color: 'text.muted', textStyle: 'body' });
const highlight = css({
  borderLeftWidth: '[2px]',
  borderLeftStyle: 'solid',
  borderLeftColor: 'line',
  pl: '3',
  fontWeight: 'medium',
});
const stackList = css({ display: 'flex', flexWrap: 'wrap', gap: '1' });
const awardList = stack({ gap: '1' });
const award = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  columnGap: '2',
  textStyle: 'sm',
});
const trophy = css({ color: 'accent', boxSize: '4', flexShrink: 0 });
const strong = css({ fontWeight: 'medium' });
const muted = css({ color: 'text.muted' });

export function ProjectDetailPage({
  lang,
  project,
  awards = [],
  available,
  children,
}: ProjectDetailPage.Props) {
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
            <div className={statusRow}>
              <Badge variant="outline">{label.status[project.status]}</Badge>
              <span className={cx(metaText, period)}>{periodText}</span>
            </div>

            <h1 data-vt-title={project.slug} className={title}>
              {project.title}
            </h1>
            <p className={summary}>{project.summary}</p>

            {project.highlight && <p className={highlight}>{project.highlight}</p>}

            <ul className={stackList}>
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>

            <LinkRow links={links} variant="button" />
            {awards.length > 0 && (
              <ul className={awardList}>
                {awards.map((item) => (
                  <li key={item.slug} className={award}>
                    <TrophyIcon aria-hidden className={trophy} />
                    <span className={strong}>{item.title}</span>
                    {item.issuer && <span className={muted}>{item.issuer}</span>}
                    <span className={metaText}>{formatYearMonth(item.date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <Prose>{children}</Prose>
        </main>
      </div>

      <SiteDock
        lang={lang}
        current="projects"
        route={{ to: '/[lang]/projects/[slug]', params: { slug: project.slug } }}
        available={available}
      />
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    lang: Language;
    project: Project;
    awards?: Award[];
    available?: readonly Language[];
    children: React.ReactNode;
  };
}
