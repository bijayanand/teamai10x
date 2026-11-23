import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PostComposerPanel from './components/PostComposerPanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import PlatformPreviewPanel from './components/PlatformPreviewPanel';

export default function SocialMediaPostComposerPage() {
  return (
    <AdminLayout currentPath="/social-media-post-composer">
      <div className="space-y-4">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Create Social Media Post</h1>
            <p className="text-sm text-admin-muted mt-0.5">Write once — publish to Facebook, Instagram & LinkedIn</p>
          </div>
        </div>

        {/* Three-panel layout */}
        <PostComposerLayout />
      </div>
    </AdminLayout>
  );
}

function PostComposerLayout() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
      {/* AI Assistant — left */}
      <div className="xl:col-span-3">
        <AIAssistantPanel />
      </div>
      {/* Composer — center */}
      <div className="xl:col-span-5">
        <PostComposerPanel />
      </div>
      {/* Previews — right */}
      <div className="xl:col-span-4">
        <PlatformPreviewPanel />
      </div>
    </div>
  );
}