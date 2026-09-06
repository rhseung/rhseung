import { defineTextStyles, defineTokens } from '@pandacss/dev';

export const letterSpacings = defineTokens.letterSpacings({
  body: { value: '0' },
  heading: {
    card: { value: '0' },
    sub: { value: '-0.01em' },
    section: { value: '-0.02em' },
    page: { value: '-0.026em' },
  },
  caption: { value: '0' },
});

export const textStyles = defineTextStyles({
  heading: {
    page: {
      value: {
        fontFamily: 'display',
        fontSize: '1.875rem',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '{letterSpacings.heading.page}',
      },
    },
    section: {
      value: {
        fontFamily: 'display',
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '{letterSpacings.heading.section}',
      },
    },
    sub: {
      value: {
        fontFamily: 'display',
        fontSize: '1.125rem',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '{letterSpacings.heading.sub}',
      },
    },
    card: {
      value: {
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.5',
        letterSpacing: '{letterSpacings.heading.card}',
      },
    },
  },
  body: {
    value: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.6',
      letterSpacing: '{letterSpacings.body}',
    },
  },
  prose: {
    value: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.7',
      letterSpacing: '{letterSpacings.body}',
    },
  },
  caption: {
    value: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '{letterSpacings.caption}',
    },
  },
  micro: {
    value: {
      fontSize: '0.7rem',
      fontWeight: '500',
      lineHeight: '1.4',
      letterSpacing: '{letterSpacings.caption}',
    },
  },
  stat: {
    value: {
      fontSize: '1.125rem',
      fontWeight: '600',
      lineHeight: '1',
      letterSpacing: '{letterSpacings.heading.sub}',
      fontVariantNumeric: 'tabular-nums',
    },
  },
});
