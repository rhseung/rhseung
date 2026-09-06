import { css } from 'styled-system/css';

const figure = css({
  my: '6',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  '& > *': { my: '0' },
});
const caption = css({ color: 'text.muted', textStyle: 'sm' });

export function Figure({ caption: text, children }: Figure.Props) {
  return (
    <figure className={figure}>
      {children}
      <figcaption className={caption}>{text}</figcaption>
    </figure>
  );
}

export declare namespace Figure {
  export type Props = {
    caption: string;
    children: React.ReactNode;
  };
}
