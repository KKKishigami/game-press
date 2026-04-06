import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#222] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-10 bg-[#e8000d]" />
              <span className="font-bebas text-4xl tracking-widest">GAMEPULSE</span>
            </div>
            <p className="text-[#888] text-xs leading-relaxed max-w-xs">
              コンシューマ・スマートフォンゲームの<br />
              最新情報をお届けするゲーム専門メディア。
            </p>
            <p className="text-[#444] text-[10px] mt-3">
              ※記事にはアフィリエイト広告が含まれる場合があります。
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-xs">
            <div>
              <p className="font-bebas tracking-widest text-[#e8000d] mb-3 text-sm">PLATFORM</p>
              <ul className="space-y-2 text-[#888]">
                {['PS5', 'PS4', 'Switch', 'Xbox', 'PC'].map((p) => (
                  <li key={p}>
                    <Link href={`/platform/${p}`} className="hover:text-white transition-colors">{p}</Link>
                  </li>
                ))}
                <li><Link href="/category/mobile" className="hover:text-white transition-colors">Mobile</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bebas tracking-widest text-[#e8000d] mb-3 text-sm">ERA</p>
              <ul className="space-y-2 text-[#888]">
                {[['2020s','2020s'],['2010s','2010s'],['2000s','2000s'],['1990s','1990s'],['1980s','1980s']].map(([id, label]) => (
                  <li key={id}>
                    <Link href={`/era/${id}`} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bebas tracking-widest text-[#e8000d] mb-3 text-sm">LEGAL</p>
              <ul className="space-y-2 text-[#888]">
                {[
                  ['プライバシーポリシー', '/privacy-policy'],
                  ['利用規約', '/terms'],
                  ['広告・PR開示', '/disclosure'],
                  ['お問い合わせ', '/contact'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#222] pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[#444] text-xs">© 2025 GAMEPULSE. ALL RIGHTS RESERVED.</p>
          <p className="text-[#333] text-[10px]">
            掲載画像は公式プレスキット・許諾素材を使用。各権利は権利者に帰属します。
          </p>
        </div>
      </div>
    </footer>
  );
}
