import { useTranslation } from 'react-i18next';

import {
  Button,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  SiteDock,
} from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import {
  countByDomain,
  filterByDomain,
  sortProjects,
  useDomainFilter,
  useProjectLabels,
  type Project,
} from '../../viewmodels';
import { ProjectCard } from '../components';

export function ProjectsPage({ lang, projects }: ProjectsPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const { domain, setDomain, domains } = useDomainFilter();

  const counts = countByDomain(projects);
  const visible = sortProjects(filterByDomain(projects, domain), { pinnedFirst: domain === null });

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>
          <p className="text-muted-foreground text-sm">{t(($) => $.page.description)}</p>
        </div>

        <div className="flex flex-wrap gap-1" role="group" aria-label={t(($) => $.filter.label)}>
          <Button
            size="sm"
            variant={domain === null ? 'secondary' : 'ghost'}
            aria-pressed={domain === null}
            onClick={() => setDomain(null)}
          >
            {t(($) => $.filter.all)}
            <span className="text-muted-foreground ml-1.5 tabular-nums">{projects.length}</span>
          </Button>

          {domains.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={domain === value ? 'secondary' : 'ghost'}
              aria-pressed={domain === value}
              disabled={!counts[value]}
              onClick={() => setDomain(value)}
            >
              {label.domain[value]}
              <span className="text-muted-foreground ml-1.5 tabular-nums">
                {counts[value] ?? 0}
              </span>
            </Button>
          ))}
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-4">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard
                  project={project}
                  detailHref={localeHref(lang, `/projects/${project.slug}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <SiteDock
        lang={lang}
        current="projects"
        altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/projects')}
      />
    </div>
  );
}

export declare namespace ProjectsPage {
  export type Props = {
    lang: Language;
    projects: Project[];
  };
}
