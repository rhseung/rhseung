import { cva } from 'styled-system/css';

import type { RecipeVariantProps } from 'styled-system/types';

const heading = cva({
  base: {
    color: 'text',
    fontFamily: 'serif',
    textAlign: 'left',
    '& + p': { textIndent: '0' },
  },
  variants: {
    level: {
      1: {
        mt: '12',
        textStyle: 'heading.page',
        '& + *': { mt: '4' },
        '& + :is(h3, h4, h5, h6)': { mt: '6' },
      },
      2: {
        mt: '12',
        textStyle: 'heading.section',
        counterIncrement: 'section',
        counterReset: 'subsection',
        '&::before': { content: 'counter(section)', mr: '[0.75em]' },
        '& + *': { mt: '4' },
        '& + :is(h3, h4, h5, h6)': { mt: '6' },
      },
      3: {
        mt: '8',
        textStyle: 'heading.sub',
        counterIncrement: 'subsection',
        '&::before': { content: "counter(section) '.' counter(subsection)", mr: '[0.75em]' },
        '& + *': { mt: '3' },
        '& + :is(h4, h5, h6)': { mt: '4' },
      },
      4: { mt: '6', textStyle: 'heading.minor', '& + *': { mt: '2' } },
      5: { mt: '6', textStyle: 'heading.card', '& + *': { mt: '2' } },
      6: { mt: '6', textStyle: 'heading.card', '& + *': { mt: '2' } },
    },
  },
});

type HeadingVariants = NonNullable<RecipeVariantProps<typeof heading>>;

export function PaperHeading({ level, id, children }: PaperHeading.Props) {
  const Tag = `h${level}` as const;

  return (
    <Tag id={id} className={heading({ level })}>
      {children}
    </Tag>
  );
}

export declare namespace PaperHeading {
  export type Level = NonNullable<HeadingVariants['level']>;

  export type SlotProps = {
    id?: string;
    children: React.ReactNode;
  };

  export type Props = SlotProps & { level: Level };
}
