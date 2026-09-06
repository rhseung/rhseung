import * as React from 'react';

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { XIcon } from '@phosphor-icons/react';
import { css, cva, cx } from 'styled-system/css';

import { Button } from './button';

import type { RecipeVariantProps } from 'styled-system/types';

type WithClassName<T> = Omit<T, 'className'> & { className?: string };

export function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

const overlay = css({
  position: 'fixed',
  inset: '0',
  zIndex: 'popover',
  bg: 'overlay',
  transition: 'opacity',
  transitionDuration: 'fast',
  backdropBlur: 'xs',
  '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
});

function SheetOverlay({ className, ...props }: WithClassName<SheetPrimitive.Backdrop.Props>) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cx(overlay, className)}
      {...props}
    />
  );
}

const contentVariants = cva({
  base: {
    position: 'fixed',
    zIndex: 'popover',
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    bg: 'surface.raised',
    color: 'text',
    backgroundClip: 'padding-box',
    textStyle: 'sm',
    boxShadow: 'lg',
    transition: 'all',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
  variants: {
    side: {
      top: {
        insetX: '0',
        top: '0',
        h: 'auto',
        borderBottom: 'line',
        '&[data-starting-style], &[data-ending-style]': { transform: 'translateY(-2.5rem)' },
      },
      bottom: {
        insetX: '0',
        bottom: '0',
        h: 'auto',
        borderTop: 'line',
        '&[data-starting-style], &[data-ending-style]': { transform: 'translateY(2.5rem)' },
      },
      left: {
        insetY: '0',
        left: '0',
        h: 'full',
        w: '[75%]',
        borderRight: 'line',
        sm: { maxW: 'sm' },
        '&[data-starting-style], &[data-ending-style]': { transform: 'translateX(-2.5rem)' },
      },
      right: {
        insetY: '0',
        right: '0',
        h: 'full',
        w: '[75%]',
        borderLeft: 'line',
        sm: { maxW: 'sm' },
        '&[data-starting-style], &[data-ending-style]': { transform: 'translateX(2.5rem)' },
      },
    },
  },
  defaultVariants: { side: 'right' },
});

const closeButton = css({ position: 'absolute', top: '3', right: '3' });
const srOnly = css({ srOnly: true });

export function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: WithClassName<SheetPrimitive.Popup.Props> &
  RecipeVariantProps<typeof contentVariants> & { showCloseButton?: boolean }) {
  return (
    <SheetPrimitive.Portal data-slot="sheet-portal">
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cx(contentVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" className={closeButton} size="icon-sm" />}
          >
            <XIcon />
            <span className={srOnly}>Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

const header = css({ display: 'flex', flexDirection: 'column', gap: '0.5', p: '4' });

export function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cx(header, className)} {...props} />;
}

const footer = css({ mt: 'auto', display: 'flex', flexDirection: 'column', gap: '2', p: '4' });

export function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cx(footer, className)} {...props} />;
}

const title = css({ color: 'text', textStyle: 'md', fontWeight: 'medium' });

export function SheetTitle({ className, ...props }: WithClassName<SheetPrimitive.Title.Props>) {
  return (
    <SheetPrimitive.Title data-slot="sheet-title" className={cx(title, className)} {...props} />
  );
}

const description = css({ color: 'text.muted', textStyle: 'sm' });

export function SheetDescription({
  className,
  ...props
}: WithClassName<SheetPrimitive.Description.Props>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cx(description, className)}
      {...props}
    />
  );
}
