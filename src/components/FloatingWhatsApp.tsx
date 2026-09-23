import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sun } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

export const FloatingWhatsApp: React.FC = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3" dir="ltr">
      
      {/* Interactive Tooltip Card - Left-aligned popup */}
      {isTooltipOpen && (
        <div 
          dir="rtl"
          className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-800 text-right max-w-[240px] animate-in fade-in slide-in-from-bottom-2 duration-300 relative group"
        >
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="absolute top-2.5 left-2.5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            aria-label="بستن پیام"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1.5 pl-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-amber-400">مشاوره آنلاین خورشیدی</span>
          </div>

          <p className="text-[11px] text-slate-300 leading-snug">
            سلام! جهت استعلام قیمت و مشاوره رایگان با <strong>مهندس نظام الشعرایی</strong> در واتساپ پیام دهید.
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Buttons Group - Left Aligned */}
      <div className="flex items-center gap-2.5" dir="ltr">
        
        {/* Floating WhatsApp Button */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/40 transition-all hover:scale-110 active:scale-95 group"
          aria-label="گفتگو در واتساپ"
          title="گفتگو در واتساپ"
          id="floating-whatsapp-btn"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-950 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
          </span>
          <MessageCircle className="w-7 h-7 fill-white/10 stroke-[2.5]" />
        </a>

        {/* Floating Call Button */}
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 text-amber-400 hover:text-white hover:bg-slate-800 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="تماس تلفنی مستقیم"
          title="تماس تلفنی با مهندس نظام الشعرایی"
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5" />
        </a>

      </div>

    </div>
  );
};
