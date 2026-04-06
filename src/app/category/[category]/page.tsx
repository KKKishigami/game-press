import { notFound } from 'next/navigation';
import { getConsoleArticles, getMobileArticles, getLatestArticles } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return [{ category: 'console' }, { category: 'mobile' }];
}

interface Props { params: Promise<{ category: string }> }

const config: Record<string, { label: string; en: string }> = {
  console: { label: 'コンシューマゲーム', en: 'CONSOLE' },
  mobile:  { label: 'スマートフォンゲーム', en: 'MOBILE' },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!config[category]) notFound();
  const articles = category === 'console' ? getConsoleArticles() : getMobileArticles();
  const latest = getLatestArticles(5);
  const { label, en } = config[category];

  return (
    <div className="bg-black pt-14 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="border-b border-[#1a1a1a] pb-4 mb-8">
          <p className="font-bebas text-[#e8000d] text-xs tracking-[0.3em] mb-1">{en}</p>
          <h1 className="font-black text-white text-3xl">{label}</h1>
          <p className="text-[#444] text-xs mt-1">{articles.length} articles</p>
        </div>
        <AdBanner height="h-14" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 divide-y divide-[#1a1a1a]">
            {articles.map((a) => <ArticleCard key={a.id} article={a} size="small" />)}
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
