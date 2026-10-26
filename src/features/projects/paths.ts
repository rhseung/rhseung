import { getCollection, render, type CollectionEntry } from 'astro:content';

import { languagePaths } from '@/common/lib';
import { awardsOf } from '@/features/career';

import { detailPaths, detailSlugs } from './lib';
import { projectsOf } from './model';

async function entries() {
  return (await getCollection('projects')) as CollectionEntry<'projects'>[];
}

export async function projectsPaths() {
  const details = await entries();

  return languagePaths().map((path) => {
    const { lang } = path.params;

    return {
      ...path,
      props: {
        ...path.props,
        projects: projectsOf(lang, detailSlugs(details, lang)),
        awards: awardsOf(lang),
      },
    };
  });
}

export async function projectDetailPaths() {
  const details = await entries();

  return Promise.all(
    detailPaths(details).map(async ({ slug, lang, entry, available }) => {
      const project = projectsOf(lang, new Set([slug])).find((item) => item.slug === slug);

      if (project === undefined) throw new Error(`PROJECTS 에 ${slug} 가 없습니다`);

      const linked = new Set(project.awards ?? []);
      const { Content } = await render(entry);

      return {
        params: { lang, slug },
        props: {
          lang,
          slug,
          available,
          project,
          awards: awardsOf(lang).filter((award) => linked.has(award.slug)),
          Content,
        },
      };
    }),
  );
}
