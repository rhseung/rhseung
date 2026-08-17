import type { Tech } from '@/common/lib';

import type { AwardSlug, EducationSlug, ExperienceSlug, SkillGroupSlug } from './data';

/** 상대경로·http 를 막는다. */
export type Url = `https://${string}`;

/** `public/logos/` 밖을 가리킬 수 없다. */
export type LogoPath = `/logos/${string}`;

/** `2024-03`. zod 가 하던 형식 검사를 타입이 대신한다. */
export type YearMonth = `${number}-${number}`;

/** 수상·성취는 연도만 아는 경우가 많다. 월을 지어내지 않아도 되게 둘 다 받는다. */
export type YearOrMonth = `${number}` | YearMonth;

/** `data.ts`가 만족해야 하는 모양. 오타·누락이 그 줄에서 바로 잡힌다. */
export type CareerData = {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: LogoPath;
  links?: { site?: Url };
};

export type AwardData = {
  slug: string;
  date: YearOrMonth;
  /** 같은 해 안의 순서. 작을수록 먼저. */
  order: number;
};

export type SkillGroupData = {
  slug: string;
  order: number;
  items: readonly Tech[];
};

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

/**
 * 언어 파일 하나가 채워야 하는 전부. `Record<Slug, …>`라서 항목을 추가하고
 * 한쪽 언어를 빠뜨리면 컴파일이 깨진다 — 영어판에서 조용히 사라지지 않는다.
 */
export type CareerTexts = {
  experience: Record<ExperienceSlug, CareerText>;
  education: Record<EducationSlug, CareerText>;
  awards: Record<AwardSlug, AwardText>;
  skillGroups: Record<SkillGroupSlug, SkillGroupText>;
};

/** 화면이 다루는 단위 — 구조와 번역문을 한 언어로 합친 것. */
export type CareerEntry = CareerText & CareerData;
export type Award = AwardText & AwardData;
export type SkillGroup = SkillGroupText & SkillGroupData;
