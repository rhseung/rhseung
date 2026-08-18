import {
  ArrowSquareOutIcon,
  FileTextIcon,
  GithubLogoIcon,
  PackageIcon,
  PlayIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import type { ProjectDomain, ProjectLinkKind, ProjectStatus } from '../models';

/** 셀렉터는 동적 키를 못 받는다 — 종류마다 한 줄씩 적어 누락이 컴파일에 걸리게 한다. */
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

  const link: Record<ProjectLinkKind, string> = {
    repo: t(($) => $.links.repo),
    demo: t(($) => $.links.demo),
    package: t(($) => $.links.package),
    post: t(($) => $.links.post),
    paper: t(($) => $.links.paper),
  };

  return { domain, status, link };
}

export const PROJECT_LINK_ICON: Record<ProjectLinkKind, Icon> = {
  repo: GithubLogoIcon,
  demo: PlayIcon,
  package: PackageIcon,
  post: FileTextIcon,
  paper: ArrowSquareOutIcon,
};
