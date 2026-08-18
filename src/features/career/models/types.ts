import type { LogoPath, Tech, Url, YearMonth, YearOrMonth } from '@/common/lib';

import type { Dayjs } from 'dayjs';


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
  start: Dayjs;
  end?: Dayjs;
  logo?: LogoPath;
  links?: { site?: Url };
};

export type AwardItem = Translated<AwardText> & {
  slug: string;
  date: YearOrMonth;
  /** 같은 해 안의 순서. 작을수록 먼저. */
  order: number;
};

export type SkillGroupItem = Translated<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly Tech[];
};

export type CareerEntry = CareerText &
  Omit<CareerItem, 'ko' | 'en' | 'start' | 'end'> & { start: YearMonth; end?: YearMonth };
export type Award = AwardText & Omit<AwardItem, 'ko' | 'en'>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, 'ko' | 'en'>;
