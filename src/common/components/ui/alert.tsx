import * as React from 'react';

import { css, cva, cx } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

const alertVariants = cva({
  base: {
    position: 'relative',
    display: 'grid',
    w: 'full',
    gap: '0.5',
    rounded: 'lg',
    border: 'line',
    px: '2.5',
    py: '2',
    textAlign: 'left',
    textStyle: 'sm',
    '&:has(> svg)': { gridTemplateColumns: 'auto 1fr', columnGap: '2' },
    '& > svg': { gridRow: 'span 2', transform: 'translateY(2px)' },
    '& > svg:not([class*=size_])': { boxSize: '4' },
  },
  variants: {
    variant: {
      default: { bg: 'surface.raised', color: 'text' },
      destructive: {
        bg: 'surface.raised',
        color: 'danger',
        '& > [data-slot=alert-description]': { color: 'danger/90' },
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & RecipeVariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cx(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

const title = css({
  fontWeight: 'medium',
  '[data-slot=alert]:has(> svg) &': { gridColumnStart: 2 },
  '& a': { textDecoration: 'underline', textUnderlineOffset: '3px', _hover: { color: 'text' } },
});

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cx(title, className)} {...props} />;
}

const description = css({
  color: 'text.muted',
  textStyle: 'sm',
  textWrap: 'balance',
  md: { textWrap: '[pretty]' },
  '& a': { textDecoration: 'underline', textUnderlineOffset: '3px', _hover: { color: 'text' } },
  '& p:not(:last-child)': { mb: '4' },
});

export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-description" className={cx(description, className)} {...props} />;
}
