'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VarietyCard from '@/components/varieties/VarietyCard';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import ToastContainer from '@/components/shared/ToastContainer';
import SectionLabel from '@/components/shared/SectionLabelComponent';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { VARIETIES, PRICING } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

function ComparisonTable() {
  const ref = useScrollReveal();
  const BOX_SIZES = ['3kg', '5kg', '10kg'];

  return (
    <section
      className="py-12 sm:py-20 px-3 sm:px-6 bg-forest-deep"
      aria-labelledby="comparison-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 scroll-reveal">
          <SectionLabel className="justify-center mb-3 sm:mb-4">
            <span className="text-accent">Price Comparison</span>
          </SectionLabel>
          <h2 id="comparison-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white">
            Find Your Box
          </h2>
        </div>

        <div className="scroll-reveal overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[500px]" aria-label="Mango pricing comparison table">
            <thead>
              <tr className="bg-forest-mid/60 border-b border-white/10">
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">Variety</th>
                {BOX_SIZES.map((size) => (
                  <th key={size} className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-accent text-center">{size}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {VARIETIES.map((v, i) => (
                <tr
                  key={v.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl" aria-hidden="true">{v.emoji}</span>
                      <div>
                        <p className="font-display font-semibold text-white text-sm sm:text-base">{v.name}</p>
                        <p className="font-mono text-[8px] sm:text-[10px] text-white/40">{v.teluguName}</p>
                      </div>
                    </div>
                  </td>
                  {BOX_SIZES.map((size) => (
                    <td key={size} className="px-3 sm:px-6 py-3 sm:py-5 text-center">
                      <span className="price-tag font-bold text-primary text-sm sm:text-base">{formatPrice(PRICING[size][v.name])}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 sm:mt-8 text-center scroll-reveal" style={{ transitionDelay: '200ms' }}>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 shimmer-btn text-primary-foreground text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            🥭 Order Now — Free Shipping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function VarietiesClient() {
  const [sizes, setSizes] = useState<Record<string, string>>(
    Object.fromEntries(VARIETIES.map((v) => [v.name, '5kg']))
  );
  const { count, isBumping, addItem } = useCart();
  const { toasts, addToast, removeToast } = useToast();
  const ref = useScrollReveal();

  const handleAddToCart = (variety: string, boxSize: string) => {
    addItem(variety, boxSize);
    addToast('success', `🥭 ${variety} (${boxSize}) added!`);
  };

  return (
    <>
      <Header cartCount={count} isBumping={isBumping} />
      <main id="main-content">
        {/* Page Hero */}
        <section
          className="relative pt-24 sm:pt-40 pb-12 sm:pb-20 px-3 sm:px-6 bg-forest-deep overflow-hidden grain-texture"
          aria-labelledby="varieties-page-heading"
        >
          <div className="absolute inset-0 hero-overlay opacity-60" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 md:w-[600px] h-64 sm:h-96 md:h-[600px] blob-amber opacity-15 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="fade-in-up flex justify-center mb-4 sm:mb-6">
              <SectionLabel>
                <span className="text-accent">GPR Farms · AP</span>
              </SectionLabel>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white fade-in-up delay-100">
              Four Varieties.<br />
              <span className="text-gradient-amber">One Farm.</span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-white/60 font-light max-w-xl mx-auto mt-4 sm:mt-6 fade-in-up delay-200 leading-relaxed px-2">
              Tree-ripened on our orchard. Harvested to order. Delivered across India within 24 hours.
            </p>
          </div>
        </section>

        {/* Varieties Grid */}
        <section
          className="py-12 sm:py-20 px-3 sm:px-6 bg-background"
          aria-labelledby="varieties-grid-heading"
          ref={ref}
        >
          <div className="max-w-7xl mx-auto">
            <h2 id="varieties-grid-heading" className="sr-only">All Mango Varieties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {VARIETIES.map((v, i) => (
                <div
                  key={v.id}
                  className="scroll-reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <VarietyCard
                    variety={v}
                    selectedSize={sizes[v.name] ?? '5kg'}
                    onSizeChange={(size) => setSizes((prev) => ({ ...prev, [v.name]: size }))}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Variety Info */}
        <section
          className="py-20 px-4 sm:px-6 bg-cream-mid"
          aria-labelledby="variety-details-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel className="justify-center mb-4">Variety Deep Dive</SectionLabel>
              <h2 id="variety-details-heading" className="font-display text-section-xl font-black text-foreground">
                Know Your Mango
              </h2>
            </div>

            <div className="space-y-12">
              {VARIETIES.map((v, i) => (
                <article
                  key={v.id}
                  className="neumorphic-card p-8 sm:p-10 grid md:grid-cols-12 gap-8 items-center"
                  aria-label={`${v.name} mango detailed information`}
                >
                  {/* Number + Name */}
                  <div className="md:col-span-3 flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-foreground">{v.name}</h3>
                    <p className="font-mono text-sm text-accent">{v.teluguName}</p>
                    <p className="font-mono text-xs text-muted-foreground">{v.tamilName}</p>
                    <p className="text-sm font-medium text-primary mt-1">{v.tagline}</p>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-6 grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: '👅', label: 'Flavor Profile', value: v.flavor },
                      { icon: '🌞', label: 'Season', value: v.season },
                      { icon: '⚖️', label: 'Fruit Weight', value: v.weight },
                      { icon: '🎨', label: 'Color', value: v.color },
                      { icon: '✨', label: 'Best For', value: v.bestFor },
                      { icon: '🌿', label: 'Certified Organic', value: v.certifiedOrganic ? 'Yes — APEDA certified' : 'Naturally grown, no pesticides' },
                    ].map((detail) => (
                      <div key={detail.label} className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          {detail.icon} {detail.label}
                        </p>
                        <p className="text-xs font-medium text-foreground leading-relaxed">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-3 flex flex-col gap-4 items-start md:items-end">
                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Starting from</p>
                      <p className="price-tag text-3xl font-black text-primary">
                        {formatPrice(PRICING['3kg'][v.name])}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">for 3kg box</p>
                    </div>
                    <Link
                      href="/order"
                      className="shimmer-btn text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 whitespace-nowrap"
                      aria-label={`Order ${v.name} mangoes`}
                    >
                      Order {v.name} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ComparisonTable />

        {/* Mixed Box CTA */}
        <section
          className="py-20 px-4 sm:px-6 bg-background"
          aria-label="Mixed box offer"
        >
          <div className="max-w-4xl mx-auto">
            <div className="neumorphic-card p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 blob-amber opacity-20 pointer-events-none" aria-hidden="true" />
              <div className="relative z-10">
                <span className="text-5xl block mb-6" aria-hidden="true">🥭🥭🥭🥭</span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-4">
                  Can't Decide? Try the Mixed Box.
                </h2>
                <p className="text-base text-muted-foreground font-light max-w-lg mx-auto mb-8 leading-relaxed">
                  Our curated Mixed Box includes 2–3 varieties at peak ripeness that week. We pick the best — you taste them all.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Mixed 5kg</p>
                    <p className="price-tag text-3xl font-black text-primary">{formatPrice(PRICING['5kg']['Mixed'])}</p>
                  </div>
                  <Link
                    href="/order"
                    className="shimmer-btn text-primary-foreground text-[11px] font-black uppercase tracking-[0.25em] px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
                  >
                    Order Mixed Box
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}