import {
  ArrowTopRightOnSquareIcon,
  CubeIcon,
  DocumentTextIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { GithubLogoIcon } from '@phosphor-icons/react';
import { zipObject } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import type { IconComponent } from '@/common/lib';

import {
  PROJECT_CATEGORIES,
  PROJECT_LINK_KINDS,
  PROJECT_STATUSES,
  type ProjectLinkKind,
} from '../model';

export function useProjectLabels() {
  const { t } = useTranslation('projects');

  const status = zipObject(
    PROJECT_STATUSES,
    PROJECT_STATUSES.map((key) => t(($) => $.status[key])),
  );

  const link = zipObject(
    PROJECT_LINK_KINDS,
    PROJECT_LINK_KINDS.map((key) => t(($) => $.links[key])),
  );

  const category = zipObject(
    PROJECT_CATEGORIES,
    PROJECT_CATEGORIES.map((key) => t(($) => $.category[key])),
  );

  return { status, link, category };
}

export const PROJECT_LINK_ICON: Record<ProjectLinkKind, IconComponent> = {
  repo: GithubLogoIcon,
  demo: PlayIcon,
  package: CubeIcon,
  post: DocumentTextIcon,
  paper: ArrowTopRightOnSquareIcon,
};
