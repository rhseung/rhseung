import { getCollection, type CollectionEntry } from 'astro:content';

import { languagePaths } from '@/common/lib';
import { detailSlugs } from '@/features/projects';

export async function resumePaths() {
  const details = (await getCollection('projects')) as CollectionEntry<'projects'>[];

  return languagePaths().map((path) => ({
    ...path,
    props: { ...path.props, detailSlugs: detailSlugs(details, path.params.lang) },
  }));
}
