import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { css, cx } from 'styled-system/css';

import type { SystemStyleObject } from 'styled-system/types';

export function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export function PopoverContent({
  className,
  css: cssProp,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  children,
  ...props
}: Omit<PopoverPrimitive.Popup.Props, 'className'> & {
  className?: string;
  css?: SystemStyleObject;
} & Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={css({ isolation: 'isolate', zIndex: 'popover' })}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cx(
            css(
              css.raw({
                zIndex: 'popover',
                display: 'flex',
                w: '72',
                transformOrigin: 'var(--transform-origin)',
                flexDirection: 'column',
                gap: '2.5',
                rounded: 'lg',
                p: '2.5',
                bg: 'surface.raised',
                color: 'text',
                textStyle: 'sm',
                boxShadow: 'popover',
                outlineStyle: 'none',
                '&[data-side=top]': { '--enter-y': '0.5rem' },
                '&[data-side=bottom]': { '--enter-y': '-0.5rem' },
                '&[data-side=left], &[data-side=inline-start]': { '--enter-x': '0.5rem' },
                '&[data-side=right], &[data-side=inline-end]': { '--enter-x': '-0.5rem' },
                _open: { animation: 'popIn' },
                _closed: { animation: 'popOut' },
              }),
              cssProp,
            ),
            className,
          )}
          {...props}
        >
          {children}
          <PopoverPrimitive.Arrow
            className={css({
              position: 'relative',
              zIndex: 'popover',
              display: 'block',
              h: '2',
              w: '4',
              overflow: 'clip',
              '&[data-side=bottom]': { top: '-2' },
              '&[data-side=top]': { bottom: '-2', transform: 'rotate(180deg)' },
              '&[data-side=left], &[data-side=inline-start]': {
                right: '-3',
                transform: 'rotate(90deg)',
              },
              '&[data-side=right], &[data-side=inline-end]': {
                left: '-3',
                transform: 'rotate(-90deg)',
              },
            })}
          >
            <span
              className={css({
                position: 'absolute',
                bottom: '0',
                left: '[50%]',
                boxSize: '[11px]',
                transform: 'translate(-50%, 50%) rotate(45deg)',
                border: 'line',
                bg: 'surface.raised',
                backgroundClip: 'padding-box',
              })}
            />
          </PopoverPrimitive.Arrow>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}
