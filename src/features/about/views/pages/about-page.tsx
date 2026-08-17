import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SiteHeader, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import type { ProjectSummary } from '@/features/projects';

import { ResumeDocument } from '../components';

import type { Resume } from '../../viewmodels';

export function AboutPage({ lang, name, resume, projects, resumeHref }: AboutPage.Props) {
  const { t } = useTranslation('about');

  return (
    <div className="bg-muted/40 min-h-dvh print:bg-transparent">
      {/* 인쇄물에는 사이트 크롬이 들어가지 않는다. Tailwind `print:` 변형이면 충분하다. */}
      <div className="print:hidden">
        <SiteHeader
          lang={lang}
          current="about"
          altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/about')}
        />
      </div>

      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10 print:max-w-none print:gap-0 print:px-0 print:py-0">
        <div className="flex items-center justify-end print:hidden">
          <a
            href={resumeHref}
            download
            className={buttonVariants({ size: 'sm' })}
            aria-label={t(($) => $.download.label)}
          >
            <DownloadSimpleIcon data-icon="inline-start" />
            {t(($) => $.download.label)}
          </a>
        </div>

        <div className="bg-card border-border rounded-xl border p-8 shadow-sm sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <ResumeDocument name={name} resume={resume} projects={projects} />
        </div>
      </main>
    </div>
  );
}

export declare namespace AboutPage {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
    projects: ProjectSummary[];
    /** `bun run gen:resume`이 구워둔 PDF 경로. */
    resumeHref: string;
  };
}
