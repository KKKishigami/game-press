import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getLatestArticles } from '@/lib/mock-data';
import { categoryLabel, articleTypeLabel, articleTypeBadgeColor, formatDate } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { ExternalLink, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getLatestArticles(6).filter((a) => a.id !== article.id).slice(0, 3);

  // Simple markdown-like rendering (paragraphs, headers, blockquotes, lists)
  const renderBody = (body: string) => {
    return body.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-white font-black text-xl mt-8 mb-3 border-l-4 border-purple-500 pl-3">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="text-white font-bold text-lg mt-6 mb-2">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('> ')) {
        const lines = block.split('\n').map((l) => l.replace(/^> /, ''));
        return (
          <blockquote key={i} className="border-l-4 border-purple-500 bg-gray-800/50 rounded-r-xl pl-4 pr-4 py-3 my-4 italic text-gray-300">
            {lines.map((line, j) => <p key={j}>{line}</p>)}
          </blockquote>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter((l) => l.startsWith('- '));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 my-3 text-gray-300">
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^- \*\*(.+?)\*\*: /, (_, m) => m + ': ').replace(/^- /, '')}</li>
            ))}
          </ul>
        );
      }
      if (block.includes('|') && block.includes('---')) {
        const lines = block.split('\n').filter((l) => !l.match(/^[\s|:-]+$/));
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm text-gray-300 border border-gray-700 rounded-lg overflow-hidden">
              {lines.map((row, j) => {
                const cells = row.split('|').filter((c) => c.trim());
                return (
                  <tr key={j} className={j === 0 ? 'bg-gray-800 text-white font-semibold' : 'border-t border-gray-700'}>
                    {cells.map((cell, k) => (
                      <td key={k} className="px-3 py-2">{cell.trim()}</td>
                    ))}
                  </tr>
                );
              })}
            </table>
          </div>
        );
      }
      return (
        <p key={i} className="text-gray-300 leading-relaxed my-3">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Main Article ===== */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">TOP</Link>
            <span>/</span>
            <Link href={`/category/${article.category}`} className="hover:text-white transition-colors">
              {categoryLabel(article.category)}
            </Link>
            <span>/</span>
            <span className="text-gray-400 truncate">{article.title}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              article.category === 'console' ? 'bg-purple-500 text-white' : 'bg-cyan-500 text-white'
            }`}>
              {categoryLabel(article.category)}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${articleTypeBadgeColor(article.type)}`}>
              {articleTypeLabel(article.type)}
            </span>
            {/* PR disclosure if interview summary */}
            {article.type === 'interview_summary' && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                引用記事
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-white font-black text-2xl md:text-3xl leading-snug mb-3">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-gray-500 text-xs mb-5 flex-wrap">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>編集部</span>
            {article.source && (
              <>
                <span>•</span>
                <span>
                  出典：
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    {article.source.name} <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              </>
            )}
          </div>

          {/* Thumbnail */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-800">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Ad (article top) */}
          <div className="mb-6">
            <AdBanner label="広告 (記事上)" />
          </div>

          {/* Body */}
          <div className="prose-custom">
            {renderBody(article.body)}
          </div>

          {/* YouTube embed */}
          {article.youtubeUrl && (
            <div className="mt-8">
              <h3 className="text-white font-bold text-lg mb-3">動画</h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800">
                <iframe
                  src={article.youtubeUrl}
                  title="YouTube動画"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Platforms */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-gray-500 text-xs self-center">対応機種：</span>
            {article.platforms.map((p) => (
              <Link
                key={p}
                href={`/platform/${p}`}
                className="text-xs px-2 py-1 bg-gray-800 text-cyan-400 rounded-full hover:bg-gray-700 transition-colors"
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Ad (article bottom) */}
          <div className="mt-8">
            <AdBanner label="広告 (記事下)" />
          </div>

          {/* Copyright notice */}
          <p className="text-gray-600 text-xs mt-4">
            ※掲載画像は公式プレスキット・許諾素材を使用しています。各権利は権利者に帰属します。
          </p>
        </article>

        {/* ===== Sidebar ===== */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Ad sidebar */}
          <AdBanner label="広告 (300×250)" />

          {/* Related articles */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
              関連記事
            </h3>
            <div className="space-y-4">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} size="small" />
              ))}
            </div>
          </div>

          {/* Platform shortcuts */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-base mb-3">この記事の機種</h3>
            <div className="flex flex-wrap gap-2">
              {article.platforms.map((p) => (
                <Link
                  key={p}
                  href={`/platform/${p}`}
                  className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Ad sidebar bottom */}
          <AdBanner label="広告 (300×600)" />
        </aside>
      </div>
    </div>
  );
}
