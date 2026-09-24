import { contributionsResponse, refreshContributions } from './contributions';
import { faviconResponse } from './favicon';
import { empty } from './http';
import { renderResumePdfs, resumeResponse } from './resume';
import { rootResponse } from './root';
import { matchRoute } from './routes';

import type { Language } from '../src/common/lib/i18n/languages';

async function cachedFaviconResponse(
  request: Request,
  ctx: ExecutionContext,
  host: string,
): Promise<Response> {
  const cache = caches.default;
  const hit = await cache.match(request);

  if (hit !== undefined) return hit;

  const response = await faviconResponse(host);

  if (response.ok || response.status === 404) ctx.waitUntil(cache.put(request, response.clone()));

  return response;
}

async function assetResponse(request: Request, env: Env, lang: Language | null): Promise<Response> {
  const response = await env.ASSETS.fetch(request);

  if (response.status !== 404 || lang === null) return response;

  const localized = await env.ASSETS.fetch(new URL(`/${lang}/404/`, request.url));

  return localized.ok
    ? new Response(localized.body, { status: 404, headers: localized.headers })
    : response;
}

async function renderResumeResponse(request: Request, env: Env, origin: string): Promise<Response> {
  if (
    env.RENDER_TOKEN === undefined ||
    request.headers.get('x-render-token') !== env.RENDER_TOKEN
  ) {
    return empty(401);
  }

  try {
    return Response.json({ written: await renderResumePdfs(env, origin) });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? `${error.name}: ${error.message}` : String(error) },
      { status: 500 },
    );
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const route = matchRoute(url.pathname);

    switch (route.kind) {
      case 'root':
        return rootResponse(request.headers.get('accept-language'));

      case 'favicon':
        return request.method === 'GET'
          ? cachedFaviconResponse(request, ctx, route.host)
          : empty(405);

      case 'contributions':
        return request.method === 'GET' ? contributionsResponse(env) : empty(405);

      case 'resume':
        return resumeResponse(env, route.lang);

      case 'renderResume':
        return request.method === 'POST'
          ? renderResumeResponse(request, env, url.origin)
          : empty(405);

      case 'asset':
        return assetResponse(request, env, route.lang);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refreshContributions(env));
  },
} satisfies ExportedHandler<Env>;
