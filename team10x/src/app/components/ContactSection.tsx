'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Phone, Mail, Loader2, Sparkles } from 'lucide-react';

interface ContactForm {
  name: string;
  organization: string;
  mobile: string;
  email: string;
  orgType: string;
  service: string;
  budget: string;
  message: string;
}

const orgTypes = ['School', 'College / University', 'Coaching Institute', 'NGO', 'Business', 'Startup', 'Government Body', 'Other'];
const services = ['Website Development', 'AI-Powered Website', 'Social Media Management', 'Digital Marketing', 'Skill Development', 'Career & Placement', 'Complete Digital Package'];
const budgets = ['Below ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000', 'Not Decided Yet'];

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  // Backend integration point: POST to /api/leads
  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    reset();
    toast.success('Thank you! We will contact you within 24 hours.', { duration: 5000 });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Sparkles size={14} className="text-accent" />
            <span className="text-sm font-600 text-accent">Get In Touch</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-white mb-4">Start Your Digital Journey Today</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Tell us about your organization and requirements. We will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Phone size={20} />
              </div>
              <h4 className="font-600 text-white mb-2">Call Us</h4>
              <a href="tel:+919204245001" className="text-sm text-white/70 hover:text-accent transition-colors duration-150 block">+91 92042 45001</a>
              <a href="tel:+917677604200" className="text-sm text-white/70 hover:text-accent transition-colors duration-150 block">+91 76776 04200</a>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Mail size={20} />
              </div>
              <h4 className="font-600 text-white mb-2">Email Us</h4>
              <a href="mailto:info@team10x.in" className="text-sm text-white/70 hover:text-accent transition-colors duration-150">info@team10x.in</a>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L.057 23.882a.5.5 0 00.606.63l6.155-1.612A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.651-.502-5.178-1.379l-.37-.217-3.84 1.006 1.024-3.737-.239-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              </div>
              <h4 className="font-600 text-white mb-2">WhatsApp</h4>
              <a
                href="https://wa.me/919204245001"
                className="text-sm text-white/70 hover:text-accent transition-colors duration-150"
              >
                Chat with us instantly
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">
                    Organization Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('organization', { required: 'Organization is required' })}
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                    placeholder="School / College / Business name"
                  />
                  {errors.organization && <p className="text-xs text-danger mt-1">{errors.organization.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('mobile', { required: 'Mobile is required', pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' } })}
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.mobile && <p className="text-xs text-danger mt-1">{errors.mobile.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' } })}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">Organization Type</label>
                  <select
                    {...register('orgType')}
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 bg-white"
                  >
                    <option value="">Select type...</option>
                    {orgTypes.map((o) => <option key={`orgtype-${o}`} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-600 text-foreground mb-1.5">Required Service</label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 bg-white"
                  >
                    <option value="">Select service...</option>
                    {services.map((s) => <option key={`svc-opt-${s}`} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-600 text-foreground mb-1.5">Budget Range</label>
                <select
                  {...register('budget')}
                  className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 bg-white"
                >
                  <option value="">Select budget range...</option>
                  {budgets.map((b) => <option key={`budget-${b}`} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-600 text-foreground mb-1.5">
                  Your Message <span className="text-danger">*</span>
                </label>
                <textarea
                  {...register('message', { required: 'Please tell us about your requirements' })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 resize-none"
                  placeholder="Tell us about your organization and what you need..."
                />
                {errors.message && <p className="text-xs text-danger mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-700 text-base rounded-xl hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
                style={{ minWidth: 200 }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}