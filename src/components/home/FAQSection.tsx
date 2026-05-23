'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionLabel from '@/components/shared/SectionLabelComponent';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const ref = useScrollReveal();

  return (
    <section
      className="py-24 px-4 sm:px-6 bg-background"
      aria-labelledby="faq-heading"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <SectionLabel className="justify-center mb-4">
            Common Questions
          </SectionLabel>
          <h2 id="faq-heading" className="font-display text-section-xl font-black text-foreground">
            Got Questions?
          </h2>
        </div>

        <div className="space-y-3" role="list">
          {FAQ_ITEMS?.map((item, i) => {
            const isOpen = openId === item?.id;
            return (
              <div
                key={item?.id}
                className={`scroll-reveal faq-item ${isOpen ? 'active' : ''} border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/30 bg-cream-light' : 'border-border bg-muted hover:border-accent/20'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
                role="listitem"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                  onClick={() => setOpenId(isOpen ? null : item?.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item?.id}`}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-foreground pr-4">
                    {item?.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`faq-chevron flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${item?.id}`}
                  className="faq-answer px-6"
                  role="region"
                  aria-labelledby={`faq-q-${item?.id}`}
                >
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item?.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}