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
import { filterProjects, groupProjectsByYear, PROJECT_CATEGORIES, type Project } from '../lib';

import { ProjectCard } from '.';

const ALL = 'all';

const search = css({ '&::-webkit-search-cancel-button': { appearance: 'none' } });

export function ProjectsPage({ projects, awards = [] }: ProjectsPage.Props) {
  const lang = useLanguage();
  const { t } = useTranslation('projects');
  const label = useProjectLabels();
  const { filters, setCategory, setQuery } = useProjectFilters();
  const shell = page({ spacing: 'tight' });

  const years = groupProjectsByYear(filterProjects(projects, filters));
  const careerHref = localeHref(lang, '/[lang]/career');

  const tabs = [
    { value: ALL, text: t(($) => $.filter.all) },
    ...PROJECT_CATEGORIES.map((category) => ({
      value: category,
      text: label.category[category],
    })),
  ];

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
              className={css({ flexWrap: 'wrap', gap: '4' })}
            >
              {tabs.map((tab) => (
                <ToggleGroupItem
                  key={tab.value}
                  value={tab.value}
                  css={{
                    h: '8',
                    minW: '0',
                    px: '0',
                    color: 'text.muted',
                    fontWeight: 'normal',
                    _hover: { bg: 'transparent', color: 'text' },
                    _pressed: { bg: 'transparent', color: 'text', fontWeight: 'semibold' },
                  }}
                >
                  {tab.text}
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
                className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}
              >
                <h2
                  id={`projects-${year}`}
                  className={css({ color: 'text.muted', textStyle: 'sm', fontWeight: 'medium' })}
                >
                  {year}
                </h2>

                <ul className={css({ divideY: '1px', divideColor: 'line' })}>
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
