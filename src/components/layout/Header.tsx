'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'NEWS', href: '/' },
  { label: 'CONSOLE', href: '/category/console' },
  { label: 'MOBILE', href: '/category/mobile' },
  { label: 'PLATFORM', href: '/platform/PS5' },
  { label: 'ERA', href: '/era/2020s' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#222]" style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-1 h-8 bg-[#e8000d]" />
          <span className="font-bebas text-2xl text-white tracking-widest group-hover:text-[#e8000d] transition-colors">
            GAMEPULSE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-bebas text-sm tracking-widest text-[#888] hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/category/console"
            className="hidden md:block font-bebas text-xs tracking-widest border border-[#e8000d] text-[#e8000d] px-4 py-1.5 hover:bg-[#e8000d] hover:text-white transition-colors"
          >
            LATEST →
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden bg-black border-t border-[#222] px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block font-bebas text-lg tracking-widest text-[#888] hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
