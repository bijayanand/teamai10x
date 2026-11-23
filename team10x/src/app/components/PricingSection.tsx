import React from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  'Professional Design',
  'Fully Responsive Website',
  'Home Page',
  'About Us Page',
  'Services Page',
  'Gallery',
  'Contact Page',
  'Enquiry Form',
  'Social Media Integration',
  'Basic SEO Setup',
  'WhatsApp Integration',
  'Google Maps Integration',
  'Secure Hosting Configuration',
  'AI-Powered Features',
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-600 text-primary">Pricing</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-primary mb-4">
            Transparent, Affordable Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional quality at prices designed for Indian institutions, businesses, and organizations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl border-2 border-accent shadow-2xl overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-accent text-primary font-700 text-xs px-6 py-2 rounded-bl-2xl">
              MOST POPULAR
            </div>

            <div className="p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-800 text-primary">Professional Website</h3>
                  <p className="text-muted-foreground mt-1">Complete digital presence for your organization</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-800 text-primary tabular">₹6,999</div>
                  <div className="text-sm text-muted-foreground">onwards*</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {features?.map((f) => (
                  <div key={`pricing-feature-${f}`} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-primary font-700 text-base rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
                >
                  Get Started Today
                  <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/919204245001?text=Hi Team10x, I want to get a Professional Website"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-700 text-base rounded-xl hover:bg-primary/90 transition-all duration-150 active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L.057 23.882a.5.5 0 00.606.63l6.155-1.612A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.651-.502-5.178-1.379l-.37-.217-3.84 1.006 1.024-3.737-.239-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                *Package price may vary according to features and requirements. Contact us for a custom quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}