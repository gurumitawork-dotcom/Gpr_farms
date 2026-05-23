'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HeaderProps {
  cartCount?: number;
  isBumping?: boolean;
  onCartClick?: () => void;
}

export default function Header({ cartCount = 0, isBumping = false, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-forest-deep/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="GPR Farms Home">
            <AppLogo size={38} />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-primary-foreground leading-tight tracking-tight group-hover:text-accent transition-colors">
                GPR Farms
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 leading-none">
                Est. 1982 · Andhra Pradesh
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-expand text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300"
              aria-label={`Cart — ${cartCount} items`}
            >
              <span>🥭</span>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className={cn(
                    'absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-black rounded-full px-1',
                    isBumping && 'cart-bump'
                  )}
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order CTA */}
            <Link
              href="/order"
              className="hidden sm:flex items-center gap-2 shimmer-btn text-primary-foreground text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
              aria-label="Order mangoes now"
            >
              Order Now
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  'block h-0.5 bg-white rounded transition-all duration-300 origin-center',
                  mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-white rounded transition-all duration-300',
                  mobileOpen ? 'w-0 opacity-0' : 'w-4'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-white rounded transition-all duration-300 origin-center',
                  mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-forest-deep border-l border-white/10 flex flex-col pt-24 pb-10 px-8">
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display font-medium text-white/80 hover:text-accent transition-colors duration-200 border-b border-white/10 pb-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/order"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center shimmer-btn text-primary-foreground text-[11px] font-black uppercase tracking-[0.2em] px-5 py-4 rounded-xl"
              >
                🥭 Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}