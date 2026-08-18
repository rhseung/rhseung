import { useTranslation } from 'react-i18next';

import {
  RESEARCH_KINDS,
  RESEARCH_LINK_KINDS,
  type ResearchKind,
  type ResearchLinkKind,
} from '../models';

export function useResearchLabels() {
  const { t } = useTranslation('research');

  const kind = Object.fromEntries(
    RESEARCH_KINDS.map((key) => [key, t(($) => $.kind[key])]),
  ) as Record<ResearchKind, string>;

  const link = Object.fromEntries(
    RESEARCH_LINK_KINDS.map((key) => [key, t(($) => $.links[key])]),
  ) as Record<ResearchLinkKind, string>;

  return { kind, link };
}
