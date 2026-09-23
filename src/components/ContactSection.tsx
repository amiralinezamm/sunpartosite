import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, UserCheck, CheckCircle2, Navigation } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';
import siteContent from '../../content/site';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    propertyType: 'ویلا',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Generate WhatsApp text & open WhatsApp
    const message = `سلام جناب ${siteContent.about.ceoName} گرامی،
درخواست مشاوره / بازدید رایگان برای سیستم برق خورشیدی ثبت کردم:
👤 نام: ${formData.name}
📞 شماره تماس: ${formData.phone}
📍 موقعیت ملک: ${formData.location || 'ذکر نشده'}
🏠 نوع ملک: ${formData.propertyType}
📝 توضیحات / تجهیزات مورد نظر: ${formData.message || 'نیاز به مشاوره کامل و بازدید'}`;

    const url = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="py-20 bg-slate-50/50 text-slate-900 relative border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>پاسخگویی سریع و حرفه‌ای</span>
          </div>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            تماس با شرکت {siteContent.company.nameFa} و دریافت مشاوره تخصصی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            برای برآورد رایگان سیستم، دریافت پیش‌فاکتور، خرید تجهیزات خورشیدی و هماهنگی بازدید در مناطق {siteContent.serviceAreas.join('، ')} با ما در ارتباط باشید:
          </p>
        </div>

        {/* 2-Column Grid: Contact Info (5 cols) & Consultation Form + Map (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-right">
            
            {/* Leadership & Direct Phone Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
              
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
                  <UserCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] text-amber-700 font-semibold block">مدیریت {siteContent.company.nameFa}</span>
                  <h3 className="text-lg font-black text-slate-950">{siteContent.about.ceoName}</h3>
                  <span className="text-xs text-slate-500">{siteContent.about.ceoBio}</span>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs text-slate-500 block">شماره تماس مستقیم و پشتیبانی:</span>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-xl sm:text-2xl font-black text-amber-700 font-mono tracking-wider hover:text-amber-800 transition-colors"
                    id="contact-section-phone"
                    title={`تماس با شرکت ${siteContent.company.nameFa}`}
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="p-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-xs"
                    aria-label={`تماس تلفنی با ${siteContent.about.ceoName}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Big WhatsApp Button */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all active:scale-98"
                id="contact-big-whatsapp-btn"
                title="گفتگو در واتساپ"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2]" />
                <span>گفتگو مستقیم در واتساپ با {siteContent.about.ceoName}</span>
              </a>

              {/* Office Address & Working Hours (NAP for Local SEO) */}
              <address className="not-italic space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">آدرس دفتر مرکزی:</span>
                    <span className="text-slate-600">{siteContent.company.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">ساعات کاری و پاسخگویی:</span>
                    <span className="text-slate-600">{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </address>

            </div>

            {/* Quick Guarantees Pill Box */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 text-xs text-slate-700 shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>پاسخگویی سریع در واتساپ و تماس تلفنی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>پوشش مناطق {siteContent.serviceAreas.join('، ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{siteContent.warranty.afterSalesService} و پیش‌فاکتور رسمی</span>
              </div>
            </div>

          </div>

          {/* Form & Map Location (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Consultation Request Form */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-600" />
                  فرم آنلاین درخواست بازدید و استعلام قیمت
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  اطلاعات خود را وارد کنید تا مستقیماً به پیام‌رسان واتساپ هدایت شده و پیش‌فاکتور اولیه برای شما صادر شود.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-slate-950">درخواست شما با موفقیت به واتساپ ارسال شد!</div>
                  <p className="text-emerald-800">{siteContent.about.ceoName} در اسرع وقت پاسخگوی شما خواهند بود.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="فرم استعلام قیمت و مشاوره">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs text-slate-700 font-medium block">
                        نام و نام خانوادگی <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="مثال: علی رضایی"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs text-slate-700 font-medium block">
                        شماره تماس همراه <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="0912..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-location" className="text-xs text-slate-700 font-medium block">
                        موقعیت مکانی ملک (شهر / منطقه)
                      </label>
                      <input
                        id="contact-location"
                        type="text"
                        placeholder="مثال: دماوند، گیلاوند، آبسرد، فیروزکوه، تهران، مازندران..."
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-property-type" className="text-xs text-slate-700 font-medium block">
                        نوع کاربری ملک
                      </label>
                      <select
                        id="contact-property-type"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      >
                        <option value="ویلای بدون برق (Off-Grid)">ویلای بدون برق (Off-Grid)</option>
                        <option value="ویلای با برق شبکه (هیبرید پشتیبان)">ویلای با برق شبکه (هیبرید پشتیبان)</option>
                        <option value="منزل مسکونی و آپارتمان">منزل مسکونی و آپارتمان</option>
                        <option value="دفتر اداری یا واحد تجاری">دفتر اداری یا واحد تجاری</option>
                        <option value="واحد صنعتی و کارخانه">واحد صنعتی و کارخانه</option>
                        <option value="پمپ آب کشاورزی">پمپ آب کشاورزی</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs text-slate-700 font-medium block">
                      توضیحات و وسایل برقی مورد نظر شما:
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="مثال: برای ویلا با ۲ کولر گازی، یخچال و پمپ آب استخر سیستم مستقل از شبکه می‌خواهم..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="contact-form-submit"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ارسال درخواست و اتصال فوری به واتساپ</span>
                  </button>
                </form>
              )}

            </div>

            {/* Map Visual Card for Damavand Office */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-950">موقعیت دفتر مرکزی {siteContent.company.nameFa}</h3>
                </div>
                <span className="text-[11px] text-slate-500">پلاک ۳۳۵، سه‌راه گیلاوند</span>
              </div>

              {/* Styled Map Container */}
              <div className="relative rounded-xl overflow-hidden h-40 bg-slate-50 border border-slate-200 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:14px_14px]"></div>
                
                <div className="relative z-10 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-950">دفتر مهندسی {siteContent.company.nameFa}</div>
                  <div className="text-[11px] text-slate-600">{siteContent.company.address}</div>
                  <a
                    href="https://maps.google.com/?q=Damavand+Gilavand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-slate-800 text-[11px] font-semibold border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
                    title={`مسیریابی دفتر ${siteContent.company.nameFa} در نقشه گوگل`}
                  >
                    <Navigation className="w-3 h-3 text-amber-600" />
                    <span>مسیریابی در نقشه گوگل</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
