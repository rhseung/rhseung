import { TrophyIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, DetailHeader, ExternalLink, SiteDock, buttonVariants } from '@/common/components';
import { formatYearMonth, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import type { Award } from '@/features/career';

import { PROJECT_LINK_ICON, projectLinks, useProjectLabels, type Project } from '../../viewmodels';

export function ProjectDetailPage({
  lang,
  project,
  awards = [],
  altHref,
  children,
}: ProjectDetailPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatYearMonth(project.start)} – ${formatYearMonth(project.end)}`
    : `${formatYearMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const links = projectLinks(project);

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-4">
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/projects')}
          backLabel={t(($) => $.detail.back)}
        />

        <main className="flex flex-col gap-8 pb-12">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <Badge variant="outline">{label.status[project.status]}</Badge>
              <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
            </div>

            <h1 data-vt-title={project.slug} className="text-3xl font-semibold tracking-tight">
              {project.title}
            </h1>
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
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    >
                      <Icon data-icon="inline-start" />
                      {label.link[kind]}
                    </ExternalLink>
                  );
                })}
              </div>
            )}
            {awards.length > 0 && (
              <ul className="flex flex-col gap-1">
                {awards.map((award) => (
                  <li key={award.slug} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                    <TrophyIcon aria-hidden className="text-primary size-4 shrink-0" />
                    <span className="font-medium">{award.title}</span>
                    {award.issuer && <span className="text-muted-foreground">{award.issuer}</span>}
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {formatYearMonth(award.date)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
        </main>
      </div>

      <SiteDock lang={lang} current="projects" altHref={altHref} />
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    lang: Language;
    project: Project;
    awards?: Award[];
    altHref?: string;
    children: React.ReactNode;
  };
}
