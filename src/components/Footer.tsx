import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-forest-deep border-t border-white/10 pt-12 sm:pt-16 pb-8 sm:pb-10 px-3 sm:px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Arc Browser Split Pattern */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xs">
            <div className="flex items-center gap-2 sm:gap-3">
              <AppLogo size={32} className="sm:w-9 sm:h-9" />
              <span className="font-display text-lg sm:text-xl font-bold text-white">GPR Farms</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
              Tree-ripened. Carbide-free. Delivered from our orchards in Andhra Pradesh since 1982.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
              <a
                href={`https://wa.me/919962115550`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-forest-light hover:text-accent transition-colors"
                aria-label="Contact GPR Farms on WhatsApp"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex gap-6 sm:gap-12 md:gap-16 text-xs sm:text-sm">
            <nav aria-label="Footer navigation" className="flex flex-col gap-2 sm:gap-3">
              {NAV_LINKS?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="font-medium text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:text-accent"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 sm:gap-3">
              <Link href="/varieties" className="font-medium text-white/60 hover:text-white transition-colors">
                Banganapalli
              </Link>
              <Link href="/varieties" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Himayat
              </Link>
              <Link href="/varieties" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Mallika
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-[11px] text-white/30 uppercase tracking-widest">
            © 2026 GPR Farms · Perumanallur,Tamil Nadu
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[11px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
              Privacy
            </Link>
            <Link href="/" className="text-[11px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}