import { AppProviders } from '@/common/components';
import { CareerPage } from '@/features/career';

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

export declare namespace CareerIsland {
  export type Props = CareerPage.Props;
}
