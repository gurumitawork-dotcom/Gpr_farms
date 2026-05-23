'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionLabel from '@/components/shared/SectionLabelComponent';

const FEATURES = [
  {
    emoji: '🚫',
    title: 'Zero Carbide. Ever.',
    problem: 'Market mangoes ripen in 24hrs using calcium carbide — a carcinogen that causes neurological damage.',
    solution: 'Our mangoes ripen naturally on the tree for 90–120 days. We harvest only when the fruit self-detaches. No chemicals. No shortcuts.',
    accent: 'bg-red-900/20 border-red-500/20',
    solutionColor: 'text-forest-light',
  },
  {
    emoji: '🌳',
    title: 'Tree-Ripened Only',
    problem: 'Cold storage mangoes can sit for weeks, losing sugar content and developing a watery, bland taste.',
    solution: 'We harvest to order — your box is picked the morning it ships. Maximum 6 hours from tree to packing house.',
    accent: 'bg-amber-warm/10 border-accent/20',
    solutionColor: 'text-accent',
  },
  {
    emoji: '📦',
    title: '24hr Farm-to-Door',
    problem: 'Traditional wholesaler chains mean your mango passes through 4–5 hands over 5–7 days.',
    solution: 'We pack in ventilated fibre boxes with individual cushioned separators. Cold-chain courier. Your door in 18–24 hours.',
    accent: 'bg-forest-mid/20 border-forest-light/20',
    solutionColor: 'text-forest-light',
  },
];

export default function WhyGPRSection() {
  const ref = useScrollReveal();

  return (
    <section
      className="py-16 sm:py-24 px-3 sm:px-6 bg-cream-mid relative overflow-hidden"
      aria-labelledby="why-gpr-heading"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 sm:w-80 h-48 sm:h-80 blob-forest opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-5 scroll-reveal">
            <SectionLabel>Why GPR Farms</SectionLabel>
            <h2 id="why-gpr-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mt-3 sm:mt-4 leading-tight">
              The Mango Market<br />
              <span className="text-gradient-amber">Has a Problem.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 scroll-reveal" style={{ transitionDelay: '150ms' }}>
            <p className="text-lg text-muted-foreground font-light leading-relaxed pt-4">
              Over 90% of mangoes sold in Indian cities are artificially ripened using calcium carbide. They look perfect but taste hollow — and carry real health risks. We built GPR Farms to offer the only alternative: mangoes grown, ripened, and shipped the way they should be.
            </p>
          </div>
        </div>

        {/* 3-col feature grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES?.map((feature, i) => (
            <div
              key={feature?.title}
              className={`scroll-reveal neumorphic-card p-8 border ${feature?.accent} relative overflow-hidden`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-4xl mb-6" aria-hidden="true">{feature?.emoji}</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{feature?.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-1">The Problem</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature?.problem}</p>
                </div>
                <div className="h-[1px] bg-border" aria-hidden="true" />
                <div>
                  <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${feature?.solutionColor}`}>Our Solution</p>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{feature?.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}