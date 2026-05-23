import React from 'react';
import type { Metadata } from 'next';
import VarietiesClient from './components/VarietiesClient';

export const metadata: Metadata = {
  title: 'Mango Varieties – Banganapalli, Mallika, Neelam, Himayat | GPR Farms',
  description: 'Explore all GPR Farms mango varieties — Banganapalli, Mallika, Neelam, Himayat. Tree-ripened, carbide-free. Telugu & Tamil names, flavor notes, seasonal availability.',
  keywords: ['Banganapalli mango', 'Himayat mango', 'Mallika mango', 'Neelam mango', 'బంగినపల్లి', 'హిమాయత్'],
  alternates: { canonical: '/varieties' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mango Varieties – Banganapalli, Mallika, Neelam, Himayat | GPR Farms',
    description: 'Four premium mango varieties, tree-ripened and carbide-free.',
    url: '/varieties',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'GPR Farms Mango Varieties' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPR Farms Mango Varieties',
    description: 'Banganapalli, Mallika, Neelam, Himayat — tree-ripened from our farm.',
  },
};

export default function VarietiesPage() {
  return <VarietiesClient />;
}