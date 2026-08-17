import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { AboutPage, type Resume } from '@/features/about';

export function AboutIsland({ lang, name, resume, resumeHref }: AboutIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <AboutPage lang={lang} name={name} resume={resume} resumeHref={resumeHref} />
    </AppProviders>
  );
}

export declare namespace AboutIsland {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
    resumeHref: string;
  };
}
