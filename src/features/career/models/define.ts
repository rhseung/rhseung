import type { AwardItem, CareerItem } from './types';

// 헬퍼가 `index.ts` 에 있으면 eager glob 순환에서 TDZ 로 터진다.
export const defineCareer = (item: CareerItem) => item;
/** `slug` 를 리터럴로 붙잡아 둔다. */
export const defineAward = <Slug extends string>(item: AwardItem & { slug: Slug }) => item;
