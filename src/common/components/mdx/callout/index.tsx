import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon,
  MegaphoneIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/solid';
import { sva } from 'styled-system/css';

const CALLOUT_KINDS = {
  note: InformationCircleIcon,
  tip: LightBulbIcon,
  important: MegaphoneIcon,
  warning: ExclamationTriangleIcon,
  caution: NoSymbolIcon,
} as const;

const callout = sva({
  slots: ['root', 'icon', 'title', 'body'],
  base: {
    root: {
      my: '6',
      display: 'grid',
      gridTemplateColumns: '[auto 1fr]',
      alignItems: 'center',
      columnGap: '2',
      rowGap: '1',
      roundedRight: 'md',
      borderLeftWidth: '[4px]',
      borderLeftStyle: 'solid',
      bg: 'surface.muted/40',
      px: '4',
      py: '3',
      '& p': { my: '0' },
      '& p + p': { mt: '2' },
      '& :is(ul, ol)': { my: '2' },
    },
    icon: { boxSize: '4', flexShrink: 0 },
    title: { fontWeight: 'medium' },
    body: { gridColumnStart: 2, color: 'text.muted', lineHeight: 'relaxed' },
  },
  variants: {
    tone: {
      note: {
        root: { borderLeftColor: 'tone.blue/50' },
        icon: { color: 'tone.blue' },
        title: { color: 'tone.blue' },
      },
      tip: {
        root: { borderLeftColor: 'tone.green/50' },
        icon: { color: 'tone.green' },
        title: { color: 'tone.green' },
      },
      important: {
        root: { borderLeftColor: 'tone.purple/50' },
        icon: { color: 'tone.purple' },
        title: { color: 'tone.purple' },
      },
      warning: {
        root: { borderLeftColor: 'tone.amber/50' },
        icon: { color: 'tone.amber' },
        title: { color: 'tone.amber' },
      },
      caution: {
        root: { borderLeftColor: 'tone.rose/50' },
        icon: { color: 'tone.rose' },
        title: { color: 'tone.rose' },
      },
    },
  },
  defaultVariants: { tone: 'note' },
});

export function Callout({ tone = 'note', title, children }: Callout.Props) {
  const Icon = CALLOUT_KINDS[tone];
  const styles = callout({ tone });

  return (
    <aside className={styles.root}>
      <Icon className={styles.icon} />
      <p className={styles.title}>{title}</p>

      <div className={styles.body}>{children}</div>
    </aside>
  );
}

export declare namespace Callout {
  export type Tone = keyof typeof CALLOUT_KINDS;

  export type Props = {
    tone?: Tone;
    title?: string;
    children: React.ReactNode;
  };
}
