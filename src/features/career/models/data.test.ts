import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  endsAfterStart,
  filled,
  slug,
  SUMMARY_MAX,
  url,
  validDate,
  yearOrMonth,
} from '@/common/lib/content-schema';

import { CAREER_ITEMS } from './index';

import type { AwardItem } from './award';
import type { CareerItem } from './career';
import type { SkillGroupItem } from './skill-group';
import type { SimpleIcon } from 'simple-icons';

const summary = z.string().trim().min(1).max(SUMMARY_MAX).optional();

const translated = <T extends z.ZodType>(text: T) => ({ ko: text, en: text });

const career = z
  .object({
    slug,
    start: validDate,
    end: validDate.optional(),
    logo: z.string().optional(),
    links: z.object({ site: url.optional() }).strict().optional(),
    ...translated(
      z
        .object({
          org: filled,
          role: filled,
          summary,
          achievements: z.array(filled).min(1).optional(),
        })
        .strict(),
    ),
  })
  .strict() satisfies z.ZodType<CareerItem>;

const award = z
  .object({
    slug,
    date: yearOrMonth,
    ...translated(z.object({ title: filled, issuer: filled.optional(), summary }).strict()),
  })
  .strict() satisfies z.ZodType<AwardItem>;

const icon = z.custom<SimpleIcon>(
  (value) => typeof value === 'object' && value !== null && 'path' in value,
);

const techSpec = z
  .object({
    name: filled,
    hex: z.string().regex(/^#[0-9A-F]{6}$/, '`#` + 대문자 6자리 hex 여야 합니다'),
    icon: icon.optional(),
  })
  .strict();

const skillGroup = z
  .object({
    slug,
    order: z.int().positive(),
    items: z.array(techSpec).min(1),
    ...translated(z.object({ group: filled }).strict()),
  })
  .strict() satisfies z.ZodType<SkillGroupItem>;

const { experience, education, awards, skillGroups } = CAREER_ITEMS;

describe.each([
  ['experience', experience],
  ['education', education],
])('%s', (_name, entries) => {
  it('스키마를 만족한다 - 스키마가 모르는 필드도 실패다', () => {
    for (const entry of entries) expect(career.safeParse(entry).error, entry.slug).toBeUndefined();
  });

  it('끝난 날짜가 시작보다 빠르지 않다', () => {
    for (const entry of entries) expect(endsAfterStart(entry), entry.slug).toBe(true);
  });
});

describe('awards', () => {
  it('스키마를 만족한다 - 스키마가 모르는 필드도 실패다', () => {
    for (const entry of awards) expect(award.safeParse(entry).error, entry.slug).toBeUndefined();
  });
});

describe('skillGroups', () => {
  it('스키마를 만족한다 - 스키마가 모르는 필드도 실패다', () => {
    for (const group of skillGroups) {
      expect(skillGroup.safeParse(group).error, group.slug).toBeUndefined();
    }
  });

  it('같은 기술이 두 그룹에 있지 않다', () => {
    const all = skillGroups.flatMap((g) => g.items.map((item) => item.name));
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
