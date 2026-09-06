import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { css, cx } from 'styled-system/css';

// Base UI 1.7 은 `data-orientation="horizontal"` 을 낸다. 세로줄 높이는 `alignSelf: stretch` 가
// 아니라 `h: full` 이다 - 부르는 쪽이 높이를 지정하면 stretch 가 무시되면서 줄이 위로 붙는다.
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
