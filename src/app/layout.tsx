import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/tailwind.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'GPR Farms – Premium Farm-Fresh Mangoes',
  description: 'Order 100% carbide-free, tree-ripened mangoes direct from our Andhra Pradesh farm. Banganapalli, Mallika, Neelam & Himayat varieties. Free pan-India shipping.',
  keywords: ['GPR Farms', 'mangoes', 'Banganapalli', 'Himayat', 'carbide-free', 'Andhra Pradesh', 'farm fresh mangoes', 'tree ripened mangoes'],
  openGraph: {
    title: 'GPR Farms – Premium Farm-Fresh Mangoes',
    description: 'Carbide-free, tree-ripened mangoes direct from Andhra Pradesh. Order online, delivered pan-India.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPR Farms – Premium Mangoes',
    description: 'Tree-ripened, carbide-free Andhra mangoes. Farm to your door in 24 hours.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className={`${dmSans.className} antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fgprfarms3984back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}