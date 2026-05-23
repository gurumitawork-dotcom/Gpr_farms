'use client';

import React, { useState, useCallback } from 'react';
import { PRICING } from '@/lib/constants';
import { formatPrice, buildWhatsAppMessage, cn } from '@/lib/utils';
import type { OrderFormData } from '@/lib/types';

const VARIETIES = ['Banganapalli', 'Mallika', 'Neelam', 'Himayat', 'Mixed'];
const BOX_SIZES = ['3kg', '5kg', '10kg'];

interface OrderFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const INITIAL_FORM: OrderFormData = {
  name: '', phone: '', email: '', address: '', city: '', pincode: '',
  variety: 'Banganapalli', boxSize: '5kg', quantity: 1, notes: '',
};

function InputField({
  label, id, required, error, children
}: {
  label: string; id: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 font-medium" role="alert">{error}</p>}
    </div>
  );
}

export default function OrderForm({ onSuccess, onError }: OrderFormProps) {
  const [form, setForm] = useState<OrderFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const price = PRICING[form.boxSize]?.[form.variety] ?? 0;
  const total = price * form.quantity;

  const inputClass = "w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = 'Enter valid 10-digit Indian mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter valid email';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter valid 6-digit PIN code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback((field: keyof OrderFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onError('Please fix the errors above before submitting.');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      const waUrl = buildWhatsAppMessage(form, total);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      onSuccess(`Order for ${form.quantity}× ${form.variety} (${form.boxSize}) sent via WhatsApp! 🥭`);
      setForm(INITIAL_FORM);
    } catch {
      onError('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsLoading(false);
    }
  }, [form, total, validate, onSuccess, onError]);

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Mango order form" className="space-y-8">
      {/* Terminal-style double border container */}
      <div className="border border-border/60 p-1 rounded-2xl bg-muted/30">
        <div className="border border-border rounded-xl p-6 sm:p-8 bg-background space-y-8">

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">Step 01</span>
            <div className="flex-1 h-[1px] bg-border">
              <div className="h-full w-1/3 bg-primary rounded-full" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">03</span>
          </div>

          {/* Step 1: Variety & Size */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🥭</span> Choose Your Mango
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Variety" id="variety" required error={errors.variety}>
                <div className="relative">
                  <select
                    id="variety"
                    value={form.variety}
                    onChange={(e) => handleChange('variety', e.target.value)}
                    className={selectClass}
                    aria-required="true"
                  >
                    {VARIETIES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" aria-hidden="true">▾</div>
                </div>
              </InputField>

              <InputField label="Box Size" id="boxSize" required>
                <div className="flex gap-2" role="group" aria-label="Select box size">
                  {BOX_SIZES.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleChange('boxSize', size)}
                      className={cn(
                        'flex-1 py-3 text-xs font-bold rounded-xl border transition-all duration-200',
                        form.boxSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-transparent text-muted-foreground border-border hover:border-primary'
                      )}
                      aria-pressed={form.boxSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </InputField>

              <InputField label="Quantity" id="quantity" required>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange('quantity', Math.max(1, form.quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-muted border border-border rounded-xl text-foreground font-bold hover:border-primary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="price-tag text-xl font-bold text-foreground w-8 text-center" aria-live="polite">
                    {form.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleChange('quantity', form.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-muted border border-border rounded-xl text-foreground font-bold hover:border-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="price-tag text-sm text-muted-foreground ml-2">
                    × {formatPrice(price)} = <span className="text-primary font-bold">{formatPrice(total)}</span>
                  </span>
                </div>
              </InputField>
            </div>
          </fieldset>

          {/* Step 2: Personal Details */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span aria-hidden="true">✋</span> Your Details
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Full Name" id="name" required error={errors.name}>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Rajan Pillai"
                  className={inputClass}
                  aria-required="true"
                  autoComplete="name"
                />
              </InputField>
              <InputField label="Mobile Number" id="phone" required error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="9876543210"
                  className={inputClass}
                  aria-required="true"
                  autoComplete="tel"
                  maxLength={10}
                />
              </InputField>
              <InputField label="Email Address" id="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="rajan@email.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </InputField>
            </div>
          </fieldset>

          {/* Step 3: Delivery */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span aria-hidden="true">🚚</span> Delivery Address
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <InputField label="Full Address" id="address" required error={errors.address}>
                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Flat 4B, Palm Grove Apartments, MG Road"
                    className={`${inputClass} resize-none h-20`}
                    aria-required="true"
                    autoComplete="street-address"
                  />
                </InputField>
              </div>
              <InputField label="City" id="city" required error={errors.city}>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Bengaluru"
                  className={inputClass}
                  aria-required="true"
                  autoComplete="address-level2"
                />
              </InputField>
              <InputField label="PIN Code" id="pincode" required error={errors.pincode}>
                <input
                  id="pincode"
                  type="text"
                  value={form.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  placeholder="560001"
                  className={inputClass}
                  aria-required="true"
                  autoComplete="postal-code"
                  maxLength={6}
                />
              </InputField>
              <div className="sm:col-span-2">
                <InputField label="Special Instructions" id="notes">
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Leave at door / Call before delivery..."
                    className={`${inputClass} resize-none h-16`}
                  />
                </InputField>
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <p className="text-[11px] text-muted-foreground max-w-xs">
              Order confirmation sent via WhatsApp. 50% advance required to confirm delivery.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-3 shimmer-btn text-primary-foreground text-[11px] font-black uppercase tracking-[0.25em] px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 disabled:opacity-60 disabled:scale-100"
              aria-label="Submit order via WhatsApp"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  Processing...
                </>
              ) : (
                <>💬 Confirm via WhatsApp</>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}