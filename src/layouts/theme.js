/*
 * `?raw` 로 읽혀 그대로 박히는 파일이다 - import 도 TypeScript 문법도 못 쓴다. 번들되는
 * `<script>` 로 바꾸면 파싱이 끝나야 실행돼(module 은 defer) 테마가 깜빡인다.
 */
const applyTheme = () => {
  const stored = localStorage.getItem('theme') ?? 'system';
  const dark =
    stored === 'dark' ||
    (stored === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
};

applyTheme();

document.addEventListener('astro:after-swap', applyTheme);
