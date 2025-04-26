import { ReportHandler, Metric, getCLS, getFID, getLCP, getFCP, getTTFB, getINP } from 'web-vitals'

const vitalsUrl = '/api/vitals'

/**
 * Web Vitals metrics:
 * - CLS: Cumulative Layout Shift
 * - FID: First Input Delay
 * - LCP: Largest Contentful Paint
 * - FCP: First Contentful Paint
 * - TTFB: Time to First Byte
 * - INP: Interaction to Next Paint
 */
function getConnectionSpeed() {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = navigator.connection as NetworkInformation
    
    if (connection && connection.effectiveType) {
      return connection.effectiveType // 4g, 3g, 2g, etc.
    }
  }
  
  return 'unknown'
}

// Add NetworkInformation interface
interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function reportWebVitals(reportHandler?: ReportHandler) {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') return

  // Get browser connection speed
  const connectionSpeed = getConnectionSpeed()
  
  // Remove options object - pass null for default behavior
  
  // Report Core Web Vitals
  getCLS(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
  getFID(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
  getLCP(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
  getFCP(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
  getTTFB(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
  getINP(metric => sendToAnalytics(metric, connectionSpeed, reportHandler))
}

function sendToAnalytics(
  metric: Metric,
  connectionSpeed: string,
  reportHandler?: ReportHandler
) {
  // Construct the metric payload
  const body = {
    ...metric,
    connectionSpeed,
    // Add additional data about the user/page/visit
    page: window.location.pathname,
    userAgent: window.navigator.userAgent,
    timestamp: Date.now(),
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  }

  // Log to console in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Web Vitals]', body)
  }

  // Use the provided report handler if available
  if (reportHandler) {
    // Cast the metric to any to avoid type errors
    reportHandler(metric as any)
  }

  // Send to your analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
} 