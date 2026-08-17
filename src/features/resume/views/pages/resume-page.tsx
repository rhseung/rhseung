import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import type { ProjectSummary } from '@/features/projects';

import { ResumeDocument } from '../components';

import type { AwardSummary, CareerSummary, Resume, SkillGroup } from '../../viewmodels';

export function ResumePage({
  lang,
  name,
  resume,
  experience,
  education,
  projects,
  awards,
  skills,
  resumeHref,
}: ResumePage.Props) {
  const { t } = useTranslation('resume');

  return (
    <div className="bg-muted/40 min-h-dvh print:bg-transparent">
      <div className="print:hidden"></div>

      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10 print:max-w-none print:gap-0 print:px-0 print:py-0">
        <div className="flex items-center justify-end print:hidden">
          <a href={resumeHref} download className={buttonVariants({ size: 'sm' })}>
            <DownloadSimpleIcon data-icon="inline-start" />
            {t(($) => $.download.label)}
          </a>
        </div>

        <div className="bg-card border-border rounded-xl border p-8 shadow-sm sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <ResumeDocument
            name={name}
            resume={resume}
            experience={experience}
            education={education}
            projects={projects}
            awards={awards}
            skills={skills}
            detailHref={(_section, slug) => localeHref(lang, `/career/${slug}`)}
          />
        </div>
      </main>
    </div>
  );
}

export declare namespace ResumePage {
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
