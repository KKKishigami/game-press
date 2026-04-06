import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { categoryLabel, formatDate } from '@/lib/utils';

interface Props {
  article: Article;
  size?: 'hero' | 'large' | 'medium' | 'small' | 'list';
}

export default function ArticleCard({ article, size = 'medium' }: Props) {
  // ヒーロー（トップメイン）
  if (size === 'hero') {
    return (
      <Link href={`/articles/${article.slug}`} className="group block relative overflow-hidden">
        <div className="relative w-full aspect-[16/9] bg-[#111] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-bebas text-xs tracking-widest text-[#e8000d] border border-[#e8000d] px-2 py-0.5">
              {categoryLabel(article.category).toUpperCase()}
            </span>
            <span className="text-[#888] text-xs">{formatDate(article.publishedAt)}</span>
          </div>
          <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-2 group-hover:text-[#e8000d] transition-colors">
            {article.title}
          </h2>
          <p className="text-[#888] text-sm line-clamp-2 max-w-2xl">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  // 大カード
  if (size === 'large') {
    return (
      <Link href={`/articles/${article.slug}`} className="group block border border-[#222] hover:border-[#e8000d] transition-colors overflow-hidden">
        <div className="relative w-full aspect-video bg-[#111] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute top-3 left-3 font-bebas text-xs tracking-widest text-[#e8000d] border border-[#e8000d] bg-black/50 px-2 py-0.5">
            {categoryLabel(article.category).toUpperCase()}
          </span>
        </div>
        <div className="p-4 bg-[#0a0a0a]">
          <h3 className="text-white font-black text-base leading-snug mb-2 group-hover:text-[#e8000d] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[#666] text-xs line-clamp-2 mb-3">{article.excerpt}</p>
          <p className="text-[#444] text-xs">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  // 中カード（デフォルト）
  if (size === 'medium') {
    return (
      <Link href={`/articles/${article.slug}`} className="group block border border-[#1a1a1a] hover:border-[#e8000d] transition-colors overflow-hidden">
        <div className="relative w-full aspect-video bg-[#111] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-3 bg-[#0a0a0a]">
          <p className="text-[#e8000d] font-bebas text-xs tracking-widest mb-1">{categoryLabel(article.category).toUpperCase()}</p>
          <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#e8000d] transition-colors mb-1">
            {article.title}
          </h3>
          <p className="text-[#444] text-xs">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  // 小（リスト）
  if (size === 'small' || size === 'list') {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-3 py-3 border-b border-[#1a1a1a] last:border-0">
        <div className="relative w-20 h-14 flex-shrink-0 bg-[#111] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#e8000d] font-bebas text-[10px] tracking-widest mb-0.5">{categoryLabel(article.category).toUpperCase()}</p>
          <p className="text-white text-xs font-bold line-clamp-2 leading-snug group-hover:text-[#e8000d] transition-colors">
            {article.title}
          </p>
          <p className="text-[#444] text-[10px] mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return null;
}
