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
  WindowsLogoIcon,
  type IconProps,
} from '@phosphor-icons/react';

import { cn } from '@/common/utils';

import { Kbd, KbdGroup } from '../../ui/kbd';

function DeleteIcon(props: IconProps) {
  return <BackspaceIcon {...props} className={cn('scale-x-[-1]')} />;
}

const KEY_GLYPHS = {
  cmd: CommandIcon,
  opt: OptionIcon,
  ctrl: ControlIcon,
  shift: ArrowFatUpIcon,
  caps: ArrowFatLineUpIcon,
  fn: 'fn',
  enter: ArrowElbowDownLeftIcon,
  tab: ArrowLineRightIcon,
  backtab: ArrowLineLeftIcon,
  backspace: BackspaceIcon,
  del: DeleteIcon,
  esc: 'esc',
  space: 'space',
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  left: ArrowLeftIcon,
  right: ArrowRightIcon,
  pageup: CaretDoubleUpIcon,
  pagedown: CaretDoubleDownIcon,
  home: ArrowUpLeftIcon,
  end: ArrowDownRightIcon,
  eject: EjectIcon,
  win: WindowsLogoIcon,
} as const satisfies Record<string, React.ComponentType<IconProps> | string>;

function isKey(key: string): key is Shortcut.Key {
  return key in KEY_GLYPHS;
}

export function Shortcut({ keys }: Shortcut.Props) {
  return (
    <KbdGroup className={cn('p-0 align-middle shadow-none')}>
      {keys.map((key) => {
        const Glyph = isKey(key) ? KEY_GLYPHS[key] : key.toUpperCase();

        return (
          <Kbd key={key} className={cn('text-foreground shadow-none')}>
            {typeof Glyph === 'string' ? (
              Glyph
            ) : (
              <>
                <Glyph aria-hidden />
                <span className={cn('sr-only')}>{key}</span>
              </>
            )}
          </Kbd>
        );
      })}
    </KbdGroup>
  );
}

export declare namespace Shortcut {
  export type Key = keyof typeof KEY_GLYPHS;

  export type Props = {
    keys: readonly (Key | (string & {}))[];
  };
}
