import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon,
  MegaphoneIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/solid';
import { tv } from 'tailwind-variants';

const TONES = {
  note: InformationCircleIcon,
  tip: LightBulbIcon,
  important: MegaphoneIcon,
  warning: ExclamationTriangleIcon,
  caution: NoSymbolIcon,
} as const;

const callout = tv({
  slots: {
    // prose 가 자식 `<p>`·목록에 1.25em 마진을 준다 — 그대로 두면 제목과 본문이 멀찍이 떨어진다.
    root: 'my-6 flex flex-col gap-1 rounded-r-md border-l-4 bg-muted/40 px-4 py-3 [&_ol]:my-2 [&_p+p]:mt-2 [&_p]:my-0 [&_ul]:my-2',
    icon: 'size-5 shrink-0',
    title: 'flex items-center gap-2 font-medium',
    body: 'text-muted-foreground leading-relaxed',
  },
  variants: {
    tone: {
      note: {
        root: 'border-tone-blue-foreground/50',
        icon: 'text-tone-blue-foreground',
        title: 'text-tone-blue-foreground',
      },
      tip: {
        root: 'border-tone-green-foreground/50',
        icon: 'text-tone-green-foreground',
        title: 'text-tone-green-foreground',
      },
      important: {
        root: 'border-tone-purple-foreground/50',
        icon: 'text-tone-purple-foreground',
        title: 'text-tone-purple-foreground',
      },
      warning: {
        root: 'border-tone-amber-foreground/50',
        icon: 'text-tone-amber-foreground',
        title: 'text-tone-amber-foreground',
      },
      caution: {
        root: 'border-tone-rose-foreground/50',
        icon: 'text-tone-rose-foreground',
        title: 'text-tone-rose-foreground',
      },
    },
  },
  defaultVariants: { tone: 'note' },
});

export function Callout({ tone = 'note', title, children }: Callout.Props) {
  const Icon = TONES[tone];
  const styles = callout({ tone });

  return (
    <aside className={styles.root()}>
      <p className={styles.title()}>
        <Icon className={styles.icon()} />
        {title}
      </p>

      <div className={styles.body()}>{children}</div>
    </aside>
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
