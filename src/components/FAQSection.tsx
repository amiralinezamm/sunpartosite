import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone, AlertCircle } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/solarData';
import siteContent from '../../content/site';

export const FAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-heading"
      className="py-20 bg-white text-slate-900 border-b border-slate-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            پرسش‌های متداول درباره سیستم‌های خورشیدی {siteContent.company.nameFa}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            پاسخ‌های شفاف و مهندسی به پرتکرارترین سوالات کارفرمایان گرامی:
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 text-right">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            const isPlaceholder = faq.question.includes('PLACEHOLDER');

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden shadow-xs ${
                  isOpen 
                    ? 'bg-white border-amber-300 shadow-sm' 
                    : isPlaceholder 
                      ? 'bg-amber-50/20 border-dashed border-amber-200 opacity-75' 
                      : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <div className="flex items-center gap-2">
                    {isPlaceholder && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
                    <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-amber-800' : 'text-slate-950'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-amber-500 text-slate-950 rotate-180' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-ans-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-5 pb-6 pt-1 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200"
                  >
                    <p className="font-normal">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered Questions CTA Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-4 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-slate-950">
            سوال دیگری دارید که در لیست بالا نبود؟
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto font-normal">
            {siteContent.about.ceoName} و کارشناسان فنی {siteContent.company.nameFa} آماده پاسخگویی و ارائه مشاوره اختصاصی به شما هستند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs transition-all"
              title="ارسال سوال در واتساپ"
            >
              <MessageCircle className="w-4 h-4" />
              <span>پرسش مستقیم در واتساپ</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm border border-slate-200 font-semibold"
              title={`تماس با شرکت ${siteContent.company.nameFa}`}
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>تماس تلفنی: {COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
