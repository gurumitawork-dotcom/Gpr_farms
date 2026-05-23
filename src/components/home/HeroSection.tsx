'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import CountdownTimer from './CountdownTimer';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero — GPR Farms Premium Mangoes">
      
      {/* Background Photo */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1621209a6-1767949399635.png"
          alt="Lush mango orchard in Andhra Pradesh with golden mangoes hanging from trees in warm afternoon sunlight, deep green canopy with dappled light"
          fill
          priority
          className="object-cover"
          sizes="100vw" />
        
        {/* Atmospheric overlay — from forest green to transparent */}
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
        {/* Bottom fade to page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
          aria-hidden="true" />
        
      </div>
      {/* Atmospheric blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 blob-amber opacity-30 pointer-events-none"
        aria-hidden="true"
        style={{ transform: 'translate(-50%, -50%)' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end min-h-[calc(100vh-8rem)]">

          {/* Left: Main Heading — col-span-8 */}
          <div className="lg:col-span-8 flex flex-col justify-end pb-8">
            <div className="fade-in-up flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Est. 2016 · Perumanallur, TN
              </span>
            </div>

            <h1 className="font-display text-hero-xl font-black text-primary-foreground fade-in-up delay-100">
              <span className="block">Tree-Ripened.</span>
              <span className="block text-gradient-amber">Carbide-Free.</span>
              <span className="block text-white/80">Delivered.</span>
            </h1>

            <p className="mt-8 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-lg fade-in-up delay-200">
              Banganapalli, Himayat, Mallika & Neelam mangoes harvested at dawn from our 40-acre orchard — at your door within 24 hours.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 fade-in-up delay-300">
              <Link
                href="/order"
                className="shimmer-btn text-primary-foreground text-[11px] font-black uppercase tracking-[0.25em] px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
                aria-label="Order farm-fresh mangoes now">
                
                🥭 Order Now
              </Link>
              <Link
                href="/varieties"
                className="group flex items-center gap-3 border-b border-white/30 pb-1 hover:border-accent transition-colors duration-300"
                aria-label="Explore mango varieties">
                
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 group-hover:text-accent transition-colors">
                  Explore Varieties
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Stats + Countdown — col-span-4 */}
          <div className="lg:col-span-4 fade-in-up delay-400">
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                { value: '40+', label: 'Acres', icon: '🌿' },
                { value: '24hr', label: 'Delivery', icon: '🚚' },
                { value: '3 Gen', label: 'Farming', icon: '👨‍🌾' },
                { value: '0%', label: 'Carbide', icon: '✅' }]?.
                map((stat) =>
                <div key={stat?.label} className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-white/5">
                    <span className="text-xl" aria-hidden="true">{stat?.icon}</span>
                    <span className="font-display font-bold text-white text-lg leading-none">{stat?.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{stat?.label}</span>
                  </div>
                )}
              </div>

              {/* Countdown */}
              <div className="border-t border-white/10 pt-6">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
          <path d="M12 5v14m-6-6l6 6l6-6" />
        </svg>
      </div>
    </section>);

}