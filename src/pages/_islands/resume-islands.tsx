import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { Project } from '@/features/projects';
import {
  CareerPage,
  ResumePage,
  type Award,
  type CareerEntry,
  type Profile,
  type SkillGroup,
} from '@/features/resume';

export function CareerIsland({ lang, experience, education, awards, skills }: CareerIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <CareerPage
        lang={lang}
        experience={experience}
        education={education}
        awards={awards}
        skills={skills}
      />
    </AppProviders>
  );
}

export function ResumeIsland(props: ResumeIsland.Props) {
  return (
    <AppProviders lang={props.lang}>
      <ResumePage {...props} />
    </AppProviders>
  );
}

export declare namespace CareerIsland {
  export type Props = {
    lang: Language;
    experience: CareerEntry[];
    education: CareerEntry[];
    awards: Award[];
    skills: SkillGroup[];
  };
}

export declare namespace ResumeIsland {
  export type Props = {
    lang: Language;
    name: string;
    profile: Profile;
    experience: CareerEntry[];
    education: CareerEntry[];
    projects: Project[];
    awards: Award[];
    skills: SkillGroup[];
    resumeHref: string;
  };
}
