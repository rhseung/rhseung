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
import { TECH_BY_NAME, type Tech } from '@/content/skills';
import { CAREER_ITEMS } from '@/features/career/models';

import { PROJECT_STATUSES, type ProjectItem } from './types';

import { PROJECT_ITEMS } from './index';

const tech = z.custom<Tech>((value) => typeof value === 'string' && value in TECH_BY_NAME);

const text = z.strictObject({
  title: filled,
  summary: filled.max(SUMMARY_MAX),
  highlight: filled.optional(),
});

const schema = z.strictObject({
  slug,
  stack: z.array(tech).min(1).max(6),
  start: validDate,
  end: validDate.optional(),
  status: z.enum(PROJECT_STATUSES),
  links: z
    .strictObject({
      repo: url.optional(),
      demo: url.optional(),
      package: url.optional(),
      post: url.optional(),
      paper: url.optional(),
    })

    .optional(),
  awards: z.array(slug).optional(),
  ko: text,
  en: text,
}) satisfies z.ZodType<ProjectItem>;

describe('PROJECT_ITEMS', () => {
  it('파일이 하나도 안 빠졌다', () => {
    expect(PROJECT_ITEMS.length).toBeGreaterThan(0);
  });

  it.each(PROJECT_ITEMS.map((p) => [p.slug, p] as const))(
    '%s 가 스키마를 만족한다 - stack 은 skills.ts 에 있는 이름만',
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
