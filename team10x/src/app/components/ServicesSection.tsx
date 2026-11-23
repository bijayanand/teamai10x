'use client';
import React from 'react';
import { Globe, Sparkles, Building2, Briefcase, Share2, TrendingUp, GraduationCap, Users } from 'lucide-react';

const services = [
  {
    id: 'svc-web-dev',
    icon: <Globe size={28} />,
    title: 'Website Development',
    description: 'Professional, responsive and modern websites built with cutting-edge technologies. From concept to launch.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'svc-ai-web',
    icon: <Sparkles size={28} />,
    title: 'AI-Powered Websites',
    description: 'Websites enhanced with AI technology — smart chatbots, personalization, and intelligent features.',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
    badge: 'NEW',
  },
  {
    id: 'svc-institutional',
    icon: <Building2 size={28} />,
    title: 'Institutional Websites',
    description: 'Dedicated solutions for schools, colleges, coaching institutes and organizations. ERP-ready architecture.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'svc-business',
    icon: <Briefcase size={28} />,
    title: 'Business Websites',
    description: 'Professional websites designed for businesses and startups. Conversion-optimized with lead capture.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    id: 'svc-social',
    icon: <Share2 size={28} />,
    title: 'Social Media Management',
    description: 'Create, manage, schedule and publish social media content across all platforms from one dashboard.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    badge: 'FEATURED',
  },
  {
    id: 'svc-marketing',
    icon: <TrendingUp size={28} />,
    title: 'Digital Marketing',
    description: 'AI-assisted digital marketing and online growth solutions. SEO, SEM, content strategy and analytics.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    id: 'svc-skills',
    icon: <GraduationCap size={28} />,
    title: 'Skill Development',
    description: 'Technology, AI and career-oriented skill development programs for students and professionals.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    id: 'svc-placement',
    icon: <Users size={28} />,
    title: 'Career & Placement',
    description: 'Career guidance, counselling and placement support. Connect students with opportunities.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-600 text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-primary mb-4">
            Complete Digital Solutions Under One Roof
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From AI-powered websites to social media management — everything your institution or business needs to grow digitally.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map((svc) => (
            <div
              key={svc?.id}
              className="group relative p-6 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {svc?.badge && (
                <span className={`absolute top-4 right-4 text-2xs font-700 px-2 py-0.5 rounded-full ${svc?.badge === 'NEW' ? 'bg-accent/15 text-accent' : 'bg-primary/10 text-primary'}`}>
                  {svc?.badge}
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl ${svc?.bg} border flex items-center justify-center mb-5 ${svc?.color} group-hover:scale-110 transition-transform duration-300`}>
                {svc?.icon}
              </div>
              <h3 className="font-700 text-primary text-base mb-2">{svc?.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc?.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-600 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}