import { DocumentArrowDownIcon, DocumentTextIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { GithubLogoIcon } from '@phosphor-icons/react';

import type { IconComponent } from '@/common/lib';

import type { ResearchLinkKind } from '../../viewmodels';

export const RESEARCH_LINK_ICON: Record<ResearchLinkKind, IconComponent> = {
  paper: DocumentTextIcon,
  poster: DocumentArrowDownIcon,
  repo: GithubLogoIcon,
  site: GlobeAltIcon,
};
