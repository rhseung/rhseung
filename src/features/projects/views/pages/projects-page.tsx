import { useId } from 'react';

import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
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
import { TECH_TONE, type Award } from '@/features/career';

import {
  countByStack,
  filterProjects,
  groupStacks,
  sortProjects,
  useProjectFilters,
  type Project,
} from '../../viewmodels';
import { ProjectCard } from '../components';

export function ProjectsPage({ lang, projects, awards = [] }: ProjectsPage.Props) {
  const { t } = useTranslation('projects');
  const { filters, setStack, toggleStack, setQuery, reset, active } = useProjectFilters();

  const groupId = useId();
  const visible = sortProjects(filterProjects(projects, filters));

  const stacks = countByStack(projects).map(([item]) => item);
  const groups = groupStacks(stacks, lang);

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
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

          <div className="flex flex-col gap-2.5">
            {groups.map((group) => {
              const labelId = `${groupId}-${group.slug}`;
              const selected = group.items.filter((item) => filters.stack.includes(item));

              return (
                <div key={group.slug} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <span
                    id={labelId}
                    className="text-muted-foreground shrink-0 pt-1.5 text-sm font-medium sm:w-32"
                  >
                    {group.label}
                  </span>

                  <ToggleGroup
                    multiple
                    size="sm"
                    variant="outline"
                    className="flex-wrap"
                    aria-labelledby={labelId}
                    value={selected}
                    onValueChange={(next) => {
                      const others = filters.stack.filter((item) => !group.items.includes(item));
                      setStack([...others, ...next]);
                    }}
                  >
                    {group.items.map((item) => (
                      <ToggleGroupItem
                        key={item}
                        value={item}
                        className={cn(
                          TECH_TONE[item] !== undefined && tone({ tone: TECH_TONE[item] }),
                          'aria-pressed:ring-foreground/40 aria-pressed:ring-2',
                        )}
                      >
                        {item}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              );
            })}
          </div>

          <div className="text-muted-foreground flex min-h-8 items-center gap-2 text-xs">
            <span className="tabular-nums">
              {t(($) => $.filter.results, { count: visible.length })}
            </span>

            {active && (
              <Button variant="ghost" size="sm" onClick={reset} className="ml-auto">
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
