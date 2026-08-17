import { useTranslation } from 'react-i18next';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  SiteHeader,
  buttonVariants,
} from '@/common/components';
import { DEFAULT_LANGUAGE, localeHref } from '@/common/lib';

export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <SiteHeader lang={DEFAULT_LANGUAGE} />

      <main className="flex flex-1 items-center justify-center p-6">
        <Empty>
          <EmptyHeader>
            {/* EmptyTitle은 div다. 페이지마다 h1이 하나 있어야 해서 안을 h1로 채운다. */}
            <EmptyTitle>
              <h1>{t(($) => $.notFound.title)}</h1>
            </EmptyTitle>
            <EmptyDescription>{t(($) => $.notFound.description)}</EmptyDescription>
          </EmptyHeader>

          <div className="flex flex-wrap justify-center gap-2">
            <a href={localeHref(DEFAULT_LANGUAGE, '/')} className={buttonVariants({ size: 'sm' })}>
              {t(($) => $.notFound.action)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/projects')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.projects)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/blog')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.blog)}
            </a>
          </div>
        </Empty>
      </main>
    </div>
  );
}
