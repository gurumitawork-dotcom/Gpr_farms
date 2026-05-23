'use client';

import { useState, useCallback } from 'react';
import type { CartItem } from '@/lib/types';
import { PRICING } from '@/lib/constants';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBumping, setIsBumping] = useState(false);

  const addItem = useCallback((variety: string, boxSize: string, quantity = 1) => {
    const price = PRICING[boxSize]?.[variety] ?? 0;
    setItems((prev) => {
      const existing = prev.find((i) => i.variety === variety && i.boxSize === boxSize);
      if (existing) {
        return prev.map((i) =>
          i.variety === variety && i.boxSize === boxSize
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { variety, boxSize, quantity, price }];
    });

    setIsBumping(true);
    setTimeout(() => setIsBumping(false), 400);
  }, []);

  const removeItem = useCallback((variety: string, boxSize: string) => {
    setItems((prev) => prev.filter((i) => !(i.variety === variety && i.boxSize === boxSize)));
  }, []);

  const updateQuantity = useCallback((variety: string, boxSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variety, boxSize);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.variety === variety && i.boxSize === boxSize ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, updateQuantity, total, count, isBumping, clearCart };
}