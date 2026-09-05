import { localize, type Language } from '@/common/lib';

import type { Project, ProjectItem } from './types';

export { defineProject } from './define';
export { PROJECT_LINK_KINDS, PROJECT_STATUSES } from './types';
export type { Project, ProjectLinkKind, ProjectStatus } from './types';

const modules = import.meta.glob<{ default: ProjectItem }>(
  ['@/content/projects/*.ts', '@/content/projects/*/index.ts'],
  { eager: true },
);

export const PROJECT_ITEMS: ProjectItem[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default);

export function projectsOf(
  lang: Language,
  detailSlugs: ReadonlySet<string> = new Set(),
): Project[] {
  return PROJECT_ITEMS.map((item) => ({
    ...localize(item, lang),
    hasDetail: detailSlugs.has(item.slug),
  }));
}
