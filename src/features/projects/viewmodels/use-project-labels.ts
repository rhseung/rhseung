import {
  ArrowTopRightOnSquareIcon,
  CubeIcon,
  DocumentTextIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import type { IconComponent } from '@/common/lib';

import {
  PROJECT_LINK_KINDS,
  PROJECT_STATUSES,
  type ProjectLinkKind,
  type ProjectStatus,
} from '../models';

export function useProjectLabels() {
  const { t } = useTranslation('projects');

  const status = Object.fromEntries(
    PROJECT_STATUSES.map((key) => [key, t(($) => $.status[key])]),
  ) as Record<ProjectStatus, string>;

  const link = Object.fromEntries(
    PROJECT_LINK_KINDS.map((key) => [key, t(($) => $.links[key])]),
  ) as Record<ProjectLinkKind, string>;

  return { status, link };
}

export const PROJECT_LINK_ICON: Record<ProjectLinkKind, IconComponent> = {
  repo: GithubLogoIcon,
  demo: PlayIcon,
  package: CubeIcon,
  post: DocumentTextIcon,
  paper: ArrowTopRightOnSquareIcon,
};
