import { existsSync } from 'node:fs';

import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { endsAfterStart, validDate, yearOrMonth } from '@/common/lib/date-schema';

import { CAREER_ITEMS } from './index';

const SUMMARY_MAX = 200;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case 여야 합니다');
const filled = z.string().trim().min(1);
const summary = z.string().trim().min(1).max(SUMMARY_MAX).optional();

const careerText = z.object({
  org: filled,
  role: filled,
  summary,
  achievements: z.array(filled).min(1).optional(),
});

const translated = <T extends z.ZodType>(text: T) => ({ ko: text, en: text });

const career = z.object({
  slug,
  start: validDate,
  end: validDate.optional(),
  logo: z.string().optional(),
  links: z.object({ site: z.url().optional() }).optional(),
  ...translated(careerText),
});

const award = z.object({
  slug,
  date: yearOrMonth,
  ...translated(z.object({ title: filled, issuer: filled.optional(), summary })),
});

const skillGroup = z.object({
  slug,
  order: z.number().int().min(0),
  items: z.array(filled).min(1),
  ...translated(z.object({ group: filled })),
});

const { experience, education, awards, skillGroups } = CAREER_ITEMS;

describe.each([
  ['experience', experience],
  ['education', education],
])('%s', (_name, entries) => {
  it('스키마를 만족한다', () => {
    for (const entry of entries) expect(career.safeParse(entry).error, entry.slug).toBeUndefined();
  });

  it('끝난 날짜가 시작보다 빠르지 않다', () => {
    for (const entry of entries) expect(endsAfterStart(entry), entry.slug).toBe(true);
  });

  it('로고 파일이 실제로 있다', () => {
    for (const entry of entries) {
      if (entry.logo) expect(existsSync(`public${entry.logo}`), entry.logo).toBe(true);
    }
  });
});

describe('awards', () => {
  it('스키마를 만족한다', () => {
    for (const entry of awards) expect(award.safeParse(entry).error, entry.slug).toBeUndefined();
  });
});

describe('skillGroups', () => {
  it('스키마를 만족한다', () => {
    for (const group of skillGroups) {
      expect(skillGroup.safeParse(group).error, group.slug).toBeUndefined();
    }
  });

  it('같은 기술이 두 그룹에 있지 않다', () => {
    const all = skillGroups.flatMap((g) => g.items);
    expect(new Set(all).size, all.join(', ')).toBe(all.length);
  });
});

describe('파일 수집', () => {
  it('항목이 하나도 안 빠졌다', () => {
    expect(Object.values(CAREER_ITEMS).every((items) => items.length > 0)).toBe(true);
  });

  it('슬러그가 겹치지 않는다', () => {
    for (const items of Object.values(CAREER_ITEMS)) {
      const slugs = items.map((item) => item.slug);
      expect(new Set(slugs).size, slugs.join(', ')).toBe(slugs.length);
    }
  });
});
