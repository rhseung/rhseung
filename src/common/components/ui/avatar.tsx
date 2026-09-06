import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { css, cva, cx } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

type WithClassName<T> = Omit<T, 'className'> & { className?: string };

const avatarVariants = cva({
  base: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    rounded: 'full',
    userSelect: 'none',
    _after: {
      content: '""',
      position: 'absolute',
      inset: '0',
      rounded: 'full',
      border: 'line',
      mixBlendMode: 'darken',
      _dark: { mixBlendMode: 'lighten' },
    },
  },
  variants: {
    size: {
      default: { boxSize: '8' },
      sm: { boxSize: '6' },
      lg: { boxSize: '10' },
      xl: { boxSize: '20' },
    },
  },
  defaultVariants: { size: 'default' },
});

export function Avatar({
  className,
  size = 'default',
  ...props
}: Omit<AvatarPrimitive.Root.Props, 'className'> & {
  className?: string;
} & RecipeVariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cx(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

const image = css({ aspectRatio: 'square', boxSize: 'full', rounded: 'full', objectFit: 'cover' });

export function AvatarImage({ className, ...props }: WithClassName<AvatarPrimitive.Image.Props>) {
  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={cx(image, className)} {...props} />
  );
}

const fallback = css({
  display: 'flex',
  boxSize: 'full',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'full',
  bg: 'surface.muted',
  color: 'text.muted',
  textStyle: 'sm',
  '[data-size=sm] &': { textStyle: 'xs' },
});

export function AvatarFallback({
  className,
  ...props
}: WithClassName<AvatarPrimitive.Fallback.Props>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cx(fallback, className)}
      {...props}
    />
  );
}
