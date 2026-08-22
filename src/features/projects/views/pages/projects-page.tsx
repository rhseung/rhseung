import { useId, useState } from 'react';

import { CaretDownIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
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
  ToggleGroup,
  ToggleGroupItem,
} from '@/common/components';
import { localeHref, tone, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import type { Award } from '@/features/career';

import {
  countByDomain,
  countByStack,
  filterByDomain,
  filterProjects,
  PROJECT_DOMAIN_TONE,
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

  const [expanded, setExpanded] = useState(false);
  const domainLabelId = useId();
  const stackLabelId = useId();

  const counts = countByDomain(projects);
  const visible = sortProjects(filterProjects(projects, filters));

  const stacks = countByStack(filterByDomain(projects, filters.domain));
  const ordered = [
    ...filters.stack,
    ...stacks.map(([item]) => item).filter((item) => !filters.stack.includes(item)),
  ];
  const shown = Math.max(STACK_CHIPS, filters.stack.length);
  const chips = expanded ? ordered : ordered.slice(0, shown);
  const hidden = ordered.length - chips.length;

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>

        <div className="border-border flex flex-col gap-4 rounded-xl border p-4">
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

          <div className="flex flex-col gap-1.5">
            <span id={domainLabelId} className="text-muted-foreground text-xs">
              {t(($) => $.filter.label)}
            </span>

            <ToggleGroup
              size="sm"
              aria-labelledby={domainLabelId}
              value={filters.domain ? [filters.domain] : []}
              onValueChange={([next]) => setDomain((next as ProjectDomain | undefined) ?? null)}
            >
              {domains.map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  disabled={!counts[value]}
                  // 카드의 도메인 뱃지와 같은 색이다. 고른 것과 카드가 눈으로 이어져야 한다.
                  className={cn(
                    filters.domain === value && tone({ tone: PROJECT_DOMAIN_TONE[value] }),
                  )}
                >
                  {label.domain[value]}
                  <span className="ml-1.5 tabular-nums opacity-60">{counts[value] ?? 0}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-1.5">
            <span id={stackLabelId} className="text-muted-foreground text-xs">
              {t(($) => $.filter.stack)}
            </span>

            <div className="flex flex-wrap items-center gap-1">
              <ToggleGroup
                multiple
                size="sm"
                variant="outline"
                className="flex-wrap"
                aria-labelledby={stackLabelId}
                value={[...filters.stack]}
                onValueChange={(next) => setStack(next)}
              >
                {chips.map((item) => (
                  <ToggleGroupItem key={item} value={item}>
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              {(hidden > 0 || expanded) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="text-muted-foreground"
                >
                  {expanded ? t(($) => $.filter.less) : t(($) => $.filter.more, { count: hidden })}
                  <CaretDownIcon
                    aria-hidden
                    data-icon="inline-end"
                    className={cn('transition-transform', expanded && 'rotate-180')}
                  />
                </Button>
              )}
            </div>
          </div>

          <div className="border-border text-muted-foreground flex items-center gap-2 border-t pt-3 text-xs">
            <span className="tabular-nums">
              {t(($) => $.filter.results, { count: visible.length })}
            </span>

            {active && (
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="text-muted-foreground ml-auto"
              >
                {t(($) => $.filter.reset)}
              </Button>
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
          <ul className="divide-border -mx-3 divide-y">
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
