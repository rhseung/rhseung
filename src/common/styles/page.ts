import { sva } from 'styled-system/css';

const frame = {
  mx: 'auto',
  w: 'full',
  maxW: '3xl',
  p: '4',
  sm: { p: '6' },
  md: { p: '8' },
} as const;

export const page = sva({
  slots: ['root', 'frame', 'main'],
  base: {
    root: { bg: 'surface', minH: '[100dvh]' },
    frame,
    main: { ...frame, display: 'flex', flexDirection: 'column', gap: '8' },
  },
  variants: {
    width: {
      md: {},
      lg: { frame: { maxW: '4xl' }, main: { maxW: '4xl' } },
    },
    spacing: {
      tight: { main: { gap: '6' } },
      normal: {},
      loose: { main: { gap: '12' } },
    },
  },
  defaultVariants: { width: 'md', spacing: 'normal' },
});
