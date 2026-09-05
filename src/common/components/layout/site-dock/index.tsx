import { useState } from 'react';

import { Bars3Icon, GlobeAltIcon, HomeIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolidIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, localeHref, type IconComponent, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import {
  useExternalLinks,
  useLanguageSuggestion,
  useSiteSections,
  useThemeTransition,
  type SiteSection,
} from '@/common/viewmodels';

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
import { LanguageSuggestionPopover } from '../language-suggestion-popover';

const BLUR_LAYERS = [
  { height: '5rem', blur: '3px' },
  { height: '3.5rem', blur: '6px' },
  { height: '2.25rem', blur: '12px' },
  { height: '1rem', blur: '24px' },
];

const themeIconClass = cn(
  'col-start-1 row-start-1 size-5 transition-[opacity,rotate,scale] duration-300 motion-reduce:transition-none',
);

// modifier 를 그대로 맞춰야 tailwind-merge 가 `Button` 베이스의 눌림 이동을 걷어낸다.
const itemClass = cn(
  'text-muted-foreground hover:text-foreground hover:bg-muted flex size-10 items-center justify-center rounded-full transition-colors active:not-aria-[haspopup]:translate-y-0',
);

export function SiteDock({ lang, current, altHref, className }: SiteDock.Props) {
  const { t } = useTranslation('common');
  const { mode, toggleTheme } = useThemeTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const { suggested, dismiss } = useLanguageSuggestion(lang);

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length];

  // t('theme.light') t('theme.dark')
  const themeLabel =
    mode === undefined
      ? t(($) => $.theme.toggle)
      : t(($) => $.theme.label, { mode: t(($) => $.theme[mode]) });
  const sections = useSiteSections(lang);
  const external = useExternalLinks();

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
        <div
          data-vt-dock
          className="border-border bg-background/70 flex items-center gap-1 rounded-full border p-2 backdrop-blur-md"
        >
          <DockLink
            href={localeHref(lang, '/[lang]')}
            label={t(($) => $.nav.home)}
            Icon={HomeIcon}
            IconSolid={HomeSolidIcon}
            current={current === undefined}
          />

          <Separator orientation="vertical" className="mx-0.5 hidden h-6! w-px sm:block" />

          <div className="hidden items-center gap-1 sm:flex">
            {sections.map(({ key, href, label, Icon, IconSolid }) => (
              <DockLink
                key={key}
                href={href}
                label={label}
                Icon={Icon}
                IconSolid={IconSolid}
                current={current === key}
              />
            ))}

            <Separator orientation="vertical" className="mx-0.5 h-6! w-px" />

            {external.map(({ key, href, label, Icon, blank }) => (
              <DockLink key={key} href={href} label={label} Icon={Icon} blank={blank} />
            ))}
          </div>

          <Separator orientation="vertical" className="mx-0.5 h-6! w-px" />

          {altHref && (
            <Tooltip>
              <LanguageSuggestionPopover suggested={suggested} href={altHref} onDismiss={dismiss}>
                <TooltipTrigger
                  render={
                    <a
                      href={altHref}
                      aria-label={t(($) => $.actions.switchLanguage)}
                      hrefLang={nextLanguage}
                      className={itemClass}
                    />
                  }
                >
                  <GlobeAltIcon aria-hidden className="size-5" />
                </TooltipTrigger>
              </LanguageSuggestionPopover>
              <TooltipContent>{t(($) => $.actions.switchLanguage)}</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={itemClass}
                  onClick={toggleTheme}
                  aria-label={themeLabel}
                />
              }
            >
              <ThemeIcons />
            </TooltipTrigger>
            <TooltipContent>{themeLabel}</TooltipContent>
          </Tooltip>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(itemClass, 'sm:hidden')}
                  aria-label={t(($) => $.nav.menu)}
                />
              }
            >
              <Bars3Icon className="size-5" />
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

// 두 아이콘을 겹쳐 CSS 로 굴린다. 마운트를 안 태워야 하이드레이션 전에도 맞는 그림이 나온다.
function ThemeIcons() {
  return (
    <span className={cn('grid size-5 place-items-center')}>
      <SunIcon
        aria-hidden
        className={cn(themeIconClass, 'dark:scale-50 dark:rotate-90 dark:opacity-0')}
      />
      <MoonIcon
        aria-hidden
        className={cn(
          themeIconClass,
          'scale-50 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100',
        )}
      />
    </span>
  );
}

function DockLink({ href, label, Icon, IconSolid, current, blank, hrefLang }: DockLink.Props) {
  const Rendered = current && IconSolid !== undefined ? IconSolid : Icon;

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
        <Rendered aria-hidden className="size-5" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

declare namespace DockLink {
  export type Props = {
    href: string;
    label: string;
    Icon: IconComponent;
    IconSolid?: IconComponent;
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
