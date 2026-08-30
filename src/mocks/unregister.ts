/** msw 를 import 하지 않는다. 걷어내자고 400KB 번들을 매 페이지에서 받게 된다. */
export async function unregisterStaleWorker() {
  const registrations = await navigator.serviceWorker?.getRegistrations();

  await Promise.all(
    (registrations ?? [])
      .filter((registration) => registration.active?.scriptURL.includes('mockServiceWorker'))
      .map((registration) => registration.unregister()),
  );
}
