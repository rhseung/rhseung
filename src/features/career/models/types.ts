import type { Url, YearMonth, YearOrMonth } from '@/common/lib';
import type { TechSpec } from '@/content/skills';

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

type Translated<T> = { ko: T; en: T };

export type CareerItem = Translated<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: string;
  links?: { site?: Url };
};

export type AwardItem = Translated<AwardText> & {
  slug: string;
  date: YearOrMonth;
};

export type SkillGroupItem = Translated<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly TechSpec[];
};

export type CareerEntry = CareerText & Omit<CareerItem, 'ko' | 'en'>;
export type Award = AwardText & Omit<AwardItem, 'ko' | 'en'>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, 'ko' | 'en'>;
