import { describe, expect, it } from 'vitest';

import { pickRecent, sortPosts, toPostSummary } from './select-posts';

import type { PostSummary } from '../models';

function post(slug: string, date: string): PostSummary {
  return { slug, title: slug, summary: '요약', lang: 'ko', tags: [], draft: false, date };
}

describe('toPostSummary', () => {
  it('Date를 ISO 문자열로 바꾼다', () => {
    const summary = toPostSummary({
      id: 'hello',
      data: {
        title: 'Hello',
        date: new Date('2026-03-02T00:00:00.000Z'),
        summary: '요약',
        lang: 'ko',
        tags: [],
        draft: false,
      },
    });

    expect(summary).toMatchObject({ slug: 'hello', date: '2026-03-02T00:00:00.000Z' });
  });
});

describe('sortPosts', () => {
  it('최신순', () => {
    const posts = [
      post('old', '2024-01-01T00:00:00.000Z'),
      post('new', '2026-01-01T00:00:00.000Z'),
      post('mid', '2025-01-01T00:00:00.000Z'),
    ];

    expect(sortPosts(posts).map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
  });

  it('입력 배열을 건드리지 않는다', () => {
    const posts = [post('a', '2024-01-01T00:00:00.000Z'), post('b', '2026-01-01T00:00:00.000Z')];
    sortPosts(posts);

    expect(posts.map((p) => p.slug)).toEqual(['a', 'b']);
  });
});

describe('pickRecent', () => {
  it('최신 n개', () => {
    const posts = [
      post('a', '2024-01-01T00:00:00.000Z'),
      post('b', '2026-01-01T00:00:00.000Z'),
      post('c', '2025-01-01T00:00:00.000Z'),
    ];

    expect(pickRecent(posts, 2).map((p) => p.slug)).toEqual(['b', 'c']);
  });
});
