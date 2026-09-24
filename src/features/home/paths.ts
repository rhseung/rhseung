import { execSync } from 'node:child_process';

import { languagePaths } from '@/common/lib';

function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs').toString().trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export function homePaths() {
  const updatedOn = lastCommitDate();

  return languagePaths().map((path) => ({ ...path, props: { ...path.props, updatedOn } }));
}
