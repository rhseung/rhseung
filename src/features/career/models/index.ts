import { localize, type Language } from '@/common/lib';
import { SKILL_GROUPS } from '@/content/skills';

import type { Award, AwardItem } from './award';
import type { CareerEntry, CareerItem } from './career';
import type { SkillGroup, SkillGroupItem } from './skill-group';

export { defineAward, defineCareer } from './define';
export type { Award } from './award';
export type { CareerEntry } from './career';
export type { SkillGroup } from './skill-group';

function collect<T>(modules: Record<string, { default: T }>): T[] {
  return Object.keys(modules)
    .sort()
    .map((path) => modules[path].default);
}

const experience = collect<CareerItem>(
  import.meta.glob('@/content/experience/*/index.ts', { eager: true }),
);
const education = collect<CareerItem>(
  import.meta.glob('@/content/education/*/index.ts', { eager: true }),
);
const awards = collect<AwardItem>(import.meta.glob('@/content/awards/*.ts', { eager: true }));
const skillGroups: SkillGroupItem[] = [...SKILL_GROUPS];

export function experienceOf(lang: Language): CareerEntry[] {
  return experience.map((item) => localize(item, lang));
}

export function educationOf(lang: Language): CareerEntry[] {
  return education.map((item) => localize(item, lang));
}

export function awardsOf(lang: Language): Award[] {
  return awards.map((item) => localize(item, lang));
}

export function skillGroupsOf(lang: Language): SkillGroup[] {
  return skillGroups.map((item) => localize(item, lang));
}

export const CAREER_ITEMS = { experience, education, awards, skillGroups };
