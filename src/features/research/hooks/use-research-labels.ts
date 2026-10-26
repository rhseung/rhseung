import { DocumentArrowDownIcon, DocumentTextIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { GithubLogoIcon } from '@phosphor-icons/react';
import { zipObject } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import type { IconComponent } from '@/common/lib';

import { RESEARCH_KINDS, RESEARCH_LINK_KINDS } from '../model';

import type { ResearchLinkKind } from '../model';

export const RESEARCH_LINK_ICON: Record<ResearchLinkKind, IconComponent> = {
  paper: DocumentTextIcon,
  poster: DocumentArrowDownIcon,
  repo: GithubLogoIcon,
  site: GlobeAltIcon,
};

export function useResearchLabels() {
  const { t } = useTranslation('research');

  const kind = zipObject(
    RESEARCH_KINDS,
    RESEARCH_KINDS.map((key) => t(($) => $.kind[key])),
  );

  const link = zipObject(
    RESEARCH_LINK_KINDS,
    RESEARCH_LINK_KINDS.map((key) => t(($) => $.links[key])),
  );

  return { kind, link };
}
