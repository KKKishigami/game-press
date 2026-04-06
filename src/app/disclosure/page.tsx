
export const metadata = { title: '広告・PR開示ポリシー' };

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-white font-black text-3xl mb-2">広告・PR開示ポリシー</h1>
      <p className="text-gray-500 text-sm mb-8">最終更新日：2025年1月15日</p>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-5 py-4 mb-8">
        <p className="text-yellow-300 text-sm font-semibold">
          当サイトの一部記事にはアフィリエイト広告・PR広告が含まれます。景品表示法およびステルスマーケティング規制（2023年改正）に基づき、広告・PRを含むコンテンツには「PR」「広告」などの表示を行っています。
        </p>
      </div>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-bold text-lg mb-3">1. 広告の種類</h2>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-purple-400 font-bold">●</span><span><strong className="text-white">Google AdSense：</strong>Googleが提供する自動広告配信サービスです。記事内・サイドバー等に表示されます。</span></li>
            <li className="flex gap-2"><span className="text-cyan-400 font-bold">●</span><span><strong className="text-white">アフィリエイト広告：</strong>商品・サービスを紹介するリンクを含む記事があります。購入等が発生した場合、当サイトに報酬が支払われることがあります。</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">2. 編集方針</h2>
          <p className="mb-2">当サイトの記事内容は、広告主や提携先の意向に左右されることなく、編集部が独立して作成しています。</p>
          <p>ただし、アフィリエイトリンクを含む商品紹介記事については、その旨を記事内に明記します。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">3. 引用・転載について</h2>
          <p className="mb-2">当サイトでは、他メディアの記事・インタビュー等を引用する場合があります。引用は著作権法第32条に基づき、必要最小限の範囲で行い、必ず出典を明記しています。</p>
          <p>ゲーム画像は各メーカーの公式プレスキットおよび許諾素材を使用しています。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">4. お問い合わせ</h2>
          <p>広告・PR表示に関するご質問は<a href="/contact" className="text-cyan-400 hover:underline">お問い合わせページ</a>よりご連絡ください。</p>
        </section>
      </div>
    </div>
  );
}
