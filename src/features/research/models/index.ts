import type { Language } from '@/common/lib';

import type { Research, ResearchItem } from './types';

export { defineResearch } from './define';
export { RESEARCH_KINDS, RESEARCH_KIND_TONE, RESEARCH_LINK_KINDS } from './types';
export type { Research, ResearchKind, ResearchLinkKind } from './types';

const modules = import.meta.glob<{ default: ResearchItem }>('@/content/research/*.ts', {
  eager: true,
});

export const RESEARCH_ITEMS: ResearchItem[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default);

export function researchOf(lang: Language): Research[] {
  return RESEARCH_ITEMS.map(({ ko, en, ...rest }) => ({
    ...rest,
    ...(lang === 'en' ? en : ko),
  }));
}
