// `src/content.config.ts`만 예외로 `models`를 직접 가리킨다 — 배럴을 거치면 콘텐츠
// 설정이 React 뷰 전체를 빌드 그래프로 끌어온다.
export { PROJECT_DOMAINS, PROJECT_STATUSES, projectSchema } from './models';
export type { Project, ProjectDomain, ProjectStatus, ProjectSummary } from './models';

export {
  countByDomain,
  filterByDomain,
  parseProjectId,
  pickPinned,
  projectHref,
  sortProjects,
  toProjectSummary,
} from './viewmodels';

export { ProjectCard, ProjectDetailPage, ProjectsPage } from './views';
