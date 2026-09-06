import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';

import { SiteDock, buttonVariants } from '@/common/components';
import { type Language } from '@/common/lib';
import { page } from '@/common/styles';
import type { Award, CareerEntry, SkillGroup } from '@/features/career';
import type { Project } from '@/features/projects';

import { ResumeDocument } from '../components/resume-document';

const main = css(page.raw().main, { _print: { maxW: '[none]', gap: '0', p: '0' } });
const head = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '4',
  _print: { display: 'none' },
});
const title = css({ textStyle: 'heading.page' });
const sheet = css({
  rounded: 'xl',
  border: 'line',
  bg: 'surface.raised/40',
  p: '6',
  sm: { p: '8' },
  _print: { rounded: 'none', border: 'none', bg: 'transparent', p: '0' },
});

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
  const shell = page();

  return (
    <div className={shell.root}>
      <main className={main}>
        <div className={head}>
          <h1 className={title}>{t(($) => $.page.title)}</h1>

          <a
            href={resumeHref}
            download
            className={buttonVariants({ size: 'sm', variant: 'outline' })}
          >
            <ArrowDownTrayIcon data-icon="inline-start" />
            {t(($) => $.download.label)}
          </a>
        </div>

        <div className={sheet}>
          <ResumeDocument
            experience={experience}
            education={education}
            projects={projects}
            awards={awards}
            skills={skills}
          />
        </div>
      </main>

      <SiteDock lang={lang} current="resume" route={{ to: '/[lang]/resume' }} />
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
