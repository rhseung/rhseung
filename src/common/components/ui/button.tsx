import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, cx } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

export const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    rounded: 'lg',
    border: 'transparent',
    backgroundClip: 'padding-box',
    textStyle: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transition: 'all',
    transitionDuration: 'fast',
    outlineStyle: 'none',
    userSelect: 'none',
    _focusVisible: { borderColor: 'focus', boxShadow: 'focus' },
    '&:active:not([aria-haspopup])': { transform: 'translateY(1px)' },
    _disabled: { pointerEvents: 'none', opacity: 0.5 },
    _invalid: { borderColor: 'danger', boxShadow: 'danger' },
    '& svg': { pointerEvents: 'none', flexShrink: 0 },
    '& svg:not([class*=size_])': { boxSize: '4' },
  },
  variants: {
    variant: {
      default: { bg: 'accent', color: 'accent.fg', _hover: { bg: 'accent/80' } },
      outline: {
        border: 'line',
        bg: 'surface',
        _hover: { bg: 'surface.muted', color: 'text' },
        _expanded: { bg: 'surface.muted', color: 'text' },
        _dark: { border: 'input', bg: 'line.input/30', _hover: { bg: 'line.input/50' } },
      },
      secondary: {
        bg: 'surface.muted',
        color: 'accent',
        _hover: { bg: 'line' },
        _expanded: { bg: 'surface.muted', color: 'accent' },
      },
      ghost: {
        _hover: { bg: 'surface.muted', color: 'text' },
        _expanded: { bg: 'surface.muted', color: 'text' },
        _dark: { _hover: { bg: 'surface.muted/50' } },
      },
      destructive: {
        bg: 'danger/10',
        color: 'danger',
        _hover: { bg: 'danger/20' },
        _focusVisible: { borderColor: 'danger/40', boxShadow: 'danger' },
        _dark: { bg: 'danger/20', _hover: { bg: 'danger/30' } },
      },
      link: {
        color: 'accent',
        textUnderlineOffset: '4px',
        _hover: { textDecoration: 'underline' },
      },
    },
    size: {
      default: {
        h: '8',
        gap: '1.5',
        px: '2.5',
        '&:has([data-icon=inline-end])': { pr: '2' },
        '&:has([data-icon=inline-start])': { pl: '2' },
      },
      xs: {
        h: '6',
        gap: '1',
        rounded: 'md',
        px: '2',
        textStyle: 'xs',
        '&:has([data-icon=inline-end])': { pr: '1.5' },
        '&:has([data-icon=inline-start])': { pl: '1.5' },
        '& svg:not([class*=size_])': { boxSize: '3' },
      },
      sm: {
        h: '7',
        gap: '1',
        rounded: 'md',
        px: '2.5',
        textStyle: 'xs',
        '&:has([data-icon=inline-end])': { pr: '1.5' },
        '&:has([data-icon=inline-start])': { pl: '1.5' },
        '& svg:not([class*=size_])': { boxSize: '3.5' },
      },
      lg: {
        h: '9',
        gap: '1.5',
        px: '2.5',
        '&:has([data-icon=inline-end])': { pr: '2' },
        '&:has([data-icon=inline-start])': { pl: '2' },
      },
      icon: { boxSize: '8' },
      'icon-xs': { boxSize: '6', rounded: 'md', '& svg:not([class*=size_])': { boxSize: '3' } },
      'icon-sm': { boxSize: '7', rounded: 'md' },
      'icon-lg': { boxSize: '9' },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<ButtonPrimitive.Props, 'className'> & {
  className?: string;
} & RecipeVariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
