import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { categoryLabel, articleTypeLabel, articleTypeBadgeColor, formatDate } from '@/lib/utils';

interface Props {
  article: Article;
  size?: 'large' | 'medium' | 'small';
}

export default function ArticleCard({ article, size = 'medium' }: Props) {
  if (size === 'large') {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="relative h-64 w-full">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                article.category === 'console' ? 'bg-purple-500 text-white' : 'bg-cyan-500 text-white'
              }`}>
                {categoryLabel(article.category)}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${articleTypeBadgeColor(article.type)}`}>
                {articleTypeLabel(article.type)}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.platforms.join(' / ')}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-3 items-start">
        <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
            {article.title}
          </p>
          <p className="text-gray-500 text-xs mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  // medium (default)
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10">
        <div className="relative h-44 w-full">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              article.category === 'console' ? 'bg-purple-500 text-white' : 'bg-cyan-500 text-white'
            }`}>
              {categoryLabel(article.category)}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
}
