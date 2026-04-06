import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GAMEPULSE — ゲームの最新ニュース・リリース情報',
    template: '%s | GAMEPULSE',
  },
  description:
    'コンシューマゲーム・アプリゲームの最新ニュース、リリース情報、開発者インタビューまとめをお届けするゲーム専門メディア。',
  keywords: ['ゲーム', 'ゲームニュース', 'PS5', 'Switch', 'スマホゲーム', '新作ゲーム'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${notoSansJP.className} bg-[#f0f0f0] text-gray-800 min-h-screen antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
