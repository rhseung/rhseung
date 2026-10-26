import type { Language, Localized, Url, YearMonth } from '@/common/lib';
import type { Tech } from '@/content/skills';

export const PROJECT_LINK_KINDS = ['repo', 'demo', 'package', 'post', 'paper'] as const;

export type ProjectLinkKind = (typeof PROJECT_LINK_KINDS)[number];

export type ProjectLinks = Partial<Record<ProjectLinkKind, Url>>;

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_CATEGORIES = ['service', 'graphics', 'library', 'lab'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectText = {
  title: string;
  summary: string;
  coverAlt?: string;
};

export type ProjectItem = Localized<ProjectText> & {
  slug: string;
  stack: readonly Tech[];
  start: YearMonth;
  end?: YearMonth;
  status: ProjectStatus;
  category: ProjectCategory;
  cover?: string;
  links?: ProjectLinks;
  awards?: readonly string[];
};

export type Project = ProjectText & Omit<ProjectItem, Language> & { hasDetail: boolean };
