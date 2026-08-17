import { isLanguage, type Language } from '@/common/lib';

import type { Award, AwardSummary, CareerEntry, CareerSummary, SkillGroup } from '../models';

/** collection id는 `<lang>/<slug>` 형태여야 한다. 캐스트로 넘기면 잘못 놓인 파일이 조용히 라우트를 만든다. */
export function parseEntryId(id: string): { lang: Language; slug: string } {
  const [dir, slug, ...rest] = id.split('/');

  if (!isLanguage(dir) || slug === undefined || slug === '' || rest.length > 0) {
    throw new Error(`<lang>/<slug>.mdx 여야 합니다: ${id}`);
  }

  return { lang: dir, slug };
}

function hasBody(body: string | undefined) {
  return (body ?? '').trim().length > 0;
}

export function toCareerSummary(entry: {
  id: string;
  data: CareerEntry;
  body?: string | undefined;
}): CareerSummary {
  return { ...entry.data, slug: parseEntryId(entry.id).slug, hasDetail: hasBody(entry.body) };
}

export function toAwardSummary(entry: {
  id: string;
  data: Award;
  body?: string | undefined;
}): AwardSummary {
  return { ...entry.data, slug: parseEntryId(entry.id).slug, hasDetail: hasBody(entry.body) };
}

export function toSkillGroup(entry: { id: string; data: SkillGroup }): SkillGroup {
  return entry.data;
}

/** `start`가 `YYYY-MM`이라 문자열 비교가 곧 시간순이다. */
export function sortCareer(entries: readonly CareerSummary[]): CareerSummary[] {
  return [...entries].sort((a, b) => b.start.localeCompare(a.start));
}

/**
 * 같은 해 안에서는 `order`가 작은 것이 먼저다. 안 주면 0이라 파일명 순서로 서는데,
 * 그러면 참가한 대회가 수상보다 위에 오는 일이 생긴다.
 */
export function sortAwards(awards: readonly AwardSummary[]): AwardSummary[] {
  return [...awards].sort(
    (a, b) => b.date.localeCompare(a.date) || a.order - b.order || a.title.localeCompare(b.title),
  );
}

/** 연도별로 묶는다. 최신 연도가 먼저. */
export function groupAwardsByYear(
  awards: readonly AwardSummary[],
): [year: string, awards: AwardSummary[]][] {
  const byYear = new Map<string, AwardSummary[]>();

  for (const award of sortAwards(awards)) {
    const year = award.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), award]);
  }

  return [...byYear.entries()];
}

export function sortSkillGroups(groups: readonly SkillGroup[]): SkillGroup[] {
  return [...groups].sort((a, b) => a.order - b.order || a.group.localeCompare(b.group));
}
