import { useTranslation } from 'react-i18next';

import { Badge, DetailHeader, SiteDock } from '@/common/components';
import { dayjs, localeHref } from '@/common/lib';

import { PostToc } from '../components';

import type { PostHeading, PostSummary } from '../../viewmodels';

export function PostDetailPage({ post, headings, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');

  const lang = post.lang;

  return (
    <div className="bg-background min-h-dvh">
      {/*
       * `xl` 위에서만 컨테이너가 넓어지고 목차 컬럼이 생긴다. 목차를 본문 바깥 여백에
       * 절대 배치로 얹으면 본문만 가운데에 남아서 화면 전체의 무게중심이 오른쪽으로
       * 쏠린다 - 본문과 목차가 한 덩어리로 가운데에 서야 한다.
       *
       * `xl` 아래로는 컬럼을 만들 폭이 없어 목차를 숨긴다. 좁은 화면에 접이식으로
       * 밀어넣는 대신 없앤 이유는 글 위에 목차가 한 화면을 먹으면 첫 문단이 안 보이기
       * 때문이다.
       */}
      <div className="mx-auto grid w-full max-w-3xl gap-x-10 p-4 sm:p-6 md:p-8 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_13rem]">
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/blog')}
          backLabel={t(($) => $.detail.back)}
          className="xl:col-start-1 xl:col-end-3 xl:row-start-1"
        />

        <main className="flex flex-col gap-8 xl:col-start-1 xl:row-start-2">
          <header className="flex flex-col gap-3">
            <time dateTime={post.date} className="text-muted-foreground text-xs tabular-nums">
              {dayjs(post.date).format('LL')}
            </time>

            <h1 data-vt-title={post.slug} className="text-3xl font-extrabold tracking-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.summary}</p>

            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
        </main>

        {/*
         * 세로 가운데는 `top-1/2 -translate-y-1/2` 가 아니라 뷰포트 높이짜리 sticky 상자로
         * 잡는다 - translate 로 올리면 항목이 늘어 상자가 커질 때 위쪽이 화면 밖으로
         * 잘리고, 그 상태에서 `overflow-y-auto` 가 스크롤할 자리를 못 만든다.
         */}
        {/*
         * 세 아이템 전부 행·열을 명시한다. 하나라도 자동 배치로 두면 이미 차 있는 칸을
         * 피해 암시적 행·열이 생기고(실제로 4행 4열까지 늘어났다) 칸이 통째로 어긋난다.
         *
         * 목차가 `sticky` 가 아니라 `fixed` 인 이유: sticky 는 자기를 담은 상자 안에서만
         * 붙어 있는다. 그 상자가 본문 끝에서 끝나기 때문에 페이지 위아래 끝에서는 목차가
         * 본문을 따라 같이 밀린다. `fixed` 는 그 상자와 무관해서 처음부터 끝까지 안 움직인다.
         *
         * 가로 위치는 안 준다 - `left` 가 `auto` 면 흐름상 있었을 자리(2열)를 그대로 쓴다.
         * 그래서 폭만 열과 같은 값으로 박으면 된다.
         */}
        <aside className="hidden xl:col-start-2 xl:row-start-1 xl:block">
          <div className="fixed top-1/2 w-52 -translate-y-1/2">
            <PostToc headings={headings} className="max-h-[70dvh] w-full overflow-y-auto" />
          </div>
        </aside>
      </div>

      <SiteDock lang={lang} current="blog" />
    </div>
  );
}

export declare namespace PostDetailPage {
  export type Props = {
    post: PostSummary;
    headings: readonly PostHeading[];
    children: React.ReactNode;
  };
}
