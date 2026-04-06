'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Gamepad2, Search } from 'lucide-react';

const navItems = [
  { label: 'コンシューマ', href: '/category/console' },
  { label: 'アプリ', href: '/category/mobile' },
  { label: '🎮 タイプ診断', href: '/diagnosis' },
  {
    label: '機種別',
    href: '#',
    children: [
      { label: 'PS5', href: '/platform/PS5' },
      { label: 'PS4', href: '/platform/PS4' },
      { label: 'Switch', href: '/platform/Switch' },
      { label: 'Xbox', href: '/platform/Xbox' },
      { label: 'PC', href: '/platform/PC' },
      { label: 'iOS', href: '/platform/iOS' },
      { label: 'Android', href: '/platform/Android' },
    ],
  },
  {
    label: '年代別',
    href: '#',
    children: [
      { label: '2020年代', href: '/era/2020s' },
      { label: '2010年代', href: '/era/2010s' },
      { label: '2000年代', href: '/era/2000s' },
      { label: '1990年代', href: '/era/1990s' },
      { label: '1980年代', href: '/era/1980s' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-1.5 rounded-lg">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              GAME<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">PULSE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-sm font-medium flex items-center gap-1"
                >
                  {item.label}
                  {item.children && <span className="text-xs">▾</span>}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl min-w-36 py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search + Mobile toggle */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-1.5 text-gray-400 hover:text-white text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
