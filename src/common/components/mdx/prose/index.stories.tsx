import { Callout } from '../callout';
import { mdxComponents } from '../components';

import { Prose } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const { h2: H2, h3: H3, a: A, pre: Pre, table: Table } = mdxComponents('ko');

const meta = {
  title: 'Common/MDX/Prose',
  component: Prose,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <p>
          블로그를 새로 깔면 제일 먼저 하는 일이 이거다. 글 하나를 만들어서 쓸 수 있는 걸 전부
          넣어보고, <A href="/ko/blog/">뭐가 깨지는지</A> 본다. 인라인 <code>code</code> 와{' '}
          <strong>강조</strong>도 여기 있다.
        </p>
        <H2 id="list">목록</H2>
        <ul>
          <li>첫 번째</li>
          <li>
            둘째
            <ul>
              <li>안쪽</li>
            </ul>
          </li>
        </ul>
        <ol>
          <li>하나</li>
          <li>둘</li>
        </ol>
        <H3 id="quote">인용과 표</H3>
        <blockquote>
          <p>표는 제 폭 아래로 못 줄어든다.</p>
        </blockquote>
        <Table>
          <thead>
            <tr>
              <th>컬렉션</th>
              <th>원본</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>posts</td>
              <td>content/posts</td>
            </tr>
            <tr>
              <td>projects</td>
              <td>content/projects</td>
            </tr>
          </tbody>
        </Table>
        <Pre data-language="ts">
          <code>{'const answer = 42;\nconsole.log(answer);'}</code>
        </Pre>
        <Callout tone="tip" title="팁">
          <p>콜아웃도 리듬을 따른다.</p>
        </Callout>
        <hr />
        <p>끝.</p>
      </>
    ),
  },
} satisfies Meta<typeof Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {};
