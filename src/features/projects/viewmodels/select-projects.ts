import { isLanguage, type Language } from '@/common/lib';

import type { Project, ProjectDomain, ProjectSummary } from '../models';

/**
 * collection id는 `<lang>/<slug>` 형태여야 한다. 캐스트로 넘기면 잘못 놓인 파일이
 * 조용히 `lang: "misc"` 같은 라우트를 만든다 — 여기서 빌드를 세운다.
 */
export function parseProjectId(id: string): { lang: Language; slug: string } {
  const [dir, slug, ...rest] = id.split('/');

  if (!isLanguage(dir) || slug === undefined || slug === '' || rest.length > 0) {
    throw new Error(`프로젝트는 src/content/projects/<lang>/<slug>.mdx 여야 합니다: ${id}`);
  }

  return { lang: dir, slug };
}

/** `astro:content`를 import하지 않으려고 구조만 받는다 — `CollectionEntry`가 들어맞는다. */
export function toProjectSummary(entry: { id: string; data: Project }): ProjectSummary {
  return { ...entry.data, slug: parseProjectId(entry.id).slug };
}

export function filterByDomain(
  projects: readonly ProjectSummary[],
  domain: ProjectDomain | null,
): ProjectSummary[] {
  return domain === null ? [...projects] : projects.filter((project) => project.domain === domain);
}

/**
 * 필터가 걸린 목록에서는 pinned 가중치를 뺀다 — 좁혀서 보는 사람에게 그 안에서까지
 * 앞세우면 순서를 설명할 방법이 없다. `start`는 `YYYY-MM`이라 문자열 비교가 곧 시간순이다.
 */
export function sortProjects(
  projects: readonly ProjectSummary[],
  { pinnedFirst }: { pinnedFirst: boolean },
): ProjectSummary[] {
  return [...projects].sort((a, b) => {
    if (pinnedFirst && a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.start.localeCompare(a.start);
  });
}

/** 홈에 세울 것. */
export function pickPinned(projects: readonly ProjectSummary[], count: number): ProjectSummary[] {
  return sortProjects(projects, { pinnedFirst: true })
    .filter((project) => project.pinned)
    .slice(0, count);
}

/** 필터 버튼 배지에 쓴다. */
export function countByDomain(
  projects: readonly ProjectSummary[],
): Partial<Record<ProjectDomain, number>> {
  const counts: Partial<Record<ProjectDomain, number>> = {};
  for (const project of projects) {
    counts[project.domain] = (counts[project.domain] ?? 0) + 1;
  }
  return counts;
}
