import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { ProjectSummary } from '@/features/projects';
import {
  CareerPage,
  ResumePage,
  type AwardSummary,
  type CareerSummary,
  type Resume,
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
    experience: CareerSummary[];
    education: CareerSummary[];
    awards: AwardSummary[];
    skills: SkillGroup[];
  };
}

export declare namespace ResumeIsland {
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
