import { DownloadSimpleIcon, EnvelopeSimpleIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SiteHeader, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import type { Resume } from '../../viewmodels';

export function AboutPage({ lang, name, resume, resumeHref }: AboutPage.Props) {
  const { t } = useTranslation('about');

  return (
    <div className="bg-background min-h-dvh">
      <SiteHeader
        lang={lang}
        current="about"
        altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/about')}
      />

      <main className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-12">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
          <p className="text-muted-foreground">{resume.headline}</p>
          {resume.intro && <p className="text-sm leading-relaxed">{resume.intro}</p>}
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-tight">{t(($) => $.contact.title)}</h2>

          <ul className="flex flex-wrap gap-2">
            <li>
              <a
                href={`mailto:${resume.contact.email}`}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                <EnvelopeSimpleIcon data-icon="inline-start" />
                {resume.contact.email}
              </a>
            </li>
            <li>
              <a
                href={resume.contact.github}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                <GithubLogoIcon data-icon="inline-start" />
                {resume.contact.github.replace('https://', '')}
              </a>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium tracking-tight">{t(($) => $.resume.title)}</h2>

            <a
              href={resumeHref}
              download
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <DownloadSimpleIcon data-icon="inline-start" />
              {t(($) => $.contact.download)}
            </a>
          </div>

          {/*
            `<object>`는 폴백이 자식으로 들어간다 — iOS Safari처럼 PDF를 인라인으로 못 그리는
            환경에서 뷰어 대신 이 링크가 나온다. `<iframe>`엔 그 장치가 없다.
            A4 비율(1:√2)을 고정해야 로드 전에 레이아웃이 튀지 않는다.
          */}
          <object
            data={resumeHref}
            type="application/pdf"
            aria-label={t(($) => $.resume.title)}
            className="border-border aspect-[1/1.414] w-full rounded-md border"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-muted-foreground text-sm">{t(($) => $.resume.fallback)}</p>
              <a href={resumeHref} className={buttonVariants({ size: 'sm' })}>
                <DownloadSimpleIcon data-icon="inline-start" />
                {t(($) => $.contact.download)}
              </a>
            </div>
          </object>
        </section>
      </main>
    </div>
  );
}

export declare namespace AboutPage {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
    /** `bun run gen:resume`이 구워둔 PDF 경로. */
    resumeHref: string;
  };
}
