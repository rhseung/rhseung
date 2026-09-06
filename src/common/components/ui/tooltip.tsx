import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { css, cx } from 'styled-system/css';

export function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

export function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipContent({
  className,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: Omit<TooltipPrimitive.Popup.Props, 'className'> & { className?: string } & Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={css({ isolation: 'isolate', zIndex: 'popover' })}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cx(
            css({
              zIndex: 'popover',
              display: 'inline-flex',
              w: 'fit',
              maxW: 'xs',
              transformOrigin: 'var(--transform-origin)',
              alignItems: 'center',
              gap: '1.5',
              rounded: 'md',
              px: '3',
              py: '1.5',
              bg: 'text',
              color: 'surface',
              textStyle: 'xs',
              '&:has([data-slot=kbd])': { pr: '1.5' },
              '& [data-slot=kbd]': {
                position: 'relative',
                isolation: 'isolate',
                zIndex: 'popover',
                rounded: 'sm',
              },
              '&[data-side=top]': { '--enter-y': '0.5rem' },
              '&[data-side=bottom]': { '--enter-y': '-0.5rem' },
              '&[data-side=left], &[data-side=inline-start]': { '--enter-x': '0.5rem' },
              '&[data-side=right], &[data-side=inline-end]': { '--enter-x': '-0.5rem' },
              _open: { animation: 'popIn' },
              '&[data-state=delayed-open]': { animation: 'popIn' },
              _closed: { animation: 'popOut' },
            }),
            className,
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={css({
              zIndex: 'popover',
              boxSize: '2.5',
              transform: 'translateY(calc(-50% - 2px)) rotate(45deg)',
              rounded: '[2px]',
              bg: 'text',
              fill: 'text',
              '&[data-side=bottom]': { top: '1' },
              '&[data-side=top]': { bottom: '-2.5' },
              '&[data-side=left], &[data-side=inline-start]': {
                top: '[50%]',
                right: '-1',
                transform: 'translateY(-50%) rotate(45deg)',
              },
              '&[data-side=right], &[data-side=inline-end]': {
                top: '[50%]',
                left: '-1',
                transform: 'translateY(-50%) rotate(45deg)',
              },
            })}
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
