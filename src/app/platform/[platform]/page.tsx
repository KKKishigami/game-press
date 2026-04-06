export const runtime = 'edge';

import { notFound } from 'next/navigation';
import { getArticlesByPlatform, platforms } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

interface Props {
  params: Promise<{ platform: string }>;
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const platformInfo = platforms.find((p) => p.id === platform);
  if (!platformInfo) notFound();

  const articles = getArticlesByPlatform(platform);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${platformInfo.color} rounded-2xl px-6 py-8 mb-8`}>
        <p className="text-white/70 text-sm mb-1">機種別</p>
        <h1 className="text-white font-black text-3xl flex items-center gap-3">
          <span className="text-4xl">{platformInfo.icon}</span>
          {platformInfo.label}
        </h1>
        <p className="text-white/70 text-sm mt-1">{articles.length}件の記事</p>
      </div>

      <AdBanner />

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">この機種の記事はまだありません</p>
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
