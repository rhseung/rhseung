import type { Language, Localized, Url, YearMonth } from '@/common/lib';

export type CareerText = {
  org: string;
  role: string;
  summary?: string;
  achievements?: readonly string[];
};

export type CareerItem = Localized<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: string;
  links?: { site?: Url };
};

export type CareerEntry = CareerText & Omit<CareerItem, Language>;
