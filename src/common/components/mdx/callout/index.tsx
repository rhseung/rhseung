import { InfoIcon, LightbulbIcon, WarningIcon } from '@phosphor-icons/react';

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

const TONES = {
  note: { icon: InfoIcon, variant: 'default' },
  tip: { icon: LightbulbIcon, variant: 'default' },
  warn: { icon: WarningIcon, variant: 'destructive' },
} as const;

/** MDX 본문에서 문단 흐름을 끊고 하나를 강조한다. */
export function Callout({ tone = 'note', title, children }: Callout.Props) {
  const { icon: Icon, variant } = TONES[tone];

  return (
    <Alert variant={variant} className="my-6">
      <Icon weight="fill" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

export declare namespace Callout {
  export type Tone = keyof typeof TONES;

  export type Props = {
    tone?: Tone;
    title?: string;
    children: React.ReactNode;
  };
}
