import { ArticleIcon, FilePdfIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react';

import type { ResearchLinkKind } from '../../viewmodels';

export const RESEARCH_LINK_ICON: Record<ResearchLinkKind, typeof ArticleIcon> = {
  paper: ArticleIcon,
  poster: FilePdfIcon,
  repo: GithubLogoIcon,
  site: GlobeIcon,
};
