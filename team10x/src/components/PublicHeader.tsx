'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/images/WhatsApp_Image_2026-08-12_at_4.37.09_PM-removebg-preview-1789228841455.png"
              alt="Team10x Logo"
              width={140}
              height={48}
              className="object-contain h-12 w-auto"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '0.04em' }}>
                Team10x.in
              </span>
              <span className="text-yellow-400 text-xs font-medium tracking-wider" style={{ letterSpacing: '0.06em' }}>
                Digital Solutions | AI-Powered
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`nav-pub-${link?.label}`}
                href={link?.href}
                className="px-4 py-2 text-sm font-500 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919204245001"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-150"
            >
              <Phone size={14} />
              <span>+91 92042 45001</span>
            </a>
            <Link
              href="/admin-login"
              className="px-4 py-2 text-sm font-500 text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-150"
            >
              Admin Login
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2.5 bg-accent text-primary font-600 text-sm rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors duration-150"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`nav-mob-${link?.label}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-500 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/919204245001"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-600 text-sm rounded-xl"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/admin-login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-3 border border-white/20 text-white/70 font-500 text-sm rounded-xl"
              >
                Admin Login
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-3 bg-accent text-primary font-600 text-sm rounded-xl"
              >
                Get Your Website
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}