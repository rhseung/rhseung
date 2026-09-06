/*
 * `?raw` 로 읽혀 그대로 박히는 파일이다 - import 도 TypeScript 문법도 못 쓴다. 번들되는
 * `<script>` 로 바꾸면 파싱이 끝나야 실행돼(module 은 defer) 테마가 깜빡인다. 그래서
 * `common/lib/theme.ts` 의 판정을 한 벌 더 쓴다 - 어긋나는지는 `theme.test.ts` 가 본다.
 */
const applyTheme = () => {
  const dark =
    globalThis.__theme === 'dark' ||
    (globalThis.__theme === undefined && matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};

applyTheme();

// 스왑이 <html> 의 속성을 지운다.
document.addEventListener('astro:after-swap', applyTheme);
