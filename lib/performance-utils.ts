/**
 * Performance optimization utilities
 */

/**
 * Sets up lazy loading for images
 */
export function setupLazyLoading() {
  if (typeof window !== 'undefined') {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      // We don't need to do anything additional
    } else {
      // Could implement a fallback lazy loading solution if needed
      console.log('Native lazy loading not supported');
    }
  }
}

/**
 * Monitors for long tasks that might cause jank
 * @returns A PerformanceObserver instance if supported, null otherwise
 */
export function monitorLongTasks() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log long tasks that might cause jank
          if (entry.duration > 50) {
            console.log('Long task detected:', entry.duration, 'ms');
          }
        }
      });
      
      observer.observe({ type: 'longtask', buffered: true });
      return observer;
    } catch (e) {
      console.error('Performance observer error:', e);
    }
  }
  
  return null;
}

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Throttle function to limit the rate at which a function is executed
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Measures component rendering time for performance monitoring
 */
export function measureRenderTime(componentName: string) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return { end: () => {} };
  
  const startTime = performance.now();
  
  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 50) {
        console.warn(`Slow render: ${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    }
  };
}

/**
 * Prefetches assets that will be needed soon
 */
export function prefetchCriticalAssets(assets: string[]) {
  if (typeof window === 'undefined') return;
  
  const head = document.head;
  
  assets.forEach(asset => {
    // Don't prefetch if already loaded or prefetched
    if (document.querySelector(`link[href="${asset}"]`)) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = asset;
    
    head.appendChild(link);
  });
} 