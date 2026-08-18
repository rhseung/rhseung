import { yearMonthKey } from '@/common/lib';

import type { Award, CareerEntry, SkillGroup } from '../models';

export function sortCareer(entries: readonly CareerEntry[]): CareerEntry[] {
  return [...entries].sort((a, b) => yearMonthKey(b.start) - yearMonthKey(a.start));
}

export function sortAwards(awards: readonly Award[]): Award[] {
  return [...awards].sort(
    (a, b) => yearMonthKey(b.date) - yearMonthKey(a.date) || a.title.localeCompare(b.title),
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
