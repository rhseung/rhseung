import { DEFAULT_LANGUAGE, type Language } from '@/common/lib';

import { AWARDS, EDUCATION, EXPERIENCE, SKILL_GROUPS } from './data';
import { careerTextEN } from './text.en';
import { careerTextKO } from './text.ko';

import type { Award, CareerEntry, CareerTexts, SkillGroup } from './types';

export type { Award, CareerEntry, SkillGroup } from './types';

const TEXT: Record<Language, CareerTexts> = { ko: careerTextKO, en: careerTextEN };

function text(lang: Language) {
  return TEXT[lang] ?? TEXT[DEFAULT_LANGUAGE];
}

export function experienceOf(lang: Language): CareerEntry[] {
  return EXPERIENCE.map((entry) => ({ ...entry, ...text(lang).experience[entry.slug] }));
}

export function educationOf(lang: Language): CareerEntry[] {
  return EDUCATION.map((entry) => ({ ...entry, ...text(lang).education[entry.slug] }));
}

export function awardsOf(lang: Language): Award[] {
  return AWARDS.map((award) => ({ ...award, ...text(lang).awards[award.slug] }));
}

export function skillGroupsOf(lang: Language): SkillGroup[] {
  return SKILL_GROUPS.map((group) => ({ ...group, ...text(lang).skillGroups[group.slug] }));
}
