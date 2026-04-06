export const runtime = 'edge';

import { notFound } from 'next/navigation';
import { getArticlesByEra, eras } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

interface Props {
  params: Promise<{ era: string }>;
}

export default async function EraPage({ params }: Props) {
  const { era } = await params;
  const eraInfo = eras.find((e) => e.id === era);
  if (!eraInfo) notFound();

  const articles = getArticlesByEra(era);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${eraInfo.color} rounded-2xl px-6 py-8 mb-8`}>
        <p className="text-white/70 text-sm mb-1">年代別</p>
        <h1 className="text-white font-black text-3xl">{eraInfo.label}</h1>
        <p className="text-white/70 text-sm mt-1">{articles.length}件の記事</p>
      </div>

      <AdBanner />

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">この年代の記事はまだありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
}
