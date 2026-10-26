import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import { ExternalLink, LinkRow } from '@/common/components';
import { formatPeriod } from '@/common/lib';
import { metaText } from '@/common/styles';
import type { Award } from '@/features/career';

import { PROJECT_LINK_ICON, useProjectLabels } from '../../hooks';
import { projectHref, projectLinks, type Project } from '../../lib';

export function ProjectCard({ project, detailHref, awards = [], careerHref }: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const periodText = formatPeriod(
    project.start,
    project.end,
    t(($) => $.period.ongoing),
  );

  const target = projectHref(project, detailHref);
  const links = projectLinks(project).map(({ kind, href }) => ({
    key: kind,
    href,
    label: label.link[kind],
    Icon: PROJECT_LINK_ICON[kind],
  }));

  return (
    <article
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '6',
        rowGap: '4',
        py: '5',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexGrow: 999,
          flexBasis: '[18rem]',
          minW: '0',
          flexDirection: 'column',
          gap: '2.5',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            columnGap: '3',
            rowGap: '1',
          })}
        >
          <h3
            data-vt-title={project.slug}
            className={css({
              textStyle: 'heading.card',
              '& a:hover': { textDecoration: 'underline' },
            })}
          >
            {target === null && project.title}
            {target?.external === false && <a href={target.href}>{project.title}</a>}
            {target?.external === true && (
              <ExternalLink href={target.href} plain>
                {project.title}
              </ExternalLink>
            )}
          </h3>
          <span className={cx(metaText, css({ ml: 'auto' }))}>{periodText}</span>
        </div>

        <p className={css({ color: 'text.body', textStyle: 'body' })}>{project.summary}</p>

        {awards.map((award) => (
          <p key={award.slug} className={css({ color: 'text.muted', textStyle: 'sm' })}>
            {t(($) => $.award.label)}{' '}
            <a
              href={`${careerHref}#${award.slug}`}
              className={css({ color: 'text', _hover: { textDecoration: 'underline' } })}
            >
              {award.title}
            </a>
          </p>
        ))}

        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: '4',
            rowGap: '2',
          })}
        >
          <p className={css({ color: 'text.muted', textStyle: 'caption' })}>
            {project.stack.join(' · ')}
          </p>
          <LinkRow links={links} />
        </div>
      </div>

      {project.cover && (
        <div
          className={css({
            flexGrow: 1,
            flexBasis: '[10rem]',
            maxW: '48',
            aspectRatio: '[4/3]',
            alignSelf: 'flex-start',
            overflow: 'hidden',
            rounded: 'lg',
            bg: 'surface.muted',
          })}
        >
          {/* eslint-disable-next-line no-restricted-syntax */}
          <img
            src={project.cover}
            alt={project.coverAlt ?? ''}
            width={192}
            height={144}
            loading="lazy"
            decoding="async"
            className={css({ boxSize: 'full', objectFit: 'cover' })}
          />
        </div>
      )}
    </article>
  );
}

export declare namespace ProjectCard {
  export type Props = {
    project: Project;
    detailHref: string;
    careerHref: string;
    awards?: Award[];
  };
}
