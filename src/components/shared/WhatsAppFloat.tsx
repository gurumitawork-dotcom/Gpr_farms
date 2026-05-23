'use client';

import React from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER?.replace('+', '')}?text=${encodeURIComponent('Hi! I want to order mangoes from GPR Farms.')}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-2xl float-wa transition-all duration-300 hover:scale-105"
      aria-label="Chat with GPR Farms on WhatsApp"
    >
      <span className="text-lg sm:text-xl" aria-hidden="true">💬</span>
      <span className="hidden sm:inline">Order via WhatsApp</span>
    </a>
  );
}