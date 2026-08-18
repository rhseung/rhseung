import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  SiteDock,
  ToggleGroup,
  ToggleGroupItem,
} from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import type { Award } from '@/features/career';

import {
  countByDomain,
  countByStack,
  filterByDomain,
  filterProjects,
  sortProjects,
  useProjectFilters,
  useProjectLabels,
  type Project,
  type ProjectDomain,
} from '../../viewmodels';
import { ProjectCard } from '../components';

const STACK_CHIPS = 10;

export function ProjectsPage({ lang, projects, awards = [] }: ProjectsPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const { filters, setDomain, setStack, toggleStack, setQuery, reset, active, domains } =
    useProjectFilters();

  const counts = countByDomain(projects);
  const visible = sortProjects(filterProjects(projects, filters), {
    pinnedFirst: !active,
  });

  const stacks = countByStack(filterByDomain(projects, filters.domain));
  const chips = [
    ...filters.stack,
    ...stacks.map(([item]) => item).filter((item) => !filters.stack.includes(item)),
  ].slice(0, Math.max(STACK_CHIPS, filters.stack.length));

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>
          <p className="text-muted-foreground text-sm">{t(($) => $.page.description)}</p>
        </div>

        <div className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <MagnifyingGlassIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              value={filters.query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(($) => $.search.placeholder)}
              aria-label={t(($) => $.search.label)}
              // 브라우저가 붙이는 취소 버튼은 OS 마다 얼굴이 다르다. 우리 걸 쓴다.
              className="[&::-webkit-search-cancel-button]:appearance-none"
            />

            {filters.query !== '' && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={t(($) => $.search.clear)}
                  onClick={() => setQuery('')}
                >
                  <XIcon aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <ToggleGroup
            size="sm"
            aria-label={t(($) => $.filter.label)}
            value={filters.domain ? [filters.domain] : []}
            onValueChange={([next]) => setDomain((next as ProjectDomain | undefined) ?? null)}
          >
            {domains.map((value) => (
              <ToggleGroupItem key={value} value={value} disabled={!counts[value]}>
                {label.domain[value]}
                <span className="text-muted-foreground ml-1.5 tabular-nums">
                  {counts[value] ?? 0}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <ToggleGroup
            multiple
            size="sm"
            variant="outline"
            className="flex-wrap"
            aria-label={t(($) => $.filter.stack)}
            value={[...filters.stack]}
            onValueChange={(next) => setStack(next)}
          >
            {chips.map((item) => (
              <ToggleGroupItem key={item} value={item}>
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span className="tabular-nums">
              {t(($) => $.filter.results, { count: visible.length })}
            </span>

            {active && (
              <button type="button" onClick={reset} className="hover:text-foreground underline">
                {t(($) => $.filter.reset)}
              </button>
            )}
          </div>
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard
                  project={project}
                  detailHref={localeHref(lang, `/projects/${project.slug}`)}
                  awards={awards.filter((award) => project.awards?.includes(award.slug))}
                  selectedStack={filters.stack}
                  onToggleStack={toggleStack}
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
    awards?: Award[];
  };
}
