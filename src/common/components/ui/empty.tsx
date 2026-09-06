import { css, cx } from 'styled-system/css';

export function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cx(
        css({
          display: 'flex',
          w: 'full',
          minW: '0',
          flex: '1',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4',
          rounded: 'xl',
          borderStyle: 'dashed',
          p: '6',
          textAlign: 'center',
          textWrap: 'balance',
        }),
        className,
      )}
      {...props}
    />
  );
}

const header = css({
  display: 'flex',
  maxW: 'sm',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2',
});

export function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-header" className={cx(header, className)} {...props} />;
}

const title = css({ textStyle: 'sm', fontWeight: 'medium', letterSpacing: 'tight' });

export function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-title" className={cx(title, className)} {...props} />;
}

const description = css({
  color: 'text.muted',
  textStyle: 'sm',
  lineHeight: 'relaxed',
  '& > a': { textDecoration: 'underline', textUnderlineOffset: '4px', _hover: { color: 'accent' } },
});

export function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <div data-slot="empty-description" className={cx(description, className)} {...props} />;
}
