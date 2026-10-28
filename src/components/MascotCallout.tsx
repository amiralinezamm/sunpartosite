import React from 'react';

export type MascotPose = 'support' | 'calculator' | 'faq' | 'installer';

const MASCOT_ALT: Record<MascotPose, string> = {
  support: 'مسکات سان پرتو با هدست پشت میز پشتیبانی',
  calculator: 'مسکات سان پرتو با تبلت محاسبه صرفه‌جویی انرژی',
  faq: 'مسکات سان پرتو در حال پاسخ به سوالات',
  installer: 'مسکات سان پرتو با دریل، آماده نصب سیستم خورشیدی',
};

// Image width per pose; the desk scene is wider than the standing poses
const MASCOT_SIZE: Record<MascotPose, { className: string; width: number; height: number }> = {
  support: { className: 'w-36 sm:w-56', width: 641, height: 700 },
  calculator: { className: 'w-24 sm:w-32', width: 500, height: 900 },
  faq: { className: 'w-24 sm:w-32', width: 500, height: 900 },
  installer: { className: 'w-24 sm:w-32', width: 502, height: 900 },
};

interface MascotCalloutProps {
  pose: MascotPose;
  title: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

// Dark brand card; the mascot stands on its bottom edge and pops out above it on the start (right, RTL) side
export const MascotCallout: React.FC<MascotCalloutProps> = ({ pose, title, text, children, className = '' }) => (
  <div className={`pt-16 sm:pt-24 ${className}`}>
    <div className="relative rounded-2xl bg-gradient-to-l from-[#0C1730] via-[#112242] to-[#0A1326] border border-slate-800 shadow-md text-right">
      {/* Radial golden glow behind the mascot, clipped to the card */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_75%_70%,_rgba(242,177,52,0.25)_0%,_transparent_70%)]" />
      </div>

      <div className="relative flex items-end gap-4 sm:gap-8 pr-3 sm:pr-6 pl-5 sm:pl-8">
        <img
          src={`/mascot/${pose}.webp`}
          alt={MASCOT_ALT[pose]}
          width={MASCOT_SIZE[pose].width}
          height={MASCOT_SIZE[pose].height}
          loading="lazy"
          decoding="async"
          className={`${MASCOT_SIZE[pose].className} shrink-0 -mt-16 sm:-mt-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}
        />
        <div className="flex-1 self-center py-5 sm:py-7 space-y-3">
          <h3 className="text-sm sm:text-lg font-bold text-white">{title}</h3>
          {text && <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">{text}</p>}
          {children && <div className="flex flex-wrap items-center gap-3 pt-1">{children}</div>}
        </div>
      </div>
    </div>
  </div>
);
