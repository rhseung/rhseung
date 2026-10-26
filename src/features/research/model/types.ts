import type { Language, Localized, Url, YearMonth } from '@/common/lib';
import type { Tone } from '@/common/styles';

export const RESEARCH_KINDS = ['rne', 'lab', 'paper'] as const;

export const RESEARCH_LINK_KINDS = ['paper', 'poster', 'repo', 'site'] as const;

export type ResearchLinkKind = (typeof RESEARCH_LINK_KINDS)[number];

export type ResearchKind = (typeof RESEARCH_KINDS)[number];

export const RESEARCH_KIND_TONE: Record<ResearchKind, Tone> = {
  rne: 'teal',
  lab: 'purple',
  paper: 'rose',
};

export type ResearchText = {
  title: string;
  org: string;
  role?: string;
  summary: string;
};

export type ResearchItem = Localized<ResearchText> & {
  slug: string;
  kind: ResearchKind;
  start: YearMonth;
  end?: YearMonth;
  links?: Partial<Record<ResearchLinkKind, Url>>;
};

export type Research = ResearchText & Omit<ResearchItem, Language>;
