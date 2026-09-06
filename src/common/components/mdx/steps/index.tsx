import { css } from 'styled-system/css';

export function Steps({ children }: Steps.Props) {
  return (
    <ol
      className={css({
        my: '6',
        display: 'flex',
        listStyleType: 'none',
        flexDirection: 'column',
        gap: '4',
        pl: '0',
      })}
    >
      {children}
    </ol>
  );
}

export function Step({ index, title: heading, children }: Step.Props) {
  return (
    <li className={css({ display: 'flex', gap: '3', '& p': { my: '0' }, '& p + p': { mt: '2' } })}>
      <span
        className={css({
          mt: '0.5',
          display: 'flex',
          boxSize: '6',
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
          rounded: 'full',
          border: 'line',
          color: 'text.muted',
          textStyle: 'caption',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        {index}
      </span>

      <div className={css({ display: 'flex', minW: '0', flexDirection: 'column', gap: '1' })}>
        <p className={css({ color: 'text', textStyle: 'sm', fontWeight: 'medium' })}>{heading}</p>
        <div className={css({ color: 'text.muted', textStyle: 'sm', lineHeight: 'relaxed' })}>
          {children}
        </div>
      </div>
    </li>
  );
}

export declare namespace Steps {
  export type Props = { children: React.ReactNode };
}

export declare namespace Step {
  export type Props = {
    index: number;
    title: string;
    children: React.ReactNode;
  };
}
