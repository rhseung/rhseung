import type { PostHeading } from '../models';

/** GFM 이 각주 목록 앞에 스스로 끼워 넣는 제목. 본문 절이 아니라 부록 라벨이다. */
const FOOTNOTE_LABEL_SLUG = 'footnote-label';

/**
 * h1 은 페이지 제목이 이미 맡고 있어 목차에 넣으면 자기 자신을 가리킨다. h4 아래는
 * 항목 수가 본문 분량을 따라가서 목차가 두 번째 본문이 된다.
 */
export function tocHeadings(headings: readonly PostHeading[]): PostHeading[] {
  return headings.filter(
    ({ depth, slug }) => depth >= 2 && depth <= 3 && slug !== FOOTNOTE_LABEL_SLUG,
  );
}
