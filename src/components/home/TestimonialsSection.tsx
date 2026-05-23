'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionLabel from '@/components/shared/SectionLabelComponent';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const ref = useScrollReveal();

  return (
    <section
      className="py-16 sm:py-24 px-3 sm:px-6 bg-forest-deep overflow-hidden"
      aria-labelledby="testimonials-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 items-start">
          {/* Left: Headline + Featured Quote */}
          <div className="lg:w-1/3 scroll-reveal">
            <SectionLabel className="mb-4 sm:mb-6">
              <span className="text-accent">What Customers Say</span>
            </SectionLabel>
            <h2 id="testimonials-heading" className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-6 sm:mb-8">
              "Finally, mangoes that taste like childhood."
            </h2>
            <div className="flex items-center gap-3 mt-4 sm:mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0">
                <AppImage
                  src={TESTIMONIALS?.[0]?.image}
                  alt={TESTIMONIALS?.[0]?.imageAlt}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white truncate">{TESTIMONIALS?.[0]?.name}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">{TESTIMONIALS?.[0]?.city} · {TESTIMONIALS?.[0]?.variety}</p>
              </div>
            </div>
          </div>

          {/* Right: Horizontal scroll cards */}
          <div
            className="lg:w-2/3 flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 snap-x snap-mandatory w-full"
            style={{ scrollbarWidth: 'none' }}
            role="list"
            aria-label="Customer testimonials"
          >
            {TESTIMONIALS?.slice(1)?.map((t) => (
              <article
                key={t?.id}
                className="snap-center flex-shrink-0 w-72 sm:w-80 bg-forest-mid/60 border border-white/10 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden hover:border-accent/30 transition-colors duration-500"
                role="listitem"
              >
                {/* Grayscale photo background */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
                  <AppImage
                    src={t?.image}
                    alt=""
                    fill
                    className="object-cover grayscale"
                    sizes="320px"
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex gap-0.5 mb-4" aria-label={`${t?.rating} out of 5 stars`}>
                    {Array.from({ length: t?.rating })?.map((_, i) => (
                      <span key={i} className="text-accent text-sm" aria-hidden="true">★</span>
                    ))}
                  </div>
                  <blockquote className="text-sm text-white/80 font-light leading-relaxed">
                    "{t?.quote}"
                  </blockquote>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm font-semibold text-white">{t?.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{t?.city}</p>
                  <p className="text-[10px] font-mono text-accent/70 mt-1">{t?.variety}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}