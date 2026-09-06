import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, cx } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

export const toggleVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    rounded: 'lg',
    textStyle: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transition: 'all',
    transitionDuration: 'fast',
    outlineStyle: 'none',
    _hover: { bg: 'surface.muted', color: 'text' },
    _focusVisible: { borderColor: 'focus', boxShadow: 'focus' },
    _disabled: { pointerEvents: 'none', opacity: 0.5 },
    _invalid: { borderColor: 'danger', boxShadow: 'danger' },
    _pressed: { bg: 'surface.muted' },
    '& svg': { pointerEvents: 'none', flexShrink: 0 },
    '& svg:not([class*=size_])': { boxSize: '4' },
  },
  variants: {
    variant: {
      default: { bg: 'transparent' },
      outline: { border: 'input', bg: 'transparent', _hover: { bg: 'surface.muted' } },
    },
    size: {
      default: {
        h: '8',
        minW: '8',
        px: '2.5',
        '&:has([data-icon=inline-end])': { pr: '2' },
        '&:has([data-icon=inline-start])': { pl: '2' },
      },
      sm: {
        h: '7',
        minW: '7',
        rounded: 'md',
        px: '2.5',
        textStyle: 'xs',
        '&:has([data-icon=inline-end])': { pr: '1.5' },
        '&:has([data-icon=inline-start])': { pl: '1.5' },
        '& svg:not([class*=size_])': { boxSize: '3.5' },
      },
      lg: {
        h: '9',
        minW: '9',
        px: '2.5',
        '&:has([data-icon=inline-end])': { pr: '2' },
        '&:has([data-icon=inline-start])': { pl: '2' },
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export function Toggle({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<TogglePrimitive.Props, 'className'> & {
  className?: string;
} & RecipeVariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cx(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}
