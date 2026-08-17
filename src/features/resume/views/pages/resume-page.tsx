import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SiteDock, buttonVariants } from '@/common/components';
import { localeHref, type Language, type Profile } from '@/common/lib';
import type { Award, CareerEntry, SkillGroup } from '@/features/career';
import type { Project } from '@/features/projects';

import { ResumeDocument } from '../components/resume-document';

export function ResumePage({
  lang,
  name,
  profile,
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
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 print:max-w-none print:gap-0 print:px-0 print:py-0">
        <div className="flex items-start justify-between gap-4 print:hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>
            <p className="text-muted-foreground text-sm">{t(($) => $.page.description)}</p>
          </div>

          <a
            href={resumeHref}
            download
            className={buttonVariants({ size: 'sm', variant: 'outline' })}
          >
            <DownloadSimpleIcon data-icon="inline-start" />
            {t(($) => $.download.label)}
          </a>
        </div>

        <div className="border-border bg-card/40 rounded-xl border p-6 sm:p-8 print:rounded-none print:border-0 print:bg-transparent print:p-0">
          <ResumeDocument
            name={name}
            profile={profile}
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
