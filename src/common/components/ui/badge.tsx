import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, cx } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

export const badgeVariants = cva({
  base: {
    display: 'inline-flex',
    h: '5',
    w: 'fit',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    overflow: 'hidden',
    rounded: 'full',
    border: 'transparent',
    px: '2',
    py: '0.5',
    textStyle: 'xs',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transition: 'all',
    transitionDuration: 'fast',
    _focusVisible: { borderColor: 'focus', boxShadow: 'focus' },
    _invalid: { borderColor: 'danger', boxShadow: 'danger' },
    '&:has([data-icon=inline-end])': { pr: '1.5' },
    '&:has([data-icon=inline-start])': { pl: '1.5' },
    '& > svg': { pointerEvents: 'none', boxSize: '3' },
  },
  variants: {
    variant: {
      default: { bg: 'accent', color: 'accent.fg', '&:is(a):hover': { bg: 'accent/80' } },
      secondary: {
        bg: 'surface.muted',
        color: 'accent',
        '&:is(a):hover': { bg: 'surface.muted/80' },
      },
      destructive: {
        bg: 'danger/10',
        color: 'danger',
        _focusVisible: { boxShadow: 'danger' },
        _dark: { bg: 'danger/20' },
        '&:is(a):hover': { bg: 'danger/20' },
      },
      outline: {
        border: 'line',
        color: 'text',
        '&:is(a):hover': { bg: 'surface.muted', color: 'text.muted' },
      },
      link: {
        color: 'accent',
        textUnderlineOffset: '4px',
        _hover: { textDecoration: 'underline' },
      },
    },
    tone: {
      blue: { color: 'tone.blue' },
      teal: { color: 'tone.teal' },
      green: { color: 'tone.green' },
      amber: { color: 'tone.amber' },
      purple: { color: 'tone.purple' },
      rose: { color: 'tone.rose' },
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Badge({
  className,
  variant = 'default',
  tone,
  render,
  ...props
}: useRender.ComponentProps<'span'> & RecipeVariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      { className: cx(badgeVariants({ variant, tone }), className) },
      props,
    ),
    render,
    state: { slot: 'badge', variant },
  });
}
