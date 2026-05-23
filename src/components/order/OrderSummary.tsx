'use client';

import React from 'react';
import { PRICING } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  variety: string;
  boxSize: string;
  quantity: number;
}

export default function OrderSummary({ variety, boxSize, quantity }: OrderSummaryProps) {
  const price = PRICING[boxSize]?.[variety] ?? 0;
  const total = price * quantity;
  const shipping = 0;

  return (
    <aside
      className="neumorphic-card p-6 sm:p-8 sticky top-28"
      aria-label="Order summary"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span aria-hidden="true">📦</span> Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Variety</span>
          <span className="text-sm font-semibold text-foreground">{variety}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Box Size</span>
          <span className="text-sm font-semibold text-foreground">{boxSize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Quantity</span>
          <span className="text-sm font-semibold text-foreground">{quantity} box{quantity !== 1 ? 'es' : ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Price per box</span>
          <span className="price-tag text-sm font-semibold text-foreground">{formatPrice(price)}</span>
        </div>
        <div className="h-[1px] bg-border" aria-hidden="true" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Shipping</span>
          <span className="text-sm font-semibold text-forest-light">FREE 🚚</span>
        </div>
      </div>

      <div className="neumorphic-inset p-4 rounded-xl flex justify-between items-center">
        <span className="font-display font-bold text-foreground">Total</span>
        <span className="price-tag text-2xl font-black text-primary" aria-live="polite">{formatPrice(total)}</span>
      </div>

      <div className="mt-6 space-y-3">
        {[
          { icon: '✅', text: 'Carbide-free guarantee' },
          { icon: '🌳', text: 'Tree-ripened, harvested to order' },
          { icon: '🚚', text: 'Free pan-India shipping' },
          { icon: '📦', text: 'Delivered in 18–24 hours' },
        ].map((promise) => (
          <div key={promise.text} className="flex items-center gap-3">
            <span className="text-sm flex-shrink-0" aria-hidden="true">{promise.icon}</span>
            <span className="text-xs text-muted-foreground">{promise.text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}