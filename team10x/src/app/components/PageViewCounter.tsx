'use client';
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function PageViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment on mount, then display
    fetch('/api/pageviews', { method: 'POST' })?.then((r) => r?.json())?.then((data) => setCount(data?.count))?.catch(() => {
        // Fallback: just read
        fetch('/api/pageviews')?.then((r) => r?.json())?.then((data) => setCount(data?.count))?.catch(() => setCount(null));
      });
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      <Eye size={14} className="text-accent" />
      <span className="text-xs font-500 text-white/60">
        <span className="text-accent font-700 tabular">{count?.toLocaleString()}</span>
        {' '}page views
      </span>
    </div>
  );
}
