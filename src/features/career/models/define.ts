import type { AwardItem, CareerItem } from './types';

// 항목 파일이 이걸 import 하고, `index.ts`가 항목 파일을 glob 한다. 헬퍼가 `index.ts`에
// 있으면 그 순환에서 TDZ 로 터진다 — Vite 가 eager glob 을 파일 맨 위 정적 import 로 끌어올린다.
export const defineCareer = (item: CareerItem) => item;
/** `slug` 를 리터럴로 붙잡아 둔다 - 프로젝트가 `awards: [axChallenge.slug]` 로 참조한다. */
export const defineAward = <Slug extends string>(item: AwardItem & { slug: Slug }) => item;
