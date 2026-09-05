import { byStartDesc } from '@/common/lib';

import type { Research } from '../models';

export function sortResearch(items: readonly Research[]): Research[] {
  return [...items].sort(byStartDesc);
}
