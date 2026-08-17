import { z } from 'zod';

/**
 * 프로젝트당 정확히 하나. 복수를 허용하면 필터가 무의미해지고 목록이 태그 클라우드가 된다.
 * 겹치면 기준은 "이 프로젝트로 뭐라고 기억되고 싶은가".
 */
export const PROJECT_DOMAINS = ['web', 'systems', 'backend', 'graphics'] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

/** 없으면 몇 해 전 프로젝트가 전부 죽은 것으로 읽힌다. */
export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/**
 * 카드 본문이자 meta description이자 OG 설명.
 *
 * 카드가 이 사이트에서 프로젝트를 설명하는 주된 자리다 — 상세 페이지는 본문을 쓴
 * 프로젝트에만 생긴다. 그래서 한 줄이 아니라 두어 줄까지 허용한다.
 */
export const PROJECT_SUMMARY_MAX = 160;

/** 카드 하단 칩이 한 줄에 들어가는 한계. */
export const PROJECT_STACK_MAX = 6;

const yearMonth = z
  .string()
  .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'YYYY-MM 형식이어야 합니다 (예: 2024-03)');

/**
 * 이 스키마가 곧 `src/content.config.ts`의 collection 스키마다. 방향이 반대면
 * Model이 `astro:content`에 의존하는데, Storybook과 vitest는 그 가상 모듈을 못 읽는다.
 */
export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(PROJECT_SUMMARY_MAX),
  domain: z.enum(PROJECT_DOMAINS),
  stack: z.array(z.string()).min(1).max(PROJECT_STACK_MAX),
  start: yearMonth,
  /** 없으면 진행 중. */
  end: yearMonth.optional(),
  status: z.enum(PROJECT_STATUSES),

  /** 필터가 아니라 정렬 가중치. 홈 노출의 유일한 소스다. */
  pinned: z.boolean().default(false),
  /** 한 줄 성과("파싱 3.2× 빠름"). */
  highlight: z.string().optional(),
  links: z
    .object({
      repo: z.url().optional(),
      demo: z.url().optional(),
      post: z.url().optional(),
      paper: z.url().optional(),
    })
    .optional(),
  /** `public/` 기준 경로. */
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;

/**
 * 목록·카드가 다루는 단위.
 *
 * `hasDetail`은 MDX 본문이 있는지다. 없으면 상세 페이지를 만들지 않고 카드가 바로
 * 저장소·데모로 보낸다 — 프로젝트 대부분은 카드 한 장으로 끝난다.
 */
export type ProjectSummary = Project & { slug: string; hasDetail: boolean };
