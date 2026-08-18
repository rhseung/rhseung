import type { ProjectItem } from './types';

/** `slug` 를 리터럴로 붙잡아 둔다 - 수상 항목이 `project: pingpong.slug` 로 참조한다. */
export const defineProject = <Slug extends string>(item: ProjectItem & { slug: Slug }) => item;
