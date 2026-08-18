import { InfoIcon, LightbulbIcon, WarningIcon } from '@phosphor-icons/react';
import { tv } from 'tailwind-variants';

const TONES = {
  note: InfoIcon,
  tip: LightbulbIcon,
  warn: WarningIcon,
} as const;

const callout = tv({
  slots: {
    // prose 가 자식 `<p>`에 1.25em 마진을 준다 — 그대로 두면 제목과 본문이 멀찍이 떨어진다.
    root: 'my-6 rounded-r-md border-l-4 px-4 py-3 [&_p+p]:mt-2 [&_p]:my-0',
    icon: 'mt-0.5 size-4 shrink-0',
    title: 'text-foreground font-medium',
    body: 'text-muted-foreground leading-relaxed',
  },
  variants: {
    tone: {
      note: { root: 'border-border bg-muted/40', icon: 'text-muted-foreground' },
      tip: { root: 'border-primary/60 bg-muted/40', icon: 'text-primary' },
      warn: { root: 'border-destructive/60 bg-muted/40', icon: 'text-destructive' },
    },
  },
  defaultVariants: { tone: 'note' },
});

/** MDX 본문에서 문단 흐름을 끊고 하나를 강조한다. */
export function Callout({ tone = 'note', title, children }: Callout.Props) {
  const Icon = TONES[tone];
  const styles = callout({ tone });

  return (
    <aside className={styles.root()}>
      <div className="flex gap-2.5">
        <Icon weight="fill" className={styles.icon()} />

        <div className="flex min-w-0 flex-col gap-1">
          {title && <p className={styles.title()}>{title}</p>}
          <div className={styles.body()}>{children}</div>
        </div>
      </div>
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
