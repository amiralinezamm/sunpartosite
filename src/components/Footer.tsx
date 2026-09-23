import React from 'react';
import { Phone, MapPin, MessageCircle, ShieldCheck, ArrowUp, Globe } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';
import { BrandLogo } from './BrandLogo';
import siteContent from '../../content/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'درباره ما', href: '#about' },
    { label: 'کاربردها', href: '#applications' },
    { label: 'خدمات مهندسی', href: '#services' },
    { label: 'نمونه‌کارها', href: '#portfolio' },
    { label: 'محاسبه‌گر خورشیدی', href: '#calculator' },
    { label: 'مزایای برق خورشیدی', href: '#benefits' },
    { label: 'سوالات متداول', href: '#faq' },
    { label: 'تماس با ما', href: '#contact' },
  ];

  return (
    <footer className="bg-[#F5F6F8] text-slate-700 text-right border-t border-slate-200/80 relative" role="contentinfo">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & About (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              {/* Footer usage: Logotype_Regular.svg (Color text-ink since background is light) */}
              <BrandLogo 
                variant="horizontal" 
                weight="regular"
                markClassName="w-10 h-10 text-[#F2B134]"
                textClassName="text-[#0C1730]"
              />
              <p className="text-xs text-amber-700 font-medium mt-2">
                {siteContent.company.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              شرکت {siteContent.company.nameFa} با مدیریت <strong>{siteContent.about.ceoName}</strong>، مجری تخصصی سیستم‌های برق خورشیدی متصل و منفصل از شبکه در مناطق {siteContent.serviceAreas.join('، ')} و سراسر کشور. تعهد ما مهندسی اصولی، تجهیزات استاندارد و آرامش خاطر همیشگی شماست.
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{siteContent.warranty.afterSalesService} و پشتیبانی مستقیم مهندسی.</span>
            </div>
          </div>

          {/* Fast Navigation Links (3 cols) */}
          <nav className="lg:col-span-3 space-y-4" aria-label="لینک‌های دسترسی سریع فوتر">
            <h4 className="text-sm font-bold text-[#0C1730] uppercase tracking-wider border-r-2 border-[#F2B134] pr-2.5">
              دسترسی سریع
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-amber-700 transition-colors block py-1 font-medium"
                    title={link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details & Direct Call (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-[#0C1730] uppercase tracking-wider border-r-2 border-[#F2B134] pr-2.5">
              ارتباط با دفتر مرکزی
            </h4>

            <address className="not-italic space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{siteContent.company.address}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>تلفن تماس: </span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="font-mono text-sm text-amber-700 hover:text-amber-800 font-bold"
                  title={`تماس مستقیم با شرکت ${siteContent.company.nameFa}`}
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Globe className="w-4 h-4 text-amber-600 shrink-0" />
                <span>وب‌سایت رسمی: </span>
                <a
                  href={`https://${siteContent.company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-slate-700 hover:text-amber-700 font-semibold"
                >
                  {siteContent.company.website}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <MessageCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>واتساپ پشتیبانی: </span>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline font-bold"
                  title={`ارسال پیام به واتساپ ${siteContent.company.nameFa}`}
                >
                  شروع گفتگو در واتساپ
                </a>
              </div>
            </address>

            <div className="pt-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F2B134] hover:bg-[#FFD166] text-[#0C1730] font-bold text-xs shadow-xs transition-colors"
                title="درخواست مشاوره فوری در واتساپ"
              >
                <MessageCircle className="w-4 h-4" />
                <span>درخواست مشاوره فوری در واتساپ</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteContent.company.nameFa} ({siteContent.company.nameEn}). تمامی حقوق برای {siteContent.about.ceoName} محفوظ است.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px]">{siteContent.company.tagline}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-amber-700 border border-slate-200 transition-colors shadow-xs cursor-pointer"
              aria-label="بازگشت به بالای صفحه"
              title="بازگشت به بالای صفحه"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
