import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Sparkles, Globe, Zap } from 'lucide-react';
import PageViewCounter from './PageViewCounter';

const highlights = [
  'AI-Powered Technology',
  'Mobile Responsive',
  'Secure & Reliable',
  '24/7 Support',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center">
      {/* Background elements */}
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 lg:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles size={14} className="text-accent" />
              <span className="text-sm font-600 text-accent">AI-Powered Digital Solutions</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-800 text-white leading-tight mb-6 text-balance">
              Build Your{' '}
              <span className="text-accent">Digital Future</span>{' '}
              with Team10x.in
            </h1>

            <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-6 text-balance">
              AI-Powered Digital Solutions for Schools, Colleges, Institutions, Businesses & Organizations. Transform your digital presence today.
            </p>

            {/* Price highlight */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-accent/15 border border-accent/30 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-white font-600">
                Professional Website Starting at{' '}
                <span className="text-accent text-xl font-800">₹6,999/-</span>
                <span className="text-white/50 text-sm">*</span>
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 mb-10">
              {highlights?.map((h) => (
                <div key={`hero-hl-${h}`} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent flex-shrink-0" />
                  <span className="text-sm text-white/70">{h}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-700 text-base rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95 shadow-glow-gold"
              >
                Get Your Website
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/919204245001?text=Hi Team10x, I want to discuss my website requirements"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-600 text-base rounded-xl hover:bg-white/20 border border-white/20 transition-all duration-150 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L.057 23.882a.5.5 0 00.606.63l6.155-1.612A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.651-.502-5.178-1.379l-.37-.217-3.84 1.006 1.024-3.737-.239-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Talk to Team10x
              </a>
            </div>

            <p className="text-xs text-white/40 mt-4">*Package price may vary according to features and requirements.</p>
          </div>

          {/* Right: Device mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Laptop frame */}
              <div className="relative bg-admin-surface rounded-2xl p-3 border border-white/10 shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2 bg-admin-bg rounded-t-xl border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3 px-3 py-1 bg-white/5 rounded-md text-xs text-white/40 text-center">
                    www.greenvalleyschool.edu.in
                  </div>
                </div>

                {/* Mock website content */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-b-xl overflow-hidden aspect-video flex flex-col">
                  {/* Mock nav */}
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-accent/80" />
                      <div className="w-20 h-2 rounded bg-white/30" />
                    </div>
                    <div className="flex gap-3">
                      {[1,2,3,4]?.map((i) => (
                        <div key={`mock-nav-${i}`} className="w-10 h-1.5 rounded bg-white/20" />
                      ))}
                    </div>
                  </div>

                  {/* Mock hero */}
                  <div className="flex-1 flex flex-col items-start justify-center px-6 py-4">
                    <div className="w-16 h-1.5 rounded bg-accent mb-2" />
                    <div className="w-48 h-3 rounded bg-white/80 mb-1.5" />
                    <div className="w-36 h-3 rounded bg-white/60 mb-4" />
                    <div className="w-24 h-6 rounded-lg bg-accent" />
                  </div>

                  {/* Mock cards row */}
                  <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                    {[1,2,3]?.map((i) => (
                      <div key={`mock-card-${i}`} className="bg-white/10 rounded-lg p-2">
                        <div className="w-full h-8 rounded bg-white/10 mb-1.5" />
                        <div className="w-full h-1.5 rounded bg-white/20 mb-1" />
                        <div className="w-3/4 h-1.5 rounded bg-white/15" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-2 bg-admin-surface border border-accent/30 rounded-xl shadow-card-admin">
                <Zap size={14} className="text-accent" />
                <span className="text-xs font-600 text-accent">AI-Powered</span>
              </div>
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-2 bg-admin-surface border border-green-500/30 rounded-xl shadow-card-admin">
                <Globe size={14} className="text-success" />
                <span className="text-xs font-600 text-success">Live in 7 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '150+', label: 'Websites Delivered' },
            { value: '50+', label: 'Institutions Served' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '7 Days', label: 'Average Delivery' },
          ]?.map((stat) => (
            <div key={`hero-stat-${stat?.label}`} className="text-center">
              <p className="text-3xl font-800 text-accent tabular">{stat?.value}</p>
              <p className="text-sm text-white/60 mt-1">{stat?.label}</p>
            </div>
          ))}
        </div>

        {/* Page view counter */}
        <div className="mt-6 flex justify-center">
          <PageViewCounter />
        </div>
      </div>
    </section>
  );
}