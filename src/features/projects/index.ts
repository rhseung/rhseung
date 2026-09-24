export { PROJECT_STATUSES, projectsOf } from './model';
export type { Project, ProjectStatus } from './model';

export { detailPaths, detailSlugs, projectHref, sortProjects } from './lib';

export { ProjectCard, ProjectDetailPage, ProjectsPage } from './components';
export { ProjectsView } from './view';
export { ProjectDetailView } from './view';

export { useProjectFilters, type ProjectFilters } from './hooks';
export { PROJECT_LINK_ICON, useProjectLabels } from './hooks';
