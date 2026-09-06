import { TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, ExternalLink, LinkRow, TechIcon } from '@/common/components';
import { formatPeriod } from '@/common/lib';
import { brand, metaText } from '@/common/styles';
import { TECH_BY_NAME } from '@/content/skills';
import type { Award } from '@/features/career';

import {
  PROJECT_LINK_ICON,
  projectHref,
  projectLinks,
  useProjectLabels,
  type Project,
} from '../../../viewmodels';

const STACK_SHOWN = 6;

const article = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  rounded: 'lg',
  px: '3',
  py: '4',
  transition: 'colors',
  _hover: { bg: 'surface.muted/40' },
});
// `flex` 를 빼면 아이콘 유무로 baseline 이 어긋난다.
const micro = css.raw({ textStyle: 'micro' });

export function ProjectCard({
  project,
  detailHref,
  awards = [],
  selectedStack = [],
  onToggleStack,
}: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const periodText = formatPeriod(
    project.start,
    project.end,
    t(($) => $.period.ongoing),
  );

  const target = projectHref(project, detailHref);
  const ordered = [
    ...project.stack.filter((item) => selectedStack.includes(item)),
    ...project.stack.filter((item) => !selectedStack.includes(item)),
  ];
  const shown = ordered.slice(0, STACK_SHOWN);
  const overflow = project.stack.length - shown.length;

  const links = projectLinks(project).map(({ kind, href }) => ({
    key: kind,
    href,
    label: label.link[kind],
    Icon: PROJECT_LINK_ICON[kind],
  }));

  return (
    <article className={article}>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          columnGap: '2',
          rowGap: '1',
        })}
      >
        <h2
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
        </h2>
        <span className={cx(metaText, css({ ml: 'auto', alignSelf: 'center' }))}>{periodText}</span>
      </div>

      <p className={css({ color: 'text.muted', textStyle: 'body' })}>{project.summary}</p>

      {awards.length > 0 && (
        <ul className={stack({ gap: '0.5' })}>
          {awards.map((item) => (
            <li
              key={item.slug}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '1.5',
                textStyle: 'caption',
              })}
            >
              <TrophyIcon
                aria-hidden
                className={css({ color: 'accent', boxSize: '3.5', flexShrink: 0 })}
              />
              <span className={css({ fontWeight: 'medium' })}>{item.title}</span>
            </li>
          ))}
        </ul>
      )}

      {project.highlight && (
        <p
          className={css({
            borderLeftWidth: '[2px]',
            borderLeftStyle: 'solid',
            borderLeftColor: 'line',
            pl: '3',
            textStyle: 'caption',
            fontWeight: 'medium',
          })}
        >
          {project.highlight}
        </p>
      )}

      <div className={css({ mt: '0.5', display: 'flex', flexDirection: 'column', gap: '2' })}>
        <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '1' })}>
          {shown.map((item) => {
            const selected = selectedStack.includes(item);
            const tech = TECH_BY_NAME[item];
            const badge = (
              <Badge
                variant={tech === undefined ? 'outline' : 'secondary'}
                tone={tech === undefined ? undefined : 'brand'}
                css={selected ? { ...micro, ...css.raw({ boxShadow: 'selected' }) } : micro}
                style={tech === undefined ? undefined : brand(tech.hex)}
              >
                {tech?.icon && <TechIcon icon={tech.icon} />}
                {item}
              </Badge>
            );

            return (
              <li key={item} className={css({ display: 'flex' })}>
                {onToggleStack ? (
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onToggleStack(item)}
                    className={css({ cursor: 'pointer' })}
                  >
                    {badge}
                  </button>
                ) : (
                  badge
                )}
              </li>
            );
          })}
          {overflow > 0 && (
            <li className={css({ color: 'text.muted', alignSelf: 'center', textStyle: 'micro' })}>
              +{overflow}
            </li>
          )}
        </ul>

        <LinkRow links={links} />
      </div>
    </article>
  );
}

export declare namespace ProjectCard {
  export type Props = {
    project: Project;
    detailHref: string;
    awards?: Award[];
    selectedStack?: readonly string[];
    onToggleStack?: (item: string) => void;
  };
}
