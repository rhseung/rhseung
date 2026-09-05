import type { Language } from './languages';
import type { RouteId, Routes } from 'astro-typesafe-routes/path';


export type LocaleRoute = Extract<RouteId, `/[lang]${string}`>;

type Params<T extends RouteId> = Routes[T]['params'] extends readonly string[]
  ? Record<Routes[T]['params'][number], string>
  : Record<never, never>;

type Rest<T extends RouteId> = Omit<Params<T>, 'lang'>;

export function localeHref<T extends LocaleRoute>(
  lang: Language,
  to: T,
  ...rest: [keyof Rest<T>] extends [never] ? [] : [params: Rest<T>]
): string {
  const values: Record<string, string> = { lang, ...rest[0] };
  const path = to.replace(/\[(\w+)\]/g, (_, key: string) => values[key] ?? '');

  return path.endsWith('/') ? path : `${path}/`;
}
