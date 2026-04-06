'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface Props {
  articles: Article[];
}

export default function HeroSlider({ articles }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...articles, ...articles];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animFrame: number;
    let pos = 0;
    const speed = 0.5;
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

  return (
    <div className="relative bg-[#222] overflow-hidden py-2 border-b-2 border-[#cc0000]">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#222] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#222] to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: 'max-content' }}>
        {items.map((article, i) => (
          <Link
            key={`${article.id}-${i}`}
            href={`/articles/${article.slug}`}
            className="flex-shrink-0 w-56 group"
          >
            <div className="flex gap-2 items-center">
              <div className="relative w-20 h-12 flex-shrink-0 overflow-hidden bg-gray-700">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:opacity-80 transition-opacity"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-medium line-clamp-2 leading-snug group-hover:text-[#ff6666] transition-colors">
                  {article.title}
                </p>
                <p className="text-gray-400 text-[10px] mt-0.5">{formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
