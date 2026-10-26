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
              textStyle: project.cover ? 'heading.sub' : 'heading.card',
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
          <span
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5',
              color: 'text.muted',
              textStyle: 'caption',
            })}
          >
            <span
              aria-hidden
              className={css({
                boxSize: '1.5',
                rounded: 'full',
                bg: project.status === 'active' ? 'tone.green' : 'text.muted',
              })}
            />
            {label.status[project.status]}
          </span>
          <span className={cx(metaText, css({ ml: 'auto' }))}>{periodText}</span>
        </div>

        <p className={css({ color: 'text.body', textStyle: 'body' })}>{project.summary}</p>

        {awards.length > 0 && (
          <dl
            className={css({
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr)',
              columnGap: '3',
              rowGap: '1',
              textStyle: 'sm',
            })}
          >
            {awards.map((award) => (
              <div key={award.slug} className={css({ display: 'contents' })}>
                <dt className={css({ color: 'text.muted' })}>{t(($) => $.award.label)}</dt>
                <dd>
                  <a
                    href={`${careerHref}#${award.slug}`}
                    className={css({
                      fontWeight: 'semibold',
                      textDecoration: 'underline',
                      textDecorationColor: 'text.muted',
                      textUnderlineOffset: '[3px]',
                      _hover: { textDecorationColor: 'text' },
                    })}
                  >
                    {award.title}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: '4',
            rowGap: '2',
          })}
        >
          <p
            className={css({
              color: 'text.muted',
              fontFamily: 'mono',
              textStyle: 'micro',
            })}
          >
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
            rounded: 'xl',
            border: 'line',
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
