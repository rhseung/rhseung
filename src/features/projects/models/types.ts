import type { ProjectSlug } from './data';

export const PROJECT_DOMAINS = ['web', 'systems', 'backend', 'graphics'] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectText = {
  title: string;
  /** 카드 본문이자 meta description. 카드가 이 사이트에서 프로젝트를 설명하는 주된 자리다. */
  summary: string;
  /** 한 줄 성과("파싱 3.2× 빠름"). */
  highlight?: string;
};

/** 항목을 추가하고 한쪽 언어를 빠뜨리면 컴파일이 깨진다. */
export type ProjectsText = Record<ProjectSlug, ProjectText>;

export type Project = ProjectText & {
  slug: string;
  domain: ProjectDomain;
  stack: readonly string[];
  start: string;
  end?: string;
  status: ProjectStatus;
  pinned?: boolean;
  links?: {
    repo?: string;
    demo?: string;
    package?: string;
    post?: string;
    paper?: string;
  };
  /** MDX 본문이 있으면 상세 페이지가 생긴다. */
  hasDetail: boolean;
};
