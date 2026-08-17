import { useTranslation } from 'react-i18next';

import type { Resume } from '../../../viewmodels';

/**
 * 인쇄 전용 문서. `bun run gen:resume`이 `/resume/{lang}/`을 Chromium 인쇄 엔진으로 구워
 * `public/resume-{lang}.pdf`를 만든다. `/about`은 그 PDF를 뷰어로 보여주므로, 여기와
 * `/about`이 같은 내용을 두 번 그리지 않는다.
 */
export function ResumeDocument({ name, resume }: ResumeDocument.Props) {
  const { t } = useTranslation('about');

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 print:max-w-none print:px-0 print:py-0">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-muted-foreground">{resume.headline}</p>
        {resume.intro && <p className="text-sm leading-relaxed">{resume.intro}</p>}

        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li>{resume.contact.email}</li>
          <li>{resume.contact.github.replace('https://', '')}</li>
          {resume.contact.site && <li>{resume.contact.site.replace('https://', '')}</li>}
        </ul>
      </header>

      {resume.timeline.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-tight">{t(($) => $.timeline.title)}</h2>

          <ul className="flex flex-col gap-5">
            {resume.timeline.map((item) => (
              // 인쇄에서 한 항목이 두 쪽에 걸쳐 잘리지 않게.
              <li
                key={`${item.period}-${item.org}`}
                className="flex break-inside-avoid flex-col gap-1"
              >
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{item.org}</span>
                  <span className="text-muted-foreground text-sm">{item.role}</span>
                  <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                    {item.period}
                  </span>
                </div>

                {item.points.length > 0 && (
                  <ul className="text-muted-foreground list-disc pl-4 text-sm">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-tight">{t(($) => $.skills.title)}</h2>

          <dl className="flex flex-col gap-2">
            {resume.skills.map((group) => (
              <div key={group.group} className="flex break-inside-avoid gap-3 text-sm">
                <dt className="text-muted-foreground w-24 shrink-0">{group.group}</dt>
                <dd>{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </article>
  );
}

export declare namespace ResumeDocument {
  export type Props = {
    name: string;
    resume: Resume;
  };
}
