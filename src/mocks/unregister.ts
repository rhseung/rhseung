/**
 * msw를 import하지 않는다. `mocks/browser`에서 부르면 워커를 걷어내려고 MSW 번들
 * 400KB를 통째로 내려받게 된다 — 목킹이 꺼져 있을 때도 매 페이지에서.
 */
export async function unregisterStaleWorker() {
  const registrations = await navigator.serviceWorker?.getRegistrations();

  await Promise.all(
    (registrations ?? [])
      .filter((registration) => registration.active?.scriptURL.includes('mockServiceWorker'))
      .map((registration) => registration.unregister()),
  );
}
