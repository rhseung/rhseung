/**
 * feature 배럴 — 라우트와 다른 feature가 볼 수 있는 유일한 표면.
 * `@/features/projects/viewmodels/select-projects` 같은 접근은 의도적으로 린트 에러다.
 *
 * 예외가 하나 있다: `src/content.config.ts`는 `models`를 직접 가리킨다. 배럴을 거치면
 * 콘텐츠 설정이 React 뷰 전체를 빌드 그래프로 끌어온다.
 */
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
