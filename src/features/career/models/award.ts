import type { Language, Localized, YearOrMonth } from '@/common/lib';

export type AwardText = {
  title: string;
  issuer?: string;
  summary?: string;
};

export type AwardItem = Localized<AwardText> & {
  slug: string;
  date: YearOrMonth;
};

export type Award = AwardText & Omit<AwardItem, Language>;
