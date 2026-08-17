import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SiteHeader, buttonVariants } from '@/common/components';
import { localeHref, SITE, type Language } from '@/common/lib';
import { PostListItem, type PostSummary } from '@/features/blog';
import { ProjectCard, type ProjectSummary } from '@/features/projects';

/**
 * 홈은 분야를 나열하지 않는다. 넓이는 pinned 세 개가 서로 다른 도메인이라는 배치가 증명한다 —
 * `Frontend / Backend / Systems / Graphics` 4단 그리드가 정확히 잡탕의 시각적 형태다.
 */
export function HomePage({ lang, headline, pinned, recent }: HomePage.Props) {
  const { t } = useTranslation('home');

  return (
    <div className="bg-background min-h-dvh">
      <SiteHeader lang={lang} altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/')} />

      <main className="mx-auto flex max-w-2xl flex-col gap-12 px-4 py-16">
        <header className="flex flex-col gap-5">
          <p className="text-muted-foreground text-sm">{SITE.name[lang]}</p>
          <h1 className="text-3xl leading-snug font-semibold tracking-tight">{headline}</h1>

          <div className="flex flex-wrap gap-2">
            <a href={localeHref(lang, '/projects')} className={buttonVariants({ size: 'sm' })}>
              {t(($) => $.hero.projects)}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <GithubLogoIcon data-icon="inline-start" />
              GitHub
            </a>
          </div>
        </header>

        {pinned.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium tracking-tight">{t(($) => $.sections.projects)}</h2>

            <ul className="flex flex-col gap-4">
              {pinned.map((project) => (
                <li key={project.slug}>
                  <ProjectCard
                    project={project}
                    detailHref={localeHref(lang, `/projects/${project.slug}`)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {recent.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium tracking-tight">{t(($) => $.sections.posts)}</h2>

            <ul className="flex flex-col gap-6">
              {recent.map((post) => (
                <li key={post.slug}>
                  <PostListItem
                    post={post}
                    href={`/blog/${post.slug}`}
                    showLanguage={post.lang !== lang}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <a
          href={localeHref(lang, '/about')}
          className="text-muted-foreground hover:text-foreground text-sm hover:underline"
        >
          {t(($) => $.sections.about)}
        </a>
      </main>
    </div>
  );
}

export declare namespace HomePage {
  export type Props = {
    lang: Language;
    /** 이력서 yaml의 headline을 그대로 쓴다 — 포지셔닝 문장이 두 군데로 갈리지 않게. */
    headline: string;
    pinned: ProjectSummary[];
    recent: PostSummary[];
  };
}
