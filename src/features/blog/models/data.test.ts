import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { filled, slug } from '@/common/lib/content-schema';

import { POST_ITEMS } from './index';

import type { PostItem } from './types';

const schema = z.strictObject({
  slug,
  date: z.iso.date(),
  tags: z.array(filled).max(5),
  draft: z.boolean().optional(),
}) satisfies z.ZodType<PostItem>;

describe('POST_ITEMS', () => {
  it('파일이 하나도 안 빠졌다', () => {
    expect(POST_ITEMS.length).toBeGreaterThan(0);
  });

  it.each(POST_ITEMS.map((p) => [p.slug, p] as const))('%s 가 스키마를 만족한다', (_slug, post) => {
    expect(schema.safeParse(post).error).toBeUndefined();
  });

  it('슬러그가 겹치지 않는다', () => {
    const slugs = POST_ITEMS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
