import { useState } from 'react';

import {
  GlobeIcon,
  HouseIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, localeHref, type Language } from '@/common/lib';
import { cn } from '@/common/utils';
import {
  useExternalLinks,
  useLanguageSuggestion,
  useMediaQuery,
  useSiteSections,
  useThemeTransition,
  type SiteSection,
} from '@/common/viewmodels';

import { Alert } from '../../ui/alert';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
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
import { LanguageSuggestion } from '../language-suggestion';

/**
 * 제일 높은 겹은 독의 윗변을 넘겨야 한다. 독은 `bottom-4`(1rem) 위에 서고 높이가 58px라
 * 윗변이 4.6rem쯤인데, 여기가 그보다 낮으면 블러 띠가 독 중간에서 끊긴다.
 */
const BLUR_LAYERS = [
  { height: '5rem', blur: '3px' },
  { height: '3.5rem', blur: '6px' },
  { height: '2.25rem', blur: '12px' },
  { height: '1rem', blur: '24px' },
];

/** Tailwind의 `sm` 경계. 이 아래에서는 언어 버튼이 시트 안으로 숨어서 팝오버를 걸 자리가 없다. */
const COMPACT_QUERY = '(max-width: 39.99rem)';

const themeIconClass = cn(
  'col-start-1 row-start-1 size-5 transition-[opacity,rotate,scale] duration-300 motion-reduce:transition-none',
);

// `active:...translate-y-0` 은 `Button` 베이스의 눌림 이동을 끈다. 독에서는 링크와 버튼이
// 한 줄에 서는데 버튼만 내려앉으면 줄이 어긋난다. modifier 를 그대로 맞춰야 tailwind-merge 가
// 앞엣것을 걷어낸다.
const itemClass = cn(
  'text-muted-foreground hover:text-foreground hover:bg-muted flex size-10 items-center justify-center rounded-full transition-colors active:not-aria-[haspopup]:translate-y-0',
);

export function SiteDock({ lang, current, altHref, className }: SiteDock.Props) {
  const { t } = useTranslation('common');
  const { mode, toggleTheme } = useThemeTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCompact = useMediaQuery(COMPACT_QUERY);
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
            <Popover
              open={suggested !== null && !isCompact}
              onOpenChange={(open) => {
                if (!open) dismiss();
              }}
            >
              <Tooltip>
                <TooltipTrigger
                  render={
                    <PopoverTrigger
                      // 트리거가 버튼이 아니라 링크다 - 언어 페이지로 실제 이동해야 하니
                      // `<a>`를 써야 한다. 기본값(true)이면 Base UI가 매 렌더 콘솔에 경고를 낸다.
                      nativeButton={false}
                      render={
                        <a
                          href={altHref}
                          aria-label={t(($) => $.actions.switchLanguage)}
                          hrefLang={nextLanguage}
                          className={itemClass}
                        />
                      }
                    />
                  }
                >
                  <GlobeIcon aria-hidden className="size-5" />
                </TooltipTrigger>
                <TooltipContent>{t(($) => $.actions.switchLanguage)}</TooltipContent>
              </Tooltip>

              {suggested !== null && (
                <PopoverContent
                  side="top"
                  align="center"
                  sideOffset={8}
                  // 팝오버는 `document.body`로 포탈돼서 독의 `print:hidden` 밖으로 빠져나간다.
                  // 안 걸면 이력서 PDF 머리에 언어 제안이 그대로 찍힌다.
                  className="w-auto max-w-80 p-4 print:hidden"
                  aria-label={t(($) => $.actions.switchLanguage)}
                >
                  <LanguageSuggestion language={suggested} href={altHref} onDismiss={dismiss} />
                </PopoverContent>
              )}
            </Popover>
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
              <ListIcon className="size-5" />
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

      {altHref && suggested !== null && isCompact && (
        // 좁은 화면에서는 언어 버튼이 시트 안에 있어서 붙일 자리가 없다. 독 위에 띄운다.
        <Alert className="fixed inset-x-4 bottom-22 z-20 w-auto shadow-lg print:hidden">
          <LanguageSuggestion language={suggested} href={altHref} onDismiss={dismiss} />
        </Alert>
      )}
    </TooltipProvider>
  );
}

// `.dark` 는 첫 페인트 전에 이미 붙어 있다. 두 아이콘을 겹쳐 두고 CSS 로 굴리면 마운트를
// 안 태워서 하이드레이션 전에도 맞는 그림이 나오고, 나가는 아이콘을 손으로 붙잡을 일도 없다.
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
