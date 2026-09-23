import React from 'react';
import { X, MapPin, Zap, Calendar, ShieldCheck, Check, MessageCircle, Phone } from 'lucide-react';
import { Project } from '../types';
import { COMPANY_INFO } from '../data/solarData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl text-slate-900 text-right max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              {project.categoryLabel}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 truncate max-w-xs sm:max-w-md">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-800 border border-slate-200 flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>ظرفیت: {project.capacity}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-slate-500 text-[11px] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                موقعیت:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{project.location}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-slate-500 text-[11px] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                تولید سالانه:
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-700 mt-1">{project.annualGeneration}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
              <div className="text-slate-500 text-[11px] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                سال اجرا:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">سال {project.specs.completionYear}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase">شرح پروژه و هدف کارفرما:</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {project.description}
            </p>
          </div>

          {/* Technical Specs List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase">مشخصات فنی و تجهیزات به‌کار رفته:</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-500">ماژول پنل:</span>
                <span className="text-slate-900 font-medium">{project.specs.panelType}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-500">اینورتر و شارژر:</span>
                <span className="text-slate-900 font-medium">{project.specs.inverterType}</span>
              </div>
              {project.specs.batteryCapacity && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-slate-500">بانک ذخیره‌سازی:</span>
                  <span className="text-slate-900 font-medium">{project.specs.batteryCapacity}</span>
                </div>
              )}
            </div>
          </div>

          {/* Highlight Badge */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span><strong>دستاورد پروژه:</strong> {project.highlight}</span>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            برای اجرای پروژه مشابه با ما در ارتباط باشید.
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`سلام، در مورد پروژه "${project.title}" سوال داشتم و می‌خواستم سیستمی مشابه برای ملکم طراحی کنید.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استعلام پروژه مشابه</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>تماس</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
