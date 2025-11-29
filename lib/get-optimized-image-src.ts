/**
 * Utility to get the most optimized version of an image based on format support
 * and directory structure
 */

/**
 * Interface for GetOptimizedImageSrcOptions
 */
export interface GetOptimizedImageSrcOptions {
  /**
   * Original image source path
   */
  src: string;
  
  /**
   * Width to request for the image, used to get the appropriate size variant
   * If not specified, will return the original size
   */
  width?: number;
  
  /**
   * Format to request (webp, avif)
   * If not specified, will try to use webp as default modern format
   */
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'original';
  
  /**
   * Quality descriptor (optimized, original, reduced)
   * If not specified, will try to use optimized
   */
  quality?: 'optimized' | 'original' | 'reduced';
  
  /**
   * Placeholder type (blur, empty)
   * If 'blur' is specified, will return a low-quality placeholder
   */
  placeholder?: 'blur' | 'empty';
}

/**
 * Result of the getOptimizedImageSrc function
 */
export interface OptimizedImageResult {
  /**
   * The optimized image source URL
   */
  src: string;
  
  /**
   * If requested, a URL to a low-quality placeholder
   */
  blurDataUrl?: string;
  
  /**
   * Fallback URL if the optimized version doesn't exist
   */
  fallbackSrc?: string;
}

/**
 * Get the most optimized version of an image based on browser support
 * and available optimized versions
 */
export function getOptimizedImageSrc({
  src,
  width,
  format = 'webp',
  quality = 'optimized',
  placeholder,
}: GetOptimizedImageSrcOptions): OptimizedImageResult {
  // Handle external URLs or data URLs
  if (!src || src.startsWith('http') || src.startsWith('data:')) {
    return { src };
  }

  // Extract path components
  const parts = src.split('/');
  const filename = parts[parts.length - 1];
  const filenameParts = filename.split('.');
  const extension = filenameParts.pop() || '';
  const basename = filenameParts.join('.');
  const directory = parts.slice(0, parts.length - 1).join('/');

  // Check if this is already an optimized path
  if (directory.includes('/optimized/') || basename.includes('-optimized') || basename.includes('-reduced')) {
    return { src };
  }

  // Generate paths based on options
  let optimizedSrc: string;
  let fallbackSrc: string = src;
  let blurDataUrl: string | undefined;

  // Build the optimized image path
  if (width) {
    // If width is specified, use that size
    if (format === 'original') {
      optimizedSrc = `${directory}/optimized/${basename}-${width}.${extension}`;
    } else {
      optimizedSrc = `${directory}/optimized/${basename}-${width}.${format}`;
      // Fallback to original format if modern format isn't available
      fallbackSrc = `${directory}/optimized/${basename}-${width}.${extension}`;
    }
  } else {
    // If width is not specified, use quality descriptor
    if (quality === 'reduced') {
      optimizedSrc = `${directory}/optimized/${basename}-reduced.${format === 'original' ? extension : format}`;
    } else if (quality === 'original') {
      optimizedSrc = `${directory}/optimized/${basename}-original.${format === 'original' ? extension : format}`;
    } else {
      // Default to optimized
      optimizedSrc = `${directory}/optimized/${basename}-optimized.${format === 'original' ? extension : format}`;
      // Special case for very large images like founder.jpg
      if (basename === 'founder' || src.includes('founder.jpg')) {
        optimizedSrc = `${directory}/optimized/${basename}-reduced.${format === 'original' ? extension : 'webp'}`;
      }
    }
  }

  // Generate placeholder URL if requested
  if (placeholder === 'blur') {
    blurDataUrl = `${directory}/placeholders/${basename}.webp`;
  }

  return {
    src: optimizedSrc,
    fallbackSrc,
    ...(blurDataUrl && { blurDataUrl }),
  };
}

/**
 * Check browser support for modern image formats
 * This should be used client-side only
 */
export function getBrowserSupportedImageFormats(): {
  webp: boolean;
  avif: boolean;
} {
  const result = {
    webp: false,
    avif: false,
  };

  // Only run in browser environment
  if (typeof window === 'undefined') {
    return result;
  }

  try {
    const canvas = document.createElement('canvas');
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      result.webp = true;
    }
    
    // AVIF detection is less reliable, so we'll just try feature detection
    // or use a reasonable default based on browser data
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    const chromeVersion = isChrome 
      ? parseInt(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || '0', 10)
      : 0;
    const firefoxVersion = isFirefox
      ? parseInt(navigator.userAgent.match(/Firefox\/(\d+)/)?.[1] || '0', 10)
      : 0;
      
    // Chrome 85+ and Firefox 93+ support AVIF
    result.avif = (isChrome && chromeVersion >= 85) || (isFirefox && firefoxVersion >= 93);
  } catch (e) {
    // If there's an error, we'll just return false for both
  }

  return result;
}

/**
 * Get the best supported image format for the current browser
 * This should be used client-side only
 */
export function getBestImageFormat(): 'avif' | 'webp' | 'original' {
  const support = getBrowserSupportedImageFormats();
  
  if (support.avif) return 'avif';
  if (support.webp) return 'webp';
  return 'original';
} 