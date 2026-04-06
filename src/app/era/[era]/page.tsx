import { notFound } from 'next/navigation';
import { getArticlesByEra, getLatestArticles, eras } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return eras.map((e) => ({ era: e.id }));
}

interface Props {
  params: Promise<{ era: string }>;
}

export default async function EraPage({ params }: Props) {
  const { era } = await params;
  const eraInfo = eras.find((e) => e.id === era);
  if (!eraInfo) notFound();

  const articles = getArticlesByEra(era);
  const latest = getLatestArticles(5);

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <div className="flex gap-3">
        <main className="flex-1 min-w-0">
          <div className="bg-gray-700 px-3 py-2 mb-3">
            <h1 className="text-white font-black text-base">{eraInfo.label}のゲーム</h1>
            <p className="text-white/60 text-xs">{articles.length}件</p>
          </div>
          <AdBanner height="h-14" />
          {articles.length === 0 ? (
            <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm mt-3">
              この年代の記事はまだありません
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
