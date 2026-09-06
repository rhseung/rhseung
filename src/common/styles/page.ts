import { sva } from 'styled-system/css';

export const page = sva({
  slots: ['root', 'main'],
  base: {
    root: { bg: 'surface', minH: '[100dvh]' },
    main: {
      mx: 'auto',
      display: 'flex',
      maxW: '3xl',
      flexDirection: 'column',
      gap: '8',
      p: '4',
      sm: { p: '6' },
      md: { p: '8' },
    },
  },
  variants: {
    width: {
      md: {},
      lg: { main: { maxW: '4xl' } },
    },
  },
  defaultVariants: { width: 'md' },
});
