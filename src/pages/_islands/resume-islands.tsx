import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { ProjectSummary } from '@/features/projects';
import {
  AboutPage,
  AwardsPage,
  ExperiencePage,
  SkillsPage,
  type AwardSummary,
  type CareerSummary,
  type Resume,
  type SkillGroup,
} from '@/features/resume';

export function AboutIsland(props: AboutIsland.Props) {
  return (
    <AppProviders lang={props.lang}>
      <AboutPage {...props} />
    </AppProviders>
  );
}

export function CareerIsland({ lang, section, entries }: CareerIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ExperiencePage lang={lang} section={section} entries={entries} />
    </AppProviders>
  );
}

export function AwardsIsland({ lang, awards }: AwardsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <AwardsPage lang={lang} awards={awards} />
    </AppProviders>
  );
}

export function SkillsIsland({ lang, groups }: SkillsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <SkillsPage lang={lang} groups={groups} />
    </AppProviders>
  );
}

export declare namespace AboutIsland {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
    experience: CareerSummary[];
    education: CareerSummary[];
    projects: ProjectSummary[];
    awards: AwardSummary[];
    skills: SkillGroup[];
    resumeHref: string;
  };
}

export declare namespace CareerIsland {
  export type Props = {
    lang: Language;
    section: 'experience' | 'education';
    entries: CareerSummary[];
  };
}

export declare namespace AwardsIsland {
  export type Props = { lang: Language; awards: AwardSummary[] };
}

export declare namespace SkillsIsland {
  export type Props = { lang: Language; groups: SkillGroup[] };
}
