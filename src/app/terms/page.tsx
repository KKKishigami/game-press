
export const metadata = { title: '利用規約' };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-white font-black text-3xl mb-2">利用規約</h1>
      <p className="text-gray-500 text-sm mb-8">最終更新日：2025年1月15日</p>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-bold text-lg mb-3">1. サービスの利用</h2>
          <p>GAMEPULSE（以下「当サイト」）をご利用の際は、本利用規約に同意したものとみなします。当サイトは事前の通知なく規約を変更する場合があります。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">2. 著作権について</h2>
          <p className="mb-2">当サイトに掲載されているコンテンツ（文章・画像等）の著作権は、当サイト編集部または各権利者に帰属します。</p>
          <p className="mb-2">ゲーム画像・スクリーンショット等は各ゲームメーカーの著作物であり、公式プレスキット・許諾素材を使用しています。</p>
          <p>他サイトからの引用部分は、著作権法第32条に基づく適法な引用として出典を明記の上掲載しています。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">3. 免責事項</h2>
          <p className="mb-2">当サイトに掲載している情報は、できる限り正確な情報を提供するよう努めておりますが、その正確性・完全性を保証するものではありません。</p>
          <p>当サイトの情報によって生じた損害について、当サイトは一切の責任を負いかねます。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">4. リンクについて</h2>
          <p>当サイトへのリンクは自由です。ただし、フレーム内表示等、当サイトのコンテンツを自サイトのコンテンツと誤認させる形でのリンクは禁止します。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">5. 外部リンク</h2>
          <p>当サイトからリンクしている外部サイトの内容について、当サイトは責任を負いません。</p>
        </section>
      </div>
    </div>
  );
}
