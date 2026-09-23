import React from 'react';
import { Wrench, Layers, Activity, Check, ArrowLeft, Shield, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/solarData';
import siteContent from '../../content/site';

export const ServicesSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="services" 
      aria-labelledby="services-heading"
      className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>خدمات جامع مهندسی {siteContent.company.nameFa}</span>
          </div>
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            از مشاوره و تامین تجهیزات تا نصب و پشتیبانی نیروگاه خورشیدی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            کلیه خدمات خورشیدی با نظارت مستقیم {siteContent.about.ceoName} و منطبق با آخرین استانداردهای فنی و توانیر در مناطق {siteContent.serviceAreas.join('، ')} ارائه می‌شود.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SERVICES.map((service, index) => {
            // Service 1 (off-grid) flagship tags
            const tags = index === 0 
              ? ["ویلا", "منزل مسکونی", "دفتر اداری", "واحد صنعتی"]
              : service.equipmentList;

            return (
              <article
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between text-right group relative overflow-hidden"
              >
                <div className="space-y-5">
                  
                  {/* Header with Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal">
                      {service.shortDesc}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                    {service.fullDesc}
                  </p>

                  {/* Features Checklist */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 block">شامل موارد اجرایی:</span>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  {tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 text-[10px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`سلام جناب ${siteContent.about.ceoName}، در مورد ${service.title} مشاوره و استعلام قیمت می‌خواستم.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-amber-500 text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-bold border border-slate-200 hover:border-amber-400 transition-all shadow-xs"
                    title={`درخواست مشاوره برای ${service.title}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>استعلام قیمت و مشاوره</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>

              </article>
            );
          })}
        </div>

        {/* Equipment Brands & Quality Assurance Banner */}
        <aside aria-label="فروش مستقیم تجهیزات خورشیدی" className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-right">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                تجهیزات استاندارد برندهای معتبر بین‌المللی
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
                تامین مستقیم برترین تجهیزات فتوولتائیک با اصالت تضمین‌شده، مناسب شرایط اقلیمی دماوند، تهران و مناطق ییلاقی.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2"
                title="تماس با واحد فروش تجهیزات خورشیدی"
              >
                <span>تماس با واحد فروش تجهیزات</span>
              </a>
            </div>
          </div>

          {/* Verified Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                پنل‌های خورشیدی:
              </div>
              <div className="text-slate-600 font-mono text-[11px]">
                {siteContent.brands.panels.join(' • ')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                اینورترها (تکنسین مورد تأیید Growatt):
              </div>
              <div className="text-slate-600 font-mono text-[11px]">
                {siteContent.brands.inverters.join(' • ')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                بانک باتری ذخیره‌ساز:
              </div>
              <div className="text-slate-600 font-mono text-[11px]">
                {siteContent.brands.batteries.join(' • ')}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </section>
  );
};
