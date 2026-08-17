import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, SiteHeader, buttonVariants } from '@/common/components';
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
    { key: 'post', href: project.links?.post, label: t(($) => $.links.post) },
    { key: 'paper', href: project.links?.paper, label: t(($) => $.links.paper) },
  ].filter((link) => link.href !== undefined);

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
            <Badge variant="outline">{label.domain[project.domain]}</Badge>
            <Badge variant={project.status === 'archived' ? 'ghost' : 'secondary'}>
              {label.status[project.status]}
            </Badge>
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
                <Badge variant="ghost">{item}</Badge>
              </li>
            ))}
          </ul>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* MDX 본문. 여기 안에 인터랙티브 아일랜드를 넣으면 컨텍스트가 끊긴다. */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
      </main>
    </div>
  );
}

export declare namespace ProjectDetailPage {
  export type Props = {
    lang: Language;
    project: ProjectSummary;
    /** 없으면 헤더의 언어 버튼이 사라진다. */
    altHref?: string;
    children: React.ReactNode;
  };
}
