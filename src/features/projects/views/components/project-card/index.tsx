import {
  ArrowSquareOutIcon,
  FileTextIcon,
  GithubLogoIcon,
  PackageIcon,
  PlayIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, CardHeader, CardTitle, ExternalLink } from '@/common/components';

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

  const links = [
    { key: 'repo', href: project.links?.repo, label: t(($) => $.links.repo), Icon: GithubLogoIcon },
    { key: 'demo', href: project.links?.demo, label: t(($) => $.links.demo), Icon: PlayIcon },
    {
      key: 'package',
      href: project.links?.package,
      label: t(($) => $.links.package),
      Icon: PackageIcon,
    },
    { key: 'post', href: project.links?.post, label: t(($) => $.links.post), Icon: FileTextIcon },
    {
      key: 'paper',
      href: project.links?.paper,
      label: t(($) => $.links.paper),
      Icon: ArrowSquareOutIcon,
    },
  ].filter((link): link is typeof link & { href: string } => link.href !== undefined);

  return (
    <Card className="gap-3 py-5">
      <CardHeader className="gap-2 px-5">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary">{label.domain[project.domain]}</Badge>
          <Badge variant="outline">{label.status[project.status]}</Badge>
          <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
        </div>

        <CardTitle className="text-base">
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
              <Badge variant="outline">{item}</Badge>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links.map(({ key, href, label: linkLabel, Icon }) => (
              <li key={key}>
                <ExternalLink
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-xs hover:underline"
                >
                  <Icon aria-hidden className="size-3.5 shrink-0" />
                  {linkLabel}
                </ExternalLink>
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
    detailHref: string;
  };
}
