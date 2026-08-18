import { yearMonthKey } from '@/common/lib';

import type { Award, CareerEntry, SkillGroup } from '../models';

export function sortCareer(entries: readonly CareerEntry[]): CareerEntry[] {
  return [...entries].sort((a, b) => yearMonthKey(b.start) - yearMonthKey(a.start));
}

/**
 * 같은 해 안에서는 `order`가 작은 것이 먼저다. 안 주면 0이라 선언 순서로 서는데,
 * 그러면 참가한 대회가 수상보다 위에 오는 일이 생긴다.
 */
export function sortAwards(awards: readonly Award[]): Award[] {
  return [...awards].sort(
    (a, b) =>
      yearMonthKey(b.date) - yearMonthKey(a.date) ||
      a.order - b.order ||
      a.title.localeCompare(b.title),
  );
}

export function groupAwardsByYear(awards: readonly Award[]): [year: number, awards: Award[]][] {
  const byYear = new Map<number, Award[]>();

  for (const award of sortAwards(awards)) {
    byYear.set(award.date.year, [...(byYear.get(award.date.year) ?? []), award]);
  }

  return [...byYear.entries()];
}

export function sortSkillGroups(groups: readonly SkillGroup[]): SkillGroup[] {
  return [...groups].sort((a, b) => a.order - b.order || a.group.localeCompare(b.group));
}
