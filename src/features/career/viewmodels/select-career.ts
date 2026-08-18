import type { Award, CareerEntry, SkillGroup } from '../models';

/** `start`가 `YYYY-MM`이라 문자열 비교가 곧 시간순이다. */
export function sortCareer(entries: readonly CareerEntry[]): CareerEntry[] {
  return [...entries].sort((a, b) => b.start.localeCompare(a.start));
}

/**
 * 같은 해 안에서는 `order`가 작은 것이 먼저다. 안 주면 0이라 선언 순서로 서는데,
 * 그러면 참가한 대회가 수상보다 위에 오는 일이 생긴다.
 */
export function sortAwards(awards: readonly Award[]): Award[] {
  return [...awards].sort(
    (a, b) => b.date.localeCompare(a.date) || a.order - b.order || a.title.localeCompare(b.title),
  );
}

export function groupAwardsByYear(awards: readonly Award[]): [year: string, awards: Award[]][] {
  const byYear = new Map<string, Award[]>();

  for (const award of sortAwards(awards)) {
    const year = award.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), award]);
  }

  return [...byYear.entries()];
}

export function sortSkillGroups(groups: readonly SkillGroup[]): SkillGroup[] {
  return [...groups].sort((a, b) => a.order - b.order || a.group.localeCompare(b.group));
}
