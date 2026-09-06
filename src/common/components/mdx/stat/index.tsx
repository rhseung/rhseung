import { css } from 'styled-system/css';

const grid = css({
  my: '6',
  display: 'grid',
  gap: '3',
  sm: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
});
const value = css({ color: 'text', textStyle: 'stat' });
const label = css({ color: 'text.muted', textStyle: 'caption' });

export function Stats({ children }: Stats.Props) {
  return <div className={grid}>{children}</div>;
}

export function Stat({ value: figure, label: text }: Stat.Props) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '1',
        rounded: 'md',
        border: 'line',
        p: '3',
      })}
    >
      <span className={value}>{figure}</span>
      <span className={label}>{text}</span>
    </div>
  );
}

export declare namespace Stats {
  export type Props = { children: React.ReactNode };
}

export declare namespace Stat {
  export type Props = {
    value: string;
    label: string;
  };
}
