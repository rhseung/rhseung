import { describe, expect, it } from 'vitest';

import { tocHeadings } from './select-headings';

import type { PostHeading } from '../models';

const heading = (depth: number, slug: string): PostHeading => ({ depth, slug, text: slug });

describe('tocHeadings', () => {
  it('h2·h3 만 남긴다', () => {
    const headings = [
      heading(1, 'title'),
      heading(2, 'setup'),
      heading(3, 'chrome'),
      heading(4, 'detail'),
    ];

    expect(tocHeadings(headings).map((h) => h.slug)).toEqual(['setup', 'chrome']);
  });

  it('GFM 각주 라벨은 뺀다', () => {
    const headings = [heading(2, 'notes'), heading(2, 'footnote-label')];

    expect(tocHeadings(headings).map((h) => h.slug)).toEqual(['notes']);
  });

  it('본문 순서를 그대로 둔다', () => {
    const headings = [heading(3, 'b'), heading(2, 'a')];

    expect(tocHeadings(headings).map((h) => h.slug)).toEqual(['b', 'a']);
  });
});
