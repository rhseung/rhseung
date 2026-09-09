import type { PostHeading } from '../models';

const FOOTNOTE_LABEL_SLUG = 'footnote-label';

export function tocHeadings(headings: readonly PostHeading[]): PostHeading[] {
  return headings.filter(({ depth, slug }) => depth >= 2 && slug !== FOOTNOTE_LABEL_SLUG);
}
