import { css, cva } from 'styled-system/css';

import { Badge, TechIcon } from '@/common/components';
import { brand } from '@/common/styles';

import type { SkillGroup } from '../../../viewmodels';

const list = cva({
  base: { gap: '4' },
  variants: {
    layout: {
      list: { display: 'flex', flexDirection: 'column' },
      grid: { display: 'grid', sm: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
    },
  },
});
const group = css({ display: 'flex', breakInside: 'avoid', flexDirection: 'column', gap: '1.5' });
const groupName = css({ color: 'text.muted', textStyle: 'caption' });
const items = css({ display: 'flex', flexWrap: 'wrap', gap: '1' });
// `flex` 를 빼면 `inline-flex` baseline 이 첫 자식에서 나와 뱃지끼리 어긋난다.
const item = css({ display: 'flex' });

export function SkillGroups({ groups, layout = 'list' }: SkillGroups.Props) {
  return (
    <dl className={list({ layout })}>
      {groups.map((skillGroup) => (
        <div key={skillGroup.group} className={group}>
          <dt className={groupName}>{skillGroup.group}</dt>
          <dd>
            <ul className={items}>
              {skillGroup.items.map((tech) => (
                <li key={tech.name} className={item}>
                  <Badge variant="secondary" tone="brand" style={brand(tech.hex)}>
                    {tech.icon && <TechIcon icon={tech.icon} />}
                    {tech.name}
                  </Badge>
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
    layout?: 'list' | 'grid';
  };
}
