import { WHATSAPP_NUMBER } from './constants';
import type { CartItem, OrderFormData } from './types';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppMessage(order: OrderFormData, total: number): string {
  const lines = [
    `🥭 *New Order — GPR Farms*`,
    ``,
    `*Customer Details*`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    ``,
    `*Delivery Address*`,
    `${order.address}, ${order.city} — ${order.pincode}`,
    ``,
    `*Order Details*`,
    `Variety: ${order.variety}`,
    `Box Size: ${order.boxSize}`,
    `Quantity: ${order.quantity} box(es)`,
    ``,
    `*Total: ₹${total}*`,
    ``,
    order.notes ? `Notes: ${order.notes}` : '',
    ``,
    `_Placed via GPR Farms Website_`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(lines)}`;
}

export function buildCartWhatsAppMessage(items: CartItem[], total: number): string {
  const itemLines = items.map(
    (item) => `• ${item.variety} – ${item.boxSize} × ${item.quantity} = ₹${item.price * item.quantity}`
  );

  const lines = [
    `🥭 *Quick Order — GPR Farms*`,
    ``,
    `*Items:*`,
    ...itemLines,
    ``,
    `*Total: ₹${total}*`,
    ``,
    `_Please share delivery details to confirm order._`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(lines)}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}