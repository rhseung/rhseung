import { useSyncExternalStore } from 'react';

import { dayjs } from '@/common/lib';

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
  for (const notify of listeners) notify();
  scheduleNextTick();
}

function scheduleNextTick() {
  timer = setTimeout(tick, 1_000 - (Date.now() % 1_000));
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (listeners.size === 1) scheduleNextTick();

  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

function read() {
  const now = dayjs().tz('Asia/Seoul');
  return `${now.format('LTS')} ${now.offsetName()}`;
}

export function useKstTime() {
  return useSyncExternalStore(subscribe, read, () => null);
}
