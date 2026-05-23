'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PunchyBanner() {
  const ref = useScrollReveal();

  return (
    <section
      className="py-12 sm:py-20 px-3 sm:px-6 bg-forest-deep relative overflow-hidden grain-texture"
      aria-label="Call to action — order mangoes"
      ref={ref}
    >
      {/* Atmospheric blobs */}
      <div className="absolute top-1/2 left-1/4 w-64 sm:w-80 h-64 sm:h-80 blob-amber opacity-20 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/4 w-48 sm:w-64 h-48 sm:h-64 blob-forest opacity-30 -translate-y-1/2 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto text-center scroll-reveal">
        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-accent mb-4 sm:mb-6">
          Limited Season · Ships Pan-India
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
          Order Before the<br />
          <span className="text-gradient-amber">Season Ends.</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Every box is harvested to order. Once the season ends in August, we're done until next year.
        </p>
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/order"
            className="shimmer-btn text-primary-foreground text-[10px] xs:text-[11px] font-black uppercase tracking-[0.25em] px-6 xs:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 w-full xs:w-auto text-center"
          >
            🥭 Order Mangoes
          </Link>
          <Link
            href="/varieties"
            className="text-[10px] xs:text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-6 xs:px-8 py-3 sm:py-4 rounded-full w-full xs:w-auto text-center"
          >
            View Varieties
          </Link>
        </div>
      </div>
    </section>
  );
}