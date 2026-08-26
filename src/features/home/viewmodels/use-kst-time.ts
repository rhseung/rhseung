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
  // offsetName()이 Intl의 공식 짧은 표기(`GMT+9`)를 낸다 - 한국은 별도 약어가 없어
  // 이게 그대로 표준 표기다.
  return `${now.format('LTS')} ${now.offsetName()}`;
}

/**
 * 서버가 구운 시각은 빌드 시각에 고정된다. `useSyncExternalStore`로 서버 스냅숏은 `null`,
 * 클라이언트 하이드레이션 뒤에만 실제 시각을 채워 - 언어 제안(`use-language-suggestion`)과
 * 같은 이유다.
 *
 * `setInterval(1000)`이 아니라 다음 초 경계까지 `setTimeout`을 잡는다 - 안 그러면 시작
 * 시점에 따라 틱이 실제 초 경계에서 몇백ms씩 밀려서 숫자가 늦게 바뀌는 게 보인다.
 */
export function useKstTime() {
  return useSyncExternalStore(subscribe, read, () => null);
}
