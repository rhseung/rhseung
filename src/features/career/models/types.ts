import type { LogoPath, Tech, Url, YearMonth, YearOrMonth } from '@/common/lib';

export type CareerText = {
  org: string;
  role: string;
  summary?: string;
  /** 교과우수상·석차·장학 같은 학교 안 성취. 대회 컬렉션이 아니라 여기 딸린다. */
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

type Translated<T> = { ko: T; en: T };

export type CareerItem = Translated<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: LogoPath;
  links?: { site?: Url };
};

export type AwardItem = Translated<AwardText> & {
  slug: string;
  date: YearOrMonth;
};

export type SkillGroupItem = Translated<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly Tech[];
};

export type CareerEntry = CareerText & Omit<CareerItem, 'ko' | 'en'>;
export type Award = AwardText & Omit<AwardItem, 'ko' | 'en'>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, 'ko' | 'en'>;
