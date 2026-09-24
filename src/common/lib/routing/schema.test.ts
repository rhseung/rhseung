import { describe, expect, it } from 'vitest';

import { pageSchema } from './schema';

const base = {
  lang: 'ko',
  title: '글 제목',
  description: '요약',
  author: '류현승',
  canonical: 'https://www.rhseung.me/ko/blog/hello/',
} as const;

describe('pageSchema', () => {
  it('글은 BlogPosting 이고 제목과 날짜가 본문에서 온다', () => {
    const schema = pageSchema({ ...base, type: 'article', published: '2026-09-24' });

    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('글 제목');
    expect(schema.datePublished).toBe('2026-09-24');
    expect(schema.mainEntityOfPage).toBe(base.canonical);
  });

  it('목록은 WebSite 이고 사이트 이름을 쓴다 - 페이지 제목이 아니다', () => {
    const schema = pageSchema({ ...base, type: 'website' });

    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).not.toBe('글 제목');
    expect(schema.headline).toBeUndefined();
  });
});
