import React from 'react';
import type { Metadata } from 'next';
import OrderClient from './components/OrderClient';

export const metadata: Metadata = {
  title: 'Order Fresh Mangoes Online | Free Delivery | GPR Farms',
  description: 'Order carbide-free, tree-ripened mangoes online. Choose from Banganapalli, Mallika, Neelam, Himayat. Free pan-India shipping. Delivered in 24 hours.',
  keywords: ['order mangoes online', 'buy Banganapalli mango', 'farm fresh mango delivery', 'GPR Farms order'],
  alternates: { canonical: '/order' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Order Fresh Mangoes Online | GPR Farms',
    description: 'Farm-to-door mango delivery across India. Free shipping on all orders.',
    url: '/order',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Order GPR Farms Mangoes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Order GPR Farms Mangoes',
    description: 'Carbide-free mangoes. Free shipping. Delivered in 24 hours.',
  },
};

export default function OrderPage() {
  return <OrderClient />;
}