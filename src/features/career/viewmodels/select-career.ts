import { groupBy, orderBy, uniq } from 'es-toolkit';

import { byStartDesc, yearMonthKey } from '@/common/lib';

import type { Award, CareerEntry, SkillGroup } from '../models';

export function sortCareer(entries: readonly CareerEntry[]): CareerEntry[] {
  return [...entries].sort(byStartDesc);
}

export function sortAwards(awards: readonly Award[]): Award[] {
  return orderBy([...awards], [(award) => yearMonthKey(award.date), 'title'], ['desc', 'asc']);
}

export function groupAwardsByYear(awards: readonly Award[]): [year: number, awards: Award[]][] {
  const sorted = sortAwards(awards);
  const byYear = groupBy(sorted, (award) => award.date.year);

  return uniq(sorted.map((award) => award.date.year)).map((year) => [year, byYear[year] ?? []]);
}

export function sortSkillGroups(groups: readonly SkillGroup[]): SkillGroup[] {
  return [...groups].sort((a, b) => a.order - b.order);
}
