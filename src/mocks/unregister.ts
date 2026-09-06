export async function unregisterStaleWorker() {
  const registrations = await navigator.serviceWorker?.getRegistrations();

  await Promise.all(
    (registrations ?? [])
      .filter((registration) => registration.active?.scriptURL.includes('mockServiceWorker'))
      .map((registration) => registration.unregister()),
  );
}
