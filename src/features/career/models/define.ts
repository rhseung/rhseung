import type { AwardItem, CareerItem, SkillGroupItem } from './types';

// 항목 파일이 이걸 import 하고, `index.ts`가 항목 파일을 glob 한다. 헬퍼가 `index.ts`에
// 있으면 그 순환에서 TDZ 로 터진다 — Vite 가 eager glob 을 파일 맨 위 정적 import 로 끌어올린다.
export const defineCareer = (item: CareerItem) => item;
export const defineAward = (item: AwardItem) => item;
export const defineSkillGroup = (item: SkillGroupItem) => item;
