import type { Tech, Url, YearMonth } from '@/common/lib';

export type ProjectLinks = {
  repo?: Url;
  demo?: Url;
  /** 배포된 패키지 — PyPI·npm·Modrinth 등. 저장소도 데모도 아니다. */
  package?: Url;
  post?: Url;
  paper?: Url;
};

export const PROJECT_DOMAINS = ['web', 'systems', 'backend', 'graphics'] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectText = {
  title: string;
  summary: string;
  highlight?: string;
};

/** 두 블록이 다 필수라 한쪽 언어를 빠뜨리면 그 파일에서 컴파일이 깨진다. */
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

/** 화면이 다루는 단위 — 한 언어로 납작하게 편 것. */
export type Project = ProjectText & Omit<ProjectItem, 'ko' | 'en'> & { hasDetail: boolean };
