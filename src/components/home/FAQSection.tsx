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
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#fffdf8] to-[#f7f4ed]"
      aria-labelledby="faq-heading"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 scroll-reveal">
          <SectionLabel className="justify-center mb-4">
            Common Questions
          </SectionLabel>

          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our farms, mango varieties,
            delivery process, and seasonal harvests.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-5">
          {FAQ_ITEMS?.map((item, i) => {
            const isOpen = openId === item?.id;

            return (
              <div
                key={item?.id}
                className={`group rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-md
                ${
                  isOpen
                    ? 'bg-white shadow-2xl border-[#f4b63d]/40'
                    : 'bg-white/70 border-black/5 hover:border-[#f4b63d]/30 hover:shadow-lg'
                }`}
                style={{
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <button
                  onClick={() =>
                    setOpenId(isOpen ? null : item?.id)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item?.id}`}
                  className="w-full flex items-center justify-between gap-5 px-6 sm:px-8 py-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Number */}
                    <div
                      className={`min-w-[42px] h-[42px] rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-[#f4b63d] text-black'
                          : 'bg-[#f5f5f5] text-muted-foreground group-hover:bg-[#fff3d8]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Question */}
                    <div>
                      <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-foreground leading-snug">
                        {item?.question}
                      </h3>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    className={`min-w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isOpen
                        ? 'bg-[#f4b63d]/20 rotate-180'
                        : 'bg-black/5 group-hover:bg-[#f4b63d]/10'
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${
                        isOpen
                          ? 'text-[#d48a00]'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${item?.id}`}
                  className={`grid transition-all duration-500 ease-in-out
                  ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-7 pl-[84px]">
                      <p className="text-sm sm:text-base leading-8 text-foreground/75">
                        {item?.answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accent line */}
                <div
                  className={`h-1 transition-all duration-500
                  ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#f4b63d] via-[#ffcf70] to-[#f4b63d]'
                      : 'bg-transparent'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}