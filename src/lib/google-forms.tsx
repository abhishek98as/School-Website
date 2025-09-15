/**
 * Utility function to convert Google Forms URL to embeddable format
 * Handles different Google Forms URL formats including shortened URLs
 * 
 * @param url - The Google Forms URL to process
 * @returns The embeddable format URL
 */
export function getEmbeddableFormUrl(url: string): string {
  try {
    // Handle different Google Forms URL formats
    if (url.includes('docs.google.com/forms')) {
      // Extract the form ID from the URL
      const formIdMatch = url.match(/\/forms\/d\/e\/([^\/]+)/);
      if (formIdMatch) {
        const formId = formIdMatch[1];
        return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
      }
      
      // If it's already an embedded URL, return as is
      if (url.includes('embedded=true')) {
        return url;
      }
      
      // If it's a viewform URL, convert to embedded
      if (url.includes('viewform')) {
        const baseUrl = url.split('?')[0];
        return `${baseUrl}?embedded=true`;
      }
    }
    
    // Handle shortened URLs (forms.gle)
    if (url.includes('forms.gle/')) {
      // For shortened URLs, we'll use them as-is for the iframe
      // Google will handle the redirect and embedding
      return url;
    }
    
    // Handle other shortened URLs (goo.gl, etc.)
    if (url.includes('goo.gl/') || url.includes('bit.ly/') || url.includes('tinyurl.com/')) {
      // For these, we'll use them as-is and let the iframe handle it
      return url;
    }
    
    // Default: return the URL as-is
    return url;
  } catch (error) {
    console.error('Error processing form URL:', error);
    return url;
  }
}

/**
 * Props for the Google Forms embed component
 */
export interface GoogleFormsEmbedProps {
  url: string;
  title?: string;
  height?: string | number;
  className?: string;
}

/**
 * Reusable Google Forms embed component with fallback link
 */
export function GoogleFormsEmbed({ 
  url, 
  title = "Google Form", 
  height = "600px",
  className = ""
}: GoogleFormsEmbedProps) {
  const embeddableUrl = getEmbeddableFormUrl(url);
  
  return (
    <div className={className}>
      <div className="w-full border rounded-lg overflow-hidden" style={{ height }}>
        <iframe
          src={embeddableUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="w-full h-full"
          title={title}
        >
          Loading form...
        </iframe>
      </div>
      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          Open form in new tab →
        </a>
      </div>
    </div>
  );
}
