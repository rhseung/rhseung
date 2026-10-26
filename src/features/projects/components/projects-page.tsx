import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  ToggleGroup,
  ToggleGroupItem,
} from '@/common/components';
import { useLanguage } from '@/common/hooks';
import { localeHref } from '@/common/lib';
import { page } from '@/common/styles';
import type { Award } from '@/features/career';

import { useProjectFilters, useProjectLabels } from '../hooks';
import {
  countByCategory,
  filterProjects,
  groupProjectsByYear,
  PROJECT_CATEGORIES,
  type Project,
} from '../lib';

import { ProjectCard } from '.';

const ALL = 'all';

const search = css({ '&::-webkit-search-cancel-button': { appearance: 'none' } });

export function ProjectsPage({ projects, awards = [] }: ProjectsPage.Props) {
  const lang = useLanguage();
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const { filters, setCategory, setQuery } = useProjectFilters();
  const shell = page({ spacing: 'tight' });

  const counts = countByCategory(projects);
  const years = groupProjectsByYear(filterProjects(projects, filters));
  const careerHref = localeHref(lang, '/[lang]/career');

  const tabs = [
    { value: ALL, text: t(($) => $.filter.all), total: projects.length },
    ...PROJECT_CATEGORIES.map((category) => ({
      value: category,
      text: label.category[category],
      total: counts[category],
    })),
  ].filter((tab) => tab.total > 0);

  return (
    <div className={shell.root}>
      <main className={shell.main}>
        <header className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
          <h1 className={css({ textStyle: 'heading.page' })}>{t(($) => $.page.title)}</h1>

          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '3',
            })}
          >
            <ToggleGroup
              aria-label={t(($) => $.filter.label)}
              value={[filters.category ?? ALL]}
              onValueChange={(next) => {
                const picked = PROJECT_CATEGORIES.find((category) => next.includes(category));
                setCategory(picked ?? null);
              }}
              className={css({
                flexWrap: 'wrap',
                gap: '1',
                rounded: 'xl',
                bg: 'surface.muted',
                p: '1',
              })}
            >
              {tabs.map((tab) => (
                <ToggleGroupItem
                  key={tab.value}
                  value={tab.value}
                  css={{
                    h: '9',
                    px: '3.5',
                    gap: '1.5',
                    color: 'text.body',
                    _hover: { bg: 'surface.raised/60' },
                    _pressed: { bg: 'surface.raised', color: 'text', boxShadow: 'ring' },
                  }}
                >
                  {tab.text}
                  <span
                    className={css({
                      color: 'text.muted',
                      fontVariantNumeric: 'tabular-nums',
                      textStyle: 'micro',
                    })}
                  >
                    {tab.total}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <InputGroup className={css({ w: 'full', sm: { w: '64' } })}>
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
          </div>
        </header>

        {years.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '10' })}>
            {years.map(([year, items]) => (
              <section
                key={year}
                aria-labelledby={`projects-${year}`}
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: '10',
                  rowGap: '1',
                  borderTopWidth: '[1px]',
                  borderTopStyle: 'solid',
                  borderTopColor: 'text',
                  pt: '4',
                })}
              >
                <h2
                  id={`projects-${year}`}
                  className={css({
                    flexShrink: 0,
                    w: '24',
                    fontFamily: 'mono',
                    textStyle: 'heading.section',
                    fontVariantNumeric: 'tabular-nums',
                  })}
                >
                  {year}
                </h2>

                <ul
                  className={css({
                    flexGrow: 999,
                    flexBasis: '[30rem]',
                    minW: '0',
                    divideY: '1px',
                    divideColor: 'line',
                    '& > li:first-child > article': { pt: '1' },
                  })}
                >
                  {items.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard
                        project={project}
                        detailHref={localeHref(lang, '/[lang]/projects/[slug]', {
                          slug: project.slug,
                        })}
                        careerHref={careerHref}
                        awards={awards.filter((award) => project.awards?.includes(award.slug))}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export declare namespace ProjectsPage {
  export type Props = {
    projects: Project[];
    awards?: Award[];
  };
}
