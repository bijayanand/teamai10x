'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
  Brain,
  Building2,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  Play,
} from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  headline: string;
  headlineAccent: string;
  subtext: string;
  highlight: string;
  highlightValue: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  tags: string[];
  accentColor: string;
  bgGradient: string;
  glowColor: string;
  visual: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: 'AI-Powered Digital Solutions',
    badgeIcon: <Sparkles size={14} />,
    headline: 'Build Your Digital Future',
    headlineAccent: 'with Team10x.in',
    subtext:
      'Transform your institution or business with cutting-edge AI-powered websites. From schools to enterprises — we deliver results in 7 days.',
    highlight: 'Starting at',
    highlightValue: '₹6,999/-',
    ctaPrimary: { label: 'Get Your Website', href: '#contact' },
    ctaSecondary: { label: 'View Portfolio', href: '#portfolio' },
    tags: ['AI-Powered', 'Mobile Responsive', 'Secure & Reliable', '24/7 Support'],
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #0A0F1E 0%, #1E3A5F 45%, #0F2744 100%)',
    glowColor: 'rgba(245,158,11,0.12)',
    visual: <Slide1Visual />,
  },
  {
    id: 2,
    badge: 'Schools & Institutions',
    badgeIcon: <GraduationCap size={14} />,
    headline: 'Empower Education',
    headlineAccent: 'with Smart Websites',
    subtext:
      'Purpose-built websites for schools, colleges, and universities. Admission portals, fee management, event calendars — everything in one platform.',
    highlight: 'Trusted by',
    highlightValue: '50+ Institutions',
    ctaPrimary: { label: 'For Institutions', href: '#contact' },
    ctaSecondary: { label: 'See Features', href: '#services' },
    tags: ['Admission Portal', 'Fee Management', 'Event Calendar', 'Gallery Module'],
    accentColor: '#34D399',
    bgGradient: 'linear-gradient(135deg, #0A1A14 0%, #064E3B 45%, #0A1A14 100%)',
    glowColor: 'rgba(52,211,153,0.12)',
    visual: <Slide2Visual />,
  },
  {
    id: 3,
    badge: 'Business & Enterprises',
    badgeIcon: <Building2 size={14} />,
    headline: 'Scale Your Business',
    headlineAccent: 'with AI Automation',
    subtext:
      'Lead generation, CRM integration, social media automation, and AI-driven content — all under one roof. Grow faster with less effort.',
    highlight: 'Delivered in',
    highlightValue: '7 Days',
    ctaPrimary: { label: 'Grow My Business', href: '#contact' },
    ctaSecondary: { label: 'Our Packages', href: '#pricing' },
    tags: ['Lead Generation', 'CRM Ready', 'AI Content', 'Social Media'],
    accentColor: '#818CF8',
    bgGradient: 'linear-gradient(135deg, #0D0A1E 0%, #1E1B4B 45%, #0D0A1E 100%)',
    glowColor: 'rgba(129,140,248,0.12)',
    visual: <Slide3Visual />,
  },
  {
    id: 4,
    badge: 'AI + Technology',
    badgeIcon: <Brain size={14} />,
    headline: 'Next-Gen AI Tools',
    headlineAccent: 'for Your Digital Growth',
    subtext:
      'Harness the power of artificial intelligence — automated social media posts, AI chatbots, smart analytics, and real-time performance tracking.',
    highlight: 'Client Satisfaction',
    highlightValue: '98%',
    ctaPrimary: { label: 'Explore AI Features', href: '#services' },
    ctaSecondary: { label: 'Talk to Team10x', href: 'https://wa.me/919204245001' },
    tags: ['AI Chatbot', 'Auto Social Posts', 'Smart Analytics', 'Real-time Tracking'],
    accentColor: '#FB923C',
    bgGradient: 'linear-gradient(135deg, #1A0A00 0%, #431407 45%, #1A0A00 100%)',
    glowColor: 'rgba(251,146,60,0.12)',
    visual: <Slide4Visual />,
  },
];

/* ─── Slide Visuals ─────────────────────────────────────────────────────── */

