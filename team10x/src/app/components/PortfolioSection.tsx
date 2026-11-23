import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const projects = [
{
  id: 'proj-001',
  title: 'Green Valley School',
  category: 'School',
  description: 'Complete AI-powered school website with admission portal, gallery, and result management.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f15fdd61-1784469062925.png",
  alt: 'School building with students in uniform standing in front of a modern institutional campus',
  url: '#',
  featured: true
},
{
  id: 'proj-002',
  title: 'Apex Commerce College',
  category: 'College',
  description: 'Modern college website with course catalog, faculty profiles, and student portal.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bee70b7b-1770210255285.png",
  alt: 'Modern college campus building with green lawns and contemporary architecture',
  url: '#',
  featured: true
},
{
  id: 'proj-003',
  title: 'TechEdge Coaching',
  category: 'Coaching Institute',
  description: 'Coaching institute website with batch management, online test series, and results.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb38181a-1765298091404.png",
  alt: 'Students studying in a modern coaching classroom with whiteboards and study materials',
  url: '#',
  featured: false
},
{
  id: 'proj-004',
  title: 'Horizon Enterprises',
  category: 'Business',
  description: 'Corporate business website with service showcase, team, and lead generation forms.',
  image: "https://images.unsplash.com/photo-1667391551176-9070c1dc52e0",
  alt: 'Modern corporate office interior with glass walls and professional workstations',
  url: '#',
  featured: false
},
{
  id: 'proj-005',
  title: 'Sewa Foundation NGO',
  category: 'NGO',
  description: 'NGO website with donation portal, impact stories, volunteer registration, and events.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1125a79cf-1767787362151.png",
  alt: 'Volunteers working together in a community service event with smiling participants',
  url: '#',
  featured: true
},
{
  id: 'proj-006',
  title: 'SwiftStart Ventures',
  category: 'Startup',
  description: 'Startup landing page with product showcase, investor pitch section, and CTA optimization.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_171fc5bf2-1767732102092.png",
  alt: 'Startup team in a bright modern office space collaborating around a whiteboard',
  url: '#',
  featured: false
}];


export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-600 text-primary">Portfolio</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-800 text-primary mb-4">Our Work Speaks for Itself</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real websites built for real organizations across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((proj) =>
          <div key={proj?.id} className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <AppImage
                src={proj?.image}
                alt={proj?.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
              
                {proj?.featured &&
              <span className="absolute top-3 left-3 text-2xs font-700 px-2 py-1 rounded-full bg-accent text-primary">
                    FEATURED
                  </span>
              }
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                  href={proj?.url}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-600 text-sm rounded-xl hover:bg-accent transition-colors duration-150">
                  
                    <ExternalLink size={16} />
                    View Website
                  </a>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-700 text-primary text-base">{proj?.title}</h3>
                  <span className="text-2xs font-600 px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 flex-shrink-0">
                    {proj?.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{proj?.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-600 rounded-xl hover:bg-primary/90 transition-all duration-150 active:scale-95">
            Start Your Project
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>);

}