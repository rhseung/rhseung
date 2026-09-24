import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';
import { awardsOf, educationOf, experienceOf, skillGroupsOf } from '@/features/career';
import { projectsOf, sortProjects } from '@/features/projects';

import { ResumePage } from '../components';

export function ResumeView({ lang, detailSlugs }: ResumeView.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <ResumePage
        experience={experienceOf(lang)}
        education={educationOf(lang)}
        projects={sortProjects(projectsOf(lang, detailSlugs))}
        awards={awardsOf(lang)}
        skills={skillGroupsOf(lang)}
        resumeHref={`/resume-${lang}.pdf`}
      />
    </I18nextProvider>
  );
}

export declare namespace ResumeView {
  export type Props = { lang: Language; detailSlugs: ReadonlySet<string> };
}
