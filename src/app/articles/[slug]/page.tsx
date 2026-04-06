import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getLatestArticles, articles } from '@/lib/mock-data';
import { categoryLabel, articleTypeLabel, formatDate } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { ExternalLink, Tag, TrendingUp } from 'lucide-react';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const latest = getLatestArticles(8);
  const related = latest.filter((a) => a.id !== article.id).slice(0, 5);

  const renderBody = (body: string) => {
    return body.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-base font-black text-gray-800 mt-6 mb-2 border-l-4 border-[#cc0000] pl-2 bg-gray-50 py-1">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="text-sm font-bold text-gray-800 mt-4 mb-2 border-b border-gray-300 pb-1">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('> ')) {
        const lines = block.split('\n').map((l) => l.replace(/^> /, ''));
        return (
          <blockquote key={i} className="border-l-4 border-[#cc0000] bg-gray-50 pl-3 pr-3 py-2 my-3 text-sm text-gray-600 italic">
            {lines.map((line, j) => <p key={j}>{line}</p>)}
          </blockquote>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter((l) => l.startsWith('- '));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 my-2 text-sm text-gray-700">
            {items.map((item, j) => <li key={j}>{item.replace(/^- /, '')}</li>)}
          </ul>
        );
      }
      if (block.includes('|') && block.includes('---')) {
        const lines = block.split('\n').filter((l) => !l.match(/^[\s|:-]+$/));
        return (
          <div key={i} className="overflow-x-auto my-3">
            <table className="w-full text-xs text-gray-700 border border-gray-300">
              {lines.map((row, j) => {
                const cells = row.split('|').filter((c) => c.trim());
                return (
                  <tr key={j} className={j === 0 ? 'bg-gray-700 text-white font-bold' : 'border-t border-gray-200 even:bg-gray-50'}>
                    {cells.map((cell, k) => (
                      <td key={k} className="px-2 py-1.5">{cell.trim()}</td>
                    ))}
                  </tr>
                );
              })}
            </table>
          </div>
        );
      }
      return (
        <p key={i} className="text-sm text-gray-700 leading-relaxed my-2">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <div className="flex gap-3">
        {/* ===== メイン記事 ===== */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-[#cc0000]">TOP</Link>
            <span>›</span>
            <Link href={`/category/${article.category}`} className="hover:text-[#cc0000]">
              {categoryLabel(article.category)}
            </Link>
            <span>›</span>
            <span className="text-gray-400 truncate">{article.title}</span>
          </nav>

          <div className="bg-white border border-gray-200 p-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="bg-[#cc0000] text-white text-xs font-bold px-2 py-0.5">
                {categoryLabel(article.category)}
              </span>
              <span className="bg-gray-700 text-white text-xs font-bold px-2 py-0.5">
                {articleTypeLabel(article.type)}
              </span>
              {article.type === 'interview_summary' && (
                <span className="border border-orange-400 text-orange-600 text-xs px-2 py-0.5">
                  引用記事
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-lg font-black text-gray-900 leading-snug mb-2">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 pb-2 border-b border-gray-200 flex-wrap">
              <span>{formatDate(article.publishedAt)}</span>
              <span>編集部</span>
              {article.source && (
                <span>
                  出典：
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer"
                    className="text-[#cc0000] hover:underline inline-flex items-center gap-0.5">
                    {article.source.name} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </span>
              )}
              <span className="text-gray-400 text-[10px]">
                ※本記事にはアフィリエイト広告が含まれる場合があります
              </span>
            </div>

            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-gray-200 mb-4 overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>

            {/* Ad */}
            <div className="mb-4">
              <AdBanner label="広告 (記事上)" height="h-14" />
            </div>

            {/* Body */}
            <div>{renderBody(article.body)}</div>

            {/* YouTube */}
            {article.youtubeUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">動画</h3>
                <div className="relative w-full aspect-video bg-gray-200">
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

            {/* Tags & Platforms */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 border border-gray-300 text-gray-600 hover:border-[#cc0000] hover:text-[#cc0000] cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-gray-500">対応機種：</span>
                {article.platforms.map((p) => (
                  <Link key={p} href={`/platform/${p}`}
                    className="text-[10px] px-2 py-0.5 bg-gray-700 text-white hover:bg-[#cc0000] transition-colors">
                    {p}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad bottom */}
            <div className="mt-4">
              <AdBanner label="広告 (記事下)" height="h-14" />
            </div>

            <p className="text-gray-400 text-[10px] mt-2">
              ※掲載画像は公式プレスキット・許諾素材を使用しています。各権利は権利者に帰属します。
            </p>
          </div>

          {/* 関連記事 */}
          <div className="mt-3 bg-white border border-gray-200 p-3">
            <div className="border-b-2 border-[#cc0000] mb-2 pb-1">
              <h3 className="text-sm font-black text-gray-800">関連記事</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {related.slice(0, 3).map((r) => (
                <ArticleCard key={r.id} article={r} size="medium" />
              ))}
            </div>
          </div>
        </article>

        {/* ===== サイドバー ===== */}
        <aside className="hidden md:block w-52 flex-shrink-0 space-y-3">
          <AdBanner label="広告 (300×250)" height="h-60" />

          {/* ランキング */}
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-800 px-2 py-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#cc0000]" />
              <p className="text-white text-xs font-bold">アクセスランキング</p>
            </div>
            <div className="p-2 space-y-2">
              {latest.slice(0, 5).map((a, i) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group flex gap-2 items-start">
                  <span className={`text-sm font-black flex-shrink-0 w-5 text-center ${i === 0 ? 'text-[#cc0000]' : i < 3 ? 'text-gray-600' : 'text-gray-400'}`}>
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug group-hover:text-[#cc0000] transition-colors">
                    {a.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* 最新記事 */}
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-800 px-2 py-1">
              <p className="text-white text-xs font-bold">最新記事</p>
            </div>
            <div className="p-2 divide-y divide-gray-100">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} size="list" />
              ))}
            </div>
          </div>

          <AdBanner label="広告 (300×600)" height="h-72" />
        </aside>
      </div>
    </div>
  );
}
