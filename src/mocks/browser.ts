import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

/** `PUBLIC_ENABLE_MSW`가 켜져 있을 때 `AppProviders`가 부른다. */
export async function startMocks() {
  await worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
    serviceWorker: { url: '/mockServiceWorker.js' },
  });
}

/**
 * 서비스워커는 한 번 등록되면 페이지를 새로 고쳐도, 플래그를 꺼도 살아남는다.
 * 그대로 두면 목킹할 것도 없이 모든 요청을 경유시키다가 취소된 요청에서
 * `passthrough` 실패를 던진다. 꺼져 있으면 등록 자체를 걷어낸다.
 */
export async function unregisterStaleWorker() {
  const registrations = await navigator.serviceWorker?.getRegistrations();

  await Promise.all(
    (registrations ?? [])
      .filter((registration) => registration.active?.scriptURL.includes('mockServiceWorker'))
      .map((registration) => registration.unregister()),
  );
}
