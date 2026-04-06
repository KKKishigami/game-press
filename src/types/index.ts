export type Category = 'console' | 'mobile';

export type ArticleType = 'news' | 'release' | 'interview_summary' | 'review';

export type Platform =
  | 'PS5'
  | 'PS4'
  | 'Switch'
  | 'Xbox'
  | 'PC'
  | 'iOS'
  | 'Android';

export type Era =
  | '1980s'
  | '1990s'
  | '2000s'
  | '2010s'
  | '2020s';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  thumbnail: string;
  category: Category;
  type: ArticleType;
  platforms: Platform[];
  eras: Era[];
  tags: string[];
  youtubeUrl?: string;
  publishedAt: string;
  isFeatured: boolean;
  author: string;
  source?: {
    name: string;
    url: string;
  };
}
