import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { ExternalLink, SiteDock, buttonVariants } from '@/common/components';
import { localeHref, SITE, type Language } from '@/common/lib';
import { PostListItem, type PostSummary } from '@/features/blog';
import { ProjectCard, type ProjectSummary } from '@/features/projects';

export function HomePage({ lang, headline, intro, pinned, recent }: HomePage.Props) {
  const { t } = useTranslation('home');

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-2xl flex-col gap-12 px-4 py-16">
        <header className="flex flex-col gap-5">
          <p className="text-muted-foreground text-sm">{SITE.name[lang]}</p>
          <h1 className="text-3xl leading-snug font-semibold tracking-tight">{headline}</h1>

          <div className="flex flex-wrap gap-2">
            <a href={localeHref(lang, '/projects')} className={buttonVariants({ size: 'sm' })}>
              {t(($) => $.hero.projects)}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <ExternalLink
              href={SITE.github}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <GithubLogoIcon data-icon="inline-start" />
              GitHub
            </ExternalLink>
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
                    href={localeHref(post.lang, `/blog/${post.slug}`)}
                    showLanguage={post.lang !== lang}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-border flex flex-col gap-3 border-t pt-8">
          <h2 className="text-sm font-medium tracking-tight">{t(($) => $.sections.intro)}</h2>
          {intro && <p className="text-muted-foreground text-sm leading-relaxed">{intro}</p>}

          <a
            href={localeHref(lang, '/about')}
            className="text-muted-foreground hover:text-foreground text-sm hover:underline"
          >
            {t(($) => $.sections.about)}
          </a>
        </section>
      </main>

      <SiteDock lang={lang} altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/')} />
    </div>
  );
}

export declare namespace HomePage {
  export type Props = {
    lang: Language;
    headline: string;
    intro?: string;
    pinned: ProjectSummary[];
    recent: PostSummary[];
  };
}
