import React from 'react';
import type { Metadata } from 'next';
import HomepageClient from './components/HomepageClient';

export const metadata: Metadata = {
  title: 'GPR Farms – Premium Farm Fresh Mangoes from Andhra Pradesh',
  description: 'Order 100% carbide-free, tree-ripened mangoes direct from our Andhra Pradesh farm. Banganapalli, Mallika, Neelam & Himayat varieties. Free pan-India shipping.',
  keywords: ['GPR Farms', 'farm fresh mangoes', 'carbide free mangoes', 'Banganapalli', 'Himayat', 'Andhra Pradesh mangoes', 'order mangoes online'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'GPR Farms – Premium Farm-Fresh Mangoes from Andhra Pradesh',
    description: 'Carbide-free, tree-ripened Andhra mangoes. Farm to your door in 24 hours.',
    url: '/',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'GPR Farms Premium Mangoes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPR Farms – Premium Mangoes',
    description: 'Tree-ripened, carbide-free Andhra mangoes delivered pan-India.',
  },
};

export default function HomePage() {
  return <HomepageClient />;
}