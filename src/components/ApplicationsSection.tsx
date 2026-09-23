import React, { useState } from 'react';
import { Home, Trees, Building2, Factory, CheckCircle2, ArrowLeft, Sun, Zap, Info } from 'lucide-react';
import { APPLICATION_CATEGORIES, COMPANY_INFO } from '../data/solarData';

export const ApplicationsSection: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string>('villa');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Trees':
        return <Trees className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Factory':
        return <Factory className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const activeCategory = APPLICATION_CATEGORIES.find(c => c.id === selectedApp) || APPLICATION_CATEGORIES[0];

  return (
    <section 
      id="applications" 
      aria-labelledby="applications-heading"
      className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Educational Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>راهنمای کاربردی و جامع انرژی خورشیدی</span>
          </div>
          <h2 id="applications-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            کاربردهای برق خورشیدی برای انواع املاک و کاربری‌ها
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            سیستم فتوولتائیک نور خورشید را بدون هیچ صدا، دود و آلودگی به برق ۲۲۰ ولت استاندارد تبدیل می‌کند. 
            نوع ملک خود را انتخاب کنید تا مشخصات فنی و بازگشت سرمایه آن را بررسی کنید:
          </p>
        </div>

        {/* 4 Application Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" role="tablist" aria-label="دسته‌بندی کاربری‌های سیستم‌های خورشیدی">
          {APPLICATION_CATEGORIES.map((cat) => {
            const isSelected = selectedApp === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tabpanel-${cat.id}`}
                id={`tab-${cat.id}`}
                onClick={() => setSelectedApp(cat.id)}
                className={`p-4 rounded-2xl text-right transition-all flex flex-col items-start gap-2.5 border cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs scale-[1.01]' 
                    : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200/80'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  isSelected ? 'bg-slate-950 text-amber-400' : 'bg-white text-amber-600 shadow-xs border border-slate-200/60'
                }`}>
                  {getIcon(cat.icon)}
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isSelected ? 'text-slate-950' : 'text-slate-900'}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Application Detailed Showcase Card */}
        <article 
          id={`tabpanel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          className="bg-slate-50/70 border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Details Side (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>ظرفیت پیشنهادی استاندارد: {activeCategory.suitableCapacity}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  برق خورشیدی ویژه {activeCategory.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {activeCategory.description}
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  مزایای کلیدی این سیستم:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCategory.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Economic Insight Box */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-700 space-y-1 shadow-xs">
                <div className="text-slate-900 font-bold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>تحلیل اقتصادی و بازگشت سرمایه:</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {activeCategory.savingsInsight}
                </p>
              </div>

              {/* CTA Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`سلام مهندس نظام الشعرایی، در مورد سیستم برق خورشیدی برای ${activeCategory.title} مشاوره و استعلام قیمت می‌خواستم.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all"
                  title={`استعلام هزینه سیستم خورشیدی برای ${activeCategory.title}`}
                >
                  <span>استعلام هزینه سیستم {activeCategory.title}</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm border border-slate-200 font-medium transition-colors"
                  title={`تماس با شرکت ${COMPANY_INFO.name}`}
                >
                  <span>تماس با {COMPANY_INFO.manager}</span>
                </a>
              </div>

            </div>

            {/* Visual Side (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs group aspect-[4/3] sm:aspect-[16/10] lg:aspect-square bg-slate-100">
                <img
                  src={activeCategory.image}
                  alt={`سیستم برق خورشیدی ${activeCategory.title} اجرا شده توسط شرکت ${COMPANY_INFO.name}`}
                  width="800"
                  height="600"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 left-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-right shadow-xs">
                  <div className="text-[11px] text-amber-700 font-semibold">کاربری ایده‌آل:</div>
                  <div className="text-xs text-slate-900 font-bold">{activeCategory.idealFor}</div>
                </div>
              </div>
            </div>

          </div>
        </article>

      </div>
    </section>
  );
};
