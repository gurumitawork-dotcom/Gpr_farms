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
            ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0" aria-label="GPR Farms Home">
            <AppLogo size={32} className="sm:w-[38px] sm:h-[38px]" />
            <div className="flex flex-col hidden xs:flex">
              <span className={cn(
                'font-display text-sm sm:text-lg font-bold leading-tight tracking-tight group-hover:text-accent transition-colors',
                isScrolled ? 'text-foreground' : 'text-white'
              )}>
                GPR Farms
              </span>
              <span className={cn(
                'font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] leading-none transition-colors',
                isScrolled ? 'text-foreground/60' : 'text-white/50'
              )}>
                Est. 2016 · TN
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'underline-expand text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300',
                  isScrolled 
                    ? 'text-foreground hover:text-accent' 
                    : 'text-white hover:text-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className={cn(
                'relative flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-2 rounded-full transition-all duration-300',
                isScrolled
                    ? 'bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-bold'
                    : 'bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white'
              )}
              aria-label={`Cart — ${cartCount} items`}
            >
              <span className="text-sm sm:text-base">🥭</span>
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className={cn(
                    'absolute -top-1.5 -right-1.5 min-w-[16px] sm:min-w-[18px] h-4 sm:h-[18px] flex items-center justify-center bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-black rounded-full px-0.5 sm:px-1',
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
              className="hidden sm:flex items-center gap-2 shimmer-btn text-primary-foreground text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
              aria-label="Order mangoes now"
            >
              Order Now
            </Link>

            {/* Mobile Order Button */}
            <Link
              href="/order"
              className="sm:hidden px-3 py-2 text-[11px] font-black uppercase tracking-wider shimmer-btn text-primary-foreground rounded-full"
              aria-label="Order"
            >
              Order
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
                  'block h-0.5 rounded transition-all duration-300 origin-center',
                  isScrolled 
                    ? 'bg-foreground' 
                    : 'bg-white',
                  mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 rounded transition-all duration-300',
                  isScrolled 
                    ? 'bg-foreground' 
                    : 'bg-white',
                  mobileOpen ? 'w-0 opacity-0' : 'w-4'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 rounded transition-all duration-300 origin-center',
                  isScrolled 
                    ? 'bg-foreground' 
                    : 'bg-white',
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