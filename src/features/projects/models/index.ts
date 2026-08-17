import { z } from 'zod';

export const PROJECT_DOMAINS = ['web', 'systems', 'backend', 'graphics'] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

export const PROJECT_STATUSES = ['active', 'shipped', 'archived'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_SUMMARY_MAX = 160;

export const PROJECT_STACK_MAX = 6;

const yearMonth = () =>
  z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'YYYY-MM 형식이어야 합니다 (예: 2024-03)');

/**
 * 이 스키마가 곧 `src/content.config.ts`의 collection 스키마다. 방향이 반대면
 * Model이 `astro:content`에 의존하는데, Storybook과 vitest는 그 가상 모듈을 못 읽는다.
 */
export const projectSchema = () =>
  z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(PROJECT_SUMMARY_MAX),
    domain: z.enum(PROJECT_DOMAINS),
    stack: z.array(z.string()).min(1).max(PROJECT_STACK_MAX),
    start: yearMonth(),
    end: yearMonth().optional(),
    status: z.enum(PROJECT_STATUSES),

    pinned: z.boolean().default(false),
    highlight: z.string().optional(),
    links: z
      .object({
        repo: z.url().optional(),
        demo: z.url().optional(),
        /** 배포된 패키지 — PyPI·npm·Modrinth 등. 저장소도 데모도 아니다. */
        package: z.url().optional(),
        post: z.url().optional(),
        paper: z.url().optional(),
      })
      .optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  });

export type Project = z.infer<ReturnType<typeof projectSchema>>;

/** `hasDetail`이 false면 상세 페이지가 없고 카드가 저장소·데모로 보낸다. */
export type ProjectSummary = Project & { slug: string; hasDetail: boolean };
