import { Badge } from '@/common/components';

import type { SkillGroup } from '../../../viewmodels';

export function SkillGroups({ groups }: SkillGroups.Props) {
  return (
    <dl className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.group} className="flex break-inside-avoid flex-col gap-1.5">
          <dt className="text-muted-foreground text-xs">{group.group}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export declare namespace SkillGroups {
  export type Props = {
    groups: SkillGroup[];
  };
}
