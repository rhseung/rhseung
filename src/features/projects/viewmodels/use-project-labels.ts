import { useTranslation } from 'react-i18next';

import type { ProjectDomain, ProjectStatus } from '../models';

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
