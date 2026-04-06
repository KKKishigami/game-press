'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-300 text-sm text-center md:text-left">
          当サイトではGoogle AdSenseによる広告配信のためCookieを使用しています。
          詳しくは
          <Link href="/privacy-policy" className="text-cyan-400 hover:underline mx-1">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          同意する
        </button>
      </div>
    </div>
  );
}
