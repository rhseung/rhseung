import type { Language } from '@/common/lib';

import type { Research, ResearchItem } from './types';

export { defineResearch } from './define';
export { RESEARCH_KINDS, RESEARCH_KIND_TONE, RESEARCH_LINK_KINDS } from './types';
export type { Research, ResearchKind, ResearchLinkKind } from './types';

const modules = import.meta.glob<{ default: ResearchItem }>(
  ['@/content/research/*.ts', '@/content/research/*/index.ts'],
  { eager: true },
);

export const RESEARCH_ITEMS: ResearchItem[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default);

// 본문이 있는지는 `paper.tex` 가 있는지로 정한다. 파일이 곧 hasPaper 다 - 항목에
// 플래그를 두면 파일과 어긋날 수 있다.
export const PAPER_SLUGS = new Set(
  Object.keys(import.meta.glob('@/content/research/*/paper.tex', { query: '?raw' })).map(
    (path) => path.split('/').at(-2) ?? '',
  ),
);

export function researchOf(lang: Language): Research[] {
  return RESEARCH_ITEMS.map(({ ko, en, ...rest }) => ({
    ...rest,
    ...(lang === 'en' ? en : ko),
  }));
}
