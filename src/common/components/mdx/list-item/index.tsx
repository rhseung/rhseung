import { css } from 'styled-system/css';

export function MdxListItem({ children }: MdxListItem.Props) {
  return (
    <li
      className={css({
        pl: '1',
        '& > :first-child': { mt: '0' },
        '& > *:not(:first-child)': { mt: '2' },
        '& > :is(ul, ol):first-child, & > :is(ul, ol):not(:first-child)': { mt: '1' },
        '&::marker': { color: 'text.muted' },
        '&:has(> input[type=checkbox])': { position: 'relative', listStyleType: 'none' },
        '& input[type=checkbox]': {
          position: 'absolute',
          top: '[0.3em]',
          left: '[-1.5rem]',
          display: 'inline-grid',
          boxSize: '4',
          flexShrink: 0,
          appearance: 'none',
          placeContent: 'center',
          rounded: '[4px]',
          border: 'input',
          transition: 'colors',
          opacity: 1,
          _checked: { borderColor: 'accent', bg: 'accent' },
          '&:checked::after': {
            content: '""',
            boxSize: '3.5',
            bg: 'accent.fg',
            mask: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M232.49 80.49l-128 128a12 12 0 01-17 0l-56-56a12 12 0 1117-17L96 183 215.51 63.51a12 12 0 0117 17z'/%3E%3C/svg%3E\") center / contain no-repeat",
          },
        },
      })}
    >
      {children}
    </li>
  );
}

export declare namespace MdxListItem {
  export type Props = {
    children: React.ReactNode;
  };
}
