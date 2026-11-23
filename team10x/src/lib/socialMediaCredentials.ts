// Social Media API Credentials — stored in localStorage (admin-only)
// For production, these should be stored server-side (env vars or encrypted DB)

export interface FacebookCredentials {
  appId: string;
  appSecret: string;
  pageAccessToken: string;
  pageId: string;
}

export interface InstagramCredentials {
  appId: string;
  appSecret: string;
  accessToken: string;
  instagramAccountId: string;
}

export interface LinkedInCredentials {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  organizationId: string; // URN e.g. urn:li:organization:12345
}

export interface YouTubeCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  channelId: string;
}

export interface SocialMediaCredentials {
  facebook: FacebookCredentials;
  instagram: InstagramCredentials;
  linkedin: LinkedInCredentials;
  youtube: YouTubeCredentials;
}

const CREDS_KEY = 'team10x_social_credentials';

export const defaultCredentials: SocialMediaCredentials = {
  facebook: { appId: '', appSecret: '', pageAccessToken: '', pageId: '' },
  instagram: { appId: '', appSecret: '', accessToken: '', instagramAccountId: '' },
  linkedin: { clientId: '', clientSecret: '', accessToken: '', organizationId: '' },
  youtube: { clientId: '', clientSecret: '', refreshToken: '', channelId: '' },
};

export function getSocialMediaCredentials(): SocialMediaCredentials {
  if (typeof window === 'undefined') return defaultCredentials;
  try {
    const stored = localStorage.getItem(CREDS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        facebook: { ...defaultCredentials.facebook, ...parsed.facebook },
        instagram: { ...defaultCredentials.instagram, ...parsed.instagram },
        linkedin: { ...defaultCredentials.linkedin, ...parsed.linkedin },
        youtube: { ...defaultCredentials.youtube, ...parsed.youtube },
      };
    }
  } catch {}
  return defaultCredentials;
}

export function saveSocialMediaCredentials(creds: SocialMediaCredentials): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}

export function isPlatformConfigured(platform: keyof SocialMediaCredentials, creds: SocialMediaCredentials): boolean {
  switch (platform) {
    case 'facebook':
      return !!(creds.facebook.pageAccessToken && creds.facebook.pageId);
    case 'instagram':
      return !!(creds.instagram.accessToken && creds.instagram.instagramAccountId);
    case 'linkedin':
      return !!(creds.linkedin.accessToken && creds.linkedin.organizationId);
    case 'youtube':
      return !!(creds.youtube.refreshToken && creds.youtube.channelId);
    default:
      return false;
  }
}
