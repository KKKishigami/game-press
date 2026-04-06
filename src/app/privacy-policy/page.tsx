export const runtime = 'edge';
export const metadata = { title: 'プライバシーポリシー' };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-white font-black text-3xl mb-2">プライバシーポリシー</h1>
      <p className="text-gray-500 text-sm mb-8">最終更新日：2025年1月15日</p>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-bold text-lg mb-3">1. 基本方針</h2>
          <p>GAMEPULSE（以下「当サイト」）は、ユーザーの個人情報保護を重要な責務と考え、個人情報の保護に関する法律（個人情報保護法）を遵守し、適切な取り扱いに努めます。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">2. Cookieについて</h2>
          <p className="mb-2">当サイトでは、Google AdSenseによる広告配信のためCookieを使用しています。Cookieは、ウェブサイトがブラウザに送信する小さなテキストファイルです。</p>
          <p className="mb-2">Googleは、Cookieを使用してユーザーの過去の訪問に基づいた広告を表示する場合があります。</p>
          <p>ユーザーはブラウザの設定からCookieを無効にすることができます。ただし、一部の機能が利用できなくなる場合があります。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">3. Google AdSenseについて</h2>
          <p className="mb-2">当サイトはGoogle AdSenseを利用した広告を掲載しています。GoogleはCookieを使用して、ユーザーがそのサイトや他のサイトにアクセスした際の情報に基づいて適切な広告を表示します。</p>
          <p>
            Googleのプライバシーポリシーについては
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline mx-1">
              Googleプライバシーポリシー
            </a>
            をご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">4. アクセス解析ツール</h2>
          <p>当サイトでは、サイトの改善を目的としてアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用しますが、個人を特定する情報は収集しません。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">5. 第三者へのデータ提供</h2>
          <p>当サイトは、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-3">6. お問い合わせ</h2>
          <p>プライバシーポリシーに関するお問い合わせは、<a href="/contact" className="text-cyan-400 hover:underline">お問い合わせページ</a>よりご連絡ください。</p>
        </section>
      </div>
    </div>
  );
}
