import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-1.5 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                GAME<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">PULSE</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              コンシューマゲーム・アプリゲームの最新ニュース、リリース情報、レビューをお届けするゲーム専門メディアです。
            </p>
            <p className="text-gray-600 text-xs mt-3">
              ※当サイトの記事にはアフィリエイト広告が含まれる場合があります。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">カテゴリ</h3>
            <ul className="space-y-2">
              {[
                { label: 'コンシューマゲーム', href: '/category/console' },
                { label: 'アプリゲーム', href: '/category/mobile' },
                { label: 'リリース情報', href: '/type/release' },
                { label: 'インタビューまとめ', href: '/type/interview_summary' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">サイト情報</h3>
            <ul className="space-y-2">
              {[
                { label: 'プライバシーポリシー', href: '/privacy-policy' },
                { label: '利用規約', href: '/terms' },
                { label: '広告・PR開示ポリシー', href: '/disclosure' },
                { label: 'お問い合わせ', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2025 GAMEPULSE. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center">
            掲載のゲーム画像・動画は各権利者の著作物です。公式プレスキット・許諾素材を使用しています。
          </p>
        </div>
      </div>
    </footer>
  );
}
