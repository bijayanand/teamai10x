import { NextRequest, NextResponse } from 'next/server';

interface PublishRequest {
  caption: string;
  title?: string;
  url?: string;
  hashtags?: string;
  cta?: string;
  imageUrl?: string | null;
  platforms: {
    facebook?: boolean;
    instagram?: boolean;
    linkedin?: boolean;
    youtube?: boolean;
  };
  credentials: {
    facebook?: { pageAccessToken: string; pageId: string };
    instagram?: { accessToken: string; instagramAccountId: string };
    linkedin?: { accessToken: string; organizationId: string };
    youtube?: { refreshToken: string; channelId: string; clientId: string; clientSecret: string };
  };
}

interface PlatformResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
}

// ─── Facebook Graph API ───────────────────────────────────────────────────────
async function publishToFacebook(
  caption: string,
  imageUrl: string | null | undefined,
  pageAccessToken: string,
  pageId: string
): Promise<PlatformResult> {
  try {
    const fullCaption = caption;
    let endpoint: string;
    let body: Record<string, string>;

    if (imageUrl && imageUrl.startsWith('http')) {
      // Post with image URL
      endpoint = `https://graph.facebook.com/v19.0/${pageId}/photos`;
      body = {
        url: imageUrl,
        caption: fullCaption,
        access_token: pageAccessToken,
      };
    } else {
      // Text-only post
      endpoint = `https://graph.facebook.com/v19.0/${pageId}/feed`;
      body = {
        message: fullCaption,
        access_token: pageAccessToken,
      };
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return { platform: 'facebook', success: false, error: data.error?.message || 'Facebook API error' };
    }

    return { platform: 'facebook', success: true, postId: data.id || data.post_id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { platform: 'facebook', success: false, error: message };
  }
}

// ─── Instagram Business API ───────────────────────────────────────────────────
async function publishToInstagram(
  caption: string,
  imageUrl: string | null | undefined,
  accessToken: string,
  instagramAccountId: string
): Promise<PlatformResult> {
  try {
    if (!imageUrl || !imageUrl.startsWith('http')) {
      return {
        platform: 'instagram',
        success: false,
        error: 'Instagram requires a publicly accessible image URL. Base64 images are not supported.',
      };
    }

    // Step 1: Create media container
    const containerRes = await fetch(
      `https://graph.facebook.com/v19.0/${instagramAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }),
      }
    );

    const containerData = await containerRes.json();

    if (!containerRes.ok || containerData.error) {
      return { platform: 'instagram', success: false, error: containerData.error?.message || 'Failed to create media container' };
    }

    const creationId = containerData.id;

    // Step 2: Publish the container
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${instagramAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: accessToken,
        }),
      }
    );

    const publishData = await publishRes.json();

    if (!publishRes.ok || publishData.error) {
      return { platform: 'instagram', success: false, error: publishData.error?.message || 'Failed to publish to Instagram' };
    }

    return { platform: 'instagram', success: true, postId: publishData.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { platform: 'instagram', success: false, error: message };
  }
}

// ─── LinkedIn API ─────────────────────────────────────────────────────────────
async function publishToLinkedIn(
  caption: string,
  imageUrl: string | null | undefined,
  accessToken: string,
  organizationId: string
): Promise<PlatformResult> {
  try {
    // Normalize org URN
    const authorUrn = organizationId.startsWith('urn:li:')
      ? organizationId
      : `urn:li:organization:${organizationId}`;

    let shareContent: Record<string, unknown>;

    if (imageUrl && imageUrl.startsWith('http')) {
      shareContent = {
        shareCommentary: { text: caption },
        shareMediaCategory: 'IMAGE',
        media: [
          {
            status: 'READY',
            description: { text: caption.substring(0, 200) },
            media: imageUrl,
            title: { text: 'Post Image' },
          },
        ],
      };
    } else {
      shareContent = {
        shareCommentary: { text: caption },
        shareMediaCategory: 'NONE',
      };
    }

    let body = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': shareContent,
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return { platform: 'linkedin', success: false, error: data.message || data.serviceErrorCode?.toString() || 'LinkedIn API error' };
    }

    return { platform: 'linkedin', success: true, postId: data.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { platform: 'linkedin', success: false, error: message };
  }
}

// ─── YouTube Data API v3 ──────────────────────────────────────────────────────
async function getYouTubeAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || 'Failed to refresh YouTube access token');
  }
  return data.access_token;
}

async function publishToYouTube(
  caption: string,
  title: string | undefined,
  imageUrl: string | null | undefined,
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  channelId: string
): Promise<PlatformResult> {
  try {
    // YouTube requires an actual video file — for text/image posts we create a Community post
    // Community posts use the YouTube Data API activities endpoint
    const accessToken = await getYouTubeAccessToken(clientId, clientSecret, refreshToken);

    let body: Record<string, unknown> = {
      snippet: {
        description: caption,
        channelId: channelId,
      },
      contentDetails: {
        bulletin: {
          resourceId: {},
        },
      },
    };

    // Try community post (bulletin) via activities
    const res = await fetch(
      'https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      // Community posts may not be available for all channels
      const errMsg = data.error?.message || 'YouTube API error';
      return {
        platform: 'youtube',
        success: false,
        error: `${errMsg}. Note: YouTube Community Posts require a channel with 500+ subscribers.`,
      };
    }

    return { platform: 'youtube', success: true, postId: data.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { platform: 'youtube', success: false, error: message };
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    let body: PublishRequest = await req.json();
    const { caption, title, imageUrl, platforms, credentials } = body;

    if (!caption?.trim()) {
      return NextResponse.json({ error: 'Caption is required' }, { status: 400 });
    }

    const results: PlatformResult[] = [];
    const tasks: Promise<PlatformResult>[] = [];

    if (platforms.facebook && credentials.facebook?.pageAccessToken && credentials.facebook?.pageId) {
      tasks.push(
        publishToFacebook(caption, imageUrl, credentials.facebook.pageAccessToken, credentials.facebook.pageId)
      );
    } else if (platforms.facebook) {
      results.push({ platform: 'facebook', success: false, error: 'Facebook credentials not configured' });
    }

    if (platforms.instagram && credentials.instagram?.accessToken && credentials.instagram?.instagramAccountId) {
      tasks.push(
        publishToInstagram(caption, imageUrl, credentials.instagram.accessToken, credentials.instagram.instagramAccountId)
      );
    } else if (platforms.instagram) {
      results.push({ platform: 'instagram', success: false, error: 'Instagram credentials not configured' });
    }

    if (platforms.linkedin && credentials.linkedin?.accessToken && credentials.linkedin?.organizationId) {
      tasks.push(
        publishToLinkedIn(caption, imageUrl, credentials.linkedin.accessToken, credentials.linkedin.organizationId)
      );
    } else if (platforms.linkedin) {
      results.push({ platform: 'linkedin', success: false, error: 'LinkedIn credentials not configured' });
    }

    if (
      platforms.youtube &&
      credentials.youtube?.refreshToken &&
      credentials.youtube?.channelId &&
      credentials.youtube?.clientId &&
      credentials.youtube?.clientSecret
    ) {
      tasks.push(
        publishToYouTube(
          caption,
          title,
          imageUrl,
          credentials.youtube.clientId,
          credentials.youtube.clientSecret,
          credentials.youtube.refreshToken,
          credentials.youtube.channelId
        )
      );
    } else if (platforms.youtube) {
      results.push({ platform: 'youtube', success: false, error: 'YouTube credentials not configured' });
    }

    const taskResults = await Promise.allSettled(tasks);
    taskResults.forEach((r) => {
      if (r.status === 'fulfilled') results.push(r.value);
      else results.push({ platform: 'unknown', success: false, error: r.reason?.message || 'Task failed' });
    });

    const successes = results.filter((r) => r.success);
    const failures = results.filter((r) => !r.success);

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        succeeded: successes.length,
        failed: failures.length,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
