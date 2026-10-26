import { countBy, groupBy, uniq } from 'es-toolkit';

import { byStartDesc, isLanguage, LANGUAGES, type Language } from '@/common/lib';

import {
  PROJECT_CATEGORIES,
  PROJECT_LINK_KINDS,
  type Project,
  type ProjectCategory,
  type ProjectLinkKind,
} from '../model';

import type { ProjectFilters } from '../hooks';

function matchesQuery(project: Project, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === '') return true;

  const haystack = [project.title, project.summary, ...project.stack].join(' ').toLowerCase();

  return haystack.includes(needle);
}

export function filterProjects(projects: readonly Project[], filters: ProjectFilters): Project[] {
  return projects
    .filter((project) => filters.category === null || project.category === filters.category)
    .filter((project) => matchesQuery(project, filters.query));
}

export function countByCategory(projects: readonly Project[]): Record<ProjectCategory, number> {
  const counts = countBy(projects, (project) => project.category);

  return Object.fromEntries(
    PROJECT_CATEGORIES.map((category) => [category, counts[category] ?? 0]),
  ) as Record<ProjectCategory, number>;
}

export function sortProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort(byStartDesc);
}

export function groupProjectsByYear(
  projects: readonly Project[],
): [year: number, projects: Project[]][] {
  const sorted = sortProjects(projects);
  const byYear = groupBy(sorted, (project) => project.start.year);

  return uniq(sorted.map((project) => project.start.year)).map((year) => [
    year,
    byYear[year] ?? [],
  ]);
}

export function projectHref(
  project: Project,
  detailHref: string,
): { href: string; external: boolean } | null {
  if (project.hasDetail) return { href: detailHref, external: false };

  const fallback =
    project.links?.repo ?? project.links?.demo ?? project.links?.package ?? project.links?.post;
  return fallback ? { href: fallback, external: true } : null;
}

export function projectLinks(project: Project): { kind: ProjectLinkKind; href: string }[] {
  return PROJECT_LINK_KINDS.flatMap((kind) => {
    const href = project.links?.[kind];
    return href ? [{ kind, href }] : [];
  });
}

export function detailPaths<E extends { id: string }>(
  entries: readonly E[],
): { slug: string; lang: Language; entry: E; available: Language[] }[] {
  return entries.map((entry) => {
    const separator = entry.id.lastIndexOf('/');
    const slug = entry.id.slice(0, separator);
    const lang = entry.id.slice(separator + 1);
    if (!isLanguage(lang)) throw new Error(`${entry.id} 가 <slug>/<lang> 모양이 아닙니다`);

    const available = LANGUAGES.filter((candidate) =>
      entries.some((other) => other.id === `${slug}/${candidate}`),
    );

    return { slug, lang, entry, available };
  });
}

export function detailSlugs(entries: readonly { id: string }[], lang: Language): Set<string> {
  return new Set(
    detailPaths(entries)
      .filter((entry) => entry.lang === lang)
      .map((entry) => entry.slug),
  );
}
