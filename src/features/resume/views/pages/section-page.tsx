import { SiteHeader } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

/** 경력·학력·수상·기술 네 페이지가 같은 골격이다. 내용만 갈린다. */
export function SectionPage({ lang, section, title, description, children }: SectionPage.Props) {
  return (
    <div className="bg-background min-h-dvh">
      <SiteHeader
        lang={lang}
        current={section}
        altHref={localeHref(lang === 'ko' ? 'en' : 'ko', `/${section}`)}
      />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>

        {children}
      </main>
    </div>
  );
}

export declare namespace SectionPage {
  export type Section = 'experience' | 'education' | 'awards' | 'skills';

  export type Props = {
    lang: Language;
    section: Section;
    title: string;
    description?: string;
    children: React.ReactNode;
  };
}
