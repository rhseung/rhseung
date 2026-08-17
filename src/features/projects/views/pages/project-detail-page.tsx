import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, ExternalLink, SiteFooter, SiteHeader, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { useProjectLabels, type ProjectSummary } from '../../viewmodels';

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function ProjectDetailPage({ lang, project, altHref, children }: ProjectDetailPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatMonth(project.start)} – ${formatMonth(project.end)}`
    : `${formatMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  const links = [
    { key: 'repo', href: project.links?.repo, label: t(($) => $.links.repo) },
    { key: 'demo', href: project.links?.demo, label: t(($) => $.links.demo) },
    { key: 'package', href: project.links?.package, label: t(($) => $.links.package) },
    { key: 'post', href: project.links?.post, label: t(($) => $.links.post) },
    { key: 'paper', href: project.links?.paper, label: t(($) => $.links.paper) },
  ].filter((link): link is typeof link & { href: string } => link.href !== undefined);

  return (
    <div className="bg-background min-h-dvh">
      <SiteHeader lang={lang} current="projects" altHref={altHref} />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
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
              {links.map((link) => (
                <ExternalLink
                  key={link.key}
                  href={link.href}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          )}
        </header>

        {/* MDX 본문. 여기 안에 인터랙티브 아일랜드를 넣으면 컨텍스트가 끊긴다. */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    lang: Language;
    project: ProjectSummary;
    altHref?: string;
    children: React.ReactNode;
  };
}
