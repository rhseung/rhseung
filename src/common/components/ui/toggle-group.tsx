import * as React from 'react';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { css, cx } from 'styled-system/css';

import { toggleVariants } from './toggle';

import type { RecipeVariantProps } from 'styled-system/types';

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
  children,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<TogglePrimitive.Props, 'className'> & {
  className?: string;
} & RecipeVariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      className={cx(
        item,
        toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}
