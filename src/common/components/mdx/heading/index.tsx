import { LinkIcon } from '@heroicons/react/24/outline';
import { css, cva, cx } from 'styled-system/css';

const heading = cva({
  base: {
    position: 'relative',
    color: 'text',
    '& a:not([data-permalink])': { color: '[inherit]', fontWeight: '[inherit]' },
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
        '& + *': { mt: '4' },
        '& + :is(h3, h4, h5, h6)': { mt: '6' },
      },
      3: {
        mt: '8',
        textStyle: 'heading.sub',
        '& + *': { mt: '3' },
        '& + :is(h4, h5, h6)': { mt: '4' },
      },
      4: { mt: '6', textStyle: 'heading.minor', '& + *': { mt: '2' } },
      5: { mt: '6', textStyle: 'heading.card', '& + *': { mt: '2' } },
      6: { mt: '6', textStyle: 'heading.card', '& + *': { mt: '2' } },
    },
  },
});

export function MdxHeading({ level, id, permalinkLabel, children }: MdxHeading.Props) {
  const Tag = `h${level}` as const;

  if (id === undefined) return <Tag className={heading({ level })}>{children}</Tag>;

  return (
    <Tag id={id} className={cx('group', heading({ level }))}>
      <a
        href={`#${id}`}
        data-permalink
        aria-label={permalinkLabel}
        className={css({
          position: 'absolute',
          left: '-7',
          display: 'none',
          h: '[1lh]',
          alignItems: 'center',
          textDecoration: 'none',
          opacity: 0,
          transition: 'opacity',
          color: 'text.muted/60',
          _hover: { color: 'text.muted' },
          _focusVisible: { opacity: 1 },
          _groupHover: { opacity: 1 },
          lg: { display: 'flex' },
        })}
      >
        <LinkIcon aria-hidden className={css({ boxSize: '[0.8em]' })} />
      </a>
      {children}
    </Tag>
  );
}

export declare namespace MdxHeading {
  export type Level = 1 | 2 | 3 | 4 | 5 | 6;

  export type SlotProps = {
    id?: string;
    children: React.ReactNode;
  };

  export type Props = SlotProps & { level: Level; permalinkLabel: string };
}
