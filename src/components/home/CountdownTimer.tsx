'use client';

import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { COUNTDOWN_TARGET } from '@/lib/constants';

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="neumorphic-inset min-w-[64px] sm:min-w-[80px] px-3 py-3 flex items-center justify-center">
        <span className="font-mono text-2xl sm:text-3xl font-bold text-foreground count-pulse tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const time = useCountdown(COUNTDOWN_TARGET);

  // return (
  //   <div className="flex flex-col items-center gap-4" role="timer" aria-label="Countdown to harvest season">
  //     <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
  //       🌞 Harvest Season Ends
  //     </p>
  //     <div className="flex items-end gap-2 sm:gap-4">
  //       <TimeBlock value={time.days} label="Days" />
  //       <span className="text-2xl font-bold text-muted-foreground/40 pb-5" aria-hidden="true">:</span>
  //       <TimeBlock value={time.hours} label="Hours" />
  //       <span className="text-2xl font-bold text-muted-foreground/40 pb-5" aria-hidden="true">:</span>
  //       <TimeBlock value={time.minutes} label="Mins" />
  //       <span className="text-2xl font-bold text-muted-foreground/40 pb-5" aria-hidden="true">:</span>
  //       <TimeBlock value={time.seconds} label="Secs" />
  //     </div>
  //   </div>
  // );
}