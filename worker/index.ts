import { contributionsResponse, refreshContributions } from './contributions';
import { faviconResponse } from './favicon';
import { empty } from './http';
import { renderResumePdfs, resumeResponse } from './resume';
import { rootResponse } from './root';
import { matchRoute } from './routes';

async function cachedFaviconResponse(
  request: Request,
  ctx: ExecutionContext,
  host: string,
): Promise<Response> {
  const cache = await caches.open('favicon');
  const hit = await cache.match(request);

  if (hit !== undefined) return hit;

  const response = await faviconResponse(host);

  if (response.ok || response.status === 404) ctx.waitUntil(cache.put(request, response.clone()));

  return response;
}

function assetResponse(request: Request, env: Env): Promise<Response> {
  return env.ASSETS.fetch(request);
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
        return assetResponse(request, env);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refreshContributions(env));
  },
} satisfies ExportedHandler<Env>;
