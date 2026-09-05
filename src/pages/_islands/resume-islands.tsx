import { AppProviders } from '@/common/components';
import { CareerPage } from '@/features/career';
import { ResumePage } from '@/features/resume';

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
  export type Props = CareerPage.Props;
}

export declare namespace ResumeIsland {
  export type Props = ResumePage.Props;
}
