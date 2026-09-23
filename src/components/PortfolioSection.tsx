import React, { useState } from 'react';
import { MapPin, Zap, Eye, Calendar, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { PROJECTS, COMPANY_INFO } from '../data/solarData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import siteContent from '../../content/site';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'offgrid-villa', label: 'ویلایی مستقل (آفگرید)' },
    { id: 'residential', label: 'مسکونی و اداری' },
    { id: 'industrial', label: 'صنعتی و متصل به شبکه' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      aria-labelledby="portfolio-heading"
      className="py-20 bg-white text-slate-900 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>سوابق اجرایی و پروژه‌های شاخص</span>
          </div>
          <h2 id="portfolio-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            نمونه پروژه‌های اجرا شده نیروگاه و سیستم خورشیدی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            بخشی از ۲۰۰+ پروژه موفق شرکت {siteContent.company.nameFa} در مناطق {siteContent.serviceAreas.join('، ')} و سراسر کشور:
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="group" aria-label="فیلتر دسته‌بندی پروژه‌ها">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between text-right"
            >
              <div>
                {/* Project Image Box with High-Impact ALT Tag for SEO */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={`پروژه نیروگاه و سیستم برق خورشیدی ${project.title} در ${project.location} - شرکت ${siteContent.company.nameFa}`}
                    width="600"
                    height="375"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                    {project.categoryLabel}
                  </div>

                  {/* Capacity Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-slate-700 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>ظرفیت: {project.capacity}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{project.location}</span>
                    <span className="text-slate-300" aria-hidden="true">•</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>سال {project.specs.completionYear}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Technical Specifications: Panels, Inverter, Battery */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">تعداد پنل:</span>
                      <span className="font-semibold text-slate-900">{project.specs.panelType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">ظرفیت اینورتر:</span>
                      <span className="font-semibold text-slate-900">{project.specs.inverterType}</span>
                    </div>
                    {project.specs.batteryCapacity && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">ظرفیت باتری:</span>
                        <span className="font-bold text-amber-700">{project.specs.batteryCapacity}</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Action Button to Open Specs Modal */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-amber-500 text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-bold border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-xs"
                  id={`project-details-btn-${project.id}`}
                  title={`مشاهده مشخصات فنی و جزئیات پروژه ${project.title}`}
                >
                  <Eye className="w-4 h-4" />
                  <span>مشاهده جزئیات و مشخصات فنی</span>
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-right shadow-xs">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-950">
              آیا می‌خواهید برآوردی از هزینه و تجهیزات موردنیاز ملک خود داشته باشید؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              مشاوران فنی ما با بررسی موقعیت جغرافیایی و مصرف برقی شما، دقیق‌ترین طرح فنی را پیشنهاد می‌دهند.
            </p>
          </div>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 transition-all shadow-xs"
            title="درخواست برآورد هزینه در واتساپ"
          >
            درخواست برآورد اختصاصی در واتساپ
          </a>
        </div>

      </div>

      {/* Project Technical Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
