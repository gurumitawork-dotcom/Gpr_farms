'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      )}
      aria-hidden={!visible}
    >
      <div className="bg-forest-deep/95 backdrop-blur-xl border-t border-white/10 px-3 sm:px-4 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-lg sm:text-2xl flex-shrink-0" aria-hidden="true">🥭</span>
            <div className="min-w-0">
              <p className="text-white font-display font-semibold text-xs sm:text-sm leading-tight">Season ends soon!</p>
              <p className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-wider">Free shipping</p>
            </div>
          </div>
          <Link
            href="/order"
            className="shimmer-btn text-primary-foreground text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg whitespace-nowrap flex-shrink-0"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}