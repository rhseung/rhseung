import { DEFAULT_LANGUAGE, type Language } from '@/common/lib';

import { PROJECTS } from './data';
import { projectsTextEN } from './text.en';
import { projectsTextKO } from './text.ko';

import type { Project, ProjectsText } from './types';

export { PROJECT_DOMAINS, PROJECT_STATUSES } from './types';
export type { Project, ProjectDomain, ProjectStatus } from './types';

const TEXT: Record<Language, ProjectsText> = { ko: projectsTextKO, en: projectsTextEN };

/** `detailSlugs`는 그 언어로 MDX 본문이 있는 슬러그 — 라우트가 실제 있는 것만. */
export function projectsOf(
  lang: Language,
  detailSlugs: ReadonlySet<string> = new Set(),
): Project[] {
  const text = TEXT[lang] ?? TEXT[DEFAULT_LANGUAGE];

  return PROJECTS.map((project) => ({
    ...project,
    ...text[project.slug],
    hasDetail: detailSlugs.has(project.slug),
  }));
}
