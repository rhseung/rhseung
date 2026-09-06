import { useState } from 'react';

import { Bars3Icon, GlobeAltIcon, HomeIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolidIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import {
  LANGUAGES,
  localeHref,
  localeHrefOf,
  otherLanguages,
  type IconComponent,
  type Language,
  type LocaleRouteRef,
} from '@/common/lib';
import {
  useExternalLinks,
  useLanguageSuggestion,
  useSiteSections,
  useThemeTransition,
  type SiteSection,
} from '@/common/viewmodels';

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

const blurLayer = css({
  pointerEvents: 'none',
  position: 'fixed',
  insetX: '0',
  bottom: '0',
  zIndex: 'blur',
  maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
  _print: { display: 'none' },
});

const nav = css({
  position: 'fixed',
  insetX: '0',
  bottom: '4',
  zIndex: 'dock',
  display: 'flex',
  justifyContent: 'center',
  px: '4',
  _print: { display: 'none' },
});

const bar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  rounded: 'full',
  border: 'line',
  bg: 'surface/70',
  p: '2',
  backdropBlur: 'md',
});

const item = css({
  display: 'flex',
  boxSize: '10',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'full',
  color: 'text.muted',
  transition: 'colors',
  outlineStyle: 'none',
  _hover: { color: 'text', bg: 'surface.muted' },
  _focusVisible: { boxShadow: 'focus' },
  '&[aria-current=page]': { color: 'text', bg: 'surface.muted' },
});

const icon = css({ boxSize: '5' });

const desktopOnly = css({
  display: 'none',
  sm: { display: 'flex', alignItems: 'center', gap: '1' },
});
const mobileOnly = css({ sm: { display: 'none' } });

const divider = css({ mx: '0.5', h: '6', w: '[1px]', flexShrink: 0, bg: 'line' });

const menu = css({ display: 'flex', flexDirection: 'column', px: '4' });

const menuLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  rounded: 'md',
  p: '3',
  textStyle: 'sm',
  _hover: { bg: 'surface.muted' },
  '& svg': { boxSize: '4', flexShrink: 0 },
});

const muted = css({ color: 'text.muted' });
const srOnly = css({ srOnly: true });
const sheetBody = css({ pb: '8' });

export function SiteDock({
  lang,
  current,
  route,
  available = LANGUAGES,
  className,
}: SiteDock.Props) {
  const { t } = useTranslation('common');
  const { mode, toggleTheme } = useThemeTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const { suggested, dismiss } = useLanguageSuggestion(lang);

  const alternates =
    route === undefined
      ? []
      : otherLanguages(lang)
          .filter((other) => available.includes(other))
          .map((other) => ({ lang: other, href: localeHrefOf(other, route) }));

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
          className={blurLayer}
          style={{ height, backdropFilter: `blur(${blur})` }}
        />
      ))}

      <nav aria-label={t(($) => $.nav.label)} className={cx(nav, className)}>
        <div data-vt-dock className={bar}>
          <DockLink
            href={localeHref(lang, '/[lang]')}
            label={t(($) => $.nav.home)}
            Icon={HomeIcon}
            IconSolid={HomeSolidIcon}
            current={current === undefined}
          />

          <div className={desktopOnly}>
            <DockDivider />

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

            <DockDivider />

            {external.map(({ key, href, label, Icon, blank }) => (
              <DockLink key={key} href={href} label={label} Icon={Icon} blank={blank} />
            ))}
          </div>

          <DockDivider />

          {alternates.map(({ lang: other, href }) => (
            <Tooltip key={other}>
              <LanguageSuggestionPopover
                suggested={other === suggested ? suggested : null}
                href={href}
                onDismiss={dismiss}
              >
                <TooltipTrigger
                  render={
                    <a
                      href={href}
                      aria-label={t(($) => $.actions.switchLanguage)}
                      hrefLang={other}
                      className={item}
                    />
                  }
                >
                  <GlobeAltIcon aria-hidden className={icon} />
                </TooltipTrigger>
              </LanguageSuggestionPopover>
              <TooltipContent>{t(($) => $.actions.switchLanguage)}</TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  className={item}
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
                <button
                  type="button"
                  className={cx(item, mobileOnly)}
                  aria-label={t(($) => $.nav.menu)}
                />
              }
            >
              <Bars3Icon aria-hidden className={icon} />
            </SheetTrigger>

            <SheetContent side="bottom" className={sheetBody}>
              <SheetHeader>
                <SheetTitle>{t(($) => $.nav.menu)}</SheetTitle>
                <SheetDescription className={srOnly}>{t(($) => $.nav.label)}</SheetDescription>
              </SheetHeader>

              <ul className={menu}>
                {sections.map(({ key, href, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      aria-current={current === key ? 'page' : undefined}
                      className={menuLink}
                    >
                      <Icon aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}

                {external.map(({ key, href, label, Icon, blank }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(blank ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className={cx(menuLink, muted)}
                    >
                      <Icon aria-hidden />
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

function DockDivider() {
  return <span role="separator" aria-orientation="vertical" className={divider} />;
}

const themeIconStack = css({ display: 'grid', boxSize: '5', placeItems: 'center' });

const themeIcon = css({
  gridColumnStart: 1,
  gridRowStart: 1,
  boxSize: '5',
  transitionProperty: '[opacity, rotate, scale]',
  transitionDuration: 'slow',
  _motionReduce: { transitionProperty: '[none]' },
});

const sun = css({ _dark: { scale: '[0.5]', rotate: '[90deg]', opacity: 0 } });
const moon = css({
  scale: '[0.5]',
  rotate: '[-90deg]',
  opacity: 0,
  _dark: { scale: '[1]', rotate: '[0deg]', opacity: 1 },
});

// 두 아이콘을 겹쳐 CSS 로 굴린다. 마운트를 안 태워야 하이드레이션 전에도 맞는 그림이 나온다.
function ThemeIcons() {
  return (
    <span className={themeIconStack}>
      <SunIcon aria-hidden className={cx(themeIcon, sun)} />
      <MoonIcon aria-hidden className={cx(themeIcon, moon)} />
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
            className={item}
          />
        }
      >
        <Rendered aria-hidden className={icon} />
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
    route?: LocaleRouteRef;
    available?: readonly Language[];
    className?: string;
  };
}
