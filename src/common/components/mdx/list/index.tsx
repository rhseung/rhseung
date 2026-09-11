import { cva } from 'styled-system/css';

const list = cva({
  base: {
    mt: '5',
    pl: '6',
    '& > li + li': { mt: '1' },
  },
  variants: {
    ordered: {
      true: { listStyleType: 'decimal' },
      false: { listStyleType: 'disc' },
    },
  },
  defaultVariants: { ordered: false },
});

export function MdxList({ ordered = false, start, children }: MdxList.Props) {
  if (ordered) {
    return (
      <ol start={start} className={list({ ordered })}>
        {children}
      </ol>
    );
  }

  return <ul className={list({ ordered })}>{children}</ul>;
}

export declare namespace MdxList {
  export type Props = {
    ordered?: boolean;
    start?: number;
    children: React.ReactNode;
  };
}
