import { useState } from 'react';

import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  HouseIcon,
  ListIcon,
  MoonIcon,
  RssIcon,
  SunIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, SITE, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import { useSiteSections, useThemeTransition, type SiteSection } from '@/common/viewmodels';

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

/**
 * 화면 아래쪽 점진 블러. 아래로 갈수록 얇고 세게 겹쳐서 한 겹짜리 블러의 뚜렷한 경계선을 없앤다.
 *
 * 제일 높은 겹은 독의 윗변을 넘겨야 한다. 독은 `bottom-4`(1rem) 위에 서고 높이가 58px라
 * 윗변이 4.6rem쯤인데, 여기가 그보다 낮으면 블러 띠가 독 중간에서 끊긴다.
 */
const BLUR_LAYERS = [
  { height: '5rem', blur: '3px' },
  { height: '3.5rem', blur: '6px' },
  { height: '2.25rem', blur: '12px' },
  { height: '1rem', blur: '24px' },
];

const itemClass =
  'text-muted-foreground hover:text-foreground hover:bg-muted flex size-10 items-center justify-center rounded-full transition-colors';

export function SiteDock({ lang, current, altHref, className }: SiteDock.Props) {
  const { t } = useTranslation('common');
  const { isDark, toggleTheme } = useThemeTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];
  const sections = useSiteSections(lang);

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
      {BLUR_LAYERS.map(({ height, blur }) => (
        <div
          key={height}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-10 mask-[linear-gradient(to_top,black_0%,transparent_100%)] print:hidden"
          style={{ height, backdropFilter: `blur(${blur})` }}
        />
      ))}

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

          <Separator orientation="vertical" className="mx-0.5 hidden h-6! w-px sm:block" />

          <div className="hidden items-center gap-1 sm:flex">
            {sections.map(({ key, href, label, Icon }) => (
              <DockLink key={key} href={href} label={label} Icon={Icon} current={current === key} />
            ))}

            <Separator orientation="vertical" className="mx-0.5 h-6! w-px" />

            {external.map(({ key, href, label, Icon, blank }) => (
              <DockLink key={key} href={href} label={label} Icon={Icon} blank={blank} />
            ))}
          </div>

          <Separator orientation="vertical" className="mx-0.5 h-6! w-px" />

          {altHref && (
            <DockLink
              href={altHref}
              label={t(($) => $.actions.switchLanguage)}
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
                {sections.map(({ key, href, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      aria-current={current === key ? 'page' : undefined}
                      className="hover:bg-muted flex items-center gap-3 rounded-md p-3 text-sm"
                    >
                      <Icon aria-hidden className="size-4 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}

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
    current?: SiteSection;
    altHref?: string;
    className?: string;
  };
}
