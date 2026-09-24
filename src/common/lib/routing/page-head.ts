import { IS_PRODUCTION } from '../env';
import { localeHrefOf, type LocaleRouteRef } from './href';
import { isNoindex } from './noindex';
import { pageSchema } from './schema';
import { sectionOf } from './sections';
import { SITE } from './site';
import { i18n } from '../i18n/i18n';
import { DEFAULT_LANGUAGE, LANGUAGES, languageTag, type Language } from '../i18n/languages';

export type PageHeadInput = {
  lang: Language;
  title?: string;
  description?: string;
  route?: LocaleRouteRef;
  wip?: boolean;
  available?: readonly Language[];
  image?: string;
  type?: 'website' | 'article';
  published?: string;
};

export function pageHead(props: PageHeadInput, url: URL, site: URL | undefined) {
  const {
    lang,
    route,
    wip = false,
    available,
    image = SITE.ogImage,
    type = 'website',
    published,
  } = props;

  const t = i18n.getFixedT(lang, 'common');
  const section = route === undefined ? undefined : sectionOf(route.to);
  const title = props.title ?? (section === undefined ? SITE.title : t(($) => $.nav[section]));

  const canonical = new URL(url.pathname, site);
  const hidden = IS_PRODUCTION && wip;
  const ogImage = image ? new URL(image, site) : undefined;

  const langs = available ?? LANGUAGES;
  const alternates =
    route !== undefined && langs.length > 1
      ? langs.map((other) => [other, new URL(localeHrefOf(other, route), site)] as const)
      : [];

  const summary = props.description ?? t(($) => $.site.description);

  return {
    lang,
    route,
    available,
    type,
    published,
    section,
    hidden,
    canonical,
    ogImage,
    summary,
    alternates,
    ogLocale: languageTag(lang).replace('-', '_'),
    documentTitle: title === SITE.title ? title : `${title} — ${SITE.title}`,
    noindex: !IS_PRODUCTION || isNoindex(canonical.pathname) || hidden,
    xDefault:
      route !== undefined && alternates.length > 0 && langs.includes(DEFAULT_LANGUAGE)
        ? new URL(localeHrefOf(DEFAULT_LANGUAGE, route), site)
        : undefined,
    schema: pageSchema({
      type,
      lang,
      title,
      description: summary,
      author: t(($) => $.site.name),
      canonical: canonical.href,
      published,
      image: ogImage?.href,
    }),
  };
}
