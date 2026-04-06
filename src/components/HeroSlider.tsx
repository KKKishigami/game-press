'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate, categoryLabel } from '@/lib/utils';

interface Props { articles: Article[] }

export default function HeroSlider({ articles }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tickerItems = [...articles, ...articles];
  const [main, ...rest] = articles;
  const subs = rest.slice(0, 4);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animFrame: number;
    let pos = 0;
    const speed = 0.4;
    const singleWidth = track.scrollWidth / 2;
    const animate = () => {
      pos += speed;
      if (pos >= singleWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(animate); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
    };
  }, []);

  if (!main) return null;

  return (
    <div className="bg-[#1a1a1a] border-b-2 border-[#cc0000]">
      {/* Hero grid */}
      <div className="max-w-[1200px] mx-auto px-3 pt-3 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          {/* Main large article */}
          <Link href={`/articles/${main.slug}`} className="group sm:col-span-2 relative block overflow-hidden">
            <div className="relative w-full aspect-video bg-gray-800">
              <Image src={main.thumbnail} alt={main.title} fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 640px) 100vw, 66vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5">
                  {categoryLabel(main.category)}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h2 className="text-white text-sm sm:text-base font-bold leading-snug line-clamp-2 group-hover:text-[#ffaaaa] transition-colors">
                  {main.title}
                </h2>
                <p className="text-gray-400 text-[10px] mt-1">{formatDate(main.publishedAt)}</p>
              </div>
            </div>
          </Link>

          {/* Sub articles */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
            {subs.slice(0, 4).map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="group relative block overflow-hidden">
                <div className="relative w-full aspect-video bg-gray-800">
                  <Image src={a.thumbnail} alt={a.title} fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 640px) 50vw, 22vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-white text-[10px] font-medium leading-snug line-clamp-2 group-hover:text-[#ffaaaa] transition-colors">
                      {a.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative overflow-hidden py-1.5 border-t border-[#333]">
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
          {tickerItems.map((article, i) => (
            <Link key={`${article.id}-${i}`} href={`/articles/${article.slug}`} className="flex-shrink-0 w-52 group">
              <div className="flex gap-2 items-center">
                <div className="relative w-16 h-10 flex-shrink-0 overflow-hidden bg-gray-700">
                  <Image src={article.thumbnail} alt={article.title} fill
                    className="object-cover group-hover:opacity-80 transition-opacity" sizes="64px" />
                </div>
                <p className="text-white text-[10px] font-medium line-clamp-2 leading-snug group-hover:text-[#ff6666] transition-colors">
                  {article.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
