import type { Language, Localized, Url, YearMonth, YearOrMonth } from '@/common/lib';
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

export type CareerItem = Localized<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: string;
  links?: { site?: Url };
};

export type AwardItem = Localized<AwardText> & {
  slug: string;
  date: YearOrMonth;
};

export type SkillGroupItem = Localized<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly TechSpec[];
};

export type CareerEntry = CareerText & Omit<CareerItem, Language>;
export type Award = AwardText & Omit<AwardItem, Language>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, Language>;
