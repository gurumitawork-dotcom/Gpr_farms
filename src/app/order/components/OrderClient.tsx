'use client';

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import OrderForm from '../../../components/order/OrderForm';
import OrderSummary from '../../../components/order/OrderSummary';
import WhatsAppFloat from '../../../components/shared/WhatsAppFloat';
import ToastContainer from '../../../components/shared/ToastContainer';
import SectionLabel from '../../../components/shared/SectionLabelComponent';
import { useCart } from '../../../hooks/useCart';
import { useToast } from '../../../hooks/useToast';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { PRICING } from '../../../lib/constants';
import { formatPrice } from '../../../lib/utils';
import Link from 'next/link';

const PROMISES = [
  { icon: '✅', title: 'Carbide-Free Guarantee', desc: 'Every mango is tree-ripened. Zero artificial chemicals. Ever.' },
  { icon: '🌳', title: 'Harvested to Order', desc: 'We pick your mangoes the morning your order ships. Maximum freshness.' },
  { icon: '🚚', title: 'Free Pan-India Shipping', desc: 'No minimum order. Free delivery to any PIN code in India.' },
  { icon: '📦', title: 'Arrives in 18–24 Hours', desc: 'Cold-chain courier from our farm in Krishnampalem, AP.' },
];

function OrderPromises() {
  const ref = useScrollReveal();
  return (
    <section
      className="py-16 px-4 sm:px-6 bg-forest-deep border-t border-white/10"
      aria-label="Order promises and guarantees"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROMISES.map((p, i) => (
          <div
            key={p.title}
            className="scroll-reveal flex flex-col gap-3"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="text-3xl" aria-hidden="true">{p.icon}</span>
            <h3 className="font-display font-bold text-white text-base">{p.title}</h3>
            <p className="text-sm text-white/50 font-light leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickVarietyPicker({
  selectedVariety,
  selectedSize,
  onSelect,
}: {
  selectedVariety: string;
  selectedSize: string;
  onSelect: (variety: string, size: string) => void;
}) {
  const VARIETIES = ['Banganapalli', 'Mallika', 'Neelam', 'Himayat', 'Mixed'];
  const BOX_SIZES = ['3kg', '5kg', '10kg'];

  return (
    <div className="neumorphic-card p-6 mb-8">
      <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <span aria-hidden="true">🥭</span> Quick Pick
      </h2>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Select variety">
        {VARIETIES.map((v) => (
          <button
            key={v}
            onClick={() => onSelect(v, selectedSize)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
              selectedVariety === v
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary'
            }`}
            aria-pressed={selectedVariety === v}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex gap-2" role="group" aria-label="Select box size">
        {BOX_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(selectedVariety, size)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
              selectedSize === size
                ? 'bg-secondary text-secondary-foreground border-secondary shadow-md'
                : 'bg-transparent text-muted-foreground border-border hover:border-secondary hover:text-secondary'
            }`}
            aria-pressed={selectedSize === size}
          >
            {size} — {formatPrice(PRICING[size]?.[selectedVariety] ?? 0)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OrderClient() {
  const [summaryVariety, setSummaryVariety] = useState('Banganapalli');
  const [summarySize, setSummarySize] = useState('5kg');
  const [summaryQty, setSummaryQty] = useState(1);

  const { count, isBumping } = useCart();
  const { toasts, addToast, removeToast } = useToast();
  const ref = useScrollReveal();

  const handleQuickPick = (variety: string, size: string) => {
    setSummaryVariety(variety);
    setSummarySize(size);
  };

  return (
    <>
      <Header cartCount={count} isBumping={isBumping} />
      <main id="main-content">
        {/* Page Hero */}
        <section
          className="relative pt-36 pb-16 px-4 sm:px-6 bg-forest-deep overflow-hidden grain-texture"
          aria-labelledby="order-page-heading"
        >
          <div className="absolute inset-0 hero-overlay opacity-50" aria-hidden="true" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 blob-amber opacity-15 pointer-events-none -translate-y-1/2" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="fade-in-up flex justify-center mb-6">
              <SectionLabel>
                <span className="text-accent">Place Your Order</span>
              </SectionLabel>
            </div>
            <h1 className="font-display text-hero-xl font-black text-white fade-in-up delay-100">
              Order<br />
              <span className="text-gradient-amber">Farm-Fresh.</span>
            </h1>
            <p className="text-white/60 text-base font-light mt-6 fade-in-up delay-200 leading-relaxed">
              Fill in your details below. We'll confirm via WhatsApp and dispatch within hours of harvest.
            </p>
          </div>
        </section>

        {/* Order Content */}
        <section
          className="py-16 px-4 sm:px-6 bg-background"
          ref={ref}
          aria-label="Order form and summary"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

              {/* Form — col-span-8 */}
              <div className="lg:col-span-8 scroll-reveal">
                <QuickVarietyPicker
                  selectedVariety={summaryVariety}
                  selectedSize={summarySize}
                  onSelect={handleQuickPick}
                />
                <OrderForm
                  onSuccess={(msg: string) => addToast('success', msg)}
                  onError={(msg: string) => addToast('error', msg)}
                />
              </div>

              {/* Summary — col-span-4 */}
              <div className="lg:col-span-4 scroll-reveal" style={{ transitionDelay: '150ms' }}>
                <OrderSummary
                  variety={summaryVariety}
                  boxSize={summarySize}
                  quantity={summaryQty}
                />

                {/* Corporate CTA */}
                <div className="neumorphic-card p-6 mt-6 forest-card text-center">
                  <span className="text-3xl block mb-3" aria-hidden="true">🏢</span>
                  <h3 className="font-display font-bold text-white text-base mb-2">
                    Bulk / Corporate Order?
                  </h3>
                  <p className="text-sm text-white/60 mb-4 font-light leading-relaxed">
                    Orders above 50kg? Custom packaging available.
                  </p>
                  <a
                    href={`https://wa.me/919999900000?text=${encodeURIComponent('Hi! I need a bulk/corporate mango order from GPR Farms.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#25D366] text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 rounded-xl hover:bg-[#1fbd5a] transition-colors"
                    aria-label="Enquire about bulk orders on WhatsApp"
                  >
                    💬 WhatsApp for Bulk
                  </a>
                </div>

                {/* Variety quick links */}
                <div className="neumorphic-card p-6 mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Not sure which variety?
                  </p>
                  <Link
                    href="/varieties"
                    className="flex items-center justify-between group border-b border-border pb-3 hover:border-primary transition-colors"
                    aria-label="Explore all mango varieties"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Explore All Varieties
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true">
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OrderPromises />

        {/* FAQ teaser */}
        <section
          className="py-16 px-4 sm:px-6 bg-muted border-t border-border text-center"
          aria-label="Questions before ordering"
        >
          <div className="max-w-2xl mx-auto">
            <p className="font-display text-2xl font-bold text-foreground mb-3">
              Questions before you order?
            </p>
            <p className="text-muted-foreground text-base font-light mb-6">
              Check our FAQ or reach us directly on WhatsApp — we typically respond within 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="text-[11px] font-semibold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors border border-primary/30 hover:border-primary px-8 py-3 rounded-full"
              >
                Read FAQ
              </Link>
              <a
                href="https://wa.me/919999900000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-widest text-white bg-[#25D366] hover:bg-[#1fbd5a] transition-colors px-8 py-3 rounded-full"
                aria-label="Chat with us on WhatsApp"
              >
                💬 Chat with Us
              </a>
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