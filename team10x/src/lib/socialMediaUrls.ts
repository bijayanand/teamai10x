export interface SocialMediaUrls {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

const STORAGE_KEY = 'team10x_social_urls';

export const defaultSocialUrls: SocialMediaUrls = {
  facebook: '',
  instagram: '',
  linkedin: '',
  youtube: '',
};

export function getSocialMediaUrls(): SocialMediaUrls {
  if (typeof window === 'undefined') return defaultSocialUrls;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultSocialUrls, ...JSON.parse(stored) };
  } catch {}
  return defaultSocialUrls;
}

export function saveSocialMediaUrls(urls: SocialMediaUrls): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}
