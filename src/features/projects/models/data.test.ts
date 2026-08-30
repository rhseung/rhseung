import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { endsAfterStart, validDate } from '@/common/lib/date-schema';
import { CAREER_ITEMS } from '@/features/career/models';

import { PROJECT_STATUSES } from './types';

import { PROJECT_ITEMS } from './index';

/** 데이터가 컴파일되어 들어가므로 zod 를 클라이언트에 싣지 않고 여기서만 검사한다. */
const SUMMARY_MAX = 200;

const filled = z.string().trim().min(1);

const text = z.object({
  title: filled,
  summary: filled.max(SUMMARY_MAX),
  highlight: filled.optional(),
});

const schema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case 여야 합니다'),
  stack: z.array(filled).min(1).max(6),
  start: validDate,
  end: validDate.optional(),
  status: z.enum(PROJECT_STATUSES),
  links: z
    .object({
      repo: z.url().optional(),
      demo: z.url().optional(),
      package: z.url().optional(),
      post: z.url().optional(),
      paper: z.url().optional(),
    })
    .optional(),
  ko: text,
  en: text,
});

describe('PROJECT_ITEMS', () => {
  it('파일이 하나도 안 빠졌다', () => {
    expect(PROJECT_ITEMS.length).toBeGreaterThan(0);
  });

  it.each(PROJECT_ITEMS.map((p) => [p.slug, p] as const))(
    '%s 가 스키마를 만족한다',
    (_slug, project) => {
      expect(schema.safeParse(project).error).toBeUndefined();
    },
  );

  it('연결한 수상이 실제로 있다', () => {
    const slugs = new Set(CAREER_ITEMS.awards.map((award) => award.slug));

    for (const project of PROJECT_ITEMS) {
      for (const slug of project.awards ?? []) expect(slugs.has(slug), project.slug).toBe(true);
    }
  });

  it('슬러그가 겹치지 않는다', () => {
    const slugs = PROJECT_ITEMS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('끝난 날짜가 시작보다 빠르지 않다', () => {
    for (const project of PROJECT_ITEMS) expect(endsAfterStart(project), project.slug).toBe(true);
  });
});
