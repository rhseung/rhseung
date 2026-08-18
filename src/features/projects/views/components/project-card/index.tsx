import { useTranslation } from 'react-i18next';

import { Badge, ExternalLink } from '@/common/components';
import { cn } from '@/common/utils';

import {
  PROJECT_LINK_ICON,
  projectHref,
  projectLinks,
  useProjectLabels,
  type Project,
} from '../../../viewmodels';

const STACK_SHOWN = 4;

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function ProjectCard({
  project,
  detailHref,
  selectedStack = [],
  onToggleStack,
}: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatMonth(project.start)} – ${formatMonth(project.end)}`
    : `${formatMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const target = projectHref(project, detailHref);
  const ordered = [
    ...project.stack.filter((item) => selectedStack.includes(item)),
    ...project.stack.filter((item) => !selectedStack.includes(item)),
  ];
  const stack = ordered.slice(0, STACK_SHOWN);
  const overflow = project.stack.length - stack.length;

  const links = projectLinks(project);

  return (
    <article className="border-border bg-card/40 hover:border-foreground/20 flex h-full flex-col gap-3 rounded-xl border p-4 transition-colors">
      <div className="flex items-center gap-1.5">
        <Badge variant="secondary">{label.domain[project.domain]}</Badge>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-sm font-semibold tracking-tight">
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

        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {project.summary}
        </p>
      </div>

      {project.highlight && (
        <p className="border-border border-l-2 pl-3 text-xs font-medium">{project.highlight}</p>
      )}

      <ul className="mt-auto flex flex-wrap gap-1 pt-1">
        {stack.map((item) => {
          const selected = selectedStack.includes(item);
          const badge = (
            <Badge
              variant={selected ? 'secondary' : 'outline'}
              className={cn('text-[0.7rem]', onToggleStack && 'hover:border-foreground/30')}
            >
              {item}
            </Badge>
          );

          return (
            <li key={item}>
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
    </article>
  );
}

export declare namespace ProjectCard {
  export type Props = {
    project: Project;
    detailHref: string;
    selectedStack?: readonly string[];
    onToggleStack?: (item: string) => void;
  };
}
