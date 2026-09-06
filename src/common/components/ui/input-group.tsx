import * as React from 'react';

import { css, cva, cx } from 'styled-system/css';

import { Button } from './button';
import { Input } from './input';

import type { RecipeVariantProps } from 'styled-system/types';

const group = css({
  position: 'relative',
  display: 'flex',
  h: '8',
  w: 'full',
  minW: '0',
  alignItems: 'center',
  rounded: 'lg',
  border: 'input',
  transition: 'colors',
  outlineStyle: 'none',
  _dark: { bg: 'line.input/30' },
  '&:has([data-slot=input-group-control]:focus-visible)': {
    borderColor: 'focus',
    boxShadow: 'focus',
  },
  '&:has([data-slot][aria-invalid=true])': { borderColor: 'danger', boxShadow: 'danger' },
  '&:has(:disabled)': { opacity: 0.5, bg: 'line.input/50' },
  '&:has(> [data-align=inline-end]) > input': { pr: '1.5' },
  '&:has(> [data-align=inline-start]) > input': { pl: '1.5' },
});

export function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="input-group" role="group" className={cx(group, className)} {...props} />;
}

const addonVariants = cva({
  base: {
    display: 'flex',
    h: 'auto',
    cursor: 'text',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    py: '1.5',
    textStyle: 'sm',
    fontWeight: 'medium',
    color: 'text.muted',
    userSelect: 'none',
    '& > kbd': { rounded: 'sm' },
    '& > svg:not([class*=size_])': { boxSize: '4' },
  },
  variants: {
    align: {
      'inline-start': { order: '[-1]', pl: '2', '&:has(> button)': { ml: '-1' } },
      'inline-end': { order: '[1]', pr: '2', '&:has(> button)': { mr: '-1' } },
    },
  },
  defaultVariants: { align: 'inline-start' },
});

export function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & RecipeVariantProps<typeof addonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cx(addonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}

const buttonVariants = cva({
  base: { display: 'flex', alignItems: 'center', gap: '2', textStyle: 'sm', boxShadow: 'none' },
  variants: {
    size: {
      xs: {
        h: '6',
        gap: '1',
        rounded: 'sm',
        px: '1.5',
        '& > svg:not([class*=size_])': { boxSize: '3.5' },
      },
      sm: {},
      'icon-xs': { boxSize: '6', rounded: 'sm', p: '0' },
      'icon-sm': { boxSize: '8', p: '0' },
    },
  },
  defaultVariants: { size: 'xs' },
});

export function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
  RecipeVariantProps<typeof buttonVariants> & { type?: 'button' | 'submit' | 'reset' }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cx(buttonVariants({ size }), className)}
      {...props}
    />
  );
}

const control = css({
  flex: '1',
  rounded: 'none',
  border: 'none',
  bg: 'transparent',
  boxShadow: 'none',
  _focusVisible: { boxShadow: 'none' },
  _disabled: { bg: 'transparent' },
  _invalid: { boxShadow: 'none' },
  _dark: { bg: 'transparent', _disabled: { bg: 'transparent' } },
});

export function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="input-group-control" className={cx(control, className)} {...props} />;
}
