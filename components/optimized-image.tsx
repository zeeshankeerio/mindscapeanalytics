"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  lowQualitySrc?: string;
  withBlur?: boolean;
  fallbackComponent?: React.ReactNode;
  lazyBoundary?: string;
  wrapperClassName?: string;
  onLoad?: () => void;
  loadingBackground?: string;
}

/**
 * OptimizedImage component with enhanced loading capabilities:
 * - Handles loading with placeholder and progressive enhancement
 * - Supports fallback images if main image fails
 * - Supports blur-up loading with low quality placeholders
 * - Proper error handling with fallback component
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes,
  fallbackSrc = '/placeholder.webp',
  lowQualitySrc,
  withBlur = false,
  fallbackComponent,
  lazyBoundary = '200px',
  wrapperClassName,
  onLoad,
  loadingBackground = 'bg-gray-100',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(!priority);
  const [isError, setIsError] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string | undefined>(undefined);

  // Optimize image loading
  useEffect(() => {
    if (withBlur && lowQualitySrc) {
      setBlurDataUrl(lowQualitySrc);
    }

    // Reset states only if src changes
    if (src !== imgSrc) {
      setImgSrc(src);
      setIsError(false);
      setIsLoading(!priority);
    }
  }, [src, lowQualitySrc, withBlur, priority, imgSrc]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setIsError(true);
    if (fallbackSrc && src !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  }, [fallbackSrc, src]);

  // Try to load optimized version first if possible
  // This automatically checks for WebP versions in /optimized folders 
  const getOptimizedSrc = (path: string): string => {
    if (!path || path.startsWith('http') || path.startsWith('data:')) {
      return path;
    }

    // Extract components from path
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const filenameParts = filename.split('.');
    const extension = filenameParts.pop() || '';
    const basename = filenameParts.join('.');
    const directory = parts.slice(0, parts.length - 1).join('/');

    // Check if this is already an optimized path
    if (directory.includes('/optimized/') || basename.includes('-optimized')) {
      return path;
    }

    // Try optimized WebP version with same dimensions
    const optimizedPath = `${directory}/optimized/${basename}-optimized.webp`;
    return optimizedPath;
  };

  // If both main image and fallback failed, show fallback component
  if (isError) {
    return (
      fallbackComponent || (
        <div 
          className={cn(
            "flex items-center justify-center rounded bg-gray-100", 
            className
          )}
          style={{ width, height }}
        >
          <span className="text-xs text-gray-500">{alt || "Image not found"}</span>
        </div>
      )
    );
  }
  
  // Use the optimized image path
  const optimizedSrc = getOptimizedSrc(imgSrc);

  return (
    <div className={`relative ${wrapperClassName || ''}`}>
      {isLoading && (
        <div 
          className={`absolute inset-0 ${loadingBackground} animate-pulse`}
          style={{ width, height }}
        />
      )}
      
      {isError && fallbackComponent ? (
        fallbackComponent
      ) : (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          quality={quality}
          sizes={sizes}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={blurDataUrl ? "blur" : undefined}
          blurDataURL={blurDataUrl}
          loading={priority ? "eager" : "lazy"}
          {...props}
        />
      )}
    </div>
  );
} 