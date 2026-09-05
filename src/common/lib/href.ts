import type { Language } from './languages';
import type { RouteId, Routes } from 'astro-typesafe-routes/path';

export type LocaleRoute = Extract<RouteId, `/[lang]${string}`>;

type Params<T extends RouteId> = Routes[T]['params'] extends readonly string[]
  ? Record<Routes[T]['params'][number], string>
  : Record<never, never>;

type Rest<T extends RouteId> = Omit<Params<T>, 'lang'>;

export type LocaleRouteRef = {
  [T in LocaleRoute]: [keyof Rest<T>] extends [never]
    ? { to: T; params?: undefined }
    : { to: T; params: Rest<T> };
}[LocaleRoute];

function fill(lang: Language, to: string, params?: Record<string, string>): string {
  const values: Record<string, string> = { lang, ...params };
  const path = to.replace(/\[(\w+)\]/g, (_, key: string) => values[key] ?? '');

  return path.endsWith('/') ? path : `${path}/`;
}

export function localeHref<T extends LocaleRoute>(
  lang: Language,
  to: T,
  ...rest: [keyof Rest<T>] extends [never] ? [] : [params: Rest<T>]
): string {
  return fill(lang, to, rest[0] as Record<string, string> | undefined);
}

export function localeHrefOf(lang: Language, route: LocaleRouteRef): string {
  return fill(lang, route.to, route.params);
}
