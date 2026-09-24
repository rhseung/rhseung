import type { LocaleRoute } from './href';

type SectionKey<R = LocaleRoute> = R extends `/[lang]/${infer K}` ? K : never;

export const SITE_SECTIONS = [
  'projects',
  'research',
  'blog',
  'career',
  'resume',
] as const satisfies readonly SectionKey[];

export type SiteSection = (typeof SITE_SECTIONS)[number];

export function sectionOf(route: LocaleRoute): SiteSection | undefined {
  const key = route.slice('/[lang]/'.length).split('/')[0];

  return SITE_SECTIONS.find((section) => section === key);
}
