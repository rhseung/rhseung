import { existsSync } from 'node:fs';

import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { AWARDS, EDUCATION, EXPERIENCE, SKILL_GROUPS } from './data';

const monthly = z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'YYYY-MM 이어야 합니다');
const yearly = z
  .string()
  .regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/, 'YYYY 또는 YYYY-MM 이어야 합니다');
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case 여야 합니다');

const career = z.object({
  slug,
  start: monthly,
  end: monthly.optional(),
  logo: z.string().optional(),
  links: z.object({ site: z.url().optional() }).optional(),
});

const award = z.object({ slug, date: yearly, order: z.number().int().min(0) });

const skillGroup = z.object({
  slug,
  order: z.number().int().min(0),
  items: z.array(z.string().min(1)).min(1),
});

describe.each([
  ['EXPERIENCE', EXPERIENCE],
  ['EDUCATION', EDUCATION],
])('%s', (_name, entries) => {
  it('스키마를 만족한다', () => {
    for (const entry of entries) expect(career.safeParse(entry).error, entry.slug).toBeUndefined();
  });

  // 타입은 두 문자열이 `YYYY-MM` 인 것까지만 안다. 순서는 모른다.
  it('끝난 날짜가 시작보다 빠르지 않다', () => {
    for (const entry of entries) {
      if ('end' in entry && entry.end) expect(entry.end >= entry.start, entry.slug).toBe(true);
    }
  });

  it('로고 파일이 실제로 있다', () => {
    for (const entry of entries) {
      if ('logo' in entry && entry.logo)
        expect(existsSync(`public${entry.logo}`), entry.logo).toBe(true);
    }
  });
});

describe('AWARDS', () => {
  it('스키마를 만족한다', () => {
    for (const entry of AWARDS) expect(award.safeParse(entry).error, entry.slug).toBeUndefined();
  });

  it('슬러그가 겹치지 않는다', () => {
    expect(new Set(AWARDS.map((a) => a.slug)).size).toBe(AWARDS.length);
  });
});

describe('SKILL_GROUPS', () => {
  it('스키마를 만족한다', () => {
    for (const group of SKILL_GROUPS) {
      expect(skillGroup.safeParse(group).error, group.slug).toBeUndefined();
    }
  });

  it('같은 기술이 두 그룹에 있지 않다', () => {
    const all = SKILL_GROUPS.flatMap((g) => g.items);
    expect(new Set(all).size, all.join(', ')).toBe(all.length);
  });
});
