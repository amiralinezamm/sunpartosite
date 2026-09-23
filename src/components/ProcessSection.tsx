import React from 'react';
import { PhoneCall, Compass, FileSpreadsheet, HardHat, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';
import { WORK_STEPS, COMPANY_INFO } from '../data/solarData';

export const ProcessSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5" />;
      case 'CheckCircle':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="process" 
      aria-labelledby="process-heading"
      className="py-20 bg-white text-slate-900 border-b border-slate-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>فرآیند مهندسی و منظم</span>
          </div>
          <h2 id="process-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            ۵ گام ساده تا استقلال و تولید برق پایدار
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            از اولین تماس تا تحویل کامل پروژه در کنار شما هستیم؛ با شفافیت کامل در هزینه‌ها و بالاترین دقت مهندسی:
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {WORK_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200/80 hover:border-amber-300 hover:bg-white rounded-2xl p-5 text-right flex flex-col justify-between transition-all group relative shadow-xs"
            >
              {/* Step number on top */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-amber-600 font-mono">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-xs">
                  {getIcon(step.iconName)}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>مرحله {idx + 1} از ۵</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xs hover:shadow transition-all"
          >
            <span>شروع گام اول: درخواست مشاوره و امکان‌سنجی رایگان</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
