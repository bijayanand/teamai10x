'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { Phone, Mail, Globe } from 'lucide-react';
import { getSocialMediaUrls, SocialMediaUrls } from '@/lib/socialMediaUrls';

// Inline SVG icons to replace missing lucide-react social icons
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const services = [
  { label: 'Website Development', href: '/#services' },
  { label: 'AI-Powered Websites', href: '/#services' },
  { label: 'Institutional Websites', href: '/#services' },
  { label: 'Business Websites', href: '/#services' },
  { label: 'Social Media Management', href: '/#services' },
  { label: 'Digital Marketing', href: '/#services' },
  { label: 'Skill Development', href: '/#services' },
  { label: 'Career & Placement', href: '/#services' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function PublicFooter() {
  const [socialUrls, setSocialUrls] = useState<SocialMediaUrls>({ facebook: '', instagram: '', linkedin: '', youtube: '' });

  useEffect(() => {
    setSocialUrls(getSocialMediaUrls());
  }, []);

  const socialLinks = [
    { icon: <FacebookIcon size={16} />, href: socialUrls.facebook || null, label: 'Facebook' },
    { icon: <InstagramIcon size={16} />, href: socialUrls.instagram || null, label: 'Instagram' },
    { icon: <LinkedInIcon size={16} />, href: socialUrls.linkedin || null, label: 'LinkedIn' },
    { icon: <YoutubeIcon size={16} />, href: socialUrls.youtube || null, label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={40} />
              <div>
                <span className="font-bold text-white text-lg block">Team10x.in</span>
                <span className="text-xs text-white/60 block">Digital Solutions | AI Powered</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Your Growth Partner for AI-powered digital solutions, website development, and social media management.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((s) => (
                s.href ? (
                  <a
                    key={`social-footer-${s?.label}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s?.label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-primary transition-all duration-150"
                  >
                    {s?.icon}
                  </a>
                ) : (
                  <span
                    key={`social-footer-${s?.label}`}
                    aria-label={`${s?.label} (not configured)`}
                    title={`${s?.label} URL not set in admin panel`}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/30 cursor-not-allowed"
                  >
                    {s?.icon}
                  </span>
                )
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-600 text-white text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks?.map((l) => (
                <li key={`footer-link-${l?.label}`}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-accent transition-colors duration-150">
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-600 text-white text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {services?.map((s) => (
                <li key={`footer-svc-${s.label}`}>
                  <Link href={s.href} className="text-sm text-white/60 hover:text-accent transition-colors duration-150">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-600 text-white text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+919204245001" className="text-sm text-white/70 hover:text-accent transition-colors duration-150 block">+91 92042 45001</a>
                  <a href="tel:+917677604200" className="text-sm text-white/70 hover:text-accent transition-colors duration-150 block">+91 76776 04200</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@team10x.in" className="text-sm text-white/70 hover:text-accent transition-colors duration-150">info@team10x.in</a>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="https://www.team10x.in" className="text-sm text-white/70 hover:text-accent transition-colors duration-150">www.team10x.in</a>
              </li>
            </ul>

            <div className="mt-5">
              <a
                href="https://wa.me/919204245001"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-600 text-sm rounded-xl hover:bg-green-500 transition-all duration-150 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L.057 23.882a.5.5 0 00.606.63l6.155-1.612A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.651-.502-5.178-1.379l-.37-.217-3.84 1.006 1.024-3.737-.239-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">© 2026 Team10x.in. All rights reserved. | Digital Solutions | AI Powered | Your Growth Partner</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors duration-150">Privacy Policy</Link>
            <Link href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors duration-150">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}