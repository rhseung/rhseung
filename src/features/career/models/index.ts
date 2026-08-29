import type { Language } from '@/common/lib';
import { SKILL_GROUPS } from '@/content/skills';
import type { TechSpec } from '@/content/skills';

import type {
  Award,
  AwardItem,
  CareerEntry,
  CareerItem,
  SkillGroup,
  SkillGroupItem,
} from './types';

export { defineAward, defineCareer } from './define';
export type { Award, CareerEntry, SkillGroup } from './types';
export type { TechSpec } from '@/content/skills';

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

export const TECH_BY_NAME: Record<string, TechSpec> = Object.fromEntries(
  skillGroups.flatMap((group) => group.items.map((tech) => [tech.name, tech] as const)),
);


// 제네릭 `flatten` 을 안 쓰는 이유: 번역문 타입 매개변수가 반환 타입 애노테이션에서
// 먼저 추론돼 `astro check` 가 인자와 안 맞는다고 본다.
const pick = (lang: Language) => (lang === 'en' ? 'en' : 'ko');

export function experienceOf(lang: Language): CareerEntry[] {
  return experience.map(({ ko, en, ...rest }) => ({ ...rest, ...{ ko, en }[pick(lang)] }));
}

export function educationOf(lang: Language): CareerEntry[] {
  return education.map(({ ko, en, ...rest }) => ({ ...rest, ...{ ko, en }[pick(lang)] }));
}

export function awardsOf(lang: Language): Award[] {
  return awards.map(({ ko, en, ...rest }) => ({ ...rest, ...{ ko, en }[pick(lang)] }));
}

export function skillGroupsOf(lang: Language): SkillGroup[] {
  return skillGroups.map(({ ko, en, ...rest }) => ({ ...rest, ...{ ko, en }[pick(lang)] }));
}

export const CAREER_ITEMS = { experience, education, awards, skillGroups };
