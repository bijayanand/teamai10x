'use client';
import React from 'react';
import Link from 'next/link';
import { PlusSquare, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardQuickActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toast?.success('Dashboard refreshed')}
        className="p-2 rounded-lg text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text border border-admin transition-all duration-150 active:scale-95"
        title="Refresh dashboard"
      >
        <RefreshCw size={16} />
      </button>
      <Link
        href="/social-media-post-composer"
        className="flex items-center gap-2 px-4 py-2 bg-accent text-primary font-600 text-sm rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
      >
        <PlusSquare size={16} />
        Create Post
      </Link>
    </div>
  );
}