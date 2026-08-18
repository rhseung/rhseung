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
  PROJECT_DOMAINS,
  PROJECT_LINK_KINDS,
  PROJECT_STATUSES,
  type ProjectDomain,
  type ProjectLinkKind,
  type ProjectStatus,
} from '../models';

/**
 * 셀렉터에 브래킷 접근이 통한다 — i18next-cli 도 이 형태를 읽어서 그 하위 키를 안 지운다.
 * 단 `t(($) => $.x[key])` 가 **소스에 그대로** 보여야 한다. 헬퍼 함수로 감싸면 추출기가
 * 못 읽고 다음 `bun run gen` 에 키가 통째로 사라진다.
 */
export function useProjectLabels() {
  const { t } = useTranslation('projects');

  const domain = Object.fromEntries(
    PROJECT_DOMAINS.map((key) => [key, t(($) => $.domain[key])]),
  ) as Record<ProjectDomain, string>;

  const status = Object.fromEntries(
    PROJECT_STATUSES.map((key) => [key, t(($) => $.status[key])]),
  ) as Record<ProjectStatus, string>;

  const link = Object.fromEntries(
    PROJECT_LINK_KINDS.map((key) => [key, t(($) => $.links[key])]),
  ) as Record<ProjectLinkKind, string>;

  return { domain, status, link };
}

export const PROJECT_LINK_ICON: Record<ProjectLinkKind, Icon> = {
  repo: GithubLogoIcon,
  demo: PlayIcon,
  package: PackageIcon,
  post: FileTextIcon,
  paper: ArrowSquareOutIcon,
};
