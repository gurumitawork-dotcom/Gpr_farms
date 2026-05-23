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
      {/* Animated scrolling banner */}
      <div className="flex animate-scroll whitespace-nowrap gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4 md:px-4 py-3 sm:py-4">
        {[...FEATURES, ...FEATURES].map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 sm:gap-2 text-white text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide flex-shrink-0"
          >
            <span className="text-base sm:text-lg md:text-xl" aria-hidden="true">{feature.emoji}</span>
            <span className="hidden xs:inline">{feature.text}</span>
            {i < FEATURES.length * 2 - 1 && (
              <span className="text-white/30 mx-1 sm:mx-2">+</span>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
