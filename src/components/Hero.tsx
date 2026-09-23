import React from 'react';
import { MessageCircle, ArrowDown, ShieldCheck, Sun, CheckCircle2, Award, Zap, Sparkles, Check } from 'lucide-react';
import { COMPANY_INFO, TRUST_METRICS } from '../data/solarData';
import siteContent from '../../content/site';

export const Hero: React.FC = () => {
  const scrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#portfolio');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCalculator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#calculator');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      aria-label={`بخش معرفی شرکت ${siteContent.company.nameFa} و خدمات برق خورشیدی`}
      className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80"
    >
      {/* Editorial Ambient Solar Glow Effect */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[450px] bg-gradient-to-b from-amber-500/10 via-amber-200/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-slate-100/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-700 mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
          <span className="font-semibold text-slate-900">شرکت مهندسی {siteContent.company.nameFa}</span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Content (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* The ONLY <h1> on the whole page for SEO hierarchy */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-black text-slate-950 leading-[1.25] md:leading-[1.18] tracking-tight">
              {siteContent.company.tagline}
              <br />
              <span className="text-amber-600 relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[2.7rem] font-extrabold mt-1">
                طراحی و اجرای تخصصی سیستم‌های برق خورشیدی
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              طراحی مهندسی، تامین مستقیم تجهیزات استاندارد تراز اول جهان و احداث نیروگاه‌های خورشیدی 
              <strong className="text-slate-900 font-semibold"> مستقل از شبکه (Off-Grid) و متصل به شبکه (On-Grid) </strong> 
              برای ویلاها، مجتمع‌های مسکونی، باغات، دفاتر اداری و واحدهای صنعتی با نظارت {siteContent.about.ceoName}.
            </p>

            {/* Clean Feature Highlights with Rich Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>برق ۲۴ ساعته پایدار بدون صدا و سوخت ژنراتور</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>پنل‌های معتبر بین‌المللی JA Solar، Jinko و Trina</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>پوشش کامل مناطق {siteContent.serviceAreas.join('، ')}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{siteContent.warranty.afterSalesService} و پشتیبانی مداوم</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={scrollToCalculator}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-md hover:shadow-lg shadow-amber-500/30 hover:scale-103 active:scale-100 transition-all cursor-pointer ring-2 ring-amber-300/70"
                id="hero-calculator-shortcut"
                title="ابزار هوشمند محاسبه‌گر تعداد پنل خورشیدی و استعلام آنلاین"
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>محاسبه‌گر آنلاین ظرفیت و استعلام</span>
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-xs hover:shadow transition-all"
                id="hero-whatsapp-btn"
                title="درخواست مشاوره در واتساپ"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2] text-amber-400" />
                <span>مشاوره در واتساپ</span>
              </a>

              <a
                href="#portfolio"
                onClick={scrollToPortfolio}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 transition-all shadow-xs"
                id="hero-portfolio-btn"
                title="مشاهده نمونه‌کارها"
              >
                <span>نمونه‌کارها</span>
                <ArrowDown className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Direct Phone & Trust Note */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
              <span>پاسخگویی مستقیم {siteContent.about.ceoName}:</span>
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="text-amber-700 hover:text-amber-800 font-bold font-mono text-sm tracking-wider"
                title={`تماس تلفنی با ${siteContent.company.nameFa}`}
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <span className="text-slate-500">{siteContent.company.address}</span>
            </div>

          </div>

          {/* Hero Visual Showcase Card (5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-gradient-to-b from-[#0C1730] via-[#112242] to-[#0A1326] shadow-xl group">
              
              {/* Mascot Solar Showcase */}
              <div className="aspect-[4/3] sm:aspect-[16/12] relative flex items-center justify-center overflow-hidden">
                {/* Radial golden glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(242,177,52,0.18)_0%,_transparent_70%)] pointer-events-none" />
                
                {/* Official Mascot Astronaut holding Solar Panel */}
                <img
                  src="/mascot.png"
                  alt="تکنسین متخصص و مسکات رسمی شرکت سان پرتو انرژی"
                  width="720"
                  height="720"
                  loading="eager"
                  className="w-full h-full object-contain p-4 sm:p-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:scale-104 transition-transform duration-500 relative z-10"
                />
                
                {/* Floating Top Tag */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm z-20">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>تولید برق پاک فتوولتائیک</span>
                </div>

                {/* Floating System Status Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium flex items-center gap-1.5 shadow-sm z-20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>بازدید و مشاوره در محل</span>
                </div>
              </div>

            </div>

            {/* Decorative Floating Trust Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white border border-slate-200/90 p-3 rounded-xl shadow-md items-center gap-3 max-w-xs z-20">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">تضمین اصالت تجهیزات</div>
                <div className="text-[11px] text-slate-500">نظارت {siteContent.about.ceoName}</div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Trust Metric Counter Cards (Render gold checkmark if icon === 'check') */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {TRUST_METRICS.map((metric, index) => {
              const isGoldCheck = metric.icon === 'check' || metric.value === null;

              return (
                <div 
                  key={index}
                  className="bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-amber-300 p-5 rounded-2xl transition-all group text-right shadow-xs hover:shadow-sm flex flex-col justify-between"
                >
                  <div className="mb-2">
                    {isGoldCheck ? (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                          <Check className="w-6 h-6 stroke-[3]" />
                        </div>
                        <span className="text-xs font-bold text-amber-700">تضمین کتبی</span>
                      </div>
                    ) : metric.display ? (
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight font-sans">
                          {metric.display}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-600 tracking-tight font-sans">
                          {metric.value}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-700">
                          {metric.suffix}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {metric.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                      {metric.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
