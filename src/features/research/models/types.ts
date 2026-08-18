import type { Url, YearMonth } from '@/common/lib';

export const RESEARCH_KINDS = ['rne', 'lab', 'paper'] as const;

export const RESEARCH_LINK_KINDS = ['paper', 'poster', 'repo', 'site'] as const;

export type ResearchLinkKind = (typeof RESEARCH_LINK_KINDS)[number];

export type ResearchKind = (typeof RESEARCH_KINDS)[number];

export type ResearchText = {
  title: string;
  org: string;
  role?: string;
  summary: string;
};

export type ResearchItem = {
  slug: string;
  kind: ResearchKind;
  start: YearMonth;
  end?: YearMonth;
  links?: Partial<Record<ResearchLinkKind, Url>>;
  ko: ResearchText;
  en: ResearchText;
};

export type Research = ResearchText & Omit<ResearchItem, 'ko' | 'en'>;
