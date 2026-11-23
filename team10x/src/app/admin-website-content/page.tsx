'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Save, X, Globe, Briefcase, Package, Star, CheckCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { getSocialMediaUrls, saveSocialMediaUrls, SocialMediaUrls } from '@/lib/socialMediaUrls';

type Tab = 'services' | 'packages' | 'testimonials' | 'categories' | 'social';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
  order: number;
}

interface PackageFeature {
  text: string;
  included: boolean;
}

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  badge: string;
  features: PackageFeature[];
  active: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  org: string;
  designation: string;
  review: string;
  rating: number;
  active: boolean;
}

interface Category {
  id: string;
  emoji: string;
  label: string;
  active: boolean;
}

const initialServices: Service[] = [
  { id: 'svc-1', title: 'Website Development', description: 'Professional, responsive and modern websites.', icon: '🌐', active: true, order: 1 },
  { id: 'svc-2', title: 'AI-Powered Websites', description: 'Websites enhanced with AI technology and smart features.', icon: '🤖', active: true, order: 2 },
  { id: 'svc-3', title: 'Institutional Websites', description: 'Dedicated solutions for schools, colleges, coaching institutes and organizations.', icon: '🏫', active: true, order: 3 },
  { id: 'svc-4', title: 'Business Websites', description: 'Professional websites designed for businesses and startups.', icon: '💼', active: true, order: 4 },
  { id: 'svc-5', title: 'Social Media Management', description: 'Create, manage, schedule and publish social media content from one dashboard.', icon: '📱', active: true, order: 5 },
  { id: 'svc-6', title: 'Digital Marketing', description: 'AI-assisted digital marketing and online growth solutions.', icon: '📈', active: true, order: 6 },
  { id: 'svc-7', title: 'Skill Development', description: 'Technology, AI and career-oriented skill development programs.', icon: '🎓', active: true, order: 7 },
  { id: 'svc-8', title: 'Career & Placement Solutions', description: 'Career guidance, counselling and placement support.', icon: '🚀', active: true, order: 8 },
];

const initialPackage: PricingPackage = {
  id: 'pkg-1',
  name: 'Professional Website',
  price: '₹6,999/-*',
  badge: 'Most Popular',
  features: [
    { text: 'Professional Design', included: true },
    { text: 'Responsive Website', included: true },
    { text: 'Home Page', included: true },
    { text: 'About Us', included: true },
    { text: 'Services', included: true },
    { text: 'Gallery', included: true },
    { text: 'Contact & Enquiry Form', included: true },
    { text: 'Social Media Integration', included: true },
    { text: 'Basic SEO', included: true },
    { text: 'WhatsApp Integration', included: true },
    { text: 'Google Maps', included: true },
    { text: 'Secure Hosting Configuration', included: true },
    { text: 'AI-Powered Features', included: true },
  ],
  active: true,
};

const initialTestimonials: Testimonial[] = [
  { id: 'test-1', name: 'Rajesh Kumar', org: 'Sunrise Public School', designation: 'Principal', review: 'Team10x delivered an outstanding website for our school. Parents and students love the new digital presence!', rating: 5, active: true },
  { id: 'test-2', name: 'Dr. Priya Mishra', org: 'City Commerce College', designation: 'Director', review: 'The AI-powered features on our college website have transformed how we engage with prospective students.', rating: 5, active: true },
  { id: 'test-3', name: 'Amit Singh', org: 'TechPath Coaching', designation: 'Founder', review: 'Excellent work! Our enquiries doubled within a month of launching the new website.', rating: 5, active: true },
];

const initialCategories: Category[] = [
  { id: 'cat-1', emoji: '🏫', label: 'Schools', active: true },
  { id: 'cat-2', emoji: '🎓', label: 'Colleges', active: true },
  { id: 'cat-3', emoji: '🏢', label: 'Institutions', active: true },
  { id: 'cat-4', emoji: '📚', label: 'Coaching Centers', active: true },
  { id: 'cat-5', emoji: '🏥', label: 'Organizations', active: true },
  { id: 'cat-6', emoji: '🌐', label: 'NGOs', active: true },
  { id: 'cat-7', emoji: '💼', label: 'Businesses', active: true },
  { id: 'cat-8', emoji: '🚀', label: 'Startups', active: true },
  { id: 'cat-9', emoji: '🏛️', label: 'Government Bodies', active: true },
  { id: 'cat-10', emoji: '📈', label: 'Other Entities', active: true },
];

