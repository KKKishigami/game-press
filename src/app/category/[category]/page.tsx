import { notFound } from 'next/navigation';
import { getConsoleArticles, getMobileArticles, getLatestArticles } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return [{ category: 'console' }, { category: 'mobile' }];
}

interface Props {
  params: Promise<{ category: string }>;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  console: { label: 'コンシューマゲーム', color: 'bg-[#cc0000]' },
  mobile:  { label: 'スマートフォンゲーム', color: 'bg-blue-700' },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!categoryConfig[category]) notFound();
  const articles = category === 'console' ? getConsoleArticles() : getMobileArticles();
  const latest = getLatestArticles(5);
  const config = categoryConfig[category];

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <div className="flex gap-3">
        <main className="flex-1 min-w-0">
          <div className={`${config.color} px-3 py-2 mb-3`}>
            <h1 className="text-white font-black text-base">{config.label}</h1>
            <p className="text-white/70 text-xs">{articles.length}件</p>
          </div>
          <AdBanner height="h-14" />
          <div className="mt-3 bg-white border border-gray-200 p-3">
            <div className="divide-y divide-gray-100">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} size="small" />
              ))}
            </div>
          </div>
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
