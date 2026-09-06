import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  html: {
    overscrollBehavior: 'none',
    '--global-font-body': '{fonts.body}',
    '--global-color-border': '{colors.line}',
  },
  '*': { outlineColor: '{colors.focus/50}' },
  body: {
    bg: 'surface',
    color: 'text',
    pb: '28',
    fontFamily: 'body',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    _print: { pb: '0' },
  },
  'code, kbd, pre, samp': { fontFeatureSettings: "'calt' 1, 'liga' 1" },

  'html[data-theme-transition]::view-transition-group(root), html[data-theme-transition]::view-transition-old(root), html[data-theme-transition]::view-transition-new(root)':
    { animation: 'none', mixBlendMode: 'normal' },
  'html[data-theme-transition]::view-transition-old(root)': { zIndex: 0 },
  'html[data-theme-transition]::view-transition-new(root)': { zIndex: 1 },
  'html:not([data-theme-transition]) [data-vt-dock]': { viewTransitionName: 'dock' },
  '::view-transition-old(root)': { animation: '100ms cubic-bezier(0.4, 0, 1, 1) both vtExitLeft' },
  '::view-transition-new(root)': {
    animation: '260ms 100ms cubic-bezier(0.33, 1, 0.68, 1) both vtEnterRight',
  },
  "html[data-vt='shallower']::view-transition-old(root)": { animationName: 'vtExitRight' },
  "html[data-vt='shallower']::view-transition-new(root)": { animationName: 'vtEnterLeft' },
  '::view-transition-group(dock), ::view-transition-old(dock), ::view-transition-new(dock)': {
    animationDuration: '360ms',
  },
  '::view-transition-group(entry-title)': {
    animationDuration: '360ms',
    animationTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
  },
  '::view-transition-old(entry-title), ::view-transition-new(entry-title)': {
    blockSize: '100%',
    objectFit: 'contain',
    objectPosition: 'left top',
  },
  '::view-transition-old(entry-title)': {
    animationDuration: '100ms',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
    animationFillMode: 'both',
  },
  '::view-transition-new(entry-title)': {
    animationDuration: '260ms',
    animationDelay: '100ms',
    animationTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
    animationFillMode: 'both',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)': {
      animationDuration: '1ms !important',
    },
  },
});
