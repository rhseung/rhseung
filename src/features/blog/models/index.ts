import { z } from 'zod';

import { LANGUAGES } from '@/common/lib';

/** 목록 한 줄에 들어가는 길이. */
export const POST_SUMMARY_MAX = 120;

export const POST_TAGS_MAX = 5;

/**
 * 이 스키마가 곧 `src/content.config.ts`의 collection 스키마다. 방향이 반대면
 * Model이 `astro:content`에 의존하는데, Storybook과 vitest는 그 가상 모듈을 못 읽는다.
 */
export const postSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1).max(POST_SUMMARY_MAX),
  /**
   * 글은 번역하지 않는다 — 쓴 언어 그대로 한 벌만 산다. 그래서 언어가 디렉토리가 아니라
   * 필드고, 목록에 배지로 표시한다(영어 UI로 보다 한국어 글을 열고 튕기지 않게).
   */
  lang: z.enum(LANGUAGES),
  tags: z.array(z.string()).max(POST_TAGS_MAX).default([]),
  draft: z.boolean().default(false),
});

export type Post = z.infer<typeof postSchema>;

/**
 * 목록이 다루는 단위. `date`가 `Date`가 아니라 ISO 문자열인 건 의도다 —
 * `.astro`에서 아일랜드 props로 넘어가며 어차피 직렬화되므로, 타입이 거짓말하지 않게
 * 경계에서 바꿔둔다.
 */
export type PostSummary = Omit<Post, 'date'> & { slug: string; date: string };
