export const runtime = 'edge';

import { notFound } from 'next/navigation';
import { getConsoleArticles, getMobileArticles } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { Category } from '@/types';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryConfig: Record<string, { label: string; accent: string }> = {
  console: { label: 'コンシューマゲーム', accent: 'from-purple-500 to-purple-700' },
  mobile:  { label: 'アプリゲーム',       accent: 'from-cyan-500 to-cyan-700' },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!categoryConfig[category]) notFound();

  const articles =
    category === 'console' ? getConsoleArticles() : getMobileArticles();
  const config = categoryConfig[category];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.accent} rounded-2xl px-6 py-8 mb-8`}>
        <p className="text-white/70 text-sm mb-1">カテゴリ</p>
        <h1 className="text-white font-black text-3xl">{config.label}</h1>
        <p className="text-white/70 text-sm mt-1">{articles.length}件の記事</p>
      </div>

      <AdBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {articles.map((article, i) => (
          <>
            <ArticleCard key={article.id} article={article} size="medium" />
            {(i + 1) % 6 === 0 && (
              <div key={`ad-${i}`} className="sm:col-span-2 lg:col-span-3">
                <AdBanner />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
