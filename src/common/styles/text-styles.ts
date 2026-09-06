import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  heading: {
    page: {
      value: {
        fontFamily: 'display',
        fontSize: '1.875rem',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-0.026em',
      },
    },
    section: {
      value: {
        fontFamily: 'display',
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
      },
    },
    sub: {
      value: {
        fontFamily: 'display',
        fontSize: '1.125rem',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '-0.01em',
      },
    },
    card: {
      value: { fontSize: '1rem', fontWeight: '500', lineHeight: '1.5' },
    },
  },
  body: {
    value: { fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.6' },
  },
  prose: {
    value: { fontSize: '1rem', fontWeight: '400', lineHeight: '1.7' },
  },
  caption: {
    value: { fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.5' },
  },
  micro: {
    value: { fontSize: '0.7rem', fontWeight: '500', lineHeight: '1.4' },
  },
  stat: {
    value: {
      fontSize: '1.125rem',
      fontWeight: '600',
      lineHeight: '1',
      fontVariantNumeric: 'tabular-nums',
    },
  },
});