function Slide1Visual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Laptop mockup */}
      <div className="relative bg-[#111827] rounded-2xl p-3 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0F1E] rounded-t-xl border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-2 px-2 py-0.5 bg-white/5 rounded text-xs text-white/30 text-center truncate">
            team10x.in
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0A0F1E] rounded-b-xl overflow-hidden aspect-video flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#F59E0B]/80" />
              <div className="w-16 h-1.5 rounded bg-white/30" />
            </div>
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-1 rounded bg-white/20" />)}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-center px-5 py-3">
            <div className="w-12 h-1 rounded bg-[#F59E0B] mb-2" />
            <div className="w-40 h-2.5 rounded bg-white/80 mb-1.5" />
            <div className="w-28 h-2.5 rounded bg-white/50 mb-3" />
            <div className="w-20 h-5 rounded-lg bg-[#F59E0B]" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 px-4 pb-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/10 rounded-lg p-1.5">
                <div className="w-full h-6 rounded bg-white/10 mb-1" />
                <div className="w-full h-1 rounded bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] border border-[#F59E0B]/30 rounded-xl shadow-lg">
        <Zap size={12} className="text-[#F59E0B]" />
        <span className="text-xs font-semibold text-[#F59E0B]">AI-Powered</span>
      </div>
      <div className="absolute -bottom-3 -left-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] border border-green-500/30 rounded-xl shadow-lg">
        <Globe size={12} className="text-green-400" />
        <span className="text-xs font-semibold text-green-400">Live in 7 Days</span>
      </div>
    </div>
  );
}

