import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, ExternalLink, SiteDock, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { PROJECT_LINK_ICON, projectLinks, useProjectLabels, type Project } from '../../viewmodels';

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function ProjectDetailPage({ lang, project, altHref, children }: ProjectDetailPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatMonth(project.start)} – ${formatMonth(project.end)}`
    : `${formatMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const links = projectLinks(project);

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <a
          href={localeHref(lang, '/projects')}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 self-start')}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          {t(($) => $.detail.back)}
        </a>

        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary">{label.domain[project.domain]}</Badge>
            <Badge variant="outline">{label.status[project.status]}</Badge>
            <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground">{project.summary}</p>

          {project.highlight && (
            <p className="border-border border-l-2 pl-3 font-medium">{project.highlight}</p>
          )}

          <ul className="flex flex-wrap gap-1">
            {project.stack.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map(({ kind, href }) => {
                const Icon = PROJECT_LINK_ICON[kind];

                return (
                  <ExternalLink
                    key={kind}
                    href={href}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    <Icon data-icon="inline-start" />
                    {label.link[kind]}
                  </ExternalLink>
                );
              })}
            </div>
          )}
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
      </main>

      <SiteDock lang={lang} current="projects" altHref={altHref} />
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    lang: Language;
    project: Project;
    altHref?: string;
    children: React.ReactNode;
  };
}
