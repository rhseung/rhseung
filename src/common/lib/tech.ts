/**
 * 기술 이름의 정본. 프로젝트 스택과 기술 그룹이 같은 어휘를 쓴다 —
 * 한쪽에 `typscript`를 적으면 컴파일이 깨지고, 같은 것이 두 이름으로 갈리지도 않는다.
 */
export const TECH = [
  // 언어
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Kotlin',
  'C',
  'C++',
  'Dart',
  'Rust',
  // 웹
  'React',
  'Next.js',
  'Astro',
  'TanStack Router',
  'TanStack Query',
  'React Router',
  'Tailwind CSS',
  'Vanilla Extract',
  'Styled Components',
  'i18next',
  'Vite',
  'HTML',
  'CSS',
  'OpenAPI TypeScript',
  // 백엔드·데이터
  'Node.js',
  'Nest.js',
  'Flask',
  'Prisma',
  'MySQL',
  'PostgreSQL',
  // 머신러닝
  'PyTorch',
  'TensorFlow',
  'Keras',
  'scikit-learn',
  'OpenCV',
  'NumPy',
  'Pandas',
  'Matplotlib',
  'Seaborn',
  'Altair',
  'Jupyter',
  // 앱·그래픽스
  'Flutter',
  'SFML',
  'Swing',
  'LLVM',
  // 도구
  'Bun',
  'npm',
  'Yarn',
  'PyPI',
  'Figma',
  'LaTeX',
] as const;

export type Tech = (typeof TECH)[number];
