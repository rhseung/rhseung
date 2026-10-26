import { defineItem } from '@/common/lib';

import type { ResearchItem } from './types';

// 헬퍼가 `index.ts` 에 있으면 eager glob 순환에서 TDZ 로 터진다.
export const defineResearch = defineItem<ResearchItem>();
