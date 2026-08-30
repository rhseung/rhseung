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

/**
 * 서버 스냅숏이 `null` 이라야 빌드 시각이 하이드레이션과 안 갈린다.
 *
 * `setInterval(1000)` 이 아닌 건 틱이 실제 초 경계에서 몇백ms 밀려 쌓이기 때문이다.
 */
export function useKstTime() {
  return useSyncExternalStore(subscribe, read, () => null);
}
