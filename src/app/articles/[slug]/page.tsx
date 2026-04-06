import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getLatestArticles, articles } from '@/lib/mock-data';
import { categoryLabel, articleTypeLabel, formatDate } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { ExternalLink } from 'lucide-react';

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
  const related = latest.filter((a) => a.id !== article.id).slice(0, 4);

  const renderBody = (body: string) => {
    return body.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="font-black text-white text-xl mt-10 mb-4 flex items-center gap-3">
            <span className="w-1 h-6 bg-[#e8000d] flex-shrink-0" />
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="font-bold text-white text-base mt-6 mb-3 border-b border-[#222] pb-2">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('> ')) {
        const lines = block.split('\n').map((l) => l.replace(/^> /, ''));
        return (
          <blockquote key={i} className="border-l-2 border-[#e8000d] bg-[#0a0a0a] pl-4 pr-4 py-3 my-4 italic text-[#888] text-sm">
            {lines.map((line, j) => <p key={j}>{line}</p>)}
          </blockquote>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter((l) => l.startsWith('- '));
        return (
          <ul key={i} className="space-y-2 my-4">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-[#aaa]">
                <span className="w-1 h-1 bg-[#e8000d] rounded-full mt-2 flex-shrink-0" />
                {item.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }
      if (block.includes('|') && block.includes('---')) {
        const lines = block.split('\n').filter((l) => !l.match(/^[\s|:-]+$/));
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm text-[#888] border border-[#222]">
              {lines.map((row, j) => {
                const cells = row.split('|').filter((c) => c.trim());
                return (
                  <tr key={j} className={j === 0 ? 'bg-[#111] text-white font-bold' : 'border-t border-[#1a1a1a]'}>
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
        <p key={i} className="text-[#aaa] text-sm leading-relaxed my-3">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="bg-black pt-14 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-bebas text-xs tracking-widest text-[#444] mb-6">
          <Link href="/" className="hover:text-white transition-colors">TOP</Link>
          <span className="text-[#e8000d]">—</span>
          <Link href={`/category/${article.category}`} className="hover:text-white transition-colors">
            {categoryLabel(article.category).toUpperCase()}
          </Link>
          <span className="text-[#e8000d]">—</span>
          <span className="text-[#666] truncate">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Article ===== */}
          <article className="lg:col-span-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-bebas text-xs tracking-widest border border-[#e8000d] text-[#e8000d] px-3 py-1">
                {categoryLabel(article.category).toUpperCase()}
              </span>
              <span className="font-bebas text-xs tracking-widest border border-[#333] text-[#888] px-3 py-1">
                {articleTypeLabel(article.type)}
              </span>
              {article.type === 'interview_summary' && (
                <span className="font-bebas text-xs tracking-widest border border-[#555] text-[#888] px-3 py-1">QUOTE</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-white font-black text-2xl md:text-3xl leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[#444] text-xs font-bebas tracking-widest mb-6 pb-4 border-b border-[#1a1a1a]">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="text-[#e8000d]">—</span>
              <span>GAMEPULSE編集部</span>
              {article.source && (
                <>
                  <span className="text-[#e8000d]">—</span>
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer"
                    className="text-[#888] hover:text-white flex items-center gap-1 transition-colors">
                    VIA {article.source.name.toUpperCase()} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </>
              )}
            </div>

            <p className="text-[#333] text-[10px] mb-4">※本記事にはアフィリエイト広告が含まれる場合があります</p>

            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-[#111] mb-6 overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>

            <AdBanner label="広告" height="h-14" />

            {/* Body */}
            <div className="mt-6">{renderBody(article.body)}</div>

            {/* YouTube */}
            {article.youtubeUrl && (
              <div className="mt-8 border-t border-[#1a1a1a] pt-6">
                <p className="font-bebas tracking-widest text-[#e8000d] text-sm mb-3">— VIDEO</p>
                <div className="relative w-full aspect-video bg-[#111]">
                  <iframe
                    src={article.youtubeUrl}
                    title="YouTube"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="font-bebas text-[10px] tracking-widest px-2 py-1 border border-[#222] text-[#444] hover:border-[#e8000d] hover:text-[#e8000d] cursor-pointer transition-colors">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Platforms */}
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="font-bebas text-[10px] tracking-widest text-[#444]">PLATFORM —</span>
              {article.platforms.map((p) => (
                <Link key={p} href={`/platform/${p}`}
                  className="font-bebas text-[10px] tracking-widest px-2 py-1 bg-[#111] border border-[#222] text-[#888] hover:border-[#e8000d] hover:text-[#e8000d] transition-colors">
                  {p}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <AdBanner label="広告" height="h-14" />
            </div>

            <p className="text-[#333] text-[10px] mt-3">
              ※掲載画像は公式プレスキット・許諾素材を使用。各権利は権利者に帰属します。
            </p>

            {/* Related */}
            <div className="mt-10 border-t border-[#1a1a1a] pt-6">
              <p className="font-bebas tracking-[0.3em] text-[#e8000d] text-xs mb-6">RELATED ARTICLES</p>
              <div className="grid grid-cols-2 gap-3">
                {related.slice(0, 4).map((r) => (
                  <ArticleCard key={r.id} article={r} size="medium" />
                ))}
              </div>
            </div>
          </article>

          {/* ===== Sidebar ===== */}
          <aside className="space-y-6">
            <AdBanner label="広告" height="h-60" />

            {/* Ranking */}
            <div className="border border-[#1a1a1a]">
              <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 py-2">
                <p className="font-bebas tracking-widest text-[#e8000d] text-sm">RANKING</p>
              </div>
              <div className="p-4 space-y-4">
                {latest.slice(0, 5).map((a, i) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="group flex gap-3 items-start">
                    <span className="font-bebas text-2xl leading-none text-[#1a1a1a] group-hover:text-[#e8000d] transition-colors w-7 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[#666] text-xs line-clamp-2 leading-snug group-hover:text-white transition-colors">
                      {a.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest */}
            <div className="border border-[#1a1a1a]">
              <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 py-2">
                <p className="font-bebas tracking-widest text-white text-sm">LATEST</p>
              </div>
              <div className="p-4 divide-y divide-[#1a1a1a]">
                {related.map((r) => (
                  <ArticleCard key={r.id} article={r} size="list" />
                ))}
              </div>
            </div>

            <AdBanner label="広告" height="h-72" />
          </aside>
        </div>
      </div>
    </div>
  );
}
