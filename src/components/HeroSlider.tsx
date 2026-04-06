'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { categoryLabel } from '@/lib/utils';

interface Props {
  articles: Article[];
}

export default function HeroSlider({ articles }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate articles for seamless loop
  const items = [...articles, ...articles];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let pos = 0;
    const speed = 0.6; // px per frame
    const singleWidth = track.scrollWidth / 2;

    const animate = () => {
      pos += speed;
      if (pos >= singleWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);

    const pauseOnHover = () => cancelAnimationFrame(animFrame);
    const resumeOnLeave = () => {
      animFrame = requestAnimationFrame(animate);
    };

    track.addEventListener('mouseenter', pauseOnHover);
    track.addEventListener('mouseleave', resumeOnLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('mouseenter', pauseOnHover);
      track.removeEventListener('mouseleave', resumeOnLeave);
    };
  }, []);

  return (
    <div className="relative bg-gray-900 border-b border-gray-800 overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
        {items.map((article, i) => (
          <Link
            key={`${article.id}-${i}`}
            href={`/articles/${article.slug}`}
            className="flex-shrink-0 w-72 group"
          >
            <div className="relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="relative h-40 w-full">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                  article.category === 'console'
                    ? 'bg-purple-500/80 text-white'
                    : 'bg-cyan-500/80 text-white'
                }`}>
                  {categoryLabel(article.category)}
                </span>
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-semibold line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                  {article.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
