'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Save, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink, RefreshCw, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  getSocialMediaCredentials,
  saveSocialMediaCredentials,
  SocialMediaCredentials,
  isPlatformConfigured,
} from '@/lib/socialMediaCredentials';

// ─── SVG Platform Icons ───────────────────────────────────────────────────────
const FacebookIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// ─── Reusable credential field ────────────────────────────────────────────────
function CredentialField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  secret = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  secret?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-xs font-600 text-admin-muted mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={secret && !show ? 'password' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-150 pr-10"
        />
        {secret && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors"
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {hint && <p className="text-2xs text-admin-muted mt-1">{hint}</p>}
    </div>
  );
}

// ─── Platform card wrapper ────────────────────────────────────────────────────
function PlatformCard({
  title,
  icon,
  color,
  configured,
  docsUrl,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  configured: boolean;
  docsUrl: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-admin-surface border border-admin rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-admin hover:bg-admin-surface-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={color}>{icon}</span>
          <div className="text-left">
            <h3 className="font-600 text-admin-text text-sm">{title}</h3>
            <p className="text-2xs text-admin-muted mt-0.5">API Credentials</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {configured ? (
            <span className="flex items-center gap-1.5 text-xs text-success font-500">
              <CheckCircle size={13} />
              Configured
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-warning font-500">
              <AlertCircle size={13} />
              Not configured
            </span>
          )}
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-admin-muted hover:text-accent transition-colors"
            title="View API docs"
          >
            <ExternalLink size={13} />
          </a>
          <span className={`text-admin-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </button>
      {expanded && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminSocialSettingsPage() {
  const [creds, setCreds] = useState<SocialMediaCredentials>({
    facebook: { appId: '', appSecret: '', pageAccessToken: '', pageId: '' },
    instagram: { appId: '', appSecret: '', accessToken: '', instagramAccountId: '' },
    linkedin: { clientId: '', clientSecret: '', accessToken: '', organizationId: '' },
    youtube: { clientId: '', clientSecret: '', refreshToken: '', channelId: '' },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCreds(getSocialMediaCredentials());
  }, []);

  const updateFacebook = (key: keyof typeof creds.facebook, value: string) => {
    setCreds((prev) => ({ ...prev, facebook: { ...prev.facebook, [key]: value } }));
  };
  const updateInstagram = (key: keyof typeof creds.instagram, value: string) => {
    setCreds((prev) => ({ ...prev, instagram: { ...prev.instagram, [key]: value } }));
  };
  const updateLinkedIn = (key: keyof typeof creds.linkedin, value: string) => {
    setCreds((prev) => ({ ...prev, linkedin: { ...prev.linkedin, [key]: value } }));
  };
  const updateYouTube = (key: keyof typeof creds.youtube, value: string) => {
    setCreds((prev) => ({ ...prev, youtube: { ...prev.youtube, [key]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    saveSocialMediaCredentials(creds);
    setSaving(false);
    toast.success('API credentials saved successfully');
  };

  const fbConfigured = isPlatformConfigured('facebook', creds);
  const igConfigured = isPlatformConfigured('instagram', creds);
  const liConfigured = isPlatformConfigured('linkedin', creds);
  const ytConfigured = isPlatformConfigured('youtube', creds);

  return (
    <AdminLayout currentPath="/admin-social-settings">
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Social Media API Settings</h1>
            <p className="text-sm text-admin-muted mt-0.5">
              Enter your API credentials to enable real publishing to each platform
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-700 text-sm rounded-xl hover:bg-yellow-400 disabled:opacity-60 transition-all duration-150 active:scale-95"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 px-4 py-3 bg-info/10 border border-info/20 rounded-xl text-xs text-info">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-600 mb-0.5">Credentials are stored locally in your browser</p>
            <p className="text-info/80">
              For production use, move credentials to server-side environment variables. Credentials are only sent to the API when publishing a post.
            </p>
          </div>
        </div>

        {/* ── Facebook ── */}
        <PlatformCard
          title="Facebook"
          icon={<FacebookIcon />}
          color="text-blue-500"
          configured={fbConfigured}
          docsUrl="https://developers.facebook.com/docs/pages/getting-started"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CredentialField
              label="App ID"
              value={creds.facebook.appId}
              onChange={(v) => updateFacebook('appId', v)}
              placeholder="123456789012345"
              hint="From Facebook Developer App"
            />
            <CredentialField
              label="App Secret"
              value={creds.facebook.appSecret}
              onChange={(v) => updateFacebook('appSecret', v)}
              placeholder="abc123..."
              secret
              hint="Keep this private"
            />
            <CredentialField
              label="Page Access Token *"
              value={creds.facebook.pageAccessToken}
              onChange={(v) => updateFacebook('pageAccessToken', v)}
              placeholder="EAABsbCS..."
              secret
              hint="Long-lived page access token (required)"
            />
            <CredentialField
              label="Page ID *"
              value={creds.facebook.pageId}
              onChange={(v) => updateFacebook('pageId', v)}
              placeholder="123456789"
              hint="Your Facebook Page numeric ID (required)"
            />
          </div>
          <div className="text-2xs text-admin-muted bg-admin-surface-2 rounded-lg px-3 py-2 border border-admin">
            <strong>Setup:</strong> Create a Facebook App → Add Pages product → Generate a long-lived Page Access Token via Graph API Explorer. Requires <code>pages_manage_posts</code> permission.
          </div>
        </PlatformCard>

        {/* ── Instagram ── */}
        <PlatformCard
          title="Instagram Business"
          icon={<InstagramIcon />}
          color="text-pink-500"
          configured={igConfigured}
          docsUrl="https://developers.facebook.com/docs/instagram-api/getting-started"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CredentialField
              label="App ID"
              value={creds.instagram.appId}
              onChange={(v) => updateInstagram('appId', v)}
              placeholder="123456789012345"
              hint="Same Facebook App ID (Instagram uses Facebook API)"
            />
            <CredentialField
              label="App Secret"
              value={creds.instagram.appSecret}
              onChange={(v) => updateInstagram('appSecret', v)}
              placeholder="abc123..."
              secret
            />
            <CredentialField
              label="Access Token *"
              value={creds.instagram.accessToken}
              onChange={(v) => updateInstagram('accessToken', v)}
              placeholder="EAABsbCS..."
              secret
              hint="Long-lived user access token with instagram_basic, instagram_content_publish (required)"
            />
            <CredentialField
              label="Instagram Account ID *"
              value={creds.instagram.instagramAccountId}
              onChange={(v) => updateInstagram('instagramAccountId', v)}
              placeholder="17841400000000000"
              hint="Instagram Business Account ID (required)"
            />
          </div>
          <div className="text-2xs text-admin-muted bg-admin-surface-2 rounded-lg px-3 py-2 border border-admin">
            <strong>Setup:</strong> Connect Instagram Business account to a Facebook Page. Use Graph API Explorer to get the Instagram Account ID via <code>/me/accounts</code> then <code>/{"{"}page-id{"}"}/instagram_accounts</code>. Requires <code>instagram_content_publish</code> permission. Image must be a public URL.
          </div>
        </PlatformCard>

        {/* ── LinkedIn ── */}
        <PlatformCard
          title="LinkedIn"
          icon={<LinkedInIcon />}
          color="text-blue-600"
          configured={liConfigured}
          docsUrl="https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CredentialField
              label="Client ID"
              value={creds.linkedin.clientId}
              onChange={(v) => updateLinkedIn('clientId', v)}
              placeholder="86abcdef12345"
              hint="From LinkedIn Developer App"
            />
            <CredentialField
              label="Client Secret"
              value={creds.linkedin.clientSecret}
              onChange={(v) => updateLinkedIn('clientSecret', v)}
              placeholder="abc123..."
              secret
            />
            <CredentialField
              label="Access Token *"
              value={creds.linkedin.accessToken}
              onChange={(v) => updateLinkedIn('accessToken', v)}
              placeholder="AQX..."
              secret
              hint="OAuth 2.0 access token with w_member_social or w_organization_social (required)"
            />
            <CredentialField
              label="Organization ID *"
              value={creds.linkedin.organizationId}
              onChange={(v) => updateLinkedIn('organizationId', v)}
              placeholder="12345678 or urn:li:organization:12345678"
              hint="LinkedIn Company Page numeric ID (required)"
            />
          </div>
          <div className="text-2xs text-admin-muted bg-admin-surface-2 rounded-lg px-3 py-2 border border-admin">
            <strong>Setup:</strong> Create a LinkedIn App → Request <code>w_organization_social</code> permission → Authorize via OAuth 2.0 to get access token. Organization ID is the numeric ID from your Company Page URL.
          </div>
        </PlatformCard>

        {/* ── YouTube ── */}
        <PlatformCard
          title="YouTube"
          icon={<YouTubeIcon />}
          color="text-red-500"
          configured={ytConfigured}
          docsUrl="https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CredentialField
              label="Client ID"
              value={creds.youtube.clientId}
              onChange={(v) => updateYouTube('clientId', v)}
              placeholder="123456789-abc.apps.googleusercontent.com"
              hint="From Google Cloud Console OAuth 2.0 credentials"
            />
            <CredentialField
              label="Client Secret"
              value={creds.youtube.clientSecret}
              onChange={(v) => updateYouTube('clientSecret', v)}
              placeholder="GOCSPX-..."
              secret
            />
            <CredentialField
              label="Refresh Token *"
              value={creds.youtube.refreshToken}
              onChange={(v) => updateYouTube('refreshToken', v)}
              placeholder="1//0g..."
              secret
              hint="Long-lived refresh token from OAuth flow (required)"
            />
            <CredentialField
              label="Channel ID *"
              value={creds.youtube.channelId}
              onChange={(v) => updateYouTube('channelId', v)}
              placeholder="UCxxxxxxxxxxxxxxxxxxxxxx"
              hint="Your YouTube Channel ID (required)"
            />
          </div>
          <div className="text-2xs text-admin-muted bg-admin-surface-2 rounded-lg px-3 py-2 border border-admin">
            <strong>Setup:</strong> Enable YouTube Data API v3 in Google Cloud Console → Create OAuth 2.0 credentials → Run OAuth flow with <code>https://www.googleapis.com/auth/youtube</code> scope to get refresh token. Channel ID is in YouTube Studio → Settings → Channel → Advanced.
            <br /><strong>Note:</strong> Community Posts require 500+ subscribers on the channel.
          </div>
        </PlatformCard>

        {/* Save button bottom */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-700 text-sm rounded-xl hover:bg-yellow-400 disabled:opacity-60 transition-all duration-150 active:scale-95"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving...' : 'Save All Credentials'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
