import { useState } from 'react';

import {
  BriefcaseIcon,
  EnvelopeSimpleIcon,
  FolderIcon,
  GithubLogoIcon,
  GlobeIcon,
  HouseIcon,
  IdentificationCardIcon,
  ListIcon,
  MoonIcon,
  NotePencilIcon,
  RssIcon,
  SunIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, SITE, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import { useThemeTransition } from '@/common/viewmodels';

import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

const SECTIONS = ['projects', 'blog', 'career', 'resume'] as const;

type Section = (typeof SECTIONS)[number];

const SECTION_ICON: Record<Section, Icon> = {
  projects: FolderIcon,
  blog: NotePencilIcon,
  career: BriefcaseIcon,
  resume: IdentificationCardIcon,
};

const itemClass =
  'text-muted-foreground hover:text-foreground hover:bg-muted flex size-10 items-center justify-center rounded-full transition-colors';

export function SiteDock({ lang, current, altHref, className }: SiteDock.Props) {
  const { t } = useTranslation('common');
  const { isDark, toggleTheme } = useThemeTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];

  const sectionLabel = Object.fromEntries(
    SECTIONS.map((key) => [key, t(($) => $.nav[key])]),
  ) as Record<Section, string>;

  const external = [
    { key: 'github', href: SITE.github, label: 'GitHub', Icon: GithubLogoIcon, blank: true },
    {
      key: 'email',
      href: `mailto:${SITE.email}`,
      label: t(($) => $.footer.email),
      Icon: EnvelopeSimpleIcon,
      blank: false,
    },
    { key: 'rss', href: '/rss.xml', label: 'RSS', Icon: RssIcon, blank: false },
  ];

  return (
    <TooltipProvider>
      {/* 높이 = `bottom-4` + 독 높이의 절반. 독에 직접 걸면 원형 테두리에서 뚝 끊긴다. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-[2.8rem] mask-[linear-gradient(to_top,black_70%,transparent)] backdrop-blur-sm print:hidden"
      />

      <nav
        aria-label={t(($) => $.nav.label)}
        className={cn(
          'fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 print:hidden',
          className,
        )}
      >
        <div className="border-border bg-background/70 flex items-center gap-1 rounded-full border p-2 shadow-lg backdrop-blur-md">
          <DockLink
            href={localeHref(lang, '/')}
            label={t(($) => $.nav.home)}
            Icon={HouseIcon}
            current={current === undefined}
          />

          <Separator orientation="vertical" className="mx-0.5 hidden !h-6 sm:block" />

          <div className="hidden items-center gap-1 sm:flex">
            {SECTIONS.map((section) => (
              <DockLink
                key={section}
                href={localeHref(lang, `/${section}`)}
                label={sectionLabel[section]}
                Icon={SECTION_ICON[section]}
                current={current === section}
              />
            ))}

            <Separator orientation="vertical" className="mx-0.5 !h-6" />

            {external.map(({ key, href, label, Icon, blank }) => (
              <DockLink key={key} href={href} label={label} Icon={Icon} blank={blank} />
            ))}
          </div>

          <Separator orientation="vertical" className="mx-0.5 !h-6" />

          {altHref && (
            <DockLink
              href={altHref}
              label={`${nextLanguage.toUpperCase()} — ${t(($) => $.actions.switchLanguage)}`}
              Icon={GlobeIcon}
              hrefLang={nextLanguage}
            />
          )}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-10 rounded-full"
                  onClick={toggleTheme}
                  aria-label={t(($) => $.actions.toggleTheme)}
                />
              }
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </TooltipTrigger>
            <TooltipContent>{t(($) => $.actions.toggleTheme)}</TooltipContent>
          </Tooltip>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-10 rounded-full sm:hidden"
                  aria-label={t(($) => $.nav.menu)}
                />
              }
            >
              <ListIcon />
            </SheetTrigger>

            <SheetContent side="bottom" className="pb-8">
              <SheetHeader>
                <SheetTitle>{t(($) => $.nav.menu)}</SheetTitle>
                <SheetDescription className="sr-only">{t(($) => $.nav.label)}</SheetDescription>
              </SheetHeader>

              <ul className="flex flex-col px-4">
                {SECTIONS.map((section) => {
                  const SectionIcon = SECTION_ICON[section];
                  return (
                    <li key={section}>
                      <a
                        href={localeHref(lang, `/${section}`)}
                        aria-current={current === section ? 'page' : undefined}
                        className="hover:bg-muted flex items-center gap-3 rounded-md p-3 text-sm"
                      >
                        <SectionIcon aria-hidden className="size-4 shrink-0" />
                        {sectionLabel[section]}
                      </a>
                    </li>
                  );
                })}

                {external.map(({ key, href, label, Icon, blank }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(blank ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="text-muted-foreground hover:bg-muted flex items-center gap-3 rounded-md p-3 text-sm"
                    >
                      <Icon aria-hidden className="size-4 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </TooltipProvider>
  );
}

function DockLink({ href, label, Icon, current, blank, hrefLang }: DockLink.Props) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={href}
            aria-label={label}
            aria-current={current ? 'page' : undefined}
            hrefLang={hrefLang}
            {...(blank ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className={cn(itemClass, current && 'text-foreground bg-muted')}
          />
        }
      >
        <Icon aria-hidden weight={current ? 'fill' : 'regular'} className="size-5" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

declare namespace DockLink {
  export type Props = {
    href: string;
    label: string;
    Icon: Icon;
    current?: boolean;
    blank?: boolean;
    hrefLang?: string;
  };
}

export declare namespace SiteDock {
  export type Props = {
    lang: Language;
    current?: Section;
    altHref?: string;
    className?: string;
  };
}
