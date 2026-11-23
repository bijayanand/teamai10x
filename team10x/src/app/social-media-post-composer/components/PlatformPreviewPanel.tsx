'use client';
import React, { useState, useEffect } from 'react';
import { Eye, AlertTriangle } from 'lucide-react';

interface PreviewData {
  caption: string;
  platforms: { facebook: boolean; instagram: boolean; linkedin: boolean };
  imageUrl: string | null;
}

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CHAR_LIMITS = {
  facebook: 63206,
  instagram: 2200,
  linkedin: 3000,
};

const platformConfig = [
  {
    key: 'facebook' as const,
    label: 'Facebook',
    icon: <FacebookIcon size={14} />,
    color: 'text-facebook',
    bg: 'bg-facebook/10',
    border: 'border-facebook/20',
    headerBg: 'bg-facebook',
    limit: CHAR_LIMITS.facebook,
    note: 'Link preview will show below post',
  },
  {
    key: 'instagram' as const,
    label: 'Instagram',
    icon: <InstagramIcon size={14} />,
    color: 'text-instagram',
    bg: 'bg-instagram/10',
    border: 'border-instagram/20',
    headerBg: 'bg-instagram',
    limit: CHAR_LIMITS.instagram,
    note: 'Image required for best reach. Links not clickable in captions.',
  },
  {
    key: 'linkedin' as const,
    label: 'LinkedIn',
    icon: <LinkedInIcon size={14} />,
    color: 'text-linkedin',
    bg: 'bg-linkedin/10',
    border: 'border-linkedin/20',
    headerBg: 'bg-linkedin',
    limit: CHAR_LIMITS.linkedin,
    note: 'Professional tone recommended. Link preview supported.',
  },
];

function truncateForPlatform(caption: string, limit: number): { text: string; truncated: boolean } {
  if (caption.length <= limit) return { text: caption, truncated: false };
  return { text: caption.slice(0, limit - 3) + '...', truncated: true };
}

