import {
  ArrowSquareOutIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  GithubLogoIcon,
  PlayIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/common/components';

import { projectHref, useProjectLabels, type ProjectSummary } from '../../../viewmodels';

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function ProjectCard({ project, detailHref }: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatMonth(project.start)} – ${formatMonth(project.end)}`
    : `${formatMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const target = projectHref(project, detailHref);

  // 카드가 프로젝트를 설명하는 주된 자리다. 링크도 여기서 다 걸어준다.
  const links = [
    { key: 'repo', href: project.links?.repo, label: t(($) => $.links.repo), Icon: GithubLogoIcon },
    { key: 'demo', href: project.links?.demo, label: t(($) => $.links.demo), Icon: PlayIcon },
    { key: 'post', href: project.links?.post, label: t(($) => $.links.post), Icon: FileTextIcon },
    {
      key: 'paper',
      href: project.links?.paper,
      label: t(($) => $.links.paper),
      Icon: ArrowSquareOutIcon,
    },
  ].filter((link) => link.href !== undefined);

  return (
    <Card className="gap-3 py-5">
      <CardHeader className="gap-2 px-5">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline">{label.domain[project.domain]}</Badge>
          <Badge variant={project.status === 'archived' ? 'ghost' : 'secondary'}>
            {label.status[project.status]}
          </Badge>
          <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
        </div>

        <CardTitle className="text-base">
          {target === null ? (
            project.title
          ) : (
            <a
              href={target.href}
              {...(target.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="group/title inline-flex items-center gap-1 hover:underline"
            >
              {project.title}
              {target.external && (
                <ArrowUpRightIcon aria-hidden className="text-muted-foreground size-3.5 shrink-0" />
              )}
            </a>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5">
        <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>

        {project.highlight && (
          <p className="border-border border-l-2 pl-3 text-sm font-medium">{project.highlight}</p>
        )}

        <ul className="flex flex-wrap gap-1">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge variant="ghost">{item}</Badge>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links.map(({ key, href, label: linkLabel, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs hover:underline"
                >
                  <Icon aria-hidden className="size-3.5 shrink-0" />
                  {linkLabel}
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export declare namespace ProjectCard {
  export type Props = {
    project: ProjectSummary;
    /** 본문이 있는 프로젝트만 여기로 간다. 없으면 카드가 저장소·데모로 바로 보낸다. */
    detailHref: string;
  };
}
