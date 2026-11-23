'use client';
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  id: 'test-001',
  name: 'Dr. Ramesh Kumar Singh',
  org: 'Green Valley Public School',
  designation: 'Principal',
  review: 'Team10x built us an outstanding school website that truly reflects our institution\'s values. The AI-powered features have transformed how we communicate with parents. Enquiries have increased by 40% since launch.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f00d7ef-1763293540305.png",
  alt: 'Middle-aged Indian man in formal attire smiling professionally'
},
{
  id: 'test-002',
  name: 'Prof. Anita Sharma',
  org: 'Apex Commerce College',
  designation: 'Director',
  review: 'The website developed by Team10x has given our college a completely new digital identity. The content management system is so easy to use that even our non-technical staff can update it. Highly recommended!',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12946c7bf-1763300744525.png",
  alt: 'Indian woman professor in professional attire with confident expression'
},
{
  id: 'test-003',
  name: 'Vikash Agarwal',
  org: 'SwiftStart Ventures',
  designation: 'Co-Founder & CEO',
  review: 'As a startup, we needed a website that could scale with us. Team10x delivered beyond expectations — modern design, fast loading, and the social media management dashboard saves us hours every week.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11c97ba4c-1763300819247.png",
  alt: 'Young entrepreneur in casual professional attire with a warm smile'
},
{
  id: 'test-004',
  name: 'Sister Mary Thomas',
  org: 'Sewa Foundation',
  designation: 'Executive Director',
  review: 'Team10x understood our NGO\'s mission perfectly. The website they built has helped us reach more donors and volunteers. The donation portal integration was seamless and professional.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128c39382-1763301607225.png",
  alt: 'Elderly woman with kind expression in professional attire'
}];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => c === 0 ? testimonials?.length - 1 : c - 1);
  const next = () => setCurrent((c) => c === testimonials?.length - 1 ? 0 : c + 1);

  const t = testimonials?.[current];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Star size={14} className="text-accent" />
            <span className="text-sm font-600 text-primary">Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-primary mb-4">What Our Clients Say</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-secondary rounded-3xl p-8 lg:p-12 border border-border">
            <Quote size={48} className="text-accent/20 absolute top-6 left-6" />

            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: t?.rating })?.map((_, i) =>
              <Star key={`star-${t?.id}-${i}`} size={18} className="text-accent fill-accent" />
              )}
            </div>

            <blockquote className="text-lg text-foreground leading-relaxed mb-8 relative z-10">
              "{t?.review}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                <AppImage
                  src={t?.image}
                  alt={t?.alt}
                  width={56}
                  height={56}
                  className="object-cover" />
                
              </div>
              <div>
                <p className="font-700 text-primary">{t?.name}</p>
                <p className="text-sm text-muted-foreground">{t?.designation}, {t?.org}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150 active:scale-95">
                
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials?.map((_, i) =>
                <button
                  key={`dot-${i}`}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? 'bg-accent w-6' : 'bg-border'}`} />

                )}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150 active:scale-95">
                
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}