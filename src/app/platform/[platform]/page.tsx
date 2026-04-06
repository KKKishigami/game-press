import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByPlatform, getLatestArticles, platforms } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { TrendingUp } from 'lucide-react';

export function generateStaticParams() {
  return platforms.map((p) => ({ platform: p.id }));
}

interface Props { params: Promise<{ platform: string }> }

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const info = platforms.find((p) => p.id === platform);
  if (!info) notFound();
  const articles = getArticlesByPlatform(platform);
  const latest = getLatestArticles(8);

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <Link href="/" className="hover:text-[#cc0000]">TOP</Link>
        <span>›</span>
        <span className="text-gray-400">{info.icon} {info.label}</span>
      </nav>

      <div className="flex gap-3">
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 border-b-2 border-[#cc0000] pb-1">
            <h1 className="text-sm font-black text-gray-800 flex items-center gap-1">
              <span className="w-1 h-4 bg-[#cc0000] inline-block" />
              <span>{info.icon}</span>{info.label}
            </h1>
            <span className="text-xs text-gray-400">{articles.length}件</span>
          </div>

          <div className="mb-3"><AdBanner label="広告 (728×90)" height="h-16" /></div>

          <div className="bg-white border border-gray-200 p-3 divide-y divide-gray-100">
            {articles.length === 0 ? (
              <p className="text-gray-400 text-sm py-8 text-center">記事がありません</p>
            ) : (
              articles.map((a) => <ArticleCard key={a.id} article={a} size="small" />)
            )}
          </div>
        </main>

        <aside className="hidden md:block w-52 flex-shrink-0 space-y-3">
          <AdBanner label="広告 (300×250)" height="h-60" />
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-800 px-2 py-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#cc0000]" />
              <p className="text-white text-xs font-bold">アクセスランキング</p>
            </div>
            <div className="p-2 space-y-2">
              {latest.slice(0, 5).map((a, i) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group flex gap-2 items-start">
                  <span className={`text-sm font-black flex-shrink-0 w-5 text-center ${i === 0 ? 'text-[#cc0000]' : i < 3 ? 'text-gray-600' : 'text-gray-400'}`}>{i + 1}</span>
                  <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-800 px-2 py-1"><p className="text-white text-xs font-bold">最新記事</p></div>
            <div className="p-2 divide-y divide-gray-100">
              {latest.slice(0, 6).map((a) => <ArticleCard key={a.id} article={a} size="list" />)}
            </div>
          </div>
          <AdBanner label="広告 (300×600)" height="h-72" />
        </aside>
      </div>
    </div>
  );
}
