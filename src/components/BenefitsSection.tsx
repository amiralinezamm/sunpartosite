import React from 'react';
import { ZapOff, PiggyBank, Shield, TrendingUp, Leaf, Coins, Sparkles } from 'lucide-react';
import { BENEFITS } from '../data/solarData';

export const BenefitsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ZapOff':
        return <ZapOff className="w-5 h-5" />;
      case 'PiggyBank':
        return <PiggyBank className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5" />;
      case 'Coins':
        return <Coins className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="benefits" 
      aria-labelledby="benefits-heading"
      className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>مزایای قطعی و پایدار</span>
          </div>
          <h2 id="benefits-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            چرا استفاده از انرژی خورشیدی بهترین تصمیم امروز شماست؟
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            با توجه به شرایط جوی پرتابش کشور و قطعی‌های مکرر برق در فصول مختلف سال، سیستم‌های خورشیدی بالاترین آسایش و بیشترین بازده اقتصادی را به همراه دارند:
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-sm transition-all text-right space-y-3 group shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                {getIcon(benefit.iconName)}
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Eco Metric Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-emerald-50/60 text-slate-900 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-right shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">کاهش بیش از ۵۰ تن گاز دی‌اکسید کربن در سال با هر نیروگاه خورشیدی</h4>
              <p className="text-xs text-slate-600">کمک به حفظ باغات، هوای پاک و محیط زیست کم‌نظیر دماوند و فیروزکوه</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
            ۱۰۰٪ انرژی پاک و تجدیدپذیر
          </span>
        </div>

      </div>
    </section>
  );
};
