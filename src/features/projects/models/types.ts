import type { Tech, Url, YearMonth } from '@/common/lib';

export const PROJECT_LINK_KINDS = ['repo', 'demo', 'package', 'post', 'paper'] as const;

export type ProjectLinkKind = (typeof PROJECT_LINK_KINDS)[number];

/** `package` 는 배포된 패키지 — PyPI·npm·Modrinth 등. 저장소도 데모도 아니다. */
export type ProjectLinks = Partial<Record<ProjectLinkKind, Url>>;

export const PROJECT_DOMAINS = ['web', 'systems', 'backend', 'graphics'] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectText = {
  title: string;
  summary: string;
  highlight?: string;
};

export type ProjectItem = {
  slug: string;
  domain: ProjectDomain;
  stack: readonly Tech[];
  start: YearMonth;
  end?: YearMonth;
  status: ProjectStatus;
  pinned?: boolean;
  links?: ProjectLinks;
  ko: ProjectText;
  en: ProjectText;
};

export type Project = ProjectText & Omit<ProjectItem, 'ko' | 'en'> & { hasDetail: boolean };
