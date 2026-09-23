import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'صفحه اصلی', href: '#hero' },
    { label: 'درباره ما', href: '#about' },
    { label: 'کاربردها', href: '#applications' },
    { label: 'خدمات', href: '#services' },
    { label: 'نمونه‌کارها', href: '#portfolio' },
    { label: 'محاسبه‌گر', href: '#calculator' },
    { label: 'مزایا', href: '#benefits' },
    { label: 'سوالات متداول', href: '#faq' },
    { label: 'تماس با ما', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar (Translucent Glassy #0C1730/70) */}
      <div className="bg-[#0C1730]/70 backdrop-blur-md text-slate-300 text-xs border-b border-white/10 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#F2B134]" />
              <span>{COMPANY_INFO.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPANY_INFO.workingHours}</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#F2B134]" />
              مدیریت: <strong className="text-white font-bold">{COMPANY_INFO.manager}</strong>
            </span>
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="text-slate-200 hover:text-[#F2B134] font-semibold transition-colors flex items-center gap-1.5 dir-ltr font-mono"
              id="top-bar-phone"
            >
              <Phone className="w-3.5 h-3.5 text-[#F2B134]" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar (Dark Brand Ink with Translucent Blur) */}
      <nav 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0C1730]/90 backdrop-blur-md py-3 shadow-md border-b border-white/10' 
            : 'bg-[#0C1730]/80 backdrop-blur-md py-3.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo & Brand (Logo.svg + Logotype_light.svg side by side in text-white) */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group text-right"
            id="brand-logo"
            aria-label={`${COMPANY_INFO.name} - بازگشت به صفحه نخست`}
          >
            <BrandLogo 
              variant="horizontal" 
              weight="light" 
              markClassName="w-8 h-8 sm:w-9 sm:h-9 text-[#F2B134] group-hover:scale-105 transition-transform"
              textClassName="text-white"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs xl:text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-200 hover:text-white transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2B134] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2B134] hover:bg-[#FFD166] text-[#0C1730] text-xs md:text-sm font-bold shadow-xs hover:shadow-sm transition-all active:scale-98"
              id="header-whatsapp-cta"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.2]" />
              <span>مشاوره واتساپ</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-lg bg-white/10 text-[#F2B134] hover:bg-white/20"
              aria-label="تماس تلفنی"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 focus:outline-none"
              aria-label="منو"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0C1730] border-t border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
              <span>مدیریت: <strong className="text-white">{COMPANY_INFO.manager}</strong></span>
              <span className="font-mono text-slate-300">{COMPANY_INFO.phoneDisplay}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F2B134] text-[#0C1730] font-bold text-xs shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>گفتگو و استعلام قیمت در واتساپ</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/15"
              >
                <Phone className="w-4 h-4 text-[#F2B134]" />
                <span>تماس مستقیم: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
