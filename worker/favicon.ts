import { cacheControl, DAY, empty } from './http';

const SIZE = 64;
const TIMEOUT_MS = 5_000;

const HOST = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

const source = (host: string) => `https://www.google.com/s2/favicons?domain=${host}&sz=${SIZE}`;

function missing() {
  return empty(404, { 'cache-control': cacheControl(DAY) });
}

export async function faviconResponse(host: string): Promise<Response> {
  if (!HOST.test(host)) return missing();

  try {
    const upstream = await fetch(source(host), { signal: AbortSignal.timeout(TIMEOUT_MS) });

    if (!upstream.ok) return missing();

    return new Response(upstream.body, {
      headers: {
        'content-type': upstream.headers.get('content-type') ?? 'image/png',
        'cache-control': cacheControl(DAY, 30 * DAY),
      },
    });
  } catch {
    return missing();
  }
}
