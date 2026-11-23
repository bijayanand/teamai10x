import React from 'react';

const categories = [
  { id: 'cat-schools', emoji: '🏫', label: 'Schools' },
  { id: 'cat-colleges', emoji: '🎓', label: 'Colleges' },
  { id: 'cat-institutions', emoji: '🏢', label: 'Institutions' },
  { id: 'cat-coaching', emoji: '📚', label: 'Coaching Centers' },
  { id: 'cat-orgs', emoji: '🏥', label: 'Organizations' },
  { id: 'cat-ngos', emoji: '🌐', label: 'NGOs' },
  { id: 'cat-businesses', emoji: '💼', label: 'Businesses' },
  { id: 'cat-startups', emoji: '🚀', label: 'Startups' },
  { id: 'cat-govt', emoji: '🏛️', label: 'Govt / Professional Bodies' },
  { id: 'cat-other', emoji: '📈', label: 'Other Entities' },
];

export default function ClientCategoriesSection() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <p className="text-center text-sm font-600 text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by organizations across India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories?.map((cat) => (
            <div
              key={cat?.id}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary border border-border hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 cursor-default"
            >
              <span className="text-lg">{cat?.emoji}</span>
              <span className="text-sm font-500 text-foreground">{cat?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}