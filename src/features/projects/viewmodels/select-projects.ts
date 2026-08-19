import { yearMonthKey } from '@/common/lib';

import {
  PROJECT_LINK_KINDS,
  type Project,
  type ProjectDomain,
  type ProjectLinkKind,
} from '../models';

import type { ProjectFilters } from './use-project-filters';

export function filterByDomain(
  projects: readonly Project[],
  domain: ProjectDomain | null,
): Project[] {
  return domain === null ? [...projects] : projects.filter((project) => project.domain === domain);
}

function matchesQuery(project: Project, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === '') return true;

  const haystack = [project.title, project.summary, project.highlight ?? '', ...project.stack]
    .join(' ')
    .toLowerCase();

  return haystack.includes(needle);
}

export function filterProjects(projects: readonly Project[], filters: ProjectFilters): Project[] {
  return filterByDomain(projects, filters.domain)
    .filter((project) =>
      filters.stack.every((item) => (project.stack as readonly string[]).includes(item)),
    )
    .filter((project) => matchesQuery(project, filters.query));
}

export function countByStack(projects: readonly Project[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const item of project.stack) counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return [...counts].sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b));
}

export function sortProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => yearMonthKey(b.start) - yearMonthKey(a.start));
}

export function countByDomain(
  projects: readonly Project[],
): Partial<Record<ProjectDomain, number>> {
  const counts: Partial<Record<ProjectDomain, number>> = {};
  for (const project of projects) {
    counts[project.domain] = (counts[project.domain] ?? 0) + 1;
  }
  return counts;
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
