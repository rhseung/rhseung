import type { Tech } from '@/common/lib';

import type { ProjectSlug } from './data';

/** 상대경로·http 를 막는다. */
export type Url = `https://${string}`;

/** `2024-03`. zod 가 하던 형식 검사를 타입이 대신한다. */
export type YearMonth = `${number}-${number}`;

export type ProjectLinks = {
  repo?: Url;
  demo?: Url;
  /** 배포된 패키지 — PyPI·npm·Modrinth 등. 저장소도 데모도 아니다. */
  package?: Url;
  post?: Url;
  paper?: Url;
};

/** `data.ts`가 만족해야 하는 모양. 오타·누락이 그 줄에서 바로 잡힌다. */
export type ProjectData = {
  slug: string;
  domain: ProjectDomain;
  stack: readonly Tech[];
  start: YearMonth;
  end?: YearMonth;
  status: ProjectStatus;
  pinned?: boolean;
  links?: ProjectLinks;
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

/** 항목을 추가하고 한쪽 언어를 빠뜨리면 컴파일이 깨진다. */
export type ProjectsText = Record<ProjectSlug, ProjectText>;

export type Project = ProjectText & ProjectData & { hasDetail: boolean };
