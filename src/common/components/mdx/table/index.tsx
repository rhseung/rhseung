import { sva } from 'styled-system/css';

const table = sva({
  slots: ['root', 'table'],
  base: {
    root: { position: 'relative', my: '6', overflowX: 'auto' },
    table: {
      w: 'full',
      borderCollapse: 'collapse',
      textStyle: 'sm',
      textAlign: 'left',
      '& thead': { borderBottom: 'line' },
      '& th': {
        color: 'text.muted',
        textStyle: 'caption',
        fontWeight: 'medium',
        letterSpacing: 'wide',
      },
      '& tbody tr + tr': { borderTop: 'line' },
      '& :is(th, td)': { py: '2.5', pr: '4', verticalAlign: 'top' },
      '& :is(th, td) > :first-child': { mt: '0' },
      '& :is(th, td) > *:not(:first-child)': { mt: '2' },
    },
  },
});

export function MdxTable({ children }: MdxTable.Props) {
  const classes = table();

  return (
    <div className={classes.root}>
      <table className={classes.table}>{children}</table>
    </div>
  );
}

export declare namespace MdxTable {
  export type Props = {
    children: React.ReactNode;
  };
}