function Slide2Visual() {
  const modules = [
    { icon: '🎓', label: 'Admissions', color: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)' },
    { icon: '💳', label: 'Fee Portal', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    { icon: '📅', label: 'Events', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    { icon: '🖼️', label: 'Gallery', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    { icon: '📢', label: 'Notices', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    { icon: '👩‍🏫', label: 'Faculty', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-[#0A1A14]/80 border border-[#34D399]/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#34D399]/20 flex items-center justify-center">
            <GraduationCap size={16} className="text-[#34D399]" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Institution Dashboard</p>
            <p className="text-[#34D399]/70 text-xs">All modules active</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-xs text-[#34D399]">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {modules.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
              style={{ background: m.color, border: `1px solid ${m.border}` }}
            >
              <span className="text-xl">{m.icon}</span>
              <span className="text-xs text-white/80 font-medium">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Admission Enquiries</span>
            <span className="text-xs text-[#34D399] font-semibold">+24 today</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#34D399] rounded-full" style={{ width: '72%' }} />
          </div>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#064E3B] border border-[#34D399]/40 rounded-xl shadow-lg">
        <span className="text-xs font-semibold text-[#34D399]">50+ Institutions</span>
      </div>
    </div>
  );
}

function Slide3Visual() {
  const metrics = [
    { label: 'Leads This Month', value: '284', change: '+18%', up: true },
    { label: 'Conversion Rate', value: '6.4%', change: '+2.1%', up: true },
    { label: 'Social Reach', value: '12.4K', change: '+34%', up: true },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto space-y-3">
      <div className="bg-[#0D0A1E]/80 border border-[#818CF8]/20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-[#818CF8]" />
          <span className="text-white text-sm font-semibold">Business Analytics</span>
          <span className="ml-auto text-xs text-[#818CF8]/70">Last 30 days</span>
        </div>
        <div className="space-y-2.5">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <p className="text-xs text-white/50">{m.label}</p>
                <p className="text-white font-bold text-base">{m.value}</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${m.up ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                {m.up ? '↑' : '↓'} {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'AI Posts Scheduled', value: '12', icon: '🤖', color: '#818CF8' },
          { label: 'Active Campaigns', value: '4', icon: '📣', color: '#818CF8' },
        ].map((c) => (
          <div key={c.label} className="bg-[#0D0A1E]/80 border border-[#818CF8]/20 rounded-xl p-3 text-center">
            <span className="text-2xl">{c.icon}</span>
            <p className="text-white font-bold text-lg mt-1">{c.value}</p>
            <p className="text-white/50 text-xs">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#1E1B4B] border border-[#818CF8]/40 rounded-xl shadow-lg">
        <span className="text-xs font-semibold text-[#818CF8]">CRM Ready</span>
      </div>
    </div>
  );
}

function Slide4Visual() {
  const features = [
    { icon: '🧠', label: 'AI Chatbot', desc: 'Handles 80% of queries' },
    { icon: '📱', label: 'Auto Social Posts', desc: 'Facebook, Instagram, LinkedIn' },
    { icon: '📊', label: 'Smart Analytics', desc: 'Real-time insights' },
    { icon: '🎯', label: 'Lead Scoring', desc: 'AI-ranked prospects' },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-[#1A0A00]/80 border border-[#FB923C]/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#FB923C]/20 flex items-center justify-center">
            <Brain size={16} className="text-[#FB923C]" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">AI Feature Suite</p>
            <p className="text-[#FB923C]/70 text-xs">Powered by Team10x AI</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {features.map((f) => (
            <div key={f.label} className="p-3 rounded-xl bg-[#FB923C]/8 border border-[#FB923C]/15 hover:border-[#FB923C]/30 transition-colors">
              <span className="text-2xl block mb-1.5">{f.icon}</span>
              <p className="text-white text-xs font-semibold">{f.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-[#FB923C]/10 border border-[#FB923C]/20">
          <div className="w-2 h-2 rounded-full bg-[#FB923C] animate-pulse flex-shrink-0" />
          <p className="text-xs text-white/70">AI engine processing <span className="text-[#FB923C] font-semibold">1,240 tasks</span> today</p>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#431407] border border-[#FB923C]/40 rounded-xl shadow-lg">
        <span className="text-xs font-semibold text-[#FB923C]">98% Satisfaction</span>
      </div>
    </div>
  );
}

/* ─── Main Slider ────────────────────────────────────────────────────────── */

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);

  const DURATION = 5500;

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => next(), DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, next]);

  // Progress bar
  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, isPaused]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: slide.bgGradient, transition: 'background 0.8s ease' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 65% 50%, ${slide.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-16 right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ background: `${slide.accentColor}10` }}
      />
      <div
        className="absolute bottom-16 left-16 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ background: `${slide.accentColor}08` }}
      />

      {/* Content */}
      <div className="relative w-full max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 lg:pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div
            key={`left-${current}`}
            className={`transition-all duration-500 ${isAnimating ? (direction === 'next' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8') : 'opacity-100 translate-x-0'}`}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{
                background: `${slide.accentColor}15`,
                borderColor: `${slide.accentColor}30`,
              }}
            >
              <span style={{ color: slide.accentColor }}>{slide.badgeIcon}</span>
              <span className="text-sm font-semibold" style={{ color: slide.accentColor }}>
                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-5">
              {slide.headline}{' '}
              <span style={{ color: slide.accentColor }}>{slide.headlineAccent}</span>
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-6 max-w-lg">
              {slide.subtext}
            </p>

            {/* Highlight pill */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border mb-8"
              style={{
                background: `${slide.accentColor}12`,
                borderColor: `${slide.accentColor}30`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: slide.accentColor }}
              />
              <p className="text-white font-semibold">
                {slide.highlight}{' '}
                <span className="text-xl font-extrabold" style={{ color: slide.accentColor }}>
                  {slide.highlightValue}
                </span>
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/8 border border-white/10"
                >
                  <CheckCircle size={11} style={{ color: slide.accentColor }} />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={slide.ctaPrimary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 shadow-lg"
                style={{
                  background: slide.accentColor,
                  color: '#0A0F1E',
                  boxShadow: `0 0 24px ${slide.accentColor}40`,
                }}
              >
                {slide.ctaPrimary.label}
                <ArrowRight size={16} />
              </Link>
              <a
                href={slide.ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/8 border border-white/15 hover:bg-white/15 transition-all duration-150 active:scale-95"
              >
                <Play size={14} />
                {slide.ctaSecondary.label}
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div
            key={`right-${current}`}
            className={`hidden lg:flex items-center justify-center transition-all duration-500 ${isAnimating ? (direction === 'next' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8') : 'opacity-100 translate-x-0'}`}
          >
            {slide.visual}
          </div>
        </div>

        {/* Bottom controls row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Slide indicators */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className="relative flex items-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current ? (
                  <div className="relative h-2 w-10 rounded-full overflow-hidden bg-white/20">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-none"
                      style={{
                        width: `${progress}%`,
                        background: slide.accentColor,
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-2 h-2 rounded-full bg-white/25 hover:bg-white/50 transition-colors"
                  />
                )}
              </button>
            ))}
            <span className="text-white/30 text-xs ml-1 tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-10">
            {[
              { value: '150+', label: 'Websites Delivered' },
              { value: '50+', label: 'Institutions Served' },
              { value: '7 Days', label: 'Avg. Delivery' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold tabular-nums" style={{ color: slide.accentColor }}>
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-white hover:bg-white/15 transition-colors active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border flex items-center justify-center font-semibold transition-all active:scale-95"
              style={{
                background: `${slide.accentColor}20`,
                borderColor: `${slide.accentColor}40`,
                color: slide.accentColor,
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Side nav arrows (large screens) */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex w-12 h-12 rounded-full bg-white/8 border border-white/15 items-center justify-center text-white hover:bg-white/15 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex w-12 h-12 rounded-full items-center justify-center transition-colors z-10"
        style={{
          background: `${slide.accentColor}20`,
          border: `1px solid ${slide.accentColor}40`,
          color: slide.accentColor,
        }}
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
