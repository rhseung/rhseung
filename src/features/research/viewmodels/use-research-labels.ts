import { zipObject } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { RESEARCH_KINDS, RESEARCH_LINK_KINDS } from '../models';

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