export default function PlatformPreviewPanel() {
  const [preview, setPreview] = useState<PreviewData>({
    caption: 'Your post content will appear here as you type in the composer...\n\nPlatform-specific previews update in real time.',
    platforms: { facebook: true, instagram: true, linkedin: true },
    imageUrl: null,
  });
  const [activeTab, setActiveTab] = useState<'facebook' | 'instagram' | 'linkedin'>('facebook');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as PreviewData;
      setPreview(detail);
      const firstActive = Object.entries(detail.platforms).find(([, v]) => v)?.[0] as 'facebook' | 'instagram' | 'linkedin' | undefined;
      if (firstActive) setActiveTab(firstActive);
    };
    window.addEventListener('previewUpdate', handler);
    return () => window.removeEventListener('previewUpdate', handler);
  }, []);

  const activePlatforms = platformConfig.filter((p) => preview.platforms[p.key]);
  const currentPlatform = platformConfig.find((p) => p.key === activeTab);
  const { text: displayCaption, truncated } = truncateForPlatform(
    preview.caption,
    currentPlatform?.limit ?? 2200
  );

  return (
    <div className="bg-admin-surface border border-admin rounded-2xl flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-admin">
        <div className="flex items-center gap-2 mb-1">
          <Eye size={15} className="text-admin-muted" />
          <h2 className="font-600 text-admin-text text-sm">Platform Previews</h2>
        </div>
        <p className="text-xs text-admin-muted">Live preview — updates as you type</p>
      </div>

      {/* Platform tabs */}
      <div className="flex border-b border-admin">
        {activePlatforms.length > 0 ? activePlatforms.map((p) => (
          <button
            key={`tab-prev-${p.key}`}
            onClick={() => setActiveTab(p.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-600 transition-all duration-150 border-b-2 ${
              activeTab === p.key
                ? `${p.color} border-current`
                : 'text-admin-muted border-transparent hover:text-admin-text'
            }`}
          >
            {p.icon}
            <span className="hidden sm:inline">{p.label}</span>
          </button>
        )) : (
          <div className="flex-1 flex items-center justify-center py-3 text-xs text-admin-muted">
            No platforms selected
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {activePlatforms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <AlertTriangle size={32} className="text-admin-muted mb-3" />
            <p className="text-sm font-500 text-admin-text">No platforms selected</p>
            <p className="text-xs text-admin-muted mt-1">Select at least one platform in the composer</p>
          </div>
        ) : currentPlatform ? (
          <div className="space-y-3">
            {/* Mock post card */}
            <div className="rounded-2xl overflow-hidden border border-admin bg-admin-bg">
              {/* Platform header */}
              <div className={`${currentPlatform.headerBg} px-4 py-2 flex items-center gap-2`}>
                <div className="w-5 h-5 text-white">{currentPlatform.icon}</div>
                <span className="text-xs font-600 text-white">{currentPlatform.label} Preview</span>
              </div>

              {/* Post header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-admin">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-primary font-700 text-xs flex-shrink-0">
                  T10
                </div>
                <div>
                  <p className="text-xs font-600 text-admin-text">Team10x.in</p>
                  <p className="text-2xs text-admin-muted">Just now · 🌐</p>
                </div>
              </div>

              {/* Caption */}
              <div className="px-4 py-3">
                <p className="text-xs text-admin-text leading-relaxed whitespace-pre-wrap">
                  {displayCaption || <span className="text-admin-muted italic">Your caption will appear here...</span>}
                </p>
                {truncated && (
                  <button className={`text-xs font-600 mt-1 ${currentPlatform.color}`}>
                    See more
                  </button>
                )}
              </div>

              {/* Image */}
              {preview.imageUrl && (
                <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-admin">
                  <img
                    src={preview.imageUrl}
                    alt="Post media preview showing uploaded image for social media post"
                    className="w-full object-cover"
                    style={{ maxHeight: 200 }}
                  />
                </div>
              )}

              {/* Engagement mock */}
              <div className="px-4 py-3 border-t border-admin flex items-center gap-4">
                {currentPlatform.key === 'facebook' && (
                  <>
                    <span className="text-2xs text-admin-muted">👍 Like</span>
                    <span className="text-2xs text-admin-muted">💬 Comment</span>
                    <span className="text-2xs text-admin-muted">↗ Share</span>
                  </>
                )}
                {currentPlatform.key === 'instagram' && (
                  <>
                    <span className="text-2xs text-admin-muted">♥ Like</span>
                    <span className="text-2xs text-admin-muted">💬 Comment</span>
                    <span className="text-2xs text-admin-muted">✈ Send</span>
                    <span className="text-2xs text-admin-muted ml-auto">🔖</span>
                  </>
                )}
                {currentPlatform.key === 'linkedin' && (
                  <>
                    <span className="text-2xs text-admin-muted">👍 Like</span>
                    <span className="text-2xs text-admin-muted">💬 Comment</span>
                    <span className="text-2xs text-admin-muted">↗ Repost</span>
                    <span className="text-2xs text-admin-muted">✉ Send</span>
                  </>
                )}
              </div>
            </div>

            {/* Character count */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${currentPlatform.bg} border ${currentPlatform.border}`}>
              <span className={`text-xs font-600 ${currentPlatform.color}`}>Character Count</span>
              <span className={`text-xs tabular font-700 ${preview.caption.length > currentPlatform.limit ? 'text-danger' : currentPlatform.color}`}>
                {preview.caption.length} / {currentPlatform.limit.toLocaleString()}
              </span>
            </div>

            {/* Platform note */}
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin">
              <AlertTriangle size={12} className="text-admin-muted flex-shrink-0 mt-0.5" />
              <p className="text-2xs text-admin-muted leading-relaxed">{currentPlatform.note}</p>
            </div>

            {/* Truncation warning */}
            {truncated && (
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-danger-subtle border border-danger/20">
                <AlertTriangle size={12} className="text-danger flex-shrink-0 mt-0.5" />
                <p className="text-2xs text-danger leading-relaxed">
                  Caption exceeds {currentPlatform.label} limit. It will be truncated at {currentPlatform.limit.toLocaleString()} characters.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}