import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  endsAfterStart,
  filled,
  slug,
  SUMMARY_MAX,
  url,
  validDate,
} from '@/common/lib/content-schema';

import { RESEARCH_KINDS, type ResearchItem } from './types';

import { RESEARCH_ITEMS } from './index';

const text = z
  .object({
    title: filled,
    org: filled,
    role: filled.optional(),
    summary: filled.max(SUMMARY_MAX),
  })
  .strict();

const schema = z
  .object({
    slug,
    kind: z.enum(RESEARCH_KINDS),
    start: validDate,
    end: validDate.optional(),
    links: z
      .object({
        paper: url.optional(),
        poster: url.optional(),
        repo: url.optional(),
        site: url.optional(),
      })
      .strict()
      .optional(),
    ko: text,
    en: text,
  })
  .strict() satisfies z.ZodType<ResearchItem>;

describe('RESEARCH_ITEMS', () => {
  it('파일이 하나도 안 빠졌다', () => {
    expect(RESEARCH_ITEMS.length).toBeGreaterThan(0);
  });

  it.each(RESEARCH_ITEMS.map((item) => [item.slug, item] as const))(
    '%s 가 스키마를 만족한다 - 스키마가 모르는 필드도 실패다',
    (_slug, item) => {
      expect(schema.safeParse(item).error).toBeUndefined();
    },
  );

  it('슬러그가 겹치지 않는다', () => {
    const slugs = RESEARCH_ITEMS.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('끝난 날짜가 시작보다 빠르지 않다', () => {
    for (const item of RESEARCH_ITEMS) expect(endsAfterStart(item), item.slug).toBe(true);
  });
});
