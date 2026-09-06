import { useId } from 'react';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

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
  TechIcon,
} from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { brand, page, techTone } from '@/common/styles';
import { TECH_BY_NAME } from '@/content/skills';
import type { Award } from '@/features/career';

import {
  countByStack,
  filterProjects,
  groupStacks,
  sortProjects,
  useProjectFilters,
  type Project,
} from '../../viewmodels';
import { ProjectCard } from '../components';

const title = css({ textStyle: 'heading.page' });
const panel = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  rounded: 'xl',
  border: 'line',
  p: '4',
});
const search = css({ '&::-webkit-search-cancel-button': { appearance: 'none' } });
const groups = stack({ gap: '2.5' });
const group = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
  sm: { flexDirection: 'row', gap: '3' },
});
const groupLabel = css({
  flexShrink: 0,
  pt: '1.5',
  textStyle: 'sm',
  fontWeight: 'medium',
  color: 'text.muted',
  sm: { w: '32' },
});
const wrap = css({ flexWrap: 'wrap' });
const result = css({
  display: 'flex',
  minH: '8',
  alignItems: 'center',
  gap: '2',
  color: 'text.muted',
  textStyle: 'caption',
});
const count = css({ fontVariantNumeric: 'tabular-nums' });
const reset = css({ ml: 'auto' });
const list = css({ mx: '-3', divideY: '1px', divideColor: 'line' });

export function ProjectsPage({ lang, projects, awards = [] }: ProjectsPage.Props) {
  const { t } = useTranslation('projects');
  const {
    filters,
    setStack,
    toggleStack,
    setQuery,
    reset: resetFilters,
    active,
  } = useProjectFilters();
  const shell = page({ spacing: 'tight' });

  const groupId = useId();
  const visible = sortProjects(filterProjects(projects, filters));

  const stacks = countByStack(projects).map(([item]) => item);
  const stackGroups = groupStacks(stacks, lang);

  return (
    <div className={shell.root}>
      <main className={shell.main}>
        <h1 className={title}>{t(($) => $.page.title)}</h1>

        <div className={panel}>
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
              className={search}
            />

            {filters.query !== '' && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={t(($) => $.search.clear)}
                  onClick={() => setQuery('')}
                >
                  <XMarkIcon aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <div className={groups}>
            {stackGroups.map((stackGroup) => {
              const labelId = `${groupId}-${stackGroup.slug}`;
              const selected = stackGroup.items.filter((item) => filters.stack.includes(item));

              return (
                <div key={stackGroup.slug} className={group}>
                  <span id={labelId} className={groupLabel}>
                    {stackGroup.label}
                  </span>

                  <ToggleGroup
                    multiple
                    size="sm"
                    variant="outline"
                    className={wrap}
                    aria-labelledby={labelId}
                    value={selected}
                    onValueChange={(next) => {
                      const others = filters.stack.filter(
                        (item) => !stackGroup.items.includes(item),
                      );
                      setStack([...others, ...next]);
                    }}
                  >
                    {stackGroup.items.map((item) => (
                      <ToggleGroupItem
                        key={item}
                        value={item}
                        css={techTone}
                        style={brand(TECH_BY_NAME[item].hex)}
                      >
                        {TECH_BY_NAME[item].icon && <TechIcon icon={TECH_BY_NAME[item].icon} />}
                        {item}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              );
            })}
          </div>

          <div className={result}>
            <span className={count}>{t(($) => $.filter.results, { count: visible.length })}</span>

            {active && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className={reset}>
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
          <ul className={list}>
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard
                  project={project}
                  detailHref={localeHref(lang, '/[lang]/projects/[slug]', { slug: project.slug })}
                  awards={awards.filter((award) => project.awards?.includes(award.slug))}
                  selectedStack={filters.stack}
                  onToggleStack={toggleStack}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <SiteDock lang={lang} current="projects" route={{ to: '/[lang]/projects' }} />
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