function ServiceEditor({ service, onSave, onCancel }: { service: Partial<Service>; onSave: (s: Service) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ title: service.title || '', description: service.description || '', icon: service.icon || '🌐' });
  return (
    <div className="bg-admin-surface-2 border border-admin rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <input
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-14 text-center text-2xl bg-admin-bg border border-admin rounded-lg py-2 text-admin-text"
          maxLength={2}
        />
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Service title"
          className="flex-1 bg-admin-bg border border-admin rounded-lg px-3 py-2 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50"
        />
      </div>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Service description"
        rows={2}
        className="w-full bg-admin-bg border border-admin rounded-lg px-3 py-2 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 resize-none"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ ...service, ...form, id: service.id || `svc-${Date.now()}`, active: service.active ?? true, order: service.order ?? 99 } as Service)}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent text-primary text-xs font-600 rounded-lg hover:bg-yellow-400 transition-all duration-150 active:scale-95"
        >
          <Save size={13} /> Save
        </button>
        <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 bg-admin-surface border border-admin text-admin-muted text-xs font-500 rounded-lg hover:text-admin-text transition-all duration-150">
          <X size={13} /> Cancel
        </button>
      </div>
    </div>
  );
}

function WebsiteContentInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [addingService, setAddingService] = useState(false);
  const [pkg, setPkg] = useState<PricingPackage>(initialPackage);
  const [editingPkg, setEditingPkg] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [socialUrls, setSocialUrls] = useState<SocialMediaUrls>({ facebook: '', instagram: '', linkedin: '', youtube: '' });

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'services', label: 'Services', icon: <Briefcase size={15} /> },
    { id: 'packages', label: 'Pricing Package', icon: <Package size={15} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star size={15} /> },
    { id: 'categories', label: 'Client Categories', icon: <Globe size={15} /> },
    { id: 'social', label: 'Social Media URLs', icon: <Share2 size={15} /> },
  ];

  const toggleService = (id: string) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    toast.success('Service visibility updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service removed');
  };

  const saveService = (updated: Service) => {
    setServices((prev) => {
      const exists = prev.find((s) => s.id === updated.id);
      if (exists) return prev.map((s) => s.id === updated.id ? updated : s);
      return [...prev, updated];
    });
    setEditingService(null);
    setAddingService(false);
    toast.success('Service saved successfully');
  };

  const toggleTestimonial = (id: string) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, active: !t.active } : t));
    toast.success('Testimonial visibility updated');
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));
    toast.success('Category visibility updated');
  };

  useEffect(() => {
    const tab = searchParams.get('tab') as Tab | null;
    if (tab && ['services', 'packages', 'testimonials', 'categories', 'social'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    setSocialUrls(getSocialMediaUrls());
  }, []);

  const saveSocialUrls = () => {
    saveSocialMediaUrls(socialUrls);
    toast.success('Social media URLs saved successfully');
  };

  return (
    <AdminLayout currentPath="/admin-website-content">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Website Content</h1>
            <p className="text-sm text-admin-muted mt-0.5">Manage services, pricing, testimonials and client categories</p>
          </div>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-admin-surface border border-admin text-admin-muted text-sm font-500 rounded-xl hover:text-admin-text hover:border-accent/30 transition-all duration-150"
          >
            <Eye size={15} />
            Preview Website
          </a>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-admin-surface border border-admin rounded-xl w-fit flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-500 transition-all duration-150 ${
                activeTab === tab.id ? 'bg-accent text-primary font-600' : 'text-admin-muted hover:text-admin-text'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-admin-muted">{services.filter((s) => s.active).length} of {services.length} services active</p>
              <button
                onClick={() => setAddingService(true)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
              >
                <Plus size={15} />
                Add Service
              </button>
            </div>

            {addingService && (
              <ServiceEditor
                service={{}}
                onSave={saveService}
                onCancel={() => setAddingService(false)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((svc) => (
                <div key={svc.id}>
                  {editingService === svc.id ? (
                    <ServiceEditor
                      service={svc}
                      onSave={saveService}
                      onCancel={() => setEditingService(null)}
                    />
                  ) : (
                    <div className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${svc.active ? 'bg-admin-surface border-admin hover:border-accent/20' : 'bg-admin-bg border-admin opacity-60'}`}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-admin-surface-2 flex items-center justify-center text-xl">
                        {svc.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-600 text-admin-text text-sm">{svc.title}</p>
                          {!svc.active && <span className="text-2xs px-1.5 py-0.5 rounded bg-admin-surface-2 text-admin-muted border border-admin">Hidden</span>}
                        </div>
                        <p className="text-xs text-admin-muted mt-0.5 line-clamp-2">{svc.description}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                        <button
                          onClick={() => toggleService(svc.id)}
                          className="p-1.5 rounded-lg text-admin-muted hover:text-accent transition-all duration-150"
                          title={svc.active ? 'Hide service' : 'Show service'}
                        >
                          {svc.active ? <ToggleRight size={16} className="text-success" /> : <ToggleLeft size={16} />}
                        </button>
                        <button
                          onClick={() => setEditingService(svc.id)}
                          className="p-1.5 rounded-lg text-admin-muted hover:bg-info-subtle hover:text-info transition-all duration-150"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteService(svc.id)}
                          className="p-1.5 rounded-lg text-admin-muted hover:bg-danger-subtle hover:text-danger transition-all duration-150"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-admin-muted">Manage your pricing package displayed on the website</p>
              <button
                onClick={() => setEditingPkg(!editingPkg)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
              >
                <Edit2 size={15} />
                {editingPkg ? 'Cancel Edit' : 'Edit Package'}
              </button>
            </div>

            {editingPkg ? (
              <div className="bg-admin-surface border border-admin rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Package Name</label>
                    <input
                      value={pkg.name}
                      onChange={(e) => setPkg({ ...pkg, name: e.target.value })}
                      className="w-full bg-admin-bg border border-admin rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Price</label>
                    <input
                      value={pkg.price}
                      onChange={(e) => setPkg({ ...pkg, price: e.target.value })}
                      className="w-full bg-admin-bg border border-admin rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Badge Text</label>
                  <input
                    value={pkg.badge}
                    onChange={(e) => setPkg({ ...pkg, badge: e.target.value })}
                    className="w-full bg-admin-bg border border-admin rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-2">Features</label>
                  <div className="space-y-2">
                    {pkg.features.map((feat, idx) => (
                      <div key={`feat-${idx}`} className="flex items-center gap-3">
                        <button
                          onClick={() => setPkg({ ...pkg, features: pkg.features.map((f, i) => i === idx ? { ...f, included: !f.included } : f) })}
                          className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 ${feat.included ? 'bg-success border-success/50 text-white' : 'bg-admin-bg border-admin'}`}
                        >
                          {feat.included && <CheckCircle size={12} />}
                        </button>
                        <input
                          value={feat.text}
                          onChange={(e) => setPkg({ ...pkg, features: pkg.features.map((f, i) => i === idx ? { ...f, text: e.target.value } : f) })}
                          className="flex-1 bg-admin-bg border border-admin rounded-lg px-3 py-1.5 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                        />
                        <button
                          onClick={() => setPkg({ ...pkg, features: pkg.features.filter((_, i) => i !== idx) })}
                          className="p-1.5 text-admin-muted hover:text-danger transition-colors duration-150"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setPkg({ ...pkg, features: [...pkg.features, { text: 'New Feature', included: true }] })}
                      className="flex items-center gap-2 text-xs text-accent hover:text-yellow-400 transition-colors duration-150 mt-1"
                    >
                      <Plus size={13} /> Add Feature
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => { setEditingPkg(false); toast.success('Package updated successfully'); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
                >
                  <Save size={15} /> Save Package
                </button>
              </div>
            ) : (
              <div className="bg-admin-surface border border-accent/20 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-2xs font-600 text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">{pkg.badge}</span>
                    <h3 className="text-xl font-700 text-admin-text mt-2">{pkg.name}</h3>
                    <p className="text-3xl font-800 text-accent mt-1 tabular">{pkg.price}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-2xs font-600 ${pkg.active ? 'bg-success-subtle text-success border border-success/20' : 'bg-admin-surface-2 text-admin-muted border border-admin'}`}>
                    {pkg.active ? 'Active' : 'Hidden'}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.features.map((feat, idx) => (
                    <div key={`view-feat-${idx}`} className="flex items-center gap-2">
                      <CheckCircle size={13} className={feat.included ? 'text-success' : 'text-admin-muted'} />
                      <span className={`text-xs ${feat.included ? 'text-admin-text' : 'text-admin-muted line-through'}`}>{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-admin-muted">{testimonials.filter((t) => t.active).length} of {testimonials.length} testimonials visible</p>
              <button
                onClick={() => toast.info('Add testimonial form — coming soon')}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
              >
                <Plus size={15} />
                Add Testimonial
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className={`group p-5 rounded-2xl border transition-all duration-200 ${t.active ? 'bg-admin-surface border-admin hover:border-accent/20' : 'bg-admin-bg border-admin opacity-60'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-700 text-accent">
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        onClick={() => toggleTestimonial(t.id)}
                        className="p-1.5 rounded-lg text-admin-muted hover:text-accent transition-all duration-150"
                      >
                        {t.active ? <ToggleRight size={16} className="text-success" /> : <ToggleLeft size={16} />}
                      </button>
                      <button className="p-1.5 rounded-lg text-admin-muted hover:bg-info-subtle hover:text-info transition-all duration-150">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => { setTestimonials((prev) => prev.filter((x) => x.id !== t.id)); toast.success('Testimonial removed'); }}
                        className="p-1.5 rounded-lg text-admin-muted hover:bg-danger-subtle hover:text-danger transition-all duration-150"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`star-${t.id}-${i}`} className={`text-sm ${i < t.rating ? 'text-accent' : 'text-admin-muted'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-admin-muted line-clamp-3 mb-3">"{t.review}"</p>
                  <p className="text-sm font-600 text-admin-text">{t.name}</p>
                  <p className="text-xs text-admin-muted">{t.designation} · {t.org}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-admin-muted">Toggle visibility of client categories on the website</p>
              <button
                onClick={() => toast.info('Add category — coming soon')}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
              >
                <Plus size={15} />
                Add Category
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`group flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${cat.active ? 'bg-admin-surface border-admin hover:border-accent/30' : 'bg-admin-bg border-admin opacity-50'}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <span className="text-3xl">{cat.emoji}</span>
                  <span className="text-xs font-500 text-admin-text text-center">{cat.label}</span>
                  <span className={`text-2xs font-600 px-2 py-0.5 rounded-full ${cat.active ? 'bg-success-subtle text-success' : 'bg-admin-surface-2 text-admin-muted'}`}>
                    {cat.active ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Media URLs Tab */}
        {activeTab === 'social' && (
          <div className="max-w-2xl space-y-4">
            <div>
              <p className="text-sm text-admin-muted">Set your social media profile URLs. These will appear as clickable icons in the website footer.</p>
            </div>
            <div className="bg-admin-surface border border-admin rounded-2xl p-6 space-y-5">
              {/* Facebook */}
              <div>
                <label className="flex items-center gap-2 text-xs font-600 text-admin-muted uppercase tracking-wider mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={socialUrls.facebook}
                  onChange={(e) => setSocialUrls({ ...socialUrls, facebook: e.target.value })}
                  placeholder="https://www.facebook.com/yourpage"
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center gap-2 text-xs font-600 text-admin-muted uppercase tracking-wider mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={socialUrls.instagram}
                  onChange={(e) => setSocialUrls({ ...socialUrls, instagram: e.target.value })}
                  placeholder="https://www.instagram.com/yourprofile"
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="flex items-center gap-2 text-xs font-600 text-admin-muted uppercase tracking-wider mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn Page URL
                </label>
                <input
                  type="url"
                  value={socialUrls.linkedin}
                  onChange={(e) => setSocialUrls({ ...socialUrls, linkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/company/yourcompany"
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
                />
              </div>

              {/* YouTube */}
              <div>
                <label className="flex items-center gap-2 text-xs font-600 text-admin-muted uppercase tracking-wider mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={socialUrls.youtube}
                  onChange={(e) => setSocialUrls({ ...socialUrls, youtube: e.target.value })}
                  placeholder="https://www.youtube.com/@yourchannel"
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
                />
              </div>

              <div className="pt-2 border-t border-admin flex items-center justify-between">
                <p className="text-xs text-admin-muted">URLs are saved locally and shown as clickable icons in the footer.</p>
                <button
                  onClick={saveSocialUrls}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
                >
                  <Save size={15} /> Save URLs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function WebsiteContentPage() {
  return (
    <Suspense fallback={null}>
      <WebsiteContentInner />
    </Suspense>
  );
}
