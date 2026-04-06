'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Gamepad2 } from 'lucide-react';

const platforms = [
  { label: 'PC', href: '/platform/PC' },
  { label: 'PS5/PS4', href: '/platform/PS5' },
  { label: 'Switch', href: '/platform/Switch' },
  { label: 'Xbox', href: '/platform/Xbox' },
  { label: 'スマートフォン', href: '/category/mobile' },
];

const subNav = [
  { label: 'ニュース', href: '/' },
  { label: 'レビュー', href: '/type/review' },
  { label: 'インタビュー', href: '/type/interview_summary' },
  { label: 'リリース情報', href: '/type/release' },
  { label: '年代別', href: '/era/2020s' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#cc0000]">
        <div className="max-w-[1200px] mx-auto px-3 py-1 flex items-center justify-between">
          <p className="text-white text-xs">ゲームの総合情報サイト</p>
          <div className="flex items-center gap-3 text-xs text-white/80">
            <Link href="/privacy-policy" className="hover:text-white">プライバシー</Link>
            <Link href="/contact" className="hover:text-white">お問い合わせ</Link>
          </div>
        </div>
      </div>

      {/* Logo + Search */}
      <div className="max-w-[1200px] mx-auto px-3 py-2 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-[#cc0000] p-1.5 rounded">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[#cc0000] font-black text-2xl tracking-tight leading-none">GAME</span>
            <span className="text-gray-900 font-black text-2xl tracking-tight leading-none">PULSE</span>
            <p className="text-gray-400 text-[10px] leading-none mt-0.5">ゲームの総合情報サイト</p>
          </div>
        </Link>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ゲームタイトル・キーワードで検索"
              className="flex-1 px-3 py-1.5 text-sm text-gray-700 outline-none bg-white"
            />
            <button className="bg-[#cc0000] px-3 text-white hover:bg-[#aa0000] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          className="sm:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Platform nav */}
      <div className="bg-[#cc0000]">
        <div className="max-w-[1200px] mx-auto px-3 flex items-center overflow-x-auto">
          {platforms.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className="text-white text-sm font-bold px-4 py-2 hover:bg-[#aa0000] transition-colors whitespace-nowrap border-r border-[#aa0000] first:border-l"
            >
              {p.label}
            </Link>
          ))}
          <Link
            href="/era/1990s"
            className="text-white/70 text-sm px-4 py-2 hover:bg-[#aa0000] transition-colors whitespace-nowrap ml-auto"
          >
            レトロゲーム
          </Link>
        </div>
      </div>

      {/* Sub nav */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-3 flex items-center gap-1 overflow-x-auto">
          {subNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-600 text-xs px-3 py-1.5 hover:text-[#cc0000] hover:bg-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          <div className="flex border border-gray-300 rounded overflow-hidden mb-3">
            <input
              type="text"
              placeholder="キーワード検索"
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[#cc0000] px-3 text-white">
              <Search className="w-4 h-4" />
            </button>
          </div>
          {[...platforms, ...subNav].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-1.5 text-sm text-gray-700 border-b border-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
