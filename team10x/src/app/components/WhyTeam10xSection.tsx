'use client';
import React from 'react';
import { Cpu, Palette, Smartphone, Shield, Settings, Edit3, IndianRupee, Headphones, Rocket } from 'lucide-react';

const reasons = [
  { id: 'why-ai', icon: <Cpu size={22} />, title: 'AI Technology', desc: 'Latest AI-powered features integrated into every solution we build.' },
  { id: 'why-design', icon: <Palette size={22} />, title: 'Modern Design', desc: 'Premium, contemporary designs that make your brand stand out.' },
  { id: 'why-mobile', icon: <Smartphone size={22} />, title: 'Mobile Responsive', desc: 'Pixel-perfect on every device — mobile, tablet, and desktop.' },
  { id: 'why-secure', icon: <Shield size={22} />, title: 'Secure & Reliable', desc: 'Enterprise-grade security and 99.9% uptime guarantee.' },
  { id: 'why-custom', icon: <Settings size={22} />, title: 'Customized Solutions', desc: 'Every project built to your exact specifications and requirements.' },
  { id: 'why-cms', icon: <Edit3 size={22} />, title: 'Easy Content Management', desc: 'Update your website without any technical knowledge.' },
  { id: 'why-price', icon: <IndianRupee size={22} />, title: 'Affordable Packages', desc: 'Professional quality at prices designed for Indian institutions.' },
  { id: 'why-support', icon: <Headphones size={22} />, title: 'Ongoing Support', desc: 'Dedicated support team available to help you at every step.' },
  { id: 'why-future', icon: <Rocket size={22} />, title: 'Future Ready Technology', desc: 'Built on modern tech stacks that scale as your organization grows.' },
];

export default function WhyTeam10xSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-primary">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Rocket size={14} className="text-accent" />
            <span className="text-sm font-600 text-accent">Why Choose Us</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-white mb-4">
            Why Team10x.in?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We combine AI technology, modern design, and deep industry expertise to deliver digital solutions that actually work for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons?.map((r, i) => (
            <div
              key={r?.id}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {r?.icon}
              </div>
              <div>
                <h3 className="font-700 text-white text-sm mb-1">{r?.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{r?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}