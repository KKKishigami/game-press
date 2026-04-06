import { notFound } from 'next/navigation';
import { getArticlesByEra, getLatestArticles, eras } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return eras.map((e) => ({ era: e.id }));
}

interface Props { params: Promise<{ era: string }> }

export default async function EraPage({ params }: Props) {
  const { era } = await params;
  const info = eras.find((e) => e.id === era);
  if (!info) notFound();
  const articles = getArticlesByEra(era);
  const latest = getLatestArticles(5);

  return (
    <div className="bg-black pt-14 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="border-b border-[#1a1a1a] pb-4 mb-8">
          <p className="font-bebas text-[#e8000d] text-xs tracking-[0.3em] mb-1">ERA</p>
          <h1 className="font-black text-white text-3xl">{info.label}</h1>
          <p className="text-[#444] text-xs">{articles.length} articles</p>
        </div>
        <AdBanner height="h-14" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {articles.length === 0 ? (
              <p className="text-[#444] font-bebas tracking-widest py-16 text-center">NO ARTICLES YET.</p>
            ) : (
              <div className="divide-y divide-[#1a1a1a]">
                {articles.map((a) => <ArticleCard key={a.id} article={a} size="small" />)}
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <AdBanner label="広告" height="h-60" />
            <div className="border border-[#1a1a1a] p-4 divide-y divide-[#1a1a1a]">
              <p className="font-bebas tracking-widest text-white text-sm pb-3">LATEST</p>
              {latest.map((a) => <ArticleCard key={a.id} article={a} size="list" />)}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
