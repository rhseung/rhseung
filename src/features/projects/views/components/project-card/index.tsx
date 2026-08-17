import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/common/components';

import { useProjectLabels, type ProjectSummary } from '../../../viewmodels';

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function ProjectCard({ project, href }: ProjectCard.Props) {
  const { t } = useTranslation('projects');
  const label = useProjectLabels();

  const period = project.end
    ? `${formatMonth(project.start)} – ${formatMonth(project.end)}`
    : `${formatMonth(project.start)} – ${t(($) => $.period.ongoing)}`;

  return (
    <Card className="gap-3 py-5">
      <CardHeader className="gap-2 px-5">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline">{label.domain[project.domain]}</Badge>
          <Badge variant={project.status === 'archived' ? 'ghost' : 'secondary'}>
            {label.status[project.status]}
          </Badge>
          <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
        </div>

        <CardTitle className="text-base">
          <a href={href} className="hover:underline">
            {project.title}
          </a>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5">
        <p className="text-muted-foreground text-sm">{project.summary}</p>

        {project.highlight && (
          <p className="border-border border-l-2 pl-3 text-sm font-medium">{project.highlight}</p>
        )}

        <ul className="flex flex-wrap gap-1">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge variant="ghost">{item}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export declare namespace ProjectCard {
  export type Props = {
    project: ProjectSummary;
    /** 언어에 맞는 상세 경로. 라우팅을 아는 건 페이지 쪽이다. */
    href: string;
  };
}
