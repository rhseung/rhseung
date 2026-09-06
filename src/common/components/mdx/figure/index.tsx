import { css } from 'styled-system/css';

const figure = css({
  my: '6',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  '& > *': { my: '0' },
});

export function Figure({ caption: text, children }: Figure.Props) {
  return (
    <figure className={figure}>
      {children}
      <figcaption className={css({ color: 'text.muted', textStyle: 'sm' })}>{text}</figcaption>
    </figure>
  );
}

export declare namespace Figure {
  export type Props = {
    caption: string;
    children: React.ReactNode;
  };
}
