import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SiteDock, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import type { Award, CareerEntry, SkillGroup } from '@/features/career';
import type { Project } from '@/features/projects';

import { ResumeDocument } from '../components/resume-document';

export function ResumePage({
  lang,
  experience,
  education,
  projects,
  awards,
  skills,
  resumeHref,
}: ResumePage.Props) {
  const { t } = useTranslation('resume');

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 p-4 sm:p-6 md:p-8 print:max-w-none print:gap-0 print:p-0">
        <div className="flex items-start justify-between gap-4 print:hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>
          </div>

          <a
            href={resumeHref}
            download
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            <DownloadSimpleIcon data-icon="inline-start" />
            {t(($) => $.download.label)}
          </a>
        </div>

        <div className="border-border bg-card/40 rounded-xl border p-6 sm:p-8 print:rounded-none print:border-0 print:bg-transparent print:p-0">
          <ResumeDocument
            experience={experience}
            education={education}
            projects={projects}
            awards={awards}
            skills={skills}
          />
        </div>
      </main>

      <SiteDock
        lang={lang}
        current="resume"
        altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/resume')}
      />
    </div>
  );
}

export declare namespace ResumePage {
  export type Props = {
    lang: Language;
    experience: CareerEntry[];
    education: CareerEntry[];
    projects: Project[];
    awards: Award[];
    skills: SkillGroup[];
    resumeHref: string;
  };
}
