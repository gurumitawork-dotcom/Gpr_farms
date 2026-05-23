'use client';

import React from 'react';

import AppImage from '@/components/ui/AppImage';
import type { Variety } from '@/lib/types';
import { PRICING } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';

interface VarietyCardProps {
  variety: Variety;
  onAddToCart?: (variety: string, boxSize: string) => void;
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
}

const BOX_SIZES = ['3kg', '5kg', '10kg'];

export default function VarietyCard({ variety, onAddToCart, selectedSize = '5kg', onSizeChange }: VarietyCardProps) {
  const price = PRICING[selectedSize]?.[variety.name] ?? 0;

  return (
    <article
      className="neumorphic-card variety-card-hover overflow-hidden flex flex-col"
      aria-label={`${variety.name} mango variety — ${variety.tagline}`}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-lg">
        <AppImage
          src={variety.image}
          alt={variety.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {variety.certifiedOrganic && (
            <span className="bg-forest-mid/90 text-white text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
              🌿 Organic
            </span>
          )}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 mb-0.5">{variety.teluguName}</p>
          <h3 className="font-display text-2xl font-bold text-white">{variety.name}</h3>
          <p className="text-[11px] text-white/70 font-light mt-0.5">{variety.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Flavor */}
        <p className="text-sm text-muted-foreground leading-relaxed">{variety.flavor}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🌞', label: 'Season', value: variety.season },
            { icon: '⚖️', label: 'Weight', value: variety.weight },
          ].map((meta) => (
            <div key={meta.label} className="neumorphic-inset p-3 rounded-lg">
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{meta.icon} {meta.label}</p>
              <p className="text-xs font-semibold text-foreground">{meta.value}</p>
            </div>
          ))}
        </div>

        {/* Size selector */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Box Size</p>
          <div className="flex gap-2" role="group" aria-label="Select box size">
            {BOX_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onSizeChange?.(size)}
                className={cn(
                  'flex-1 py-2 text-xs font-semibold rounded-lg border transition-all duration-200',
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary'
                )}
                aria-pressed={selectedSize === size}
                aria-label={`${size} box`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Price</p>
            <p className="price-tag text-2xl font-bold text-primary">{formatPrice(price)}</p>
          </div>
          <button
            onClick={() => onAddToCart?.(variety.name, selectedSize)}
            className="shimmer-btn text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
            aria-label={`Add ${variety.name} ${selectedSize} box to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}