import { Fragment, type ReactNode } from 'react';

import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowElbowDownLeftIcon,
  ArrowFatLineUpIcon,
  ArrowFatUpIcon,
  ArrowLeftIcon,
  ArrowLineLeftIcon,
  ArrowLineRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  BackspaceIcon,
  CaretDoubleDownIcon,
  CaretDoubleUpIcon,
  CommandIcon,
  ControlIcon,
  EjectIcon,
  OptionIcon,
  PlusIcon,
  WindowsLogoIcon,
} from '@phosphor-icons/react';
import { css } from 'styled-system/css';

import { Kbd, KbdGroup } from '../../ui/kbd';

const KEY_GLYPHS = {
  cmd: <CommandIcon aria-hidden />,
  opt: <OptionIcon aria-hidden />,
  ctrl: <ControlIcon aria-hidden />,
  shift: <ArrowFatUpIcon aria-hidden />,
  caps: <ArrowFatLineUpIcon aria-hidden />,
  fn: <span aria-hidden>fn</span>,
  enter: <ArrowElbowDownLeftIcon aria-hidden />,
  tab: <ArrowLineRightIcon aria-hidden />,
  backtab: <ArrowLineLeftIcon aria-hidden />,
  backspace: <BackspaceIcon aria-hidden />,
  del: <BackspaceIcon aria-hidden className={css({ scaleX: '[-1]' })} />,
  esc: <span aria-hidden>esc</span>,
  space: <span aria-hidden>space</span>,
  up: <ArrowUpIcon aria-hidden />,
  down: <ArrowDownIcon aria-hidden />,
  left: <ArrowLeftIcon aria-hidden />,
  right: <ArrowRightIcon aria-hidden />,
  pageup: <CaretDoubleUpIcon aria-hidden />,
  pagedown: <CaretDoubleDownIcon aria-hidden />,
  home: <ArrowUpLeftIcon aria-hidden />,
  end: <ArrowDownRightIcon aria-hidden />,
  eject: <EjectIcon aria-hidden />,
  win: <WindowsLogoIcon aria-hidden />,
} as const satisfies Record<string, ReactNode>;

const WINDOWS_GLYPHS = {
  cmd: <WindowsLogoIcon aria-hidden />,
  opt: <span aria-hidden>Alt</span>,
  ctrl: <span aria-hidden>Ctrl</span>,
  shift: <span aria-hidden>Shift</span>,
  caps: <span aria-hidden>Caps</span>,
  enter: <span aria-hidden>Enter</span>,
  tab: <span aria-hidden>Tab</span>,
  backtab: <span aria-hidden>Shift+Tab</span>,
  backspace: <span aria-hidden>Backspace</span>,
  del: <span aria-hidden>Del</span>,
  eject: <span aria-hidden>Eject</span>,
} as const satisfies Partial<Record<keyof typeof KEY_GLYPHS, ReactNode>>;

function glyphOf(key: string, os: Shortcut.Os): ReactNode {
  if (os === 'win' && key in WINDOWS_GLYPHS) {
    return WINDOWS_GLYPHS[key as keyof typeof WINDOWS_GLYPHS];
  }

  if (key in KEY_GLYPHS) {
    return KEY_GLYPHS[key as Shortcut.Key];
  }

  return <span aria-hidden>{key.toUpperCase()}</span>;
}

export function Shortcut({ keys, os = 'mac' }: Shortcut.Props) {
  return (
    <KbdGroup className={css({ p: '0', verticalAlign: 'middle' })}>
      {keys.map((key, index) => (
        <Fragment key={key}>
          {index > 0 && (
            <PlusIcon aria-hidden className={css({ color: 'text.muted', boxSize: '2.5' })} />
          )}
          <Kbd>
            {glyphOf(key, os)}
            <span className={css({ srOnly: true })}>{key}</span>
          </Kbd>
        </Fragment>
      ))}
    </KbdGroup>
  );
}

export declare namespace Shortcut {
  export type Key = keyof typeof KEY_GLYPHS;

  export type Os = 'mac' | 'win';

  export type Props = {
    keys: readonly (Key | (string & {}))[];
    os?: Os;
  };
}
