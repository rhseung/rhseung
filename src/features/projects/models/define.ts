import type { ProjectItem } from './types';

/** `slug` 를 리터럴로 붙잡아 둔다. */
export const defineProject = <Slug extends string>(item: ProjectItem & { slug: Slug }) => item;
