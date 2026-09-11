import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { css, sva } from 'styled-system/css';

import { Button } from '../../ui';

const codeBlock = sva({
  slots: ['root', 'header', 'language', 'copy', 'pre'],
  base: {
    root: { rounded: 'lg', border: 'line', overflow: 'hidden' },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2',
      borderBottom: 'line',
      bg: 'surface.muted',
      py: '1.5',
      pl: '3',
      pr: '1.5',
    },
    language: { textStyle: 'caption', fontFamily: 'body', color: 'text.body' },
    copy: {
      '& [data-copied-state]': { display: 'none' },
      '&[data-copied] [data-idle-state]': { display: 'none' },
      '&[data-copied] [data-copied-state]': { display: 'block' },
    },
    pre: {
      overflowX: 'auto',
      p: '4',
      fontFamily: 'mono',
      textStyle: 'sm',
      lineHeight: '[1.7]',
      color: 'var(--shiki-light)',
      bg: 'var(--shiki-light-bg)',
      _dark: { color: 'var(--shiki-dark)', bg: 'var(--shiki-dark-bg)' },
    },
  },
});

export function CodeBlock({
  copyLabel,
  copiedLabel,
  tabindex,
  children,
  'data-language': language,
  ...props
}: CodeBlock.Props) {
  const classes = codeBlock();
  const srOnly = css({ srOnly: true });

  return (
    <div data-code-block="" className={classes.root}>
      <div className={classes.header}>
        <span className={classes.language}>{language}</span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          data-copy-code=""
          className={classes.copy}
        >
          <ClipboardIcon aria-hidden data-idle-state="" />
          <CheckIcon aria-hidden data-copied-state="" />
          <span data-idle-state="" className={srOnly}>
            {copyLabel}
          </span>
          <span data-copied-state="" className={srOnly}>
            {copiedLabel}
          </span>
        </Button>
      </div>
      <pre
        tabIndex={tabindex === undefined ? undefined : Number(tabindex)}
        className={classes.pre}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

export declare namespace CodeBlock {
  export type SlotProps = {
    style?: React.CSSProperties;
    tabindex?: number | string;
    'data-language'?: string;
    children: React.ReactNode;
  };

  export type Props = SlotProps & { copyLabel: string; copiedLabel: string };
}
