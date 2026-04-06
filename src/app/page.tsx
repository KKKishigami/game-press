import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { getLatestArticles, getFeaturedArticles, getConsoleArticles, getMobileArticles, platforms, eras } from '@/lib/mock-data';
import { categoryLabel, articleTypeLabel, articleTypeBadgeColor, formatDate } from '@/lib/utils';
import { ChevronRight, TrendingUp } from 'lucide-react';

function SectionHeader({ title, href, color = 'border-[#cc0000]' }: { title: string; href?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-between mb-2 border-b-2 ${color} pb-1`}>
      <h2 className="text-sm font-black text-gray-800 flex items-center gap-1">
        <span className="w-1 h-4 bg-[#cc0000] inline-block" />{title}
      </h2>
      {href && (
        <Link href={href} className="text-[#cc0000] text-xs flex items-center hover:underline">
          もっと見る <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const latest = getLatestArticles(10);
  const featured = getFeaturedArticles();
  const consoleArticles = getConsoleArticles();
  const mobileArticles = getMobileArticles();
  const [mainFeatured, ...subFeatured] = featured;

  return (
    <div className="bg-[#f0f0f0]">
      <HeroSlider articles={latest} />
      <div className="max-w-[1200px] mx-auto px-3 py-3">
        <div className="mb-3"><AdBanner label="広告 (728×90)" height="h-16" /></div>

        <div className="flex gap-3">
          {/* 左サイドバー */}
          <aside className="hidden lg:block w-44 flex-shrink-0 space-y-3">
            <div className="bg-white border border-gray-200">
              <div className="bg-[#cc0000] px-2 py-1"><p className="text-white text-xs font-bold">機種別</p></div>
              <div className="p-1">
                {platforms.map((p) => (
                  <Link key={p.id} href={`/platform/${p.id}`}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#cc0000] border-b border-gray-100 last:border-0 transition-colors">
                    <span>{p.icon}</span>{p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200">
              <div className="bg-gray-700 px-2 py-1"><p className="text-white text-xs font-bold">年代別</p></div>
              <div className="p-1">
                {eras.map((e) => (
                  <Link key={e.id} href={`/era/${e.id}`}
                    className="block px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#cc0000] border-b border-gray-100 last:border-0 transition-colors">
                    {e.label}
                  </Link>
                ))}
              </div>
            </div>
            <AdBanner label="広告" height="h-48" />
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 min-w-0 space-y-4">
            {/* 注目記事 */}
            {mainFeatured && (
              <section>
                <SectionHeader title="注目記事" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ArticleCard article={mainFeatured} size="large" />
                  <div className="grid grid-cols-2 gap-2">
                    {subFeatured.slice(0, 4).map((a) => (
                      <ArticleCard key={a.id} article={a} size="medium" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* コンシューマ */}
            <section>
              <SectionHeader title="コンシューマゲーム" href="/category/console" />
              <div className="bg-white border border-gray-200 p-3 divide-y divide-gray-100">
                {consoleArticles.map((a) => <ArticleCard key={a.id} article={a} size="small" />)}
              </div>
            </section>

            <AdBanner label="広告 (記事間)" height="h-16" />

            {/* スマホ */}
            <section>
              <SectionHeader title="スマートフォンゲーム" href="/category/mobile" />
              <div className="bg-white border border-gray-200 p-3 divide-y divide-gray-100">
                {mobileArticles.map((a) => <ArticleCard key={a.id} article={a} size="small" />)}
              </div>
            </section>

            {/* 機種別 */}
            <section>
              <SectionHeader title="機種別で探す" />
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-1.5">
                {platforms.map((p) => (
                  <Link key={p.id} href={`/platform/${p.id}`}
                    className="bg-white border border-gray-200 hover:border-[#cc0000] hover:bg-red-50 transition-colors text-center py-2 px-1 group">
                    <div className="text-xl mb-0.5">{p.icon}</div>
                    <p className="text-[10px] font-bold text-gray-700 group-hover:text-[#cc0000]">{p.label}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* 年代別 */}
            <section>
              <SectionHeader title="年代別で探す" />
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {eras.map((e) => (
                  <Link key={e.id} href={`/era/${e.id}`}
                    className="bg-gray-700 hover:bg-[#cc0000] transition-colors text-center py-3 group">
                    <p className="text-xs font-bold text-white">{e.label}</p>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          {/* 右サイドバー */}
          <aside className="hidden md:block w-52 flex-shrink-0 space-y-3">
            <AdBanner label="広告 (300×250)" height="h-60" />

            {/* ランキング */}
            <div className="bg-white border border-gray-200">
              <div className="bg-gray-800 px-2 py-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#cc0000]" />
                <p className="text-white text-xs font-bold">アクセスランキング</p>
              </div>
              <div className="p-2">
                <div className="flex border-b border-gray-200 mb-2">
                  <button className="flex-1 text-[10px] font-bold text-[#cc0000] border-b-2 border-[#cc0000] py-1">日間</button>
                  <button className="flex-1 text-[10px] text-gray-400 py-1">週間</button>
                </div>
                <div className="space-y-2">
                  {latest.slice(0, 5).map((a, i) => (
                    <Link key={a.id} href={`/articles/${a.slug}`} className="group flex gap-2 items-start">
                      <span className={`text-sm font-black flex-shrink-0 w-5 text-center ${i === 0 ? 'text-[#cc0000]' : i === 1 ? 'text-gray-600' : i === 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                        {i + 1}
                      </span>
                      <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors">
                        {a.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 最新記事 */}
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
    </div>
  );
}
