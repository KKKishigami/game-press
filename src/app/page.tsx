import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import {
  getLatestArticles,
  getFeaturedArticles,
  getConsoleArticles,
  getMobileArticles,
  platforms,
  eras,
} from '@/lib/mock-data';
import { categoryLabel, articleTypeLabel, articleTypeBadgeColor, formatDate } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  const latest = getLatestArticles(10);
  const featured = getFeaturedArticles();
  const consoleArticles = getConsoleArticles().slice(0, 4);
  const mobileArticles = getMobileArticles().slice(0, 4);

  const [mainFeatured, ...subFeatured] = featured;

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider articles={latest} />

      {/* Ad banner under slider */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdBanner label="広告 (728×90)" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ===== 目玉記事セクション ===== */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-black text-2xl flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full inline-block" />
              注目記事
            </h2>
            <Link href="/category/console" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
              もっと見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {mainFeatured && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Main large card */}
              <div className="lg:col-span-3">
                <Link href={`/articles/${mainFeatured.slug}`} className="group block h-full">
                  <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300 h-full min-h-80">
                    <Image
                      src={mainFeatured.thumbnail}
                      alt={mainFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full">
                        ★ 注目
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${articleTypeBadgeColor(mainFeatured.type)}`}>
                        {articleTypeLabel(mainFeatured.type)}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="text-white font-black text-xl leading-snug mb-2 group-hover:text-purple-200 transition-colors">
                        {mainFeatured.title}
                      </h2>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-2">{mainFeatured.excerpt}</p>
                      <p className="text-gray-500 text-xs">{formatDate(mainFeatured.publishedAt)}</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Sub featured cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {subFeatured.slice(0, 3).map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="group flex gap-3 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-xl p-3 transition-all duration-300">
                    <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1 mb-1">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                          article.category === 'console' ? 'bg-purple-500/30 text-purple-300' : 'bg-cyan-500/30 text-cyan-300'
                        }`}>
                          {categoryLabel(article.category)}
                        </span>
                      </div>
                      <p className="text-white text-xs font-semibold line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{formatDate(article.publishedAt)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ===== コンシューマ / アプリ 最新記事 ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Console */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-black text-xl flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full inline-block" />
                コンシューマゲーム
              </h2>
              <Link href="/category/console" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
                もっと見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {consoleArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="small" />
              ))}
            </div>
          </section>

          {/* Mobile */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-black text-xl flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-500 rounded-full inline-block" />
                アプリゲーム
              </h2>
              <Link href="/category/mobile" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors">
                もっと見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {mobileArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="small" />
              ))}
            </div>
          </section>
        </div>

        {/* ===== 広告バナー ===== */}
        <div className="mb-12">
          <AdBanner label="広告 (300×250)" />
        </div>

        {/* ===== 機種別ショートカット ===== */}
        <section className="mb-12">
          <h2 className="text-white font-black text-xl mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full inline-block" />
            機種別で探す
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {platforms.map((p) => (
              <Link
                key={p.id}
                href={`/platform/${p.id}`}
                className={`bg-gradient-to-br ${p.color} rounded-xl p-3 text-center hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <div className="text-2xl mb-1">{p.icon}</div>
                <p className="text-white font-bold text-xs">{p.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 年代別ショートカット ===== */}
        <section className="mb-12">
          <h2 className="text-white font-black text-xl mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full inline-block" />
            年代別で探す
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {eras.map((e) => (
              <Link
                key={e.id}
                href={`/era/${e.id}`}
                className={`bg-gradient-to-br ${e.color} rounded-xl px-4 py-5 text-center hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <p className="text-white font-black text-lg">{e.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 最新記事一覧 ===== */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-black text-xl flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full inline-block" />
              最新記事
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        </section>

        {/* ===== 広告バナー ===== */}
        <AdBanner label="広告 (レスポンシブ)" />
      </div>
    </div>
  );
}
