import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { categoryLabel, articleTypeLabel, formatDate } from '@/lib/utils';

interface Props {
  article: Article;
  size?: 'large' | 'medium' | 'small' | 'list';
}

export default function ArticleCard({ article, size = 'medium' }: Props) {
  if (size === 'list') {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-2 py-2 border-b border-gray-200 last:border-0">
        <div className="relative w-16 h-11 flex-shrink-0 bg-gray-200 overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill
            className="object-cover group-hover:opacity-80 transition-opacity" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors">
            {article.title}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-2 py-2 border-b border-gray-200 last:border-0">
        <div className="relative w-20 h-14 flex-shrink-0 bg-gray-200 overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill
            className="object-cover group-hover:opacity-80 transition-opacity" sizes="80px" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-bold text-white bg-[#cc0000] px-1.5 py-0.5 mb-1">
            {categoryLabel(article.category)}
          </span>
          <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors">
            {article.title}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (size === 'large') {
    return (
      <Link href={`/articles/${article.slug}`} className="group block bg-white border border-gray-200 hover:border-[#cc0000] transition-colors">
        <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 100vw, 50vw" priority />
          <div className="absolute top-0 left-0 bg-[#cc0000] text-white text-xs font-bold px-2 py-1">
            {articleTypeLabel(article.type)}
          </div>
        </div>
        <div className="p-3">
          <h2 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors mb-1">
            {article.title}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="bg-gray-100 px-1.5 py-0.5 text-gray-500">{article.platforms[0]}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block bg-white border border-gray-200 hover:border-[#cc0000] transition-colors">
      <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
        <Image src={article.thumbnail} alt={article.title} fill
          className="object-cover group-hover:opacity-90 transition-opacity"
          sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute top-0 left-0 bg-[#cc0000] text-white text-[10px] font-bold px-1.5 py-0.5">
          {categoryLabel(article.category)}
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors mb-1">
          {article.title}
        </h3>
        <p className="text-[10px] text-gray-400">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
