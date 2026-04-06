import Link from 'next/link';
import { Gamepad2, Rss } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-8">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#cc0000] p-1 rounded">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-black text-lg">
                <span className="text-[#ff4444]">GAME</span>PULSE
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              コンシューマ・スマートフォンゲームの最新ニュース、リリース情報をお届けするゲーム専門メディア。
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ※記事にはアフィリエイト広告が含まれる場合があります。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="text-white text-sm font-bold mb-3 border-b border-gray-600 pb-1">機種別</h3>
            <ul className="space-y-1.5 text-xs">
              {['PS5', 'PS4', 'Switch', 'Xbox', 'PC'].map((p) => (
                <li key={p}>
                  <Link href={`/platform/${p}`} className="hover:text-white hover:underline transition-colors">{p}</Link>
                </li>
              ))}
              <li><Link href="/category/mobile" className="hover:text-white hover:underline transition-colors">スマートフォン</Link></li>
            </ul>
          </div>

          {/* 年代別 */}
          <div>
            <h3 className="text-white text-sm font-bold mb-3 border-b border-gray-600 pb-1">年代別</h3>
            <ul className="space-y-1.5 text-xs">
              {[
                { id: '2020s', label: '2020年代' },
                { id: '2010s', label: '2010年代' },
                { id: '2000s', label: '2000年代' },
                { id: '1990s', label: '1990年代' },
                { id: '1980s', label: '1980年代' },
              ].map((e) => (
                <li key={e.id}>
                  <Link href={`/era/${e.id}`} className="hover:text-white hover:underline transition-colors">{e.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h3 className="text-white text-sm font-bold mb-3 border-b border-gray-600 pb-1">サイト情報</h3>
            <ul className="space-y-1.5 text-xs">
              {[
                { label: 'プライバシーポリシー', href: '/privacy-policy' },
                { label: '利用規約', href: '/terms' },
                { label: '広告・PR開示', href: '/disclosure' },
                { label: 'お問い合わせ', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white hover:underline transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mt-3">
              <Rss className="w-4 h-4 text-[#ff8800]" />
              <span className="text-xs text-gray-400">RSS</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2025 GAMEPULSE. All rights reserved.</p>
          <p className="text-xs text-gray-600 text-center">
            掲載の画像は公式プレスキット・許諾素材を使用。各権利は権利者に帰属します。
          </p>
        </div>
      </div>
    </footer>
  );
}
