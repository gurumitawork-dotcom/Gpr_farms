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
          className="object-cover object-[65%_center] sm:object-center"
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
      <div className="relative z-10 max-w-7xl mx-auto w-full px-3 sm:px-6 pt-8 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end min-h-[45vh] sm:min-h-[calc(100vh-8rem)]">

          {/* Left: Main Heading — col-span-8 */}
          <div className="lg:col-span-8 flex flex-col justify-end pb-4 sm:pb-8">
            <div className="fade-in-up flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-10 h-[1px] bg-accent" aria-hidden="true" />
              <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-accent">
                Est. 2016 · TN
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary-foreground fade-in-up delay-100 leading-tight">
              <span className="block">Tree-Ripened.</span>
              <span className="block text-gradient-amber">Carbide-Free.</span>
              <span className="block text-white/80">Delivered.</span>
            </h1>

            <p className="mt-4 sm:mt-8 text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed max-w-lg fade-in-up delay-200">
              Fresh mangoes harvested at dawn from our orchard — at your door within 24 hours.
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 fade-in-up delay-300">
              <Link
                href="/order"
                className="shimmer-btn text-primary-foreground text-[10px] xs:text-[11px] font-black uppercase tracking-[0.25em] px-6 xs:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 w-full xs:w-auto text-center"
                aria-label="Order farm-fresh mangoes now">
                
                🥭 Order Now
              </Link>
              <Link
                href="/varieties"
                className="group flex items-center gap-2 sm:gap-3 border-b border-white/30 pb-1 hover:border-accent transition-colors duration-300 w-full xs:w-auto justify-center xs:justify-start"
                aria-label="Explore mango varieties">
                
                <span className="text-[10px] xs:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 group-hover:text-accent transition-colors">
                  Explore Varieties
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Stats + Countdown — col-span-4 */}
          {/* <div className="lg:col-span-4 fade-in-up delay-400 w-full"> */}
            {/* <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8"> */}
              {/* Stats row */}
              {/* <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                { value: '10+', label: 'Acres', icon: '🌿' },
                { value: '24hr', label: 'Delivery', icon: '🚚' },
                { value: '3 Gen', label: 'Farming', icon: '👨‍🌾' },
                { value: '0%', label: 'Carbide', icon: '✅' }]?.
                map((stat) =>
                <div key={stat?.label} className="flex flex-col items-center gap-1 text-center p-2 sm:p-3 rounded-xl bg-white/5">
                    <span className="text-lg sm:text-xl" aria-hidden="true">{stat?.icon}</span>
                    <span className="font-display font-bold text-white text-base sm:text-lg leading-none">{stat?.value}</span>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40">{stat?.label}</span>
                  </div>
                )}
              </div> */}

              {/* Countdown */}
              {/* <div className="border-t border-white/10 pt-6">
                <CountdownTimer />
              </div> */}
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
          <path d="M12 5v14m-6-6l6 6l6-6" />
        </svg>
      </div>
    </section>);

}