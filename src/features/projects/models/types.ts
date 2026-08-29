import type { Url, YearMonth } from '@/common/lib';
import type { Tech } from '@/content/skills';

export const PROJECT_LINK_KINDS = ['repo', 'demo', 'package', 'post', 'paper'] as const;

export type ProjectLinkKind = (typeof PROJECT_LINK_KINDS)[number];

/** `package` 는 배포된 패키지 — PyPI·npm·Modrinth 등. 저장소도 데모도 아니다. */
export type ProjectLinks = Partial<Record<ProjectLinkKind, Url>>;

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectText = {
  title: string;
  summary: string;
  highlight?: string;
};

export type ProjectItem = {
  slug: string;
  stack: readonly Tech[];
  start: YearMonth;
  end?: YearMonth;
  status: ProjectStatus;
  links?: ProjectLinks;
  /** 이 프로젝트로 받은 상. 항목 파일에서 `awards: [axChallenge.slug]` 로 넘긴다. */
  awards?: readonly string[];
  ko: ProjectText;
  en: ProjectText;
};

export type Project = ProjectText & Omit<ProjectItem, 'ko' | 'en'> & { hasDetail: boolean };
