import type { Language } from '@/common/lib';

import type { AwardSlug, EducationSlug, ExperienceSlug, SkillGroupSlug } from './data';

export type CareerText = {
  org: string;
  role: string;
  summary?: string;
  achievements?: readonly string[];
};

export type AwardText = {
  title: string;
  issuer?: string;
  summary?: string;
};

export type SkillGroupText = {
  group: string;
};

export type ProfileText = {
  headline: string;
  intro?: string;
  location?: string;
};

/**
 * 언어 파일 하나가 채워야 하는 전부. `Record<Slug, …>`라서 항목을 추가하고
 * 한쪽 언어를 빠뜨리면 컴파일이 깨진다 — 영어판에서 조용히 사라지지 않는다.
 */
export type ResumeText = {
  profile: ProfileText;
  experience: Record<ExperienceSlug, CareerText>;
  education: Record<EducationSlug, CareerText>;
  awards: Record<AwardSlug, AwardText>;
  skillGroups: Record<SkillGroupSlug, SkillGroupText>;
};

/** 화면이 다루는 단위 — 구조와 번역문을 한 언어로 합친 것. */
export type CareerEntry = CareerText & {
  slug: string;
  start: string;
  end?: string;
  logo?: string;
  links?: { site?: string };
};

export type Award = AwardText & {
  slug: string;
  date: string;
  order: number;
};

export type SkillGroup = SkillGroupText & {
  slug: string;
  order: number;
  items: readonly string[];
};

export type Profile = ProfileText;

export type ResumeLanguage = Language;
