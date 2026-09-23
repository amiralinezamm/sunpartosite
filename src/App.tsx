import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SolarCalculator } from './components/SolarCalculator';
import { ProcessSection } from './components/ProcessSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-['Vazirmatn',sans-serif]">
      {/* Sticky Header */}
      <Header />

      {/* Main One-Page Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About & Leadership (Eng. Nezam-Al-Shoara) */}
        <AboutSection />

        {/* 3. Solar Applications & Educational Guide (Residential, Villa, Office, Industrial) */}
        <ApplicationsSection />

        {/* 4. Engineering Services & Equipment Sales */}
        <ServicesSection />

        {/* 5. Projects & Case Studies Portfolio */}
        <PortfolioSection />

        {/* 6. Smart Solar Sizing & Savings Calculator */}
        <SolarCalculator />

        {/* 7. 5-Step Engineering Workflow */}
        <ProcessSection />

        {/* 8. Tangible Benefits & ROI */}
        <BenefitsSection />

        {/* 9. Testimonials & Client Trust */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions (FAQ) */}
        <FAQSection />

        {/* 11. Contact, Consultation Request & Damavand Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp and Call CTA */}
      <FloatingWhatsApp />
    </div>
  );
}
