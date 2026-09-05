import { defineItem } from '@/common/lib';

import type { AwardItem, CareerItem } from './types';

// 헬퍼가 `index.ts` 에 있으면 eager glob 순환에서 TDZ 로 터진다.
export const defineCareer = defineItem<CareerItem>();
export const defineAward = defineItem<AwardItem>();
