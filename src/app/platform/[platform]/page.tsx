import { notFound } from 'next/navigation';
import { getArticlesByPlatform, getLatestArticles, platforms } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return platforms.map((p) => ({ platform: p.id }));
}

interface Props {
  params: Promise<{ platform: string }>;
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const platformInfo = platforms.find((p) => p.id === platform);
  if (!platformInfo) notFound();

  const articles = getArticlesByPlatform(platform);
  const latest = getLatestArticles(5);

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <div className="flex gap-3">
        <main className="flex-1 min-w-0">
          <div className="bg-gray-800 px-3 py-2 mb-3 flex items-center gap-2">
            <span className="text-2xl">{platformInfo.icon}</span>
            <div>
              <h1 className="text-white font-black text-base">{platformInfo.label}</h1>
              <p className="text-white/60 text-xs">{articles.length}件</p>
            </div>
          </div>
          <AdBanner height="h-14" />
          {articles.length === 0 ? (
            <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm mt-3">
              この機種の記事はまだありません
            </div>
          ) : (
            <div className="mt-3 bg-white border border-gray-200 p-3">
              <div className="divide-y divide-gray-100">
                {articles.map((a) => (
                  <ArticleCard key={a.id} article={a} size="small" />
                ))}
              </div>
            </div>
          )}
        </main>

        <aside className="hidden md:block w-52 flex-shrink-0 space-y-3">
          <AdBanner label="広告 (300×250)" height="h-60" />
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-800 px-2 py-1">
              <p className="text-white text-xs font-bold">最新記事</p>
            </div>
            <div className="p-2 divide-y divide-gray-100">
              {latest.map((a) => (
                <ArticleCard key={a.id} article={a} size="list" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
