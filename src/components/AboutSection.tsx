import React from 'react';
import { ShieldCheck, Award, CheckCircle, PhoneCall, Sparkles, MapPin, CheckCircle2, Briefcase } from 'lucide-react';
import { COMPANY_INFO, CERTIFICATIONS } from '../data/solarData';
import siteContent from '../../content/site';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>شناخت و فلسفه مهندسی {siteContent.company.nameFa}</span>
          </div>
          <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            تعهد به مهندسی اصولی و پایداری در تأمین انرژی خورشیدی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {siteContent.about.companyDescription}
          </p>
        </div>

        {/* 2-Column Layout: Left (CEO Profile & Experience), Right (Core Pillars & Certifications) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Engineering Leadership Card (5 cols) - Note: showTeamPhoto is false, NO photo or silhouette rendered */}
          <article className="lg:col-span-5 flex flex-col">
            <div className="bg-white text-slate-900 rounded-2xl p-7 md:p-8 flex-1 flex flex-col justify-between border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden">
              
              <div className="space-y-6 relative z-10">
                
                {/* Text & Icon badge instead of any photo/silhouette */}
                <div className="border-b border-slate-100 pb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    <span>مدیریت ارشد</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{siteContent.about.ceoName}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {siteContent.about.ceoBio}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed text-right">
                  <p className="font-semibold text-slate-900">
                    «{siteContent.company.tagline}»
                  </p>
                  <p className="text-xs text-slate-600">
                    تعهد ما ارائه‌ی راهکارهای مهندسی دقیق با تجهیزات اورجینال و خدمات پشتیبانی مستمر جهت تضمین آرامش خاطر و استقلال کامل انرژی شماست.
                  </p>
                </div>

                {/* Certifications Badges */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-bold text-slate-900">گواهینامه‌ها و صلاحیت‌های فنی:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CERTIFICATIONS.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{siteContent.company.city}، سه‌راه گیلاوند</span>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                  title={`تماس با ${siteContent.about.ceoName}`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>ارتباط مستقیم با مدیریت</span>
                </a>
              </div>

            </div>
          </article>

          {/* 4 Trust Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pillar 1 */}
            <article className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all text-right group">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                تجهیزات معتبر بین‌المللی
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                تامین مستقیم پنل‌های رده‌اول جهانی JA Solar، Jinko Solar، Trina، AE Solar و اینورترهای Growatt و Marsriva با تضمین کامل اصالت.
              </p>
            </article>

            {/* Pillar 2 */}
            <article className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all text-right group">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                گارانتی و خدمات پشتیبانی
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {siteContent.warranty.installationWarranty ? `گارانتی نصب ${siteContent.warranty.installationWarranty} و ` : ''}
                {siteContent.warranty.afterSalesService} به همراه پایش عملکرد و پشتیبانی فنی مداوم.
              </p>
            </article>

            {/* Pillar 3 */}
            <article className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all text-right group">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                پوشش سراسری مناطق هدف
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                ارائه خدمات بازدید، طراحی و نصب مهندسی در مناطق اصلی شامل {siteContent.serviceAreas.join('، ')}.
              </p>
            </article>

            {/* Pillar 4 */}
            <article className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all text-right group">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                مشاوره و ارزیابی فنی رایگان
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                برآورد اولیه نیاز برقی و امکان‌سنجی تخصصی از ملک شما بدون دریافت هزینه، همراه با ارائه پیش‌فاکتور شفاف و شبیه‌سازی مالی.
              </p>
            </article>

          </div>

        </div>

      </div>
    </section>
  );
};
