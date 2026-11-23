import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import HeroSlider from './components/HeroSlider';
import ServicesSection from './components/ServicesSection';
import WhyTeam10xSection from './components/WhyTeam10xSection';
import PricingSection from './components/PricingSection';
import ClientCategoriesSection from './components/ClientCategoriesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>
        <HeroSlider />
        <ServicesSection />
        <WhyTeam10xSection />
        <PricingSection />
        <ClientCategoriesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}