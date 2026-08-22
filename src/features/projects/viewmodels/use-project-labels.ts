import {
  ArrowSquareOutIcon,
  FileTextIcon,
  GithubLogoIcon,
  PackageIcon,
  PlayIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

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

export const PROJECT_LINK_ICON: Record<ProjectLinkKind, Icon> = {
  repo: GithubLogoIcon,
  demo: PlayIcon,
  package: PackageIcon,
  post: FileTextIcon,
  paper: ArrowSquareOutIcon,
};
