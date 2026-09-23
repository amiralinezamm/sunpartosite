import React from 'react';
import { Star, Quote, CheckCircle2, User, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/solarData';
import siteContent from '../../content/site';

export const TestimonialsSection: React.FC = () => {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section 
      id="testimonials" 
      aria-labelledby="testimonials-heading"
      className="py-20 bg-white text-slate-900 border-b border-slate-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>رضایت کارفرمایان</span>
          </div>
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            تجربه کارفرمایان از اجرای سیستم‌های {siteContent.company.nameFa}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            اعتماد و رضایت شما بزرگ‌ترین سرمایه ما در شرکت {siteContent.company.nameFa} است:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-slate-50/70 border border-slate-200/90 hover:border-amber-300 hover:bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-right space-y-4 relative group shadow-xs transition-all"
            >
              <div className="space-y-4">
                
                {/* Header with Star Rating and Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500" aria-label={`امتیاز ${item.rating} از ۵`}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 group-hover:text-amber-500/60 transition-colors" />
                </div>

                {/* Project Tag */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-amber-800 shadow-xs">
                  {item.projectType}
                </div>

                {/* Comment text */}
                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  «{item.comment}»
                </blockquote>

              </div>

              {/* User Profile */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-950">{item.name}</h4>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
