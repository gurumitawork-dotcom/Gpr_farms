import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-forest-deep border-t border-white/10 pt-16 pb-10 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Arc Browser Split Pattern */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <AppLogo size={36} />
              <span className="font-display text-xl font-bold text-white">GPR Farms</span>
            </div>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              Tree-ripened. Carbide-free. Delivered from our orchards in Krishnampalem, Andhra Pradesh since 1982.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={`https://wa.me/919999900000`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-widest text-forest-light hover:text-accent transition-colors"
                aria-label="Contact GPR Farms on WhatsApp"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {NAV_LINKS?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:text-accent"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Link href="/varieties" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
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
            © 2025 GPR Farms · Krishnampalem, Andhra Pradesh
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