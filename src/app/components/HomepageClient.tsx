'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import WhyGPRSection from '@/components/home/WhyGPRSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import PunchyBanner from '@/components/home/PunchyBanner';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import StickyOrderBar from '@/components/shared/StickyOrderBar';
import ToastContainer from '@/components/shared/ToastContainer';
import VarietyCard from '@/components/varieties/VarietyCard';
import SectionLabel from '@/components/shared/SectionLabelComponent';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { VARIETIES, STATS } from '@/lib/constants';

function VarietiesPreviewSection({
  onAddToCart,
}: {
  onAddToCart: (variety: string, boxSize: string) => void;
}) {
  const [sizes, setSizes] = useState<Record<string, string>>({
    Banganapalli: '5kg', Mallika: '5kg', Neelam: '5kg', Himayat: '5kg',
  });
  const ref = useScrollReveal();

  return (
    <section
      className="py-16 sm:py-24 px-3 sm:px-6 bg-background"
      aria-labelledby="varieties-preview-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="scroll-reveal w-full sm:w-auto">
            <SectionLabel>Our Varieties</SectionLabel>
            <h2 id="varieties-preview-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mt-2 sm:mt-3">
              Four Varieties.<br />
              <span className="text-gradient-amber">One Farm.</span>
            </h2>
          </div>
          <a
            href="/varieties"
            className="scroll-reveal underline-expand text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap"
            style={{ transitionDelay: '150ms' }}
          >
            View All Details →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useScrollReveal();
  return (
    <section
      className="py-12 sm:py-16 px-3 sm:px-6 bg-forest-deep border-y border-white/10"
      aria-label="GPR Farms statistics"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="scroll-reveal flex flex-col items-center text-center gap-1.5 sm:gap-2"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="text-2xl sm:text-3xl" aria-hidden="true">{stat.icon}</span>
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-accent">{stat.value}</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-white/50">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomepageClient() {
  const { count, isBumping, addItem } = useCart();
  const { toasts, addToast, removeToast } = useToast();

  const handleAddToCart = (variety: string, boxSize: string) => {
    addItem(variety, boxSize);
    addToast('success', `🥭 ${variety} (${boxSize}) added to your order!`);
  };

  return (
    <>
      <Header cartCount={count} isBumping={isBumping} />
      <main id="main-content">
        <HeroSection />
        <PromotionalBanner />
        <StatsSection />
        <WhyGPRSection />
        <VarietiesPreviewSection onAddToCart={handleAddToCart} />
        <PunchyBanner />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <StickyOrderBar />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}