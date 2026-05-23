import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-8 h-[1px] bg-accent" aria-hidden="true" />
      <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.3em] text-accent">
        {children}
      </span>
    </div>
  );
}
