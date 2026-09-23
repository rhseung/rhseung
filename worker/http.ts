export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function empty(status: number, headers?: HeadersInit): Response {
  return new Response(null, { status, headers });
}

export function cacheControl(maxAge: number, sMaxAge = maxAge): string {
  return `public, max-age=${maxAge}, s-maxage=${sMaxAge}`;
}
