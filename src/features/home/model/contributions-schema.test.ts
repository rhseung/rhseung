import { describe, expect, it } from 'vitest';

import { upstreamSchema } from './contributions-schema';

describe('upstreamSchema', () => {
  const day = { date: '2026-09-22', count: 3, level: 1 };

  it('upstream 의 total.lastYear 를 우리 total 로 옮긴다', () => {
    expect(upstreamSchema.parse({ total: { lastYear: 3694 }, contributions: [day] })).toEqual({
      total: 3694,
      days: [day],
    });
  });

  it('잔디가 비어 있어도 통과한다', () => {
    expect(upstreamSchema.parse({ total: { lastYear: 0 }, contributions: [] })).toEqual({
      total: 0,
      days: [],
    });
  });

  it('upstream 이 모양을 바꾸면 던진다', () => {
    expect(() => upstreamSchema.parse({ total: 3694, contributions: [] })).toThrow();
    expect(() => upstreamSchema.parse({ total: { lastYear: 1 } })).toThrow();
    expect(() =>
      upstreamSchema.parse({ total: { lastYear: 1 }, contributions: [{ date: '2026-09-22' }] }),
    ).toThrow();
  });
});
