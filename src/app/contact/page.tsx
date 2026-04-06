export const runtime = 'edge';
export const metadata = { title: 'お問い合わせ' };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-white font-black text-3xl mb-2">お問い合わせ</h1>
      <p className="text-gray-400 text-sm mb-8">
        記事内容・広告・著作権に関するお問い合わせはこちらからお送りください。
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">お名前</label>
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">お問い合わせ種別</label>
          <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors">
            <option value="">選択してください</option>
            <option value="content">記事内容について</option>
            <option value="copyright">著作権・掲載内容の削除依頼</option>
            <option value="ad">広告について</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">お問い合わせ内容</label>
          <textarea
            rows={6}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            placeholder="お問い合わせ内容をご記入ください"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          送信する
        </button>
      </form>

      <p className="text-gray-600 text-xs mt-6 text-center">
        ※著作権侵害のご申告は迅速に対応いたします。
      </p>
    </div>
  );
}
