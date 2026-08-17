import { useTranslation } from 'react-i18next';

import type { ProjectDomain, ProjectStatus } from '../models';

/** 동적 키는 셀렉터로 못 쓴다 — 정적 맵으로 각 항목을 직접 호출한다. */
export function useProjectLabels() {
  const { t } = useTranslation('projects');

  const domain: Record<ProjectDomain, string> = {
    web: t(($) => $.domain.web),
    systems: t(($) => $.domain.systems),
    backend: t(($) => $.domain.backend),
    graphics: t(($) => $.domain.graphics),
  };

  const status: Record<ProjectStatus, string> = {
    active: t(($) => $.status.active),
    shipped: t(($) => $.status.shipped),
    archived: t(($) => $.status.archived),
  };

  return { domain, status };
}
