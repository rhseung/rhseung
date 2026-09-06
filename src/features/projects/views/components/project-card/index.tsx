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
const head = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  columnGap: '2',
  rowGap: '1',
});
const title = css({ textStyle: 'heading.card', '& a:hover': { textDecoration: 'underline' } });
const period = css({ ml: 'auto', alignSelf: 'center' });
const summary = css({ color: 'text.muted', textStyle: 'body' });
const awardList = stack({ gap: '0.5' });
const award = css({ display: 'flex', alignItems: 'center', gap: '1.5', textStyle: 'caption' });
const trophy = css({ color: 'accent', boxSize: '3.5', flexShrink: 0 });
const strong = css({ fontWeight: 'medium' });
const highlight = css({
  borderLeftWidth: '[2px]',
  borderLeftStyle: 'solid',
  borderLeftColor: 'line',
  pl: '3',
  textStyle: 'caption',
  fontWeight: 'medium',
});
const foot = css({ mt: '0.5', display: 'flex', flexDirection: 'column', gap: '2' });
const stackList = css({ display: 'flex', flexWrap: 'wrap', gap: '1' });
// `flex` 를 빼면 아이콘 유무로 baseline 이 어긋난다.
const stackItem = css({ display: 'flex' });
const toggle = css({ cursor: 'pointer' });
const micro = css.raw({ textStyle: 'micro' });
const ring = css.raw({ boxShadow: 'selected' });
const overflowCount = css({ color: 'text.muted', alignSelf: 'center', textStyle: 'micro' });

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
      <div className={head}>
        <h2 data-vt-title={project.slug} className={title}>
          {target === null && project.title}
          {target?.external === false && <a href={target.href}>{project.title}</a>}
          {target?.external === true && (
            <ExternalLink href={target.href}>{project.title}</ExternalLink>
          )}
        </h2>
        <span className={cx(metaText, period)}>{periodText}</span>
      </div>

      <p className={summary}>{project.summary}</p>

      {awards.length > 0 && (
        <ul className={awardList}>
          {awards.map((item) => (
            <li key={item.slug} className={award}>
              <TrophyIcon aria-hidden className={trophy} />
              <span className={strong}>{item.title}</span>
            </li>
          ))}
        </ul>
      )}

      {project.highlight && <p className={highlight}>{project.highlight}</p>}

      <div className={foot}>
        <ul className={stackList}>
          {shown.map((item) => {
            const selected = selectedStack.includes(item);
            const tech = TECH_BY_NAME[item];
            const badge = (
              <Badge
                variant={tech === undefined ? 'outline' : 'secondary'}
                tone={tech === undefined ? undefined : 'brand'}
                css={selected ? { ...micro, ...ring } : micro}
                style={tech === undefined ? undefined : brand(tech.hex)}
              >
                {tech?.icon && <TechIcon icon={tech.icon} />}
                {item}
              </Badge>
            );

            return (
              <li key={item} className={stackItem}>
                {onToggleStack ? (
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onToggleStack(item)}
                    className={toggle}
                  >
                    {badge}
                  </button>
                ) : (
                  badge
                )}
              </li>
            );
          })}
          {overflow > 0 && <li className={overflowCount}>+{overflow}</li>}
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
