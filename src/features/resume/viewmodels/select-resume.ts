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

export function sortAwards(awards: readonly AwardSummary[]): AwardSummary[] {
  return [...awards].sort((a, b) => b.date.localeCompare(a.date));
}

export function sortSkillGroups(groups: readonly SkillGroup[]): SkillGroup[] {
  return [...groups].sort((a, b) => a.order - b.order || a.group.localeCompare(b.group));
}
