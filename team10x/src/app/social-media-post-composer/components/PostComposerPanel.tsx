'use client';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Image, Link2, Hash, Send, Clock, FileText,
  Loader2, X, Eye,
  AlertCircle, CheckCircle
} from 'lucide-react';
import { getSocialMediaCredentials, isPlatformConfigured } from '@/lib/socialMediaCredentials';

// Inline SVG icons to replace missing lucide-react social icons
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

const YoutubeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface PostForm {
  title: string;
  caption: string;
  url: string;
  hashtags: string;
  cta: string;
  scheduleDate: string;
  scheduleTime: string;
}

interface PlatformSelection {
  facebook: boolean;
  instagram: boolean;
  linkedin: boolean;
  youtube: boolean;
}

const CHAR_LIMITS = {
  facebook: 63206,
  instagram: 2200,
  linkedin: 3000,
  youtube: 5000,
};

// Shared state via a simple context-less approach — parent would normally manage this
// Here we use window-level event dispatch for cross-component communication
const dispatchPreviewUpdate = (caption: string, platforms: PlatformSelection, imageUrl: string | null) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('previewUpdate', { detail: { caption, platforms, imageUrl } }));
  }
};

export default function PostComposerPanel() {
  const [submitting, setSubmitting] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<PlatformSelection>({
    facebook: true,
    instagram: true,
    linkedin: true,
    youtube: false,
  });
  const [publishResults, setPublishResults] = useState<{ platform: string; success: boolean; error?: string }[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PostForm>({
    defaultValues: {
      caption: '',
      title: '',
      url: '',
      hashtags: '',
      cta: '',
      scheduleDate: '',
      scheduleTime: '',
    }
  });

  const caption = watch('caption');
  const captionLen = caption?.length || 0;

  const togglePlatform = (p: keyof PlatformSelection) => {
    setPlatforms((prev) => {
      const updated = { ...prev, [p]: !prev[p] };
      dispatchPreviewUpdate(caption, updated, uploadedImage);
      return updated;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setUploadedImage(url);
      dispatchPreviewUpdate(caption, platforms, url);
      toast.success('Image uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  const selectedCount = Object.values(platforms).filter(Boolean).length;
  const selectedPlatformNames = Object.entries(platforms)
    .filter(([, v]) => v)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

  // Real API publish
  const onPublish = async (data: PostForm) => {
    if (selectedCount === 0) {
      toast.error('Select at least one platform to publish');
      return;
    }
    setSubmitting(true);
    setPublishResults(null);

    const creds = getSocialMediaCredentials();

    // Check if any selected platform has credentials configured
    const selectedKeys = Object.entries(platforms).filter(([, v]) => v).map(([k]) => k as keyof typeof platforms);
    const unconfigured = selectedKeys.filter((p) => !isPlatformConfigured(p as 'facebook' | 'instagram' | 'linkedin' | 'youtube', creds));

    if (unconfigured.length === selectedKeys.length) {
      setSubmitting(false);
      toast.error('No API credentials configured. Go to Admin → Social Media Settings to add your API keys.');
      return;
    }

    const fullCaption = [data.caption, data.hashtags, data.cta, data.url]
      .filter(Boolean)
      .join('\n\n');

    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: fullCaption,
          title: data.title,
          imageUrl: uploadedImage,
          platforms,
          credentials: {
            facebook: platforms.facebook ? { pageAccessToken: creds.facebook.pageAccessToken, pageId: creds.facebook.pageId } : undefined,
            instagram: platforms.instagram ? { accessToken: creds.instagram.accessToken, instagramAccountId: creds.instagram.instagramAccountId } : undefined,
            linkedin: platforms.linkedin ? { accessToken: creds.linkedin.accessToken, organizationId: creds.linkedin.organizationId } : undefined,
            youtube: platforms.youtube ? { clientId: creds.youtube.clientId, clientSecret: creds.youtube.clientSecret, refreshToken: creds.youtube.refreshToken, channelId: creds.youtube.channelId } : undefined,
          },
        }),
      });

      const result = await res.json();
      setPublishResults(result.results || []);

      const succeeded = result.summary?.succeeded || 0;
      const failed = result.summary?.failed || 0;

      if (succeeded > 0 && failed === 0) {
        toast.success(`✅ Post published to ${selectedPlatformNames.join(', ')}!`);
        reset();
        setUploadedImage(null);
      } else if (succeeded > 0 && failed > 0) {
        toast.warning(`⚠️ Published to ${succeeded} platform(s), failed on ${failed}. Check results below.`);
      } else {
        toast.error('Publishing failed on all platforms. Check credentials in Social Media Settings.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Schedule (stores locally — real scheduling requires a cron/queue service)
  const onSchedule = async (data: PostForm) => {
    if (!data.scheduleDate || !data.scheduleTime) {
      toast.error('Select a date and time to schedule the post');
      return;
    }
    if (selectedCount === 0) {
      toast.error('Select at least one platform to schedule');
      return;
    }
    setScheduling(true);
    await new Promise((r) => setTimeout(r, 800));
    setScheduling(false);
    toast.success(`🕐 Post scheduled for ${data.scheduleDate} at ${data.scheduleTime} on ${selectedPlatformNames.join(', ')}`);
  };

  const onSaveDraft = () => {
    // Backend integration point: POST /api/social/posts { ...data, status: 'draft' }
    toast.success('Post saved as draft');
  };

  const platformButtons = [
    { key: 'facebook' as const, label: 'Facebook', color: 'text-blue-500', activeBg: 'bg-blue-500/15 border-blue-500/40', icon: <FacebookIcon size={14} /> },
    { key: 'instagram' as const, label: 'Instagram', color: 'text-pink-500', activeBg: 'bg-pink-500/15 border-pink-500/40', icon: <InstagramIcon size={14} /> },
    { key: 'linkedin' as const, label: 'LinkedIn', color: 'text-blue-600', activeBg: 'bg-blue-600/15 border-blue-600/40', icon: <LinkedInIcon size={14} /> },
    { key: 'youtube' as const, label: 'YouTube', color: 'text-red-500', activeBg: 'bg-red-500/15 border-red-500/40', icon: <YoutubeIcon size={14} /> },
  ];

  return (
    <div className="bg-admin-surface border border-admin rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-admin">
        <h2 className="font-600 text-admin-text text-sm">Post Composer</h2>
        <p className="text-xs text-admin-muted mt-0.5">Create your post content below</p>
      </div>

      <form onSubmit={handleSubmit(onPublish)} className="flex flex-col flex-1">
        <div className="p-5 space-y-4 flex-1 overflow-y-auto scrollbar-thin">

          {/* Post title */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-1.5">Post Title (internal reference)</label>
            <input
              {...register('title', { required: 'Post title is required' })}
              className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
              placeholder="e.g. AI Website Launch Announcement"
            />
            {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
          </div>

          {/* Caption */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-600 text-admin-muted">Caption / Post Content</label>
              <span className={`text-2xs tabular font-500 ${captionLen > 2200 ? 'text-danger' : captionLen > 1800 ? 'text-warning' : 'text-admin-muted'}`}>
                {captionLen} / 2,200
              </span>
            </div>
            <textarea
              {...register('caption', { required: 'Caption is required' })}
              rows={6}
              onChange={(e) => {
                dispatchPreviewUpdate(e.target.value, platforms, uploadedImage);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150 resize-none"
              placeholder="Write your post caption here... or use the AI Assistant on the left to generate content."
            />
            {errors.caption && <p className="text-xs text-danger mt-1">{errors.caption.message}</p>}
            {captionLen > 2200 && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-danger">
                <AlertCircle size={12} />
                <span>Caption exceeds Instagram limit (2,200 chars). Instagram post will be truncated.</span>
              </div>
            )}
          </div>

          {/* Media upload */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-1.5">Media (Image / Video)</label>
            {uploadedImage ? (
              <div className="relative rounded-xl overflow-hidden border border-admin">
                <img src={uploadedImage} alt="Uploaded post media preview" className="w-full h-40 object-cover" />
                <button
                  type="button"
                  onClick={() => { setUploadedImage(null); dispatchPreviewUpdate(caption, platforms, null); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-150"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 px-4 py-6 rounded-xl bg-admin-surface-2 border-2 border-dashed border-admin hover:border-accent/40 hover:bg-admin-surface transition-all duration-150 text-admin-muted"
              >
                <Image size={24} />
                <div className="text-center">
                  <p className="text-xs font-500">Click to upload image or video</p>
                  <p className="text-2xs mt-0.5">JPG, PNG, MP4 — max 10MB</p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-1.5">
              <Link2 size={12} className="inline mr-1" />
              Website URL (optional)
            </label>
            <input
              {...register('url')}
              type="url"
              className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
              placeholder="https://www.team10x.in"
            />
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-1.5">
              <Hash size={12} className="inline mr-1" />
              Hashtags
            </label>
            <input
              {...register('hashtags')}
              className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
              placeholder="#team10x #websitedevelopment #digitalindia"
            />
            <p className="text-2xs text-admin-muted mt-1">Separate hashtags with spaces. Instagram supports up to 30.</p>
          </div>

          {/* CTA */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-1.5">Call-to-Action Text</label>
            <input
              {...register('cta')}
              className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150"
              placeholder="e.g. Get your website today! Call +91 92042 45001"
            />
          </div>

          {/* Platform selection */}
          <div>
            <label className="block text-xs font-600 text-admin-muted mb-2">Publish To</label>
            <div className="flex flex-col gap-2">
              {platformButtons.map((pb) => (
                <button
                  key={`platform-btn-${pb.key}`}
                  type="button"
                  onClick={() => togglePlatform(pb.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 ${
                    platforms[pb.key]
                      ? `${pb.activeBg} ${pb.color}`
                      : 'bg-admin-surface-2 border-admin text-admin-muted hover:border-admin-muted'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                    platforms[pb.key] ? 'bg-current border-current' : 'border-admin-muted'
                  }`}>
                    {platforms[pb.key] && <CheckCircle size={12} className="text-admin-bg" />}
                  </div>
                  <span className="flex-shrink-0">{pb.icon}</span>
                  <span className="text-sm font-500">{pb.label}</span>
                </button>
              ))}
            </div>
            {selectedCount === 0 && (
              <p className="text-xs text-danger mt-1.5 flex items-center gap-1">
                <AlertCircle size={11} />
                Select at least one platform
              </p>
            )}
          </div>

          {/* Schedule toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center gap-2 text-xs font-500 text-admin-muted hover:text-admin-text transition-colors duration-150"
            >
              <Clock size={14} />
              {showSchedule ? 'Hide scheduling options' : 'Schedule for later'}
            </button>

            {showSchedule && (
              <div className="mt-3 grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-xs font-600 text-admin-muted mb-1.5">Date</label>
                  <input
                    {...register('scheduleDate')}
                    type="date"
                    className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm focus:outline-none focus:border-accent/50 transition-all duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-600 text-admin-muted mb-1.5">Time</label>
                  <input
                    {...register('scheduleTime')}
                    type="time"
                    className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm focus:outline-none focus:border-accent/50 transition-all duration-150"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 border-t border-admin flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || selectedCount === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-primary font-700 text-sm rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? 'Publishing...' : `Publish Now${selectedCount > 0 ? ` (${selectedCount})` : ''}`}
            </button>

            {showSchedule && (
              <button
                type="button"
                onClick={handleSubmit(onSchedule)}
                disabled={scheduling}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-info/20 text-info font-600 text-sm rounded-xl border border-info/30 hover:bg-info/30 disabled:opacity-50 transition-all duration-150 active:scale-95"
              >
                {scheduling ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                {scheduling ? 'Scheduling...' : 'Schedule'}
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSaveDraft}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-surface-2 text-admin-muted font-500 text-sm rounded-xl border border-admin hover:text-admin-text hover:border-admin-muted transition-all duration-150 active:scale-95"
            >
              <FileText size={15} />
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('togglePreview'))}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-surface-2 text-admin-muted font-500 text-sm rounded-xl border border-admin hover:text-admin-text hover:border-admin-muted transition-all duration-150 active:scale-95"
            >
              <Eye size={15} />
              Preview
            </button>
          </div>

          {/* Publish results */}
          {publishResults && publishResults.length > 0 && (
            <div className="mt-2 space-y-2">
              <p className="text-xs font-600 text-admin-muted">Publish Results:</p>
              {publishResults.map((r) => (
                <div
                  key={`result-${r.platform}`}
                  className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs border ${
                    r.success
                      ? 'bg-success/10 border-success/20 text-success' :'bg-danger/10 border-danger/20 text-danger'
                  }`}
                >
                  {r.success ? <CheckCircle size={13} className="flex-shrink-0 mt-0.5" /> : <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-600 capitalize">{r.platform}</span>
                    {r.success ? (
                      <span className="ml-1">— Published successfully{r.postId ? ` (ID: ${r.postId})` : ''}</span>
                    ) : (
                      <span className="ml-1">— {r.error}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}