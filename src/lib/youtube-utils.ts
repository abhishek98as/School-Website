/**
 * YouTube URL utilities for parsing and validating YouTube video URLs
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param url - YouTube URL or video ID
 * @returns Video ID or empty string if invalid
 */
export function getYouTubeId(url: string): string {
  if (!url) return '';
  
  let videoId = '';
  try {
    // Handle full YouTube URLs
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v') || '';
    } 
    // Handle youtu.be URLs
    else if (url.includes('youtu.be/')) {
      const urlObj = new URL(url);
      // Extract the path after the domain, removing the leading slash
      const path = urlObj.pathname.substring(1);
      // Remove any additional parameters (like ?si=...)
      videoId = path.split('?')[0];
    }
    // Handle YouTube embed URLs
    else if (url.includes('youtube.com/embed/')) {
      const match = url.match(/\/embed\/([^?&]+)/);
      videoId = match ? match[1] : '';
    }
    // If it's just a video ID (11 characters)
    else if (url.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
      videoId = url;
    }
  } catch (error) {
    console.error('Error parsing YouTube URL:', url, error);
    // If URL parsing fails, try to extract video ID using regex
    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/ // Just the video ID
    ];
    
    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }
  }
  
  return videoId;
}

/**
 * Validate if a YouTube URL is valid
 * @param url - YouTube URL to validate
 * @returns true if valid, false otherwise
 */
export function isValidYouTubeUrl(url: string): boolean {
  const videoId = getYouTubeId(url);
  return videoId.length === 11;
}

/**
 * Get YouTube embed URL from any YouTube URL
 * @param url - YouTube URL
 * @param options - Additional embed options
 * @returns Embed URL or empty string if invalid
 */
export function getYouTubeEmbedUrl(url: string, options: {
  autoplay?: boolean;
  controls?: boolean;
  modestbranding?: boolean;
  rel?: boolean;
} = {}): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return '';
  
  const params = new URLSearchParams();
  
  // Default parameters for better embedding
  if (options.autoplay !== undefined) params.set('autoplay', options.autoplay ? '1' : '0');
  if (options.controls !== undefined) params.set('controls', options.controls ? '1' : '0');
  if (options.modestbranding !== false) params.set('modestbranding', '1');
  if (options.rel !== true) params.set('rel', '0');
  
  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Get YouTube thumbnail URL
 * @param url - YouTube URL
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'standard', 'maxres')
 * @returns Thumbnail URL or empty string if invalid
 */
export function getYouTubeThumbnail(url: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'medium'): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return '';
  
  const qualityMap = {
    'default': 'default',
    'medium': 'mqdefault',
    'high': 'hqdefault',
    'standard': 'sddefault',
    'maxres': 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Normalize YouTube URL to a standard format
 * @param url - YouTube URL to normalize
 * @returns Normalized YouTube URL
 */
export function normalizeYouTubeUrl(url: string): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return url;
  
  return `https://www.youtube.com/watch?v=${videoId}`;
}
