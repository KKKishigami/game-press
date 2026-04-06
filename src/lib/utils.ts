import { Category, ArticleType } from '@/types';

export const categoryLabel = (category: Category): string => {
  return category === 'console' ? 'コンシューマ' : 'アプリ';
};

export const articleTypeLabel = (type: ArticleType): string => {
  const map: Record<ArticleType, string> = {
    news: 'ニュース',
    release: 'リリース情報',
    interview_summary: 'インタビューまとめ',
    review: 'レビュー',
  };
  return map[type];
};

export const articleTypeBadgeColor = (type: ArticleType): string => {
  const map: Record<ArticleType, string> = {
    news: 'bg-blue-500/80 text-white',
    release: 'bg-green-500/80 text-white',
    interview_summary: 'bg-orange-500/80 text-white',
    review: 'bg-pink-500/80 text-white',
  };
  return map[type];
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
};
