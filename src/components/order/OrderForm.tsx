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

// ─── Validation Rules ────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof OrderFormData, string>>;
type TouchedFields = Partial<Record<keyof OrderFormData, boolean>>;

function validateField(field: keyof OrderFormData, value: string | number): string {
  switch (field) {
    case 'name': {
      const v = String(value).trim();
      if (!v) return 'Full name is required.';
      if (v.length < 2) return 'Name must be at least 2 characters.';
      if (v.length > 60) return 'Name must be under 60 characters.';
      if (!/^[A-Za-z\s'.'-]+$/.test(v)) return 'Name can only contain letters, spaces, hyphens, or apostrophes.';
      return '';
    }
    case 'phone': {
      const v = String(value).trim();
      if (!v) return 'Mobile number is required.';
      if (!/^[6-9]\d{9}$/.test(v)) return 'Enter a valid 10-digit Indian mobile number (starting 6–9).';
      return '';
    }
    case 'email': {
      const v = String(value).trim();
      if (!v) return ''; // optional
      if (v.length > 254) return 'Email address is too long.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address (e.g. you@example.com).';
      return '';
    }
    case 'address': {
      const v = String(value).trim();
      if (!v) return 'Delivery address is required.';
      if (v.length < 10) return 'Please provide a more complete address (at least 10 characters).';
      if (v.length > 200) return 'Address must be under 200 characters.';
      return '';
    }
    case 'city': {
      const v = String(value).trim();
      if (!v) return 'City is required.';
      if (v.length < 2) return 'City name must be at least 2 characters.';
      if (v.length > 50) return 'City name must be under 50 characters.';
      if (!/^[A-Za-z\s\-'\.]+$/.test(v)) return 'City name can only contain letters, spaces, or hyphens.';
      return '';
    }
    case 'pincode': {
      const v = String(value).trim();
      if (!v) return 'PIN code is required.';
      if (!/^\d{6}$/.test(v)) return 'Enter a valid 6-digit PIN code.';
      // Basic range check: Indian PIN codes start with 1–9
      if (/^0/.test(v)) return 'PIN code cannot start with 0.';
      return '';
    }
    case 'notes': {
      const v = String(value);
      if (v.length > 300) return 'Notes must be under 300 characters.';
      return '';
    }
    default:
      return '';
  }
}

function validateAll(form: OrderFormData): FormErrors {
  const fields: (keyof OrderFormData)[] = ['name', 'phone', 'email', 'address', 'city', 'pincode', 'notes'];
  const errors: FormErrors = {};
  for (const field of fields) {
    const msg = validateField(field, form[field] as string | number);
    if (msg) errors[field] = msg;
  }
  return errors;
}

// ─── InputField ──────────────────────────────────────────────────────────────

function InputField({
  label, id, required, error, hint, children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1" role="alert" aria-live="polite">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

// ─── Shared class helpers ─────────────────────────────────────────────────────

function fieldClass(base: string, error?: string, touched?: boolean): string {
  if (touched && error) return `${base} border-red-400 focus:ring-red-400/40 focus:border-red-400`;
  if (touched && !error) return `${base} border-green-400 focus:ring-green-400/40 focus:border-green-400`;
  return base;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function OrderForm({ onSuccess, onError }: OrderFormProps) {
  const [form, setForm] = useState<OrderFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const price = PRICING[form.boxSize]?.[form.variety] ?? 0;
  const total = price * form.quantity;

  const baseInputClass =
    'w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200';
  const baseSelectClass = `${baseInputClass} appearance-none cursor-pointer`;

  // Update field value + re-validate it immediately
  const handleChange = useCallback(
    (field: keyof OrderFormData, value: string | number) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      // Live re-validate once the field has been touched or submit was attempted
      setErrors((prev) => {
        const msg = validateField(field, value);
        if (msg) return { ...prev, [field]: msg };
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  // Mark field as touched and validate on blur
  const handleBlur = useCallback(
    (field: keyof OrderFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const msg = validateField(field, form[field] as string | number);
      setErrors((prev) => {
        if (msg) return { ...prev, [field]: msg };
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [form],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitAttempted(true);

      // Mark every validated field as touched so all errors show
      const allTouched: TouchedFields = {};
      (['name', 'phone', 'email', 'address', 'city', 'pincode', 'notes'] as (keyof OrderFormData)[]).forEach(
        (f) => { allTouched[f] = true; },
      );
      setTouched(allTouched);

      const newErrors = validateAll(form);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        onError('Please fix the highlighted errors before submitting.');
        // Scroll to first error field
        const firstErrorId = Object.keys(newErrors)[0];
        document.getElementById(firstErrorId)?.focus();
        return;
      }

      setIsLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 600));
        const waUrl = buildWhatsAppMessage(form, total);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        onSuccess(`Order for ${form.quantity}× ${form.variety} (${form.boxSize}) sent via WhatsApp! 🥭`);
        setForm(INITIAL_FORM);
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
      } catch {
        onError('Something went wrong. Please try again or WhatsApp us directly.');
      } finally {
        setIsLoading(false);
      }
    },
    [form, total, onSuccess, onError],
  );

  // Helper: is this field visually invalid?
  const isInvalid = (field: keyof OrderFormData) =>
    (touched[field] || submitAttempted) && !!errors[field];
  const isValid = (field: keyof OrderFormData) =>
    (touched[field] || submitAttempted) && !errors[field] && !!form[field];

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

          {/* ── Step 1: Variety & Size ────────────────────────── */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🥭</span> Choose Your Mango
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">

              <InputField label="Variety" id="variety" required error={isInvalid('variety') ? errors.variety : undefined}>
                <div className="relative">
                  <select
                    id="variety"
                    value={form.variety}
                    onChange={(e) => handleChange('variety', e.target.value)}
                    onBlur={() => handleBlur('variety')}
                    className={fieldClass(baseSelectClass, errors.variety, touched.variety)}
                    aria-required="true"
                    aria-invalid={isInvalid('variety')}
                    aria-describedby={errors.variety ? 'variety-error' : undefined}
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
                          : 'bg-transparent text-muted-foreground border-border hover:border-primary',
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

          {/* ── Step 2: Personal Details ──────────────────────── */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span aria-hidden="true">✋</span> Your Details
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">

              <InputField
                label="Full Name"
                id="name"
                required
                error={isInvalid('name') ? errors.name : undefined}
                hint={!isInvalid('name') ? 'Letters, spaces, hyphens only' : undefined}
              >
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder=""
                    className={fieldClass(baseInputClass, errors.name, touched.name)}
                    aria-required="true"
                    aria-invalid={isInvalid('name')}
                    autoComplete="name"
                    maxLength={60}
                  />
                  {isValid('name') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" aria-hidden="true">✓</span>
                  )}
                </div>
              </InputField>

              <InputField
                label="Mobile Number"
                id="phone"
                required
                error={isInvalid('phone') ? errors.phone : undefined}
                hint={!isInvalid('phone') ? '10-digit Indian number (6–9 start)' : undefined}
              >
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      // Allow only digits
                      const digits = e.target.value.replace(/\D/g, '');
                      handleChange('phone', digits);
                    }}
                    onBlur={() => handleBlur('phone')}
                    placeholder=""
                    className={fieldClass(baseInputClass, errors.phone, touched.phone)}
                    aria-required="true"
                    aria-invalid={isInvalid('phone')}
                    autoComplete="tel"
                    maxLength={10}
                    inputMode="numeric"
                  />
                  {isValid('phone') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" aria-hidden="true">✓</span>
                  )}
                </div>
              </InputField>

              <InputField
                label="Email Address"
                id="email"
                error={isInvalid('email') ? errors.email : undefined}
                hint={!isInvalid('email') ? 'Optional — for order confirmation' : undefined}
              >
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@example.com"
                    className={fieldClass(baseInputClass, errors.email, touched.email)}
                    aria-invalid={isInvalid('email')}
                    autoComplete="email"
                    maxLength={254}
                  />
                  {isValid('email') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" aria-hidden="true">✓</span>
                  )}
                </div>
              </InputField>

            </div>
          </fieldset>

          {/* ── Step 3: Delivery ──────────────────────────────── */}
          <fieldset>
            <legend className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span aria-hidden="true">🚚</span> Delivery Address
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="sm:col-span-2">
                <InputField
                  label="Full Address"
                  id="address"
                  required
                  error={isInvalid('address') ? errors.address : undefined}
                  hint={!isInvalid('address') ? `${form.address.length}/200 — Include street, landmark, apartment` : undefined}
                >
                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    placeholder="Enter your full delivery address, including street, landmark, and apartment/suite number if applicable."
                    className={`${fieldClass(baseInputClass, errors.address, touched.address)} resize-none h-20`}
                    aria-required="true"
                    aria-invalid={isInvalid('address')}
                    autoComplete="street-address"
                    maxLength={200}
                  />
                </InputField>
              </div>

              <InputField
                label="City"
                id="city"
                required
                error={isInvalid('city') ? errors.city : undefined}
              >
                <div className="relative">
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    placeholder=""
                    className={fieldClass(baseInputClass, errors.city, touched.city)}
                    aria-required="true"
                    aria-invalid={isInvalid('city')}
                    autoComplete="address-level2"
                    maxLength={50}
                  />
                  {isValid('city') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" aria-hidden="true">✓</span>
                  )}
                </div>
              </InputField>

              <InputField
                label="PIN Code"
                id="pincode"
                required
                error={isInvalid('pincode') ? errors.pincode : undefined}
                hint={!isInvalid('pincode') ? '6-digit Indian PIN code' : undefined}
              >
                <div className="relative">
                  <input
                    id="pincode"
                    type="text"
                    value={form.pincode}
                    onChange={(e) => {
                      // Allow only digits
                      const digits = e.target.value.replace(/\D/g, '');
                      handleChange('pincode', digits);
                    }}
                    onBlur={() => handleBlur('pincode')}
                    placeholder=""
                    className={fieldClass(baseInputClass, errors.pincode, touched.pincode)}
                    aria-required="true"
                    aria-invalid={isInvalid('pincode')}
                    autoComplete="postal-code"
                    maxLength={6}
                    inputMode="numeric"
                  />
                  {isValid('pincode') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" aria-hidden="true">✓</span>
                  )}
                </div>
              </InputField>

              <div className="sm:col-span-2">
                <InputField
                  label="Special Instructions"
                  id="notes"
                  error={isInvalid('notes') ? errors.notes : undefined}
                  hint={!isInvalid('notes') ? `${form.notes.length}/300 — Optional` : undefined}
                >
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    onBlur={() => handleBlur('notes')}
                    placeholder="Leave at door / Call before delivery…"
                    className={`${fieldClass(baseInputClass, errors.notes, touched.notes)} resize-none h-16`}
                    aria-invalid={isInvalid('notes')}
                    maxLength={300}
                  />
                </InputField>
              </div>

            </div>
          </fieldset>

          {/* ── Submit ────────────────────────────────────────── */}
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