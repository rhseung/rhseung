import { byStartDesc } from '@/common/lib';

import { RESEARCH_LINK_KINDS, type Research, type ResearchLinkKind } from '../models';

export function sortResearch(items: readonly Research[]): Research[] {
  return [...items].sort(byStartDesc);
}

export function researchLinks(item: Research): { kind: ResearchLinkKind; href: string }[] {
  return RESEARCH_LINK_KINDS.flatMap((kind) => {
    const href = item.links?.[kind];
    return href ? [{ kind, href }] : [];
  });
}
