'use client';

import React from 'react';
import type { ToastMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ICONS: Record<ToastMessage['type'], string> = {
  success: '✅',
  error: '❌',
  info: '🥭',
};

const BG_CLASSES: Record<ToastMessage['type'], string> = {
  success: 'bg-forest-mid border-forest-light/40',
  error: 'bg-red-900 border-red-500/40',
  info: 'bg-forest-deep border-accent/30',
};

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-start gap-3 p-4 rounded-xl border shadow-2xl toast-enter',
            BG_CLASSES[toast.type]
          )}
          role="alert"
        >
          <span className="text-lg flex-shrink-0" aria-hidden="true">{ICONS[toast.type]}</span>
          <p className="text-sm text-white font-medium leading-relaxed flex-1">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-white/40 hover:text-white text-xs transition-colors flex-shrink-0 mt-0.5"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}