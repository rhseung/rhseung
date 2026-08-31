import type { PostHeading } from '../models';

/** GFM 이 각주 목록 앞에 스스로 끼워 넣는 제목. */
const FOOTNOTE_LABEL_SLUG = 'footnote-label';

export function tocHeadings(headings: readonly PostHeading[]): PostHeading[] {
  return headings.filter(({ depth, slug }) => depth >= 2 && slug !== FOOTNOTE_LABEL_SLUG);
}
