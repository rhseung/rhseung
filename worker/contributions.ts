import { cacheControl, HOUR } from './http';
import { SITE } from '../src/common/lib/routing/site';
import { upstreamSchema } from '../src/features/home/model/contributions-schema';

const UPSTREAM = 'https://github-contributions-api.jogruber.de/v4';

const KEY = 'v2';

type Needs = Pick<Env, 'CONTRIBUTIONS'>;

async function fromUpstream(): Promise<string> {
  const response = await fetch(`${UPSTREAM}/${SITE.handle}?y=last`, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`잔디 응답이 ${response.status} 다`);

  return JSON.stringify(upstreamSchema.parse(await response.json()));
}

export async function refreshContributions(env: Needs): Promise<number> {
  const body = await fromUpstream();

  await env.CONTRIBUTIONS.put(KEY, body);

  return body.length;
}

export async function contributionsResponse(env: Needs): Promise<Response> {
  const cached = await env.CONTRIBUTIONS.get(KEY);

  const body =
    cached ??
    (await fromUpstream().then(async (fresh) => {
      await env.CONTRIBUTIONS.put(KEY, fresh);
      return fresh;
    }));

  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cacheControl(HOUR),
    },
  });
}
