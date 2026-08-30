import { TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, ExternalLink } from '@/common/components';
import { brand, formatYearMonth, tone } from '@/common/lib';
import { cn } from '@/common/utils';
import { TECH_BY_NAME, TechIcon, type Award } from '@/features/career';

import {
  PROJECT_LINK_ICON,
  projectHref,
  projectLinks,
  useProjectLabels,
  type Project,
} from '../../../viewmodels';

const STACK_SHOWN = 6;

export function ProjectCard({
  project,
  detailHref,
  awards = [],
  selectedStack = [],
  onToggleStack,
}: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatYearMonth(project.start)} – ${formatYearMonth(project.end)}`
    : `${formatYearMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const target = projectHref(project, detailHref);
  const ordered = [
    ...project.stack.filter((item) => selectedStack.includes(item)),
    ...project.stack.filter((item) => !selectedStack.includes(item)),
  ];
  const stack = ordered.slice(0, STACK_SHOWN);
  const overflow = project.stack.length - stack.length;

  const links = projectLinks(project);

  return (
    <article className="hover:bg-muted/40 flex flex-col gap-2 rounded-lg px-3 py-4 transition-colors">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 data-vt-title={project.slug} className="text-base font-semibold tracking-tight">
          {target === null && project.title}
          {target?.external === false && (
            <a href={target.href} className="hover:underline">
              {project.title}
            </a>
          )}
          {target?.external === true && (
            <ExternalLink href={target.href} className="hover:underline">
              {project.title}
            </ExternalLink>
          )}
        </h2>
        <span className="text-muted-foreground ml-auto self-center text-xs tabular-nums">
          {period}
        </span>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>

      {awards.length > 0 && (
        <ul className="flex flex-col gap-0.5">
          {awards.map((award) => (
            <li key={award.slug} className="flex items-center gap-1.5 text-xs">
              <TrophyIcon aria-hidden className="text-primary size-3.5 shrink-0" />
              <span className="font-medium">{award.title}</span>
            </li>
          ))}
        </ul>
      )}

      {project.highlight && (
        <p className="border-border border-l-2 pl-3 text-xs font-medium">{project.highlight}</p>
      )}

      <div className="mt-0.5 flex flex-col gap-2">
        <ul className="flex flex-wrap gap-1">
          {stack.map((item) => {
            const selected = selectedStack.includes(item);
            const tech = TECH_BY_NAME[item];
            const badge = (
              <Badge
                variant={tech === undefined ? 'outline' : 'secondary'}
                className={cn(
                  'text-[0.7rem]',
                  tech !== undefined && tone({ tone: 'brand' }),
                  selected && 'ring-foreground/40 ring-2',
                )}
                style={tech === undefined ? undefined : brand(tech.hex)}
              >
                {tech?.icon && <TechIcon icon={tech.icon} />}
                {item}
              </Badge>
            );

            return (
              // `flex` 인 이유는 `skill-groups` 에 있다 - 아이콘 유무로 baseline 이 어긋난다.
              <li key={item} className="flex">
                {onToggleStack ? (
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onToggleStack(item)}
                    className="cursor-pointer"
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
            <li className="text-muted-foreground self-center text-[0.7rem]">+{overflow}</li>
          )}
        </ul>

        {links.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {links.map(({ kind, href }) => {
              const Icon = PROJECT_LINK_ICON[kind];

              return (
                <li key={kind}>
                  <ExternalLink
                    href={href}
                    className="text-muted-foreground hover:text-foreground text-xs hover:underline"
                  >
                    <Icon aria-hidden className="size-3.5 shrink-0" />
                    {label.link[kind]}
                  </ExternalLink>
                </li>
              );
            })}
          </ul>
        )}
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
