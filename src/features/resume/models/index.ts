import { DEFAULT_LANGUAGE, type Language } from '@/common/lib';

import { AWARDS, EDUCATION, EXPERIENCE, SKILL_GROUPS } from './data';
import { resumeTextEN } from './text.en';
import { resumeTextKO } from './text.ko';

import type { Award, CareerEntry, Profile, ResumeText, SkillGroup } from './types';

export type { Award, CareerEntry, Profile, SkillGroup } from './types';

const TEXT: Record<Language, ResumeText> = { ko: resumeTextKO, en: resumeTextEN };

function text(lang: Language) {
  return TEXT[lang] ?? TEXT[DEFAULT_LANGUAGE];
}

/** 구조와 번역문을 슬러그로 이어 붙인다. 한쪽이 비면 타입이 먼저 막는다. */
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

export function profileOf(lang: Language): Profile {
  return text(lang).profile;
}
