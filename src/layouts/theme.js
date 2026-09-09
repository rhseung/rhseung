const applyTheme = () => {
  const dark =
    globalThis.__theme === 'dark' ||
    (globalThis.__theme === undefined && matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};

applyTheme();

document.addEventListener('astro:after-swap', applyTheme);
