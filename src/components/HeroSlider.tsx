'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Article } from '@/types';

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

  return (
    <div className="relative border-b border-[#1a1a1a] overflow-hidden py-2 bg-[#050505]">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="flex items-center gap-8 will-change-transform" style={{ width: 'max-content' }}>
        {items.map((article, i) => (
          <Link
            key={`${article.id}-${i}`}
            href={`/articles/${article.slug}`}
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <span className="w-1 h-1 bg-[#e8000d] rounded-full flex-shrink-0" />
            <span className="font-bebas text-xs tracking-widest text-[#666] group-hover:text-white transition-colors whitespace-nowrap">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
