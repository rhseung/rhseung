import type { Project, ProjectDomain } from '../models';

export function filterByDomain(
  projects: readonly Project[],
  domain: ProjectDomain | null,
): Project[] {
  return domain === null ? [...projects] : projects.filter((project) => project.domain === domain);
}

/**
 * 필터가 걸린 목록에서는 pinned 가중치를 뺀다 — 좁혀서 보는 사람에게 그 안에서까지
 * 앞세우면 순서를 설명할 방법이 없다. `start`는 `YYYY-MM`이라 문자열 비교가 곧 시간순이다.
 */
export function sortProjects(
  projects: readonly Project[],
  { pinnedFirst }: { pinnedFirst: boolean },
): Project[] {
  return [...projects].sort((a, b) => {
    if (pinnedFirst && (a.pinned ?? false) !== (b.pinned ?? false)) return a.pinned ? -1 : 1;
    return b.start.localeCompare(a.start);
  });
}

/** 홈에 세울 것. */
export function pickPinned(projects: readonly Project[], count: number): Project[] {
  return sortProjects(projects, { pinnedFirst: true })
    .filter((project) => project.pinned)
    .slice(0, count);
}

/** 필터 버튼 배지에 쓴다. */
export function countByDomain(
  projects: readonly Project[],
): Partial<Record<ProjectDomain, number>> {
  const counts: Partial<Record<ProjectDomain, number>> = {};
  for (const project of projects) {
    counts[project.domain] = (counts[project.domain] ?? 0) + 1;
  }
  return counts;
}

/** 카드가 어디로 보낼지. 본문이 있으면 상세, 없으면 저장소·데모로 바로 나간다. */
export function projectHref(
  project: Project,
  detailHref: string,
): { href: string; external: boolean } | null {
  if (project.hasDetail) return { href: detailHref, external: false };

  const fallback =
    project.links?.repo ?? project.links?.demo ?? project.links?.package ?? project.links?.post;
  return fallback ? { href: fallback, external: true } : null;
}
