import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { css, cx } from 'styled-system/css';

const separator = css({
  flexShrink: 0,
  bg: 'line',
  '&[data-orientation=horizontal]': { h: '[1px]', w: 'full' },
  '&[data-orientation=vertical]': { h: 'full', w: '[1px]' },
});

export function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: Omit<SeparatorPrimitive.Props, 'className'> & { className?: string }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cx(separator, className)}
      {...props}
    />
  );
}
