import { GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ExternalLink,
  SiteDock,
  buttonVariants,
} from '@/common/components';
import { dayjs, localeHref, SITE, type Language } from '@/common/lib';
import { useSiteSections } from '@/common/viewmodels';

import { RoleRotator } from '../components';

export function HomePage({ lang, updatedAt }: HomePage.Props) {
  const { t } = useTranslation('home');

  const sections = useSiteSections(lang);
  const entryClass = buttonVariants({ variant: 'outline', size: 'sm' });

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
        <header className="flex items-center gap-5">
          <Avatar className="size-20">
            <AvatarImage src="/profile.png" alt={SITE.handle} />
            <AvatarFallback>{SITE.handle}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl leading-snug font-bold tracking-tight">
              {t(($) => $.site.name, { ns: 'common' })}
            </h1>
            <div className="text-muted-foreground tracking-tight">
              <RoleRotator roles={t(($) => $.site.roles, { ns: 'common', returnObjects: true })} />
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold tracking-tight">{t(($) => $.sections.about)}</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(($) => $.site.intro, { ns: 'common' })}
          </p>
        </section>

        <nav aria-label={t(($) => $.entries.label)}>
          <ul className="flex flex-wrap gap-2">
            {sections.map(({ key, href, label, Icon }) => (
              <li key={key}>
                <a href={href} className={entryClass}>
                  <Icon data-icon="inline-start" />
                  {label}
                </a>
              </li>
            ))}

            <li>
              <ExternalLink href={SITE.github} className={entryClass}>
                <GithubLogoIcon data-icon="inline-start" />
                GitHub
              </ExternalLink>
            </li>
          </ul>
        </nav>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          {t(($) => $.footer.updated)}{' '}
          <span className="text-foreground">{dayjs(updatedAt).format('ll')}</span>
        </p>
      </main>

      <SiteDock lang={lang} altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/')} />
    </div>
  );
}

export declare namespace HomePage {
  export type Props = {
    lang: Language;
    updatedAt: string;
  };
}
