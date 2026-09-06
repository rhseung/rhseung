import { describe, expect, it } from 'vitest';

import { LANGUAGES } from '@/common/lib';

import { pickBody, sortPosts, toPostSummary } from './select-posts';

import type { PostSummary } from '../models';

function post(slug: string, date: string): PostSummary {
  return { slug, title: slug, summary: '요약', tags: [], date, bodyLang: 'ko' };
}

describe('pickBody', () => {
  const entries = [{ id: 'hello/ko' }, { id: 'hello/en' }, { id: 'hello-again/ko' }];

  it('요청 언어의 본문이 있으면 그것', () => {
    expect(pickBody(entries, 'hello', 'en')).toEqual({ bodyLang: 'en', entry: { id: 'hello/en' } });
  });

  it('없으면 LANGUAGES 순서로 첫 번째 본문', () => {
    const [first] = LANGUAGES;
    expect(pickBody([{ id: `only/${first}` }], 'only', 'en')).toMatchObject({ bodyLang: first });
  });

  it('슬러그 접두사가 같은 다른 글을 집지 않는다', () => {
    expect(() => pickBody(entries.slice(2), 'hello', 'ko')).toThrow('hello');
  });

  it('본문이 하나도 없으면 던진다', () => {
    expect(() => pickBody([], 'hello', 'ko')).toThrow('hello');
  });
});

describe('toPostSummary', () => {
  it('항목과 본문 frontmatter 를 합치고 draft 는 버린다', () => {
    const summary = toPostSummary(
      { slug: 'hello', date: '2026-03-02', tags: ['a'], draft: false },
      { bodyLang: 'en', entry: { data: { title: 'Hello', summary: '요약' } } },
    );

    expect(summary).toEqual({
      slug: 'hello',
      date: '2026-03-02',
      tags: ['a'],
      title: 'Hello',
      summary: '요약',
      bodyLang: 'en',
    });
  });
});

describe('sortPosts', () => {
  it('최신순', () => {
    const posts = [post('old', '2024-01-01'), post('new', '2026-01-01'), post('mid', '2025-01-01')];

    expect(sortPosts(posts).map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
  });

  it('입력 배열을 건드리지 않는다', () => {
    const posts = [post('a', '2024-01-01'), post('b', '2026-01-01')];
    sortPosts(posts);

    expect(posts.map((p) => p.slug)).toEqual(['a', 'b']);
  });
});
