import { useEffect, useState } from 'react';

export type ResourceType = 'image' | 'script' | 'style' | 'font';

interface ResourceToPreload {
  url: string;
  type: ResourceType;
  importance?: 'high' | 'low' | 'auto';
  callback?: () => void;
}

/**
 * A hook to optimize resource loading by preloading critical resources
 * and lazy loading non-critical resources
 */
export const useOptimizedResources = (
  resourcesToPreload: ResourceToPreload[] = [],
  resourcesToLazyLoad: ResourceToPreload[] = []
) => {
  const [preloadedResources, setPreloadedResources] = useState<string[]>([]);
  const [lazyLoadedResources, setLazyLoadedResources] = useState<string[]>([]);

  // Function to preload critical resources
  useEffect(() => {
    if (!resourcesToPreload.length) return;

    const preloadResource = (resource: ResourceToPreload) => {
      const { url, type, importance = 'high', callback } = resource;

      // Skip if already preloaded
      if (preloadedResources.includes(url)) return;

      try {
        // Create link element for preloading
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = type === 'image' ? 'image' : 
                  type === 'script' ? 'script' : 
                  type === 'style' ? 'style' : 'font';
        
        if (type === 'font') {
          link.setAttribute('crossorigin', 'anonymous');
          link.setAttribute('type', 'font/woff2');
        }
        
        if (importance) {
          link.setAttribute('importance', importance);
        }
        
        // Append to document head
        document.head.appendChild(link);
        
        // Update state and run callback if provided
        setPreloadedResources(prev => [...prev, url]);
        if (callback) callback();
      } catch (error) {
        console.error(`Failed to preload resource: ${url}`, error);
      }
    };

    // Preload all critical resources
    resourcesToPreload.forEach(preloadResource);
  }, [resourcesToPreload, preloadedResources]);

  // Function to lazy load non-critical resources
  useEffect(() => {
    if (!resourcesToLazyLoad.length) return;

    // Setup intersection observer for lazy loading
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const resourceUrl = element.dataset.resource;
          const resourceType = element.dataset.resourceType as ResourceType;
          
          if (resourceUrl && !lazyLoadedResources.includes(resourceUrl)) {
            if (resourceType === 'image') {
              const img = new Image();
              img.src = resourceUrl;
              img.onload = () => {
                if (element.tagName === 'DIV') {
                  element.style.backgroundImage = `url(${resourceUrl})`;
                } else if (element.tagName === 'IMG') {
                  (element as HTMLImageElement).src = resourceUrl;
                }
                setLazyLoadedResources(prev => [...prev, resourceUrl]);
              };
            } else if (resourceType === 'script') {
              const script = document.createElement('script');
              script.src = resourceUrl;
              script.async = true;
              document.body.appendChild(script);
              setLazyLoadedResources(prev => [...prev, resourceUrl]);
            } else if (resourceType === 'style') {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = resourceUrl;
              document.head.appendChild(link);
              setLazyLoadedResources(prev => [...prev, resourceUrl]);
            }
          }
          
          // Unobserve after loading
          lazyLoadObserver.unobserve(element);
        }
      });
    }, observerOptions);

    // Find elements to observe for lazy loading
    const elementsToObserve = document.querySelectorAll('[data-resource]');
    elementsToObserve.forEach(element => {
      lazyLoadObserver.observe(element);
    });

    return () => {
      if (lazyLoadObserver) {
        elementsToObserve.forEach(element => {
          lazyLoadObserver.unobserve(element);
        });
      }
    };
  }, [resourcesToLazyLoad, lazyLoadedResources]);

  // Function to mark an element for lazy loading
  const markForLazyLoad = (
    url: string, 
    type: ResourceType
  ): { 'data-resource': string; 'data-resource-type': ResourceType } => {
    return {
      'data-resource': url,
      'data-resource-type': type
    };
  };

  return {
    preloadedResources,
    lazyLoadedResources,
    markForLazyLoad
  };
};

export default useOptimizedResources; 