'use client';

import React from 'react';

const FEATURES = [
  { emoji: '✨', text: '100% Carbide-Free' },
  { emoji: '👑', text: 'Himayat' },
  { emoji: '🚚', text: 'Free Pan-India Delivery' },
  { emoji: '💚', text: 'Neelam' },
  { emoji: '🌳', text: 'Tree-Ripened Only' },
  { emoji: '☀️', text: 'Mallika' },
  { emoji: '📦', text: 'Premium Packaging' },
  { emoji: '😋', text: 'Farm Direct' },
];

export default function PromotionalBanner() {
  return (
    <div className="bg-forest-deep overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap py-3 sm:py-4">
        {/* Duplicate the list 3× so there's always content on screen while scrolling */}
        {[...FEATURES, ...FEATURES, ...FEATURES].map((feature, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-5"
          >
            {/* Emoji */}
            <span className="text-sm sm:text-base md:text-lg leading-none" aria-hidden="true">
              {feature.emoji}
            </span>

            {/* Text — always visible, no xs:inline guard */}
            <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide">
              {feature.text}
            </span>

            {/* Separator dot */}
            <span className="text-white/30 ml-2 sm:ml-3 text-[10px] sm:text-xs select-none" aria-hidden="true">
              ·
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}