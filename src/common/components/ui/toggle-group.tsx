import * as React from 'react';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { css, cva, cx } from 'styled-system/css';

import type { RecipeVariantProps, SystemStyleObject } from 'styled-system/types';

const toggleVariants = cva({
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

type ToggleGroupVariants = RecipeVariantProps<typeof toggleVariants> & {
  orientation?: 'horizontal' | 'vertical';
};

const ToggleGroupContext = React.createContext<ToggleGroupVariants>({
  size: 'default',
  variant: 'default',
  orientation: 'horizontal',
});

const group = css({
  display: 'flex',
  w: 'fit',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '2',
  rounded: 'lg',
  _vertical: { flexDirection: 'column', alignItems: 'stretch' },
  '&[data-size=sm]': { rounded: 'md' },
});

const item = css({ flexShrink: 0, _focus: { zIndex: 'popover' } });

export function ToggleGroup({
  className,
  variant,
  size,
  orientation = 'horizontal',
  children,
  ...props
}: Omit<ToggleGroupPrimitive.Props, 'className'> & { className?: string } & ToggleGroupVariants) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      className={cx(group, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export function ToggleGroupItem({
  className,
  css: cssProp,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<TogglePrimitive.Props, 'className'> & {
  className?: string;
  css?: SystemStyleObject;
} & RecipeVariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      className={cx(
        item,
        css(
          toggleVariants.raw({ variant: context.variant ?? variant, size: context.size ?? size }),
          cssProp,
        ),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}
