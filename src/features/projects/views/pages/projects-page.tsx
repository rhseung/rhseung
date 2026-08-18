import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Button,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  SiteDock,
} from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import {
  countByDomain,
  countByStack,
  filterByDomain,
  filterProjects,
  sortProjects,
  useProjectFilters,
  useProjectLabels,
  type Project,
} from '../../viewmodels';
import { ProjectCard } from '../components';

/** 다 보이면 칩이 아니라 태그 클라우드가 된다. */
const STACK_CHIPS = 10;

export function ProjectsPage({ lang, projects }: ProjectsPage.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const { filters, setDomain, toggleStack, setQuery, reset, active, domains } = useProjectFilters();

  const counts = countByDomain(projects);
  const visible = sortProjects(filterProjects(projects, filters), {
    pinnedFirst: !active,
  });

  // 지금 고른 분야 안에서만 센다 — 눌러도 0건이 되는 칩이 안 나오게.
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

          <div className="flex flex-wrap gap-1" role="group" aria-label={t(($) => $.filter.label)}>
            <Button
              size="sm"
              variant={filters.domain === null ? 'secondary' : 'ghost'}
              aria-pressed={filters.domain === null}
              onClick={() => setDomain(null)}
            >
              {t(($) => $.filter.all)}
              <span className="text-muted-foreground ml-1.5 tabular-nums">{projects.length}</span>
            </Button>

            {domains.map((value) => (
              <Button
                key={value}
                size="sm"
                variant={filters.domain === value ? 'secondary' : 'ghost'}
                aria-pressed={filters.domain === value}
                disabled={!counts[value]}
                onClick={() => setDomain(filters.domain === value ? null : value)}
              >
                {label.domain[value]}
                <span className="text-muted-foreground ml-1.5 tabular-nums">
                  {counts[value] ?? 0}
                </span>
              </Button>
            ))}
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label={t(($) => $.filter.stack)}>
            {chips.map((item) => {
              const selected = filters.stack.includes(item);

              return (
                <li key={item}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleStack(item)}
                    className="cursor-pointer"
                  >
                    <Badge
                      variant={selected ? 'secondary' : 'outline'}
                      className={cn('gap-1', selected && 'pr-1.5')}
                    >
                      {item}
                      {selected && <XIcon aria-hidden className="size-3" />}
                    </Badge>
                  </button>
                </li>
              );
            })}
          </ul>

          {active && (
            <div className="text-muted-foreground flex items-center gap-3 text-xs">
              <span className="tabular-nums">
                {t(($) => $.filter.results, { count: visible.length })}
              </span>
              <button type="button" onClick={reset} className="hover:text-foreground underline">
                {t(($) => $.filter.reset)}
              </button>
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {visible.map((project) => (
              <li key={project.slug} className="flex">
                <ProjectCard
                  project={project}
                  detailHref={localeHref(lang, `/projects/${project.slug}`)}
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
  };
}
