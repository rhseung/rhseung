import { collectModules, localize, type Language } from '@/common/lib';
import { SKILL_GROUPS } from '@/content/skills';

import type { Award, AwardItem } from './award';
import type { CareerEntry, CareerItem } from './career';
import type { SkillGroup, SkillGroupItem } from './skill-group';

const experience = collectModules<CareerItem>(
  import.meta.glob('@/content/experience/*/index.ts', { eager: true }),
);
const education = collectModules<CareerItem>(
  import.meta.glob('@/content/education/*/index.ts', { eager: true }),
);
const awards = collectModules<AwardItem>(
  import.meta.glob('@/content/awards/*.ts', { eager: true }),
);
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
