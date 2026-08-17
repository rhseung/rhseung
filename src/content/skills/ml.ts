import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'ml',
  order: 3,
  items: [
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
  ],
  ko: {
    group: '머신러닝',
  },
  en: {
    group: 'Machine learning',
  },
});
