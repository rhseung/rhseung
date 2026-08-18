import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { endsAfterStart, validDate } from '@/common/lib/date-schema';
import { CAREER_ITEMS } from '@/features/career/models';

import { PROJECT_DOMAINS, PROJECT_STATUSES } from './types';

import { PROJECT_ITEMS } from './index';

/**
 * 타입이 못 잡는 규칙만 여기서 본다 — 길이 상한, 기간 순서, URL 형식, 슬러그 중복.
 *
 * 번들이 아니라 테스트에서 도는 이유: 이 데이터는 컴파일되어 들어가므로 런타임에 변하지
 * 않는다. 방문자마다 다시 검사할 이유가 없고, zod 를 클라이언트에 실으면 52KB 다.
 */
const SUMMARY_MAX = 200;

const filled = z.string().trim().min(1);

const text = z.object({
  title: filled,
  summary: filled.max(SUMMARY_MAX),
  highlight: filled.optional(),
});

const schema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case 여야 합니다'),
  domain: z.enum(PROJECT_DOMAINS),
  stack: z.array(filled).min(1).max(6),
  start: validDate,
  end: validDate.optional(),
  status: z.enum(PROJECT_STATUSES),
  pinned: z.boolean().optional(),
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

  // 모듈을 import 해서 참조하므로 오타는 안 나지만, 수상을 지우면 여기서 걸린다.
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
