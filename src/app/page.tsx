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
import { ChevronRight } from 'lucide-react';

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-bebas text-[#e8000d] text-xs tracking-[0.3em]">{number}</span>
      <div className="flex-1 h-px bg-[#1a1a1a]" />
      <span className="font-bebas text-white text-xl tracking-widest">{title}</span>
      <div className="w-8 h-px bg-[#e8000d]" />
    </div>
  );
}

export default function HomePage() {
  const latest = getLatestArticles(10);
  const featured = getFeaturedArticles();
  const consoleArticles = getConsoleArticles();
  const mobileArticles = getMobileArticles();
  const [hero, ...rest] = featured;

  return (
    <div className="bg-black pt-14">
      {/* Ticker */}
      <HeroSlider articles={latest} />

      {/* ===== HERO ===== */}
      {hero && (
        <section className="relative">
          <ArticleCard article={hero} size="hero" />
          {/* Scroll indicator */}
          <div className="absolute bottom-4 right-6 flex flex-col items-center gap-1 opacity-40">
            <span className="font-bebas text-[10px] tracking-[0.3em] text-white rotate-90 origin-center translate-x-3">SCROLL</span>
            <div className="w-px h-8 bg-white" />
          </div>
        </section>
      )}

      <div className="max-w-[1400px] mx-auto px-6">

        {/* Ad */}
        <div className="py-6">
          <AdBanner height="h-16" />
        </div>

        {/* ===== 01 FEATURED ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <SectionLabel number="01" title="FEATURED" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.slice(0, 3).map((a) => (
              <ArticleCard key={a.id} article={a} size="large" />
            ))}
          </div>
        </section>

        {/* ===== 02 LATEST NEWS ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="font-bebas text-[#e8000d] text-xs tracking-[0.3em]">02</span>
              <div className="w-8 h-px bg-[#1a1a1a]" />
              <span className="font-bebas text-white text-xl tracking-widest">LATEST NEWS</span>
            </div>
            <Link href="/category/console" className="font-bebas text-xs tracking-widest text-[#888] hover:text-white flex items-center gap-1 transition-colors border border-[#333] hover:border-white px-3 py-1">
              ALL NEWS <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メイン記事リスト */}
            <div className="lg:col-span-2 space-y-0 divide-y divide-[#1a1a1a]">
              {latest.slice(0, 6).map((a) => (
                <ArticleCard key={a.id} article={a} size="small" />
              ))}
            </div>

            {/* サイドランキング */}
            <div className="space-y-6">
              <div>
                <p className="font-bebas text-xs tracking-[0.3em] text-[#e8000d] mb-4 border-b border-[#1a1a1a] pb-2">RANKING</p>
                <div className="space-y-4">
                  {latest.slice(0, 5).map((a, i) => (
                    <Link key={a.id} href={`/articles/${a.slug}`} className="group flex gap-4 items-start">
                      <span className="font-bebas text-3xl leading-none text-[#1a1a1a] group-hover:text-[#e8000d] transition-colors flex-shrink-0 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[#888] text-xs leading-snug group-hover:text-white transition-colors line-clamp-2">
                        {a.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <AdBanner label="広告" height="h-48" />
            </div>
          </div>
        </section>

        {/* ===== 03 CONSOLE ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <SectionLabel number="03" title="CONSOLE" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {consoleArticles.slice(0, 4).map((a) => (
              <ArticleCard key={a.id} article={a} size="medium" />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/category/console" className="inline-block font-bebas tracking-widest text-sm border border-[#333] hover:border-[#e8000d] text-[#888] hover:text-[#e8000d] px-8 py-2 transition-colors">
              VIEW ALL CONSOLE →
            </Link>
          </div>
        </section>

        {/* Ad */}
        <AdBanner height="h-16" />

        {/* ===== 04 MOBILE ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <SectionLabel number="04" title="MOBILE" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mobileArticles.slice(0, 4).map((a) => (
              <ArticleCard key={a.id} article={a} size="medium" />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/category/mobile" className="inline-block font-bebas tracking-widest text-sm border border-[#333] hover:border-[#e8000d] text-[#888] hover:text-[#e8000d] px-8 py-2 transition-colors">
              VIEW ALL MOBILE →
            </Link>
          </div>
        </section>

        {/* ===== 05 PLATFORM ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <SectionLabel number="05" title="PLATFORM" />
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {platforms.map((p) => (
              <Link
                key={p.id}
                href={`/platform/${p.id}`}
                className="group border border-[#1a1a1a] hover:border-[#e8000d] transition-colors p-4 text-center"
              >
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="font-bebas text-xs tracking-widest text-[#666] group-hover:text-white transition-colors">{p.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 06 ERA ===== */}
        <section className="py-12 border-t border-[#1a1a1a]">
          <SectionLabel number="06" title="ERA" />
          <div className="grid grid-cols-5 gap-2">
            {eras.map((e, i) => (
              <Link
                key={e.id}
                href={`/era/${e.id}`}
                className="group relative border border-[#1a1a1a] hover:border-[#e8000d] transition-colors p-6 text-center overflow-hidden"
              >
                <span className="absolute top-2 right-2 font-bebas text-[40px] leading-none text-[#0a0a0a] group-hover:text-[#150000] transition-colors select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-bebas text-sm tracking-widest text-[#888] group-hover:text-white transition-colors relative z-10">{e.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad bottom */}
        <div className="py-6 border-t border-[#1a1a1a]">
          <AdBanner height="h-16" />
        </div>
      </div>
    </div>
  );
}
