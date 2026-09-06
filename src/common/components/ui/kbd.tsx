import { css, cx } from 'styled-system/css';

const kbd = css({
  pointerEvents: 'none',
  display: 'inline-flex',
  h: '5',
  w: 'fit',
  minW: '5',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1',
  rounded: 'sm',
  px: '1',
  bg: 'surface.muted',
  color: 'text',
  fontFamily: 'body',
  textStyle: 'xs',
  fontWeight: 'medium',
  userSelect: 'none',
  '[data-slot=tooltip-content] &': { bg: 'surface/20', color: 'surface' },
  '[data-theme=dark] [data-slot=tooltip-content] &': { bg: 'surface/10' },
  '& svg:not([class*=size_])': { boxSize: '3' },
});

export function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return <kbd data-slot="kbd" className={cx(kbd, className)} {...props} />;
}

const group = css({ display: 'inline-flex', alignItems: 'center', gap: '1' });

export function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <kbd data-slot="kbd-group" className={cx(group, className)} {...props} />;
}
